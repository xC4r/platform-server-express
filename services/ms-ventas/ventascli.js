const express = require('express');
const { getVentasCli, createVentaCli, getVentaCliById, updateVentaCli, deleteVentaCli } = require('./ventascliService');
const router = express.Router();

const tryCatch = (func) => async (req, res) => {
  try {
    await func(req, res);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

router.get('/', tryCatch(getVentasCli));
router.post('/', tryCatch(createVentaCli));
router.get('/:id', tryCatch(getVentaCliById));
router.put('/:id', tryCatch(updateVentaCli));
router.delete('/:id', tryCatch(deleteVentaCli));

module.exports = router;
