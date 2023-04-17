import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../redux/apiRequest";
import "./register.css";
const Register = () => {
    const [formvalue , setFormValue] = useState({
        email:"",
        username:"",
        password:"",
    })
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleInputChange = (e) => {
        const {name,value} = e.target
        setFormValue({...formvalue,[name]:value})
        console.log(formvalue)
    }
    const handleRegister = (e) => {
        e.preventDefault();
        registerUser(formvalue, dispatch,navigate)
    }


    return ( 
        <section className="register-container">
              <div className="register-title"> Sign up </div>
            <form onSubmit={handleRegister}>
                <label>EMAIL</label>
                <input type="text" placeholder="Enter your email" 
                name="email"
                value={formvalue.email || ''}
                onChange={handleInputChange}
                />
                <label>USERNAME</label>
                <input type="text" placeholder="Enter your username" 
                name="username"
                value={formvalue.username || ''}
                onChange={handleInputChange}
                />
                <label>PASSWORD</label>
                <input type="password" placeholder="Enter your password" 
                name="password"
                value={formvalue.password || ''}
                onChange={handleInputChange}
                />
                <button type="submit"> Create account </button>
            </form>
        </section>
        
     );
}
 
export default Register;