import React from 'react';
import '../assets/css/Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-top">
                <div className="footer-column">
                    <h4>Resources</h4>
                    <ul>
                        <li><a href="#">Find a Store</a></li>
                        <li><a href="#">Blunido Journal</a></li>
                        <li><a href="#">Become a Member</a></li>
                        <li><a href="#">Feedback</a></li>
                        <li><a href="#">Promo Codes</a></li>
                    </ul>
                </div>
                <div className="footer-column">
                    <h4>Help</h4>
                    <ul>
                        <li><a href="#">Get Help</a></li>
                        <li><a href="#">Order Status</a></li>
                        <li><a href="#">Shipping and Delivery</a></li>
                        <li><a href="#">Returns</a></li>
                        <li><a href="#">Payment Options</a></li>
                        <li><a href="#">Contact Us</a></li>
                        <li><a href="#">Reviews</a></li>
                    </ul>
                </div>
                <div className="footer-column">
                    <h4>Company</h4>
                    <ul>
                        <li><a href="#">About Blunido</a></li>
                        <li><a href="#">News</a></li>
                        <li><a href="#">Careers</a></li>
                        <li><a href="#">Investors</a></li>
                        <li><a href="#">Sustainability</a></li>
                        <li><a href="#">Purpose</a></li>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom">
                <div className="footer-bottom-left">
                    <p>© 2024 Blunido, Inc. All rights reserved</p>
                    <ul>
                        <li><a href="#">Guides</a></li>
                        <li><a href="#">Terms of Use</a></li>
                        <li><a href="#">Terms of Sale</a></li>
                        <li><a href="#">Company Details</a></li>
                        <li><a href="#">Privacy & Cookie Policy</a></li>
                    </ul>
                </div>
                <div className="footer-bottom-right">
                    <p>Nigeria</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;