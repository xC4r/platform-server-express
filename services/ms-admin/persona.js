const express = require('express');
const { getPersonas, createPersona, getPersonaById, updatePersona, deletePersona } = require('./personaService');
const router = express.Router();

const tryCatch = (func) => async (req, res) => {
  try {
    await func(req, res);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

router.get('/', tryCatch(getPersonas));
router.post('/', tryCatch(createPersona));
router.get('/:id', tryCatch(getPersonaById));
router.put('/:id', tryCatch(updatePersona));
router.delete('/:id', tryCatch(deletePersona));

module.exports = router;
