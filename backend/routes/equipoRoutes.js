const express = require('express');
const router = express.Router();

const {
    listarEquipos,
    registrarEquipo,
    eliminarEquipo
} = require('../controllers/equipoController');

const {
    verificarAutenticacion,
    verificarRol
} = require('../middleware/authMiddleware');

// Consultar equipos (ruta pública)
router.get('/', listarEquipos);

// Registrar equipo (solo jugadores autenticados)
router.post(
    '/',
    verificarAutenticacion,
    verificarRol('jugador'),
    registrarEquipo
);

// Eliminar equipo (solo administradores)
router.delete(
    '/:id',
    verificarAutenticacion,
    verificarRol('administrador'),
    eliminarEquipo
);

module.exports = router;