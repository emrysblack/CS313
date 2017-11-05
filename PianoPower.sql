-- phpMyAdmin SQL Dump
-- version 4.0.5
-- http://www.phpmyadmin.net
--
-- Host: 127.12.238.130:3306
-- Generation Time: Jun 02, 2014 at 06:58 PM
-- Server version: 5.5.37
-- PHP Version: 5.3.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `PianoPower`
--

-- --------------------------------------------------------

--
-- Table structure for table `building`
--

CREATE TABLE IF NOT EXISTS `building` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(40) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=hp8 AUTO_INCREMENT=6 ;

--
-- Dumping data for table `building`
--

INSERT INTO `building` (`id`, `name`) VALUES
(1, 'Hinkley'),
(2, 'Kirkham'),
(3, 'Manwaring Center'),
(4, 'Snow'),
(5, 'Spori');

-- --------------------------------------------------------

--
-- Table structure for table `Instrument`
--

CREATE TABLE IF NOT EXISTS `Instrument` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(40) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=hp8 AUTO_INCREMENT=6 ;

--
-- Dumping data for table `Instrument`
--

INSERT INTO `Instrument` (`id`, `name`) VALUES
(1, 'piano'),
(2, 'voice'),
(3, 'string'),
(4, 'organ'),
(5, 'other');

-- --------------------------------------------------------

--
-- Table structure for table `Performance`
--

CREATE TABLE IF NOT EXISTS `Performance` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `studentId` int(10) unsigned NOT NULL,
  `skillId` int(10) unsigned NOT NULL,
  `instrumentId` int(10) unsigned NOT NULL,
  `typeId` int(10) unsigned NOT NULL,
  `roomId` int(10) unsigned NOT NULL,
  `timeId` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `studentId` (`studentId`),
  KEY `skillId` (`skillId`),
  KEY `instrumentId` (`instrumentId`),
  KEY `typeId` (`typeId`),
  KEY `roomId` (`roomId`),
  KEY `timeId` (`timeId`)
) ENGINE=InnoDB  DEFAULT CHARSET=hp8 AUTO_INCREMENT=6 ;

--
-- Dumping data for table `Performance`
--

INSERT INTO `Performance` (`id`, `studentId`, `skillId`, `instrumentId`, `typeId`, `roomId`, `timeId`) VALUES
(1, 1, 1, 1, 1, 1, 1),
(2, 2, 2, 2, 2, 2, 2),
(3, 3, 2, 3, 2, 2, 2),
(4, 4, 3, 3, 3, 3, 3),
(5, 5, 4, 4, 1, 3, 5);

-- --------------------------------------------------------

--
-- Table structure for table `Room`
--

CREATE TABLE IF NOT EXISTS `Room` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `buildingId` int(10) unsigned NOT NULL,
  `number` varchar(10) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `buildingId` (`buildingId`)
) ENGINE=InnoDB  DEFAULT CHARSET=hp8 AUTO_INCREMENT=11 ;

--
-- Dumping data for table `Room`
--

INSERT INTO `Room` (`id`, `buildingId`, `number`) VALUES
(1, 1, '210'),
(2, 1, '235'),
(3, 2, '321'),
(4, 4, '120'),
(5, 3, '270'),
(6, 5, '110'),
(7, 2, '221'),
(8, 4, '192'),
(9, 2, '230'),
(10, 3, '170');

-- --------------------------------------------------------

--
-- Table structure for table `Skill`
--

CREATE TABLE IF NOT EXISTS `Skill` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `level` varchar(40) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=hp8 AUTO_INCREMENT=5 ;

--
-- Dumping data for table `Skill`
--

INSERT INTO `Skill` (`id`, `level`) VALUES
(1, 'beginner'),
(2, 'intermediate'),
(3, 'pre-advanced'),
(4, 'advanced');

-- --------------------------------------------------------

--
-- Table structure for table `Student`
--

CREATE TABLE IF NOT EXISTS `Student` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `studentNum` int(10) unsigned NOT NULL,
  `username` varchar(40) NOT NULL,
  `password` varchar(40) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=hp8 AUTO_INCREMENT=6 ;

--
-- Dumping data for table `Student`
--

INSERT INTO `Student` (`id`, `name`, `studentNum`, `username`, `password`) VALUES
(1, 'Socrates', 123456, 'socrates', 'student'),
(2, 'Ludwig van Beethoven', 456789, 'beethoven', 'student'),
(3, 'Napoleon Bonaparte', 123789, 'napoleon', 'student'),
(4, 'Billy the Kid', 789123, 'billy', 'student'),
(5, 'Genghis Khan', 321654, 'khan', 'student');

-- --------------------------------------------------------

--
-- Table structure for table `Time`
--

CREATE TABLE IF NOT EXISTS `Time` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `slot` time NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slot` (`slot`)
) ENGINE=InnoDB  DEFAULT CHARSET=hp8 AUTO_INCREMENT=14 ;

--
-- Dumping data for table `Time`
--

INSERT INTO `Time` (`id`, `slot`) VALUES
(9, '01:00:00'),
(10, '01:30:00'),
(11, '02:00:00'),
(12, '02:30:00'),
(13, '03:00:00'),
(1, '09:00:00'),
(2, '09:30:00'),
(3, '10:00:00'),
(4, '10:30:00'),
(5, '11:00:00'),
(6, '11:30:00'),
(7, '12:00:00'),
(8, '12:30:00');

-- --------------------------------------------------------

--
-- Table structure for table `Type`
--

CREATE TABLE IF NOT EXISTS `Type` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(40) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=hp8 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `Type`
--

INSERT INTO `Type` (`id`, `name`) VALUES
(1, 'solo'),
(2, 'duet'),
(3, 'concerto');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Performance`
--
ALTER TABLE `Performance`
  ADD CONSTRAINT `Performance_ibfk_1` FOREIGN KEY (`studentId`) REFERENCES `Student` (`id`),
  ADD CONSTRAINT `Performance_ibfk_2` FOREIGN KEY (`skillId`) REFERENCES `Skill` (`id`),
  ADD CONSTRAINT `Performance_ibfk_3` FOREIGN KEY (`instrumentId`) REFERENCES `Instrument` (`id`),
  ADD CONSTRAINT `Performance_ibfk_4` FOREIGN KEY (`typeId`) REFERENCES `Type` (`id`),
  ADD CONSTRAINT `Performance_ibfk_5` FOREIGN KEY (`roomId`) REFERENCES `Room` (`id`),
  ADD CONSTRAINT `Performance_ibfk_6` FOREIGN KEY (`timeId`) REFERENCES `Time` (`id`);

--
-- Constraints for table `Room`
--
ALTER TABLE `Room`
  ADD CONSTRAINT `Room_ibfk_1` FOREIGN KEY (`buildingId`) REFERENCES `building` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
