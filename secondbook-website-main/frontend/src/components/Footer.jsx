import React from "react";
import "../styles/Footer.css"; // Import CSS file

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Left Section */}
        <div className="footer-section">
          <h3>BINK. Publishers</h3>
          <p>Shop</p>
          <p>Socials</p>
          <p>Be the First to Know</p>
          <p>500 Terry Francine St.</p>
          <p>San Francisco, CA 94158</p>
          <p>123-456-7890</p>
          <a href="mailto:info@my-domain.com">info@my-domain.com</a>
        </div>

        {/* Middle Section */}
        <div className="footer-section">
          <h3>Customer Support</h3>
          <a href="#">FAQ</a>
          <a href="#">Shipping & Returns</a>
          <a href="#">Store Policy</a>
          <a href="#">Payment Methods</a>
        </div>

        {/* Right Section */}
        <div className="footer-section">
          <h3>Follow Us</h3>
          <a href="#">Facebook</a>
          <a href="#">Twitter</a>
          <a href="#">Instagram</a>
          <a href="#">Pinterest</a>
        </div>

        {/* Newsletter Section */}
        <div className="footer-section">
          <h3>Sign up for our newsletter</h3>
          <input type="email" placeholder="Enter your email here*" />
          <div>
            <input type="checkbox" id="subscribe" />
            <label htmlFor="subscribe">Yes, subscribe me to your newsletter.*</label>
          </div>
          <button className="subscribe-btn">Subscribe</button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
