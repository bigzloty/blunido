import { useState, useEffect } from 'react';

const useCartCount = () => {
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        // Function to update the cart count from localStorage
        const updateCartCount = () => {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            setCartCount(cart.length);
        };

        updateCartCount(); // Set initial count

        // Listen for changes in localStorage and update count
        window.addEventListener('storage', updateCartCount);

        return () => window.removeEventListener('storage', updateCartCount);
    }, []);

    return cartCount;
};

export default useCartCount;