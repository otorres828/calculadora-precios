import React, { useState } from 'react';

function ProductForm({ onCreate }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && description && quantity && price) {
      onCreate({
        id: Date.now(),
        name,
        description,
        quantity,
        price: parseFloat(price),
      });
      setName('');
      setDescription('');
      setQuantity('');
      setPrice('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nombre del producto"
        className="w-full p-2 mb-2 border rounded"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Descripción del producto"
        className="w-full p-2 mb-2 border rounded"
      />
      <input
        type="text"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        placeholder="Cantidad (g/ml)"
        className="w-full p-2 mb-2 border rounded"
      />
      <input
        type="number"
        step="0.01"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Precio"
        className="w-full p-2 mb-2 border rounded"
      />
      <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
        Crear Producto
      </button>
    </form>
  );
}

export default ProductForm;
