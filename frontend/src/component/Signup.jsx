import React, { useState } from 'react';
import '../css/Signup.css';
import { useNavigate , Link} from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        console.log('Form Data:', formData);

        try{
            const res = await fetch('http://localhost:8080/user/signup' , { // Added proxy in the vite.config.js to get the exact url
              method : 'POST' ,
              headers : {'Content-type' : 'application/json'},
              body : JSON.stringify(formData), 
            });
            const data=await res.json();
            if(res.ok){
                alert('SignUp Successfully!');
              navigate('/login');
            }
            else if(res.status === 400){
                alert(data.message);
            }
            else{
                alert('Please try again.');  
            }
          }
          catch(error){
            navigate('/signup')
        }
    };

    return (
        <div className='bgg'>
        <form onSubmit={handleSubmit} className='form2'>
        <h2 style={{ paddingLeft: '0rem' , color:'black', fontSize:'2rem' }}>SignUp</h2>
            <div>
                <input
                    type="text"
                    id="name"
                    placeholder='Name'
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder='Email'
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder='Password'
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder='confirmPassword'
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                />
            </div>
            <button className='form2btn' type="submit">Sign Up</button>
            <p>Already have an Account ? <Link to="/login">Login</Link></p>
        </form>
        </div>
    );
};

export default Signup;
