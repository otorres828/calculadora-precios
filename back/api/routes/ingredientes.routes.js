const express = require('express');

const { listar,crear,actualizar,eliminar } = require('../controllers/IngredientesControler.js');

const routerIngredientes = express.Router();

//ingredientes
routerIngredientes.get('/api/ingredientes',listar);
routerIngredientes.post('/api/ingredientes/crear', crear);
routerIngredientes.post('/api/ingredientes/actualizar',actualizar);
routerIngredientes.delete('/api/ingredientes/eliminar',eliminar);

module.exports = routerIngredientes;