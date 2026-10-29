const express = require('express');
const pool = require('./config/database');
const authRoutes = require('./routes/authRoutes');

// Creamos nuestra aplicación
const app = express();

// Definimos el puerto
const PORT = process.env.PORT || 3000;

// Permitimos recibir información en formato JSON
app.use(express.json());
app.use('/api/auth', authRoutes);

// Ruta principal de la API
app.get('/api', (req, res) => {
    res.json({
        mensaje: 'API de BolKristal funcionando correctamente'
    });
});

// Ruta para comprobar la conexión con PostgreSQL
app.get('/api/database', async (req, res) => {
    try {
        const resultado = await pool.query('SELECT current_database()');

        res.json({
            mensaje: 'Conexión con PostgreSQL exitosa',
            database: resultado.rows[0].current_database
        });

    } catch (error) {
        // Mostramos información del error en la terminal
        console.error('Error al conectar con PostgreSQL:', {
            nombre: error.name,
            codigo: error.code,
            mensaje: error.message,
            causa: error.cause?.message
        });

        // Respondemos al navegador sin revelar información sensible
        res.status(500).json({
            mensaje: 'No se pudo conectar con PostgreSQL'
        });
    }
});

// Iniciamos el servidor local
app.listen(PORT, '127.0.0.1', () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});