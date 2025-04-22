const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const compression = require('compression');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const config = require('../common/config');
const gatewayRoutes = require('./gatewayRoutes');

const app = express();
const PORT = config.port;

// Configuración de logging
app.use(morgan('combined', {
  skip: (req, res) => res.statusCode < 400,
  stream: {
    write: message => console.error(message.trim())
  }
}));

// Configuración básica de seguridad y rendimiento
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'"],
      fontSrc: ["'self'"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"]
    }
  },
  crossOriginEmbedderPolicy: true,
  crossOriginOpenerPolicy: true,
  crossOriginResourcePolicy: { policy: "same-site" },
  dnsPrefetchControl: { allow: false },
  frameguard: { action: "deny" },
  hidePoweredBy: true,
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  },
  ieNoOpen: true,
  noSniff: true,
  referrerPolicy: { policy: "strict-origin-when-cross-origin" },
  xssFilter: true
}));

app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Demasiadas peticiones desde esta IP, por favor intente más tarde'
}));

// Configuración de CORS
app.use(cors({
  origin: config.cors?.origins || 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204
}));

// Middleware para manejar preflight requests
app.options('*', cors());

// Middleware seguridad y limites
app.use(compression());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Middleware de seguridad básico
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  res.setHeader('Content-Security-Policy', "default-src 'self'");
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.removeHeader('X-Powered-By');
  next();
});

// Rutas
app.use('/api', gatewayRoutes);

app.get('/', (req, res) => {
  res.json({
    status: 'success',
    message: 'API Gateway funcionando correctamente',
    version: '1.0.0'
  });
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(err.status || 500).json({
    status: 'error',
    message: err.message || 'Error interno del servidor'
  });
});

// error 404
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Ruta no encontrada'
  });
});

// Iniciar en el puerto
app.listen(PORT, () => {
  console.log(`API Gateway está corriendo en el puerto ${PORT}`);
  console.log(`Host: ${config.host}`);
  console.log(`CORS Origin: ${config.cors.origins}`);
});