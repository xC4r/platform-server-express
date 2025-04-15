const express = require('express');
const { getClientes, createCliente, getClienteById, updateCliente, deleteCliente } = require('./clientesService');
const router = express.Router();

const tryCatch = (func) => async (req, res) => {
  try {
    await func(req, res);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

router.get('/', tryCatch(getClientes));
router.post('/', tryCatch(createCliente));
router.get('/:id', tryCatch(getClienteById));
router.put('/:id', tryCatch(updateCliente));
router.delete('/:id', tryCatch(deleteCliente));

module.exports = router;
