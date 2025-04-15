const express = require('express');
const config = require('../common/config');
const productoRoutes = require('./producto');
const inventarioRoutes = require('./inventario');
const movimientoRoutes = require('./movimiento');
const pedidoRoutes = require('./pedidos'); 
const pedidoDetalleRoutes = require('./pedidoDetalle');   

const app = express();

app.use(express.json());

// Usar las rutas de usuario
app.use('/almacen/productos', productoRoutes);
app.use('/almacen/inventarios', inventarioRoutes);
app.use('/almacen/movimientos', movimientoRoutes);
app.use('/almacen/pedidos', pedidoRoutes);
app.use('/almacen/pedidodetalles', pedidoDetalleRoutes);

// Iniciar el servidor
const PORT = config.port.ALMA_PORT;
app.listen(PORT, () => {
  console.log(`MS-ALMA escuchando en el puerto ${PORT}`);
});
