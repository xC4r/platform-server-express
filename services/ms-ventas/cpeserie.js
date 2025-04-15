const express = require('express');
const { getCPEseries, createCPEserie, getCPEserieById, updateCPEserie, deleteCPEserie } = require('./cpeserieService');
const router = express.Router();

const tryCatch = (func) => async (req, res) => {
  try {
    await func(req, res);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

router.get('/', tryCatch(getCPEseries));
router.post('/', tryCatch(createCPEserie));
router.get('/:id', tryCatch(getCPEserieById));
router.put('/:id', tryCatch(updateCPEserie));
router.delete('/:id', tryCatch(deleteCPEserie));

module.exports = router;
