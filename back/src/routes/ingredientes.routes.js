
const { listar,crear,actualizar,eliminar } = require('../controllers/IngredientesControler.js');

module.exports = async function (fastify, options) {

    //ingredientes
    fastify.get('/ingredientes',listar);
    fastify.post('/ingredientes/crear', crear);
    fastify.post('/ingredientes/actualizar',actualizar);
    fastify.delete('/ingredientes/eliminar',eliminar);

}