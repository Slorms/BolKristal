const express = require('express');
const router = express.Router();

const {
    listarUsuarios,
    actualizarEstadoUsuario,
    editarUsuario,
    actualizarRolUsuario
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

// Cambiar el rol de un usuario
router.patch(
    '/:id/rol',
    verificarAutenticacion,
    verificarRol('administrador'),
    actualizarRolUsuario
);

module.exports = router;