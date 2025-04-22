const express = require('express');
const config = require('../common/config');
const { login, logout, isTokenValid } = require('./authService');

const app = express();

app.use(express.json());

// Endpoints
app.post('/login', async (req, res) => {
  try {
    const { usuario, clave } = req.body;
    if (!usuario || !clave) {
      return res.status(400).json({ error: 'Usuario y clave son requeridos' });
    }
    const userData = await login(usuario, clave);
    return res.json(userData);
  } catch (error) {
    console.error(`Error en login: ${error.message}`);
    return res.status(401).json({ error: 'Credenciales incorrectas' });
  }
});

app.post('/logout', (req, res) => {
  try {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token || !isTokenValid(token)) {
      return res.status(401).json({ error: 'Token inválido o faltante' });
    }
    const message = logout(token);
    return res.json(message);
  } catch (error) {
    console.error(`Error en logout: ${error.message}`);
    return res.status(500).json({ error: 'Error en el proceso de logout' });
  }
});

app.post('/verificar-token', (req, res) => {
  try {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
      return res.status(400).json({ error: 'Token faltante' });
    }
    const valid = isTokenValid(token);
    return res.json({ valid });
  } catch (error) {
    console.error(`Error en verificar token: ${error.message}`);
    return res.status(500).json({ error: 'Error al obtener la autorización' });
  }
});

module.exports = app;