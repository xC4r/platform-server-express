const express = require('express');
const { getEmpresas, createEmpresa, getEmpresaById, updateEmpresa, deleteEmpresa } = require('./empresaService');
const router = express.Router();

const tryCatch = (func) => async (req, res) => {
  try {
    await func(req, res);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

router.get('/', tryCatch(getEmpresas));
router.post('/', tryCatch(createEmpresa));
router.get('/:id', tryCatch(getEmpresaById));
router.put('/:id', tryCatch(updateEmpresa));
router.delete('/:id', tryCatch(deleteEmpresa));

module.exports = router;
