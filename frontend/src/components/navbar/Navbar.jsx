import "./navbar.css";

const Navbar = ({ onMenuClick }) => {

    return (
        <nav className="navbar">

            <div className="navbar-left">

                <button
                    className="menu-button"
                    onClick={onMenuClick}
                >
                    ☰
                </button>

                <h2 className="page-title">
                    Dashboard
                </h2>

            </div>

            <div className="navbar-right">

                <button className="navbar-icon">
                    ☀
                </button>

                <button className="navbar-icon notification">
                    🔔
                    <span className="notification-count">
                        3
                    </span>
                </button>

                <div className="user-menu">

                    <div className="user-avatar">
                        A
                    </div>

                    <span className="username">
                        Admin
                    </span>

                    <span className="dropdown-icon">
                        ▾
                    </span>

                </div>

            </div>

        </nav>
    );
};

export default Navbar;