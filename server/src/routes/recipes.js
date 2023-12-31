import express from "express";
import mongoose from "mongoose";
import { RecipeModel } from "../models/Recipes.js";
import { UserModel } from "../models/Users.js";
import { verifyToken } from "./users.js";
//home page
const router = express.Router();
router.get("/", async(req,res)=>{
    try {
        const response = await RecipeModel.find({});
        res.json(response);
    } catch (err) {
        console.error(err)
    }
});
//create recipe
router.post("/", verifyToken,async(req,res)=>{
    const recipe = new RecipeModel(req.body);
    try {
        const response = await recipe.save();
        res.json(response);
    } catch (err) {
        console.error(err)
    }
});
//save recipes
router.put("/", verifyToken,async(req,res)=>{
    
    try {
        const recipe = await RecipeModel.findById(req.body.recipeId);
        const user = await UserModel.findById(req.body.userId);
        user.savedRecipes.push(recipe);
        await user.save();
        res.json({savedRecipes: user.savedRecipes});

    } catch (err) {
        console.error(err)
    }
});
//get a list of savedRecipes id
router.get("/savedRecipes/id/:userId", async(req,res)=>{
    
    try {
        const user = await UserModel.findById(req.params.userId)
        res.json({savedRecipes: user?.savedRecipes});

    } catch (err) {
        console.error(err)
    }
});
//get a list of savedRecipes
router.get("/savedRecipes/:userId", async(req,res)=>{
    
    try {
        const user = await UserModel.findById(req.params.userId)
        const savedRecipes = await RecipeModel.find({
            _id: {$in: user.savedRecipes}
        })
        res.json({savedRecipes});

    } catch (err) {
        console.error(err)
    }
});


export{router as recipesRouter};