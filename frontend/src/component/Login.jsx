import React, { useState } from 'react';
import '../css/Login.css';
import {Link, useNavigate} from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        // console.log('Form Data:', formData);
        // const mail=formData.email;
    try{
        const res = await fetch('http://localhost:8080/user/login' , { // Added proxy in the vite.config.js to get the exact url
            method : 'POST' ,
            headers : {'Content-type' : 'application/json'},
            body : JSON.stringify(formData), 
          });

        const data = await res.json(); 
        // console.log(data);
        if(res.ok){
            // console.log("token-->", data.token);
            localStorage.setItem('token', data.token);
            localStorage.setItem('userEmail',formData.email);
            navigate('/');
        }
        else if(res.status === 404 || res.status === 401) {
            alert(data.message);
        }
        else{
            alert('Please try again.');
        }
    } catch(error){
        navigate('/login');
    } 
};

    return (
        <div className='bgg'>
        <form onSubmit={handleSubmit} className='form1'>
        <h2 style={{ paddingLeft: '0rem' , color:'black', fontSize:'2rem' }}>Login</h2>
            <div>
                {/* <label htmlFor="email">Email:</label> */}
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                {/* <label htmlFor="password" >Password:</label> */}
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
            </div>
            <button type="submit" className='loginbtn'>Login</button>
            <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
        </form>
        </div>
    );
};

export default Login;
