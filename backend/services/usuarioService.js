const pool = require('../config/database');

// Obtener todos los usuarios registrados
async function obtenerUsuarios() {
    const resultado = await pool.query(`
        SELECT
            id_usuario,
            nombre_completo,
            email,
            telefono,
            fecha_nacimiento,
            experiencia,
            rol,
            fecha_registro,
            activo
        FROM usuario
        ORDER BY id_usuario ASC
    `);

    return resultado.rows;
}

// Cambia el estado de un usuario
async function cambiarEstadoUsuario(idUsuario, activo) {
    const resultado = await pool.query(
        `UPDATE usuario
         SET activo = $1
         WHERE id_usuario = $2
         RETURNING id_usuario, nombre_completo, email, rol, activo`,
        [activo, idUsuario]
    );

    return resultado.rows[0];
}

module.exports = {
    obtenerUsuarios,
    cambiarEstadoUsuario
};