import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useProducts } from '../context/ProductContext';
import { motion, AnimatePresence } from 'framer-motion';
import { HiPlus, HiPencil, HiTrash, HiLogout } from 'react-icons/hi';
import ProductForm from '../components/ProductForm';
import toast from 'react-hot-toast';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const [formLoading, setFormLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const handleAdd = (data) => {
    setFormLoading(true);
    try {
      addProduct(data);
      toast.success('Product added!');
      setShowForm(false);
    } catch (err) {
      console.error(err);
      toast.error('Failed to add product');
    } finally {
      setFormLoading(false);
    }
  };

  const handleUpdate = (data) => {
    if (!editingProduct) return;
    setFormLoading(true);
    try {
      updateProduct(editingProduct.id, data);
      toast.success('Product updated!');
      setEditingProduct(null);
      setShowForm(false);
    } catch (err) {
      console.error(err);
      toast.error('Failed to update product');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = (id) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      deleteProduct(id);
      toast.success('Product deleted');
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete product');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const openEdit = (product) => {
    setEditingProduct(product);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelForm = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  const formatCategory = (cat) => {
    if (!cat) return '';
    return cat.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  };

  return (
    <div className="admin-page page-wrapper">
      <div className="container">
        <div className="admin-header">
          <h1>Admin <span className="text-gold">Dashboard</span></h1>
          <div style={{ display: 'flex', gap: 12 }}>
            {!showForm && (
              <button className="btn btn-primary" onClick={() => { setEditingProduct(null); setShowForm(true); }}>
                <HiPlus /> Add Product
              </button>
            )}
            <button className="btn btn-outline" onClick={handleLogout}>
              <HiLogout /> Logout
            </button>
          </div>
        </div>

        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ProductForm
                onSubmit={editingProduct ? handleUpdate : handleAdd}
                initialData={editingProduct}
                loading={formLoading}
              />
              <div style={{ marginBottom: 32 }}>
                <button className="btn btn-outline btn-sm" onClick={cancelForm}>
                  Cancel
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Product List */}
        {products.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📦</div>
            <h3 className="empty-state-title">No products yet</h3>
            <p className="empty-state-text">Add your first product to get started.</p>
          </div>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Tier</th>
                  <th>MRP</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product.id}>
                    <td>
                      <img
                        src={product.primaryImage || product.variants?.[0]?.imageUrl || '/placeholder.jpg'}
                        alt={product.title}
                        className="admin-table-image"
                      />
                    </td>
                    <td style={{ fontWeight: 600 }}>{product.title}</td>
                    <td>{formatCategory(product.category)}</td>
                    <td>
                      <span className="product-tier-badge" style={{ position: 'static' }}>
                        {product.tier}
                      </span>
                    </td>
                    <td style={{ color: 'var(--text-muted)', textDecoration: 'line-through' }}>₹{product.mrp}</td>
                    <td style={{ fontWeight: 700, color: 'var(--gold)' }}>₹{product.sellingPrice}</td>
                    <td>
                      <div className="admin-actions">
                        <button className="btn btn-outline btn-sm" onClick={() => openEdit(product)}>
                          <HiPencil /> Edit
                        </button>
                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(product.id)}>
                          <HiTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
