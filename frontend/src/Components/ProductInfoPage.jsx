import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "../Styling/ProductInfo.css"; 

function ProductInfo() {
    const [products, setProducts] = useState([]);
    const [users, setUsers] = useState([]);
    const { id } = useParams(); 

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:3002/users');
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchUsers();
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:3002/products');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchProducts();
    }, [id]);
    const foundProduct = products.find(product => product._id === id);
    console.log(users);


    if (!foundProduct) {
        return <div>Loading product information...</div>;
    }

    const foundUser = users.find(user => user._id === foundProduct.user);

    if (!foundUser) {
        return <div>Loading product information...</div>;
    };

    const handleEmailSubmit = async (event) => {
        event.preventDefault();

        const fullName = event.target.name.value;
        const meetPlace = event.target.meet.value;
        const meetDate = event.target.date.value;
        const meetTime = event.target.time.value;
        const phoneNumber = event.target.phone.value;
        const sellerEmail = foundUser.email; 

        try {
            await axios.post('http://localhost:3002/send-email', {
                sellerEmail,
                fullName,
                meetPlace,
                meetDate,
                meetTime,
                phoneNumber,
                productName: foundProduct.title,
            });
            alert('Email sent successfully!');
        } catch (error) {
            console.error('Failed to send email:', error);
            alert('Failed to send email. Please try again.');
        }
    };

    
    return (
        <div className='productInfo'>
            <img src={foundProduct.coverImage} alt={foundProduct.title} />
            <div className="productInfo_details">
                <h2>{foundProduct.title}</h2>
                <p>Condition: {foundProduct.condition}</p>
                <p>Status: {foundProduct.status}</p>
                <p>Price: ${foundProduct.price}</p>
            </div>

        
            <form onSubmit={handleEmailSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input type="text" id="name" name="name" placeholder="Your Name" required />
                </div>
                <div className="form-group">
                    <label htmlFor="meet">Place to Meet</label>
                    <select id="meet" name="meet" required>
                        <option value="">Select a Meeting Place</option>
                        <option value="Torgersen Hall">Torgersen Hall</option>
                        <option value="Burruss Hall">Burruss Hall</option>
                        <option value="Hokie Grill">Hokie Grill</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="date">Date to Meet</label>
                    <input type="date" id="date" name="date" required />
                </div>
                <div className="form-group">
                    <label htmlFor="time">Time to Meet</label>
                    <input type="time" id="time" name="time" placeholder="Enter Time" required />
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Enter Your Phone Number</label>
                    <input type="tel" id="phone" name="phone" pattern="[0-9]{10}" placeholder="ex. 1234567890" required />
                </div>
                <button type="submit" className="submit-button">Send Message to Seller</button>
            </form>

            </div>
    );
}

export default ProductInfo;
