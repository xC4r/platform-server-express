const express = require('express');
const config = require('../common/config');
const productoRoutes = require('./producto');
const inventarioRoutes = require('./inventario');
const movimientoRoutes = require('./movimiento');
const pedidoRoutes = require('./pedidos'); 
const pedidoDetalleRoutes = require('./pedidoDetalle');   

const app = express();

app.use(express.json());

// Usar las rutas de almacén
app.use('/productos', productoRoutes);
app.use('/inventarios', inventarioRoutes);
app.use('/movimientos', movimientoRoutes);
app.use('/pedidos', pedidoRoutes);
app.use('/pedidodetalles', pedidoDetalleRoutes);

module.exports = app;

