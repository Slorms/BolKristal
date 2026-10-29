const pool = require('../config/database');
const argon2 = require('argon2');

const crearUsuario = async (nombre_completo, email, password) => {

    // Proteger la contraseña antes de guardarla
    const password_hash = await argon2.hash(password, {
        type: argon2.argon2id
    });

    // Guardar el usuario en PostgreSQL
    const resultado = await pool.query(
        `INSERT INTO usuario (nombre_completo, email, password_hash)
         VALUES ($1, $2, $3)
         RETURNING id_usuario, nombre_completo, email, rol, fecha_registro`,
        [nombre_completo, email, password_hash]
    );

    return resultado.rows[0];
};

module.exports = {
    crearUsuario
};