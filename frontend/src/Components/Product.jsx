import React from 'react';
import { Link } from 'react-router-dom';
import "../Styling/Product.css";

function Product({ id, title, image, price }) {
  return (
    <div className='product'>
      <div className="product_info">
        <p>{title}</p>
        <p className='product_price'>
          <small>$</small>
          <strong>{price}</strong>
        </p>
      </div>

      <img src={image} alt={title} />

      <Link to={`/product/${id}`}>
        <button>View Item</button>
      </Link>
    </div>
  );
}

export default Product;
