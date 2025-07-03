import React, { useState, useEffect } from "react";
import { getProducts, addProduct, updateProduct, deleteProduct } from "./api";
import CategoryFilter from "./CategoryFilter";
import ProductList from "./ProductList";
import ProductForm from "./ProductForm";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [filterCategory, setFilterCategory] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getProducts().then(data => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  const filteredProducts = filterCategory
    ? products.filter(p => p.category === filterCategory)
    : products;

  const handleAdd = async (product) => {
    setLoading(true);
    const newProd = await addProduct(product);
    setProducts(prev => [...prev, newProd]);
    setLoading(false);
  };

  const handleUpdate = async (product) => {
    setLoading(true);
    const updated = await updateProduct(product);
    setProducts(prev => prev.map(p => (p.id === updated.id ? updated : p)));
    setEditingProduct(null);
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setLoading(true);
      await deleteProduct(id);
      setProducts(prev => prev.filter(p => p.id !== id));
      if (editingProduct && editingProduct.id === id) setEditingProduct(null);
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <h1>Product Inventory Manager</h1>

      <CategoryFilter
        className="filter-select"
        value={filterCategory}
        onChange={setFilterCategory}
      />

      {loading && <p className="loading-text">Loading...</p>}

      <ProductList
        products={filteredProducts}
        onEdit={setEditingProduct}
        onDelete={handleDelete}
      />

      <hr />

      <h2>{editingProduct ? "Edit Product" : "Add Product"}</h2>

      <ProductForm
        key={editingProduct ? editingProduct.id : "new"}
        initialData={editingProduct}
        onSubmit={editingProduct ? handleUpdate : handleAdd}
        onCancel={() => setEditingProduct(null)}
      />
    </div>
  );
}

export default App;
