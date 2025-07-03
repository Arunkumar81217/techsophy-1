// src/api.js

let products = [
  { id: 1, name: "T-shirt", category: "Clothing", stock: 10 },
  { id: 2, name: "Sneakers", category: "Footwear", stock: 5 },
  { id: 3, name: "Hat", category: "Accessories", stock: 0 },
];

function simulateNetwork(data, delay = 300) {
  return new Promise(resolve => setTimeout(() => resolve(data), delay));
}

export function getProducts() {
  return simulateNetwork([...products]);
}

export function addProduct(product) {
  const newProduct = { ...product, id: products.length ? Math.max(...products.map(p => p.id)) + 1 : 1 };
  products.push(newProduct);
  return simulateNetwork(newProduct);
}

export function updateProduct(updated) {
  products = products.map(p => (p.id === updated.id ? updated : p));
  return simulateNetwork(updated);
}

export function deleteProduct(id) {
  products = products.filter(p => p.id !== id);
  return simulateNetwork(true);
}
