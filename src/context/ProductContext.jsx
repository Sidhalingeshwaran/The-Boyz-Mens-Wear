import { createContext, useContext, useState, useEffect } from 'react';
import { DEMO_PRODUCTS } from '../data/products';

const ProductContext = createContext();

export function useProducts() {
  return useContext(ProductContext);
}

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load from localStorage or use demo data
    const stored = localStorage.getItem('theboyz_products');
    if (stored) {
      setProducts(JSON.parse(stored));
    } else {
      setProducts(DEMO_PRODUCTS);
      localStorage.setItem('theboyz_products', JSON.stringify(DEMO_PRODUCTS));
    }
    setLoading(false);
  }, []);

  const saveProducts = (updated) => {
    setProducts(updated);
    localStorage.setItem('theboyz_products', JSON.stringify(updated));
  };

  const addProduct = (data) => {
    const newProduct = {
      ...data,
      id: 'prod_' + Date.now(),
      createdAt: new Date().toISOString(),
    };
    const updated = [newProduct, ...products];
    saveProducts(updated);
    return newProduct;
  };

  const updateProduct = (id, data) => {
    const updated = products.map(p => p.id === id ? { ...p, ...data } : p);
    saveProducts(updated);
  };

  const deleteProduct = (id) => {
    const updated = products.filter(p => p.id !== id);
    saveProducts(updated);
  };

  const getProductById = (id) => {
    return products.find(p => p.id === id) || null;
  };

  const getProducts = (filters = {}) => {
    let filtered = [...products];
    if (filters.category) {
      filtered = filtered.filter(p => p.category === filters.category);
    }
    if (filters.tier) {
      filtered = filtered.filter(p => p.tier === filters.tier);
    }
    return filtered;
  };

  return (
    <ProductContext.Provider value={{
      products,
      loading,
      addProduct,
      updateProduct,
      deleteProduct,
      getProductById,
      getProducts,
    }}>
      {children}
    </ProductContext.Provider>
  );
}
