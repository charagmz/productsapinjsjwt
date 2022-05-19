import {ROLES} from '../models/Role';
import User from '../models/User';

export const checkDuplicateUsernameOrEmail = async (req, res, next) => {
    const reUser = await User.findOne({username: req.body.username});
    if (reUser) return res.status(400).json({message: 'The username already exists'});

    const reEmail = await User.findOne({email: req.body.email});
    if (reEmail) return res.status(400).json({message: 'The email already exists'});

    next();
};

export const checkRolesExisted = (req, res, next) => {
    //TODO hacer consulta a la bd para obtener los roles
    if (req.body.roles) {
        for (let i=0; i<req.body.roles.length; i++) {
            if (!ROLES.includes(req.body.roles[i])) {
                return res.status(400).json({
                    message: `Role ${req.body.roles[i]} does not exists` 
                });
            }
        }
    }
    next();
}