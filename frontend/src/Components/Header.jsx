import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import '../Styling/Header.css';
import vtLogo from '../assets/VT_LOGO.png';
import SearchIcon from '@mui/icons-material/Search';

function Header() {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className='header'>
            <Link to="/vt/library">
                <img className="header_logo" src={vtLogo} alt="VT Logo" />
            </Link>

            <div className="header_search">
                <input className="header_searchInput" type="text" />
                <SearchIcon className="header_searchIcon" />
            </div>

            <div className="header_nav">
                <div onClick={() => navigate('/add-product')} className='header_option'>
                    <span className='header_optionLineOne'>Make</span>
                    <span className='header_optionLineTwo'>New Listing</span>
                </div>

                <div className='header_option'>
                    <span className='header_optionLineOne'>Returns</span>
                    <span className='header_optionLineTwo'>& Orders</span>
                </div>

                {currentUser ? (
                    <div className='header_option' onClick={handleLogout}>
                        <span className='header_optionLineOne'>Welcome, {currentUser.email}</span>
                        <span className='header_optionLineTwo'>Sign Out</span>
                    </div>
                ) : (
                    <Link to="/login">
                        <div className='header_option'>
                            <span className='header_optionLineOne'>Hello Student</span>
                            <span className='header_optionLineTwo'>Sign In</span>
                        </div>
                    </Link>
                )}
            </div>
        </div>
    );
}

export default Header;
