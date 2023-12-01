import { useState } from "react"
import axios from "axios"
import { getUserId } from "../hooks/getUserId"
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export const Create_recipe = ()=>{
    const[cookie, setCookie] = useCookies("access_token");
    const userID = getUserId();
    const [recipe, setRecipe] = useState({
        name:"",
        ingredient:[],
        instruction:"",
        imageURL:"",
        cookingTime:0,
        userOwner:userID
    })
    
    const handleChange = (event)=>{
        const{name, value} = event.target;
        setRecipe({...recipe, [name]:value});
    }

    const handleIngredientChange = (event, index)=>{
        const {value} = event.target;
        const ingredients = recipe.ingredient;
        ingredients[index]= value;
        setRecipe({...recipe , ingredient: ingredients});
    }

    const addIngredient = ()=>{
        setRecipe({...recipe, ingredient: [...recipe.ingredient, ""]})
    }
    
    const navigate = useNavigate();

    const onsubmit = async(event)=>{
        event.preventDefault();
        try {
            await axios.post("http://localhost:3001/recipes", recipe , {headers: {authorization: cookie.access_token}});
            alert("recipe created");
            navigate("/");
        } catch (err) {
            console.error(err)   
        }
    }
    console.log(recipe)
    return (
        <div className="create-recipe">
            <h2>Create Recipe</h2>
            <form action="" onSubmit={onsubmit}>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" onChange={handleChange}/>
                <label htmlFor="description">Description</label>
                <textarea name="description" id="description" onChange={handleChange}></textarea>
                <label htmlFor="ingredient">Ingredients</label>
                {recipe.ingredient.map((ingredientElement, index)=>(
                    <input type="text" key={index} name="ingredient" value={ingredientElement} onChange={(event)=>handleIngredientChange(event, index)}/>
                ))}
                <button type="button"onClick={addIngredient}>add ingredient</button>

                <label htmlFor="instruction">Instructions</label>
                <textarea name="instruction" id="instruction"onChange={handleChange}></textarea>
                <label htmlFor="imageURL">Image URL</label>
                <input type="text" name="imageURL" onChange={handleChange} />
                <label htmlFor="cookingTime">cooking Time(minutes)</label>
                <input type="number" id="cookingTime" name="cookingTime" onChange={handleChange}/>

                <button type="submit">Create Recipe</button>

            </form>
        </div>
    )
}