const express = require('express');
const { getCatalogos, createCatalogo, getCatalogoById, updateCatalogo, deleteCatalogo } = require('./catalogoService');
const router = express.Router();

const tryCatch = (func) => async (req, res) => {
  try {
    await func(req, res);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

router.get('/', tryCatch(getCatalogos));
router.post('/', tryCatch(createCatalogo));
router.get('/:id', tryCatch(getCatalogoById));
router.put('/:id', tryCatch(updateCatalogo));
router.delete('/:id', tryCatch(deleteCatalogo));

module.exports = router;
