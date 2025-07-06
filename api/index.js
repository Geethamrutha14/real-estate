import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRouter from './routes/user.router.js';
import authRouter from './routes/auth.route.js';
import User from './models/user.model.js';
dotenv.config();

mongoose
.connect(process.env.MONGO)
.then(async ()=>{
    console.log("connected...");
     await User.init();
    // console.log('Mongo URI:', process.env.MONGO);
} )
.catch((err)=>{
    console.log(err);
});

const app = express();
app.use(express.json());

app.listen(3000, ()=>{
    console.log("listening at port 3000...");
});

app.use('/api/user',userRouter);
app.use('/api/auth',authRouter);