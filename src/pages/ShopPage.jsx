import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProductGrid from '../components/ProductGrid';
import { useProducts } from '../context/ProductContext';

const ALL_CATEGORIES = [
  { value: '', label: 'All' },
  { value: 'formal-shirts', label: 'Formal Shirts' },
  { value: 'casual-shirts', label: 'Casual Shirts' },
  { value: 't-shirts', label: 'T-Shirts' },
  { value: 'full-sleeve-tshirts', label: 'Full Sleeve T-Shirts' },
  { value: 'vests', label: 'Vests' },
  { value: 'formal-pants', label: 'Formal Pants' },
  { value: 'casual-pants', label: 'Casual Pants' },
  { value: 'jeans', label: 'Jeans' },
  { value: 'mom-fit-jeans', label: 'Mom Fit Jeans' },
  { value: 'briefs', label: 'Briefs' },
  { value: 'socks', label: 'Socks' },
];

const TIERS = [
  { value: '', label: 'All Tiers' },
  { value: 'premium', label: 'Premium' },
  { value: 'affordable', label: 'Affordable' },
];

export default function ShopPage() {
  const { category: urlCategory } = useParams();
  const { getProducts, loading } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState(urlCategory || '');
  const [selectedTier, setSelectedTier] = useState('');

  useEffect(() => {
    if (urlCategory) {
      setSelectedCategory(urlCategory);
    }
  }, [urlCategory]);

  const filters = {};
  if (selectedCategory) filters.category = selectedCategory;
  if (selectedTier) filters.tier = selectedTier;
  const filteredProducts = getProducts(filters);

  const formatTitle = (cat) => {
    if (!cat) return 'All Products';
    return cat.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  };

  return (
    <div className="shop-page page-wrapper">
      <div className="container">
        <motion.div
          className="shop-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1>{formatTitle(selectedCategory)}</h1>
          <p className="text-muted">
            Discover the finest in men's fashion
          </p>
        </motion.div>

        {/* Category Filters */}
        <div className="shop-filters">
          {ALL_CATEGORIES.map(cat => (
            <button
              key={cat.value}
              className={`filter-chip ${selectedCategory === cat.value ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat.value)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Tier Filters */}
        <div className="shop-filters" style={{ marginBottom: 40 }}>
          {TIERS.map(tier => (
            <button
              key={tier.value}
              className={`filter-chip ${selectedTier === tier.value ? 'active' : ''}`}
              onClick={() => setSelectedTier(tier.value)}
            >
              {tier.label}
            </button>
          ))}
        </div>

        <ProductGrid products={filteredProducts} loading={loading} />
      </div>
    </div>
  );
}
