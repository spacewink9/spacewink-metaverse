import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <h2>Spacewink</h2>
            </div>
            <ul className="navbar-links">
                <li><NavLink to="/" className="nav-link" activeClassName="active-link">Home</NavLink></li>
                <li><NavLink to="/dashboard" className="nav-link" activeClassName="active-link">Dashboard</NavLink></li>
                <li><NavLink to="/profile" className="nav-link" activeClassName="active-link">Profile</NavLink></li>
                <li><NavLink to="/about" className="nav-link" activeClassName="active-link">About</NavLink></li>
            </ul>
        </nav>
    );
}

export default Navbar;
