const usuarioService = require('../services/usuarioService');

// Obtener la lista de usuarios registrados
async function listarUsuarios(req, res) {
    try {
        const usuarios = await usuarioService.obtenerUsuarios();

        res.status(200).json({
            mensaje: 'Usuarios obtenidos correctamente',
            usuarios: usuarios
        });

    } catch (error) {
        console.error('Error al obtener usuarios:', error);

        res.status(500).json({
            mensaje: 'No se pudieron obtener los usuarios.'
        });
    }
}
// Activa o desactiva una cuenta de usuario
async function actualizarEstadoUsuario(req, res) {
    try {
        const idUsuario = Number(req.params.id);
        const { activo } = req.body;

        // Validar el ID del usuario
        if (!Number.isSafeInteger(idUsuario) || idUsuario <= 0) {
            return res.status(400).json({
                mensaje: 'El ID del usuario no es válido.'
            });
        }

        // El estado solamente puede ser 0 o 1
        if (activo !== 0 && activo !== 1) {
            return res.status(400).json({
                mensaje: 'El estado debe ser 0 o 1.'
            });
        }

        // Impedir que el administrador desactive su propia cuenta
        if (idUsuario === req.usuario.id_usuario && activo === 0) {
            return res.status(403).json({
                mensaje: 'No puedes desactivar tu propia cuenta.'
            });
        }

        const usuario = await usuarioService.cambiarEstadoUsuario(
            idUsuario,
            activo
        );

        if (!usuario) {
            return res.status(404).json({
                mensaje: 'El usuario no existe.'
            });
        }

        res.status(200).json({
            mensaje: activo === 1
                ? 'Usuario activado correctamente.'
                : 'Usuario desactivado correctamente.',
            usuario
        });

    } catch (error) {
        console.error('Error al actualizar estado:', error);

        if (error.status === 409) {
            return res.status(409).json({
                mensaje: error.message
            });
        }

        res.status(500).json({
            mensaje: 'No se pudo actualizar el estado del usuario.'
        });
    }
}
// Editar nombre y correo de un usuario
async function editarUsuario(req, res) {
    try {
        const idUsuario = Number(req.params.id);
        const { nombre_completo, email } = req.body || {};

        // Validar el ID
        if (!Number.isSafeInteger(idUsuario) || idUsuario <= 0) {
            return res.status(400).json({
                mensaje: 'El ID del usuario no es válido.'
            });
        }

        // Validar que los datos sean cadenas de texto
        if (
            typeof nombre_completo !== 'string' ||
            typeof email !== 'string'
        ) {
            return res.status(400).json({
                mensaje: 'El nombre y correo son obligatorios.'
            });
        }

        const nombre = nombre_completo.trim();
        const correo = email.trim().toLowerCase();

        // Validar nombre
        if (nombre.length < 2 || nombre.length > 150) {
            return res.status(400).json({
                mensaje: 'El nombre debe tener entre 2 y 150 caracteres.'
            });
        }

        // Validar correo
        if (
            correo.length > 150 ||
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)
        ) {
            return res.status(400).json({
                mensaje: 'El correo electrónico no es válido.'
            });
        }

        // Actualizar usuario
        const usuario = await usuarioService.actualizarUsuario(
            idUsuario,
            nombre,
            correo
        );

        if (!usuario) {
            return res.status(404).json({
                mensaje: 'El usuario no existe.'
            });
        }

        return res.status(200).json({
            mensaje: 'Usuario actualizado correctamente.',
            usuario
        });

    } catch (error) {
        console.error('Error al editar usuario:', error);

        // PostgreSQL: correo duplicado
        if (error.code === '23505') {
            return res.status(409).json({
                mensaje: 'El correo electrónico ya está registrado.'
            });
        }

        return res.status(500).json({
            mensaje: 'No se pudo actualizar el usuario.'
        });
    }
}

module.exports = {
    listarUsuarios,
    actualizarEstadoUsuario,
    editarUsuario
};