import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../Styling/AddProduct.css";
import axios from 'axios';

function AddProductForm() {
    const navigate = useNavigate();

    const [product, setProduct] = useState({
        _id: '',
        title: '',
        price: '',
        status: '',
        condition: '',
        coverImage: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setProduct(prevProduct => ({
            ...prevProduct,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // console.log(product);
            const response = await axios.post('http://localhost:3002/products', product);
            console.log(response.data);
            alert('Product added successfully!');
            navigate('/vt/library');
        } catch (error) {
            console.error('Error adding product:', error);
            alert('Failed to add product.');
        }
    };


    return (
        <form className="product-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="title">Title</label>
                <input type="text" id="title" name="title" placeholder="Title" required
                       value={product.title} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label htmlFor="price">Price</label>
                <input type="text" id="price" name="price" placeholder="Price" required
                       value={product.price} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label htmlFor="status">Status</label>
                <input type="text" id="status" name="status" placeholder="Status" required
                       value={product.status} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label htmlFor="condition">Condition</label>
                <input type="text" id="condition" name="condition" placeholder="Condition" required
                       value={product.condition} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label htmlFor="coverImage">Cover Image</label>
                <input type="text" id="coverImage" name="coverImage" placeholder="Enter Link To Cover Image" required
                       value={product.coverImage} onChange={handleChange} />
            </div>
            <button type="submit" className="submit-button">Add Product</button>
        </form>
    );
}

export default AddProductForm;
