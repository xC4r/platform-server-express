const db = require('../common/database');

const getProductos = async (req, res) => {
  const [productos] = await db.promise().execute('SELECT * FROM alm_producto WHERE ind_estado = 1');
  res.json(productos);
};

const createProducto = async (req, res) => {
  const { cod_producto, des_corta, des_producto, des_marca, num_proveedor, cod_unidad, cod_categoria } = req.body;
  const result = await db.promise().execute(
    'INSERT INTO alm_producto (cod_producto, des_corta, des_producto, des_marca, num_proveedor, cod_unidad, cod_categoria) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [cod_producto, des_corta, des_producto, des_marca, num_proveedor, cod_unidad, cod_categoria]
  );
  res.json({ id: result[0].insertId });
};

const getProductoById = async (req, res) => {
  const { id } = req.params;
  const [productos] = await db.promise().execute('SELECT * FROM alm_producto WHERE num_producto = ?', [id]);
  res.json(productos[0]);
};

const updateProducto = async (req, res) => {
  const { id } = req.params;
  const { cod_producto, des_corta, des_producto, des_marca, num_proveedor, cod_unidad, cod_categoria } = req.body;
  await db.promise().execute(
    'UPDATE alm_producto SET cod_producto = ?, des_corta = ?, des_producto = ?, des_marca = ?, num_proveedor = ?, cod_unidad = ?, cod_categoria = ? WHERE num_producto = ?',
    [cod_producto, des_corta, des_producto, des_marca, num_proveedor, cod_unidad, cod_categoria, id]
  );
  res.json({ id });
};

const deleteProducto = async (req, res) => {
  const { id } = req.params;
  await db.promise().execute('UPDATE alm_producto SET ind_estado = 0 WHERE num_producto = ?', [id]);
  res.json({ id });
};

module.exports = {
  getProductos,
  createProducto,
  getProductoById,
  updateProducto,
  deleteProducto
};
