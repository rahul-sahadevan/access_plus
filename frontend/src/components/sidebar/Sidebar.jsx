import { NavLink } from "react-router-dom";
import "./sidebar.css";

const Sidebar = ({ isOpen }) => {

    return (
        <aside className={`sidebar ${isOpen ? "open" : "closed"}`}>

            <div className="sidebar-logo">
                <h2>ACCESS PLUS</h2>
            </div>

            <nav className="sidebar-nav">

                <NavLink to="/dashboard">
                    Dashboard
                </NavLink>

                <div className="sidebar-section">
                    Network
                </div>

                <NavLink to="/network">
                    Interfaces
                </NavLink>

                <NavLink to="/netplan">
                    Netplan
                </NavLink>

                <div className="sidebar-section">
                    Services
                </div>

                <NavLink to="/nginx">
                    Nginx
                </NavLink>

                <div className="sidebar-section">
                    Diagnostics
                </div>

                <NavLink to="/dmesg">
                    dmesg
                </NavLink>

                <NavLink to="/journalctl">
                    journalctl
                </NavLink>

                <NavLink to="/systemctl">
                    systemctl
                </NavLink>

            </nav>

        </aside>
    );
};

export default Sidebar;