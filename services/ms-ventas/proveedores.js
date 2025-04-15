const express = require('express');
const { getProveedores, createProveedor, getProveedorById, updateProveedor, deleteProveedor } = require('./proveedoresService');
const router = express.Router();

const tryCatch = (func) => async (req, res) => {
  try {
    await func(req, res);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

router.get('/', tryCatch(getProveedores));
router.post('/', tryCatch(createProveedor));
router.get('/:id', tryCatch(getProveedorById));
router.put('/:id', tryCatch(updateProveedor));
router.delete('/:id', tryCatch(deleteProveedor));

module.exports = router;
