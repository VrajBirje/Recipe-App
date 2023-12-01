import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { userRouter } from "./routes/users.js";
import { recipesRouter } from "./routes/recipes.js";
const app = express();


//middleware
app.use(express.json()); // to convert data from frontend into json format

app.use(cors());

app.use("/auth", userRouter);
app.use("/recipes", recipesRouter);

// var mondb = mongoose.connect("mongodb+srv://vrajbirje:vrajvraj@recipes.wmdqiyb.mongodb.net/?retryWrites=true&w=majority");
var mondb = mongoose.connect("mongodb+srv://vrajbirje:vrajvraj@recipes.wmdqiyb.mongodb.net/?retryWrites=true&w=majority");
mondb.then(()=>{
    console.log("success")
}).catch((e)=>{
    console.log(e)
})
console.log(mongoose.connection.readyState);

app.listen(3001, ()=> console.log("server started"));
