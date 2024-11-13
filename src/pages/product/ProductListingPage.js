import React, { useState, useEffect } from 'react';
import ProductCard from '../../pages/product/ProductCard';
import Navbar from '../../components/Navbar';
import ProductDetailsPage from './ProductDetailsPage'; // Assuming it's in the same directory
import '../../assets/css/ProductListingPage.css';
import { useLocation } from 'react-router-dom';

const ProductListingPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProductId, setSelectedProductId] = useState(null); // New state to store selected product ID
  const location = useLocation();

  useEffect(() => {
    // Fetch products from Fake Store API
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setFilteredProducts(data);
      });
  }, []);

  useEffect(() => {
    // Get category from URL
    const params = new URLSearchParams(location.search);
    const category = params.get('category') || 'All';
    setActiveCategory(category);

    if (category === 'All') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(product => product.category === category));
    }
  }, [location.search, products]);

  const filterProducts = (category) => {
    setActiveCategory(category);
    if (category === 'All') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(product => product.category === category));
    }
  };

  const handleProductClick = (id) => {
    setSelectedProductId(id); // Set selected product ID when clicked
  };

  const handleBackToListing = () => {
    setSelectedProductId(null); // Reset to show product listing again
  };

  return (
    <div className="product-listing-page">
      <Navbar />
      <div className="content">
        {/* Sidebar filter */}
        <div className="filter-sidebar">
          <h3>Filter By Category</h3>
          <ul>
            <li className={activeCategory === 'All' ? 'active' : ''} onClick={() => filterProducts('All')}>All</li>
            <li className={activeCategory === "men's clothing" ? 'active' : ''} onClick={() => filterProducts("men's clothing")}>Men's Clothing</li>
            <li className={activeCategory === "women's clothing" ? 'active' : ''} onClick={() => filterProducts("women's clothing")}>Women's Clothing</li>
            <li className={activeCategory === 'jewelery' ? 'active' : ''} onClick={() => filterProducts('jewelery')}>Jewelery</li>
            <li className={activeCategory === 'electronics' ? 'active' : ''} onClick={() => filterProducts('electronics')}>Electronics</li>
          </ul>
        </div>

        {/* Conditional Rendering of Product Details or Product Grid */}
        <div className="product-grid">
          {selectedProductId ? (
            <ProductDetailsPage
              productId={selectedProductId}
              onBack={handleBackToListing} // Pass back function to go back to listing
            />
          ) : (
            <>
              <h2 className="section-title">{activeCategory} Products</h2>
              <div className="grid">
                {filteredProducts.map(product => (
                  <div onClick={() => handleProductClick(product.id)} key={product.id}>
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductListingPage;