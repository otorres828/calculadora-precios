const fastify = require("fastify")({ logger: true });
const fastifyCors = require('@fastify/cors');

const IP = require("ip");
const dotenv = require("dotenv");
const path = require("path");

fastify.register(fastifyCors, {
 origin: "*", // Allow all origins
 methods: ["GET", "POST"]
});
dotenv.config({
  path: path.resolve(__dirname, ".env"),
});

const routerIngredientes = require('./routes/ingredientes.routes.js')
// const routerRecetas = require("./routes/recetas.routes.js");

fastify.register(routerIngredientes);
// fastify.register(routerRecetas);


// INICIAR SERVIDOR
const PORT = process.env.PORT || 3000;
fastify.listen(PORT, "0.0.0.0", (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`Servidor corriendo en el puerto ${PORT}`);
});

//Obtener el ip del servidor
fastify.get("/", (req, reply) => {
  const ipAddress = IP.address();
  reply.send(ipAddress);
});

module.exports = fastify;
