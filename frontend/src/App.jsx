import React from "react";
import './App.css'
import { Route,Routes } from "react-router-dom";
import Register from "./components/register/Register";
import dotenv from 'dotenv'
import Login from "./components/login/Login";
import Dashboard from "./components/dashboard/Dashboard";
import Navbar from "./components/navbar/Navbar";
import AppLayout from "./AppLayout";
import { useEffect } from "react";

const App = ()=>{

    return(
        <div>
            <Routes>
                <Route path="/" element={<Register/>}></Route>
                <Route path="/login" element={<Login/>}></Route>
                <Route element={<AppLayout/>}>
                    <Route path="/dashboard" element={<Dashboard/>}></Route>
                </Route>
            </Routes>
        </div>
    )
}

export default App