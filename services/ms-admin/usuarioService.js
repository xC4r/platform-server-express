const db = require('../common/database');

const getUsuarios = async () => {
  const [usuarios] = await db.promise().execute('SELECT * FROM zsm_usuario');
  return usuarios.map(usuario => ({
    id: usuario.num_usuario,
    codigo: usuario.cod_usuario,
    tipoDocumento: usuario.cod_tipdoc,
    numDocumento: usuario.num_documento,
    nombre: usuario.nom_usuario,
    password: usuario.pas_usuario,
    correo: usuario.dir_correo,
    desRol: usuario.cod_rol == 0 ? "Master" : usuario.cod_rol == 1 ? "Administrador" : usuario.cod_rol == 2 ? "Auditor" : "No Valido",
    rol: usuario.cod_rol,
    desEstado: usuario.ind_estado == 0 ? "Inactivo" : usuario.ind_estado == 1 ? "Activo" : "No Valido",
    estado: usuario.ind_estado
  }));
};

const createUsuario = async (usuario) => {
  const { codigo: codUsuario, tipoDocumento: codTipdoc, numDocumento: numDocumento, nombre: nomUsuario, password: pas_usuario, correo: dirCorreo, rol: codRol, estado: indEstado } = usuario;
  const query = 'INSERT INTO zsm_usuario (cod_usuario, cod_tipdoc, num_documento, nom_usuario, pas_usuario, dir_correo, cod_rol, ind_estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  const [result] = await db.promise().execute(query, [codUsuario, codTipdoc, numDocumento, nomUsuario, pas_usuario, dirCorreo, codRol, indEstado]);
  return { numDocumento: result.insertId }; 
};

const getUsuarioByDocumento = async (numDocumento) => {
  const [usuarios] = await db.promise().execute('SELECT * FROM zsm_usuario WHERE num_documento = ?', [numDocumento]);
  const usuario = usuarios[0];
  return {
    id: usuario.num_usuario,
    codigo: usuario.cod_usuario,
    tipoDocumento: usuario.cod_tipdoc,
    numDocumento: usuario.num_documento,
    nombre: usuario.nom_usuario,
    password: usuario.pas_usuario,
    correo: usuario.dir_correo,
    desRol: usuario.cod_rol == 0 ? "Master" : usuario.cod_rol == 1 ? "Administrador" : usuario.cod_rol == 2 ? "Auditor" : "No Valido",
    rol: usuario.cod_rol,
    desEstado: usuario.ind_estado == 0 ? "Inactivo" : usuario.ind_estado == 1 ? "Activo" : "No Valido",
    estado: usuario.ind_estado
  };
};

const updateUsuario = async (numDocumento, usuario) => {
  const { codigo: codUsuario, tipoDocumento: codTipdoc, nombre: nomUsuario, password: pas_usuario, correo: dirCorreo, rol: codRol, estado: indEstado} = usuario;
  const query = 'UPDATE zsm_usuario SET cod_usuario = ?, cod_tipdoc = ?, nom_usuario = ?, pas_usuario = ?, dir_correo = ?, cod_rol = ?, ind_estado = ? WHERE num_documento = ?';
  await db.promise().execute(query, [codUsuario, codTipdoc, nomUsuario, pas_usuario, dirCorreo, codRol, indEstado, numDocumento]);
  return getUsuarioByDocumento(numDocumento);
};

const deleteUsuario = async (numDocumento) => {
  const query = 'UPDATE zsm_usuario SET ind_estado = 0 WHERE num_documento = ?';
  await db.promise().execute(query, [numDocumento]);
  return { message: 'Usuario eliminado correctamente' };
};

const getMenu = async (numUsuario) => {
  const query_asig = 'SELECT m.cod_menu FROM zsm_menu_asig a INNER JOIN zsm_menu m ON m.num_menu = a.num_menu WHERE a.num_usuario = ? AND m.ind_estado = 1';
  const [asignados] = await db.promise().execute(query_asig, [numUsuario]);

  const opcionesAsig = [];

  asignados.forEach(({ cod_menu }) => {
    const parts = cod_menu.split('-');
    let current = '';

    parts.forEach((part, index) => {
      current = index === 0 ? part : `${current}-${part}`;
      if (!opcionesAsig.includes(current)) {
        opcionesAsig.push(current);
      }
    });
  });

  const listaOpcionesAsig = [...new Set(opcionesAsig)].sort();

  const placeholders = listaOpcionesAsig.map(() => '?').join(', ');
  const query = `SELECT num_menu, cod_menu, des_menu, cod_icono, des_url, num_menusup FROM zsm_menu WHERE cod_menu IN (${placeholders})`;
  const [opciones] = await db.promise().execute(query, listaOpcionesAsig);

  const menuMap = {};
  opciones.forEach(opcion => {
    menuMap[opcion.num_menu] = {
      cod: opcion.cod_menu,
      nom: opcion.des_menu,
      ico: opcion.cod_icono,
      url: opcion.des_url || '',
      sub: []
    };
  });

  opciones.forEach(opcion => {
    if (opcion.num_menusup !== null) {
      if (menuMap[opcion.num_menusup]) {
        menuMap[opcion.num_menusup].sub.push(menuMap[opcion.num_menu]);
      }
    }
  });

  const menuValues = Object.values(menuMap);
  const finalMenu = menuValues.filter(item => item.sub.length > 0);
  //console.log('Final menu', finalMenu);
  return finalMenu;
};

module.exports = { getUsuarios, createUsuario, getUsuarioByDocumento, updateUsuario, deleteUsuario, getMenu };
