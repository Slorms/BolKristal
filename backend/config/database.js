const { Pool } = require('pg');
require('dotenv').config();

// Creamos un grupo de conexiones a PostgreSQL
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: true
    }
});

// Exportamos la conexión para utilizarla en otros archivos
module.exports = pool;