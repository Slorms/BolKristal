const express = require('express');

const {
    registrarUsuario,
    iniciarSesion,
    obtenerSesion,
    cerrarSesion
} = require('../controllers/authController');

const router = express.Router();

// Registrar un nuevo usuario
router.post('/register', registrarUsuario);

// Iniciar sesión
router.post('/login', iniciarSesion);

// Consultar la sesión actual
router.get('/me', obtenerSesion);

// Cerrar la sesión del usuario
router.post('/logout', cerrarSesion);

module.exports = router;