const db = require('../common/database');

const getCPEseries = async (req, res) => {
  const [cpeseries] = await db.promise().execute('SELECT * FROM ven_cpeserie');
  res.json(cpeseries);
};

const createCPEserie = async (req, res) => {
  const { cod_cpe, num_serie, ind_estado } = req.body;
  const result = await db.promise().execute(
    'INSERT INTO ven_cpeserie (cod_cpe, num_serie, ind_estado) VALUES (?, ?, ?)',
    [cod_cpe, num_serie, ind_estado]
  );
  res.json({ id: result[0].insertId });
};

const getCPEserieById = async (req, res) => {
  const { cod_cpe, num_serie } = req.params;
  const [cpeserie] = await db.promise().execute('SELECT * FROM ven_cpeserie WHERE cod_cpe = ? AND num_serie = ?', [cod_cpe, num_serie]);
  if (cpeserie.length === 0) {
    return res.status(404).json({ error: 'CPEserie no encontrado' });
  }
  res.json(cpeserie[0]);
};

const updateCPEserie = async (req, res) => {
  const { cod_cpe, num_serie } = req.params;
  const { ind_estado } = req.body;
  await db.promise().execute(
    'UPDATE ven_cpeserie SET ind_estado = ? WHERE cod_cpe = ? AND num_serie = ?',
    [ind_estado, cod_cpe, num_serie]
  );
  res.json({ message: 'CPEserie actualizado' });
};

const deleteCPEserie = async (req, res) => {
  const { cod_cpe, num_serie } = req.params;
  await db.promise().execute('DELETE FROM ven_cpeserie WHERE cod_cpe = ? AND num_serie = ?', [cod_cpe, num_serie]);
  res.json({ message: 'CPEserie eliminado' });
};

module.exports = {
  getCPEseries,
  createCPEserie,
  getCPEserieById,
  updateCPEserie,
  deleteCPEserie
};
