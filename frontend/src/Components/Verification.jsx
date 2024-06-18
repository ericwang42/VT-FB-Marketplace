import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styling/Verification.css';
import textrade from '../assets/textrade.png';
import { Link } from 'react-router-dom';

function VerificationPage() {
    const [code, setCode] = useState('');
    const navigate = useNavigate();

    const verifyCode = e => {
        e.preventDefault();
        if (code === "492759") {
            alert("Verification successful!");
            navigate("/login");
        } else {
            alert("Incorrect verification code. Please try again.");
        }
    }

    return (
        <div className='verification'>
            <Link to="/">
                <img className='verification_logo' src={textrade} alt="Textrade" />
            </Link>

            <div className='verification_container'>
                <h1>Enter Verification Code</h1>

                <form onSubmit={verifyCode}>
                    <h5>Verification Code</h5>
                    <input
                        type='text'
                        value={code}
                        maxLength="6"
                        onChange={e => setCode(e.target.value)}
                        placeholder="Enter 6-digit code" />

                    <button type='submit' className='verification_submitButton'>Verify</button>
                </form>
            </div>
        </div>
    );
}

export default VerificationPage;
