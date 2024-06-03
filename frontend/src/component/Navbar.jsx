import React, { useState, useEffect } from 'react';
import logo from '../images/sia_logo.png';
import '../css/Navbar.css';
import {Link} from 'react-router-dom';

const Navbar = ({ setUserIsLoggedIn }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const [username, setUserName] = useState("");

    const email1 = localStorage.getItem('userEmail');

    useEffect(() => {
        setIsLoggedIn(localStorage.getItem('token') !== null);
    }, []);

    useEffect(() => {
        if (isLoggedIn) {
            fetchUser(email1);
        }
    }, [isLoggedIn]);


    const fetchUser = async (email) => {
        try {
            const res = await fetch(`http://localhost:8080/user/${email}`, {
                method: 'GET',
                headers: { 'Content-type': 'application/json' },
            });

            if (res.ok) {
                const userData = await res.json();
                setUserName(userData.name);
            } else {
                console.error('Error fetching user:', res.status);
                return null
            }
        } catch (error) {
            console.error('Fetch error:', error);
            return;
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userEmail');
        setIsLoggedIn(false);
        setUserIsLoggedIn(false);
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <img src={logo} alt="Logo" />
                <h1>Mighty &nbsp;<span className = "title-span">Movies</span></h1>
            </div>
            <div className="navbar-links">
                {!isLoggedIn ? (
                    <div>
                        <Link to="/login">Login</Link>
                        <Link to="/signup">Signup</Link>
                    </div>
                ) : (
                    <div className='side-icons'>
                        <Link to="/" style = {{paddingRight : "1.5rem"}}>{username}</Link>
                        <button onClick={handleLogout} className='logOutbtn'>Logout</button>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
