import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Homepage from './Components/Homepage.jsx';
import LoginPage from './Components/LoginPage.jsx';
import Library from './Components/Library.jsx';
import ProductInfoPage from './Components/ProductInfoPage.jsx';
import Header from './Components/Header.jsx';
import RegisterPage from './Components/RegisterPage.jsx';
import VerificationPage from './Components/Verification.jsx';
import { AuthProvider } from './context/AuthContext';
import AddProductForm from './Components/AddProduct.jsx';


function AppWithHeader() {
    const location = useLocation();

    const showHeader = location.pathname !== "/" && location.pathname !== "/login" && location.pathname !== "/register" && location.pathname !== "/verify";

    return (
        <AuthProvider>
            <div className="App">
                {showHeader && <Header />}
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/verify" element={<VerificationPage />} />
                    <Route path="/:school/library" element={<Library />} />
                    <Route path="/product/:id" element={<ProductInfoPage />} />
                    <Route path="/add-product" element={<AddProductForm />} />
                </Routes>
            </div>
        </AuthProvider>
    );
}

function App() {
    return (
        <Router>
            <AppWithHeader />
        </Router>
    );
}

export default App;
