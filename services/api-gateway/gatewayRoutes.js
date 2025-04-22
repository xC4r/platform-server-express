const express = require('express');
const msSeguridad = require('../ms-seguridad/app');
const msAdmin = require('../ms-admin/app');
const msAlmacen = require('../ms-almacen/app');
const msVentas = require('../ms-ventas/app');
const API_VERSION = '/v1'; // Prefijo version del API

const router = express.Router();

// Usar los routers de los microservicios
router.use(`${API_VERSION}/seguridad`, msSeguridad);
router.use(`${API_VERSION}/configuracion`, msAdmin);
router.use(`${API_VERSION}/almacen`, msAlmacen);
router.use(`${API_VERSION}/ventas`, msVentas);

module.exports = router;

