import User from '../models/user.model.js';
import bcryptjs, { hashSync } from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

export const signup = async (req,res,next)=>{
    
    try{
    const {username,email,password} = req.body;
    const hashedPassword = bcryptjs.hashSync(password,10);
    const encodedName = encodeURIComponent(username);
    const avatarUrl = `https://ui-avatars.com/api/?name=${encodedName}&background=random`;
    const newUser = new User({
        username,
        email,
        password : hashedPassword,
        avatar : avatarUrl
    });
        await newUser.save();
    res.status(201).json('user created successfully');
    }
    catch(err){
        next(err);
    }
   
};

export const signin = async (req,res,next) =>{
    const {email , password} = req.body;
    try {
        const validUser = await User.findOne({email});
        if(!validUser) return next(errorHandler(404,'user not found!'));
        const validPassword = bcryptjs.compareSync(password , validUser.password);
        if(!validPassword) return next(errorHandler(401,'wrong credentials!'));
        //creating a token httpOnly ensures no access to 3rd paty and security to the data
        const token = jwt.sign({id : validUser._id},process.env.JWT_SECRET);
        const {password : pass , ...rest} = validUser._doc;
        res
        .cookie('access_token',token,{httpOnly : true})
        .status(200)
        .json(rest);
    } catch (error) {
        next(error);
    }
}

export const google = async (req,res,next)=>{
    try {
        const user = await User.findOne({email : req.body.email});
        if(user){
            // if user is found then register the user...
            const token = jwt.sign({id : user._id},process.env.JWT_SECRET);
            const {password : pass , ...rest} = user._doc;
            res
            .cookie('access_token',token,{httpOnly : true})
            .status(200)
            .json(rest);
        }
        else{
            //otherwise create a new user...
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatedPassword,10);
            const fullName = req.body.name || 'Guest Name';
            const encodedName = encodeURIComponent(fullName);
            const avatarUrl = `https://ui-avatars.com/api/?name=${encodedName}&background=random`;
            const newUser = new User({
                username : req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4),
                email : req.body.email,
                password : hashedPassword,
                avatar : avatarUrl,
            });
            await newUser.save();
            const token = jwt.sign({id : newUser._id},process.env.JWT_SECRET);
            const {password : pass , ...rest} = newUser._doc;
            res
            .cookie('access_token',token,{httpOnly:true})
            .status(200)
            .json(rest);
        }
    } catch (error) {
        next(error);
    }
}