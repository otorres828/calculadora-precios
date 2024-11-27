
USE `costos`;

/*Table structure for table `abscripciones` */

DROP TABLE IF EXISTS `ingredientes`;


CREATE TABLE ingredientes (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(255) DEFAULT NULL,
  cantidad INTEGER DEFAULT NULL,
  precio VARCHAR(255) DEFAULT NULL
);

CREATE TABLE recetas (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT
);

CREATE TABLE receta_ingrediente (
    id SERIAL PRIMARY KEY,
    receta_id INTEGER REFERENCES recetas(id),
    ingrediente_id INTEGER REFERENCES ingredientes(id),
    cantidad VARCHAR(50)
);