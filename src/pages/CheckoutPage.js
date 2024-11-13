import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import './CheckoutPage.css'; // Optional, if you want custom styling for the checkout
import './ShopPage.css'; // Optional, if you want custom styling for the checkout

const stripePromise = loadStripe('YOUR_PUBLIC_KEY'); // Replace with Stripe public key

const CheckoutPage = ({ cartItems }) => {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    const stripe = await stripePromise;

    try {
      const response = await axios.post('/api/payment/create-checkout-session', {
        items: cartItems,
      });

      const sessionId = response.data.id;

      // Redirect to Stripe Checkout
      const result = await stripe.redirectToCheckout({
        sessionId: sessionId,
      });

      if (result.error) {
        alert(result.error.message);
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
    }

    setLoading(false);
  };

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>
      <button onClick={handleCheckout} disabled={loading}>
        {loading ? 'Processing...' : 'Proceed to Payment'}
      </button>
    </div>
  );
};

export default CheckoutPage;