const mysql = require('mysql2');
const { db } = require('./config');
const { URL } = require('url');
const dbUrl = new URL(db.url);

const connection = mysql.createConnection({
    host: dbUrl.hostname,       // 'localhost'
    user: dbUrl.username,       // 'root'
    password: dbUrl.password,   // '1234'
    database: dbUrl.pathname.replace('/', ''), // 'db_local'
    port: dbUrl.port || 3306    // Por defecto 3306 si no se especifica 
});

connection.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
    } else {
        console.log('Connected to the database successfully');
    }
});

module.exports = connection;
