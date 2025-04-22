const express = require('express');
const config = require('../common/config');
const clientesRoutes = require('./clientes');
const cpeRoutes = require('./cpa');
const cpedetRoutes = require('./cpedet');
const cpeserieRoutes = require('./cpeserie');
const proveedoresRoutes = require('./proveedores');
const ventascliRoutes = require('./ventascli');      

const app = express();

app.use(express.json());

// Usar las rutas
app.use('/clientes', clientesRoutes);
app.use('/cpe', cpeRoutes);
app.use('/cpedet', cpedetRoutes);
app.use('/cpeserie', cpeserieRoutes);
app.use('/proveedores', proveedoresRoutes);
app.use('/ventascli', ventascliRoutes);

module.exports = app;
