const express = require('express');
const { getPedidos, createPedido, getPedidoById, updatePedido, deletePedido, getMaxNumPedido } = require('./pedidosService');
const router = express.Router();

const tryCatch = (func) => async (req, res) => {
  try {
    await func(req, res);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

router.get('/', tryCatch(getPedidos));
router.post('/', tryCatch(createPedido));
router.get('/:id', tryCatch(getPedidoById));
router.put('/:id', tryCatch(updatePedido));
router.delete('/:id', tryCatch(deletePedido));
router.get('/maxnumpedido', tryCatch(getMaxNumPedido)); 

module.exports = router;
