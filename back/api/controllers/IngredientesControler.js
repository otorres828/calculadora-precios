

const fs = require('fs').promises;
const path = require('path');
const Ingrediente = require('../models/Ingrediente');
const { Op } = require('sequelize');

// Lista un ingrediente
const listar = async (req, res) => {
    try {

        const ingredientes = await Ingrediente.findAll();
        return res.send(ingredientes);
        
    } catch (error) {
        console.error('Error al leer el archivo:', error);
        return res.status(500).send({ message: 'Error interno del servidor' });
    }
};

//Crea un ingredieinte

const crear = async (req, res) => {
    const { nombre, cantidad, precio } = req.body;
    const filePath = path.join(__dirname, '..', '../public/json', 'ingredientes.json');
    const data = await fs.readFile(filePath, 'utf8');
    const ingredients = JSON.parse(data);

    // Genera un ID alfanumérico único
    let id = generarAleatorios(10)
    
    const nuevoIngrediente = {
        id,
        nombre,
        cantidad,
        precio
    };

    ingredients.push(nuevoIngrediente)

    try {
        
        await fs.writeFile(filePath, JSON.stringify(ingredients, null, 2));
        return res.send({ mensaje: 'Ingrediente creado exitosamente', id });

    } catch (error) {
        console.error('Error al crear el ingrediente:', error);
        return res.status(500).send({ error: 'Ha ocurrido un error inesperado' });
    }
};

//Actualiza un ingrediente

const actualizar = async (req, reply) => {

    const { id, nombre, cantidad, precio } = req.body;

    const filePath = path.join(__dirname, '..', '../public/json', 'ingredientes.json');
    const data = await fs.readFile(filePath, 'utf8');
    const ingredients = JSON.parse(data);

   const index = ingredients.findIndex(item => item.id === id);

    if (index === -1) {
        return res.status(404).send({ error: 'Ingrediente no encontrado' });
    }

    const ingredienteActualizado = {
        ...ingredients[index],
        nombre: nombre || ingredients[index].nombre,
        cantidad: cantidad || ingredients[index].cantidad,
        precio: precio || ingredients[index].precio
    };

    ingredients[index] = ingredienteActualizado;
    
    try {
        await fs.writeFile(filePath, JSON.stringify(ingredients, null, 2));
        return res.send({ mensaje: 'Ingrediente actualizado exitosamente', id });
    } catch (error) {
        console.error('Error al escribir el archivo de ingredientes:', error);
        return res.status(500).send({ error: 'Ha ocurrido un error al actualizar el ingrediente' });
    }
};

const eliminar = async (req, reply) => {

    const { clave } = req.body;

    if(clave==26269828){
        const filePath = path.join(__dirname, '..', '../public/json', 'ingredientes.json');
    
        try {
            await fs.writeFile(filePath, JSON.stringify([{}], null, 2));
            return res.send({ mensaje: 'Ingredientes eliminados exitosamente' });
        } catch (error) {
            console.error('Error al escribir el archivo de ingredientes:', error);
            return res.status(500).send({ error: 'Ha ocurrido un error al eliminar los ingredientes' });
        }
    }else{
        return res.status(500).send({ error: 'falta clave' });
    }

};

function barajar(array) {
    let posicionActual = array.length;
  
    while (0 !== posicionActual) {
      const posicionAleatoria = Math.floor(Math.random() * posicionActual);
      posicionActual--;
      //"truco" para intercambiar los valores sin necesidad de una variable auxiliar
      [array[posicionActual], array[posicionAleatoria]] = [
        array[posicionAleatoria], array[posicionActual]];
    }
    return array;
  }
  
  function generarAleatorios(cantidad) {
    const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split("");
    barajar(caracteres);
    return caracteres.slice(0,cantidad).join("")
  }


module.exports = { listar,crear,actualizar,eliminar };
