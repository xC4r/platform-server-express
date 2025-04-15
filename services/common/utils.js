const jwt = require('jsonwebtoken');
const { secretKey } = require('../common/config');

const isTokenValid = (token) => {
    if (!token) return false;
    try {
      const decoded = jwt.verify(token, secretKey);
      return decoded.exp > Math.floor(Date.now() / 1000);
    } catch (err) {
      return false;
    }
};

const getTokenData = (token) => {
    if (!token) return null;
    try {
      const decoded = jwt.verify(token, secretKey);
      return {
        userId: decoded.userId,
        usuario: decoded.usuario
      };
    } catch (err) {
      return null;
    }
};

module.exports = { isTokenValid, getTokenData };
