import React, { useState } from 'react';
import './ProductCard.css';

const ProductCard = ({ product, onDelete, onEdit }) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const result = await onDelete(product._id);
      if (result.success) {
        setShowDeleteConfirm(false);
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(price);
  };
  
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  return (
    <div className="product-card">
      <div className="product-header">
        <h3 className="product-name">{product.name}</h3>
        <span className="product-category">{product.category}</span>
      </div>
      
      <div className="product-body">
        <p className="product-description">{product.description}</p>
        <div className="product-price">{formatPrice(product.price)}</div>
      </div>
      
      <div className="product-footer">
        <div className="product-date">
          Added: {formatDate(product.createdAt)}
        </div>
        
        <div className="product-actions">
          {!showDeleteConfirm ? (
            <div className="action-buttons">
              <button
                className="edit-btn"
                onClick={() => onEdit(product)}
              >
                Edit
              </button>
              <button
                className="delete-btn"
                onClick={() => setShowDeleteConfirm(true)}
                disabled={isDeleting}
              >
                Delete
              </button>
            </div>
          ) : (
            <div className="delete-confirm">
              <span>Are you sure?</span>
              <div className="confirm-buttons">
                <button
                  className="confirm-delete-btn"
                  onClick={handleDelete}
                  disabled={isDeleting}
                >
                  {isDeleting ? 'Deleting...' : 'Yes'}
                </button>
                <button
                  className="cancel-delete-btn"
                  onClick={() => setShowDeleteConfirm(false)}
                  disabled={isDeleting}
                >
                  No
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
