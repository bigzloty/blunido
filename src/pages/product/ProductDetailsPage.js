import React, { useEffect, useState } from 'react';
import "../../assets/css/product-details.css";
import Footer from '../../components/Footer';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useParams } from 'react-router-dom';

const ProductDetailsPage = ({ productId, onBack }) => {
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [error, setError] = useState(null);

  const  {id} = useParams()

  useEffect(() => {
    // Log the productId to verify it's correct


    // Fetch product details
    fetch(`https://fakestoreapi.com/products/${productId || id}`)
      .then(res => {
        if (!res.ok) {
          console.error("Failed to fetch product details:", res.status);
          throw new Error('Failed to fetch product details');
        }
        console.log(res)
        return res.json();
      })
      .then(data => {
        console.log("Product details fetched successfully:", data);
        setProduct(data);
      })
      .catch(error => {
        console.error("Error fetching product details:", error);
        setError("Unable to load product details. Please try again later.");
      });

    // Fetch related products
    fetch('https://fakestoreapi.com/products')
      .then(res => {
        if (!res.ok) {
          console.error("Failed to fetch related products:", res.status);
          throw new Error('Failed to fetch related products');
        }
        return res.json();
      })
      .then(data => {
        console.log("Related products fetched successfully:", data);
        setRelatedProducts(data);
      })
      .catch(error => {
        console.error("Error fetching related products:", error);
        setError("Unable to load related products. Please try again later.");
      });
  }, [productId , id]);	
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <div className="slider-arrow next-arrow">›</div>,
    prevArrow: <div className="slider-arrow prev-arrow">‹</div>,
  };

  if (error) {
    return <p>{error}</p>; // Display a user-friendly error message
  }

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div className="product-container">
      <div className='product-card-backBtn'>
        <button onClick={onBack}>Go back</button>
      </div>
      <div className="product-detail">
        <div className="product-detail-image">
          <img src={product.image} alt={product.title} />
        </div>
        <div className="product-info">
          <div className='product-info-text'>
            <h1>{product.title}</h1>
            <p className="price">₦{product.price}</p>
          </div>
          <div className='product-info-buttons'>
            <button onClick={() => {
              localStorage.setItem('cart', JSON.stringify([...JSON.parse(localStorage.getItem('cart') || '[]'), product]));
            }}>Add to Cart</button>
          </div>
        </div>
      </div>

      {/* Product Slider Section */}
      <section className="related-products-slider">
        <h2>Related Products</h2>
        <Slider {...sliderSettings}>
          {relatedProducts.map((relatedProduct) => (
            <div key={relatedProduct.id} className="product-slide">
              <img src={relatedProduct.image} alt={relatedProduct.title} />
              <p>{relatedProduct.title}</p>
            </div>
          ))}
        </Slider>
      </section>

      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default ProductDetailsPage;