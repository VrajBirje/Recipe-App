import axios from "axios";
import { useEffect, useState } from "react"
import {useCookies} from "react-cookie"
import { getUserId } from "../hooks/getUserId";

export const Home = ()=>{
    const [recipe, setrecipe] = useState([]);
    const [savedrecipe, setSavedrecipe] = useState([]);
    const[cookie, setCookie] = useCookies("access_token");
    useEffect(() => {
      const fetchRecipes = async()=>{
        const response = await axios.get("http://localhost:3001/recipes");
        setrecipe(response.data);
        // console.log(response.data)
      }
      const fetchSavedRecipes = async()=>{
        // const response = await axios.get("http://localhost:3001/recipes/savedRecipes/id/${userId}");
        const response = await axios.get(
            `http://localhost:3001/recipes/savedRecipes/id/${userId}`
        );
        setSavedrecipe(response.data.savedRecipes);
        console.log(response.data)
      }
      if(cookie.access_token) fetchRecipes();
      fetchSavedRecipes(); 
      
    }, [])
    const userId = getUserId();
    const Save_recipe = async(recipeId)=>{
        try {
            const response = await axios.put("http://localhost:3001/recipes" , { userId, recipeId} , {headers: {authorization: cookie.access_token}});
            setSavedrecipe(response.data.savedRecipes);
            console.log(response);
        } catch (err) {
            console.error(err);
        }
    }
    const isRecipeSaved = (id)=> savedrecipe.includes(id);
    return (
        <div>
            <h2>Recipes</h2>
            <ul>
                {recipe.map((recipe)=>(
                    <li key={recipe._id}>
                        <div>
                            <h2>{recipe.name}</h2>
                            <button onClick={()=>Save_recipe(recipe._id)} disabled={isRecipeSaved(recipe._id)} >
                                {isRecipeSaved(recipe._id)?"Recipe already saved" : "Save recipe"}
                            </button>
                        </div>
                        <div className="instruction">
                            {recipe.instruction}
                        </div>
                        <img src={recipe.imageURL} alt={recipe.name} />
                        <p>Cooking Time: {recipe.cookingTime}(minutes)</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}