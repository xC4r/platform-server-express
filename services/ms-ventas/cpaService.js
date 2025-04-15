const db = require('../common/database');

const getCPEs = async (req, res) => {
  const [cpes] = await db.promise().execute('SELECT * FROM ven_cpe');
  res.json(cpes);
};

const createCPE = async (req, res) => {
  const { cod_cpe, num_serie, num_cpe, fec_emision, cod_tipdocrec, num_docrecep, des_nomrecep, cod_moneda, mto_tipocambio, mto_totalvta, mto_totaligv, mto_imptotal, ind_estado, ind_informado } = req.body;
  const result = await db.promise().execute(
    'INSERT INTO ven_cpe (cod_cpe, num_serie, num_cpe, fec_emision, cod_tipdocrec, num_docrecep, des_nomrecep, cod_moneda, mto_tipocambio, mto_totalvta, mto_totaligv, mto_imptotal, ind_estado, ind_informado) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [cod_cpe, num_serie, num_cpe, fec_emision, cod_tipdocrec, num_docrecep, des_nomrecep, cod_moneda, mto_tipocambio, mto_totalvta, mto_totaligv, mto_imptotal, ind_estado, ind_informado]
  );
  res.json({ id: result[0].insertId });
};

const getCPEById = async (req, res) => {
  const { id } = req.params;
  const [cpes] = await db.promise().execute('SELECT * FROM ven_cpe WHERE cod_cpe = ? AND num_serie = ? AND num_cpe = ?', [id.cod_cpe, id.num_serie, id.num_cpe]);
  if (cpes.length === 0) {
    return res.status(404).json({ error: 'CPE no encontrado' });
  }
  res.json(cpes[0]);
};

const updateCPE = async (req, res) => {
  const { id } = req.params;
  const { fec_emision, cod_tipdocrec, num_docrecep, des_nomrecep, cod_moneda, mto_tipocambio, mto_totalvta, mto_totaligv, mto_imptotal, ind_estado, ind_informado } = req.body;
  await db.promise().execute(
    'UPDATE ven_cpe SET fec_emision = ?, cod_tipdocrec = ?, num_docrecep = ?, des_nomrecep = ?, cod_moneda = ?, mto_tipocambio = ?, mto_totalvta = ?, mto_totaligv = ?, mto_imptotal = ?, ind_estado = ?, ind_informado = ? WHERE cod_cpe = ? AND num_serie = ? AND num_cpe = ?',
    [fec_emision, cod_tipdocrec, num_docrecep, des_nomrecep, cod_moneda, mto_tipocambio, mto_totalvta, mto_totaligv, mto_imptotal, ind_estado, ind_informado, id.cod_cpe, id.num_serie, id.num_cpe]
  );
  res.json({ message: 'CPE actualizado' });
};

const deleteCPE = async (req, res) => {
  const { id } = req.params;
  await db.promise().execute('DELETE FROM ven_cpe WHERE cod_cpe = ? AND num_serie = ? AND num_cpe = ?', [id.cod_cpe, id.num_serie, id.num_cpe]);
  res.json({ message: 'CPE eliminado' });
};

module.exports = {
  getCPEs,
  createCPE,
  getCPEById,
  updateCPE,
  deleteCPE
};
