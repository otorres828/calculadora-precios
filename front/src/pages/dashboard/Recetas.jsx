import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import React, { useEffect, useState } from 'react';
import { AgregarIngrediente } from "../../components/AgregarIngrediente";
import axios from '../../api/axios'
import { useSnackbar } from "notistack";

function Recetas() {
  const { enqueueSnackbar } = useSnackbar();
  const [recetas, setRecetas] = useState([]);
  const [ingredientes, setIngredientes] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentIngredient, setCurrentIngredient] = useState(null);


  function obtener_recetas() {
    axios
      .get("/recetas")
      .then((response) => {
        setRecetas(response.data)
        console.log(recetas)
      });
    axios
      .get("/ingredientes")
      .then((response) => {
        setIngredientes(response.data)
      });
  }

  useEffect(() => {
    obtener_recetas();
  }, [])


  const handleAddIngredient = (ingredient) => {

    axios.post('/recetas/crear', ingredient)
      .then((response) => {
        if (response.data.message) {
          obtener_recetas();
          enqueueSnackbar(response.data.message, { variant: "success" });
        } else {
          enqueueSnackbar(response.data.error, { variant: "warning" });
        }
      })

  };

  const handleEditIngredient = (updatedIngredient) => {
    axios.post('/recetas/actualizar', updatedIngredient)
      .then((response) => {
        console.log(response)
        console.log(response.data)
        if (response.data.message) {
          obtener_recetas();
          enqueueSnackbar(response.data.message, { variant: "success" });
        } else {
          enqueueSnackbar(response.data.error, { variant: "warning" });
        }
      })
  };

  const obtenerCostoReceta = (ingr) => {
    let costo=0
    for (let i = 0; i < ingr.length; i++) {
      let ingredi = ingr[i]
       costo += ingredi.cant_usada * ingredi.precio / ingredi.cantidad
    }
    return costo
  };

  return (
    <div className="md:m-12 mt-12 mx-0 md:mx-8 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Listado de Recetas
          </Typography>
        </CardHeader>
        <CardBody className="px-0 pt-0 pb-2">
          <div className="p-4">
            <div className="flex justify-end">
              <button
                onClick={() => { setModalOpen(true); setCurrentIngredient(null); }}
                className="mb-4 bg-blue-500 text-white px-4 py-2 rounded flex justify-end"
              >
                Agregar Receta
              </button>

            </div>

            <table className="min-w-full border">
              <thead>
                <tr>
                  <th className="border p-2">Nombre</th>
                  <th className="border p-2">Costo de produccion (eur)</th>
                  <th className="border p-2">Costo de Venta (eur)</th>
                  <th className="border p-2">Ganancia</th>
                  <th className="border p-2">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {recetas && recetas.map((receta, index) => (
                  <tr key={index}>
                    <td className="border p-2">{receta.receta.nombre}</td>
                    <td className="border p-2">{obtenerCostoReceta(receta.ingredientes)}</td>
                    <td className="border p-2">{receta.receta.precio}</td>
                    <td className="border p-2">{receta.receta.precio - obtenerCostoReceta(receta.ingredientes)}</td>
                    <td className="border p-2">
                      <button
                        onClick={() => { setModalOpen(true); setCurrentIngredient(receta); }}
                        className="bg-blue-500 text-white px-2 py-1 rounded"
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

export default Recetas;

