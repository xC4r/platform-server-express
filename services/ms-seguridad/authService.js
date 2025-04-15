const jwt = require('jsonwebtoken');
const { secretKey } = require('../common/config');
const db = require('../common/database');

// Login
const login = async (usuario, clave) => {
  try {
    const [users] = await db.promise().execute('SELECT * FROM zsm_usuario WHERE cod_usuario = ?', [usuario]);
    const user = users[0];

    if (!user || clave !== user.pas_usuario) {
      throw new Error('Credenciales inválidas');
    }

    const token = jwt.sign({ userId: user.num_usuario, usuario }, secretKey, { expiresIn: '1h' });

    return {
      usr: user.cod_usuario,
      nom: user.nom_usuario,
      eml: user.dir_correo,
      rol: user.num_rol,  
      token,
    };
  } catch (error) {
    console.error('Error detallado:', error);
    throw new Error(`Error en login: ${error.message}`);
  }
};

// Logout
const logout = (token) => {
  const mensaje = isTokenValid(token) ? 'Token válido' : 'Token inválido';
  return { message: `Logout exitoso: ${mensaje}` };
};


// Verificar validez del token sin invalidTokens
const isTokenValid = (token) => {
  if (!token) return false;
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded.exp > Math.floor(Date.now() / 1000);
  } catch (err) {
    return false;
  }
};

module.exports = { login, logout, isTokenValid };
