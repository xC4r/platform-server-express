const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env.dev') });

//console.log('Db: ', process.env.DATABASE_URL);
module.exports = {
    db: {
        url: process.env.DATABASE_URL
    },
    secretKey: process.env.JWT_SECRET,
    port: 3100,
    host: process.env.HOST_IP_DOMINIO,
    cors: {
        origins: process.env.CORS_ORIGINS || '*'
    }
};
