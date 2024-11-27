-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2024. Nov 25. 10:19
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `autodb`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `autok`
--

CREATE TABLE `autok` (
  `id` int(11) NOT NULL,
  `brand` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  `fuel` varchar(50) NOT NULL,
  `power` int(11) NOT NULL,
  `price` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `autok`
--

INSERT INTO `autok` (`id`, `brand`, `model`, `fuel`, `power`, `price`) VALUES
(1, 'Audi', 'A3', 'Benzin', 150, 8000000.00),
(2, 'BMW', '320i', 'Benzin', 180, 9500000.00),
(3, 'Mercedes', 'C-Class', 'Dízel', 200, 12000000.00),
(4, 'Volkswagen', 'Golf', 'Benzin', 130, 7500000.00),
(5, 'Toyota', 'Corolla', 'Benzin', 115, 5500000.00),
(6, 'Ford', 'Focus', 'Dízel', 160, 8500000.00),
(7, 'Honda', 'Civic', 'Benzin', 140, 8500000.00),
(8, 'Audi', 'Q5', 'Benzin', 250, 15000000.00),
(9, 'BMW', 'X5', 'Dízel', 300, 22000000.00),
(10, 'Mercedes', 'E-Class', 'Dízel', 220, 18000000.00),
(11, 'Volkswagen', 'Passat', 'Dízel', 180, 10000000.00),
(12, 'Renault', 'Megane', 'Benzin', 120, 6500000.00),
(13, 'Peugeot', '308', 'Benzin', 130, 7000000.00),
(14, 'Fiat', '500', 'Benzin', 90, 4000000.00),
(15, 'Opel', 'Astra', 'Benzin', 110, 6000000.00),
(16, 'Kia', 'Ceed', 'Benzin', 150, 8000000.00),
(17, 'Hyundai', 'i30', 'Benzin', 120, 7500000.00),
(18, 'Ford', 'Fiesta', 'Benzin', 95, 5000000.00),
(19, 'Skoda', 'Octavia', 'Dízel', 200, 12000000.00),
(20, 'Nissan', 'Qashqai', 'Benzin', 160, 9500000.00),
(21, 'Chevrolet', 'Cruze', 'Benzin', 130, 7000000.00),
(22, 'Mazda', 'CX-5', 'Dízel', 180, 11000000.00),
(23, 'Toyota', 'Yaris', 'Benzin', 105, 6500000.00),
(24, 'BMW', '520d', 'Dízel', 190, 14000000.00),
(25, 'Mercedes', 'A-Class', 'Benzin', 170, 9500000.00),
(26, 'Audi', 'A4', 'Dízel', 190, 11000000.00),
(27, 'Volkswagen', 'Tiguan', 'Benzin', 170, 10000000.00),
(28, 'Ford', 'Mondeo', 'Dízel', 210, 13000000.00),
(29, 'Renault', 'Scenic', 'Benzin', 130, 7500000.00),
(30, 'Peugeot', '5008', 'Dízel', 180, 11500000.00),
(31, 'Skoda', 'Superb', 'Benzin', 210, 13000000.00),
(32, 'Opel', 'Insignia', 'Benzin', 200, 11500000.00),
(33, 'Fiat', 'Panda', 'Benzin', 70, 3500000.00),
(34, 'Hyundai', 'Tucson', 'Benzin', 170, 12000000.00),
(35, 'Chevrolet', 'Spark', 'Benzin', 80, 4500000.00),
(36, 'Mazda', 'CX-3', 'Benzin', 135, 8500000.00),
(37, 'Toyota', 'Avensis', 'Dízel', 180, 11000000.00),
(38, 'Nissan', 'Juke', 'Benzin', 140, 9500000.00),
(39, 'BMW', '740d', 'Dízel', 320, 24000000.00),
(40, 'Mercedes', 'S-Class', 'Benzin', 350, 30000000.00),
(41, 'Volkswagen', 'Arteon', 'Dízel', 240, 19000000.00),
(42, 'Audi', 'A6', 'Benzin', 250, 20000000.00),
(43, 'Ford', 'Edge', 'Dízel', 220, 17000000.00),
(44, 'Opel', 'Mokka', 'Benzin', 140, 8000000.00),
(45, 'Peugeot', '2008', 'Benzin', 110, 7500000.00),
(46, 'Renault', 'Kadjar', 'Dízel', 160, 9500000.00),
(47, 'Skoda', 'Kodiaq', 'Benzin', 220, 16000000.00),
(48, 'Hyundai', 'Santa Fe', 'Dízel', 220, 14500000.00),
(49, 'Fiat', 'Tipo', 'Benzin', 115, 5500000.00),
(50, 'Chevrolet', 'Trax', 'Benzin', 130, 8000000.00),
(51, 'Mazda', '6', 'Dízel', 180, 11000000.00),
(52, 'Kia', 'Sportage', 'Benzin', 160, 10500000.00),
(53, 'Nissan', 'X-Trail', 'Dízel', 210, 13000000.00),
(54, 'BMW', 'M3', 'Benzin', 431, 20000000.00);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
