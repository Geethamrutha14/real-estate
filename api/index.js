import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRouter from './routes/user.router.js';
import authRouter from './routes/auth.route.js';
import User from './models/user.model.js';
import cookieParser from 'cookie-parser';
dotenv.config();

mongoose
.connect(process.env.MONGO)
.then(async ()=>{
    console.log("connected...");
     await User.init(); // used to initialize the model indexes... it is built-in method
    // console.log('Mongo URI:', process.env.MONGO);
} )
.catch((err)=>{
    console.log(err);
});

const app = express();
app.use(express.json());
app.use(cookieParser());

app.listen(3000, ()=>{
    console.log("listening at port 3000...");
});

app.use('/api/user',userRouter);
app.use('/api/auth',authRouter);

// creating a middleware....

app.use((err,req,res,next)=>{
    const message = err.message || "Internal server error";
    const statusCode = err.statusCode || 500;
    return res.json({
        success : false,
        statusCode,
        message
    });
});