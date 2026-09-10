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
import Interfaces from "./components/interfaces/interfaces";
import NetplanConf from "./components/netplan/netplan";
import NginxPage from "./components/nginx/nginxPage";
import Logs from "./components/logs/logs";

const App = ()=>{

    return(
        <div>
            <Routes>
                <Route path="/" element={<Register/>}></Route>
                <Route path="/login" element={<Login/>}></Route>
                <Route element={<AppLayout/>}>
                    <Route path="/dashboard" element={<Dashboard/>}></Route>
                    <Route path="/network" element={<Interfaces/>}></Route>
                    <Route path="/netplan" element={<NetplanConf/>}></Route>
                    <Route path="/nginx" element={<NginxPage/>}></Route>
                    <Route path="/logs" element={<Logs/>}></Route>
                </Route>
            </Routes>
        </div>
    )
}

export default App