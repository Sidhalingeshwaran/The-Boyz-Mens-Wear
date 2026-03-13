import { createContext, useContext, useState, useEffect } from 'react';
import { getAllProducts, addProduct as addProductService, updateProduct as updateProductService, deleteProduct as deleteProductService } from '../services/productService';
import toast from 'react-hot-toast';

const ProductContext = createContext();

export function useProducts() {
  return useContext(ProductContext);
}

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getAllProducts();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to load products from database.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addProduct = async (data) => {
    try {
      const id = await addProductService(data);
      const newProduct = { ...data, id, createdAt: new Date().toISOString() };
      setProducts(prev => [newProduct, ...prev]);
      return newProduct;
    } catch (error) {
      console.error("Error adding product:", error);
      throw error;
    }
  };

  const updateProduct = async (id, data) => {
    try {
      await updateProductService(id, data);
      setProducts(prev => prev.map(p => p.id === id ? { ...p, ...data } : p));
    } catch (error) {
      console.error("Error updating product:", error);
      throw error;
    }
  };

  const deleteProduct = async (id) => {
    try {
      await deleteProductService(id);
      setProducts(prev => prev.filter(p => p.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
      throw error;
    }
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
