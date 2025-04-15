const db = require('../common/database');

const getInventarios = async (req, res) => {
  const [inventarios] = await db.promise().execute('SELECT * FROM alm_inventario');
  res.json(inventarios);
};

const createInventario = async (req, res) => {
  const { num_almacen, num_producto, cnt_stock, cnt_stock_min, mto_pcompra, mto_pventa } = req.body;
  const result = await db.promise().execute(
    'INSERT INTO alm_inventario (num_almacen, num_producto, cnt_stock, cnt_stock_min, mto_pcompra, mto_pventa) VALUES (?, ?, ?, ?, ?, ?)',
    [num_almacen, num_producto, cnt_stock, cnt_stock_min, mto_pcompra, mto_pventa]
  );
  res.json({ id: result[0].insertId });
};

const getInventarioById = async (req, res) => {
  const { id } = req.params;
  const [inventarios] = await db.promise().execute('SELECT * FROM alm_inventario WHERE num_inventario = ?', [id]);
  res.json(inventarios[0]);
};

const updateInventario = async (req, res) => {
  const { id } = req.params;
  const { num_almacen, num_producto, cnt_stock, cnt_stock_min, mto_pcompra, mto_pventa } = req.body;
  await db.promise().execute(
    'UPDATE alm_inventario SET num_almacen = ?, num_producto = ?, cnt_stock = ?, cnt_stock_min = ?, mto_pcompra = ?, mto_pventa = ? WHERE num_inventario = ?',
    [num_almacen, num_producto, cnt_stock, cnt_stock_min, mto_pcompra, mto_pventa, id]
  );
  res.json({ id });
};

const deleteInventario = async (req, res) => {
  const { id } = req.params;
  await db.promise().execute('DELETE FROM alm_inventario WHERE num_inventario = ?', [id]);
  res.json({ id });
};

module.exports = {
  getInventarios,
  createInventario,
  getInventarioById,
  updateInventario,
  deleteInventario
};
