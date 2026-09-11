import React from "react";
import './App.css'
import { Route,Routes } from "react-router-dom";
import Register from "./components/register/Register";
import dotenv from 'dotenv'
import Login from "./components/login/Login";
import Dashboard from "./components/dashboard/Dashboard";
import Navbar from "./components/navbar/Navbar";
import AppLayout from "./AppLayout";
import { useState,useEffect } from "react";
import Interfaces from "./components/interfaces/interfaces";
import NetplanConf from "./components/netplan/netplan";
import NginxPage from "./components/nginx/nginxPage";
import Logs from "./components/sysLogs/logs";
import socketConnection from "./components/socket";
import {ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

const App = ()=>{

    const [networkStatus,setNetworkStatus] = useState([])
    const [nginxStatus,setNginxStatus] = useState("")

    useEffect(()=>{
        const cleanUp = socketConnection({
            setNetworkStatus,
            setNginxStatus
        })
        return cleanUp
    },[])
    return(
        <div>
            <Routes>
                <Route path="/" element={<Register/>}></Route>
                <Route path="/login" element={<Login/>}></Route>
                <Route element={<AppLayout/>}>
                    <Route path="/dashboard" element={<Dashboard networkStatus={networkStatus} setNetworkStatus = {setNetworkStatus}/>}></Route>
                    <Route path="/network" element={<Interfaces networkStatus={networkStatus} setNetworkStatus = {setNetworkStatus}/>}></Route>
                    <Route path="/netplan" element={<NetplanConf/>}></Route>
                    <Route path="/nginx" element={<NginxPage nginxStatus={nginxStatus} setNginxStatus={setNginxStatus}/>}></Route>
                    <Route path="/logs" element={<Logs/>}></Route>
                </Route>
            </Routes>
            <ToastContainer autoClose={2000}/>
        </div>
    )
}

export default App