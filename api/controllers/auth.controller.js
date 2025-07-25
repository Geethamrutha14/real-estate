import User from '../models/user.model.js';
import bcryptjs, { hashSync } from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

export const signup = async (req,res,next)=>{
    
    try{
    const {username,email,password} = req.body;
    const hashedPassword = bcryptjs.hashSync(password,10);
    const newUser = new User({username,email,password : hashedPassword});
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
        const user = await User.findOne({email : res.body.email});
        if(user){
            // if user is found then register the user...
            const token = jwt.sign({id : user._id}.process.env.JWT_SECRET);
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
            const newUser = new User({
                username : req.body.name.split(" ").join("").Math.random().toString(36).slice(-4),
                password : hashedPassword,
                avatar : req.body.photo,
            });
            await newUser.save();
            const token = jwt.sign({id : user._id}.process.env.JWT_SECRET);
            const {password : pass , ...rest} = user._doc;
            res
            .cookie('access_token',token,{httpOnly:true})
            .status(200)
            .json(rest);
        }
    } catch (error) {
        next(error);
    }
}