import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Styling/RegisterPage.css';
import textrade from '../assets/textrade.png';
import { Link } from 'react-router-dom';

function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const navigate = useNavigate();

    const isValidEmail = email => {
        return email.endsWith("@vt.edu");
    };

    const register = async (e) => {
        e.preventDefault();
        if (isValidEmail(email)) {
            try {
                const response = await axios.post('http://localhost:3001/api/users', {
                    email,
                    password,
                    firstName,
                    lastName
                });
                console.log(response.data);
                navigate("/verify");
            } catch (error) {
                console.error('Error registering the user:', error.response ? error.response.data : error.message);
                alert('Failed to register.');
            }
        } else {
            alert("You must use a @vt.edu email address!");
        }
    }

    return (
        <div className='register'>
            <Link to="/vt/library">
                <img className='register_logo' src={textrade} alt="Textrade" />
            </Link>

            <div className='register_container'>
                <h1>Create Account</h1>

                <form onSubmit={register}>
                    <h5>First Name</h5>
                    <input type='text' value={firstName} onChange={e => setFirstName(e.target.value)} />

                    <h5>Last Name</h5>
                    <input type='text' value={lastName} onChange={e => setLastName(e.target.value)} />

                    <h5>Email</h5>
                    <input type='text' value={email} onChange={e => setEmail(e.target.value)} />

                    <h5>Password</h5>
                    <input type='password' value={password} onChange={e => setPassword(e.target.value)} />

                    <button type='submit' className='register_createButton'>Register</button>
                </form>
            </div>
        </div>
    );
}

export default RegisterPage;
