import { useState, useEffect } from 'react';
import { HiPlus, HiTrash } from 'react-icons/hi';

const CATEGORIES = [
  { value: 'formal-shirts', label: 'Formal Shirts' },
  { value: 'casual-shirts', label: 'Casual Shirts' },
  { value: 't-shirts', label: 'T-Shirts' },
  { value: 'full-sleeve-tshirts', label: 'Full Sleeve T-Shirts' },
  { value: 'vests', label: 'Vests' },
  { value: 'formal-pants', label: 'Formal Pants' },
  { value: 'casual-pants', label: 'Casual Pants' },
  { value: 'jeans', label: 'Jeans' },
  { value: 'mom-fit-jeans', label: 'Mom Fit Jeans' },
  { value: 'briefs', label: 'Briefs (Innerwear)' },
  { value: 'socks', label: 'Socks' },
];

const SHIRT_SIZES = ['M', 'L', 'XL', 'XXL', 'XXXL'];
const PANT_SIZES = ['28', '30', '32', '34', '36', '38', '40', '42'];
const TOPS = ['formal-shirts', 'casual-shirts', 't-shirts', 'full-sleeve-tshirts', 'vests'];

export default function ProductForm({ onSubmit, initialData = null, loading = false }) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: 'formal-shirts',
    tier: 'affordable',
    mrp: '',
    sellingPrice: '',
    sizes: [],
    flipkartLink: '',
    variants: [{ color: '', colorCode: '#000000', imageUrl: '' }],
    primaryImage: '',
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title || '',
        description: initialData.description || '',
        category: initialData.category || 'formal-shirts',
        tier: initialData.tier || 'affordable',
        mrp: initialData.mrp || '',
        sellingPrice: initialData.sellingPrice || '',
        sizes: initialData.sizes || [],
        flipkartLink: initialData.flipkartLink || '',
        variants: initialData.variants && initialData.variants.length > 0
          ? initialData.variants
          : [{ color: '', colorCode: '#000000', imageUrl: '' }],
        primaryImage: initialData.primaryImage || '',
      });
    }
  }, [initialData]);

  const isTop = TOPS.includes(form.category);
  const availableSizes = isTop ? SHIRT_SIZES : PANT_SIZES;

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const toggleSize = (size) => {
    setForm(prev => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter(s => s !== size)
        : [...prev.sizes, size]
    }));
  };

  const handleVariantChange = (index, field, value) => {
    setForm(prev => {
      const variants = [...prev.variants];
      variants[index] = { ...variants[index], [field]: value };
      return { ...prev, variants };
    });
  };

  const handleVariantImage = (index, file) => {
    // Convert file to data URL for local storage
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm(prev => {
        const variants = [...prev.variants];
        variants[index] = {
          ...variants[index],
          imageUrl: reader.result,
        };
        return { ...prev, variants };
      });
    };
    reader.readAsDataURL(file);
  };

  const addVariant = () => {
    setForm(prev => ({
      ...prev,
      variants: [...prev.variants, { color: '', colorCode: '#000000', imageUrl: '' }]
    }));
  };

  const removeVariant = (index) => {
    if (form.variants.length === 1) return;
    setForm(prev => ({
      ...prev,
      variants: prev.variants.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const productData = {
      title: form.title,
      description: form.description,
      category: form.category,
      tier: form.tier,
      mrp: Number(form.mrp),
      sellingPrice: Number(form.sellingPrice),
      sizes: form.sizes,
      flipkartLink: form.flipkartLink,
      variants: form.variants,
      primaryImage: form.variants[0]?.imageUrl || form.primaryImage,
    };

    onSubmit(productData);
  };

  return (
    <form className="admin-form-container" onSubmit={handleSubmit}>
      <h2 className="admin-form-title">
        {initialData ? 'Edit Product' : 'Add New Product'}
      </h2>

      <div className="admin-form-grid">
        <div className="form-group">
          <label>Title</label>
          <input
            className="form-input"
            type="text"
            value={form.title}
            onChange={e => handleChange('title', e.target.value)}
            placeholder="Product title"
            required
          />
        </div>

        <div className="form-group">
          <label>Category</label>
          <select
            className="form-select"
            value={form.category}
            onChange={e => {
              handleChange('category', e.target.value);
              handleChange('sizes', []);
            }}
          >
            {CATEGORIES.map(cat => (
              <option key={cat.value} value={cat.value}>{cat.label}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>MRP (₹)</label>
          <input
            className="form-input"
            type="number"
            value={form.mrp}
            onChange={e => handleChange('mrp', e.target.value)}
            placeholder="Maximum Retail Price"
            required
          />
        </div>

        <div className="form-group">
          <label>Selling Price (₹)</label>
          <input
            className="form-input"
            type="number"
            value={form.sellingPrice}
            onChange={e => handleChange('sellingPrice', e.target.value)}
            placeholder="Selling Price"
            required
          />
        </div>

        <div className="form-group">
          <label>Tier</label>
          <select
            className="form-select"
            value={form.tier}
            onChange={e => handleChange('tier', e.target.value)}
          >
            <option value="affordable">Affordable</option>
            <option value="premium">Premium</option>
          </select>
        </div>

        <div className="form-group">
          <label>Flipkart Link</label>
          <input
            className="form-input"
            type="url"
            value={form.flipkartLink}
            onChange={e => handleChange('flipkartLink', e.target.value)}
            placeholder="https://flipkart.com/..."
          />
        </div>

        <div className="form-group admin-form-full">
          <label>Description</label>
          <textarea
            className="form-textarea"
            value={form.description}
            onChange={e => handleChange('description', e.target.value)}
            placeholder="Product description"
            required
          />
        </div>

        <div className="form-group admin-form-full">
          <label>Sizes ({isTop ? 'Shirt' : 'Pant'} Sizes)</label>
          <div className="size-toggle-group">
            {availableSizes.map(size => (
              <button
                key={size}
                type="button"
                className={`size-toggle ${form.sizes.includes(size) ? 'active' : ''}`}
                onClick={() => toggleSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div className="form-group admin-form-full">
          <label>Color / Pattern Variants</label>
          <div className="variant-manager">
            {form.variants.map((variant, index) => (
              <div key={index} className="variant-item">
                <div className="form-group" style={{ flex: 1, minWidth: 120 }}>
                  <label style={{ fontSize: '0.75rem' }}>Color Name</label>
                  <input
                    className="form-input"
                    type="text"
                    value={variant.color}
                    onChange={e => handleVariantChange(index, 'color', e.target.value)}
                    placeholder="e.g. Navy Blue"
                  />
                </div>

                <div className="form-group" style={{ width: 80 }}>
                  <label style={{ fontSize: '0.75rem' }}>Color</label>
                  <input
                    type="color"
                    value={variant.colorCode}
                    onChange={e => handleVariantChange(index, 'colorCode', e.target.value)}
                    style={{
                      width: '100%',
                      height: 40,
                      border: 'none',
                      borderRadius: 'var(--radius-sm)',
                      cursor: 'pointer',
                      background: 'none'
                    }}
                  />
                </div>

                <div className="form-group" style={{ flex: 1, minWidth: 120 }}>
                  <label style={{ fontSize: '0.75rem' }}>Image</label>
                  <input
                    className="form-input"
                    type="file"
                    accept="image/*"
                    onChange={e => {
                      if (e.target.files[0]) handleVariantImage(index, e.target.files[0]);
                    }}
                    style={{ padding: '8px' }}
                  />
                </div>

                <div className="form-group" style={{ flex: 1, minWidth: 120 }}>
                  <label style={{ fontSize: '0.75rem' }}>Or Image URL</label>
                  <input
                    className="form-input"
                    type="url"
                    value={variant.imageUrl.startsWith('data:') ? '' : variant.imageUrl}
                    onChange={e => handleVariantChange(index, 'imageUrl', e.target.value)}
                    placeholder="https://..."
                  />
                </div>

                {variant.imageUrl && (
                  <img src={variant.imageUrl} alt={variant.color} className="variant-preview" />
                )}

                {form.variants.length > 1 && (
                  <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={() => removeVariant(index)}
                    style={{ alignSelf: 'center' }}
                  >
                    <HiTrash />
                  </button>
                )}
              </div>
            ))}

            <button type="button" className="btn btn-outline btn-sm" onClick={addVariant}>
              <HiPlus /> Add Variant
            </button>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 24 }}>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Saving...' : (initialData ? 'Update Product' : 'Add Product')}
        </button>
      </div>
    </form>
  );
}
