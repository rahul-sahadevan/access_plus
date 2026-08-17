import React from "react";
import { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import axios from "axios";
import "./login.css"


const Login  = ()=>{
    const [userId,setUserId] = useState("")
    const [password,setPassword] = useState("")
    const URL = import.meta.env.VITE_API_URL
    const navigate = useNavigate()

    const handleLogin = async()=>{
        try{

            if(!userId || !password){
                alert("All fields required")
                return
            }

            const response = await axios.post(`${URL}/api/login`,{
                    "userId":userId,
                    "password":password
                },
                {
                    withCredentials: true
                }
            )
            const responseData = response.data
            console.log(responseData)

            if(responseData.status === 200){
                alert(responseData.message)
                navigate("/dashboard")
                return
            }

        }
        catch(error){
            alert(error)
            console.log(error)
        }
    }
    return(
        <div className="auth-container">
            <div className="login-card">

                <div className="login-header">
                    <h1>Welcome Back</h1>
                    <p>Login to Access Plus</p>
                </div>

                <div className="login-form">

                    <div className="input-group">
                        <label>Username or Email</label>
                        <input
                            onChange={(e) => setUserId(e.target.value)}
                            type="text"
                            placeholder="Enter username or email"
                        />
                    </div>

                    <div className="input-group">
                        <label>Password</label>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            placeholder="Enter password"
                        />
                    </div>

                    <button
                        className="login-button"
                        onClick={handleLogin}
                    >
                        Login
                    </button>

                </div>

                <div className="register-link">
                    <p>
                        Don't have an account?{" "}
                        <Link to="/register">Register</Link>
                    </p>
                </div>

            </div>
        </div>
    )
}

export default Login