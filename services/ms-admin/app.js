const express = require('express');
const cors = require('cors');
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

app.use('/usuarios', usuarioRoutes);
app.use('/configuracion/catalogos', catalogoRoutes);
app.use('/configuracion/datacatalogos', datacatRoutes);
app.use('/configuracion/empresas', empresaRoutes);
app.use('/configuracion/menus', menuRoutes);
app.use('/configuracion/menusasignados', menuAsigRoutes);
app.use('/configuracion/personas', personaRoutes);
app.use('/configuracion/usuarios', usuarioRoutes);

const PORT = config.port.ADMI_PORT;
app.listen(PORT, () => {
  console.log(`MS-ADMIN escuchando en el puerto ${PORT}`);
});

module.exports = app;
