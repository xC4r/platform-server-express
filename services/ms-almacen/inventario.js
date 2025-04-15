const express = require('express');
const { getInventarios, createInventario, getInventarioById, updateInventario, deleteInventario } = require('./inventarioService');
const router = express.Router();

const tryCatch = (func) => async (req, res) => {
  try {
    await func(req, res);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

router.get('/', tryCatch(getInventarios));
router.post('/', tryCatch(createInventario));
router.get('/:id', tryCatch(getInventarioById));
router.put('/:id', tryCatch(updateInventario));
router.delete('/:id', tryCatch(deleteInventario));

module.exports = router;
