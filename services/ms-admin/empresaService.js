const db = require('../common/database');

const getEmpresas = async (req, res) => {
  const [empresas] = await db.promise().execute('SELECT * FROM zsm_empresa');
  res.json(empresas);
};

const createEmpresa = async (req, res) => {
  const { num_ruc, nom_razsocial, des_contacto, num_telefono, des_email, des_direccion } = req.body;
  const result = await db.promise().execute(
    'INSERT INTO zsm_empresa (num_ruc, nom_razsocial, des_contacto, num_telefono, des_email, des_direccion) VALUES (?, ?, ?, ?, ?, ?)',
    [num_ruc, nom_razsocial, des_contacto, num_telefono, des_email, des_direccion]
  );
  res.json({ id: result[0].insertId });
};

const getEmpresaById = async (req, res) => {
  const [empresa] = await db.promise().execute('SELECT * FROM zsm_empresa WHERE num_empresa = ?', [req.params.id]);
  res.json(empresa[0]);
};

const updateEmpresa = async (req, res) => {
  const { num_ruc, nom_razsocial, des_contacto, num_telefono, des_email, des_direccion } = req.body;
  await db.promise().execute(
    'UPDATE zsm_empresa SET num_ruc = ?, nom_razsocial = ?, des_contacto = ?, num_telefono = ?, des_email = ?, des_direccion = ? WHERE num_empresa = ?',
    [num_ruc, nom_razsocial, des_contacto, num_telefono, des_email, des_direccion, req.params.id]
  );
  res.json({ id: req.params.id });
};

const deleteEmpresa = async (req, res) => {
  await db.promise().execute('DELETE FROM zsm_empresa WHERE num_empresa = ?', [req.params.id]);
  res.json({ id: req.params.id });
};

module.exports = {
  getEmpresas,
  createEmpresa,
  getEmpresaById,
  updateEmpresa,
  deleteEmpresa
};
