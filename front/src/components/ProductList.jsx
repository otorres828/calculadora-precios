import React, { useState } from 'react';

const initialProducts = [
  { id: 1, name: 'Producto 1', description: 'Descripción del producto 1', quantity: '100g', price: '10.99' },
];

function ProductList() {
  const [products, setProducts] = useState(initialProducts);

  const handleCreateProduct = (newProduct) => {
    setProducts([...products, newProduct]);
  };

  return (
    <div className="p-4">
     
    </div>
  );
}

export default ProductList;
