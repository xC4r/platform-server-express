const db = require('../common/database');

const getMenus = async (req, res) => {
  const [menus] = await db.promise().execute('SELECT * FROM zsm_menu');
  res.json(menus);
};

const createMenu = async (req, res) => {
  const { des_menu, des_url, cod_menu, cod_icono, num_menusup, num_orden } = req.body;
  const result = await db.promise().execute(
    'INSERT INTO zsm_menu (des_menu, des_url, cod_menu, cod_icono, num_menusup, num_orden) VALUES (?, ?, ?, ?, ?, ?)',
    [des_menu, des_url, cod_menu, cod_icono, num_menusup, num_orden]
  );
  res.json({ id: result[0].insertId });
};

const getMenuById = async (req, res) => {
  const [menu] = await db.promise().execute('SELECT * FROM zsm_menu WHERE num_menu = ?', [req.params.id]);
  res.json(menu[0]);
};

const updateMenu = async (req, res) => {
  const { des_menu, des_url, cod_menu, cod_icono, num_menusup, num_orden } = req.body;
  await db.promise().execute(
    'UPDATE zsm_menu SET des_menu = ?, des_url = ?, cod_menu = ?, cod_icono = ?, num_menusup = ?, num_orden = ? WHERE num_menu = ?',
    [des_menu, des_url, cod_menu, cod_icono, num_menusup, num_orden, req.params.id]
  );
  res.json({ id: req.params.id });
};

const deleteMenu = async (req, res) => {
  await db.promise().execute('DELETE FROM zsm_menu WHERE num_menu = ?', [req.params.id]);
  res.json({ id: req.params.id });
};

module.exports = {
  getMenus,
  createMenu,
  getMenuById,
  updateMenu,
  deleteMenu
};
