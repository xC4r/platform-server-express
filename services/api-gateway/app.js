const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const config = require('../common/config');
const gatewayRoutes = require('./gatewayRoutes');
const app = express();
const PORT = config.port;

// Configuración de rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // límite de 100 peticiones por ventana
  message: 'Demasiadas peticiones desde esta IP, por favor intente más tarde'
});

// Configuración de CORS optimizada
const corsOptions = {
  origin: '*', // Por defecto permite todos los orígenes
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  credentials: true,
  maxAge: 86400 // 24 horas
};

// Si hay configuración específica de CORS, la aplicamos
if (config.cors && config.cors.origins) {
  corsOptions.origin = config.cors.origins;
}

app.use(cors(corsOptions));

// Middleware de compresión
app.use(compression());

// Middleware de rate limiting
app.use(limiter);

app.use(morgan('combined'));

// Middleware de seguridad mejorado
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.removeHeader('X-Powered-By');
  next();
});

// Configurar rutas de proxy y Middleware JSON
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Usar las rutas del gateway
app.use('/api', gatewayRoutes);

// Ruta raíz del API Gateway
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'API Gateway funcionando correctamente',
    version: '1.0.0'
  });
});

// Manejo de errores global mejorado
app.use((err, req, res, next) => {
  console.error(`Error: ${err.message}`);
  console.error(err.stack);

  const statusCode = err.status || 500;
  const errorResponse = {
    status: 'error',
    message: err.message || 'Error interno del servidor',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  };

  res.status(statusCode).json(errorResponse);
});

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Ruta no encontrada'
  });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`API Gateway está corriendo en el puerto ${PORT}`);
});