const express = require('express');
const router = express.Router();
const {
    listarUsuarios,
    actualizarEstadoUsuario,
    editarUsuario
} = require('../controllers/usuarioController');
const {
    verificarAutenticacion,
    verificarRol
} = require('../middleware/authMiddleware');

// Obtener todos los usuarios (solo administradores)
router.get(
    '/',
    verificarAutenticacion,
    verificarRol('administrador'),
    listarUsuarios
);

// Activar o desactivar un usuario
router.patch(
    '/:id/estado',
    verificarAutenticacion,
    verificarRol('administrador'),
    actualizarEstadoUsuario
);

// Editar nombre y correo de un usuario
router.patch(
    '/:id',
    verificarAutenticacion,
    verificarRol('administrador'),
    editarUsuario
);

module.exports = router;