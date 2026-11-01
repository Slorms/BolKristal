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

module.exports = {
    listarUsuarios
};
