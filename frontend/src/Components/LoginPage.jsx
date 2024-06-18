import React, { useState } from 'react';
import axios from 'axios';
import '../Styling/LoginPage.css';
import textrade from '../assets/textrade.png';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 
import { jwtDecode } from 'jwt-decode';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { setCurrentUser } = useAuth();

    const signIn = async e => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/api/users/login', {
                email,
                password
            });

            const token = response.data.token;
            if (token) {
                localStorage.setItem('userToken', token);
                const user = jwtDecode(response.data.token);
                setCurrentUser(user);
                navigate('/vt/library');
            } else {
                alert('Login failed. Please check your credentials and try again.');
            }
        } catch (error) {
            console.error('Login failed:', error.response ? error.response.data : error.message);
            alert('Login failed. Please check your credentials and try again.');
        }
    }



    return (
        <div className='login'>
            <Link to="/vt/library">
                <img className='login_logo' src={textrade} alt="Textrade" />
            </Link>

            <div className='login_container'>
                <h1>Sign-in</h1>

                <form onSubmit={signIn}>
                    <h5>E-mail</h5>
                    <input type='text' value={email} onChange={e => setEmail(e.target.value)} />

                    <h5>Password</h5>
                    <input type='password' value={password} onChange={e => setPassword(e.target.value)} />

                    <button type='submit' className='login_signInButton'>Sign In</button>
                </form>
                <Link to="/register">
                    <button className='login_registerButton'>Create TextTrade Account</button>
                </Link>
            </div>
        </div>
    );
}

export default LoginPage;
