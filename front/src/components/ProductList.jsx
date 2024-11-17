import React, { useState } from 'react';
import ProductForm from './ProductForm';

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
      <h2 className="text-2xl font-bold mb-4">Lista de Ingredientes</h2>
      <button 
        onClick={() => alert('Funcionalidad futura')}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Editar Producto
      </button>
      <ul className="list-disc list-inside mt-4">
        {products.map((product) => (
          <li key={product.id} className="mb-2">
            {product.name} - ${product.price}
          </li>
        ))}
      </ul>
      <ProductForm onCreate={handleCreateProduct} />
    </div>
  );
}

export default ProductList;
