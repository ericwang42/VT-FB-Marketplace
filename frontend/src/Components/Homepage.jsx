import React, { useState } from 'react';
import '../Styling/Homepage.css';
import { useNavigate } from 'react-router-dom';


function HomePage() {
    const navigate = useNavigate();
    const [school, setSchool] = useState('');

    const handleSearch = () => {
        if (!school.trim()) {
            alert('Please Enter a valid school');
        }
        else{
            navigate(`/${school}/library`);
        }
    };

    return (
        <div className="container">
            <h1>TextTrade</h1>
            <div className="search-box">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Enter your school"
                    value={school}
                    onChange={(e) => setSchool(e.target.value)}
                />
                <button className="search-button" onClick={handleSearch}>Search</button>
            </div>

        </div>
    );
}

export default HomePage;
