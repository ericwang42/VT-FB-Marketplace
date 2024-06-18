import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Product from './Product';
import "../Styling/Library.css";
import { useNavigate } from 'react-router-dom';

function Library() {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

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
    }, []);
    
    return (
        <div className='library'>
            <div className="library_container">
                {products.map(product => (
                    <div key={product._id} className="library_row">
                        <Product id={product._id} title={product.title} price={product.price} image={product.coverImage} />
                    </div>
                ))}
            </div>
        </div>



    );
}

export default Library;
