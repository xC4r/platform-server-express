require('dotenv').config({ path: '.env.dev' });
const { exec } = require('child_process');

// Función para iniciar un microservicio
const startService = (name, path, port) => {
    if (!port) {
        console.error(`Error: El puerto para ${name} no está definido en las variables de entorno.`);
        return;
    }

    console.log(`Iniciando ${name} en el puerto ${port}...`);
    exec(`npx cross-env PORT=${port} node ${path}/app.js`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error al iniciar ${name}:`, error);
            return;
        }
        console.log(`${name} iniciado en el puerto ${port}`);
        console.log(stdout);
        if (stderr) console.error(stderr);
    });
};

// Iniciar microservicios y asegurarse de que las variables de entorno estén definidas
startService('API Gateway', './services/api-gateway', process.env.GATE_SERVICE_PORT);
startService('Auth Service', './services/ms-seguridad', process.env.AUTH_SERVICE_PORT);
startService('Admin Service', './services/ms-admin', process.env.ADMI_SERVICE_PORT);
startService('Almacen Service', './services/ms-almacen', process.env.ALMA_SERVICE_PORT);
startService('Ventas Service', './services/ms-ventas', process.env.VENT_SERVICE_PORT);
