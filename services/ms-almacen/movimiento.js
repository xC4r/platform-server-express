const express = require('express');
const { getMovimientos, createMovimiento, getMovimientoById } = require('./movimientoService');
const router = express.Router();

const tryCatch = (func) => async (req, res) => {
  try {
    await func(req, res);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

router.get('/', tryCatch(getMovimientos));
router.post('/', tryCatch(createMovimiento));
router.get('/:id', tryCatch(getMovimientoById));

module.exports = router;
