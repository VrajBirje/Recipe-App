import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "../models/Users.js";

const router = express.Router();

router.post("/register", async (req, res) => {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username });
    if (user) {
        res.json({ message: "user already exist" });
    }
    const hashedPass = await bcrypt.hash(password, 10);

    const newUser = new UserModel({ username, password: hashedPass });
    await newUser.save();

    res.json({ message: "user created successfully" });
});

router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username });
    if (!user) {
        res.json({ message: "user doesn't exist" });
    }
    const isPassValid = await bcrypt.compare(password , user.password);
    if(!isPassValid){
        res.json({ message: "Invalid password" });
    } 
    
    const token = jwt.sign({id: user._id}, "secret"); //generates a token
    res.json({token, userId: user._id});//returns the token
});


export { router as userRouter }

export const verifyToken = (req, res , next)=>{
    const token = req.headers.authorization;
    if(token){
        jwt.verify(token, "secret" , (err)=>{
            if(err) return res.sendStatus(403);
        })
    }
    else{
        return res.sendStatus(401);
    }
}