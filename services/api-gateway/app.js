const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const config = require('../common/config');
const gatewayRoutes = require('./gatewayRoutes');

const app = express();
const PORT = config.port.GATE_PORT;

// Configuración de CORS
app.use(cors({
  origin: true, // Permite el origen de la petición
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  credentials: true
}));

app.use(morgan('combined'));

// Middleware para añadir y remover gestionar encabezados
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Cache-Control', 'no-cache'); 
  res.removeHeader('X-Powered-By');
  res.removeHeader('Content-Security-Policy');
  next();
});

// Configurar rutas de proxy y Middleware JSON
app.use(gatewayRoutes);
app.use(express.json());

// Ruta raíz del API Gateway
app.get('/', (req, res) => {
  res.status(200).send('API Gateway funcionando correctamente');
});

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error(`Error: ${err.message}`);
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Error interno del servidor',
    },
  });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`API Gateway está corriendo en el puerto ${PORT}`);
});
