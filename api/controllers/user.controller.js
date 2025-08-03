import { errorHandler } from "../utils/error.js";
import User from "../models/user.model.js";

export const test =  (req,res)=>{
    res.json({
        message : "hello world",
    })
};

export const updateUser = async (req,res,next)=>{
    if(req.user.id === req.params.id){
       return next(errorHandler(403,'You can only update your profile'));
    }
    try {
        if(req.body.password){
            req.body.password = bcrypt.hashSync(req.body.password , 10);
        }
         const updateUserinfo = await User.findByIdAndUpdate( req.params.id, {
            $set : {
                username : req.body.username,
                email : req.body.email,
                password : req.body.password,
                avatar : req.body.avatar,
            }
        },{new : true});
        const {password , ...rest} = updateUserinfo._doc;
        res.status(200).json(rest);

    } catch (error) {
        next(error);
    }
   
};