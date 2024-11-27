import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import React, { useEffect, useState } from 'react';
import axios from '../../api/axios'
import { useSnackbar } from "notistack";
import { AgregarReceta } from "../../components/AgregarReceta";

function Recetas() {
  const { enqueueSnackbar } = useSnackbar();
  const [recetas, setRecetas] = useState([]);
  const [ingredientes, setIngredientes] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentReceta, setcurrentReceta] = useState(null);


  function obtener_recetas() {
    axios
      .get("/recetas")
      .then((response) => {
        setRecetas(response.data)
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


  const handleAddReceta = (ingredient) => {

      let objeto =     {
        "id"        : ingredient.id,
        "nombre"    : ingredient.nombre,
        "descripcion": ingredient.descripcion,
        "precio": ingredient.precio,
        "ingredientes": ingredient.ingredientes
    }
      
    axios.post('/recetas/crear', objeto)
      .then((response) => {
        if (response.data.message) {
          obtener_recetas();
          enqueueSnackbar(response.data.message, { variant: "success" });
        } else {
          enqueueSnackbar(response.data.error, { variant: "warning" });
        }
      })

  };

  const handleEditReceta = (updatedIngredient) => {

      let objeto =     {
        "id"        : updatedIngredient.id,
        "nombre"    : updatedIngredient.nombre,
        "descripcion": updatedIngredient.descripcion,
        "precio": updatedIngredient.precio,
        "ingredientes": updatedIngredient.ingredientes
    }
    
    axios.post('/recetas/actualizar', objeto)
      .then((response) => {
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
                onClick={() => { setModalOpen(true); setcurrentReceta(null); }}
                className="mb-4 bg-blue-500 text-white px-4 py-2 rounded flex justify-end"
              >
                Agregar Receta
              </button>

            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white divide-y divide-gray-200">
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
                      <td className="border p-2">{obtenerCostoReceta(receta.ingredientes).toFixed(2)}</td>
                      <td className="border p-2">{receta.receta.precio}</td>
                      <td className="border p-2">{(receta.receta.precio - obtenerCostoReceta(receta.ingredientes).toFixed(2))}</td>
                      <td className="border p-2">
                        <button
                          onClick={() => { setModalOpen(true); setcurrentReceta(receta); }}
                          className="bg-blue-500 text-white px-2 py-1 rounded"
                        >
                          Editar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {modalOpen && ingredientes && (
              <AgregarReceta
                onClose={() => setModalOpen(false)}
                onSubmit={currentReceta ? handleEditReceta : handleAddReceta}
                receta={currentReceta}
                ingrd={ingredientes}
              />
            )}
          </div>
        </CardBody>
      </Card>

    </div>
  );
}

export default Recetas;

