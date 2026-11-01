const pool = require('../config/database');

// Obtener todos los equipos registrados
async function obtenerEquipos() {
    const resultado = await pool.query(
        `SELECT
            id_equipo,
            nombre,
            jugador1,
            jugador2,
            nivel,
            precio,
            puntos,
            jugados,
            id_usuario,
            creado_por,
            fecha_creacion
         FROM equipo
         ORDER BY id_equipo ASC`
    );

    return resultado.rows;
}

// Registrar un equipo en PostgreSQL
async function crearEquipo(equipo) {
    const {
        nombre,
        jugador1,
        jugador2,
        nivel,
        precio,
        id_usuario
    } = equipo;

    const resultado = await pool.query(
        `INSERT INTO equipo (
            nombre,
            jugador1,
            jugador2,
            nivel,
            precio,
            id_usuario,
            creado_por
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *`,
        [
            nombre,
            jugador1,
            jugador2,
            nivel,
            precio,
            id_usuario,
            'jugador'
        ]
    );

    return resultado.rows[0];
}

module.exports = {
    obtenerEquipos,
    crearEquipo
};