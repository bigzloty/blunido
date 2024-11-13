import React, { useState, useEffect } from 'react';
import { FlutterWaveButton, closePaymentModal } from "flutterwave-react-v3";
import CartItem from './CartItem';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import '../../assets/css/CartPage.css';

const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);

    const cartPrice = cartItems.reduce((total, item) => total + item.price, 0);

    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(cart);
    }, []);

    const flutterKEY = process.env.REACT_APP_FLUTTER_KEY
    console.log(flutterKEY)

    const config = {
        public_key: flutterKEY,
        tx_ref: Date.now(),
        amount: cartPrice,
        currency: 'NGN',
        payment_options: 'card,mobilemoney,ussd',
        customer: {
            email: 'alimaonuemma@gmail.com',
            phone_number: '08103870397',
            name: 'Alimaonu Emmanuel',
        },
        customizations: {
            title: 'My store',
            description: 'Payment for items in cart',
            logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
        },
    };

    const fwConfig = {
        ...config,
        text: 'Pay with Flutterwave!',
        callback: (response) => {
            console.log(response);

            // Clear cart after successful payment
            setCartItems([]);
            localStorage.removeItem('cart');

            closePaymentModal(); // Close the modal programmatically
        },
        onClose: () => { },
    };

    const handleRemoveItem = (productId) => {
        const updatedCart = cartItems.filter(item => item.id !== productId);
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    return (
        <>
            <div className="container-p">
                <Navbar />
                <h2 className="section-title">Your items</h2>
                {cartItems.length === 0 ? (
                    <p>Your cart is empty!</p>
                ) : (
                    <div className="cart-page">
                        {cartItems.map((item, index) => (
                            <CartItem key={index} item={item} onRemove={handleRemoveItem} />
                        ))}
                        <FlutterWaveButton {...fwConfig} />
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
};

export default CartPage