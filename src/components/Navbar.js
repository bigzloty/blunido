import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes, FaSearch, FaShoppingCart } from 'react-icons/fa';
import Slider from 'react-slick';
import '../assets/css/Navbar.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [popularProducts, setPopularProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => {
        setPopularProducts(data);
        setFilteredProducts(data); // Initialize with full product list
      });
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    setSearchQuery(""); // Reset search when closed
    setFilteredProducts(popularProducts); // Reset filtered products
  };

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter products based on search query
    const filtered = popularProducts.filter(product =>
      product.title.toLowerCase().includes(query)
    );
    setFilteredProducts(filtered);
  };

  // New function to handle popular search clicks
  const handlePopularSearch = (category) => {
    const filtered = popularProducts.filter(product => product.category.toLowerCase() === category.toLowerCase());
    setFilteredProducts(filtered);
    setIsSearchOpen(true); // Open the search overlay
  };

  const handleCategoryClick = (category) => {
    navigate(`/products?category=${category}`);
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-hamburger" onClick={toggleMenu}>
        {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24}  opacity={0.7} />}
        <h3>Menu</h3>
      </div>

      <div className="navbar-logo">
        <Link to="/" onClick={() => setIsMenuOpen(false)}>
          <h1>BLUNIDO</h1>
        </Link>
      </div>

      <div className="navbar-search" onClick={toggleSearch}>
        {isSearchOpen ? <FaTimes size={24} /> : <FaSearch size={24} opacity={0.7} />}	
        <h3>Search</h3>
      </div>

      <FaShoppingCart style={{

        fontSize: '24px',
        color: 'gray',
        cursor: 'pointer',
        opacity: 0.7,
      }}
        onClick={() => navigate('/cart')}
      />

      {isMenuOpen && <div className="menu-overlay" onClick={toggleMenu}></div>}
      {isSearchOpen && (
        <div className="search-overlay">
          <div className="search-header">
            <input
              type="text"
              placeholder="Search for items..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="search-input"
            />
            <button className="close-button" onClick={toggleSearch}>
              <FaTimes /> Close
            </button>
          </div>

          <div className="popular-searches">
            <h4>Popular Searches</h4>
            <ul>
              <li onClick={() => handlePopularSearch("men's clothing")}>
                <FaSearch size={12} style={{ marginRight: '8px', verticalAlign: 'middle' }} /> Men's Clothing
              </li>
              <li onClick={() => handlePopularSearch("women's clothing")}>
                <FaSearch size={12} style={{ marginRight: '8px', verticalAlign: 'middle' }} /> Women's Clothing
              </li>
              <li onClick={() => handlePopularSearch("jewelery")}>
                <FaSearch size={12} style={{ marginRight: '8px', verticalAlign: 'middle' }} /> Jewelery
              </li>
              <li onClick={() => handlePopularSearch("electronics")}>
                <FaSearch size={11} style={{ marginRight: '8px', verticalAlign: 'middle' }} /> Electronics
              </li>
            </ul>
          </div>

          <div className="suggested-products">
            <h4>You Might Also Like</h4>
            <Slider dots={false} infinite speed={500} slidesToShow={4} slidesToScroll={1}>
              {filteredProducts.map((product) => (
                <div key={product.id} className="product-slide">
                  <Link to={`/products/${product.id}`}>
                    <img src={product.image} alt={product.title} />
                    <p>{product.title}</p>
                  </Link>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      )}

      <div className={`side-menu ${isMenuOpen ? 'open' : ''}`}>
        <button className="close-button" onClick={toggleMenu}>
          <FaTimes /> Close
        </button>
        <ul className="main-links">
          <li onClick={() => handleCategoryClick("men's clothing")}>Men's Clothing</li>
          <li onClick={() => handleCategoryClick("women's clothing")}>Women's Clothing</li>
          <li onClick={() => handleCategoryClick('jewelery')}>Jewelery</li>
          <li onClick={() => handleCategoryClick('electronics')}>Electronics</li>
          <li><Link to="/login" onClick={toggleMenu}>Join Us</Link></li>
          <li><Link to="/signup" onClick={toggleMenu}>Sign Up</Link></li>
        </ul>

        <ul className="footer-links">
          <li><Link to="/my-account" onClick={toggleMenu}>My Account</Link></li>
          <li><Link to="/order-status" onClick={toggleMenu}>Order Status and Return</Link></li>
          <li><Link to="/contact" onClick={toggleMenu}>Contact Us</Link></li>
          <li><Link to="/gift-cards" onClick={toggleMenu}>Gift Cards</Link></li>
          <li><Link to="/services" onClick={toggleMenu}>Blunido Services</Link></li>
          <li><Link to="/shipping-and-delivery" onClick={toggleMenu}>Shipping and Delivery</Link></li>
          <li><Link to="/faqs" onClick={toggleMenu}>FAQs</Link></li>
        </ul>
      </div>
    </nav>
  );
}; export default Navbar;