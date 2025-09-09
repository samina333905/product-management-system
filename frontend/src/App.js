import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductList from './components/ProductList';
import AddProductForm from './components/AddProductForm';
import EditProductForm from './components/EditProductForm';
import './App.css';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('newest');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Fetch products from API
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const sortParam = sortBy === 'price-asc' ? 'price-asc' : 
                       sortBy === 'price-desc' ? 'price-desc' : '';
      
      const response = await axios.get(`${API_BASE_URL}/products`, {
        params: sortParam ? { sort: sortParam } : {}
      });
      
      if (response.data.success) {
        setProducts(response.data.data);
      } else {
        throw new Error(response.data.message || 'Failed to fetch products');
      }
    } catch (err) {
      console.error('Error fetching products:', err);
      setError(err.response?.data?.message || err.message || 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  // Add new product
  const addProduct = async (productData) => {
    try {
      setError(null);
      const response = await axios.post(`${API_BASE_URL}/products`, productData);
      
      if (response.data.success) {
        setProducts(prevProducts => [response.data.data, ...prevProducts]);
        setShowAddForm(false);
        return { success: true, message: 'Product added successfully!' };
      } else {
        throw new Error(response.data.message || 'Failed to add product');
      }
    } catch (err) {
      console.error('Error adding product:', err);
      const errorMessage = err.response?.data?.message || err.message || 'Failed to add product';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    }
  };

  // Update product
  const updateProduct = async (productId, productData) => {
    try {
      setError(null);
      const response = await axios.put(`${API_BASE_URL}/products/${productId}`, productData);
      
      if (response.data.success) {
        setProducts(prevProducts => 
          prevProducts.map(product => 
            product._id === productId ? response.data.data : product
          )
        );
        setEditingProduct(null);
        return { success: true, message: 'Product updated successfully!' };
      } else {
        throw new Error(response.data.message || 'Failed to update product');
      }
    } catch (err) {
      console.error('Error updating product:', err);
      const errorMessage = err.response?.data?.message || err.message || 'Failed to update product';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    }
  };

  // Delete product
  const deleteProduct = async (productId) => {
    try {
      setError(null);
      const response = await axios.delete(`${API_BASE_URL}/products/${productId}`);
      
      if (response.data.success) {
        setProducts(prevProducts => 
          prevProducts.filter(product => product._id !== productId)
        );
        return { success: true, message: 'Product deleted successfully!' };
      } else {
        throw new Error(response.data.message || 'Failed to delete product');
      }
    } catch (err) {
      console.error('Error deleting product:', err);
      const errorMessage = err.response?.data?.message || err.message || 'Failed to delete product';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    }
  };

  // Handle sort change
  const handleSortChange = (newSort) => {
    setSortBy(newSort);
  };

  // Fetch products when component mounts or sort changes
  useEffect(() => {
    fetchProducts();
  }, [sortBy]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Product Management System</h1>
        <p>Manage your products with ease</p>
      </header>

      <main className="App-main">
        {error && (
          <div className="error-message">
            <p>{error}</p>
            <button onClick={() => setError(null)}>Dismiss</button>
          </div>
        )}

        <div className="controls">
          <div className="sort-controls">
            <label htmlFor="sort-select">Sort by:</label>
            <select 
              id="sort-select"
              value={sortBy} 
              onChange={(e) => handleSortChange(e.target.value)}
            >
              <option value="newest">Newest First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>

          <button 
            className="add-product-btn"
            onClick={() => setShowAddForm(!showAddForm)}
          >
            {showAddForm ? 'Cancel' : 'Add New Product'}
          </button>
        </div>

        {showAddForm && (
          <AddProductForm 
            onAddProduct={addProduct}
            onCancel={() => setShowAddForm(false)}
          />
        )}

        {editingProduct && (
          <EditProductForm 
            product={editingProduct}
            onUpdateProduct={updateProduct}
            onCancel={() => setEditingProduct(null)}
          />
        )}

        {loading ? (
          <div className="loading">
            <p>Loading products...</p>
          </div>
        ) : (
          <ProductList 
            products={products}
            onDeleteProduct={deleteProduct}
            onEditProduct={setEditingProduct}
          />
        )}
      </main>
    </div>
  );
}

export default App;
