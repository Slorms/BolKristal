const { crearUsuario } = require('../services/authService');

const registrarUsuario = async (req, res) => {
    try {
        const { nombre_completo, email, password } = req.body;

        // Validar que los campos sean cadenas de texto
        if (
            typeof nombre_completo !== 'string' ||
            typeof email !== 'string' ||
            typeof password !== 'string'
        ) {
            return res.status(400).json({
                mensaje: 'Nombre, correo y contraseña son obligatorios'
            });
        }

        const nombreLimpio = nombre_completo.trim();
        const emailLimpio = email.trim().toLowerCase();

        // Validar los datos recibidos
        if (!nombreLimpio || !emailLimpio || !password) {
            return res.status(400).json({
                mensaje: 'Todos los campos son obligatorios'
            });
        }

        if (
            nombreLimpio.length > 150 ||
            emailLimpio.length > 150 ||
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailLimpio)
        ) {
            return res.status(400).json({
                mensaje: 'El nombre o correo electrónico no es válido'
            });
        }

        if (password.length < 8 || password.length > 128) {
            return res.status(400).json({
                mensaje: 'La contraseña debe tener entre 8 y 128 caracteres'
            });
        }

        // Crear usuario en PostgreSQL
        const usuario = await crearUsuario(
            nombreLimpio,
            emailLimpio,
            password
        );

        return res.status(201).json({
            mensaje: 'Usuario registrado correctamente',
            usuario
        });

    } catch (error) {
        // PostgreSQL: correo duplicado
        if (error.code === '23505') {
            return res.status(409).json({
                mensaje: 'El correo electrónico ya está registrado'
            });
        }

        console.error('Error al registrar usuario:', error);

        return res.status(500).json({
            mensaje: 'Error interno al registrar usuario'
        });
    }
};

module.exports = {
    registrarUsuario
};