-- MySQL dump 10.13  Distrib 9.0.1, for macos14.7 (x86_64)
--
-- Host: localhost    Database: ec_code
-- ------------------------------------------------------
-- Server version	9.0.1

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
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `category_id` bigint NOT NULL,
  `pages` int NOT NULL,
  `publication_date` datetime NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `book`
--

LOCK TABLES `book` WRITE;
/*!40000 ALTER TABLE `book` DISABLE KEYS */;
INSERT INTO `book` VALUES (1,'Le Pouvoir du Moment Présent','Un ouvrage essentiel sur la pleine conscience et la spiritualité.',3,256,'1997-01-01 00:00:00','2025-01-09 14:59:03','2025-01-09 14:59:03'),(2,'Les 7 habitudes des gens efficaces','Un guide pratique pour améliorer sa productivité et ses relations.',4,432,'1989-01-01 00:00:00','2025-01-09 14:59:03','2025-01-09 14:59:03'),(3,'L’Alchimiste','Un roman spirituel qui inspire à poursuivre ses rêves.',3,208,'1988-05-01 00:00:00','2025-01-09 14:59:03','2025-01-09 14:59:03'),(4,'Réfléchissez et devenez riche','Des principes de succès et de richesse basés sur la pensée positive.',5,238,'1937-01-01 00:00:00','2025-01-09 14:59:03','2025-01-09 14:59:03'),(5,'Comment se faire des amis','Un guide sur l\'art de la communication et des relations humaines.',6,291,'1936-10-01 00:00:00','2025-01-09 14:59:03','2025-01-09 14:59:03'),(6,'Les Secrets de l\'esprit millionnaire','Des stratégies pour transformer sa mentalité et réussir financièrement.',7,288,'2005-01-01 00:00:00','2025-01-09 14:59:03','2025-01-09 14:59:03'),(7,'Pensez et devenez riche','Un ouvrage de développement personnel pour atteindre l\'indépendance financière.',7,250,'1937-01-01 00:00:00','2025-01-09 14:59:03','2025-01-09 14:59:03'),(8,'La Magie du rangement','L\'art de désencombrer pour trouver la paix intérieure.',1,240,'2011-10-01 00:00:00','2025-01-09 14:59:03','2025-01-09 14:59:03'),(9,'Le Moine qui vendit sa Ferrari','Un conte sur la quête du bonheur et du succès intérieur.',3,198,'1997-06-01 00:00:00','2025-01-09 14:59:03','2025-01-09 14:59:03'),(10,'Le Cercle des menteurs','L\'histoire d\'une entreprise basée sur la manipulation et le mensonge.',5,350,'1996-04-01 00:00:00','2025-01-09 14:59:03','2025-01-09 14:59:03'),(11,'L\'art de la guerre','Des stratégies militaires appliquées au leadership et à la gestion.',4,273,'2005-01-01 00:00:00','2025-01-09 14:59:03','2025-01-09 14:59:03'),(12,'Le Charisme','Comment développer son charisme et sa présence.',6,240,'2002-01-01 00:00:00','2025-01-09 14:59:03','2025-01-09 14:59:03'),(13,'La Magie du matin','Un livre pour transformer sa vie en adoptant une routine matinale.',1,208,'2016-01-01 00:00:00','2025-01-09 14:59:03','2025-01-09 14:59:03'),(14,'Réveillez le leader en vous','Un guide pour développer des compétences de leadership et de gestion.',4,400,'2014-10-01 00:00:00','2025-01-09 14:59:03','2025-01-09 14:59:03'),(15,'La semaine de 4 heures','Comment réorganiser sa vie pour travailler moins et profiter davantage.',5,416,'2007-04-01 00:00:00','2025-01-09 14:59:03','2025-01-09 14:59:03'),(16,'Une vie de créativité','Ouvrage sur la façon de stimuler et développer sa créativité.',9,250,'2012-05-01 00:00:00','2025-01-09 14:59:03','2025-01-09 14:59:03'),(17,'Vivre et réussir','Conseils pratiques pour une vie équilibrée et réussie.',1,289,'2008-11-01 00:00:00','2025-01-09 14:59:03','2025-01-09 14:59:03'),(18,'La richesse intérieure','Des stratégies pour cultiver la paix intérieure et l\'épanouissement personnel.',3,210,'2010-05-01 00:00:00','2025-01-09 14:59:03','2025-01-09 14:59:03'),(19,'Vaincre le stress','Méthodes pratiques pour gérer le stress et retrouver son calme.',2,300,'2009-01-01 00:00:00','2025-01-09 14:59:03','2025-01-09 14:59:03'),(20,'L\'art du bonheur','Une exploration des principes qui mènent à une vie plus heureuse et épanouie.',1,210,'2001-01-01 00:00:00','2025-01-09 14:59:03','2025-01-09 14:59:03'),(21,'Le Seigneur des Anneaux','Une épopée fantastique écrite par J.R.R. Tolkien',1,1178,'1954-07-29 00:00:00','2025-01-09 14:59:03','2025-01-09 14:59:03'),(22,'1984','Un roman dystopique de George Orwell',2,328,'1949-06-08 00:00:00','2025-01-09 14:59:03','2025-01-09 14:59:03');
/*!40000 ALTER TABLE `book` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `book_read`
--

DROP TABLE IF EXISTS `book_read`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `book_read` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `book_id` bigint NOT NULL,
  `rating` decimal(5,2) DEFAULT NULL,
  `description` longtext COLLATE utf8mb4_unicode_ci,
  `is_read` tinyint(1) NOT NULL,
  `cover` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `book_read`
--

LOCK TABLES `book_read` WRITE;
/*!40000 ALTER TABLE `book_read` DISABLE KEYS */;
INSERT INTO `book_read` VALUES (1,1,1,5.00,'<ul><li>Excellente introduction à la pleine conscience.</li><li>Un livre transformateur pour ceux qui cherchent à vivre dans l\'instant présent.</li><li>Des pratiques concrètes pour réduire le stress et l\'anxiété.</li></ul>',1,NULL,'2025-01-09 14:59:03','2025-01-09 14:59:03'),(2,1,2,4.50,'<ul><li>Des conseils pratiques et bien structurés pour améliorer sa productivité.</li><li>Les habitudes sont faciles à appliquer dans la vie quotidienne.</li><li>Parfait pour ceux qui cherchent à se fixer des objectifs clairs et les atteindre.</li></ul>',1,NULL,'2025-01-09 14:59:03','2025-01-09 14:59:03'),(3,1,3,NULL,'<ul><li>Un roman fascinant qui combine aventure et sagesse spirituelle.</li><li>Le message sur la poursuite des rêves est puissant et inspirant.</li><li>Une lecture qui pousse à la réflexion sur sa propre vie.</li></ul>',0,NULL,'2025-01-09 14:59:03','2025-01-09 14:59:03'),(4,1,4,NULL,'<ul><li>Une analyse approfondie de la psychologie de la richesse.</li><li>Les principes sont toujours d\'actualité et appliqués par de nombreux entrepreneurs.</li><li>Des conseils pratiques pour ceux qui veulent améliorer leur situation financière.</li></ul>',0,NULL,'2025-01-09 14:59:03','2025-01-09 14:59:03'),(5,1,5,NULL,'<ul><li>Un guide intemporel pour améliorer ses relations personnelles et professionnelles.</li><li>Les principes sont faciles à appliquer et extrêmement efficaces.</li><li>Un livre incontournable pour ceux qui souhaitent exceller dans l\'art de la communication.</li></ul>',0,NULL,'2025-01-09 14:59:03','2025-01-09 14:59:03'),(6,1,6,4.00,'<ul><li>Une approche intéressante sur la façon de penser comme un riche.</li><li>Les conseils sont pertinents, mais il faut un engagement réel pour réussir.</li><li>Un excellent livre pour ceux qui veulent changer leur mentalité financière.</li></ul>',1,NULL,'2025-01-09 14:59:03','2025-01-09 14:59:03'),(7,1,7,NULL,'<ul><li>Des principes solides sur la réussite, mais parfois un peu redondants.</li><li>Une lecture inspirante, mais il faut faire preuve de patience pour appliquer les concepts.</li><li>Idéal pour ceux qui sont prêts à s’investir dans leur développement personnel.</li></ul>',0,NULL,'2025-01-09 14:59:03','2025-01-09 14:59:03'),(8,1,8,4.00,'<ul><li>Un livre qui montre comment le rangement peut changer notre vie intérieure.</li><li>Des conseils pratiques et faciles à suivre pour désencombrer sa maison et son esprit.</li><li>Un bon livre pour commencer un changement positif dans sa vie quotidienne.</li></ul>',1,NULL,'2025-01-09 14:59:03','2025-01-09 14:59:03'),(9,1,9,5.00,'<ul><li>Une fable inspirante qui combine sagesse et développement personnel.</li><li>Les enseignements sur la recherche de l\'épanouissement intérieur sont précieux.</li><li>Un livre qui incite à une remise en question profonde de ses priorités.</li></ul>',1,NULL,'2025-01-09 14:59:03','2025-01-09 14:59:03'),(10,1,10,3.00,'<ul><li>Une critique intéressante de la manipulation dans le monde des affaires.</li><li>Le livre est parfois difficile à suivre, mais il apporte une réflexion utile.</li><li>Peut être un peu trop négatif pour certains lecteurs.</li></ul>',1,NULL,'2025-01-09 14:59:03','2025-01-09 14:59:03');
/*!40000 ALTER TABLE `book_read` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'Développement personnel','Livres axés sur le dépassement de soi, la discipline et l\'amélioration continue.','2025-01-09 14:59:03','2025-01-09 14:59:03'),(2,'Psychologie','Ouvrages pour comprendre et améliorer son fonctionnement mental, gérer le stress et les émotions.','2025-01-09 14:59:03','2025-01-09 14:59:03'),(3,'Spiritualité','Textes sur la méditation, la pleine conscience, la quête de sens et l\'épanouissement spirituel.','2025-01-09 14:59:03','2025-01-09 14:59:03'),(4,'Leadership et management','Livres pour développer ses compétences de leader, motiver une équipe et gérer des projets efficacement.','2025-01-09 14:59:03','2025-01-09 14:59:03'),(5,'Business','Ouvrages sur la création, la gestion et le développement d\'une entreprise.','2025-01-09 14:59:03','2025-01-09 14:59:03'),(6,'Communication','Textes pour améliorer ses interactions, développer l\'empathie et gérer les conflits.','2025-01-09 14:59:03','2025-01-09 14:59:03'),(7,'Finance','Livres pour apprendre à gérer ses finances, investir et atteindre l\'indépendance financière.','2025-01-09 14:59:03','2025-01-09 14:59:03'),(8,'Bien-être','Axé sur l\'amélioration du corps et de l\'esprit par la nutrition, le sport, et le sommeil.','2025-01-09 14:59:03','2025-01-09 14:59:03'),(9,'Créativité','Livres sur l\'expression de son potentiel créatif et l\'innovation dans différents domaines.','2025-01-09 14:59:03','2025-01-09 14:59:03'),(10,'Motivation','Ouvrages pour apprendre à surmonter les épreuves, rebondir et trouver de l\'inspiration.','2025-01-09 14:59:03','2025-01-09 14:59:03');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(180) COLLATE utf8mb4_unicode_ci NOT NULL,
  `roles` json NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime DEFAULT NULL COMMENT '(DC2Type:datetime_immutable)',
  `updated_at` datetime DEFAULT NULL COMMENT '(DC2Type:datetime_immutable)',
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQ_8D93D649E7927C74` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'test@example.fr','[\"ROLE_USER\"]','$2y$13$6tKd7qE2AgM5PZVlY6lkSugfpWYn8gXTKqFGW3/QvQwzqBMU8Kwna','2025-01-09 14:59:40','2025-01-09 14:59:40');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_book`
--

DROP TABLE IF EXISTS `user_book`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_book` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `book_id` int NOT NULL,
  `notes` longtext COLLATE utf8mb4_unicode_ci,
  `rating` double DEFAULT NULL,
  `is_finished` tinyint(1) NOT NULL,
  `created_at` datetime NOT NULL COMMENT '(DC2Type:datetime_immutable)',
  `updated_at` datetime NOT NULL COMMENT '(DC2Type:datetime_immutable)',
  PRIMARY KEY (`id`),
  KEY `IDX_B164EFF8A76ED395` (`user_id`),
  KEY `IDX_B164EFF816A2B381` (`book_id`),
  CONSTRAINT `FK_B164EFF816A2B381` FOREIGN KEY (`book_id`) REFERENCES `book` (`id`),
  CONSTRAINT `FK_B164EFF8A76ED395` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_book`
--

LOCK TABLES `user_book` WRITE;
/*!40000 ALTER TABLE `user_book` DISABLE KEYS */;
INSERT INTO `user_book` VALUES (25,1,21,'dwq',4.5,1,'2025-01-09 15:44:45','2025-01-09 15:44:45');
/*!40000 ALTER TABLE `user_book` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-01-09 16:53:13
