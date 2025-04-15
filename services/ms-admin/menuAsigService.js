const db = require('../common/database');

const getMenuAsignaciones = async (req, res) => {
  const [menuAsignaciones] = await db.promise().execute('SELECT * FROM zsm_menu_asig');
  res.json(menuAsignaciones);
};

const createMenuAsignacion = async (req, res) => {
  const { num_usuario, num_menu } = req.body;
  const result = await db.promise().execute(
    'INSERT INTO zsm_menu_asig (num_usuario, num_menu) VALUES (?, ?)',
    [num_usuario, num_menu]
  );
  res.json({ id: result[0].insertId });
};

const getMenuAsignacionById = async (req, res) => {
  const [menuAsignacion] = await db.promise().execute('SELECT * FROM zsm_menu_asig WHERE num_usuario = ? AND num_menu = ?', [req.params.num_usuario, req.params.num_menu]);
  res.json(menuAsignacion[0]);
};

const updateMenuAsignacion = async (req, res) => {
  const { num_usuario, num_menu } = req.body;
  await db.promise().execute(
    'UPDATE zsm_menu_asig SET num_menu = ? WHERE num_usuario = ? AND num_menu = ?',
    [num_menu, req.params.num_usuario, req.params.num_menu]
  );
  res.json({ id: { num_usuario: req.params.num_usuario, num_menu: req.params.num_menu } });
};

const deleteMenuAsignacion = async (req, res) => {
  await db.promise().execute('DELETE FROM zsm_menu_asig WHERE num_usuario = ? AND num_menu = ?', [req.params.num_usuario, req.params.num_menu]);
  res.json({ id: { num_usuario: req.params.num_usuario, num_menu: req.params.num_menu } });
};

module.exports = {
  getMenuAsignaciones,
  createMenuAsignacion,
  getMenuAsignacionById,
  updateMenuAsignacion,
  deleteMenuAsignacion
};
