
const db = require('../../config/db');
const Ingrediente = require('../models/Ingrediente');

// Lista un ingrediente
const listar = async (req, res) => {
    try {

        const result = await db.query('SELECT * FROM ingredientes');
        res.json(result.rows);

        // const ingredientes = await Ingrediente.findAll();
        // return res.send(ingredientes);

    } catch (error) {
        console.error('Error al leer el archivo:', error);
        return res.status(500).send({ message: 'Error interno del servidor' });
    }
};

//Crea un ingredieinte
const crear = async (req, res) => {
    const { nombre, cantidad, precio } = req.body;


    // Validación básica
    if (!nombre || !cantidad || !precio) {
        return res.status(400).send({ error: 'Faltan campos obligatorios' });
    }

    try {

        // Crea un nuevo objeto de Ingrediente
        const nuevoIngrediente = await Ingrediente.create({
            nombre,
            cantidad,
            precio
        });

        return res.status(201).json(nuevoIngrediente); // Devuelve el ingrediente creado
    } catch (error) {
        console.error('Error al crear el ingrediente:', error);
        return res.status(500).send({ error: 'Error al crear el ingrediente' });
    }
};

//Actualiza un ingrediente
const actualizar = async (req, res) => {
    const { id, nombre, cantidad, precio } = req.body;

    // Validación básica del ID
    if (!id) {
        return res.status(400).send({ error: 'El ID del ingrediente es obligatorio' });
    }

    try {
        // Busca el ingrediente por ID
        const ingrediente = await Ingrediente.findByPk(id);

        if (!ingrediente) {
            return res.status(404).send({ error: 'Ingrediente no encontrado' });
        }

        // Actualiza los campos del ingrediente si se proporcionaron
        ingrediente.nombre = nombre || ingrediente.nombre;
        ingrediente.cantidad = cantidad || ingrediente.cantidad;
        ingrediente.precio = precio || ingrediente.precio;

        // Guarda los cambios en la base de datos
        await ingrediente.save();

        return res.status(200).json(ingrediente);

    } catch (error) {
        console.error('Error al actualizar el ingrediente:', error);
        return res.status(500).send({ error: 'Error al actualizar el ingrediente' });
    }
};

//Eliminar todos los ingredientes
const eliminar = async (req, res) => {
    try {
        // Elimina todos los registros de la tabla Ingrediente
        await Ingrediente.destroy({
            where: {}, // Condición vacía para eliminar todos
            truncate: true // Opcional: Trunca la tabla para un mejor rendimiento
        });

        return res.status(200).json({ message: 'Ingredientes eliminados exitosamente' });
    } catch (error) {
        console.error('Error al eliminar los ingredientes:', error);
        return res.status(500).send({ error: 'Error al eliminar los ingredientes' });
    }
};




module.exports = { listar, crear, actualizar, eliminar };
