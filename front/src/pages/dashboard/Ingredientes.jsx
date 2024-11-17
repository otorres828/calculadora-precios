import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import React, { useEffect, useState } from 'react';
import { AgregarIngrediente } from "../../components/AgregarIngrediente";
import axios from './../../api/axios'
import { useSnackbar } from "notistack";

function Ingredientes() {
  const { enqueueSnackbar } = useSnackbar();
  const [ingredientes, setIngredientes] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentIngredient, setCurrentIngredient] = useState(null);


  function obtener_ingredientes() {
    axios
      .get("/ingredientes")
      .then((response) => {
        setIngredientes(response.data)
      });
  }

  useEffect(()=>{
    obtener_ingredientes();
  },[])


  const handleAddIngredient = (ingredient) => {

    axios.post('ingredientes/crear', ingredient )
    .then((response) => {
        if (response.data.mensaje) {
          obtener_ingredientes();
          enqueueSnackbar(response.data.mensaje, { variant: "success" });
        } else {
          enqueueSnackbar(response.data.error, { variant: "warning" });
        }
      })

  };

  const handleEditIngredient = (updatedIngredient) => {
    axios.post('ingredientes/actualizar', updatedIngredient )
    .then((response) => {
        if (response.data.mensaje) {
          obtener_ingredientes();
          enqueueSnackbar(response.data.mensaje, { variant: "success" });
        } else {
          enqueueSnackbar(response.data.error, { variant: "warning" });
        }
      })
  };

  return (
    <div className="mt-12 mx-0 md:mx-8 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Ingredientes
          </Typography>
        </CardHeader>
        <CardBody className="px-0 pt-0 pb-2">
        <div className="p-4">
      <button 
        onClick={() => { setModalOpen(true); setCurrentIngredient(null); }} 
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Agregar Ingrediente
      </button>

      <table className="min-w-full border">
        <thead>
          <tr>
            <th className="border p-2">Nombre</th>
            <th className="border p-2">Cantidad (g)</th>
            <th className="border p-2">Precio por unidad</th>
            <th className="border p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {ingredientes && ingredientes.map((ingrediente, index) => (
            <tr key={index}>
              <td className="border p-2">{ingrediente.nombre}</td>
              <td className="border p-2">{ingrediente.cantidad}</td>
              <td className="border p-2">{ingrediente.precio}</td>
              <td className="border p-2">
                <button 
                  onClick={() => { setModalOpen(true); setCurrentIngredient(ingrediente); }} 
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                >
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalOpen && (
        <AgregarIngrediente 
          onClose={() => setModalOpen(false)} 
          onSubmit={currentIngredient ? handleEditIngredient : handleAddIngredient} 
          ingredient={currentIngredient} 
        />
      )}
    </div>       
        </CardBody>
      </Card>
      
    </div>
  );
}

export default Ingredientes;

