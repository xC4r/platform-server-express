const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env.dev') });
//require('dotenv').config({ path: path.resolve(__dirname, '.env') });
const app = require('./services/api-gateway/app'); // Importar la instancia de Express
