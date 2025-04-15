const db = require('../common/database');

const getCatalogos = async (req, res) => {
  const [catalogos] = await db.promise().execute('SELECT * FROM zsm_catalogo');
  res.json(catalogos);
};

const createCatalogo = async (req, res) => {
  const { cod_catalogo, des_catalogo, des_acronimo } = req.body;
  const result = await db.promise().execute(
    'INSERT INTO zsm_catalogo (cod_catalogo, des_catalogo, des_acronimo) VALUES (?, ?, ?)',
    [cod_catalogo, des_catalogo, des_acronimo]
  );
  res.json({ id: result[0].insertId });
};

const getCatalogoById = async (req, res) => {
  const [catalogo] = await db.promise().execute('SELECT * FROM zsm_catalogo WHERE cod_catalogo = ?', [req.params.id]);
  res.json(catalogo[0]);
};

const updateCatalogo = async (req, res) => {
  const { des_catalogo, des_acronimo } = req.body;
  await db.promise().execute(
    'UPDATE zsm_catalogo SET des_catalogo = ?, des_acronimo = ? WHERE cod_catalogo = ?',
    [des_catalogo, des_acronimo, req.params.id]
  );
  res.json({ id: req.params.id });
};

const deleteCatalogo = async (req, res) => {
  await db.promise().execute('DELETE FROM zsm_catalogo WHERE cod_catalogo = ?', [req.params.id]);
  res.json({ id: req.params.id });
};

module.exports = {
  getCatalogos,
  createCatalogo,
  getCatalogoById,
  updateCatalogo,
  deleteCatalogo
};
