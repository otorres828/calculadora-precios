const db = require('../../config/db');
const isDevelopment = process.env.APP_ENV === 'development';

// Lista todas las recetas
const listar = async (req, res) => {
    try {

        if (isDevelopment) {
            const [rows] = await db.query('SELECT * FROM recetas');

            let news = [];
            for (let i = 0; i < rows.length; i++) {
                let receta = rows[i];
                const [ingredientes] = await db.query('SELECT i.*,r.cantidad AS cant_usada FROM ingredientes i,receta_ingrediente r where r.receta_id= ? and r.ingrediente_id=i.id order by i.id asc',[receta.id]);

                let ojb={
                    "receta":receta,
                    "ingredientes":ingredientes
                }
                news.push(ojb)
            }
            return res.json(news);
        } else {
            const result = await db.query('SELECT * FROM recetas');
            let recetas = result.rows

            let news = [];
            for (let i = 0; i < recetas.length; i++) {
                let receta = recetas[i];
                const ingredientes = await db.query('SELECT i.*,r.cantidad AS cant_usada FROM ingredientes i,receta_ingrediente r where r.receta_id= $1 and r.ingrediente_id=i.id order by i.id asc',[receta.id]);

                let ojb={
                    "receta":receta,
                    "ingredientes":ingredientes.rows
                }
                news.push(ojb)
            }
            return res.json(news);
        }

    } catch (error) {
        console.error('Error al listar recetas:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Crea una receta
const crear = async (req, res) => {
    const { nombre, descripcion, precio,unidad, ingredientes } = req.body;

    // Validación básica
    if (!nombre || !descripcion || !ingredientes || !precio) {
        return res.status(400).send({ error: 'Faltan campos obligatorios' });
    }

    try {

        let result;

        if (isDevelopment) {

            const [results] = await db.query(
                'INSERT INTO recetas (nombre, descripcion, precio,unidad) VALUES (?, ?, ?, ?)',
                [nombre, descripcion, precio,unidad]
            );

            const insertId = results.insertId;

            for (let i = 0; i < ingredientes.length; i++) {
                let item = ingredientes[i];
                await db.query(
                    'INSERT INTO receta_ingrediente (receta_id, ingrediente_id, cantidad) VALUES (?, ?, ?)',
                    [insertId, item.id, item.cant_usada]
                );
            }


            return res.status(200).json({ message: 'Receta creada exitosamente' });

        } else {

            // Inserta la receta en la tabla 'recetas'
            result = await db.query(
                'INSERT INTO recetas (nombre, descripcion, precio) VALUES ($1, $2, $3,$4) RETURNING *',
                [nombre, descripcion, precio,unidad]
            );
            const nuevaReceta = result.rows[0];

            for (let i = 0; i < ingredientes.length; i++) {
                let item = ingredientes[i];
                await db.query(
                    'INSERT INTO receta_ingrediente (receta_id, ingrediente_id, cantidad) VALUES ($1, $2, $3)',
                    [nuevaReceta.id, item.id, item.cant_usada]
                );
            }
            return res.status(201).json({ message: 'Receta creada exitosamente', receta: nuevaReceta });
        }


    } catch (error) {
        console.error('Error al crear la receta:', error);
        return res.status(500).send({ error: 'Error al crear la receta' });
    }
};

// Actualiza una receta
const actualizar = async (req, res) => {
    try {

        const { id, nombre, descripcion, precio, unidad,ingredientes } = req.body;

        // Validación básica
        if (!id || !nombre || !descripcion || !ingredientes || !precio) {
            return res.status(400).send({ error: 'Faltan campos obligatorios' });
        }

        if (isDevelopment) {

            await db.query(
                'UPDATE recetas SET nombre = ?, descripcion = ?, precio = ?, unidad = ? WHERE id = ?',
                [nombre, descripcion, precio,unidad, id]
            );

            //obtiene todos los ingredientes
            const [ingred] = await db.query(
                'SELECT * FROM receta_ingrediente WHERE receta_id = ?',
                [id]
            );

            for (let i = 0; i < ingredientes.length; i++) {
                let item = ingredientes[i];

                // Buscamos si el ingrediente ya existe en el array 'ingred'
                const existingIngred = ingred.find(ing => ing.ingrediente_id === item.id);

                if (!existingIngred) {
                    // Si no existe, lo creamos
                    await db.query(
                        'INSERT INTO receta_ingrediente (receta_id, ingrediente_id, cantidad) VALUES (?, ?, ?)',
                        [id, item.id, item.cant_usada]
                    );
                } else {
                    // Si existe, lo actualizamos (ajusta la consulta UPDATE según tus necesidades)
                    await db.query(
                        'UPDATE receta_ingrediente SET cantidad = ? WHERE receta_id = ? AND ingrediente_id = ?',
                        [item.cant_usada, id, item.id]
                    );
                }
            }

            //si hay elementos en la tabla que no estanen el array se eliminan
            for (let i = 0; i < ingred.length; i++) {
                let item = ingred[i];

                const buscar = ingredientes.find(ing => ing.id == item.ingrediente_id);

                if (!buscar) {
                    console.log(item)
                    // Si no existe, lo creamos
                    await db.query(
                        'DELETE FROM receta_ingrediente WHERE ingrediente_id = ? AND receta_id= ?',
                        [item.ingrediente_id, id]
                    );
                }
            }

            return res.status(200).json({ message: 'Receta actualizada exitosamente' });



        } else {

            await db.query(
                'UPDATE recetas SET nombre = $1, descripcion = $2, precio = $3 ,unidad = $4 WHERE id = $5',
                [nombre, descripcion, precio,unidad, id]
            );

            // Obtiene todos los ingredientes
            const { rows: ingred } = await db.query(
                'SELECT * FROM receta_ingrediente WHERE receta_id = $1',
                [id]
            );

            for (let i = 0; i < ingredientes.length; i++) {
                const item = ingredientes[i];

                // Buscamos si el ingrediente ya existe en el array 'ingred'
                const existingIngred = ingred.find(ing => ing.ingrediente_id === item.id);

                if (!existingIngred) {
                    // Si no existe, lo creamos
                    await db.query(
                        'INSERT INTO receta_ingrediente (receta_id, ingrediente_id, cantidad) VALUES ($1, $2, $3)',
                        [id, item.id, item.cant_usada]
                    );
                } else {
                    // Si existe, lo actualizamos
                    await db.query(
                        'UPDATE receta_ingrediente SET cantidad = $1 WHERE receta_id = $2 AND ingrediente_id = $3',
                        [item.cant_usada, id, item.id]
                    );
                }
            }

            //si hay elementos en la tabla que no estanen el array se eliminan
            for (let i = 0; i < ingred.length; i++) {
                let item = ingred[i];

                const buscar = ingredientes.find(ing => ing.id == item.ingrediente_id);

                if (!buscar) {
                    console.log(item)
                    // Si no existe, lo creamos
                    await db.query(
                        'DELETE FROM receta_ingrediente WHERE ingrediente_id = $1 AND receta_id= $2',
                        [item.ingrediente_id, id]
                    );
                }
            }

            return res.status(200).json({ message: 'Receta actualizada exitosamente' });
        }

    } catch (error) {
        console.error('Error al listar recetas:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Elimina una receta
const eliminar = async (req, res) => {
    // ... Implementación similar a eliminar ingrediente, considerando la eliminación de los registros asociados en la tabla intermedia
};

module.exports = { crear, listar, actualizar, eliminar };