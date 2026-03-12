import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function ProductCard({ product, index = 0 }) {
  const navigate = useNavigate();
  const [selectedVariant, setSelectedVariant] = useState(0);

  const discount = product.mrp && product.sellingPrice
    ? Math.round(((product.mrp - product.sellingPrice) / product.mrp) * 100)
    : 0;

  const currentImage = product.variants && product.variants.length > 0
    ? product.variants[selectedVariant]?.imageUrl
    : product.primaryImage;

  const formatCategory = (cat) => {
    if (!cat) return '';
    return cat.replace(/-/g, ' ');
  };

  return (
    <motion.div
      className="product-card"
      onClick={() => navigate(`/product/${product.id}`)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <div className="product-card-image">
        <img
          src={currentImage || '/placeholder.jpg'}
          alt={product.title}
          loading="lazy"
        />
        {discount > 0 && (
          <span className="product-badge">{discount}% OFF</span>
        )}
        {product.tier && (
          <span className="product-tier-badge">{product.tier}</span>
        )}
      </div>

      <div className="product-card-info">
        <h3 className="product-card-title">{product.title}</h3>
        <p className="product-card-category">{formatCategory(product.category)}</p>

        <div className="product-card-pricing">
          <span className="product-selling-price">₹{product.sellingPrice}</span>
          {product.mrp > product.sellingPrice && (
            <>
              <span className="product-mrp">₹{product.mrp}</span>
              <span className="product-discount">{discount}% off</span>
            </>
          )}
        </div>

        {product.variants && product.variants.length > 1 && (
          <div className="product-colors" onClick={e => e.stopPropagation()}>
            {product.variants.map((v, i) => (
              <span
                key={i}
                className={`color-dot ${selectedVariant === i ? 'active' : ''}`}
                style={{ backgroundColor: v.colorCode || '#ccc' }}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedVariant(i);
                }}
                title={v.color}
              />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
