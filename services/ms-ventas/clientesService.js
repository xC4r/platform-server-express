const db = require('../common/database');

const getClientes = async (req, res) => {
  const [clientes] = await db.promise().execute('SELECT * FROM ven_clientes');
  res.json(clientes);
};

const createCliente = async (req, res) => {
  const { cod_tipcliente, num_doccliente, nom_cliente, num_telefono, des_email, des_direccion, mto_credito} = req.body;
  const result = await db.promise().execute(
    'INSERT INTO ven_clientes (cod_tipcliente, num_doccliente, nom_cliente, num_telefono, des_email, des_direccion, mto_credito) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [cod_tipcliente, num_doccliente, nom_cliente, num_telefono, des_email, des_direccion, mto_credito]
  );
  res.json({ id: result[0].insertId });
};
/*
{
"num_cliente":"",
"cod_tipcliente":"01",
"num_doccliente":"",
"nom_cliente":"FERRO CHAVEZ",
"num_telefono":"",
"des_email":"",
"des_direccion":"",
"mto_credito":0
}
*/
const getClienteById = async (req, res) => {
  const { id } = req.params;
  const [clientes] = await db.promise().execute('SELECT * FROM ven_clientes WHERE num_cliente = ?', [id]);
  if (clientes.length === 0) {
    return res.status(404).json({ error: 'Cliente no encontrado' });
  }
  res.json(clientes[0]);
};

const updateCliente = async (req, res) => {
  const { id } = req.params;
  const { cod_tipcliente, num_doccliente, nom_cliente, num_telefono, des_email, des_direccion, mto_credito, ind_estado } = req.body;
  await db.promise().execute(
    'UPDATE ven_clientes SET cod_tipcliente = ?, num_doccliente = ?, nom_cliente = ?, num_telefono = ?, des_email = ?, des_direccion = ?, mto_credito = ?, ind_estado = ? WHERE num_cliente = ?',
    [cod_tipcliente, num_doccliente, nom_cliente, num_telefono, des_email, des_direccion, mto_credito, ind_estado, id]
  );
  res.json({ message: 'Cliente actualizado' });
};

const deleteCliente = async (req, res) => {
  const { id } = req.params;
  await db.promise().execute('DELETE FROM ven_clientes WHERE num_cliente = ?', [id]);
  res.json({ message: 'Cliente eliminado' });
};

module.exports = {
  getClientes,
  createCliente,
  getClienteById,
  updateCliente,
  deleteCliente
};
