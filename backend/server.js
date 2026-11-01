require('dotenv').config();

const express = require('express');
const pool = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const session = require('express-session');
const PgSession = require('connect-pg-simple')(session);
const cors = require('cors');
const {
    verificarAutenticacion,
    verificarRol
} = require('./middleware/authMiddleware');
const usuarioRoutes = require('./routes/usuarioRoutes');

// Creamos nuestra aplicación
const app = express();

// Definimos el puerto
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: [
        'http://127.0.0.1:5500',
        'http://localhost:5500'
    ],
    credentials: true
}));

// Permitimos recibir información en formato JSON
app.use(express.json());
// Configuración de sesiones
app.use(session({
    store: new PgSession({
        pool: pool,
        tableName: 'session',
        createTableIfMissing: true
    }),

    name: 'bolkristal.sid',

    secret: process.env.SESSION_SECRET,

    resave: false,
    saveUninitialized: false,

    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 1000 * 60 * 60 * 24
    }
}));
app.use('/api/auth', authRoutes);
app.use('/api/usuarios', usuarioRoutes);

app.get(
    '/api/admin/test',
    verificarAutenticacion,
    verificarRol('administrador'),
    (req, res) => {
        res.json({
            mensaje: 'Acceso autorizado al administrador'
        });
    }
);

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