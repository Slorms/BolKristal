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

// Buscar un usuario por su correo electrónico
const buscarUsuarioPorEmail = async (email) => {
    const resultado = await pool.query(
        `SELECT
            id_usuario,
            nombre_completo,
            email,
            password_hash,
            rol,
            activo
         FROM usuario
         WHERE LOWER(email) = $1`,
        [email]
    );

    return resultado.rows[0] || null;
};

// Buscar un usuario por su identificador
const buscarUsuarioPorId = async (id_usuario) => {
    const resultado = await pool.query(
        `SELECT
            id_usuario,
            nombre_completo,
            email,
            rol,
            activo
         FROM usuario
         WHERE id_usuario = $1`,
        [id_usuario]
    );

    return resultado.rows[0] || null;
};

module.exports = {
    crearUsuario,
    buscarUsuarioPorEmail,
    buscarUsuarioPorId
};