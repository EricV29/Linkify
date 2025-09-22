-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: linkifydb
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `book`
--

DROP TABLE IF EXISTS `book`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `book` (
  `folio` varchar(100) NOT NULL,
  `title` text,
  `autor` varchar(255) DEFAULT NULL,
  `existencia` int DEFAULT NULL,
  `statusbook` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`folio`),
  KEY `folio_index` (`folio`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `book`
--

LOCK TABLES `book` WRITE;
/*!40000 ALTER TABLE `book` DISABLE KEYS */;
INSERT INTO `book` VALUES ('FF1','Angel sin ojos','Loret de Mola y Carlos',1,'disponible'),('FF10','Hipnotismo','Dunne y Desmond',1,'disponible'),('FF100','Derecho 1','Arias Pur¢n y Ricardo Travis',0,'disponible'),('FF101','Derecho 1','Arias Pur¢n y Ricardo Travis',1,'disponible'),('FF102','Derecho 1','Arias Pur¢n y Ricardo Travis',1,'disponible'),('FF103','Derecho 1','Arias Pur¢n y Ricardo Travis',1,'disponible'),('FF104','Derecho 2','Arias Pur¢n y Ricardo Travis',1,'disponible'),('FF105','Derecho 2','Arias Pur¢n y Ricardo Travis',1,'disponible'),('FF106','Derecho 2','Arias Pur¢n y Ricardo Travis',1,'disponible'),('FF107','Derecho 2','Arias Pur¢n y Ricardo Travis',1,'disponible'),('FF108','Derecho 2','Arias Pur¢n y Ricardo Travis',1,'disponible'),('FF109','Derecho 2','Arias Pur¢n y Ricardo Travis',1,'disponible'),('FF11','QB VII','Uris y Le¢n ',1,'disponible'),('FF110','Derecho 2','Arias Pur¢n y Ricardo Travis',1,'disponible'),('FF111','Derecho 2','Arias Pur¢n y Ricardo Travis',1,'disponible'),('FF112','Biolog¡a 1','Gama Fuentes y Mar¡a de los ?ngeles',1,'disponible'),('FF113','Biolog¡a 1','Gama Fuentes y Maria de los ?ngeles',1,'disponible'),('FF114','Biolog¡a 1','Gama Fuentes y Maria de los ?ngeles',1,'disponible'),('FF115','Biolog¡a 1','Gama Fuentes y Maria de los ?ngeles',1,'disponible'),('FF116','Biolog¡a 1','Gama Fuentes y Maria de los ?ngeles',1,'disponible'),('FF117','Biolog¡a 1','Gama Fuentes y Maria de los ?ngeles',1,'disponible'),('FF118','Biologia 1','Gama Fuentes y Maria de los ?ngeles',1,'disponible'),('FF119','Biologia 1','Gama Fuentes y Maria de los ?ngeles',1,'disponible'),('FF12','Resurreci¢n ','Tolstoi y Lev Nikolaevich',1,'disponible'),('FF120','Anatom¡a y Fisiolog¡a e Higiene','Rodr¡guez Pinto y Mario',1,'disponible'),('FF121','Anatom¡a  y Fisiolog¡a e Higiene','Rodr¡guez Pinto y Mario',1,'disponible'),('FF122','Anatomia y Fisiolog¡a e Higiene','Rodriguez Pinto y Mario',1,'disponible'),('FF123','Anatom¡a y Fisiolog¡a e Higiene','Rodr¡guez Pinto y Mario',1,'disponible'),('FF124','Anatom¡a y Fisiolog¡a e Higiene','Rodr¡guez Pinto y Mario',1,'disponible'),('FF125','Anatom¡a y Fisiolog¡a e Higiene','Rodr¡guez Pinto y Mario',1,'disponible'),('FF126','Anatom¡a y Fisiolog¡a e Higiene','Rodr¡guez Pinto y Mario',1,'disponible'),('FF127','Anatom¡a y Fisiolog¡a e Higiene','Rodr¡guez Pinto y Mario',1,'disponible'),('FF128','Geometr¡a Anal¡tica','Caballero C. y Arquimedes',1,'disponible'),('FF129','Geometr¡a Anal¡tica','Caballero C. y Arquimedes',1,'disponible'),('FF13','Mart¡n Fierro','Hern ndez y Jose',1,'disponible'),('FF130','Geometr¡a Anal¡tica','Caballero C. y Arquimedes',1,'disponible'),('FF131','Geometr¡a Anal¡tica','Caballero C. y Arquimedes',1,'disponible'),('FF132','Geometr¡a Anal¡tica','Caballero C. y Arquimedes',1,'disponible'),('FF133','Geometr¡a Anal¡tica','Caballero C. y Arquimedes',1,'disponible'),('FF134','Geometr¡a Anal¡tica','Caballero C. y Arquimedes',1,'disponible'),('FF135','Geometr¡a Anal¡tica','Caballero C. y Arquimedes',1,'disponible'),('FF136','Ecolog¡a y Medio Ambiente','V zquez Conde y Rosalino',1,'disponible'),('FF137','Ecologia y Medio Ambiente','V zquez Conde y Rosalino',1,'disponible'),('FF138','Ecologia y Medio Ambiente','V zquez Conde y Rosalino',1,'disponible'),('FF139','Ecologia y Medio Ambiente','V zquez Conde y Rosalino',1,'disponible'),('FF14','Segundo libro de ajedrez','Reinfold y Fred',1,'disponible'),('FF140','Ecologia y Medio Ambiente','V zquez Conde y Rosalino',1,'disponible'),('FF141','Ecologia y Medio Ambiente','V zquez Conde y Rosalino',1,'disponible'),('FF142','Ecologia y Medio Ambiente','V zquez Conde y Rosalino',1,'disponible'),('FF143','Ecologia y Medio Ambiente ','V zquez Conde y Rosalino',1,'disponible'),('FF144','Inform tica para Cursos de Bachillerato','Ferreyra CortEs y Gonzalo',1,'disponible'),('FF145','Inform tica para Cursos de Bachillerato','Ferreyra CortEs y Gonzalo',1,'disponible'),('FF146','Inform tica para Cursos de bachillerato','Ferreyra CortEs y Gonzalo',1,'disponible'),('FF147','Inform tica para Cursos de Bachillerato','Ferreyra CortEs y Gonzalo',1,'disponible'),('FF148','Inform tica para Cursos de Bachillerato','Ferreyra CortEs y Gonzalo',1,'disponible'),('FF149','Inform tica para Cursos de Bachillerato','Ferreyra CortEs y Gonzalo',1,'disponible'),('FF15','La Cartuja de parma','Stendhal',1,'disponible'),('FF150','Inform tica para Cursos de Bachillerato','Ferreyra CortEs y Gonzalo',1,'disponible'),('FF151','Dreamweaver CS5','Casla Villares y Pablo',1,'disponible'),('FF152','Dreamweaver CS5','Casla Villares y Pablo',1,'disponible'),('FF153','Dreamweaver CS5','Casla Villares y Pablo',1,'disponible'),('FF154','Dreamweaver CS5','Casla Villares y Pablo',1,'disponible'),('FF155','Dreamweaver CS5','Casla Villares y Pablo',1,'disponible'),('FF156','Dreamweaver CS5','Casla Villares y Pablo',1,'disponible'),('FF157','MEDIA Active','MEDIA Active - Autor no Disponible',1,'disponible'),('FF158','MEDIA Active ','MEDIA Active - Autor no Disponible',1,'disponible'),('FF159','MEDIA Active','MEDIA Active - Autor no Disponible',1,'disponible'),('FF16','Topaz','Uris y Le¢n ',1,'disponible'),('FF160','MEDIA Active','MEDIA Active - Autor no Disponible',1,'disponible'),('FF161','MEDIA Active ','MEDIA Active - Autor no Disponible',1,'disponible'),('FF162','MEDIA Active','MEDIA Active - Autor no Disponible',1,'disponible'),('FF163','MEDIA Active','MEDIA Active - Autor no Disponible',1,'disponible'),('FF164','MEDIA Active','MEDIA Active - Autor no Disponible',1,'disponible'),('FF165','Fundamentos de Programaci¢n','Joyanes Aguilar y Luis',1,'disponible'),('FF166','Fundamentos de Programaci¢n','Joyanes Aguilar y Luis ',1,'disponible'),('FF167','Fundamentos de Programaci¢n ','Joyanes Aguilar y Luis',1,'disponible'),('FF168','Fundamentos de Programaci¢n','Joyanes Aguilar y Luis',1,'disponible'),('FF1680','¨Y ahora que le pongo para el lunch? - CD','Porta Lezama y Miroslava',1,'disponible'),('FF1681','¨Y ahora que le pongo para el lunch? - CD','Porta Lezama y Miroslava',1,'disponible'),('FF1682','Guia de las Serpientes del Estado de Hidalgo','Fern ndez Badillo y Leonardo',1,'disponible'),('FF1683','Guia de las Serpientes del Estado de Hidalgo','Fern ndez Badillo y Leonardo',1,'disponible'),('FF1684','La Oveja negra y demas fabulas','Monterroso y Augusto',1,'disponible'),('FF1685','La Oveja negra y demas fabulas','Monterroso y Augusto',1,'disponible'),('FF1686','Biodiversidad del Estado de Hidalgo',' Biodiversidad del Estado de Hidalgo - Autor no Disponible',1,'disponible'),('FF1687','Biodiversidad del Estado de Hidalgo','Biodiversidad del Estado de Hidalgo - Autor no Disponible',1,'disponible'),('FF1688','Guia de los Mamiferos de la reserva de la biosfera barranca de metztitlan y Hidalgo y Mexico','Rojas Mart¡nez y Alberto Enrique',1,'disponible'),('FF1689','Guia de los Mamiferos de la reserva de la biosfera barranca de metztitlan y Hidalgo y Mexico','Rojas Mart¡nez  y Alberto Enrique',1,'disponible'),('FF169','Fundamentos de Programaci¢n','Joyanes Aguilar y Luis',1,'disponible'),('FF1690','Conflicto Distributivo entre Salarios y Ganancias','Vel zquez Orihuela y Daniel ',1,'disponible'),('FF1691','Conflicto Distributivo entre Salarios y Ganancias','Vel zquez Orihuela y Daniel',1,'disponible'),('FF1692','La Sistem tica y base del Conocimiento de la Biodiversidad','La Sistem tica y base del Conocimiento de la Biodiversidad -  Autor no Disponible',1,'disponible'),('FF1693','La Sistematica y Base del Conocimiento de la Biodiversidad','La Sistematica y Base del Conocimiento de la Biodiversidad - Autor no Disponible',1,'disponible'),('FF1694','Subjetividad y Capital y Poder','Subjetividad y Capital y Poder -  Autor no Disponible',1,'disponible'),('FF1695','Subjetividad y Capital y Poder','Subjetividad y Capital y Poder -  Autor no Disponible',1,'disponible'),('FF1696','Ciencia  y Subjetividad y Poder','Araiza Diaz y Alejandra',1,'disponible'),('FF1697','Ciencia y SubjetivIdad y Poder','Araiza D¡az y Alejandra',1,'disponible'),('FF1698','Cruzando OcEanos y Fronteras','Cruzando OcEanos y Fronteras -  Autor no Disponible',1,'disponible'),('FF1699','Cruzando OcEanos y Fronteras','Cruzando OcEanos y Fronteras -  Autor no Disponible',1,'disponible'),('FF17','La gestapo','Delarue y Jacques',1,'disponible'),('FF170','Fundamentos de Programaci¢n','Joyanes Aguilar y Luis',1,'disponible'),('FF1700','Topicos Agropecuarios','Topicos Agropecuarios - Autor no Disponible',1,'disponible'),('FF1701','Topicos Agropecuarios','Topicos Agropecuarios - Autor no Disponible',1,'disponible'),('FF1702','Jes£s Becerril','Morales Dami n y Manuel Alberto',1,'disponible'),('FF1703','Jes£s Becerril','Morales Dami n y Manuel Alberto',1,'disponible'),('FF1704','Movimientos Sociales y Pol¡ticas P£blicas','Gonz lez Garc¡a  y Robert ',1,'disponible'),('FF1705','Movimientos Sociales y Pol¡ticas P£blicas','Gonz lez Garc¡a y Robert',1,'disponible'),('FF1706','El Discurso en Mujer Moderna','Valles Ru¡z y Rosa Maria',1,'disponible'),('FF1707','El Discurso en Mujer Moderna','Valles Ruiz  y Rosa Maria ',1,'disponible'),('FF1708','Las Informadoras ','Hern ndez Carballido y Elvira',1,'disponible'),('FF1709','Las Informadoras','Hern ndez Carballido y Elvira',1,'disponible'),('FF171','Fisica y Conceptos y Aplicaciones','Tippens y Paul E.',1,'disponible'),('FF1710','Transgresi¢n y Educaci¢n y Siglos XVI-XIX','Transgresi¢n y Educaci¢n y Siglos XVI-XIX - Autor no Disponible',1,'disponible'),('FF1711','Transgresi¢n y Educaci¢n y Siglos XVI-XIX','Transgresi¢n y Educaci¢n y Siglos XVI-XIX - Autor no Disponible',1,'disponible'),('FF1712','Culturas Visuales en MExico ','Culturas Visuales en Mexico - Autor no Disponible',1,'disponible'),('FF1713','Culturas Visuales en MExico','Culturas Visuales en MExico - Autor no Disponible',1,'disponible'),('FF1714','Diagnotico Participativo de las Poblaciones Indigenas del Estado de Hidalgo. Hacia la Conformaci¢n de un  Programa Estatal de Poblaci¢n Indigena ','Diagnotico Participativo de las Poblaciones Indigenas del Estado de Hidalgo. Hacia la Conformaci¢n de un  Programa Estatal de Poblaci¢n Indigena ',1,'disponible'),('FF1715','Diagnotico Participativo de las Poblaciones Indigenas del Estado de Hidalgo. Hacia la Conformaci¢n de un  Programa Estatal de Poblaci¢n Indigena ','Diagnotico Participativo de las Poblaciones Indigenas del Estado de Hidalgo. Hacia la Conformaci¢n de un  Programa Estatal de Poblaci¢n Indigena ',1,'disponible'),('FF1716','Margarita Michelena','Hern ndez Carballido y Elvira',1,'disponible'),('FF1717','Margarita Michelena','Hern ndez Carballido y Elvira',1,'disponible'),('FF1718','Comercio y Inseguridad y Captura Institucional','Cruz Cruz y Mario ',1,'disponible'),('FF1719','Comercio y Inseguridad y Captura Institucional','Cruz Cruz y Mario ',1,'disponible'),('FF172','Fisica y Conceptos y Aplicaciones','Tippens y Paul E.',1,'disponible'),('FF1720','Reflexiones Sobre el Desarrollo Local y Los Contrastes del Desarrollo en las Localidades m s Marginadas de Hidalgo','Reflexiones Sobre el Desarrollo Local y Los Contrastes del Desarrollo en las Localidades m s Marginadas de Hidalgo - Autor no Disponible',1,'disponible'),('FF1721','Reflexiones Sobre el Desarrollo Local y Los Contrastes del Desarrollo en las Localidades m s Marginadas de Hidalgo','Reflexiones Sobre el Desarrollo Local y Los Contrastes del Desarrollo en las Localidades m s Marginadas de Hidalgo - Autor no Disponible',1,'disponible'),('FF1722','Estrategias Pr cticas para la sana Convivencia Escolar ','Estrategias Pr cticas para la sana Convivencia Escolar - Autor no Disponible',1,'disponible'),('FF1723','Estrategias Pr cticas para la sana Convivencia Escolar ','Estrategias Pr cticas para la sana Convivencia Escolar - Autor no Disponible',1,'disponible'),('FF1724','Las Doctrinas Franciscanas de MExico a Fines del Siglo XVI en las Descripciones de Antonio de Ciudad Real (O.F.M.) y su Situaci¢n Actual','Vergara Hern ndez y Arturo',1,'disponible'),('FF1725','Las Doctrinas Franciscanas de MExico a Fines del Siglo XVI en las Descripciones de Antonio de Ciudad Real (O.F.M.) y su Situaci¢n Actual','Vergara Hern ndez y Arturo',1,'disponible'),('FF1726','Zempoala y su Acueducto','Lorenzo Monterrubio y Carmen',1,'disponible'),('FF1727','Zempoala y su Acueducto ','Lorenzo Monterrubio y Carmen ',1,'disponible'),('FF1728','Nuevas Tecnolog?as de la Mercadotecnia y su Aplicaci¢n en la Ense¤anza - CD','Nuevas Tecnolog?as de la Mercadotecnia y su Aplicaci¢n en la Ense¤anza - Autor no Disponible',1,'disponible'),('FF1729','Nuevas Tecnolog?as de la Mercadotecnia y su Aplicaci¢n en la Ense¤anza - CD','Nuevas Tecnolog?as de la Mercadotecnia y su Aplicaci¢n en la Ense¤anza - Autor no Disponible',1,'disponible'),('FF173','Fisica y Conceptos y Aplicaciones','Tippens y Paul E.',1,'disponible'),('FF1730','Contrataci¢n y Captaci¢n ','Contrataci¢n y Captaci¢n - Autor no Disponible',1,'disponible'),('FF1731','Contrataci¢n y Capacitaci¢n ','Contrataci¢n y Capacitaci¢n - Autor no Disponible',1,'disponible'),('FF1732','Salud Emocional en la Ni¤es','Salud Emocional en la Ni¤es - Autor no Disponible',1,'disponible'),('FF1733','Salud Emocional en la Ni¤es','Salud Emocional en la Ni¤es - Autor no Disponibles',1,'disponible'),('FF1734','El Marketing y la Orientacion hacia el Consumidor Local','El Marketing y la Orientacion hacia el Consumidor Local - Autor no Disponible',1,'disponible'),('FF1735','El Marketing y la Orientaci¢n hacia el Consumidor Local','El Marketing y la Orientaci¢n hacia el Consumidor Local - Autor no Disponible',1,'disponible'),('FF1736','Cat logo Ilustrado de los Encinos del Parque Nacional Los M rmoles y Estado de Hidalgo y Mexico','S nchez Gonz lez y Arturo ',1,'disponible'),('FF1737','Cat logo Ilustrado de los Encinos del Parque Nacional Los M rmoles y Estado de Hidalgo y Mexico','S nchez Gonzales  y Arturo',1,'disponible'),('FF1738','Mobbing','Mobbing - Autor no Disponible',1,'disponible'),('FF1739','Mobbing','Mobbing - Autor no Disponible',1,'disponible'),('FF174','Fisica y Conceptos Y Aplicaciones','Tippens y Paul E.',1,'disponible'),('FF1740','Las PyMES de la Industria Textil','Mart¡nez Mu¤oz y Enrique',1,'disponible'),('FF1741','Las PyMES de la Industria Textil ','Mart¡nez Mu¤os y Enrique',1,'disponible'),('FF1742','Perspectiva Historica del Arte II','Perspectiva Historica del Arte II - Autor no Disponible',1,'disponible'),('FF1743','Perspectiva Hist¢rica del Arte II','Perspectiva Hist¢rica del Arte II - Autor no Disponible',1,'disponible'),('FF1744','Tula y su Jurisdicci¢n','Tula y su Jurisdicci¢n - Autor no Disponible',1,'disponible'),('FF1745','Tula y su Jurisdicci¢n ','Tula y su Jurisdicci¢n - Autor no Disponible',1,'disponible'),('FF1746','Estudios de Antropolog¡a e Historia','Estudios de Antropolog¡a e Historia',1,'disponible'),('FF1747','Estudios de Antropolog?a e Historia','Estudios de Antropolog?a e Historia - Autor no Disponible',1,'disponible'),('FF1748','Un Estudio Sobre la Trayectoria Escolar de Estudiantes de Maestria y Doctorado en Pedagog¡a de la Universidad Nacional Aut¢noma de Mexico','Garc¡a Robelo  y Octaviano',1,'disponible'),('FF1749','Un Estudio Sobre la Trayectoria Escolar de Estudiantes de Maestria y Doctorado en Pedagog¡a de la Universidad Nacional Aut¢noma de Mexico','Garc¡a Robelo  y Octaviano',1,'disponible'),('FF175','Fisica y Conseptos y Aplicaciones','Tippens y Paul E.',1,'disponible'),('FF1750','M£sica Acu tica de George Friederic Haendel','M£sica Acu tica de George Friederic Haendel - Autor no Disponible',1,'disponible'),('FF1751','M£sica Acu tica de George Friederic Haendel','M£sica Acu tica de George Friederic Haendel - Autor no Disponible',1,'disponible'),('FF1752','Preludio a dos','Hern ndez Monterrubio y Mauricio',1,'disponible'),('FF1753','Preludio a dos','Hern ndez Monterrubio y Mauricio',1,'disponible'),('FF1754','AspectosTe¢ricos de la Evaluaci¢n de las Politicas Publicas','Olvera Mejia y Talina Merit',1,'disponible'),('FF1755','AspectosTe¢ricos de la Evaluaci¢n de las Politicas Publicas','Olvera Mejia y Talina Merit',1,'disponible'),('FF1756','Contenidos B sicos en la Formaci¢n Contable','Contenidos B sicos en la Formaci¢n Contable - Autor no Disponible',1,'disponible'),('FF1757','Contenidos B sicos en la Formaci¢n Contable','Contenidos B sicos en la Formaci¢n Contable - Autor no Disponible',1,'disponible'),('FF1758','Tres Piezas de Manuel M. Ponce Para Ensamble de clarinetes','Tres Piezas de Manuel M. Ponce Para Ensamble de clarinetes - Autor no Disponible',1,'disponible'),('FF1759','Tres Piezas de Manuel M. Ponce Para Ensamble de clarinetes','Tres Piezas de Manuel M. Ponce Para Ensamble de clarinetes - Autor no Disponible',1,'disponible'),('FF176','Fisica y Conceptos y Aplicaciones','Tippens y Paul E.',1,'disponible'),('FF1760','Cuarteto Virreinal ','Bernal JimEnez y Miguel',1,'disponible'),('FF1761','Cuarteto Virreinal ','Bernal JimEnez y Miguel',1,'disponible'),('FF177','Expresi¢n y Apreciaci¢n Artisticas','Acha y Juan',1,'disponible'),('FF178','Expresi¢n y Apreciaci¢n Artisticas','Acha y Juan',1,'disponible'),('FF179','Expresi¢n y Apreciaci¢n Artisticas','Acha y Juan',1,'disponible'),('FF18','Bel ami','Maupassant y Guy de',1,'disponible'),('FF180','Expresi¢n y Apreciaci¢n Artisticas','Acha y Juan',1,'disponible'),('FF181','Expresi¢n y Apreciaci¢n Artiticas','Acha y Juan',1,'disponible'),('FF182','Expresi¢n y Apreciaci¢n Artisticas','Acha y Juan',1,'disponible'),('FF183','Expresi¢n y Apreciaci¢n Artisticas','Acha y Juan',1,'disponible'),('FF184','Expresi¢n y Apreciaci¢n Artisticas','Acha y Juan',1,'disponible'),('FF185','Fisica General','PErez Montiel y HEctor',1,'disponible'),('FF186','Fisica General','PErez Montiel y HEctor',1,'disponible'),('FF187','Fisica General','PErez Montiel y HEctor',1,'disponible'),('FF188','Fisica General ','PErez Montiel y HEctor',1,'disponible'),('FF189','Fisica General','PErez Montiel y HEctor',1,'disponible'),('FF19','La guerra de las Galias','C‚sar y Cayo Julio',1,'disponible'),('FF190','Fisica General','PErez Montiel y Hector',1,'disponible'),('FF191','Fisica General','PErez Montiel y HEctor',1,'disponible'),('FF192','Probabilidad y Estad?stica I','S nchez S nchez y Ernesto Alonso',1,'disponible'),('FF193','Probabilidad y Estadistica I','S nchez S nchez y Ernesto Alonso',1,'disponible'),('FF194','Probabilidad y Estadistica I ','S nchez S nchez y Ernesto Alonso',1,'disponible'),('FF195','Probabilidad y Estadistica I','S nchez S nchez y Ernesto Alonso',1,'disponible'),('FF196','Probabilidad y Estadistica I','S nchez S nchez y Ernesto Alonso',1,'disponible'),('FF197','Probabilidad y Estadistica I','S nchez S nchez y Ernesto Alonso',1,'disponible'),('FF198','Probabilidad y Estadistica I','S nchez S nchez y Ernesto Alonso',1,'disponible'),('FF199','Etica','Abad Pascual y Juan Jose',1,'disponible'),('FF2','Anticristo','Nietzsche y Friedrich',1,'disponible'),('FF20','Los fundamentos del ajedrez','Horowitz y I.A.',1,'disponible'),('FF200','Etica','Abad Pascual y Juan JosE',1,'disponible'),('FF201','Etica','Abad Pascual y Juan JosE',1,'disponible'),('FF202','Etica','Abad Pascual y Juan JosE',1,'disponible'),('FF203','Etica','Abad Pascual y Juan JosE',1,'disponible'),('FF204','Etica','Abad Pascual y Juan JosE',1,'disponible'),('FF205','Fundamentos de Administracion ','Munch Galindo y Lourdes',1,'disponible'),('FF206','Fundamentos de Administraci¢n','Munch Galindo y Lourdes',1,'disponible'),('FF207','Fundamentos de Administraci¢n ','Munch Galindo y Lourdes',1,'disponible'),('FF208','Fundamentos de Administraci¢n','Munch Galindo y Lourdes',1,'disponible'),('FF209','Fundamentos de Administraci¢n ','Munch Galindo y Lourdes',1,'disponible'),('FF21','La revoluci¢n rusa','Soglian y Franco',1,'disponible'),('FF210','Fundamentos de Administraci¢n ','Munch Galindo y Lourdes',1,'disponible'),('FF211','Fundamentos de Administraci¢n ','Munch Galindo y Lourdes',1,'disponible'),('FF212','Fundamentos de Administraci¢n ','Munch Galindo y Lourdes',1,'disponible'),('FF213','Geometr¡a y Trigonometr¡a','Guzm n Herrera y Abelardo',1,'disponible'),('FF214','Geometr¡a y Trigonometria','Guzm n Herrera y Abelardo',1,'disponible'),('FF215','Geometr¡a y Trigonometr¡a','Guzm n Herrera y Abelardo',1,'disponible'),('FF216','Geometr¡a y Trigonometr¡a','Guzm n Herrera y Abelardo',1,'disponible'),('FF217','Geometr¡a y Trigonometr¡a','Guzm n Herrera y Abelardo ',1,'disponible'),('FF218','Geometr¡a y Trigonometr¡a','Guzm n Herrera y Abelardo',1,'disponible'),('FF219','Geometr¡a y Trigonometr¡a','Guzm n Herrera y Abelardo',1,'disponible'),('FF22','Werther Reineke el zorro','Goethe y Johann Wolfgang von ',1,'disponible'),('FF220','Geometr¡a y Trigonometria','Guzm n Herrera y Abelardo',1,'disponible'),('FF221','Geograf¡a para Preparator¡a ','Ayll¢n y Teresa',1,'disponible'),('FF222','Geograf¡a para Preparatoria','Ayll¢n y Teresa',1,'disponible'),('FF223','Geograf¡a para Preparatoria','Ayll¢n y Teresa',1,'disponible'),('FF224','Geograf¡a para Preparatoria','Guzm n y Teresa',1,'disponible'),('FF225','Geograf¡a para Preparatoria','Ayll¢n y Teresa',1,'disponible'),('FF226','Geograf¡a para Preparatoria','Ayll¢n y Teresa',1,'disponible'),('FF227','Geograf¡a','Ayll¢n y Teresa',1,'disponible'),('FF228','Geograf¡a','Ayll¢n y Teresa',1,'disponible'),('FF229','Geografia','Ayll¢n y Teresa',1,'disponible'),('FF23','Pobre negro','Gallegos y R¢mulo',1,'disponible'),('FF230','Geografia','Ayll¢n y Teresa',1,'disponible'),('FF231','Geografia','Ayll¢n y Teresa',1,'disponible'),('FF232','Geografia','Ayll¢n y Teresa',1,'disponible'),('FF233','Geografia','Ayll¢n y Teresa',1,'disponible'),('FF234','Historia de la Filosof¡a','Mar¡as y Juli n',1,'disponible'),('FF235','Historia de la Filosof¡a','Mar¡as y Juli n',1,'disponible'),('FF236','Historia de la Filosof¡a','Mar¡as y Juli n',1,'disponible'),('FF237','Historia de la Filosof¡a','Mar¡as y Juli n',1,'disponible'),('FF238','Historia de la Filosof¡a','Mar¡as y Juli n',1,'disponible'),('FF239','Introducci¢n a la Historia de la Filosof¡a','Xirau y Ram¢n',1,'disponible'),('FF24','Virreyes y virreinas de la Nueva Espa¤a','Valle - Arizpe y Artemio de',1,'disponible'),('FF240','Introducci¢n a la Historia de la Filosof¡a','Xirau y Ram¢n',1,'disponible'),('FF241','Introducci¢n a la Historia de la Filosof¡a','Xirau y Ram¢n',1,'disponible'),('FF242','Introducci¢n a la Historia de la Filosof¡a','Xirau y Ram¢n',1,'disponible'),('FF243','Introducci¢n a la Historia de la Filosof¡a','Xirau y Ram¢n',1,'disponible'),('FF244','Introducci¢n a la Historia de la Filosof¡a','Xirau y Ram¢n',1,'disponible'),('FF245','Introducci¢n a la Historia de la Filosof¡a','Xirau y Ram¢n',1,'disponible'),('FF246','Introducci¢n a la Historia de la Filosof¡a','Xirau y Ram¢n',1,'disponible'),('FF247','C lculo Diferencial e Integral','Granville y William Anthony',1,'disponible'),('FF248','C lculo Diferencial e Integral ','Granville y William Anthony',1,'disponible'),('FF249','C lculo Diferencial e Integral','Granville y William Anthony',1,'disponible'),('FF25','Poesias completas','Vega y Garcilaso',1,'disponible'),('FF250','C lculo Diferencial e Integral','Granville y William Anthony',1,'disponible'),('FF251','C lculo Diferencial e Integral','Granville y William Anthony',1,'disponible'),('FF252','Calculo Diferencial e Integral','Granville y william Anthony',1,'disponible'),('FF253','C lculo Diferencial e Integral','Granville y William Anthony',1,'disponible'),('FF254','C lculo Diferencial','Ortiz Cerecedo y Francisco Javier',1,'disponible'),('FF255','Calculo diferencial','Ortiz Cerecedo y Francisco Javier',1,'disponible'),('FF256','C lculo Diferencial','Ortiz Cerecedo y Francisco Javier',1,'disponible'),('FF257','C lculo Diferncial ','Ortiz Cerecedo y Francisco Javier',1,'disponible'),('FF258','C lculo Diferencial','Ortiz Cerecedo y Francisco Javier',1,'disponible'),('FF259','C lculo Diferencial','Ortiz Cerecedo y Francisco Javier',1,'disponible'),('FF26','La perfecta Casada; Exposici¢n del cantar de cantares de Salom¢n','Luis de Le¢n',1,'disponible'),('FF260','C lculo Diferencial ','Ortiz Cerecedo y Francisco Javier',1,'disponible'),('FF261','Biologia 2','Gama Fuertes y Maria de lo Angeles',1,'disponible'),('FF262','Biologia 2','Gama Fuertes y Maria de los Angeles',1,'disponible'),('FF263','Biologia 2','Gama Fuertes y Maria de los Angeles',1,'disponible'),('FF264','Biologia 2','Gama Fuertes y Maria de los Angeles',1,'disponible'),('FF265','Biologia 2','Gama Fuertes y Mar¡a de los Angeles',1,'disponible'),('FF266','Biologia 2','Gama Fuertes y Maria de los Angeles ',1,'disponible'),('FF267','Biologia 2','Gama Fuertes y Maria de los Angeles',1,'disponible'),('FF268','Geometria Analitica','Garza Olvera y Benjamin',1,'disponible'),('FF269','Geometria Analitica','Garza Olvera y Benjamin',1,'disponible'),('FF270','Geometria Analitica','Garza Olvera y Benjamin',1,'disponible'),('FF271','Geometria Analitica','Garza Olvera y Benjamin',1,'disponible'),('FF272','Geometria Analitica','Garza Olvera y Benjamin',1,'disponible'),('FF273','Geometria Analitica','Garza Olvera y Benjamin',1,'disponible'),('FF274','Geometria Analitica','Garza Olvera y Benjamin',1,'disponible'),('FF275','Geometria Analitica ','Garza Olvera y Benjamin',1,'disponible'),('FF276','Literatura Mexicana e Iberoamericana','Celorio y Gonzalo',1,'disponible'),('FF277','Literatura Mexicana e Iberoamericana ','Celorio y Gonzalo',1,'disponible'),('FF278','Literatura Mexicana e Iberoamericana','Celorio y Gonzalo',1,'disponible'),('FF279','Literatura Mexicana e Iberoamericana','Celorio y Gonzalo',1,'disponible'),('FF280','Literatura Mexicana e Iberoamericana','Celorio y Gonzalo',1,'disponible'),('FF281','Literatura Mexicana e Iberoamericana ','Celorio y Gonzalo',1,'disponible'),('FF282','Literatura Mexicana e Iberoamericana ','Celorio y Gonzalo',1,'disponible'),('FF290','Literatura Universal','Correa PErez Alicia',1,'disponible'),('FF291','Literatura Universal','Correa PErez Alicia',1,'disponible'),('FF292','Literatura Universal','Correa PErez Alicia',1,'disponible'),('FF293','Literatura Universal','Correa PErez Alicia',1,'disponible'),('FF294','Literatura Universa','Correa PErez Alicia',1,'disponible'),('FF295','MExico','Delgado de Cant£ y Gloria M.',1,'disponible'),('FF296','MExico','Delgado de Cant£ y Gloria M.',1,'disponible'),('FF297','MExico','Delgado de Cant£ y Gloria M.',1,'disponible'),('FF298','MExico','Delgado de Cant£ y Gloria M.',1,'disponible'),('FF299','MExico','Delgado de Cant£ y Gloria M.',1,'disponible'),('FF3','Reporteros y Funcionarios','Sigal y Le¢n V.',1,'disponible'),('FF300','MExico','Delgado de Cant£ y Gloria M.',1,'disponible'),('FF301','Estructura Socioecon¢mica de MExico','Schettino Ya¤ez y Macario',1,'disponible'),('FF302','Estructura Socioecon¢mica de MExico','Schettino Ya¤ez y Macario',1,'disponible'),('FF303','Estructura Socioecon¢mica de MExico','Schettino Ya¤ez y Macario',1,'disponible'),('FF304','Estructura Socioeconomica de MExico','Schettino Ya¤ez y Macario',1,'disponible'),('FF305','Estructura Socioeconomica de MExico','Schettino Ya¤ez y Macario',1,'disponible'),('FF306','Estructura Socioecon¢mica de MExico','Schettino Ya¤ez y Macario',1,'disponible'),('FF307','Estructura Socioecon¢mica de MExico','Schettino Ya¤ez y Macario',1,'disponible'),('FF308','Introducci¢n a la Psicologia','Morris y Charles G.',1,'disponible'),('FF309','Introducci¢n a la Psicologia ','Morris y Charles G.',1,'disponible'),('FF313','Probabilidad y Estadistica','Fuenlabrada Trucios y Samuel',1,'disponible'),('FF314','Probabilidad y Estadistica','Fuenlabrada Trucios y Samuel',1,'disponible'),('FF315','Probabilidad y Estadistica','Fuenlabrada Trucios y Samuel',1,'disponible'),('FF316','Probabilidad y Estadistica','Fuenlabrada Trucios y Samuel',1,'disponible'),('FF317','Probabilidad y Estadistica','Fuenlabrada Trucios y Samuel',1,'disponible'),('FF318','Probabilidad y Estadistica','Fuenlabrada Trucios y Samuel',1,'disponible'),('FF319','Probabilidad y Estadistica','Fuenlabrada Trucios y Samuel',1,'disponible'),('FF320','Probabilidad y Estadistica ','Fuenlabrade Trucios y Samuel',1,'disponible'),('FF321','Metodologia de la Investigaci¢n','Hern ndez Sampieri y Roberto',1,'disponible'),('FF322','Metodologia de la Investigaci¢n','Hern ndez Sampieri y Roberto',1,'disponible'),('FF323','Metodologia de la Investigaci¢n ','Hern ndez Sampieri y Roberto',1,'disponible'),('FF324','Metodologia de la Investigaci¢n ','Hern ndez Sampieri y Roberto',1,'disponible'),('FF325','Metodologia de la Investigaci¢n ','Hern ndez Sampieri y Roberto',1,'disponible'),('FF326','Metodologia de la Investigaci¢n ','Hern ndez Sampieri y Roberto',1,'disponible'),('FF327','Metodologia de la Investigaci¢n','Hern ndez Sampieri y Roberto',1,'disponible'),('FF328','Metodologia de la Investigaci¢n','Hern ndez Sampieri y Roberto',1,'disponible'),('FF329','Introducci¢n a la Psicologia','Zepeda Herrera y Fernando',1,'disponible'),('FF330','Introducci¢n a la Psicologia','Zepeda Herrera y Fernando',1,'disponible'),('FF331','Introducci¢n a la Psicologia','Zepeda Herrera y Fernando',1,'disponible'),('FF332','Introducci¢n a la Psicologia','Zepeda Herrera y Fernando',1,'disponible'),('FF333','Introducci¢n a la Psicologia','Zepeda Herrera y Fernando',1,'disponible'),('FF334','Introducci¢n a la Psicologia','Zepeda Herrera y Fernando',1,'disponible'),('FF335','Etica y Valores 1','Escobar Valenzuela y Gustavo',1,'disponible'),('FF336','Etica y Valores 1','Escobar Valenzuela y Gustavo',1,'disponible'),('FF337','Etica y Valores 1','Escobar Valenzuela y Gustavo',1,'disponible'),('FF338','Etica y Valores 1','Escobar Valenzuela y Gustavo',1,'disponible'),('FF339','Etica y Valores 1','Escobar Valenzuela y Gustavo',1,'disponible'),('FF340','Etica y Valores 1','Escobar Valenzuela y Gustavo',1,'disponible'),('FF341','Etica y Valores 1','Escobar Valenzuela y Gustavo',1,'disponible'),('FF342','Etica y Valores 1','Escobar Valenzuela y Gustavo',1,'disponible'),('FF348','Tu Potencial Emprendedor','Olmos Arrayales y Jorge',1,'disponible'),('FF349','Tu Potencial Emprendedor','Olmos Arrayales y Jorge',1,'disponible'),('FF350','Tu Potencial Emprendedor','Olmos Arrayales y Jorge',1,'disponible'),('FF351','Tu Potencial Emprendedor','Olmos Arrayales y Jorge',1,'disponible'),('FF352','Tu Potencial Emprendedor','Olmos Arrayales',1,'disponible'),('FF353','Fundamentos de Marketing','Kotler y Philip',1,'disponible'),('FF354','Fundamentos de Marketing ','Kotler y Philip',1,'disponible'),('FF355','Fundamentos de Marketing','Kotler y Philip',1,'disponible'),('FF356','Fundamentos de Marketing ','Kotler y Philip',1,'disponible'),('FF357','Fundamentos de Marketing','Kotler y Philip',1,'disponible'),('FF364','QuImica Inorg nica','L¢pez Cuevas y Leticia',1,'disponible'),('FF365','Quimica Inorg nica','L¢pez Cuevas y Leticia',1,'disponible'),('FF366','Quimica Inorg nica','L¢pez Cuevas Leticia',1,'disponible'),('FF367','Quimica Inorg nica','L¢pez Cuevas y Leticia',1,'disponible'),('FF368','Quimica Inorg nica','L¢pez Cuevas y Leticia',1,'disponible'),('FF369','L¢gica para Inexpertos','Mateos Nava y Misael',1,'disponible'),('FF370','L¢gica para Inexpertos','Mateos Nava y Misael',1,'disponible'),('FF371','L¢gica para Inexpertos','Mateos Nava y Misael',1,'disponible'),('FF372','L¢gica para Inexpertos','Mateos Nava y Misael',1,'disponible'),('FF373','L¢gica para Inexpertos','Mateos Nava y Misael',1,'disponible'),('FF374','L¢gica Para Inexpertos','Mateos Nava y Misael',1,'disponible'),('FF375','L¢gica para Inexpertos','Mateos Nava y Misael',1,'disponible'),('FF376','El Principio del Placer','Pacheco y JosE Emilio',1,'disponible'),('FF377','El Principio del Placer','Pacheco y JosE Emilio',1,'disponible'),('FF378','El Principio del Placer','Pacheco y Jose Emilio',1,'disponible'),('FF379','El Principio del Placer','Pacheco y JosE Emilio',1,'disponible'),('FF380','El Principio del Placer','Pacheco y JosE Emilio',1,'disponible'),('FF381','El Principio del Placer','Pacheco y JosE Emilio',1,'disponible'),('FF382','El Principio del Placer','Pacheco y JosE Emilio',1,'disponible'),('FF383','El Principio del Placer','Pacheco y JosE Emilio',1,'disponible'),('FF384','Arist¢teles y Dante descubren los Secretos del Universo','S enz y Benjamin Alire',1,'disponible'),('FF385','Arist¢teles y Dante descubren los Secretos del Universo','S enz y Benjamin Alire',1,'disponible'),('FF386','Arist¢teles y Dante descubren los Secretos del Universo','S enz y Benjamin Alire',1,'disponible'),('FF387','El Gran Gatsby','Fitzgerald y Socott',1,'disponible'),('FF388','El Gran Gatsby','Fitzgerald y Socott',1,'disponible'),('FF389','El Gran Gatsby','Fitzgerald y Socott',1,'disponible'),('FF390','Cincuenta Sombras m s Oscuras','James y E. L',1,'disponible'),('FF391','Cincuentas Sombras m s Oscuras','James y E. L',1,'disponible'),('FF392','Cincuentas Sombras m s Oscuras','James y E. L',1,'disponible'),('FF393','Yo Antes de ti','Moyes y Jojo',1,'disponible'),('FF394','Yo Antes de ti','Moyes y Jojo',1,'disponible'),('FF395','Yo Antes de ti','Moyes y Jojo',1,'disponible'),('FF396','El Ni¤o con Pijama de Rayas','Boyne y John y 1971',1,'disponible'),('FF397','El Ni¤o con Pijama de Rayas','Boyne y John y 1971',1,'disponible'),('FF398','El Ni¤o con Pijama de Rayas','Boyne y John y 1971',1,'disponible'),('FF399','Laguna','Colagiovanni y Vanina',1,'disponible'),('FF4','La página editorial','Autor no disponible',1,'disponible'),('FF400','Laguna','Colagiovanni y Vanina',1,'disponible'),('FF401','Laguna','Colagiovanni y Vanina',1,'disponible'),('FF402','Los ?rboles Caidos tambiEn son el Bosque','Kamiya y Alejandra',1,'disponible'),('FF403','Los ?rboles Caidos tambiEn son el Bosque','Kamiya y Alejandra',1,'disponible'),('FF404','Los ?rboles Caidos tambiEn son el Bosque','Kamiya y Alejandra',1,'disponible'),('FF405','DAF','Vignoli y Beatriz',1,'disponible'),('FF406','DAF','Vignoli y Beatriz',1,'disponible'),('FF407','DAF','Vignoli y Beatriz',1,'disponible'),('FF408','La Hija de la Cabra','Araujo y Mercedes',1,'disponible'),('FF409','La Hija de la Cabra ','Araujo y Mercedes',1,'disponible'),('FF410','La Hija de la Cabra ','Araujo y Mercedes',1,'disponible'),('FF411','La livertad Total ','katchadjian y Pablo',1,'disponible'),('FF412','La livertad Total ','Katchadjian y Pablo',1,'disponible'),('FF413','La livertad Total','Katchadjian y Pablo',1,'disponible'),('FF414','El Argentino','Merz y Klaus',1,'disponible'),('FF415','El Argentino','Merz y Klaus',1,'disponible'),('FF416','El Argentino','Merz y Klaus',1,'disponible'),('FF417','La reemplazante','Garcia Curten y Fernanda',1,'disponible'),('FF418','La reemplazante','Garcia Curten y Fernanda',1,'disponible'),('FF419','La reemplazante','Garcia Curten y Fernanda',1,'disponible'),('FF420','El desayuno del Vagabundo','Gwyn y Richard',1,'disponible'),('FF421','El desayuno  del Vagabundo','Gwyn y Richard',1,'disponible'),('FF422','El desayuno  del Vagabundo','Gwyn y Richard',1,'disponible'),('FF423','Reality','Vignoli y Beatriz',1,'disponible'),('FF424','El desayuno  del Vagabundo','Gwyn y Richard',1,'disponible'),('FF425','El desayuno  del Vagabundo','Gwyn y Richard',1,'disponible'),('FF426','El restaurante de Susiyaki','Suah y Bae',1,'disponible'),('FF427','El restaurante de Susiyaki','Suah y Bae',1,'disponible'),('FF428','El restaurante de Susiyaki','Suah y Bae',1,'disponible'),('FF429','No brilla la luz verdadera','Hwang y Ji-woo',1,'disponible'),('FF43','M‚todo Integrado de Ejercicios de Lectura y Redacci¢n','Paredes y Elia Acacia',1,'disponible'),('FF430','No brilla la luz verdadera','Hwang y Ji-woo',1,'disponible'),('FF431','No brilla la luz verdadera','Hwang y Ji-woo',1,'disponible'),('FF432','Sinsentido comunes','Zaidenwerg y Ezequiel',1,'disponible'),('FF433','Sinsentido comunes','Zaidenwerg y Ezequiel',1,'disponible'),('FF434','Sinsentido comunes','Zaidenwerg y Ezequiel',1,'disponible'),('FF435','El tiempo humano ','Baek y Mu-San',1,'disponible'),('FF436','El tiempo humano ','Baek y Mu-San',1,'disponible'),('FF437','El tiempo humano','Baek y Mu-San',1,'disponible'),('FF438','Papel','Shin y Dai-ja',1,'disponible'),('FF439','Papel','Shin y Dai-ja',1,'disponible'),('FF44','M‚todo Integrado de Ejercicios de Lectura y Redacci¢n ','Paredes y Elia Acacia',1,'disponible'),('FF440','Papel','Shin y Dai-ja',1,'disponible'),('FF441','La fiesta del asno','FerrE y Juan Francisco',1,'disponible'),('FF442','La fiesta del asno','FerrE y Juan Francisco',1,'disponible'),('FF443','La fiesta del asno','FerrE y Juan Francisco',1,'disponible'),('FF444','Weichan','Llaitul y HEctor',1,'disponible'),('FF445','Weichan','Llaitul y HEctor',1,'disponible'),('FF446','Weichan','Llaitul y HEctor',1,'disponible'),('FF447','La Nueva Mayoria y el Fantasma de la Concertaci¢n','Mayol y Alberto',1,'disponible'),('FF448','La Nueva Mayoria y el Fantasma de la Concertaci¢n','Mayol y Alberto',1,'disponible'),('FF449','La Nueva Mayoria y el Fantasma de la Concertaci¢n','Mayol y Alberto',1,'disponible'),('FF45','M‚todo Integrado de Ejercicios de Lectura y Redacci¢n ','Paredes y Elia Acacia',1,'disponible'),('FF450','Operaci¢n Cavancha','Candia Cares y Ricardo',1,'disponible'),('FF451','Operaci¢n Cavancha','Candia Cares y Ricardo',1,'disponible'),('FF452','Operaci¢n Cavancha','Candia Cares y Ricardo',1,'disponible'),('FF453','L grimas de volc n ','Boyer y Jean Francois',1,'disponible'),('FF454','L grimas de volc n','Boyer y Jean Francois',1,'disponible'),('FF455','L grimas de volc n','Boyer y Jean Francois',1,'disponible'),('FF456','Letradura de la rara','Vidal y Virginia',1,'disponible'),('FF457','Letradura de la rara','Vidal y Virginia',1,'disponible'),('FF458','Letradura de la rara','Vidal y Virginia',1,'disponible'),('FF46','M‚todo Integrado de Ejercicios de Lectura y Redacci¢n ','Paredes y Elia Acacia',1,'disponible'),('FF462','Historias Extremas','Bianchini y Federico',1,'disponible'),('FF463','Historias Extremas','Bianchini y Federico',1,'disponible'),('FF464','Historias Extremas','Bianchini y Federico',1,'disponible'),('FF465','Historia de Amor = Histoire d?Amour','Jauret y Re&#769;gis',1,'disponible'),('FF466','Historia de Amor = Histoire d?Amour','Jauret y Re&#769;gis',1,'disponible'),('FF467','Historia de Amor = Histoire d?Amour','Jauret y Re&#769;gis',1,'disponible'),('FF468','Calugas','Richards y Gabriela',1,'disponible'),('FF469','Calugas','Richards y Gabriela',1,'disponible'),('FF47','M‚todo Integrado de Ejercicios de Lectura y Redacci¢n ','Paredes y Elia Acacia',1,'disponible'),('FF470','Calugas','Richards y Gabriela',1,'disponible'),('FF471','Los Dias Que Avanzaron A¤os','Reyes Riquelme y Carolina',1,'disponible'),('FF472','Los Dias Que Avanzaron A¤os','Reyes Riquelme y Carolina',1,'disponible'),('FF473','Los Dias Que Avanzaron A¤os','Reyes Riquelme y Carolina',1,'disponible'),('FF474','Asociaci¢n Ilicita','Dorat Guerra y Carlos',1,'disponible'),('FF475','Asociaci¢n Ilicita','Dorat Guerra y Carlos',1,'disponible'),('FF476','Asociaci¢n Ilicita','Dorat Guerra y Carlos',1,'disponible'),('FF477','El coleccionista de hechos y otas cosas','Arduino Pav¢n y Manuel',1,'disponible'),('FF478','El coleccionista de hechos y otas cosas','Arduino Pav¢n y Manuel',1,'disponible'),('FF479','El coleccionista de hechos y otas cosas','Arduino Pav¢n y Manuel',1,'disponible'),('FF48','M‚todo Integrado de Ejercicios de Lectura y Redacci¢n ','Paredes y Elia Acacia',1,'disponible'),('FF480','La desaparici¢n de Cristal','Lidid CEspedes y Sergio',1,'disponible'),('FF481','La desaparici¢n de Cristal','Lidid CEspedes y Sergio',1,'disponible'),('FF482','La desaparici¢n de Cristal','Lidid CEspedes y Sergio',1,'disponible'),('FF483','Bandidos','Ruiz Moscatelli y Rafael',1,'disponible'),('FF484','Bandidos','Ruiz Moscatelli y Rafael',1,'disponible'),('FF485','Bandidos','Ruiz Moscatelli y Rafael',1,'disponible'),('FF486','Informe de Da¤os','SolE y Pablo',1,'disponible'),('FF487','Informe de Da¤os','SolE y Pablo',1,'disponible'),('FF488','Informe de Da¤os','SolE y Pablo',1,'disponible'),('FF489','Cosas que Pasan ','Bonnefoy y Michel',1,'disponible'),('FF49','M‚todo Integrado de Ejercicios de Lectura y Redaccion ','Paredes y Elia Acacia',1,'disponible'),('FF490','Cosas que Pasan','Bonnefoy y Michel',1,'disponible'),('FF491','Cosas que Pasan','Bonnefoy y Michel',1,'disponible'),('FF492','K','Elphick y Lilian',1,'disponible'),('FF493','K','Elphick y Lilian',1,'disponible'),('FF494','K','Elphick y Lilian',1,'disponible'),('FF495','Afuera es Noche','DElano y Poli',1,'disponible'),('FF496','Afuera es Noche','DElano y Poli',1,'disponible'),('FF497','Afuera es Noche','DElano y Poli',1,'disponible'),('FF498','Amapolas','Amalric y Libero',1,'disponible'),('FF499','Amapolas','Amalric y Libero',1,'disponible'),('FF5','Elemento de periodismo','Guajardo y Horacio',1,'disponible'),('FF50','Metodo Integrado de Ejercicios de Lectura y Redaccion','Paredes y Elia Acacia',1,'disponible'),('FF500','Amapolas','Amalric y Libero',1,'disponible'),('FF501','La forma del Agua','Taulis y Maria InEs',1,'disponible'),('FF502','La forma del Agua','Taulis y Maria InEs',1,'disponible'),('FF503','La forma del Agua','Taulis y Maria InEs',1,'disponible'),('FF504','Y todavia no olvido','Aceit¢n Venegas y Iris',1,'disponible'),('FF505','Y todavia no olvido','Aceit¢n Venegas y Iris',1,'disponible'),('FF506','Y todavia no olvido','Aceit¢n Venegas y Iris',1,'disponible'),('FF507','En la Isla = on the Island','Poblete y Nicol s',1,'disponible'),('FF508','En la Isla = on the Island','Poblete y Nicol s',1,'disponible'),('FF509','En la Isla = on the Island','Poblete y Nicol s',1,'disponible'),('FF51','?lgebra','Baldor y Aurelio',1,'disponible'),('FF510','Cartas de AdEn','Lozoya y Johanna',1,'disponible'),('FF511','Cartas de AdEn','Lozoya y Johanna',1,'disponible'),('FF512','Cartas de AdEn','Lozoya y Johanna',1,'disponible'),('FF513','Somos tranquilos y pero nunca tanto?.','Carrera y JosE Miguel',1,'disponible'),('FF514','Somos tranquilos y pero nunca tanto?.','Carrera y JosE Miguel',1,'disponible'),('FF515','Somos tranquilos y pero nunca tanto?.','Carrera y JosE Miguel',1,'disponible'),('FF516','Palabras de tierra','Tricot y Tito',1,'disponible'),('FF517','Palabras de tierra','Tricot y Tito',1,'disponible'),('FF518','Palabras de tierra','Tricot y Tito',1,'disponible'),('FF519','Teologia Pr ctica de Liberaci¢n en el Chile de Salvador Allende','Carrier y Yves',1,'disponible'),('FF52','?lgebra','Baldor y Aurelio',1,'disponible'),('FF520','Teologia Pr ctica de Liberaci¢n en el Chile de Salvador Allende','Carrier y Yves',1,'disponible'),('FF521','Teologia Pr ctica de Liberaci¢n en el Chile de Salvador Allende','Carrier y Yves',1,'disponible'),('FF522','La Cena','Reyes y Alfonso',1,'disponible'),('FF523','La Cena','Reyes y Alfonso',1,'disponible'),('FF524','La Cena','Reyes y Alfonso',1,'disponible'),('FF525','La Cena','Reyes y Alfonso',1,'disponible'),('FF526','un samur i ve el amanecer en Acapulco','Enrigue y ?lvaro',1,'disponible'),('FF527','un samur i ve el amanecer en Acapulco','Enrigue y ?lvaro',1,'disponible'),('FF528','un samur i ve el amanecer en Acapulco','Enrigue y ?lvaro',1,'disponible'),('FF529','un samur i ve el amanecer en Acapulco','Enrigue y ?lvaro',1,'disponible'),('FF53','?lgebra','Baldor y Aurelio',1,'disponible'),('FF530','Palabras para nombrar al mundo','Fuentes Silva y Andrea',1,'disponible'),('FF531','Palabras para nombrar al mundo','Fuentes Silva y Andrea',1,'disponible'),('FF532','Palabras para nombrar al mundo','Fuentes Silva y Andrea',1,'disponible'),('FF533','Palabras para nombrar al mundo','Fuentes Silva y Andrea',1,'disponible'),('FF534','Alli te comer n las turicatas','Rivera Garza y Cristina',1,'disponible'),('FF535','Alli te comer n las turicatas','Rivera Garza y Cristina',1,'disponible'),('FF536','Alli te comer n las turicatas','Rivera Garza y Cristina',1,'disponible'),('FF537','Alli te comer n las turicatas','Rivera Garza y Cristina',1,'disponible'),('FF538','Libro del metro','Pe¤a y Emmanuel',1,'disponible'),('FF539','Libro del metro','Pe¤a y Emmanuel',1,'disponible'),('FF54','?lgebra','Baldor y Aurelio',1,'disponible'),('FF540','Libro del metro','Pe¤a y Emmanuel',1,'disponible'),('FF542','Antigua Madero Librer¡a','Fuentes Castilla  y Enrique',1,'disponible'),('FF543','Antigua Madero Librer¡a','Fuentes Castilla  y Enrique',1,'disponible'),('FF544','Antigua Madero Librer¡a','Fuentes Castilla  y Enrique',1,'disponible'),('FF545','Antigua Madero Librer¡a','Fuentes Castilla  y Enrique',1,'disponible'),('FF546','Landschaft / Hudson','PErez y Eric',1,'disponible'),('FF547','Landschaft / Hudson','PErez y Eric',1,'disponible'),('FF55','?lgebra','Baldor y Aurelio',1,'disponible'),('FF550','De como se perdio y recuper¢ el ma¡z = Tu?till o bit?il-a tup? te ixim sok te tut?il o bit?il cha? jajch te ixime','Pla y Ignacio',1,'disponible'),('FF56','?lgebra','Baldor y Aurelio',1,'disponible'),('FF57','?lgebra','Baldor y Aurelio',1,'disponible'),('FF58','Compendio de Etimolog¡as Grecolatinas del Espa¤ol','Mateos Mu¤oz y Agust¡n',1,'disponible'),('FF59','Compendio de Etimolog¡as Grecolatinas del Espa¤ol','Mateos Mu¤os y Agust¡n',1,'disponible'),('FF6','Lazarillo de Tormes','Autor no disponible',1,'disponible'),('FF60','Compendio de Etimolog¡as Grecolatinas del Espa¤ol','Mateos Mu¤oz yAgust¡n',1,'disponible'),('FF61','Compendio de Etimolog¡as Grecolatinas  del Espa¤ol','Mateos Mu¤oz y Agust¡n',1,'disponible'),('FF62','Compendio de Etimologias Grecolatinas del Espa¤ol','Mateos Mu¤oz y Agustin',1,'disponible'),('FF63','Compendio de Etimolog¡as Grecolatinas del Espa¤ol','Mateos Mu¤oz y Agust¡n',1,'disponible'),('FF64','Compendio de Etimologias Grecolatinas del Espa¤ol','Mateos Mu¤oz y Agustin',1,'disponible'),('FF646','Lucifer 113','Maberry y  Jonathan',1,'disponible'),('FF647','Lucifer 113','Maberry y  Jonathan',1,'disponible'),('FF648','El laberinto ','Reilly y Matthew',1,'disponible'),('FF65','Compendio de Etimolog¡as Grecolatinas de Mexico','Mateos Mu¤oz y Agustin',1,'disponible'),('FF650','Confesi¢n','Shepard y Sara',1,'disponible'),('FF651','Confesi¢n','Shepard y Sara',1,'disponible'),('FF652','Confesi¢n','Shepard y Sara',1,'disponible'),('FF653','Confidencias','Shepard y Sara',1,'disponible'),('FF654','Confidencias','Shepard y Sara',1,'disponible'),('FF656','Secretos','Shepard y Sara',1,'disponible'),('FF657','Secretos','Shepard y Sara',1,'disponible'),('FF658','Crueldad','Shepard y Sara',1,'disponible'),('FF659','Crueldad','Shepard y Sara',1,'disponible'),('FF66','Principios Basicos de Comunicaci¢n ','Gonz lez Alonso y Carlos',1,'disponible'),('FF660','Y ma¤ana ser n clones','Varley y John',1,'disponible'),('FF661','Y ma¤ana ser n clones','Varley y John',1,'disponible'),('FF662','Segunda cr¢nica el cazavampiros','Brewer y Heather',1,'disponible'),('FF663','Segunda cr¢nica el cazavampiros','Brewer y Heather',1,'disponible'),('FF667','El kimono escarlata','Courtenay y Christina',1,'disponible'),('FF668','El kimono escarlata','Courtenay y Christina',1,'disponible'),('FF669','Pasi¢n sombria','Herron y Rita',1,'disponible'),('FF67','Principios Basicos de comunicaci¢n','Gonzalez Alonso y Carlos',1,'disponible'),('FF670','Pasi¢n sombria','Herron y Rita',1,'disponible'),('FF671','Escritos de un insomne','Tabarovsky y Dami n',1,'disponible'),('FF672','Escritos de un insomne','Tabarovsky y Dami n',1,'disponible'),('FF673','La tercera mano','Autor no disponible',1,'disponible'),('FF674','La tercera mano','Autor no disponible',1,'disponible'),('FF675','Taxidermia','Bisama y ?lvaro',1,'disponible'),('FF676','Taxidermia','Bisama y ?lvaro',1,'disponible'),('FF677','Space invaders','Fern ndez Silanes y Nona',1,'disponible'),('FF678','Space invaders','Fern ndez Silanes y Nona',1,'disponible'),('FF679','Los restos','Keizman y Betina',1,'disponible'),('FF68','Principios Basicos de Comunicaci¢n ','Gonnz lez Alonso y Carlos',1,'disponible'),('FF680','Los restos','Keizman y Betina',1,'disponible'),('FF681','Romance de la negra rubia','Cabez¢n C mara y Gabriela',1,'disponible'),('FF682','Romance de la negra rubia','Cabez¢n C mara y Gabriela',1,'disponible'),('FF683','Chilean electric','Fern ndez Silanes y Nona',1,'disponible'),('FF684','Chilean electric','Fern ndez Silanes y Nona',1,'disponible'),('FF685','La poesia no es personal','Autor no disponible',1,'disponible'),('FF686','La poesia no es personal','Autor no disponible',1,'disponible'),('FF687','Instalaciones de la memoria ','Zondek y Veronica',1,'disponible'),('FF688','Instalaciones de la memoria','Zondek y Veronica',1,'disponible'),('FF689','Abuso de sustancias','Bernstein y Charles',1,'disponible'),('FF69','Principios Basicos de Comunicaci¢n','Gonz lez Alonso y Carlos',1,'disponible'),('FF690','Abuso de sustancias','Bernstein y Charles',1,'disponible'),('FF691','El margen de la propia vida','Coci¤a y Carlos',1,'disponible'),('FF692','El margen de la propia vida','Coci¤a y Carlos',1,'disponible'),('FF693','Actas urbe','Hern ndez y Elvira',1,'disponible'),('FF694','Actas urbe','Hern ndez y Elvira',1,'disponible'),('FF695','Shanghai','Rodr¡guez y Juan Pablo',1,'disponible'),('FF696','Shanghai','Rodr¡guez y Juan Pablo',1,'disponible'),('FF697','100 A¤os de literatura en ChiloE','Contreras Vega y Mario',1,'disponible'),('FF698','100 A¤os de literatura en ChiloE','Contreras Vega y Mario',1,'disponible'),('FF699','Vagido','Zondek y Ver¢nica',1,'disponible'),('FF7','Los Rothschild','Morton y Frederick',1,'disponible'),('FF70','Principios Basicos de Comunicaci¢n','Gonz lez Alonso y Carlos',1,'disponible'),('FF700','Vagido','Zondek y Ver¢nica',1,'disponible'),('FF701','Miss poesias','Verdugo y Mario',1,'disponible'),('FF702','Miss poesias','Verdugo y Mario',1,'disponible'),('FF704','Diarios Intimos','Wilms Montt y Teresa',1,'disponible'),('FF705','Diarios intimos','Wilms Montt y Teresa',1,'disponible'),('FF706','Erosi¢n ','L¢pez Zumelzu y Victor',1,'disponible'),('FF707','Erosi¢n','L¢pez Zumelzu y Victor',1,'disponible'),('FF709','Croma','Gordillo y Emilio',1,'disponible'),('FF71','Principios Basicos de Comunicaci¢n ','Gonz lez Alonso y Carlos',1,'disponible'),('FF710','Croma','Gordillo y Emilio',1,'disponible'),('FF711','La £ltima gauchada','Le¢n y Gonz lo',1,'disponible'),('FF712','La £ltima gauchada','Le¢n y Gonz lo',1,'disponible'),('FF713','La construcci¢n del sue¤o','Bergson y Henri',1,'disponible'),('FF714','La construcci¢n del sue¤o','Bergson y Henri',1,'disponible'),('FF715','Colofonia','Autor no disponible',1,'disponible'),('FF716','Colofonia','Autor no disponible',1,'disponible'),('FF717','Extensi¢n de la corteza','Mil n  y Eduardo',1,'disponible'),('FF718','Extensi¢n de la corteza','Mil n y Eduardo',1,'disponible'),('FF72','Principios Baicos de Comunicaci¢n ','Gonz lez Alonso y Carlos',1,'disponible'),('FF723','Civilizaciones antiguas','Trifoni y Jasmina',1,'disponible'),('FF724','Supervivientes','Rawles y james Wesley',1,'disponible'),('FF73','Principios Basicos de Comunicaci¢n','Gonz lez Alonso y Carlos',1,'disponible'),('FF74','Logica','Escobar Valenzuela y Gustavo',1,'disponible'),('FF75','Logica','Escobar Valenzuela y Gustavo',1,'disponible'),('FF76','Logica','Escobar Valenzuela yGustavo',1,'disponible'),('FF77','Logica','Escobar Valenzuela y Gustabo',1,'disponible'),('FF78','Logica','Escobar Valenzuela y Gustavo',1,'disponible'),('FF79','Logica','Escobar Valenzuela y Gustavo',1,'disponible'),('FF8','La piel de zapa','Balzac y Honore de',1,'disponible'),('FF80','Logica','Escobar Valenzuela y Gustavo',1,'disponible'),('FF81','Logica','Escobar Valenzuela y Gustavo',1,'disponible'),('FF82','Historia del Arte','Fargan Mullor y Maria del Rosario',1,'disponible'),('FF83','Historia del Arte','Fargan Mullor y Maria del Rosario',1,'disponible'),('FF84','Historia del Arte','Fargan Mullor y Maria del Rosario',1,'disponible'),('FF85','Historia del Arte','Fargan Mullor y Maria del Rosario',1,'disponible'),('FF86','Historia del Arte','Fargan Mullor y Maria del Rosario',1,'disponible'),('FF87','Historia del Arte','Fargan Mullor y Maria del Rosario',1,'disponible'),('FF88','Historia del Arte','Fargan Mullor y Maria del Rosario',1,'disponible'),('FF89','Literatura Mexicana e Iberoamericana','Teresa Ochoa y Adriana',1,'disponible'),('FF9','Rojo y negro','Stendhal',1,'disponible'),('FF90','Literatura Mexicana e iberoamericana','Teresa Ochoa y Adriana',1,'disponible'),('FF91','Literatura Mexicana e Iberoamericana','Teresa Ochoa y Adriana',1,'disponible'),('FF92','Literatura Mexicana e Iberoamericana','Teresa Ochoa y Adriana',1,'disponible'),('FF93','Literatura Mexicana e Iberoamericana','Teresa Ochoa y Adriana',1,'disponible'),('FF94','Literatura Mexicana e Iberoamericana','Teresa Ochoa y Adriana',1,'disponible'),('FF95','Literatura Mexicana e Iberoamericana','Teresa Ochoa y Adriana',1,'disponible'),('FF96','Derecho 1','Arias Pur¢n y Ricardo Travis',1,'disponible'),('FF97','Derecho 1','Arias Pur¢n y Ricardo Travis',1,'disponible'),('FF98','Derecho 1','Arias Pur¢n y Ricardo Travis',1,'disponible'),('FF99','Derecho 1','Arias Pur¢n y Ricardo Travis',1,'disponible');
/*!40000 ALTER TABLE `book` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categoryequi`
--

DROP TABLE IF EXISTS `categoryequi`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categoryequi` (
  `idCategory` int NOT NULL AUTO_INCREMENT,
  `namecategory` varchar(100) DEFAULT NULL,
  `statuscategory` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`idCategory`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categoryequi`
--

LOCK TABLES `categoryequi` WRITE;
/*!40000 ALTER TABLE `categoryequi` DISABLE KEYS */;
INSERT INTO `categoryequi` VALUES (1,'laptops','1'),(2,'control','1');
/*!40000 ALTER TABLE `categoryequi` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `equipment`
--

DROP TABLE IF EXISTS `equipment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `equipment` (
  `idEquip` int NOT NULL AUTO_INCREMENT,
  `idCategory` int DEFAULT NULL,
  `numequip` varchar(100) DEFAULT NULL,
  `statusequip` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`idEquip`),
  KEY `idCategory` (`idCategory`),
  CONSTRAINT `equipment_ibfk_1` FOREIGN KEY (`idCategory`) REFERENCES `categoryequi` (`idCategory`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `equipment`
--

LOCK TABLES `equipment` WRITE;
/*!40000 ALTER TABLE `equipment` DISABLE KEYS */;
INSERT INTO `equipment` VALUES (1,1,'1','préstamo'),(2,1,'2','1'),(3,1,'3','1'),(4,1,'4','1'),(5,1,'5L','1'),(6,1,'6L','1'),(7,2,'A1','1'),(8,2,'A2','préstamo'),(9,2,'A3','1'),(10,2,'A4','1'),(11,2,'A5','activo'),(12,2,'A6','1');
/*!40000 ALTER TABLE `equipment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `loan`
--

DROP TABLE IF EXISTS `loan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `loan` (
  `idLoan` int NOT NULL AUTO_INCREMENT,
  `numaccount` int DEFAULT NULL,
  `fechloan` datetime DEFAULT NULL,
  `fechdevloan` datetime DEFAULT NULL,
  `statusloan` varchar(100) DEFAULT NULL,
  `idUser` int DEFAULT NULL,
  PRIMARY KEY (`idLoan`),
  KEY `numaccount` (`numaccount`),
  KEY `idUser` (`idUser`),
  CONSTRAINT `loan_ibfk_1` FOREIGN KEY (`numaccount`) REFERENCES `user_client` (`numaccount`),
  CONSTRAINT `loan_ibfk_2` FOREIGN KEY (`idUser`) REFERENCES `users` (`idUser`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `loan`
--

LOCK TABLES `loan` WRITE;
/*!40000 ALTER TABLE `loan` DISABLE KEYS */;
/*!40000 ALTER TABLE `loan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `loanequipment`
--

DROP TABLE IF EXISTS `loanequipment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `loanequipment` (
  `idLoanequip` int NOT NULL AUTO_INCREMENT,
  `numempprof` int DEFAULT NULL,
  `idEquip` int DEFAULT NULL,
  `fechloanequip` datetime DEFAULT NULL,
  `fechdevloanequip` datetime DEFAULT NULL,
  `statusloanequip` varchar(100) DEFAULT NULL,
  `idUser` int DEFAULT NULL,
  PRIMARY KEY (`idLoanequip`),
  KEY `numempprof` (`numempprof`),
  KEY `idUser` (`idUser`),
  KEY `idEquip` (`idEquip`),
  CONSTRAINT `loanequipment_ibfk_1` FOREIGN KEY (`numempprof`) REFERENCES `professor` (`numempprof`),
  CONSTRAINT `loanequipment_ibfk_2` FOREIGN KEY (`idUser`) REFERENCES `users` (`idUser`),
  CONSTRAINT `loanequipment_ibfk_3` FOREIGN KEY (`idEquip`) REFERENCES `equipment` (`idEquip`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `loanequipment`
--

LOCK TABLES `loanequipment` WRITE;
/*!40000 ALTER TABLE `loanequipment` DISABLE KEYS */;
/*!40000 ALTER TABLE `loanequipment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `petition`
--

DROP TABLE IF EXISTS `petition`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `petition` (
  `idPetition` int NOT NULL AUTO_INCREMENT,
  `numbox` int DEFAULT NULL,
  `numlocker` int DEFAULT NULL,
  `namedoc` varchar(100) DEFAULT NULL,
  `namepath` varchar(100) DEFAULT NULL,
  `folio` varchar(100) DEFAULT NULL,
  `fechreg` datetime DEFAULT NULL,
  `fechfinish` datetime DEFAULT NULL,
  `state` tinyint(1) DEFAULT NULL,
  `tool` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`idPetition`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `petition`
--

LOCK TABLES `petition` WRITE;
/*!40000 ALTER TABLE `petition` DISABLE KEYS */;
/*!40000 ALTER TABLE `petition` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `petition_users`
--

DROP TABLE IF EXISTS `petition_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `petition_users` (
  `idPetitionUser` int NOT NULL AUTO_INCREMENT,
  `idPetition` int NOT NULL,
  `numaccount` int DEFAULT NULL,
  `nameAlumn` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`idPetitionUser`,`idPetition`),
  KEY `idPetition` (`idPetition`),
  CONSTRAINT `petition_users_ibfk_1` FOREIGN KEY (`idPetition`) REFERENCES `petition` (`idPetition`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `petition_users`
--

LOCK TABLES `petition_users` WRITE;
/*!40000 ALTER TABLE `petition_users` DISABLE KEYS */;
/*!40000 ALTER TABLE `petition_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `professor`
--

DROP TABLE IF EXISTS `professor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `professor` (
  `numempprof` int NOT NULL,
  `nipprof` int DEFAULT NULL,
  `nameprof` varchar(100) DEFAULT NULL,
  `secondnameprof` varchar(100) DEFAULT NULL,
  `apepuserprof` varchar(100) DEFAULT NULL,
  `apemuserprof` varchar(100) DEFAULT NULL,
  `emailuserprof` varchar(100) DEFAULT NULL,
  `fechreguserprof` datetime DEFAULT NULL,
  PRIMARY KEY (`numempprof`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `professor`
--

LOCK TABLES `professor` WRITE;
/*!40000 ALTER TABLE `professor` DISABLE KEYS */;
INSERT INTO `professor` VALUES (34938,123,'Nombre',NULL,'Apellido','Apellido','email@gmail.com','2024-04-22 00:00:00');
/*!40000 ALTER TABLE `professor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rol`
--

DROP TABLE IF EXISTS `rol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rol` (
  `idRol` int NOT NULL AUTO_INCREMENT,
  `DescpRol` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`idRol`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rol`
--

LOCK TABLES `rol` WRITE;
/*!40000 ALTER TABLE `rol` DISABLE KEYS */;
INSERT INTO `rol` VALUES (1,'Admin'),(2,'Teacher'),(3,'Librarian'),(4,'AdminArea');
/*!40000 ALTER TABLE `rol` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `state`
--

DROP TABLE IF EXISTS `state`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `state` (
  `idStatus` int NOT NULL AUTO_INCREMENT,
  `DescpStatus` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`idStatus`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `state`
--

LOCK TABLES `state` WRITE;
/*!40000 ALTER TABLE `state` DISABLE KEYS */;
INSERT INTO `state` VALUES (1,'Activo'),(2,'Inactivo');
/*!40000 ALTER TABLE `state` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_client`
--

DROP TABLE IF EXISTS `user_client`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_client` (
  `numaccount` int NOT NULL,
  `nameuserc` varchar(100) DEFAULT NULL,
  `secondnamec` varchar(100) DEFAULT NULL,
  `apepuserc` varchar(100) DEFAULT NULL,
  `apemuserc` varchar(100) DEFAULT NULL,
  `degreec` varchar(100) DEFAULT NULL,
  `emailuserc` varchar(100) DEFAULT NULL,
  `fechreguserc` datetime DEFAULT NULL,
  PRIMARY KEY (`numaccount`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_client`
--

LOCK TABLES `user_client` WRITE;
/*!40000 ALTER TABLE `user_client` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_client` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_email`
--

DROP TABLE IF EXISTS `user_email`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_email` (
  `idUser` int NOT NULL AUTO_INCREMENT,
  `numaccount` int DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`idUser`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_email`
--

LOCK TABLES `user_email` WRITE;
/*!40000 ALTER TABLE `user_email` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_email` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userc_book`
--

DROP TABLE IF EXISTS `userc_book`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userc_book` (
  `iduserc_book` int NOT NULL AUTO_INCREMENT,
  `idLoan` int NOT NULL,
  `folio` varchar(100) DEFAULT NULL,
  `numcopies` int DEFAULT NULL,
  PRIMARY KEY (`iduserc_book`),
  KEY `idLoan` (`idLoan`),
  KEY `folio` (`folio`),
  CONSTRAINT `userc_book_ibfk_1` FOREIGN KEY (`idLoan`) REFERENCES `loan` (`idLoan`),
  CONSTRAINT `userc_book_ibfk_2` FOREIGN KEY (`folio`) REFERENCES `book` (`folio`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userc_book`
--

LOCK TABLES `userc_book` WRITE;
/*!40000 ALTER TABLE `userc_book` DISABLE KEYS */;
/*!40000 ALTER TABLE `userc_book` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `idUser` int NOT NULL AUTO_INCREMENT,
  `Nameuser` varchar(100) DEFAULT NULL,
  `ApepUser` varchar(100) DEFAULT NULL,
  `ApemUser` varchar(100) DEFAULT NULL,
  `EmailUser` varchar(100) DEFAULT NULL,
  `Nickname` varchar(100) DEFAULT NULL,
  `PassUser` varchar(200) DEFAULT NULL,
  `RolUser` int DEFAULT NULL,
  `StatusUser` int DEFAULT NULL,
  `FechRegUser` datetime DEFAULT NULL,
  PRIMARY KEY (`idUser`),
  KEY `RolUser` (`RolUser`),
  KEY `StatusUser` (`StatusUser`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`RolUser`) REFERENCES `rol` (`idRol`),
  CONSTRAINT `users_ibfk_2` FOREIGN KEY (`StatusUser`) REFERENCES `state` (`idStatus`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Admin','Admin','Admin','correo@gmail.com','Admin1','Admin1',1,1,'2024-01-28 00:00:00'),(2,'Mtro','Apellido','Apellido','correo@gmail.com','mrtoUser1','mrtoUser1',2,1,'2024-04-22 00:00:00'),(3,'Mtro','Apellido','Apellido','correo@gmail.com','mrtoUser2','mrtoUser2',3,1,'2024-04-22 00:00:00'),(4,'Mtro','Apellido','Apellido','correo@gmail.com','mrtoUser3','mrtoUser3',4,1,'2024-04-22 00:00:00');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'linkifydb'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-09-21 21:09:35
