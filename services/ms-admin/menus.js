const express = require('express');
const { getMenus, createMenu, getMenuById, updateMenu, deleteMenu } = require('./menuService');
const router = express.Router();

const tryCatch = (func) => async (req, res) => {
  try {
    await func(req, res);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

router.get('/', tryCatch(getMenus));
router.post('/', tryCatch(createMenu));
router.get('/:id', tryCatch(getMenuById));
router.put('/:id', tryCatch(updateMenu));
router.delete('/:id', tryCatch(deleteMenu));

module.exports = router;
