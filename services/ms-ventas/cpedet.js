const express = require('express');
const { getCPEdets, createCPEdet, getCPEdetById, updateCPEdet, deleteCPEdet } = require('./cpedetService');
const router = express.Router();

const tryCatch = (func) => async (req, res) => {
  try {
    await func(req, res);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

router.get('/', tryCatch(getCPEdets));
router.post('/', tryCatch(createCPEdet));
router.get('/:id', tryCatch(getCPEdetById));
router.put('/:id', tryCatch(updateCPEdet));
router.delete('/:id', tryCatch(deleteCPEdet));

module.exports = router;
