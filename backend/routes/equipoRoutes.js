const express = require('express');
const router = express.Router();

const {
    listarEquipos,
    registrarEquipo
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

module.exports = router;