// ShopPage.js
import React from 'react';
import axios from 'axios';
import '../assets/css/ShopPage.css';

const ShopPage = ({ product }) => {
  const handlePurchase = async () => {
    try {
      // Call backend API to initiate payment
      const response = await axios.post('/api/payment/pay', {
        amount: product.price, // Set amount based on product price
        currency: 'USD',
        email: 'customer@gmail.com', // Replace with user email
        phone: '1234567890', // Replace with user phone
        name: 'Alimaonu Emmanuel', // Replace with user name
      });

      // Redirect to payment page
      window.location.href = response.data.paymentLink;
    } catch (error) {
      console.error('Payment initiation error:', error);
    }
  };

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>${product.price}</p>
      <button onClick={handlePurchase}>Purchase Now</button>
    </div>
  );
};

export default ShopPage;