import React from "react";

const categories = ["Clothing", "Footwear", "Accessories"];

export default function CategoryFilter({ value, onChange, className }) {
  return (
    <select
      className={className}
      value={value}
      onChange={e => onChange(e.target.value)}
    >
      <option value="">All Categories</option>
      {categories.map(cat => (
        <option key={cat} value={cat}>{cat}</option>
      ))}
    </select>
  );
}

