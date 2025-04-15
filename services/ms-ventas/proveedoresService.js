const db = require('../common/database');

const getProveedores = async (req, res) => {
  const [proveedores] = await db.promise().execute('SELECT * FROM ven_proveedores');
  res.json(proveedores);
};

const createProveedor = async (req, res) => {
  const { num_proveedor, num_ruc, nom_razsocial, des_contacto, num_telefono, des_email, des_direccion, ind_estado } = req.body;
  const result = await db.promise().execute(
    'INSERT INTO ven_proveedores (num_proveedor, num_ruc, nom_razsocial, des_contacto, num_telefono, des_email, des_direccion, ind_estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [num_proveedor, num_ruc, nom_razsocial, des_contacto, num_telefono, des_email, des_direccion, ind_estado]
  );
  res.json({ id: result[0].insertId });
};

const getProveedorById = async (req, res) => {
  const { id } = req.params;
  const [proveedor] = await db.promise().execute('SELECT * FROM ven_proveedores WHERE num_proveedor = ?', [id]);
  if (proveedor.length === 0) {
    return res.status(404).json({ error: 'Proveedor no encontrado' });
  }
  res.json(proveedor[0]);
};

const updateProveedor = async (req, res) => {
  const { id } = req.params;
  const { num_ruc, nom_razsocial, des_contacto, num_telefono, des_email, des_direccion, ind_estado } = req.body;
  await db.promise().execute(
    'UPDATE ven_proveedores SET num_ruc = ?, nom_razsocial = ?, des_contacto = ?, num_telefono = ?, des_email = ?, des_direccion = ?, ind_estado = ? WHERE num_proveedor = ?',
    [num_ruc, nom_razsocial, des_contacto, num_telefono, des_email, des_direccion, ind_estado, id]
  );
  res.json({ message: 'Proveedor actualizado' });
};

const deleteProveedor = async (req, res) => {
  const { id } = req.params;
  await db.promise().execute('DELETE FROM ven_proveedores WHERE num_proveedor = ?', [id]);
  res.json({ message: 'Proveedor eliminado' });
};

module.exports = {
  getProveedores,
  createProveedor,
  getProveedorById,
  updateProveedor,
  deleteProveedor
};
