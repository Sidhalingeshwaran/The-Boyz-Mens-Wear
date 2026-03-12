import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import HeroSection from '../components/HeroSection';
import ProductGrid from '../components/ProductGrid';
import { useProducts } from '../context/ProductContext';
import { HiOutlineShoppingBag } from 'react-icons/hi';
import { GiTShirt, GiArmoredPants, GiSocks } from 'react-icons/gi';

const categories = [
  { name: 'Formal Shirts', slug: 'formal-shirts', icon: <GiTShirt /> },
  { name: 'Casual Shirts', slug: 'casual-shirts', icon: <GiTShirt /> },
  { name: 'T-Shirts', slug: 't-shirts', icon: <GiTShirt /> },
  { name: 'Jeans', slug: 'jeans', icon: <GiArmoredPants /> },
  { name: 'Formal Pants', slug: 'formal-pants', icon: <GiArmoredPants /> },
  { name: 'Accessories', slug: 'socks', icon: <GiSocks /> },
];

export default function HomePage() {
  const { products, loading } = useProducts();
  const featuredProducts = products.slice(0, 8);

  return (
    <div className="page-wrapper">
      <HeroSection />

      {/* Categories Section */}
      <section className="section-padding">
        <div className="container">
          <h2 className="section-title">
            Shop by <span>Category</span>
          </h2>
          <div className="category-grid">
            {categories.map((cat, index) => (
              <motion.div
                key={cat.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.4 }}
              >
                <Link to={`/shop/${cat.slug}`} className="category-card" style={{ display: 'block' }}>
                  <div className="category-icon">{cat.icon}</div>
                  <h3 className="category-name">{cat.name}</h3>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section-padding" style={{ paddingTop: 0 }}>
        <div className="container">
          <h2 className="section-title">
            Featured <span>Products</span>
          </h2>
          <ProductGrid products={featuredProducts} loading={loading} />
          {featuredProducts.length > 0 && (
            <div style={{ textAlign: 'center', marginTop: 40 }}>
              <Link to="/shop" className="btn btn-outline">
                <HiOutlineShoppingBag /> View All Products
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
