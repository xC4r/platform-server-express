const { createProxyMiddleware } = require('http-proxy-middleware');
const express = require('express');
const config = require('../common/config');

const router = express.Router();
const API_PREFIX = '/api/v1';
const { isTokenValid } = require('../common/utils');

// Lista de rutas de excepción
const exceptionRoutes = [
  `${API_PREFIX}/seguridad/login`,
  //`${API_PREFIX}/seguridad/logout`, // más rutas de excepción
];

// Middleware de autenticación
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  // Excepción para rutas específicas
  if (exceptionRoutes.includes(req.originalUrl)) {
    return next();
  }

  if (!token) {
    return res.status(401).json({ error: 'Token faltante' });
  }

  if (!isTokenValid(token)) {
    return res.status(403).json({ error: 'Token no válido' });
  }
  next();
};

// Función para configurar las rutas del proxy
const setupProxyRoute = (path, targetPort) => {
  const target = `http://${config.host}:${targetPort}${path}`;
  
  router.use(
    `${API_PREFIX}${path}`,
    authenticateToken,
    createProxyMiddleware({
      target,
      changeOrigin: true,
      secure: false,
      onProxyRes: function(proxyRes, req, res) {
        proxyRes.headers['Access-Control-Allow-Origin'] = req.headers.origin;
        proxyRes.headers['Access-Control-Allow-Credentials'] = 'true';
      }
    })
  );
};

// Configurar las rutas del proxy
setupProxyRoute("/seguridad", config.port.AUTH_PORT);
setupProxyRoute("/usuarios", config.port.ADMI_PORT);
setupProxyRoute("/configuracion", config.port.ADMI_PORT);
setupProxyRoute("/almacen", config.port.ALMA_PORT);
setupProxyRoute("/ventas", config.port.VENT_PORT);
module.exports = router;
