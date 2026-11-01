const {
    crearUsuario,
    buscarUsuarioPorEmail,
    buscarUsuarioPorId
} = require('../services/authService');
const argon2 = require('argon2');

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

// Verificar las credenciales de un usuario
const iniciarSesion = async (req, res) => {
    try {
        const { email, password } = req.body || {};

        // Validar los datos recibidos
        if (
            typeof email !== 'string' ||
            typeof password !== 'string' ||
            !email.trim() ||
            !password
        ) {
            return res.status(400).json({
                mensaje: 'Correo y contraseña son obligatorios'
            });
        }

        // Buscar usuario en PostgreSQL
        const usuario = await buscarUsuarioPorEmail(
            email.trim().toLowerCase()
        );

        // No revelar si el correo existe o la contraseña es incorrecta
        if (!usuario) {
            return res.status(401).json({
                mensaje: 'Correo o contraseña incorrectos'
            });
        }

        // Verificar la contraseña con Argon2
        const passwordCorrecta = await argon2.verify(
            usuario.password_hash,
            password
        );

        if (!passwordCorrecta) {
            return res.status(401).json({
                mensaje: 'Correo o contraseña incorrectos'
            });
        }

        // Verificar que la cuenta esté activa
        if (usuario.activo !== 1) {
            return res.status(403).json({
                mensaje: 'La cuenta está desactivada'
            });
        }

        // Regenerar la sesión para evitar reutilizar un identificador anterior
        req.session.regenerate((error) => {
            if (error) {
                console.error('Error al crear la sesión:', error);

                return res.status(500).json({
                    mensaje: 'No se pudo iniciar sesión'
                });
            }

            // Guardar los datos necesarios del usuario en la sesión
            req.session.usuario = {
                id_usuario: usuario.id_usuario,
                rol: usuario.rol
            };

            // Guardar la sesión antes de responder
            req.session.save((error) => {
                if (error) {
                    console.error('Error al guardar la sesión:', error);

                    return res.status(500).json({
                        mensaje: 'No se pudo iniciar sesión'
                    });
                }

                return res.status(200).json({
                    mensaje: 'Inicio de sesión exitoso',
                    usuario: {
                        id_usuario: usuario.id_usuario,
                        nombre_completo: usuario.nombre_completo,
                        email: usuario.email,
                        rol: usuario.rol
                    }
                });
            });
        });

    } catch (error) {
        console.error('Error al verificar credenciales:', error);

        return res.status(500).json({
            mensaje: 'Error interno al verificar credenciales'
        });
    }
};

// Obtener los datos del usuario que tiene una sesión activa
const obtenerSesion = async (req, res) => {
    try {
        // Comprobar si existe una sesión autenticada
        if (!req.session.usuario) {
            return res.status(401).json({
                mensaje: 'No hay una sesión activa'
            });
        }

        // Buscar los datos actuales del usuario
        const resultado = await buscarUsuarioPorId(
            req.session.usuario.id_usuario
        );

        if (!resultado || resultado.activo !== 1) {
            return res.status(401).json({
                mensaje: 'La sesión ya no es válida'
            });
        }

        return res.status(200).json({
            mensaje: 'Sesión activa',
            usuario: {
                id_usuario: resultado.id_usuario,
                nombre_completo: resultado.nombre_completo,
                email: resultado.email,
                rol: resultado.rol
            }
        });

    } catch (error) {
        console.error('Error al consultar la sesión:', error);

        return res.status(500).json({
            mensaje: 'Error interno al consultar la sesión'
        });
    }
};

// Cerrar la sesión del usuario
const cerrarSesion = (req, res) => {

    // Destruir la sesión almacenada en PostgreSQL
    req.session.destroy((error) => {
        if (error) {
            console.error('Error al cerrar sesión:', error);

            return res.status(500).json({
                mensaje: 'No se pudo cerrar la sesión'
            });
        }

        // Eliminar la cookie del navegador
        res.clearCookie('bolkristal.sid', {
            path: '/'
        });

        return res.status(200).json({
            mensaje: 'Sesión cerrada correctamente'
        });
    });
};

module.exports = {
    registrarUsuario,
    iniciarSesion,
    obtenerSesion,
    cerrarSesion
};