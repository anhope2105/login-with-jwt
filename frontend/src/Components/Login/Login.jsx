import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {useDispatch} from "react-redux";
import {loginUser} from "../../redux/apiRequest"
const Login = () => {
    const initialValue = {
        username: "",
        password: "",
    }
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formvalue , setFormValue] = useState(initialValue)
    const {username, password} = formvalue
    const handleInputChange = (e) => {
       const  {name , value} = e.target
       setFormValue({...formvalue , [name]:value})
       console.log(formvalue)
    }
    const handleLogin   = (e) => {
        e.preventDefault();
        loginUser(formvalue, dispatch, navigate)
    }

    return ( 
        <section className="login-container">
            <div className="login-title"> Log in</div>
            <form onSubmit={handleLogin}>
                <label>USERNAME</label>
                <input type="text" placeholder="Enter your username"
                name="username"
                value={username || ''}
                onChange={handleInputChange}
                />
                <label>PASSWORD</label>
                <input type="password" placeholder="Enter your password"
                name="password"
                value={password || ''} 
                onChange={handleInputChange}
                />
                <button type="submit"> Continue </button>
            </form>
            <div className="login-register"> Don't have an account yet? </div>
            <Link className="login-register-link" to="/register">Register one for free </Link>
        </section>
     );
}
 
export default Login;