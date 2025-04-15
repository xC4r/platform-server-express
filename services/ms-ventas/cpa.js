const express = require('express');
const { getCPEs, createCPE, getCPEById, updateCPE, deleteCPE } = require('./cpaService');
const router = express.Router();

const tryCatch = (func) => async (req, res) => {
  try {
    await func(req, res);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

router.get('/', tryCatch(getCPEs));
router.post('/', tryCatch(createCPE));
router.get('/:id', tryCatch(getCPEById));
router.put('/:id', tryCatch(updateCPE));
router.delete('/:id', tryCatch(deleteCPE));

module.exports = router;
