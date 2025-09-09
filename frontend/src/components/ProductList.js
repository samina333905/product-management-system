import React from 'react';
import ProductCard from './ProductCard';
import './ProductList.css';

const ProductList = ({ products, onDeleteProduct, onEditProduct }) => {
  if (!products || products.length === 0) {
    return (
      <div className="no-products">
        <h3>No products found</h3>
        <p>Add your first product to get started!</p>
      </div>
    );
  }

  return (
    <div className="product-list">
      <div className="product-list-header">
        <h2>Products ({products.length})</h2>
      </div>
      
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            onDelete={onDeleteProduct}
            onEdit={onEditProduct}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
