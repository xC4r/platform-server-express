const db = require('../common/database');

const getPersonas = async (req, res) => {
  const [personas] = await db.promise().execute('SELECT * FROM zsm_persona');
  res.json(personas);
};

const createPersona = async (req, res) => {
  const { cod_tipdoc, num_documento, nom_persona, nom_apellido, des_email, num_telefono, des_direccion } = req.body;
  const result = await db.promise().execute(
    'INSERT INTO zsm_persona (cod_tipdoc, num_documento, nom_persona, nom_apellido, des_email, num_telefono, des_direccion) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [cod_tipdoc, num_documento, nom_persona, nom_apellido, des_email, num_telefono, des_direccion]
  );
  res.json({ id: result[0].insertId });
};

const getPersonaById = async (req, res) => {
  const [persona] = await db.promise().execute('SELECT * FROM zsm_persona WHERE num_persona = ?', [req.params.id]);
  res.json(persona[0]);
};

const updatePersona = async (req, res) => {
  const { cod_tipdoc, num_documento, nom_persona, nom_apellido, des_email, num_telefono, des_direccion } = req.body;
  await db.promise().execute(
    'UPDATE zsm_persona SET cod_tipdoc = ?, num_documento = ?, nom_persona = ?, nom_apellido = ?, des_email = ?, num_telefono = ?, des_direccion = ? WHERE num_persona = ?',
    [cod_tipdoc, num_documento, nom_persona, nom_apellido, des_email, num_telefono, des_direccion, req.params.id]
  );
  res.json({ id: req.params.id });
};

const deletePersona = async (req, res) => {
  await db.promise().execute('DELETE FROM zsm_persona WHERE num_persona = ?', [req.params.id]);
  res.json({ id: req.params.id });
};

module.exports = {
  getPersonas,
  createPersona,
  getPersonaById,
  updatePersona,
  deletePersona
};
