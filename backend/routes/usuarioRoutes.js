const express = require('express');
const router = express.Router();

const { listarUsuarios } = require('../controllers/usuarioController');

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

module.exports = router;
