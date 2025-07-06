import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';

export const signup = async (req,res)=>{
    
    try{
        const {username,email,password} = req.body;
    const hashedPassword = bcryptjs.hashSync(password,10);
    const newUser = new User({username,email,password : hashedPassword});
        await newUser.save();
    res.status(201).json('user created successfully');
    }
    catch(err){
        if(err.code === 11000){
            console.log('Duplicate key error',err.message);
            return res.status(400).json({message : 'Username already exists'});
        }
        console.log('Signup Error:',err.message);
        res.status(500).json({message : 'Internal server error'});
    }
   
};

