const express = require('express');
const { getPedidoDetalles, createPedidoDetalle, getPedidoDetalleById, updatePedidoDetalle, deletePedidoDetalle } = require('./pedidoDetalleService');
const router = express.Router();

const tryCatch = (func) => async (req, res) => {
  try {
    await func(req, res);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

router.get('/', tryCatch(getPedidoDetalles));
router.post('/', tryCatch(createPedidoDetalle));
router.get('/:id', tryCatch(getPedidoDetalleById));
router.put('/:id', tryCatch(updatePedidoDetalle));
router.delete('/:id', tryCatch(deletePedidoDetalle));

module.exports = router;
