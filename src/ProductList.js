import React from "react";

export default function ProductList({ products, onEdit, onDelete }) {
  if (products.length === 0) return <p>No products found.</p>;

  return (
    <ul className="product-list">
      {products.map(p => (
        <li key={p.id} className="product-item">
          <div className="product-info">
            <strong>{p.name}</strong> — {p.category} —{" "}
            {p.stock > 0 ? (
              <span className="stock-in">In stock: {p.stock}</span>
            ) : (
              <span className="stock-out">Out of stock</span>
            )}
          </div>
          <div className="product-actions">
            <button onClick={() => onEdit(p)}>Edit</button>
            <button onClick={() => onDelete(p.id)}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
}
