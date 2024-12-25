import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css'; // Import styles for the header

function Header() {
    return (
        <header className="header">
            <div className="header-logo">
                <NavLink to="/" className="logo-link">
                    <img src="/logo.png" alt="Spacewink Logo" className="logo-img" />
                    <span className="logo-text">Spacewink Metaverse</span>
                </NavLink>
            </div>
            <nav className="header-nav">
                <ul className="nav-links">
                    <li>
                        <NavLink to="/" className="nav-link" activeClassName="active-link">
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard" className="nav-link" activeClassName="active-link">
                            Dashboard
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/profile" className="nav-link" activeClassName="active-link">
                            Profile
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/about" className="nav-link" activeClassName="active-link">
                            About Us
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
