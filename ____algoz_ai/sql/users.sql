-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jun 09, 2024 at 09:28 PM
-- Server version: 10.11.7-MariaDB-cll-lve
-- PHP Version: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `u184668114_users`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` bigint(11) NOT NULL,
  `userInitTimestamp` timestamp NOT NULL DEFAULT current_timestamp(),
  `phonenum` varchar(512) DEFAULT NULL,
  `fullName` varchar(1024) DEFAULT NULL,
  `password` varchar(1024) DEFAULT NULL,
  `pwdHash` varchar(1024) DEFAULT NULL,
  `aux1` varchar(512) DEFAULT NULL,
  `lastDateTime` varchar(64) DEFAULT NULL,
  `lastDate` varchar(64) NOT NULL,
  `lastTime` varchar(64) NOT NULL,
  `lastDay` varchar(32) NOT NULL,
  `brokerId` varchar(256) DEFAULT NULL,
  `initIPaddr` varchar(256) DEFAULT NULL,
  `lastIPaddr` varchar(512) DEFAULT NULL,
  `lastSymbol` varchar(64) NOT NULL,
  `mostSymbols` varchar(1024) NOT NULL,
  `
   traderType` varchar(32) NOT NULL,
  `tradeRawId` bigint(20) NOT NULL,
  `tradeSize` int(11) DEFAULT NULL,
  `traderAUM` float DEFAULT NULL,
  `lastPrice` float NOT NULL,
  `lastPrDate` varchar(64) NOT NULL,
  `optionStrategy` varchar(512) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` bigint(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
