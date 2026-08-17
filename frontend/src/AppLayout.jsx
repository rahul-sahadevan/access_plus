import React from "react";
import Navbar from "./components/navbar/Navbar";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./components/sidebar/Sidebar";
import "./App.css"

const AppLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setSidebarOpen(prev => !prev);
    };

    return (
        <div className={`app-layout ${sidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>

            <Sidebar isOpen={sidebarOpen} />

            <div className="app-main">

                <Navbar onMenuClick={toggleSidebar} />

                <main className="main-content">
                    <Outlet />
                </main>

            </div>

        </div>
    );
};

export default AppLayout