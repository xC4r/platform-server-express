const express = require('express');
const { getProductos, createProducto, getProductoById, updateProducto, deleteProducto } = require('./productoService');
const router = express.Router();

const tryCatch = (func) => async (req, res) => {
  try {
    await func(req, res);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

router.get('/', tryCatch(getProductos));
router.post('/', tryCatch(createProducto));
router.get('/:id', tryCatch(getProductoById));
router.put('/:id', tryCatch(updateProducto));
router.delete('/:id', tryCatch(deleteProducto));

module.exports = router;
