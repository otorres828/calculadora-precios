
const express = require('express');

const { listar,crear,actualizar,eliminar } = require('../controllers/RecetasController.js');

const routerRecetas = express.Router();

//ingredientes
routerRecetas.get('/api/recetas',listar);
routerRecetas.post('/api/recetas/crear', crear);
routerRecetas.post('/api/recetas/actualizar',actualizar);
routerRecetas.delete('/api/ingredientes/eliminar',eliminar);

module.exports = routerRecetas;

