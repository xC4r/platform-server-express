const db = require('../common/database');

const getPedidoDetalles = async (req, res) => {
  const [pedidoDetalles] = await db.promise().execute('SELECT * FROM alm_pedido_clidet');
  res.json(pedidoDetalles);
};

const createPedidoDetalle = async (req, res) => {
  const { num_pedido_cli, num_detalleped, num_producto, des_producto, cnt_producto, mto_precio, mto_importe, usu_creacion } = req.body;
  const result = await db.promise().execute(
    'INSERT INTO alm_pedido_clidet (num_pedido_cli, num_detalleped, num_producto, des_producto, cnt_producto, mto_precio, mto_importe, usu_creacion) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [num_pedido_cli, num_detalleped, num_producto, des_producto, cnt_producto, mto_precio, mto_importe, usu_creacion]
  );
  res.json({ id: result[0].insertId });
};

const getPedidoDetalleById = async (req, res) => {
  const { id } = req.params;
  const [pedidoDetalles] = await db.promise().execute('SELECT * FROM alm_pedido_clidet WHERE num_pedido_cli = ? AND num_detalleped = ?', [id]);
  res.json(pedidoDetalles[0]);
};

const updatePedidoDetalle = async (req, res) => {
  const { id } = req.params;
  const { num_pedido_cli, num_detalleped, num_producto, des_producto, cnt_producto, mto_precio, mto_importe, usu_creacion } = req.body;
  await db.promise().execute(
    'UPDATE alm_pedido_clidet SET num_pedido_cli = ?, num_detalleped = ?, num_producto = ?, des_producto = ?, cnt_producto = ?, mto_precio = ?, mto_importe = ?, usu_creacion = ? WHERE num_pedido_cli = ? AND num_detalleped = ?',
    [num_pedido_cli, num_detalleped, num_producto, des_producto, cnt_producto, mto_precio, mto_importe, usu_creacion, id]
  );
  res.json({ id });
};

const deletePedidoDetalle = async (req, res) => {
  const { id } = req.params;
  await db.promise().execute('DELETE FROM alm_pedido_clidet WHERE num_pedido_cli = ? AND num_detalleped = ?', [id]);
  res.json({ id });
};

module.exports = {
  getPedidoDetalles,
  createPedidoDetalle,
  getPedidoDetalleById,
  updatePedidoDetalle,
  deletePedidoDetalle
};
