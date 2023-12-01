import { useState } from "react"
import axios from "axios";
import {useCookies} from "react-cookie"
import {useNavigate} from "react-router-dom"

export const Auth = () => {
    return (
        <div className="auth">
            <Login />
            <Register />
        </div>
    )
}
const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const label="Login";
    const[_, setCookie] = useCookies("access_token");
    const navigate = useNavigate();

    const onsubmit = async(event)=>{
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:3001/auth/login", {username, password});

            setCookie("access_token", response.data.token);
            //storing user_id in local storage to have a quick access
            window.localStorage.setItem("userId", response.data.userId);
            navigate("/");//opens home page
        } catch (err) {
            console.error(err);
        }
    }
    return (
        <div className="auth-container">
        <form action="" onSubmit={onsubmit}>
            <h2>{label}</h2>
            <div className="form-group">
                <label htmlFor="username">Username: </label>
                <input type="text" id="username" value={username} onChange={(event) => setUsername(event.target.value)} />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password: </label>
                <input type="text" id="username" value={password} onChange={(event) => setPassword(event.target.value)} />
            </div>
            <button type="submit">{label}</button>
        </form>
    </div>
    )
}

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const label="Register"
    const onsubmit = async(event)=>{
        event.preventDefault();
        try {
            await axios.post("http://localhost:3001/auth/register", {username, password});
            alert("registered successfully, now login")
        } catch (err) {
            console.error(err);
        }
    }
    return (
        <div className="auth-container">
        <form action="" onSubmit={onsubmit}>
            <h2>{label}</h2>
            <div className="form-group">
                <label htmlFor="username">Username: </label>
                <input type="text" id="username" value={username} onChange={(event) => setUsername(event.target.value)} />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password: </label>
                <input type="text" id="username" value={password} onChange={(event) => setPassword(event.target.value)} />
            </div>
            <button type="submit" >{label}</button>
        </form>
    </div>
    )
}


