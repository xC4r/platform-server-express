const db = require('../common/database');

const getMovimientos = async (req, res) => {
  const [movimientos] = await db.promise().execute('SELECT * FROM alm_movimiento');
  res.json(movimientos);
};

const createMovimiento = async (req, res) => {
  const { num_inventario, num_producto, ind_tipmovim, cnt_movimiento, des_motivo, cod_operacion, cod_cpe, num_serie, num_cpe } = req.body;
  const result = await db.promise().execute(
    'INSERT INTO alm_movimiento (num_inventario, num_producto, ind_tipmovim, cnt_movimiento, des_motivo, cod_operacion, cod_cpe, num_serie, num_cpe) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [num_inventario, num_producto, ind_tipmovim, cnt_movimiento, des_motivo, cod_operacion, cod_cpe, num_serie, num_cpe]
  );
  res.json({ id: result[0].insertId });
};

const getMovimientoById = async (req, res) => {
  const { id } = req.params;
  const [movimientos] = await db.promise().execute('SELECT * FROM alm_movimiento WHERE num_movimiento = ?', [id]);
  res.json(movimientos[0]);
};

module.exports = {
  getMovimientos,
  createMovimiento,
  getMovimientoById
};
