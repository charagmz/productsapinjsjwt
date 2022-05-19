import User from '../models/User';
import jwt from 'jsonwebtoken';
import config from '../config';
import Role from '../models/Role';

export const signUp = async (req, res) => {
    const {username, email, password, roles} = req.body;

    const newUser = new User ({
        username,
        email,
        password: await User.encryptPassword(password)
    });

    let foundRoles = [];
    if (roles) {
        foundRoles = await Role.find({name: {$in: roles}});
        newUser.roles = foundRoles.map(role => role._id);
    }
    if (foundRoles.length === 0) {
        const role = await Role.findOne({name: "user"});
        newUser.roles = [role._id];
    }

    const savedUser = await newUser.save();
    //console.log(savedUser);

    //generar el token
    const token = jwt.sign({id: savedUser._id}, config.SECRET, {
        expiresIn: 86400 //24 hours
    });
    //console.log(newUser);
    res.json({token});
}

export const signIn = async (req, res) => {
    const {email, password} = req.body;

    const userFound = await User.findOne({email}).populate("roles");
    if (!userFound) return res.status(400).json({message: "User not found"});
    const match = await User.matchPassword(password, userFound.password);
    if (!match) return res.status(401).json({token: null, message: "Incorrect password"});
    console.log(userFound);

    const token = jwt.sign({id: userFound._id}, config.SECRET, {
        expiresIn: 86400 //24 hours
    });
    //console.log(newUser);
    res.json({token});
}