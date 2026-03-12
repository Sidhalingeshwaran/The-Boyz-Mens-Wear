import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiArrowLeft, HiExternalLink } from 'react-icons/hi';
import { useProducts } from '../context/ProductContext';

const TOPS = ['formal-shirts', 'casual-shirts', 't-shirts', 'full-sleeve-tshirts', 'vests'];

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProductById, loading } = useProducts();
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);

  const product = getProductById(id);

  useEffect(() => {
    if (product?.sizes?.length > 0) {
      setSelectedSize(product.sizes[0]);
    }
  }, [product]);

  if (loading) {
    return (
      <div className="product-detail">
        <div className="container">
          <div className="product-detail-grid">
            <div className="skeleton" style={{ aspectRatio: '3/4', borderRadius: 'var(--radius-lg)' }} />
            <div>
              <div className="skeleton" style={{ height: 30, width: '60%', marginBottom: 16 }} />
              <div className="skeleton" style={{ height: 40, width: '80%', marginBottom: 24 }} />
              <div className="skeleton" style={{ height: 60, width: '100%', marginBottom: 24 }} />
              <div className="skeleton" style={{ height: 100, width: '100%' }} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-detail">
        <div className="container">
          <div className="empty-state">
            <div className="empty-state-icon">😕</div>
            <h3 className="empty-state-title">Product not found</h3>
            <p className="empty-state-text">This product might have been removed.</p>
            <button className="btn btn-outline" onClick={() => navigate('/shop')} style={{ marginTop: 20 }}>
              Back to Shop
            </button>
          </div>
        </div>
      </div>
    );
  }

  const mrp = Number(product?.mrp) || 0;
  const sellingPrice = Number(product?.sellingPrice) || 0;

  const discount = mrp && sellingPrice && mrp > sellingPrice
    ? Math.round(((mrp - sellingPrice) / mrp) * 100)
    : 0;

  let currentImage = '/placeholder.jpg';
  if (product?.variants && product.variants.length > 0 && product.variants[selectedVariant]?.imageUrl) {
    currentImage = product.variants[selectedVariant].imageUrl;
  } else if (product?.primaryImage) {
    currentImage = product.primaryImage;
  }

  const formatCategory = (cat) => {
    if (!cat) return '';
    return cat.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  };

  return (
    <div className="product-detail page-wrapper">
      <div className="container">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <HiArrowLeft /> Back
        </button>

        <div className="product-detail-grid">
          {/* Images */}
          <motion.div
            className="product-detail-images"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="product-main-image">
              <img src={currentImage || '/placeholder.jpg'} alt={product.title} />
            </div>

            {product.variants && product.variants.length > 1 && (
              <div className="product-thumbnails">
                {product.variants.map((v, i) => (
                  <div
                    key={i}
                    className={`product-thumbnail ${selectedVariant === i ? 'active' : ''}`}
                    onClick={() => setSelectedVariant(i)}
                  >
                    <img src={v.imageUrl} alt={v.color} />
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Info */}
          <motion.div
            className="product-detail-info"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="product-detail-tier">{product.tier}</span>
            <h1 className="product-detail-title">{product.title}</h1>
            <p className="product-detail-category">{formatCategory(product.category)}</p>

            <div className="product-detail-pricing">
              <span className="detail-selling-price">₹{sellingPrice}</span>
              {mrp > sellingPrice && (
                <>
                  <span className="detail-mrp">₹{mrp}</span>
                  <span className="detail-discount">{discount}% off</span>
                </>
              )}
            </div>

            <p className="product-detail-description">{product.description}</p>

            {/* Color Selector */}
            {product.variants && product.variants.length > 1 && (
              <div className="color-selector">
                <p className="color-selector-label">
                  Color: {product.variants[selectedVariant]?.color}
                </p>
                <div className="color-options">
                  {product.variants.map((v, i) => (
                    <div
                      key={i}
                      className={`color-option ${selectedVariant === i ? 'active' : ''}`}
                      style={{ backgroundColor: v.colorCode || '#ccc' }}
                      onClick={() => setSelectedVariant(i)}
                      title={v.color}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Size Selector */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="size-selector">
                <p className="size-selector-label">Select Size</p>
                <div className="size-options">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      className={`size-chip ${selectedSize === size ? 'active' : ''}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Flipkart Link */}
            {product.flipkartLink && (
              <a
                href={product.flipkartLink}
                target="_blank"
                rel="noreferrer"
                className="flipkart-link"
              >
                <HiExternalLink /> Buy on Flipkart
              </a>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
