const express = require('express');
const { registrarUsuario } = require('../controllers/authController');

const router = express.Router();

// Registrar un nuevo usuario
router.post('/register', registrarUsuario);

module.exports = router;