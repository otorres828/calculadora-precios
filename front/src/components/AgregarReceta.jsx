
import { useSnackbar } from 'notistack';
import React, { useState, useEffect } from 'react';

export const AgregarReceta = ({ onClose, onSubmit, receta, ingrd }) => {

  const { enqueueSnackbar } = useSnackbar();

  const [id, setId] = useState('');
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState("");
  const [cantidad, setCantidad] = useState(0);
  const [precio, setPrecio] = useState(0);
  const [ingredientesSeleccionados, setIngredientesSeleccionados] = useState([]);
  const [ingredientesDisponibles, setIngredientesDisponibles] = useState([...ingrd]);
  const [seleccionado, setSeleccionado] = useState(null);
  const [costo, setCosto] = useState(0);

  useEffect(() => {
    if (receta) {
      setId(receta.receta.id);
      setNombre(receta.receta.nombre);
      setDescripcion(receta.receta.descripcion);
      setPrecio(receta.receta.precio);
      setIngredientesSeleccionados(receta.ingredientes);
      setIngredientesDisponibles(ingrd.filter(i => !receta.ingredientes.some(s => s.id === i.id)));

      let cs=0;
      for (let i = 0; i < receta.ingredientes.length; i++) {
        let ingredi = receta.ingredientes[i]
         cs += ingredi.cant_usada * ingredi.precio / ingredi.cantidad
      }
      setCosto(cs);
    }
  }, [receta, ingrd]);

  const handleIngredientAdd = (event) => {
    let select = ingredientesDisponibles.find(i => i.id == event.target.value);
    setSeleccionado(select);
  };

  const handleIngredientRemove = (index) => {
    const newIngredientesSeleccionados = [...ingredientesSeleccionados];
    newIngredientesSeleccionados.splice(index, 1);

    let ingr = ingredientesSeleccionados[index];
    setCosto( costo - (ingr.cant_usada *  ingr.precio / ingr.cantidad))

    setIngredientesSeleccionados(newIngredientesSeleccionados);
    setIngredientesDisponibles([...ingredientesDisponibles, ingredientesSeleccionados[index]]);
  };

  const agregarIngrediente = () => {
    if (cantidad && seleccionado) {
      const newIngredient = {
        id: seleccionado.id,
        nombre: seleccionado.nombre,
        cantidad: seleccionado.cantidad,
        cant_usada: parseInt(cantidad),
        precio: seleccionado.precio,
      };
      setCosto(costo+ (newIngredient.cant_usada *  newIngredient.precio / newIngredient.cantidad))
      setIngredientesSeleccionados([...ingredientesSeleccionados, newIngredient]);
      setIngredientesDisponibles(ingredientesDisponibles.filter(i => i.id !== newIngredient.id));

      setCantidad(0)
    } else {
      enqueueSnackbar('Seleccione una opcion e ingrese una cantidad valida', { variant: "warning" });
    }
  };

  const handleSubmitReceta = (e) => {
    if(!nombre  || !descripcion || !precio || ingredientesSeleccionados.length==0){
      enqueueSnackbar('Debe de llenar todos los campos', { variant: "warning" });
      return
    }
    onSubmit({ id, nombre, descripcion, precio, ingredientes: ingredientesSeleccionados });
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-md sm:w-1/3">
        <h2 className="text-lg font-bold mb-4">
          {receta ? 'Editar Receta' : 'Agregar Receta'}
        </h2>
        <div >

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1"><b>Nombre de la receta</b></label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="border border-gray-300 rounded w-full p-2"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1"><b>Descripcion</b></label>
            <textarea
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              className="border border-gray-300 rounded w-full p-2"
              required
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1"><b>Precio de Venta</b></label>
            <input
              type="number"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
              className="border border-gray-300 rounded w-full p-2"
              required
            />
          </div>

          <div className="mb-4">

            <div className="bg-white ">

              <label className="block text-sm font-medium mb-1">Ingredientes</label>

              {ingredientesDisponibles.length > 0 &&  
                <div className="grid grid-cols-3">

                  <select
                        className="border border-gray-300 rounded w-full"
                        onChange={handleIngredientAdd}
                      >
                        <option value="">Selecciona un ingrediente</option>
                        {ingredientesDisponibles.map(ingrediente => (
                          <option key={ingrediente.id} value={ingrediente.id}>
                            {ingrediente.nombre}
                          </option>
                        ))}
                  </select>

                  <input
                  value={cantidad}
                  onChange={(e) => setCantidad(e.target.value)}
                    type="number"
                    className="border border-gray-300 rounded w-full p-2 ml-2"
                    placeholder="Cantidad"
                  />

                  <button
                  onClick={agregarIngrediente}
                  className="bg-blue-500 text-white ml-4 mx-2 rounded"
                  >
                    {'Agregar'}
                  </button>
                </div>
              }


              <div className="p-2 mt-3">
                <table class="w-full text-sm text-left rtl:text-right">
                  <thead class="uppercase bg-gray-50 ">
                    <tr>
                      <th>Ingrediente</th>
                      <th>Cantidad</th>
                      <th>Costo</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {ingredientesSeleccionados.map((ingrediente, index) => (
                      <tr key={ingrediente.id}>
                        <td>{ingrediente.nombre}</td>
                        <td>{ingrediente.cant_usada}</td>
                        <td>{(ingrediente.cant_usada *  ingrediente.precio / ingrediente.cantidad).toFixed(2)}</td>
                        <td>
                          <button onClick={() => handleIngredientRemove(index)}>X</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

              </div>

            </div>

          </div>

          <div className="flex flex-col">
              <label htmlFor="" className="text-sm font-normal">Costo: <b>{costo.toFixed(2)} EUR </b></label>
              <label htmlFor="" className="text-sm font-normal">Ganancia: <b>{(precio - costo).toFixed(2)} EUR</b></label>
            </div>


          <div className="flex justify-end items-center space-x-4">


            <button
              type="button"
              onClick={onClose}
              className="mr-2 bg-gray-300 text-gray-700 px-4 py-2 rounded"
            >
              Cancelar
            </button>

            <button
              onClick={handleSubmitReceta}
              className={`bg-blue-500 text-white px-4 py-2 rounded ${receta ? 'ml-auto' : ''}`}
            >
              {receta ? 'Guardar Cambios' : 'Agregar'}
            </button>

          </div>

        </div>
      </div>
    </div>
  );
};



