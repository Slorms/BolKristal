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

module.exports = {
    obtenerUsuarios
};
