import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../../assets/css/product-card.css";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div className="product-card-container">
      <div>
        <img src={product.image} alt={product.name} className="slider-image-card onHover" />
      </div>

      {/* <div className="Card-info-text">
        <button onClick={() => navigate(`/products/${product.id}`)}>View Product</button>
      </div> */}
    </div>
  );
};

export default ProductCard;