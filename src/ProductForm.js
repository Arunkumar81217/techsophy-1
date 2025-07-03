import React, { useState, useEffect } from "react";

const categories = ["Clothing", "Footwear", "Accessories"];

export default function ProductForm({ initialData, onSubmit, onCancel }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setCategory(initialData.category);
      setStock(initialData.stock);
    } else {
      setName("");
      setCategory("");
      setStock("");
    }
  }, [initialData]);

  const handleSubmit = e => {
    e.preventDefault();
    if (!name || !category || stock === "") {
      alert("Please fill all fields");
      return;
    }
    onSubmit({ id: initialData ? initialData.id : undefined, name, category, stock: Number(stock) });
  };

  return (
    <form onSubmit={handleSubmit} className="form-inline">
      <input
        type="text"
        placeholder="Product name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <select
        value={category}
        onChange={e => setCategory(e.target.value)}
      >
        <option value="">Select category</option>
        {categories.map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
      <input
        type="number"
        placeholder="Stock quantity"
        value={stock}
        onChange={e => setStock(e.target.value)}
        min="0"
      />
      <button type="submit">
        {initialData ? "Update" : "Add"}
      </button>
      {initialData && (
        <button type="button" onClick={onCancel} style={{ backgroundColor: "#777" }}>
          Cancel
        </button>
      )}
    </form>
  );
}
