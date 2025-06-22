import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRouter from './routes/user.router.js';
dotenv.config();

mongoose
.connect(process.env.MONGO)
.then(()=>{
    console.log("connected...");
    // console.log('Mongo URI:', process.env.MONGO);
} )
.catch((err)=>{
    console.log(err);
});

const app = express();

app.listen(3000, ()=>{
    console.log("listening at port 3000...");
});

app.use('/api/user',userRouter);