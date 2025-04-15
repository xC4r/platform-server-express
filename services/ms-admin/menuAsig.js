const express = require('express');
const { getMenuAsignaciones, createMenuAsignacion, getMenuAsignacionById, updateMenuAsignacion, deleteMenuAsignacion } = require('./menuAsigService');
const router = express.Router();

const tryCatch = (func) => async (req, res) => {
  try {
    await func(req, res);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

router.get('/', tryCatch(getMenuAsignaciones));
router.post('/', tryCatch(createMenuAsignacion));
router.get('/:id', tryCatch(getMenuAsignacionById));
router.put('/:id', tryCatch(updateMenuAsignacion));
router.delete('/:id', tryCatch(deleteMenuAsignacion));

module.exports = router;
