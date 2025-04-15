require('dotenv').config({ path: '../../.env.dev' });

module.exports = {
    db: {
        url: process.env.DATABASE_URL
    },
    secretKey: process.env.JWT_SECRET,
    port: {
        GATE_PORT: process.env.GATE_SERVICE_PORT,
        AUTH_PORT: process.env.AUTH_SERVICE_PORT,
        ADMI_PORT: process.env.ADMI_SERVICE_PORT,
        ALMA_PORT: process.env.ALMA_SERVICE_PORT,
        VENT_PORT: process.env.VENT_SERVICE_PORT
    },
    host: process.env.HOST_IP_DOMINIO
};
