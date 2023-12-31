import { Link, useNavigate } from "react-router-dom"
import { useCookies } from "react-cookie"


export const Navbar = () => {
    const [cookies, setCookies] = useCookies("access_token");
    const navigate = useNavigate();
    const logout = () => {
        setCookies("access_token", "");
        window.localStorage.removeItem("userId");
        navigate("/auth");
    }
    return (
        <div className="navbar">

{/* 
            {!cookies.access_token ? (
                <>

                    <Link to="/auth">Login/Register</Link>
                </>
            ) : ( */}
                <>
                    <Link to="/">Home</Link>
                    <Link to="/create-recipe">Create Recipe</Link>
                    <Link to="/save-recipe">Saved Recipes</Link>
                    <button onClick={logout}> Logout </button>
                </>
            {/* )}     */}
                </div>
    )
}