const db = require('../common/database');
const jwt = require('jsonwebtoken');
const config = require('../common/config');

const getPedidos = async (req, res) => {
  const [pedidos] = await db.promise().execute('SELECT * FROM alm_pedido_cli');
  res.json(pedidos);
};

const createPedido = async (req, res) => {
  try {
    const usuario = extractUserFromToken(req);
    const { num_pedido, num_cliente, des_cliente, cod_tipopago, cod_estado } = req.body;
    const result = await db.promise().execute(
      'INSERT INTO alm_pedido_cli (num_pedido, num_cliente, des_cliente, cod_tipopago, cod_estado, usu_creacion) VALUES (?, ?, ?, ?, ?, ?)',
      [num_pedido, num_cliente, des_cliente, cod_tipopago, cod_estado, usuario]
    );
    res.json({ id: result[0].insertId });
  } catch (error) {
    console.error('Error al crear pedido:', error);
    res.status(500).json({ error: 'Error al crear pedido' });
  }
};

const getPedidoById = async (req, res) => {
  const { id } = req.params;
  const [pedidos] = await db.promise().execute('SELECT * FROM alm_pedido_cli WHERE num_pedido_cli = ?', [id]);
  res.json(pedidos[0]);
};

const updatePedido = async (req, res) => {
  try {
    const usuario = extractUserFromToken(req); // Mover aquí la extracción del usuario
    const { id } = req.params;
    const { num_pedido, num_cliente, des_cliente, cod_tipopago, cod_estado } = req.body;
    await db.promise().execute(
      'UPDATE alm_pedido_cli SET num_pedido = ?, num_cliente = ?, des_cliente = ?, cod_tipopago = ?, cod_estado = ?, usu_creacion = ? WHERE num_pedido_cli = ?',
      [num_pedido, num_cliente, des_cliente, cod_tipopago, cod_estado, usuario, id]
    );
    res.json({ id });
  } catch (error) {
    console.error('Error al actualizar pedido:', error);
    res.status(500).json({ error: 'Error al actualizar pedido' });
  }
};

const deletePedido = async (req, res) => {
  const { id } = req.params;
  await db.promise().execute('DELETE FROM alm_pedido_cli WHERE num_pedido_cli = ?', [id]);
  res.json({ id });
};

const getMaxNumPedido = async (req, res) => {
  try {
    const [result] = await db.promise().execute(
      `SELECT MAX(CAST(SUBSTRING(num_pedido, 3) AS UNSIGNED)) AS max_num FROM alm_pedido_cli WHERE num_pedido LIKE 'PA%'`
    );

    const maxNum = result[0].max_num || 0; // Si no hay registros, usar 0
    const nextNum = maxNum + 1; // Incrementar el número
    const nextNumPedido = `PA${nextNum.toString().padStart(4, '0')}`; // Formatear como PA0001, PA0002, etc.

    res.json({ nextNumPedido });
  } catch (error) {
    console.error('Error al obtener el número máximo de pedido:', error);
    res.status(500).json({ error: 'Error al obtener el número máximo de pedido' });
  }
};

const extractUserFromToken = (req) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) throw new Error('Token not provided');
  const decoded = jwt.verify(token, config.secretKey);
  return decoded.usuario;
};

module.exports = {
  getPedidos,
  createPedido,
  getPedidoById,
  updatePedido,
  deletePedido,
  getMaxNumPedido
};
