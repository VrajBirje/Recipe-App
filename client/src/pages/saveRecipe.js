import axios from "axios";
import { useEffect, useState } from "react"
import { getUserId } from "../hooks/getUserId";

export const Save_recipe = () => {
    const [savedRecipes, setSavedrecipe] = useState([]);
    useEffect(() => {

        const userId = getUserId();
        const fetchSavedRecipes = async () => {
           try {
            const response = await axios.get(
                `http://localhost:3001/recipes/savedRecipes/${userId}`
            );
            setSavedrecipe(response.data.savedRecipes);
            console.log(response.data)
            console.log(savedRecipes)
           } catch (err) {
            console.error(err)
           }
        }
        fetchSavedRecipes();

    }, [])

    return (
        <div>
            <h2>Saved Recipes</h2>
            <ul>
                {savedRecipes.map((recipe) => (
                    <li key={recipe._id}>
                        <div>
                            <h2>{recipe.name}</h2>
                            
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