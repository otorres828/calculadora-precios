import React, { useState, useEffect } from 'react';

export const AgregarIngrediente = ({ onClose, onSubmit, ingredient }) => {
  const [id, setId] = useState('');
  const [nombre, setNombre] = useState('');
  const [cantidad, setCantidad] = useState(0);
  const [precio, setPrecio] = useState(0);

  useEffect(() => {
    if (ingredient) {
      setId(ingredient.id);
      setNombre(ingredient.nombre);
      setCantidad(ingredient.cantidad);
      setPrecio(ingredient.precio);
    } else {
      setNombre('');
      setCantidad(0);
      setPrecio(0);
    }
  }, [ingredient]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ id,nombre, cantidad, precio });
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-md w-1/3">
        <h2 className="text-lg font-bold mb-4">
          {ingredient ? 'Editar Ingrediente' : 'Agregar Ingrediente'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Nombre</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="border border-gray-300 rounded w-full p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Cantidad (g)</label>
            <input
              type="number"
              value={cantidad}
              onChange={(e) => setCantidad(Number(e.target.value))}
              className="border border-gray-300 rounded w-full p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Precio por unidad</label>
            <input
              type="number"
              value={precio}
              onChange={(e) => setPrecio(Number(e.target.value))}
              className="border border-gray-300 rounded w-full p-2"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 bg-gray-300 text-gray-700 px-4 py-2 rounded"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              {ingredient ? 'Guardar Cambios' : 'Agregar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
