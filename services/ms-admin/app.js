const express = require('express');
const config = require('../common/config');
const catalogoRoutes = require('./catalogo');
const datacatRoutes = require('./datacat');
const empresaRoutes = require('./empresa');
const menuRoutes = require('./menus');
const menuAsigRoutes = require('./menuAsig');
const personaRoutes = require('./persona');
const usuarioRoutes = require('./usuario'); 

const app = express();

app.use(express.json());

//app.use('/usuarios', usuarioRoutes);
app.use('/catalogos', catalogoRoutes);
app.use('/datacatalogos', datacatRoutes);
app.use('/empresas', empresaRoutes);
app.use('/menus', menuRoutes);
app.use('/menusasignados', menuAsigRoutes);
app.use('/personas', personaRoutes);
app.use('/usuarios', usuarioRoutes);

module.exports = app;
