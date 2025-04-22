-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 05-01-2025 a las 18:38:15
-- Versión del servidor: 10.1.38-MariaDB
-- Versión de PHP: 5.6.40

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `db_local`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alm_inventario`
--

CREATE TABLE `alm_inventario` (
  `num_inventario` int(11) NOT NULL,
  `num_almacen` int(11) NOT NULL,
  `num_producto` int(11) NOT NULL,
  `cnt_stock` decimal(10,2) DEFAULT '0.00',
  `cnt_stock_min` decimal(10,2) DEFAULT '0.00',
  `mto_pcompra` decimal(10,2) DEFAULT '0.00',
  `mto_pventa` decimal(10,2) DEFAULT '0.00',
  `ind_estado` tinyint(1) DEFAULT '1',
  `fec_creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fec_modif` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alm_movimiento`
--

CREATE TABLE `alm_movimiento` (
  `num_movimiento` int(11) NOT NULL,
  `num_inventario` int(11) NOT NULL,
  `num_producto` int(11) NOT NULL,
  `fec_movimiento` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ind_tipmovim` char(1) COLLATE utf8_spanish_ci NOT NULL,
  `cnt_movimiento` decimal(10,2) DEFAULT '0.00',
  `cnt_stockprev` decimal(10,2) DEFAULT '0.00',
  `cnt_stockpost` decimal(10,2) DEFAULT '0.00',
  `des_motivo` varchar(100) COLLATE utf8_spanish_ci DEFAULT NULL,
  `cod_operacion` varchar(2) COLLATE utf8_spanish_ci DEFAULT NULL,
  `cod_cpe` char(2) COLLATE utf8_spanish_ci DEFAULT NULL,
  `num_serie` char(4) COLLATE utf8_spanish_ci DEFAULT NULL,
  `num_cpe` int(11) DEFAULT NULL,
  `fec_creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alm_producto`
--

CREATE TABLE `alm_producto` (
  `num_producto` int(11) NOT NULL,
  `cod_producto` varchar(10) COLLATE utf8_spanish_ci NOT NULL,
  `des_corta` varchar(20) COLLATE utf8_spanish_ci NOT NULL,
  `des_producto` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `des_marca` varchar(30) COLLATE utf8_spanish_ci DEFAULT NULL,
  `num_proveedor` int(11) DEFAULT NULL,
  `cod_unidad` varchar(5) COLLATE utf8_spanish_ci DEFAULT NULL,
  `cod_categoria` varchar(2) COLLATE utf8_spanish_ci DEFAULT NULL,
  `ind_estado` tinyint(1) DEFAULT '1',
  `fec_creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fec_modif` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ven_clientes`
--

CREATE TABLE `ven_clientes` (
  `num_cliente` int(11) NOT NULL,
  `cod_tipcliente` varchar(2) COLLATE utf8_spanish_ci NOT NULL,
  `num_doccliente` varchar(15) COLLATE utf8_spanish_ci DEFAULT '0',
  `nom_cliente` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `num_telefono` varchar(15) COLLATE utf8_spanish_ci DEFAULT NULL,
  `des_email` varchar(150) COLLATE utf8_spanish_ci DEFAULT NULL,
  `des_direccion` varchar(100) COLLATE utf8_spanish_ci DEFAULT NULL,
  `mto_credito` decimal(10,2) DEFAULT NULL,
  `ind_estado` tinyint(1) DEFAULT '1',
  `fec_creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fec_modif` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ven_cpe`
--

CREATE TABLE `ven_cpe` (
  `cod_cpe` char(2) COLLATE utf8_spanish_ci NOT NULL,
  `num_serie` char(4) COLLATE utf8_spanish_ci NOT NULL,
  `num_cpe` int(11) NOT NULL,
  `fec_emision` date NOT NULL,
  `cod_tipdocrec` char(2) COLLATE utf8_spanish_ci DEFAULT NULL,
  `num_docrecep` char(16) COLLATE utf8_spanish_ci DEFAULT '0',
  `des_nomrecep` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `cod_moneda` char(3) COLLATE utf8_spanish_ci NOT NULL,
  `mto_tipocambio` decimal(3,2) NOT NULL,
  `mto_totalvta` decimal(15,2) DEFAULT '0.00',
  `mto_totaligv` decimal(15,2) DEFAULT '0.00',
  `mto_imptotal` decimal(15,2) DEFAULT '0.00',
  `ind_estado` tinyint(1) DEFAULT '1',
  `ind_informado` tinyint(1) DEFAULT '0',
  `fec_creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ven_cpedet`
--

CREATE TABLE `ven_cpedet` (
  `cod_cpe` char(2) COLLATE utf8_spanish_ci NOT NULL,
  `num_serie` char(4) COLLATE utf8_spanish_ci NOT NULL,
  `num_cpe` int(11) NOT NULL,
  `num_item` int(11) NOT NULL,
  `cod_rubro` char(2) COLLATE utf8_spanish_ci NOT NULL,
  `mto_rubro` decimal(15,2) DEFAULT '0.00',
  `des_rubro` varchar(250) COLLATE utf8_spanish_ci DEFAULT NULL,
  `fec_creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ven_cpeserie`
--

CREATE TABLE `ven_cpeserie` (
  `cod_cpe` char(2) COLLATE utf8_spanish_ci NOT NULL,
  `num_serie` char(4) COLLATE utf8_spanish_ci NOT NULL,
  `ind_estado` tinyint(1) DEFAULT '1',
  `fec_creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `ven_cpeserie`
--

INSERT INTO `ven_cpeserie` (`cod_cpe`, `num_serie`, `ind_estado`, `fec_creacion`) VALUES
('00', 'N001', 1, '2024-12-14 15:03:52'),
('90', 'C001', 1, '2024-12-14 15:03:52');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ven_proveedores`
--

CREATE TABLE `ven_proveedores` (
  `num_proveedor` int(11) NOT NULL,
  `num_ruc` varchar(11) COLLATE utf8_spanish_ci NOT NULL,
  `nom_razsocial` varchar(150) COLLATE utf8_spanish_ci NOT NULL,
  `des_contacto` varchar(100) COLLATE utf8_spanish_ci DEFAULT NULL,
  `num_telefono` varchar(15) COLLATE utf8_spanish_ci DEFAULT NULL,
  `des_email` varchar(150) COLLATE utf8_spanish_ci DEFAULT NULL,
  `des_direccion` varchar(100) COLLATE utf8_spanish_ci DEFAULT NULL,
  `ind_estado` tinyint(1) DEFAULT '1',
  `fec_creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fec_modif` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ven_ventas_cli`
--

CREATE TABLE `ven_ventas_cli` (
  `num_venta` int(11) NOT NULL,
  `cod_cpe` char(2) COLLATE utf8_spanish_ci DEFAULT NULL,
  `num_serie` char(4) COLLATE utf8_spanish_ci DEFAULT NULL,
  `num_cpe` int(11) DEFAULT NULL,
  `num_cliente` int(11) DEFAULT NULL,
  `nom_cliente` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `num_doccliente` varchar(15) COLLATE utf8_spanish_ci DEFAULT NULL,
  `fec_emision` date DEFAULT NULL,
  `mto_imptotal` decimal(15,2) DEFAULT NULL,
  `fec_creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `zsm_catalogo`
--

CREATE TABLE `zsm_catalogo` (
  `cod_catalogo` char(4) COLLATE utf8_spanish_ci NOT NULL,
  `des_catalogo` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `des_acronimo` char(10) COLLATE utf8_spanish_ci DEFAULT NULL,
  `fec_creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `zsm_datacat`
--

CREATE TABLE `zsm_datacat` (
  `cod_catalogo` char(4) COLLATE utf8_spanish_ci NOT NULL,
  `cod_datacat` char(12) COLLATE utf8_spanish_ci NOT NULL,
  `des_datacat` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `des_larga` varchar(255) COLLATE utf8_spanish_ci DEFAULT NULL,
  `fec_creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `zsm_empresa`
--

CREATE TABLE `zsm_empresa` (
  `num_empresa` int(11) NOT NULL,
  `num_ruc` char(11) COLLATE utf8_spanish_ci NOT NULL,
  `nom_razsocial` varchar(150) COLLATE utf8_spanish_ci NOT NULL,
  `des_contacto` varchar(100) COLLATE utf8_spanish_ci DEFAULT NULL,
  `num_telefono` varchar(15) COLLATE utf8_spanish_ci DEFAULT NULL,
  `des_email` varchar(150) COLLATE utf8_spanish_ci NOT NULL,
  `des_direccion` varchar(100) COLLATE utf8_spanish_ci DEFAULT NULL,
  `ind_estado` tinyint(1) DEFAULT '1',
  `fec_creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fec_modif` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `zsm_menu`
--

CREATE TABLE `zsm_menu` (
  `num_menu` int(11) NOT NULL,
  `des_menu` varchar(50) COLLATE utf8_spanish_ci DEFAULT NULL,
  `des_url` varchar(50) COLLATE utf8_spanish_ci DEFAULT NULL,
  `cod_menu` varchar(30) COLLATE utf8_spanish_ci DEFAULT NULL,
  `cod_icono` varchar(30) COLLATE utf8_spanish_ci DEFAULT NULL,
  `num_menusup` int(11) DEFAULT NULL,
  `num_orden` int(11) DEFAULT NULL,
  `ind_estado` tinyint(1) DEFAULT '1',
  `fec_creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fec_modif` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `zsm_menu`
--

INSERT INTO `zsm_menu` (`num_menu`, `des_menu`, `des_url`, `cod_menu`, `cod_icono`, `num_menusup`, `num_orden`, `ind_estado`, `fec_creacion`, `fec_modif`) VALUES
(1, 'Configuraciones', NULL, 'conf', 'fa fa-cog', NULL, 99, 1, '2024-12-13 19:45:49', '2024-12-17 20:11:14'),
(2, 'Usuarios', 'admin/Usuario', 'conf-usua', 'fa fa-users', 1, 1, 1, '2024-12-13 19:45:49', '2024-12-17 20:11:10'),
(3, 'Catalogos', 'admin/Catalogo', 'conf-cata', 'fa fa-book', 1, 2, 1, '2024-12-13 19:56:32', '2024-12-17 20:11:05'),
(4, 'Persona', 'admin/Persona', 'conf-pers', 'fa fa-male', 1, 3, 1, '2024-12-13 19:56:32', '2024-12-15 00:01:04'),
(5, 'Empresa', 'admin/Empresa', 'conf-empr', 'fa fa-building', 1, 4, 1, '2024-12-13 19:56:32', '2024-12-15 00:01:07'),
(6, 'Almacen', NULL, 'alma', 'fa fa-archive', NULL, 1, 1, '2024-12-13 19:56:32', '2024-12-14 23:55:44'),
(7, 'Producto', 'almacen/Producto', 'alma-prod', 'fa fa-th-large', 6, 2, 1, '2024-12-14 14:40:38', '2024-12-15 00:00:55'),
(8, 'Inventario', 'almacen/Inventario', 'alma-inve', 'fa fa-product-hunt', 6, 1, 1, '2024-12-14 14:40:38', '2024-12-15 00:00:57'),
(9, 'Movimientos de Inventario', 'almacen/Movimiento', 'alma-movi', 'fa fa-arrows', 6, 3, 1, '2024-12-14 14:40:38', '2024-12-18 21:16:32'),
(10, 'Ventas', NULL, 'vent', 'fa fa-shopping-cart', NULL, 3, 1, '2024-12-14 15:19:08', '2024-12-14 23:55:47'),
(11, 'Notas de Pedido', 'ventas/NotaPedido', 'vent-nped', 'fa fa-first-order', 10, 1, 1, '2024-12-14 15:19:08', '2024-12-14 23:56:03'),
(12, 'Nota de Resumen Credito', 'ventas/NotaCreditos', 'vent-ncrd', 'fa fa-credit-card', 10, 2, 1, '2024-12-14 15:19:08', '2024-12-14 23:56:28'),
(13, 'Clientes', 'ventas/Clientes', 'vent-clie', 'fa fa-male', 10, 3, 1, '2024-12-14 15:19:08', '2024-12-14 23:56:37'),
(14, 'Proveedores', 'ventas/Proveedores', 'vent-prov', 'fa fa-building', 10, 4, 1, '2024-12-14 15:19:08', '2024-12-14 23:56:44'),
(15, 'Resumen Ventas x Cliente', 'ventas/ResumenVentasCliente', 'vent-vcli', 'fa fa-tasks', 10, 5, 1, '2024-12-14 15:19:08', '2024-12-14 23:57:02'),
(16, 'Menu', 'admin/Menu', 'conf-menu', 'fa fa-indent', 1, 5, 1, '2024-12-27 01:45:09', '2024-12-27 01:45:09'),
(17, 'Menu Asignado', 'admin/MenuAsignado', 'conf-meas', 'fa fa-align-right', 1, 6, 1, '2024-12-27 01:45:09', '2024-12-27 01:45:09'),
(18, 'Datacatalogo', 'admin/Datacatalogo', 'conf-datc', 'fa fa-table', 1, 7, 1, '2024-12-27 01:47:00', '2024-12-27 01:47:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `zsm_menu_asig`
--

CREATE TABLE `zsm_menu_asig` (
  `num_usuario` int(11) NOT NULL,
  `num_menu` int(11) NOT NULL,
  `fec_asignacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `zsm_menu_asig`
--

INSERT INTO `zsm_menu_asig` (`num_usuario`, `num_menu`, `fec_asignacion`) VALUES
(1, 2, '2024-12-15 16:50:24'),
(1, 3, '2024-12-15 16:51:52'),
(1, 4, '2024-12-15 16:51:52'),
(1, 5, '2024-12-15 16:51:52'),
(1, 7, '2024-12-15 16:51:52'),
(1, 8, '2024-12-15 16:51:52'),
(1, 9, '2024-12-15 16:51:52'),
(1, 11, '2024-12-15 16:51:52'),
(1, 12, '2024-12-15 16:51:52'),
(1, 13, '2024-12-15 16:51:52'),
(1, 14, '2024-12-15 16:51:52'),
(1, 15, '2024-12-15 16:51:52'),
(1, 16, '2024-12-27 01:48:20'),
(1, 17, '2024-12-27 01:48:20'),
(1, 18, '2024-12-27 01:48:20');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `zsm_persona`
--

CREATE TABLE `zsm_persona` (
  `num_persona` int(11) NOT NULL,
  `cod_tipdoc` char(2) COLLATE utf8_spanish_ci NOT NULL,
  `num_documento` varchar(11) COLLATE utf8_spanish_ci NOT NULL,
  `nom_persona` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `nom_apellido` varchar(100) COLLATE utf8_spanish_ci DEFAULT NULL,
  `des_email` varchar(150) COLLATE utf8_spanish_ci NOT NULL,
  `num_telefono` varchar(15) COLLATE utf8_spanish_ci DEFAULT NULL,
  `des_direccion` varchar(100) COLLATE utf8_spanish_ci DEFAULT NULL,
  `ind_estado` tinyint(1) DEFAULT '1',
  `fec_creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fec_modif` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `zsm_usuario`
--

CREATE TABLE `zsm_usuario` (
  `num_usuario` int(11) NOT NULL,
  `cod_usuario` varchar(20) COLLATE utf8_spanish_ci NOT NULL,
  `cod_tipdoc` char(2) COLLATE utf8_spanish_ci NOT NULL,
  `num_documento` varchar(15) COLLATE utf8_spanish_ci NOT NULL,
  `nom_usuario` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `pas_usuario` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `dir_correo` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `cod_rol` int(11) NOT NULL,
  `ind_estado` tinyint(1) DEFAULT '1',
  `fec_creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fec_modif` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `zsm_usuario`
--

INSERT INTO `zsm_usuario` (`num_usuario`, `cod_usuario`, `cod_tipdoc`, `num_documento`, `nom_usuario`, `pas_usuario`, `dir_correo`, `cod_rol`, `ind_estado`, `fec_creacion`, `fec_modif`) VALUES
(1, 'usuario_maestro', '01', '44556677', 'Usuario maestro 1', 'internet', 'umaestro@gtrackspe.net', 0, 1, '2024-11-23 15:36:35', '2024-12-18 16:40:59'),
(2, 'clin_matias', '1', '70608090', 'Clinton Matias', 'internet', 'clinton_92@gmail.com', 1, 1, '2024-12-10 23:20:53', '2024-12-11 14:57:12'),
(3, 'tomy_matias', '1', '77889900', 'Tomy Matias Rivera', 'internet', 'tmatias07@gmail.com', 1, 0, '2024-12-10 23:41:08', '2024-12-11 16:16:26');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `alm_inventario`
--
ALTER TABLE `alm_inventario`
  ADD PRIMARY KEY (`num_inventario`);

--
-- Indices de la tabla `alm_movimiento`
--
ALTER TABLE `alm_movimiento`
  ADD PRIMARY KEY (`num_movimiento`);

--
-- Indices de la tabla `alm_producto`
--
ALTER TABLE `alm_producto`
  ADD PRIMARY KEY (`num_producto`);

--
-- Indices de la tabla `ven_clientes`
--
ALTER TABLE `ven_clientes`
  ADD PRIMARY KEY (`num_cliente`);

--
-- Indices de la tabla `ven_cpe`
--
ALTER TABLE `ven_cpe`
  ADD PRIMARY KEY (`cod_cpe`,`num_serie`,`num_cpe`);

--
-- Indices de la tabla `ven_cpedet`
--
ALTER TABLE `ven_cpedet`
  ADD PRIMARY KEY (`cod_cpe`,`num_serie`,`num_cpe`,`num_item`);

--
-- Indices de la tabla `ven_cpeserie`
--
ALTER TABLE `ven_cpeserie`
  ADD PRIMARY KEY (`cod_cpe`,`num_serie`);

--
-- Indices de la tabla `ven_proveedores`
--
ALTER TABLE `ven_proveedores`
  ADD PRIMARY KEY (`num_proveedor`),
  ADD UNIQUE KEY `num_ruc` (`num_ruc`);

--
-- Indices de la tabla `ven_ventas_cli`
--
ALTER TABLE `ven_ventas_cli`
  ADD PRIMARY KEY (`num_venta`),
  ADD KEY `cod_cpe` (`cod_cpe`,`num_serie`,`num_cpe`);

--
-- Indices de la tabla `zsm_catalogo`
--
ALTER TABLE `zsm_catalogo`
  ADD PRIMARY KEY (`cod_catalogo`);

--
-- Indices de la tabla `zsm_datacat`
--
ALTER TABLE `zsm_datacat`
  ADD PRIMARY KEY (`cod_catalogo`,`cod_datacat`);

--
-- Indices de la tabla `zsm_empresa`
--
ALTER TABLE `zsm_empresa`
  ADD PRIMARY KEY (`num_empresa`),
  ADD UNIQUE KEY `num_ruc` (`num_ruc`),
  ADD UNIQUE KEY `des_email` (`des_email`);

--
-- Indices de la tabla `zsm_menu`
--
ALTER TABLE `zsm_menu`
  ADD PRIMARY KEY (`num_menu`),
  ADD UNIQUE KEY `cod_menu` (`cod_menu`);

--
-- Indices de la tabla `zsm_menu_asig`
--
ALTER TABLE `zsm_menu_asig`
  ADD PRIMARY KEY (`num_usuario`,`num_menu`);

--
-- Indices de la tabla `zsm_persona`
--
ALTER TABLE `zsm_persona`
  ADD PRIMARY KEY (`num_persona`),
  ADD UNIQUE KEY `num_documento` (`num_documento`),
  ADD UNIQUE KEY `des_email` (`des_email`);

--
-- Indices de la tabla `zsm_usuario`
--
ALTER TABLE `zsm_usuario`
  ADD PRIMARY KEY (`num_usuario`),
  ADD UNIQUE KEY `cod_usuario` (`cod_usuario`),
  ADD UNIQUE KEY `num_documento` (`num_documento`),
  ADD UNIQUE KEY `dir_correo` (`dir_correo`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `alm_inventario`
--
ALTER TABLE `alm_inventario`
  MODIFY `num_inventario` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `alm_movimiento`
--
ALTER TABLE `alm_movimiento`
  MODIFY `num_movimiento` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `alm_producto`
--
ALTER TABLE `alm_producto`
  MODIFY `num_producto` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `ven_clientes`
--
ALTER TABLE `ven_clientes`
  MODIFY `num_cliente` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `ven_proveedores`
--
ALTER TABLE `ven_proveedores`
  MODIFY `num_proveedor` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `ven_ventas_cli`
--
ALTER TABLE `ven_ventas_cli`
  MODIFY `num_venta` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `zsm_empresa`
--
ALTER TABLE `zsm_empresa`
  MODIFY `num_empresa` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `zsm_menu`
--
ALTER TABLE `zsm_menu`
  MODIFY `num_menu` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `zsm_persona`
--
ALTER TABLE `zsm_persona`
  MODIFY `num_persona` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `zsm_usuario`
--
ALTER TABLE `zsm_usuario`
  MODIFY `num_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `ven_cpedet`
--
ALTER TABLE `ven_cpedet`
  ADD CONSTRAINT `ven_cpedet_ibfk_1` FOREIGN KEY (`cod_cpe`,`num_serie`,`num_cpe`) REFERENCES `ven_cpe` (`cod_cpe`, `num_serie`, `num_cpe`);

--
-- Filtros para la tabla `ven_ventas_cli`
--
ALTER TABLE `ven_ventas_cli`
  ADD CONSTRAINT `ven_ventas_cli_ibfk_1` FOREIGN KEY (`cod_cpe`,`num_serie`,`num_cpe`) REFERENCES `ven_cpe` (`cod_cpe`, `num_serie`, `num_cpe`);

--
-- Filtros para la tabla `zsm_datacat`
--
ALTER TABLE `zsm_datacat`
  ADD CONSTRAINT `zsm_datacat_ibfk_1` FOREIGN KEY (`cod_catalogo`) REFERENCES `zsm_catalogo` (`cod_catalogo`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
