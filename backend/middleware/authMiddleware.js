
const pool = require('../config/database');

async function verificarAutenticacion(req, res, next) {
    if (!req.session || !req.session.usuario) {
        return res.status(401).json({
            mensaje: 'Debes iniciar sesión para acceder.'
        });
    }

    try {
        const resultado = await pool.query(
            `SELECT id_usuario, rol, activo
             FROM usuario
             WHERE id_usuario = $1`,
            [req.session.usuario.id_usuario]
        );

        const usuario = resultado.rows[0];

        if (!usuario || usuario.activo !== 1) {
            return res.status(401).json({
                mensaje: 'Tu sesión ya no es válida.'
            });
        }

        req.usuario = usuario;
        next();

    } catch (error) {
        console.error('Error al verificar usuario:', error);

        res.status(500).json({
            mensaje: 'No se pudo verificar la autenticación.'
        });
    }
}

function verificarRol(...rolesPermitidos) {
    return (req, res, next) => {
        const usuario = req.usuario;

        if (!usuario) {
            return res.status(401).json({
                mensaje: 'Debes iniciar sesión para acceder.'
            });
        }

        if (!rolesPermitidos.includes(usuario.rol)) {
            return res.status(403).json({
                mensaje: 'No tienes permisos para realizar esta acción.'
            });
        }

        next();
    };
}

module.exports = {
    verificarAutenticacion,
    verificarRol
};