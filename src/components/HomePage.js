import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HeroSection from './HeroSection';
import '../HomePage.css';

const HomePage = ({ featuredProducts }) => {
    const navigate = useNavigate();


    const [currentImageSet, setCurrentImageSet] = useState(0);

    const imageSets = [
        [
            { src: "/images/product_1.jpg", alt: "Product 1", name: "Peca jacket" },
            { src: "/images/product_2.jpg", alt: "Product 2", name: "Andura Mua " },
            { src: "/images/product_3.jpg", alt: "Product 3", name: "Bigzloty Jacket" },
        ],
        [
            { src: "/images/product_4.jpg", alt: "Product 4", name: "Maluda Pora" },
            { src: "/images/product_5.jpg", alt: "Product 5", name: "XUXU Jacket" },
            { src: "/images/product_6.jpg", alt: "Product 6", name: "Ben Kusha T63" },
        ],
        [
            { src: "/images/product_7.jpg", alt: "Product 7", name: "Gomya Bag" },
            { src: "/images/product_8.jpg", alt: "Product 8", name: "Huda-Bag S37" },
            { src: "/images/product_9.jpg", alt: "Product 9", name: "Lantern-Pullover Bag" },
        ],
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageSet((prevSet) => (prevSet + 1) % imageSets.length);
        }, 3000); // Change images every 3 seconds

        return () => clearInterval(interval); // Clear interval on component unmount
    }, []);

    return (
        <div className="container">
            <Navbar />
            <div>
                <HeroSection />
            </div>

            {/* Featured Section with Transition Effect */}
            <section className="featured-products">
                <div className="products-header">
                    <h2 className="section-title">New In This Week</h2>
                    <Link to="/products">
                        <button className="discover-all-btn">Discover All</button>
                    </Link>
                </div>
                <div className="transition-image-section">
                    {imageSets[currentImageSet].map((image, index) => (
                        <div key={index} className="transition-image-wrapper">
                            <img src={image.src} alt={image.alt} className="transition-image" />
                            <p>{image.name}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Rest of the Homepage */}
            {/* First clickable image section */}
            <section className="clickable-category-section">
                <Link to="/category/fashion" className="centered-overlay-link">
                    <div className="category-overlay centered-overlay">
                        <h2>Explore Fashion</h2>
                        <p>Discover the latest trends and collections in fashion</p>
                    </div>
                </Link>
                <div className="category-images">
                    <img
                        src="/images/full_pic_3.jpg"
                        alt="Women's Fashion"
                        className="category-image"
                    />
                    <img
                        src="/images/full_pic_2.jpg"
                        alt="Men's Fashion"
                        className="category-image"
                    />
                </div>
            </section>

            {/* Second clickable image section with unique class names */}
            <section className="second-clickable-category-section">
                <Link to="/category/womens-fashion" className="second-left-link">
                    <div className="second-category-overlay">
                        <h2>Explore Women's Fashion</h2>
                        <p> Women weekly fashion 367</p>
                    </div>
                </Link>
                <Link to="/category/mens-fashion" className="second-right-link">
                    <div className="second-category-overlay">
                        <h2>Explore Men's Fashion</h2>
                        <p> World blunido all men fac-tee 373 </p>
                    </div>
                </Link>
                <div className="second-category-images">
                    <img
                        src="/images/full_pic_1.jpg"
                        alt="Women's Fashion"
                        className="second-category-image"
                    />
                    <img
                        src="/images/full_pic_4.jpg"
                        alt="Men's Fashion"
                        className="second-category-image"
                    />
                </div>
            </section>

            <div className='Kids-collection'>
                <h1> Blunido Winter Collections</h1>
            </div>
            <section className="static-image-section">
                <Link to="/#" className="static-image-link">
                    <img src="/images/picture_new_edit_1.jpg" alt="Service" />
                    <p>Bigzloty K-Jacket</p>
                </Link>
                <Link to="/#" className="static-image-link">
                    <img src="/images/picture_new_edit_3.jpg" alt="Art of Giving" />
                    <p>Art of Giving 2024</p>
                </Link>
                <Link to="/#" className="static-image-link">
                    <img src="/images/picture_new_edit_2.jpg" alt="Personalization" />
                    <p>Snow Butcher Sleeve</p>
                </Link>
            </section>
            <Footer />
        </div>
    );
};

export default HomePage;