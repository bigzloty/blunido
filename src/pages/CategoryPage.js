// src/CategoryPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CategoryPage = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);

useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`https://fakestoreapi.com/products/category/${category}`);
        console.log('Fetched products:', response.data); 
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, [category]);

  return (
    <div>
      <h1>{category.charAt(0).toUpperCase() + category.slice(1)}</h1>
      <div className="product-list">
        {products.map((product) => (
          <div key={product._id} className="product-item">
            <img src={product.imageUrl} alt={product.name} />
            <h2>{product.name}</h2>
            <img src={product.image} alt="" />
            <p>{product.description}</p>
            <p>#{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;