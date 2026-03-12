import { Link } from 'react-router-dom';
import { HiMail, HiPhone } from 'react-icons/hi';
import { FaInstagram } from 'react-icons/fa';
const brandLogo = "https://res.cloudinary.com/dtbjdbbtk/image/upload/v1773300091/amk_hd_vcbt23.jpg";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <img src={brandLogo} alt="The Boys Mens Wear" className="footer-logo" />
            <p className="footer-description">
              Your destination for premium and affordable men&apos;s fashion.
              From sharp formals to laid-back casuals — dress bold, live bolder.
            </p>
          </div>

          <div>
            <h4 className="footer-heading">Quick Links</h4>
            <div className="footer-links">
              <Link to="/">Home</Link>
              <Link to="/shop">Shop</Link>
              <Link to="/contact">Contact</Link>
            </div>
          </div>

          <div>
            <h4 className="footer-heading">Categories</h4>
            <div className="footer-links">
              <Link to="/shop/formal-shirts">Formal Shirts</Link>
              <Link to="/shop/casual-shirts">Casual Shirts</Link>
              <Link to="/shop/t-shirts">T-Shirts</Link>
              <Link to="/shop/jeans">Jeans</Link>
              <Link to="/shop/formal-pants">Formal Pants</Link>
            </div>
          </div>

          <div>
            <h4 className="footer-heading">Contact Us</h4>
            <div className="footer-contact-item">
              <HiMail size={18} />
              <a href="mailto:theboyz4968@gmail.com">theboyz4968@gmail.com</a>
            </div>
            <div className="footer-contact-item">
              <HiPhone size={18} />
              <a href="tel:9591529684">+91 9591529684</a>
            </div>
            <div className="footer-contact-item">
              <FaInstagram size={18} />
              <a href="https://instagram.com/theboyzmenwear" target="_blank" rel="noreferrer">
                The Boyz Menswear
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} The Boys Mens Wear. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
