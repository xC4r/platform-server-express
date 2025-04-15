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
app.use('/ventas/clientes', clientesRoutes);
app.use('/ventas/cpe', cpeRoutes);
app.use('/ventas/cpedet', cpedetRoutes);
app.use('/ventas/cpeserie', cpeserieRoutes);
app.use('/ventas/proveedores', proveedoresRoutes);
app.use('/ventas/ventascli', ventascliRoutes);

// Iniciar el servidor
const PORT = config.port.VENT_PORT;
app.listen(PORT, () => {
  console.log(`MS-VENTAS escuchando en el puerto ${PORT}`);
});
