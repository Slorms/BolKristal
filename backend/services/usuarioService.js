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
    const cliente = await pool.connect();

    try {
        await cliente.query('BEGIN');

        // Evitamos que dos solicitudes administrativas
        // modifiquen estados al mismo tiempo.
        await cliente.query(
            'SELECT pg_advisory_xact_lock($1)',
            [20261031]
        );

        // Consultamos el usuario que se quiere modificar
        const consulta = await cliente.query(
            `SELECT id_usuario, rol, activo
             FROM usuario
             WHERE id_usuario = $1
             FOR UPDATE`,
            [idUsuario]
        );

        const usuario = consulta.rows[0];

        if (!usuario) {
            await cliente.query('ROLLBACK');
            return null;
        }

        // Si se quiere desactivar un administrador,
        // comprobamos cuántos administradores activos quedan.
        if (
            usuario.rol === 'administrador' &&
            usuario.activo === 1 &&
            activo === 0
        ) {
            const resultado = await cliente.query(
                `SELECT COUNT(*)::integer AS total
                 FROM usuario
                 WHERE rol = 'administrador'
                 AND activo = 1`
            );

            if (resultado.rows[0].total <= 1) {
                const error = new Error(
                    'No puedes desactivar al último administrador activo.'
                );

                error.status = 409;
                throw error;
            }
        }

        // Actualizamos el estado del usuario
        const resultado = await cliente.query(
            `UPDATE usuario
             SET activo = $1
             WHERE id_usuario = $2
             RETURNING id_usuario, nombre_completo, email, rol, activo`,
            [activo, idUsuario]
        );

        await cliente.query('COMMIT');

        return resultado.rows[0];

    } catch (error) {
        await cliente.query('ROLLBACK');
        throw error;

    } finally {
        cliente.release();
    }
}

// Actualizar los datos de un usuario
async function actualizarUsuario(idUsuario, nombreCompleto, email) {
    const resultado = await pool.query(
        `UPDATE usuario
         SET nombre_completo = $1,
             email = $2
         WHERE id_usuario = $3
         RETURNING id_usuario, nombre_completo, email, rol, activo`,
        [nombreCompleto, email, idUsuario]
    );

    return resultado.rows[0];
}

// Cambiar el rol de un usuario
async function cambiarRolUsuario(idUsuario, nuevoRol) {
    const cliente = await pool.connect();

    try {
        await cliente.query('BEGIN');

        // Usamos el mismo bloqueo que al activar o desactivar usuarios
        await cliente.query(
            'SELECT pg_advisory_xact_lock($1)',
            [20261031]
        );

        // Consultar el usuario y bloquear su registro
        const consulta = await cliente.query(
            `SELECT id_usuario, rol, activo
             FROM usuario
             WHERE id_usuario = $1
             FOR UPDATE`,
            [idUsuario]
        );

        const usuario = consulta.rows[0];

        if (!usuario) {
            await cliente.query('ROLLBACK');
            return null;
        }

        // Proteger al último administrador activo
        if (
            usuario.rol === 'administrador' &&
            usuario.activo === 1 &&
            nuevoRol !== 'administrador'
        ) {
            const resultado = await cliente.query(
                `SELECT COUNT(*)::integer AS total
                 FROM usuario
                 WHERE rol = 'administrador'
                   AND activo = 1`
            );

            if (resultado.rows[0].total <= 1) {
                const error = new Error(
                    'No puedes cambiar el rol del último administrador activo.'
                );

                error.status = 409;
                throw error;
            }
        }

        // Actualizar el rol
        const resultado = await cliente.query(
            `UPDATE usuario
             SET rol = $1
             WHERE id_usuario = $2
             RETURNING id_usuario, nombre_completo, email, rol, activo`,
            [nuevoRol, idUsuario]
        );

        await cliente.query('COMMIT');

        return resultado.rows[0];

    } catch (error) {
        await cliente.query('ROLLBACK');
        throw error;

    } finally {
        cliente.release();
    }
}

module.exports = {
    obtenerUsuarios,
    cambiarEstadoUsuario,
    actualizarUsuario,
    cambiarRolUsuario
};