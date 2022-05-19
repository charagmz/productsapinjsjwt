import jwt from 'jsonwebtoken';
import config from '../config';
import Role from '../models/Role';
import User from '../models/User';

export const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers["x-access-token"];
        console.log(token);

        if (!token) return res.status(403).json({message: "No token provided"});
        
        const decoded = jwt.verify(token, config.SECRET);
        //se asigna para que pueda ser utilizado en metodos posteriores a verifyToken
        req.userId = decoded.id;
        //console.log(decode);

        const user = await User.findById(req.userId, {password: 0});
        //console.log(user);

        if (!user) return res.status(404).json({message: 'No user found'})

        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({message: 'unauthorized'});
    }
}

export const isModerator = async (req, res, next) => {
    const user = await User.findById(req.userId, {password: 0});
    const roles = await Role.find({_id: {$in: user.roles}});
    for (let i=0; i < roles.length; i++) {
        if (roles[i].name=='moderator') {
            next();
            return;
        }
    }
    //console.log(roles);
    return res.status(403).json({message: "Require Moderator role"});
}

export const isAdmin = async (req, res, next) => {
    const user = await User.findById(req.userId, {password: 0});
    const roles = await Role.find({_id: {$in: user.roles}});
    for (let i=0; i < roles.length; i++) {
        if (roles[i].name=='admin') {
            next();
            return;
        }
    }
    //console.log(roles);
    return res.status(403).json({message: "Require Admin role"});
}
