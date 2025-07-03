import React, { useState, useEffect } from "react";
import ProductList from "./ProductList";
import ProductForm from "./ProductForm";
import CategoryFilter from "./CategoryFilter";
import Pagination from "./Pagination";
import { fetchProducts, createProduct, updateProduct, deleteProduct } from "./api";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [filteredCategory, setFilteredCategory] = useState("All");
  const [editingProduct, setEditingProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const data = await fetchProducts();
    setProducts(data);
  };

  const handleAdd = async (product) => {
    await createProduct(product);
    loadProducts();
    setCurrentPage(1); // Reset to first page when adding
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  const handleUpdate = async (product) => {
    await updateProduct(product);
    setEditingProduct(null);
    loadProducts();
  };

  const handleDelete = async (id) => {
    await deleteProduct(id);
    loadProducts();
  };

  // Filter products by category
  const filteredProducts =
    filteredCategory === "All"
      ? products
      : products.filter((p) => p.category === filteredCategory);

  // Pagination calculations
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Reset to first page when filtering category
  useEffect(() => {
    setCurrentPage(1);
  }, [filteredCategory]);

  return (
    <div className="App">
      <h1>Product Inventory Manager</h1>
      <CategoryFilter
        selectedCategory={filteredCategory}
        onSelectCategory={setFilteredCategory}
        products={products}
      />
      <ProductList
        products={currentProducts}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <Pagination
        productsPerPage={productsPerPage}
        totalProducts={filteredProducts.length}
        currentPage={currentPage}
        paginate={setCurrentPage}
      />
      <ProductForm
        onAdd={handleAdd}
        onUpdate={handleUpdate}
        editingProduct={editingProduct}
        onCancel={() => setEditingProduct(null)}
      />
    </div>
  );
}

export default App;
