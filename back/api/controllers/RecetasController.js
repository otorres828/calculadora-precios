const db = require('../../config/db');

// Crea una receta
const crearReceta = async (req, res) => {
    const { nombre, descripcion, ingredientes, precio } = req.body;

    // Validación básica
    if (!nombre || !descripcion || !ingredientes || !precio) {
        return res.status(400).send({ error: 'Faltan campos obligatorios' });
    }

    try {
        // Inserta la receta en la tabla 'recetas'
        const result = await db.query(
            'INSERT INTO recetas (nombre, descripcion, precio) VALUES ($1, $2, $3) RETURNING *',
            [nombre, descripcion, precio]
        );
        const nuevaReceta = result.rows[0];

        // Inserta los ingredientes asociados a la receta en una tabla intermedia 'receta_ingrediente'
        const ingredienteIds = ingredientes.map(ingrediente => ingrediente.id); // Extrae los IDs de los ingredientes
        const insertIngredientesQuery = `
            INSERT INTO receta_ingrediente (receta_id, ingrediente_id)
            VALUES ${ingredienteIds.map(() => '(DEFAULT, $1)').join(', ')}
            RETURNING *;
        `;
        const values = ingredienteIds;
        await db.query(insertIngredientesQuery, values);

        return res.status(201).json({ message: 'Receta creada exitosamente', receta: nuevaReceta });
    } catch (error) {
        console.error('Error al crear la receta:', error);
        return res.status(500).send({ error: 'Error al crear la receta' });
    }
};

// Lista todas las recetas
const listarRecetas = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM recetas');
        res.json(result.rows);
    } catch (error) {
        console.error('Error al listar las recetas:', error);
        return res.status(500).send({ message: 'Error interno del servidor' });
    }
};

// Actualiza una receta
const actualizarReceta = async (req, res) => {
    // ... Implementación similar a actualizar ingrediente, considerando los ingredientes asociados
};

// Elimina una receta
const eliminarReceta = async (req, res) => {
    // ... Implementación similar a eliminar ingrediente, considerando la eliminación de los registros asociados en la tabla intermedia
};

module.exports = { crearReceta, listarRecetas, actualizarReceta, eliminarReceta };