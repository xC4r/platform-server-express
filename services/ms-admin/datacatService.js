const db = require('../common/database');

const getDataCats = async (req, res) => {
  const [dataCats] = await db.promise().execute('SELECT * FROM zsm_datacat');
  res.json(dataCats);
};

const createDataCat = async (req, res) => {
  const { cod_catalogo, cod_datacat, des_datacat, des_larga } = req.body;
  const result = await db.promise().execute(
    'INSERT INTO zsm_datacat (cod_catalogo, cod_datacat, des_datacat, des_larga) VALUES (?, ?, ?, ?)',
    [cod_catalogo, cod_datacat, des_datacat, des_larga]
  );
  res.json({ id: result[0].insertId });
};

const getDataCatById = async (req, res) => {
  const [dataCat] = await db.promise().execute('SELECT * FROM zsm_datacat WHERE cod_datacat = ?', [req.params.id]);
  res.json(dataCat[0]);
};

const updateDataCat = async (req, res) => {
  const { cod_catalogo, des_datacat, des_larga } = req.body;
  await db.promise().execute(
    'UPDATE zsm_datacat SET cod_catalogo = ?, des_datacat = ?, des_larga = ? WHERE cod_datacat = ?',
    [cod_catalogo, des_datacat, des_larga, req.params.id]
  );
  res.json({ id: req.params.id });
};

const deleteDataCat = async (req, res) => {
  await db.promise().execute('DELETE FROM zsm_datacat WHERE cod_datacat = ?', [req.params.id]);
  res.json({ id: req.params.id });
};

module.exports = {
  getDataCats,
  createDataCat,
  getDataCatById,
  updateDataCat,
  deleteDataCat
};
