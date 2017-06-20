-- MySQL dump 10.13  Distrib 5.7.18, for Linux (x86_64)
--
-- Host: localhost    Database: union_institution
-- ------------------------------------------------------
-- Server version	5.7.18-0ubuntu0.16.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `basetype`
--

DROP TABLE IF EXISTS `basetype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `basetype` (
  `typeCode` varchar(20) NOT NULL,
  `typeCategory` varchar(20) DEFAULT NULL,
  `description` varchar(20) DEFAULT NULL,
  `orderBy` bigint(2) DEFAULT NULL,
  `attribute1` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`typeCode`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `basetype`
--

LOCK TABLES `basetype` WRITE;
/*!40000 ALTER TABLE `basetype` DISABLE KEYS */;
INSERT INTO `basetype` VALUES ('STATUS_ACT','TYPE_STATUS','Activo',NULL,NULL),('STATUS_INS','TYPE_STATUS','Inscrito',NULL,NULL),('TYPE_ADRA','TYPE_INTITUTION','ADRA',8,'adra.png'),('TYPE_ASOC','TYPE_INTITUTION','Asociacion',7,'asociacion.png'),('TYPE_CHURCH','TYPE_INTITUTION','Iglesia',1,'iglesia.png'),('TYPE_CLINIC','TYPE_INTITUTION','Clinica',5,'clinica.png'),('TYPE_INTITUTION','TYPE_INTITUTION','SEHS',4,'SEHS.png'),('TYPE_OTHER','TYPE_INTITUTION','Otros',9,'otros.png'),('TYPE_RADIO','TYPE_INTITUTION','Radio TV',6,'radio.png'),('TYPE_SCHOOL','TYPE_INTITUTION','Escuela/Colegio',2,'colegio.png'),('TYPE_UNIVERSITY','TYPE_INTITUTION','Universidad',3,'universidad.png');
/*!40000 ALTER TABLE `basetype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `campaign`
--

DROP TABLE IF EXISTS `campaign`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `campaign` (
  `id` bigint(20) NOT NULL,
  `campaingName` varchar(100) DEFAULT NULL,
  `departamentId` bigint(20) DEFAULT NULL,
  `description` varchar(200) DEFAULT NULL,
  `message` varchar(250) DEFAULT NULL,
  `statusCampaign` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `campaign`
--

LOCK TABLES `campaign` WRITE;
/*!40000 ALTER TABLE `campaign` DISABLE KEYS */;
/*!40000 ALTER TABLE `campaign` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `city`
--

DROP TABLE IF EXISTS `city`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `city` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `countryName` varchar(25) NOT NULL,
  `stateName` varchar(40) NOT NULL,
  `cityName` varchar(40) NOT NULL,
  `cityDescription` varchar(120) NOT NULL,
  `latitude` decimal(10,7) NOT NULL,
  `longitude` decimal(10,7) NOT NULL,
  `altitude` decimal(5,1) NOT NULL,
  `stateId` bigint(20) DEFAULT NULL,
  `countryId` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_city_country` (`countryId`),
  KEY `FK_city_state` (`stateId`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `city`
--

LOCK TABLES `city` WRITE;
/*!40000 ALTER TABLE `city` DISABLE KEYS */;
INSERT INTO `city` VALUES (3,'Juliaca','Juliaca\'','Juliaca','Juliaca - San Roman - Puno',-15.4928378,-70.1387381,15.0,NULL,NULL),(5,'Lima','Lima','Lima','Lima - Lima - Lima',-12.0553011,-77.0802424,14.0,NULL,NULL),(6,'Lima','Arequipa','Arequipa','Arequipa',-16.4000965,-71.5381778,14.0,NULL,NULL),(7,'Puno','Puno','Puno','Puno - Puno - Puno',-15.8420560,-70.0314074,16.0,NULL,NULL),(8,'Cusco','Cusco','Cusco','Cusco - Cusco - Cusco',-13.5287651,-71.9705349,16.0,NULL,NULL),(9,'Tacna','Tacna','Tacna','Tacna - Tacna - tacna',-18.0177548,-70.2466174,16.5,NULL,NULL);
/*!40000 ALTER TABLE `city` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hibernate_sequence`
--

DROP TABLE IF EXISTS `hibernate_sequence`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hibernate_sequence` (
  `next_val` bigint(20) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hibernate_sequence`
--

LOCK TABLES `hibernate_sequence` WRITE;
/*!40000 ALTER TABLE `hibernate_sequence` DISABLE KEYS */;
INSERT INTO `hibernate_sequence` VALUES (6);
/*!40000 ALTER TABLE `hibernate_sequence` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `institution`
--

DROP TABLE IF EXISTS `institution`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `institution` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `url` varchar(100) DEFAULT NULL,
  `nameInstitution` varchar(60) DEFAULT NULL,
  `summary` varchar(100) DEFAULT NULL,
  `description` varchar(200) DEFAULT NULL,
  `address` varchar(80) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `cityId` bigint(20) DEFAULT NULL,
  `latitude` varchar(50) DEFAULT NULL,
  `longitude` varchar(50) DEFAULT NULL,
  `owner` varchar(50) DEFAULT NULL,
  `status` varchar(20) DEFAULT NULL,
  `typeInstitution` varchar(20) DEFAULT NULL,
  `createdBy` varchar(20) DEFAULT NULL,
  `dateCreated` datetime DEFAULT NULL,
  `dateLastUpdated` datetime DEFAULT NULL,
  `lastUpdatedBy` varchar(20) DEFAULT NULL,
  `version` int(20) DEFAULT '0',
  `city_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_complex_city` (`cityId`),
  KEY `FK_institution_institutionStatus` (`status`),
  KEY `FK_institution_typeInstitution` (`typeInstitution`),
  KEY `FKfuud07sw3kk1gg7jw9c4enve7` (`city_id`),
  CONSTRAINT `FK_complex_city` FOREIGN KEY (`cityId`) REFERENCES `city` (`id`),
  CONSTRAINT `FK_institution_institutionStatus` FOREIGN KEY (`status`) REFERENCES `basetype` (`typeCode`),
  CONSTRAINT `FK_institution_typeInstitution` FOREIGN KEY (`typeInstitution`) REFERENCES `basetype` (`typeCode`),
  CONSTRAINT `FKfuud07sw3kk1gg7jw9c4enve7` FOREIGN KEY (`city_id`) REFERENCES `city` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `institution`
--

LOCK TABLES `institution` WRITE;
/*!40000 ALTER TABLE `institution` DISABLE KEYS */;
INSERT INTO `institution` VALUES (6,'www.mosojmuju.com','Centro de Convenciones Mosoj Muju',NULL,NULL,'Salida a Puno km 2',NULL,NULL,'-15.5217596','-70.1202883',NULL,NULL,'TYPE_CHURCH',NULL,NULL,NULL,NULL,0,3),(7,'www.iasdindependencia.com','Iglesia de Independencia',NULL,NULL,'Salida a Puno km 2',NULL,NULL,'-15.509523','-70.121378',NULL,NULL,'TYPE_CHURCH',NULL,NULL,NULL,NULL,0,3),(8,'www.iasd-cerrocolorado.com','Iglesia de Cerro Colorado',NULL,NULL,'Jr Tumbes',NULL,NULL,'-15.501238','-70.127060',NULL,NULL,'TYPE_CHURCH',NULL,NULL,NULL,NULL,0,3),(9,'www.iasd-rinconada.com','Iglesia de la Rinconada',NULL,NULL,'Jr Callao - La Rinconada',NULL,NULL,'-15.499810','-70.134602',NULL,NULL,'TYPE_CHURCH',NULL,NULL,NULL,NULL,0,3),(10,'www.iasd-centralsion.com','Iglesia de Central Sion',NULL,NULL,'Carretera a Arequipa km 6',NULL,NULL,'-15.5133595','-70.1731311',NULL,NULL,'TYPE_CHURCH',NULL,NULL,NULL,NULL,0,3),(11,'www.iasd-garzon-lima.com','Iglesia de la Garzon',NULL,NULL,'Jr. Garzon',NULL,NULL,'-12.0669633','-77.0452996',NULL,NULL,'TYPE_CHURCH',NULL,NULL,NULL,NULL,0,5),(12,'www.iasd-brasil-lima.com','Iglesia de la av. Brasil',NULL,NULL,'Av. Brasil Nro',NULL,NULL,'-12.081219','-77.058633',NULL,NULL,'TYPE_CHURCH',NULL,NULL,NULL,NULL,0,5),(13,'www.iasd-espana-lima.com','Iglesia de la av. España',NULL,NULL,'Av. Espana 1515',NULL,NULL,'-12.058227','-77.043150',NULL,NULL,'TYPE_CHURCH',NULL,NULL,NULL,NULL,0,5),(14,'www.iasd-sanmiguel-lima.com','Iglesia de San Miguel',NULL,NULL,'Av. Los Patriotas',NULL,NULL,'-12.077832','-77.096168',NULL,NULL,'TYPE_CHURCH',NULL,NULL,NULL,NULL,0,5),(15,'www.iasd-sanmiguel-lima.com','Iglesia de Pando',NULL,NULL,'Av. Los Eucaliptos - Pando San Miguel',NULL,NULL,'-12.062712','-77.083443',NULL,NULL,'TYPE_CHURCH',NULL,NULL,NULL,NULL,0,5);
/*!40000 ALTER TABLE `institution` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-06-20  8:58:51
