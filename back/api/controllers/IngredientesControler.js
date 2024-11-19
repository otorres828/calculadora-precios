
const db = require('../../config/db');

// Lista un ingrediente
const listar = async (req, res) => {
    try {

        const result = await db.query('SELECT * FROM ingredientes');
        res.json(result.rows);

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
        // Ejecuta una consulta SQL para crear el nuevo ingrediente
        const result = await db.query(
            'INSERT INTO ingredientes (nombre, cantidad, precio) VALUES ($1, $2, $3) RETURNING *',
            [nombre, cantidad, precio]
        );

        // Obtiene el objeto creado del resultado de la consulta
        const nuevoIngrediente = result.rows[0];

        // return res.status(201).json(nuevoIngrediente); // Devuelve el ingrediente creado
        return res.status(200).json({ message: 'Ingredientes creado exitosamente' });


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
        // Ejecuta una consulta SQL para buscar el ingrediente por ID
        const result = await db.query(
            'SELECT * FROM ingredientes WHERE id = $1 LIMIT 1',
            [id]
        );

        let ingrediente;

        if (result.rows.length === 0) {
            return res.status(404).send({ error: 'Ingrediente no encontrado' });
        } else {
            ingrediente = result.rows[0];
        }

        // Actualiza los campos del ingrediente si se proporcionaron
        if (nombre !== undefined) ingrediente.nombre = nombre;
        if (cantidad !== undefined) ingrediente.cantidad = cantidad;
        if (precio !== undefined) ingrediente.precio = precio;

        // Ejecuta una consulta SQL para actualizar los cambios
        const updateResult = await db.query(
            'UPDATE ingredientes SET nombre = $1, cantidad = $2, precio = $3 WHERE id = $4 RETURNING *',
            [ingrediente.nombre, ingrediente.cantidad, ingrediente.precio, id]
        );

        // Obtiene el objeto actualizado del resultado de la consulta
        ingrediente = updateResult.rows[0];

        // return res.status(200).json(ingrediente);
        return res.status(200).json({ message: 'Ingredientes actualizado exitosamente' });

    } catch (error) {
        console.error('Error al actualizar el ingrediente:', error);
        return res.status(500).send({ error: 'Error al actualizar el ingrediente' });
    }
};

//Eliminar todos los ingredientes
const eliminar = async (req, res) => {
    try {
        // Ejecuta una consulta SQL para eliminar todos los registros de la tabla ingredientes
        await db.query(
            'TRUNCATE TABLE ingredientes'
        );

        return res.status(200).json({ message: 'Ingredientes eliminados exitosamente' });
    } catch (error) {
        console.error('Error al eliminar los ingredientes:', error);
        return res.status(500).send({ error: 'Error al eliminar los ingredientes' });
    }
};




module.exports = { listar, crear, actualizar, eliminar };
