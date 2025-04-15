const express = require('express');
const { getUsuarios, createUsuario, getUsuarioByDocumento, updateUsuario, deleteUsuario, getMenu } = require('./usuarioService');
const { getTokenData } = require('../common/utils');
const router = express.Router();

// Middleware para manejo de errores TryCatch
const tryCatch = (func) => async (req, res) => {
  try {
    await func(req, res);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

// ENDPOINT MAIN MENU
router.get('/menu', tryCatch(async (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1];
  const tokenData = getTokenData(token);
  const menu = await getMenu(tokenData.userId);
  res.json(menu);
}));

// Endpoints GESTION DE USUARIOS
router.get('/', tryCatch(async (req, res) => {
  const usuarios = await getUsuarios();
  res.json(usuarios);
}));

router.post('/', tryCatch(async (req, res) => {
  const { codigo, tipoDocumento, numDocumento, nombre, password, correo, rol, estado } = req.body;
  const newUsuario = await createUsuario({ codigo, tipoDocumento, numDocumento, nombre, password, correo, rol, estado });
  res.json(newUsuario);
}));

router.get('/:numDocumento', tryCatch(async (req, res) => {
  const { numDocumento } = req.params;
  const usuario = await getUsuarioByDocumento(numDocumento);
  res.json(usuario);
}));

router.put('/:numDocumento', tryCatch(async (req, res) => {
  const { numDocumento } = req.params;
  const { codigo, tipoDocumento, nombre, password, correo, rol, estado } = req.body;
  const updatedUsuario = await updateUsuario(numDocumento, { codigo, tipoDocumento, nombre, password, correo, rol, estado });
  res.json(updatedUsuario);
}));

router.delete('/:numDocumento', tryCatch(async (req, res) => {
  const { numDocumento } = req.params;
  await deleteUsuario(numDocumento);
  res.json({ message: 'Usuario eliminado', numDocumento });
}));

module.exports = router;
