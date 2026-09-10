import { NavLink } from "react-router-dom";
import "./sidebar.css";
import { useState } from "react";

const Sidebar = ({ isOpen,setPage }) => {



    return (
        <aside className={`sidebar ${isOpen ? "open" : "closed"}`}>

            <div className="sidebar-logo">
                <h2>ACCESS PLUS</h2>
            </div>

            <nav className="sidebar-nav">

                <NavLink to="/dashboard" onClick={()=> setPage("Dashboard")}>
                    Dashboard
                </NavLink>

                <div className="sidebar-section">
                    Network
                </div>

                <NavLink to="/network" onClick={()=> setPage("Network")}>
                    Interfaces
                </NavLink>

                <NavLink to="/netplan" onClick={()=> setPage("Network")}>
                    Netplan
                </NavLink>

                <div className="sidebar-section">
                    Services
                </div>

                <NavLink to="/nginx" onClick={()=> setPage("Services")}>
                    Nginx
                </NavLink>

                <div className="sidebar-section">
                    Diagnostics
                </div>

                <NavLink to="/logs" onClick={()=> setPage("Logs")}>
                    Logs
                </NavLink>

                {/* <NavLink to="/journalctl">
                    journalctl
                </NavLink>

                <NavLink to="/systemctl">
                    systemctl
                </NavLink> */}

            </nav>

        </aside>
    );
};

export default Sidebar;