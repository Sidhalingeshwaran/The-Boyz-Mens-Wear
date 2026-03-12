import ProductCard from './ProductCard';

export default function ProductGrid({ products, loading }) {
  if (loading) {
    return (
      <div className="product-grid">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="skeleton-card">
            <div className="skeleton skeleton-image" />
            <div className="skeleton skeleton-text" />
            <div className="skeleton skeleton-price" />
          </div>
        ))}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">🛍️</div>
        <h3 className="empty-state-title">No products found</h3>
        <p className="empty-state-text">Check back later for new arrivals!</p>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} index={index} />
      ))}
    </div>
  );
}
