import React, { useState } from 'react';
import './AddProductForm.css';

const AddProductForm = ({ onAddProduct, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    category: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    'Electronics',
    'Clothing',
    'Books',
    'Home & Garden',
    'Sports',
    'Beauty',
    'Toys',
    'Food',
    'Other'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required';
    } else if (formData.name.trim().length > 100) {
      newErrors.name = 'Product name cannot exceed 100 characters';
    }

    // Price validation
    if (!formData.price) {
      newErrors.price = 'Price is required';
    } else {
      const price = parseFloat(formData.price);
      if (isNaN(price) || price < 0) {
        newErrors.price = 'Price must be a valid positive number';
      }
    }

    // Description validation
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.trim().length > 500) {
      newErrors.description = 'Description cannot exceed 500 characters';
    }

    // Category validation
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      const productData = {
        name: formData.name.trim(),
        price: parseFloat(formData.price),
        description: formData.description.trim(),
        category: formData.category
      };

      const result = await onAddProduct(productData);
      
      if (result.success) {
        // Reset form
        setFormData({
          name: '',
          price: '',
          description: '',
          category: ''
        });
        setErrors({});
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      price: '',
      description: '',
      category: ''
    });
    setErrors({});
  };

  return (
    <div className="add-product-form-container">
      <div className="form-header">
        <h2>Add New Product</h2>
        <button className="close-btn" onClick={onCancel}>×</button>
      </div>

      <form className="add-product-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Product Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className={errors.name ? 'error' : ''}
            placeholder="Enter product name"
            maxLength="100"
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="price">Price *</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            className={errors.price ? 'error' : ''}
            placeholder="0.00"
            min="0"
            step="0.01"
          />
          {errors.price && <span className="error-message">{errors.price}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="category">Category *</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className={errors.category ? 'error' : ''}
          >
            <option value="">Select a category</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.category && <span className="error-message">{errors.category}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="description">Description *</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className={errors.description ? 'error' : ''}
            placeholder="Enter product description"
            rows="4"
            maxLength="500"
          />
          <div className="char-count">
            {formData.description.length}/500 characters
          </div>
          {errors.description && <span className="error-message">{errors.description}</span>}
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="reset-btn"
            onClick={handleReset}
            disabled={isSubmitting}
          >
            Reset
          </button>
          <button
            type="button"
            className="cancel-btn"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Adding...' : 'Add Product'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProductForm;
