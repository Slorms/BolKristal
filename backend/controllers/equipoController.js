const equipoService = require('../services/equipoService');

// Obtener todos los equipos registrados
async function listarEquipos(req, res) {
    try {
        const equipos = await equipoService.obtenerEquipos();

        return res.status(200).json({
            mensaje: 'Equipos obtenidos correctamente',
            equipos
        });

    } catch (error) {
        console.error('Error al obtener equipos:', error);

        return res.status(500).json({
            mensaje: 'No se pudieron obtener los equipos'
        });
    }
}

// Registrar un nuevo equipo
async function registrarEquipo(req, res) {
    try {
        const { nombre, jugador1, jugador2, nivel } = req.body || {};

        // Validar los nombres
        if (
            typeof nombre !== 'string' ||
            typeof jugador1 !== 'string' ||
            typeof jugador2 !== 'string' ||
            !nombre.trim() ||
            !jugador1.trim() ||
            !jugador2.trim() ||
            nombre.trim().length > 150 ||
            jugador1.trim().length > 150 ||
            jugador2.trim().length > 150
        ) {
            return res.status(400).json({
                mensaje: 'Los nombres del equipo y jugadores son obligatorios y deben tener máximo 150 caracteres.'
            });
        }

        // Validar nivel
        if (!['principiante', 'profesional'].includes(nivel)) {
            return res.status(400).json({
                mensaje: 'El nivel del equipo no es válido.'
            });
        }

        // El precio se calcula en el servidor
        const precio = nivel === 'profesional' ? 200 : 150;

        // El propietario se obtiene de la sesión autenticada
        const idUsuario = req.usuario.id_usuario;

        const equipo = await equipoService.crearEquipo({
            nombre: nombre.trim(),
            jugador1: jugador1.trim(),
            jugador2: jugador2.trim(),
            nivel,
            precio,
            id_usuario: idUsuario
        });

        return res.status(201).json({
            mensaje: 'Equipo registrado correctamente.',
            equipo
        });

    } catch (error) {
        console.error('Error al registrar equipo:', error);

        return res.status(500).json({
            mensaje: 'No se pudo registrar el equipo.'
        });
    }
}

// Eliminar un equipo
async function eliminarEquipo(req, res) {
    try {
        const idEquipo = Number(req.params.id);

        // Validar el identificador
        if (!Number.isSafeInteger(idEquipo) || idEquipo <= 0) {
            return res.status(400).json({
                mensaje: 'El identificador del equipo no es válido.'
            });
        }

        // Eliminar equipo de PostgreSQL
        const equipo = await equipoService.eliminarEquipo(idEquipo);

        if (!equipo) {
            return res.status(404).json({
                mensaje: 'El equipo no existe.'
            });
        }

        return res.status(200).json({
            mensaje: 'Equipo eliminado correctamente.',
            equipo
        });

    } catch (error) {
        console.error('Error al eliminar equipo:', error);

        return res.status(500).json({
            mensaje: 'No se pudo eliminar el equipo.'
        });
    }
}

module.exports = {
    listarEquipos,
    registrarEquipo,
    eliminarEquipo
};