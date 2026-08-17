import React from "react";
import { useState } from "react";
import { Link ,useNavigate} from "react-router-dom";
import "./register.css"
import axios from "axios"
import validator from "validator"


const Register = ()=>{
    const URL = import.meta.env.VITE_API_URL
    const[email,setEmail] = useState("")
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const navigate = useNavigate()

    // function to check input valid or not
    const validateRgistration = ({email,username,password})=>{
            if(!email || !username || !password){
                return "All fields requried!"
            }
            if(!validator.isEmail(email)){
                return "Email is not valid"
            }
            if(!validator.isLength(username,{min:3,max:50})){
                return "Username should be between 3 to 50 charactors"
            }
            if(!validator.isLength(password,{min:3,max:50})){
                return "Password should be between 3 to 50 charactors"
            }

            return null

        }


    // function to handle register
    const handleRegister = async()=>{
        try{
            const inputValidation = validateRgistration({email,username,password})
            console.log(inputValidation)

            if(inputValidation){
                alert(inputValidation)
                return
            }
            const response = await axios.post(`${URL}/api/register`,{
                "email":email,
                "username":username,
                "password":password
            })
            const data = response.data.data
            console.log(data)

            if(data.status === 201){
                alert(data.message)
                navigate("/login")
                return
            }
            
            alert(data.message)

        }
        catch(error){
            console.log(error)
            alert(error.response?.data?.message || error.message || "Registration Failed!")
        }
    }

    return(
        <div className="auth-container">
            <div className="register-card">

                <div className="register-header">
                    <h1>Create Account</h1>
                    <p>Create your Access Plus account</p>
                </div>

                <div className="register-form">

                    <div className="input-group">
                        <label>Email</label>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            name="email"
                            className="input"
                            placeholder="Enter your email"
                        />
                    </div>

                    <div className="input-group">
                        <label>Username</label>
                        <input
                            onChange={(e) => setUsername(e.target.value)}
                            type="text"
                            name="username"
                            className="input"
                            placeholder="Enter your username"
                        />
                    </div>

                    <div className="input-group">
                        <label>Password</label>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            name="password"
                            className="input"
                            placeholder="Enter your password"
                        />
                    </div>

                    <button
                        className="register-button"
                        onClick={handleRegister}
                    >
                        Register
                    </button>

                </div>

                <div className="login-link">
                    <p>
                        Already registered?{" "}
                        <Link to="/login">Login</Link>
                    </p>
                </div>

            </div>
        </div>
    )
}


export default Register