const db = require('../common/database');

const getVentasCli = async (req, res) => {
  const [ventascli] = await db.promise().execute('SELECT * FROM ven_ventas_cli');
  res.json(ventascli);
};

const createVentaCli = async (req, res) => {
  const { num_venta, cod_cpe, num_serie, num_cpe, num_cliente, nom_cliente, num_doccliente, fec_emision, mto_imptotal } = req.body;
  const result = await db.promise().execute(
    'INSERT INTO ven_ventas_cli (num_venta, cod_cpe, num_serie, num_cpe, num_cliente, nom_cliente, num_doccliente, fec_emision, mto_imptotal) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [num_venta, cod_cpe, num_serie, num_cpe, num_cliente, nom_cliente, num_doccliente, fec_emision, mto_imptotal]
  );
  res.json({ id: result[0].insertId });
};

const getVentaCliById = async (req, res) => {
  const { id } = req.params;
  const [venta] = await db.promise().execute('SELECT * FROM ven_ventas_cli WHERE num_venta = ?', [id]);
  if (venta.length === 0) {
    return res.status(404).json({ error: 'Venta no encontrada' });
  }
  res.json(venta[0]);
};

const updateVentaCli = async (req, res) => {
  const { id } = req.params;
  const { cod_cpe, num_serie, num_cpe, num_cliente, nom_cliente, num_doccliente, fec_emision, mto_imptotal } = req.body;
  await db.promise().execute(
    'UPDATE ven_ventas_cli SET cod_cpe = ?, num_serie = ?, num_cpe = ?, num_cliente = ?, nom_cliente = ?, num_doccliente = ?, fec_emision = ?, mto_imptotal = ? WHERE num_venta = ?',
    [cod_cpe, num_serie, num_cpe, num_cliente, nom_cliente, num_doccliente, fec_emision, mto_imptotal, id]
  );
  res.json({ message: 'Venta actualizada' });
};

const deleteVentaCli = async (req, res) => {
  const { id } = req.params;
  await db.promise().execute('DELETE FROM ven_ventas_cli WHERE num_venta = ?', [id]);
  res.json({ message: 'Venta eliminada' });
};

module.exports = {
  getVentasCli,
  createVentaCli,
  getVentaCliById,
  updateVentaCli,
  deleteVentaCli
};
