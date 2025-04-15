const express = require('express');
const { getDataCats, createDataCat, getDataCatById, updateDataCat, deleteDataCat } = require('./datacatService');
const router = express.Router();

const tryCatch = (func) => async (req, res) => {
  try {
    await func(req, res);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

router.get('/', tryCatch(getDataCats));
router.post('/', tryCatch(createDataCat));
router.get('/:id', tryCatch(getDataCatById));
router.put('/:id', tryCatch(updateDataCat));
router.delete('/:id', tryCatch(deleteDataCat));

module.exports = router;
