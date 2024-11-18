
USE `costos`;

/*Table structure for table `abscripciones` */

DROP TABLE IF EXISTS `ingredientes`;


CREATE TABLE ingredientes (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(255) DEFAULT NULL,
  cantidad INTEGER DEFAULT NULL,
  precio VARCHAR(255) DEFAULT NULL
);
