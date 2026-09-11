import React, { useState } from "react";
import systemServices from "../apiCallFun"
import { useNavigate } from "react-router-dom";
import "./logout.css"

const Logout = ()=>{
    const navigate = useNavigate()

    const handleLogout = async()=>{
        console.log("calling the logout")
        try{

            const out = await systemServices.logout()
            if(out.status === 201){
                navigate("/login")
                return
            }

            throw new Error(out.message)
        }
        catch(error){
            console.log(error)
        }
    }


    return (
        <div className="sidebar-logout">
            <button
                type="button"
                className="logout-button"
                onClick={handleLogout}
            >
                <span className="logout-icon">↪</span>
                <span className="logout-text">Logout</span>
            </button>
        </div>
    )
}


export default Logout