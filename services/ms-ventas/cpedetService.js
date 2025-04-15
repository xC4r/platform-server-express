const db = require('../common/database');

const getCPEdets = async (req, res) => {
  const [cpedets] = await db.promise().execute('SELECT * FROM ven_cpedet');
  res.json(cpedets);
};

const createCPEdet = async (req, res) => {
  const { cod_cpe, num_serie, num_cpe, num_item, cod_rubro, mto_rubro, des_rubro } = req.body;
  const result = await db.promise().execute(
    'INSERT INTO ven_cpedet (cod_cpe, num_serie, num_cpe, num_item, cod_rubro, mto_rubro, des_rubro) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [cod_cpe, num_serie, num_cpe, num_item, cod_rubro, mto_rubro, des_rubro]
  );
  res.json({ id: result[0].insertId });
};

const getCPEdetById = async (req, res) => {
  const { cod_cpe, num_serie, num_cpe, num_item } = req.params;
  const [cpedet] = await db.promise().execute('SELECT * FROM ven_cpedet WHERE cod_cpe = ? AND num_serie = ? AND num_cpe = ? AND num_item = ?', [cod_cpe, num_serie, num_cpe, num_item]);
  if (cpedet.length === 0) {
    return res.status(404).json({ error: 'CPEdet no encontrado' });
  }
  res.json(cpedet[0]);
};

const updateCPEdet = async (req, res) => {
  const { cod_cpe, num_serie, num_cpe, num_item } = req.params;
  const { cod_rubro, mto_rubro, des_rubro } = req.body;
  await db.promise().execute(
    'UPDATE ven_cpedet SET cod_rubro = ?, mto_rubro = ?, des_rubro = ? WHERE cod_cpe = ? AND num_serie = ? AND num_cpe = ? AND num_item = ?',
    [cod_rubro, mto_rubro, des_rubro, cod_cpe, num_serie, num_cpe, num_item]
  );
  res.json({ message: 'CPEdet actualizado' });
};

const deleteCPEdet = async (req, res) => {
  const { cod_cpe, num_serie, num_cpe, num_item } = req.params;
  await db.promise().execute('DELETE FROM ven_cpedet WHERE cod_cpe = ? AND num_serie = ? AND num_cpe = ? AND num_item = ?', [cod_cpe, num_serie, num_cpe, num_item]);
  res.json({ message: 'CPEdet eliminado' });
};

module.exports = {
  getCPEdets,
  createCPEdet,
  getCPEdetById,
  updateCPEdet,
  deleteCPEdet
};
