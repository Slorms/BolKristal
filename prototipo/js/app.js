// Dirección del backend de BolKristal
const API_BASE_URL = 'http://127.0.0.1:3000/api';
// Realiza solicitudes al backend de BolKristal
async function apiRequest(endpoint, options = {}) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            ...options.headers
        }
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.mensaje || 'Ocurrió un error en la solicitud');
    }

    return data;
}

// Cargar los usuarios registrados desde PostgreSQL
async function cargarUsuariosAdmin() {
    const tbody = document.getElementById('admin-usuarios-tbody');

    if (!tbody) return;

    tbody.innerHTML = '<tr><td colspan="7">Cargando usuarios...</td></tr>';

    try {
        const data = await apiRequest('/usuarios');

        tbody.innerHTML = data.usuarios.map(usuario => `
            <tr>
                <td>${usuario.id_usuario}</td>
                <td>${escapeHtml(usuario.nombre_completo)}</td>
                <td>${escapeHtml(usuario.email)}</td>
                <td>${escapeHtml(usuario.rol)}</td>
                <td>
                    <span class="badge ${usuario.activo === 1 ? 'neon-badge-green' : 'neon-badge-pink'}">
                        ${usuario.activo === 1 ? 'Activo' : 'Inactivo'}
                    </span>
                </td>
                <td>
                    ${usuario.fecha_registro
                ? new Date(usuario.fecha_registro).toLocaleDateString('es-MX')
                : 'Sin fecha'}
                </td>
                <td>
                    <button
                        class="btn btn-sm btn-primary"
                        data-editar-usuario="${usuario.id_usuario}"
                    >
                        <i class="fas fa-edit"></i>
                        Editar
                    </button>
                    <button
                        class="btn btn-sm ${usuario.activo === 1 ? 'btn-danger' : 'btn-success'}"
                        data-usuario-id="${usuario.id_usuario}"
                        data-nuevo-estado="${usuario.activo === 1 ? 0 : 1}"
                        ${usuario.id_usuario === AppState.sessionUser?.id ? 'disabled' : ''}
                    >
                    <i class="fas ${usuario.activo === 1 ? 'fa-user-slash' : 'fa-user-check'}"></i>
                     ${usuario.activo === 1 ? 'Desactivar' : 'Activar'}
                    </button>
                </td>
            </tr>
        `).join('') || '<tr><td colspan="7">No hay usuarios registrados.</td></tr>';
        // Asignamos los eventos a los botones de activar y desactivar
        tbody.querySelectorAll('button[data-usuario-id]').forEach(boton => {

            boton.addEventListener('click', async () => {

                const idUsuario = Number(boton.dataset.usuarioId);
                const nuevoEstado = Number(boton.dataset.nuevoEstado);

                boton.disabled = true;

                try {
                    await cambiarEstadoUsuarioAdmin(idUsuario, nuevoEstado);
                } finally {
                    if (boton.isConnected) {
                        boton.disabled = false;
                    }
                }
            });

        });
        // Asignamos los eventos a los botones de editar
        tbody.querySelectorAll('button[data-editar-usuario]').forEach(boton => {

            boton.addEventListener('click', () => {

                const idUsuario = Number(boton.dataset.editarUsuario);

                // Buscamos al usuario seleccionado
                const usuario = data.usuarios.find(
                    u => u.id_usuario === idUsuario
                );

                if (!usuario) {
                    showToast('No se encontró el usuario.', 'error');
                    return;
                }

                // Colocamos sus datos en el formulario
                document.getElementById('editar-usuario-id').value = usuario.id_usuario;

                document.getElementById('editar-usuario-nombre').value =
                    usuario.nombre_completo;

                document.getElementById('editar-usuario-email').value =
                    usuario.email;
                // Mostramos el rol actual del usuario
                const selectorRol = document.getElementById('editar-usuario-rol');

                selectorRol.value = usuario.rol;

                // Impedimos que el administrador cambie su propio rol
                selectorRol.disabled = usuario.id_usuario === AppState.sessionUser?.id;

                // Guardamos el rol original para detectar cambios
                selectorRol.dataset.rolOriginal = usuario.rol;
                // Mostramos el formulario
                const formulario = document.getElementById('form-editar-usuario');

                formulario.style.display = 'block';

                // Nos desplazamos hasta el formulario
                formulario.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            });

        });
    } catch (error) {
        console.error('Error al cargar usuarios:', error);

        tbody.innerHTML = '<tr><td colspan="7">No se pudieron cargar los usuarios.</td></tr>';

        showToast(error.message, 'error');
    }
}

// Configurar el formulario para editar usuarios
function inicializarEdicionUsuarios() {

    const form = document.getElementById('editar-usuario-form');
    const contenedor = document.getElementById('form-editar-usuario');
    const botonCancelar = document.getElementById('cancelar-edicion-usuario');

    if (!form || !contenedor || !botonCancelar) return;

    // Evitar registrar los eventos más de una vez
    if (form.dataset.inicializado === 'true') return;

    form.dataset.inicializado = 'true';

    // Cancelar la edición
    botonCancelar.addEventListener('click', () => {
        form.reset();
        contenedor.style.display = 'none';
    });

    // Guardar los cambios
    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const idUsuario = Number(
            document.getElementById('editar-usuario-id').value
        );

        const nombreCompleto = document.getElementById(
            'editar-usuario-nombre'
        ).value.trim();

        const email = document.getElementById(
            'editar-usuario-email'
        ).value.trim();

        const botonGuardar = form.querySelector('button[type="submit"]');

        if (!Number.isSafeInteger(idUsuario) || idUsuario <= 0) {
            showToast('Selecciona un usuario válido.', 'error');
            return;
        }

        if (nombreCompleto.length < 2) {
            showToast('El nombre debe tener al menos 2 caracteres.', 'error');
            return;
        }

        botonGuardar.disabled = true;

        try {
            // Obtenemos el rol seleccionado
            const selectorRol = document.getElementById('editar-usuario-rol');
            const nuevoRol = selectorRol.value;

            // Actualizamos nombre, correo y rol en una sola petición
            const data = await apiRequest(`/usuarios/${idUsuario}/completo`, {
                method: 'PATCH',
                body: JSON.stringify({
                    nombre_completo: nombreCompleto,
                    email: email,
                    rol: nuevoRol
                })
            });

            // Actualizamos los datos de sesión si editamos nuestra cuenta
            if (AppState.sessionUser?.id === idUsuario) {
                AppState.sessionUser.name = data.usuario.nombre_completo;
                AppState.sessionUser.email = data.usuario.email;
            }

            showToast(data.mensaje, 'success');

            // Cerramos el formulario
            form.reset();
            contenedor.style.display = 'none';

            // Actualizamos la tabla
            await cargarUsuariosAdmin();



        } catch (error) {
            console.error('Error al editar usuario:', error);
            showToast(error.message, 'error');

        } finally {
            botonGuardar.disabled = false;
        }
    });
}

// Activar o desactivar usuarios desde el panel
async function cambiarEstadoUsuarioAdmin(idUsuario, nuevoEstado) {

    const accion = nuevoEstado === 1 ? 'activar' : 'desactivar';

    const confirmar = confirm(
        `¿Estás seguro de que deseas ${accion} este usuario?`
    );

    if (!confirmar) {
        return;
    }

    try {
        const data = await apiRequest(
            `/usuarios/${idUsuario}/estado`,
            {
                method: 'PATCH',
                body: JSON.stringify({
                    activo: nuevoEstado
                })
            }
        );

        showToast(data.mensaje, 'success');

        // Actualizamos la tabla
        await cargarUsuariosAdmin();

    } catch (error) {
        console.error('Error al cambiar estado:', error);
        showToast(error.message, 'error');
    }
}

const SESSION_STORAGE_KEY = 'bolkristal-session';
const TEAMS_STORAGE_KEY = 'bolkristal-teams';
const BRACKET_STORAGE_KEY = 'bolkristal-bracket-demo';
const BRACKET_BUILDER_STORAGE_KEY = 'bolkristal-bracket-builder';
const CLIENTS_STORAGE_KEY = 'bolkristal-clientes';
const TOURNAMENT_STORAGE_KEY = 'bolkristal-torneo-activo';
const MATCHUPS_STORAGE_KEY = 'bolkristal-jornada-semanal';

const BRACKET_ROUNDS = [
    { key: 'dieciseisavos', label: '16avos', matchCount: 16 },
    { key: 'octavos', label: '8avos', matchCount: 8 },
    { key: 'cuartos', label: 'Cuartos', matchCount: 4 },
    { key: 'semifinal', label: 'Semifinal', matchCount: 2 },
    { key: 'final', label: 'Final', matchCount: 1 }
];
const BOWLING_FRAME_COUNT = 10;
const MATCH_DURATION_MINUTES = 90;
const WEEKLY_SLOT_START_MINUTES = 18 * 60;

const DEFAULT_TEAMS = [
    {
        id: 1,
        nombre: 'Los Truenos',
        jugador1: 'Ana Torres',
        jugador2: 'Luis Herrera',
        nivel: 'profesional',
        precio: 200,
        puntos: 268,
        jugados: 1,
        ownerUserId: 'U-JUGADOR-1',
        createdBy: 'demo',
        createdAt: '2026-06-01T10:00:00.000Z'
    },
    {
        id: 2,
        nombre: 'Bola de Fuego',
        jugador1: 'Maria Gomez',
        jugador2: 'Pedro Diaz',
        nivel: 'principiante',
        precio: 150,
        puntos: 215,
        jugados: 1,
        ownerUserId: null,
        createdBy: 'demo',
        createdAt: '2026-06-02T10:00:00.000Z'
    }
];

const DEFAULT_CLIENTS = [
    { id: 'C001', nombre: 'Ana Torres', email: 'ana@gmail.com', tel: '449-111-2233', cumple: '14 de Mayo', visitasBillar: 8, torneosJugados: 1, compras: '$3,200 MXN', preferido: 'Boliche', promoUsadas: 2 },
    { id: 'C002', nombre: 'Luis Herrera', email: 'luis@gmail.com', tel: '449-444-5566', cumple: '03 de Junio', visitasBillar: 6, torneosJugados: 1, compras: '$2,980 MXN', preferido: 'Billar', promoUsadas: 1 },
    { id: 'C003', nombre: 'Maria Gomez', email: 'maria@gmail.com', tel: '449-777-8899', cumple: '28 de Mayo', visitasBillar: 17, torneosJugados: 1, compras: '$2,150 MXN', preferido: 'Billar', promoUsadas: 3 },
    { id: 'C004', nombre: 'Pedro Diaz', email: 'pedro@gmail.com', tel: '449-333-4455', cumple: '22 de Agosto', visitasBillar: 9, torneosJugados: 1, compras: '$1,840 MXN', preferido: 'Boliche', promoUsadas: 1 },
    { id: 'C005', nombre: 'Carlos Ramos', email: 'marketing@bolkristal.mx', tel: '449-765-4321', cumple: '10 de Noviembre', visitasBillar: 4, torneosJugados: 0, compras: '$890 MXN', preferido: 'Bar / Consumo', promoUsadas: 0 }
];

const AppState = {
    sessionUser: null,
    currentView: 'public-view',
    barAudio: null,
    updateJukeboxUI: () => { },
    torneos: [
        {
            id: 'T1',
            nombre: 'Torneo de Verano 2026',
            estado: 'Convocatoria abierta',
            pistas: 4,
            fechaInicio: '2026-07-01',
            fechaFin: '2026-08-31',
            criterio: 'Puntos',
            tipo: 'publico',
            cupoParejas: 32,
            inscripcionAbierta: true
        }
    ],
    bracket: null,
    bracketDraft: null,
    equipos: cloneData(DEFAULT_TEAMS),
    partidas: [
        { id: 'M1', equipoA: 'Los Truenos', equipoB: 'Bola de Fuego', pista: 1, horario: '18:00', scoreA: 268, scoreB: 215, estado: 'Completado' }
    ],
    siguienteJornadaGenerada: false,
    partidasSiguiente: [],
    clientes: cloneData(DEFAULT_CLIENTS),
    promociones: [
        { id: 'P1', titulo: '2x1 en boliche', desc: 'Paga 1 hora y juega 2 horas en pista. Promocion activa enfocada a jugadores principiantes.', vistas: 205, usos: 34, engagement: 'Activa' },
        { id: 'P2', titulo: 'Noche de equipos', desc: 'Inscribe tu dupla y recibe precio especial en bebidas para la jornada de apertura.', vistas: 145, usos: 18, engagement: 'Instagram + Facebook' },
        { id: 'P3', titulo: 'Fiesta en pista', desc: 'Decoracion, botanas y lane reservada para cumpleanos o grupos grandes.', vistas: 168, usos: 21, engagement: 'Cumpleanos' }
    ],
    jukebox: {
        playing: false,
        currentTrackIndex: 0,
        tracks: [
            { title: 'Retro Synthwave Night', artist: 'Arcade Neon', genre: 'Synthwave', duration: '3:45', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
            { title: 'Classic Rock Bar Anthems', artist: 'The Bowling Pins', genre: 'Classic Rock', duration: '4:20', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
            { title: 'Late Night Billiards Blues', artist: 'Lounge Jazz Trio', genre: 'Smooth Blues', duration: '5:10', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3' }
        ]
    }
};

function getRoleMeta(role) {
    if (role === 'administrador') {
        return {
            label: 'Cuenta administrador',
            destination: 'admin',
            welcome: 'panel de administrador'
        };
    }

    if (role === 'marketing') {
        return {
            label: 'Cuenta marketing',
            destination: 'marketing',
            welcome: 'panel de marketing'
        };
    }

    return {
        label: 'Cuenta jugador',
        destination: 'cliente',
        welcome: 'vista de jugador'
    };
}

function formatTeamLevel(level) {
    return level === 'profesional' ? 'Profesional' : 'Principiante';
}

function normalizeRole(role) {
    if (role === 'admin') return 'administrador';
    if (role === 'cliente') return 'jugador';
    return role || 'jugador';
}

function cloneData(data) {
    return JSON.parse(JSON.stringify(data));
}

function escapeHtml(value) {
    return String(value ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type === 'success' ? 'success' : ''}`;

    let icon = '<i class="fas fa-info-circle" style="color: var(--neon-cyan)"></i>';
    if (type === 'success') {
        icon = '<i class="fas fa-check-circle" style="color: var(--neon-green)"></i>';
    } else if (type === 'error') {
        icon = '<i class="fas fa-exclamation-circle" style="color: var(--neon-pink)"></i>';
    }

    toast.innerHTML = `${icon}<span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(24px)';
        toast.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
        setTimeout(() => toast.remove(), 250);
    }, 3400);
}

function getActiveTournament() {
    return AppState.torneos[0] || null;
}

function saveTournamentConfig() {
    const tournament = getActiveTournament();
    if (!tournament) return;
    localStorage.setItem(TOURNAMENT_STORAGE_KEY, JSON.stringify(tournament));
}

function loadTournamentConfig() {
    const current = getActiveTournament();
    if (!current) return;

    const raw = localStorage.getItem(TOURNAMENT_STORAGE_KEY);
    if (!raw) {
        saveTournamentConfig();
        return;
    }

    try {
        const parsed = JSON.parse(raw);
        AppState.torneos[0] = {
            ...current,
            ...parsed,
            pistas: Number(parsed?.pistas) || current.pistas,
            cupoParejas: Number(parsed?.cupoParejas) || current.cupoParejas,
            inscripcionAbierta: parsed?.inscripcionAbierta !== false
        };
    } catch (error) {
        AppState.torneos[0] = { ...current };
    }

    saveTournamentConfig();
}

function loadClients() {
    const raw = localStorage.getItem(CLIENTS_STORAGE_KEY);

    if (!raw) {
        AppState.clientes = cloneData(DEFAULT_CLIENTS);
        localStorage.setItem(CLIENTS_STORAGE_KEY, JSON.stringify(AppState.clientes));
        return;
    }

    try {
        const parsed = JSON.parse(raw);
        AppState.clientes = Array.isArray(parsed) ? parsed : cloneData(DEFAULT_CLIENTS);
    } catch (error) {
        AppState.clientes = cloneData(DEFAULT_CLIENTS);
    }

    localStorage.setItem(CLIENTS_STORAGE_KEY, JSON.stringify(AppState.clientes));
}

function saveClients() {
    localStorage.setItem(CLIENTS_STORAGE_KEY, JSON.stringify(AppState.clientes));
}

function loadWeeklyMatchups() {
    const raw = localStorage.getItem(MATCHUPS_STORAGE_KEY);

    if (!raw) {
        AppState.siguienteJornadaGenerada = false;
        AppState.partidasSiguiente = [];
        return;
    }

    try {
        const parsed = JSON.parse(raw);
        AppState.siguienteJornadaGenerada = Boolean(parsed?.siguienteJornadaGenerada);
        AppState.partidasSiguiente = Array.isArray(parsed?.partidasSiguiente)
            ? parsed.partidasSiguiente.map((match, index) => ({
                id: match?.id || `N${index + 1}`,
                equipoA: String(match?.equipoA || '').trim(),
                equipoB: String(match?.equipoB || '').trim(),
                equipoAId: Number(match?.equipoAId) || null,
                equipoBId: Number(match?.equipoBId) || null,
                fecha: match?.fecha || null,
                fase: String(match?.fase || 'Jornada general').trim(),
                pista: Number(match?.pista) || 1,
                horario: String(match?.horario || '19:00').trim(),
                horaFin: String(match?.horaFin || '').trim() || null,
                duracionMinutos: Number(match?.duracionMinutos) || MATCH_DURATION_MINUTES,
                scoreA: Number(match?.scoreA) || 0,
                scoreB: Number(match?.scoreB) || 0,
                estado: match?.estado === 'Completado' ? 'Completado' : 'Pendiente'
            }))
            : [];
    } catch (error) {
        AppState.siguienteJornadaGenerada = false;
        AppState.partidasSiguiente = [];
    }
}

function saveWeeklyMatchups() {
    localStorage.setItem(MATCHUPS_STORAGE_KEY, JSON.stringify({
        siguienteJornadaGenerada: AppState.siguienteJornadaGenerada,
        partidasSiguiente: AppState.partidasSiguiente
    }));
}

function normalizeName(value) {
    return String(value || '')
        .trim()
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/\s+/g, ' ');
}

function getRegistrationPrice(level) {
    return level === 'profesional' ? 200 : 150;
}

function getTournamentCapacity() {
    return Number(getActiveTournament()?.cupoParejas) || 32;
}

function parseTournamentDate(value) {
    if (!value) return null;
    const parsed = new Date(`${value}T12:00:00`);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function addDays(date, days) {
    const next = new Date(date);
    next.setDate(next.getDate() + days);
    return next;
}

function addMinutes(date, minutes) {
    const next = new Date(date);
    next.setMinutes(next.getMinutes() + minutes);
    return next;
}

function formatTimeLabel(value) {
    if (!value && value !== 0) return 'Pendiente';

    try {
        if (typeof value === 'number') {
            const totalMinutes = Math.max(0, Math.round(value));
            const hours = Math.floor(totalMinutes / 60) % 24;
            const minutes = totalMinutes % 60;
            return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
        }

        const date = new Date(value);
        return new Intl.DateTimeFormat('es-MX', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        }).format(date);
    } catch (error) {
        return 'Pendiente';
    }
}

function formatTournamentDate(value, options = {}) {
    if (!value) return 'Pendiente';

    try {
        return new Intl.DateTimeFormat('es-MX', {
            weekday: options.includeWeekday ? 'short' : undefined,
            day: '2-digit',
            month: 'short',
            year: options.includeYear === false ? undefined : 'numeric'
        }).format(new Date(value));
    } catch (error) {
        return 'Pendiente';
    }
}

function getBracketScheduleBaseDate() {
    const tournament = getActiveTournament();
    const tournamentStart = parseTournamentDate(tournament?.fechaInicio);
    if (!tournamentStart) return new Date('2026-07-08T12:00:00');
    return addDays(tournamentStart, 7);
}

function getRoundScheduleMap() {
    const rounds = AppState.bracket ? getManagedBracketRounds() : BRACKET_ROUNDS;
    const baseDate = getBracketScheduleBaseDate();

    return rounds.reduce((schedule, round, index) => {
        schedule[round.key] = addDays(baseDate, index * 7).toISOString();
        return schedule;
    }, {});
}

function getRoundScheduledDate(roundKey) {
    const schedule = getRoundScheduleMap();
    return schedule[roundKey] || getBracketScheduleBaseDate().toISOString();
}

function getBracketMatchSchedule(roundKey, matchIndex = 0) {
    const pistasDisponibles = Math.max(1, Number(getActiveTournament()?.pistas) || 1);
    const safeIndex = Math.max(0, Number(matchIndex) || 0);
    const slotIndex = Math.floor(safeIndex / pistasDisponibles);
    const startMinutes = WEEKLY_SLOT_START_MINUTES + (slotIndex * MATCH_DURATION_MINUTES);
    const endMinutes = startMinutes + MATCH_DURATION_MINUTES;

    return {
        fecha: getRoundScheduledDate(roundKey),
        pista: (safeIndex % pistasDisponibles) + 1,
        horario: formatTimeLabel(startMinutes),
        horaFin: formatTimeLabel(endMinutes),
        duracionMinutos: MATCH_DURATION_MINUTES
    };
}

function getDefaultRoundForCurrentTeams() {
    return getBracketRoundMeta(getAutoStartRound(Math.max(getRegisteredTeamCount(), 2))) || BRACKET_ROUNDS[0];
}

function getRegisteredTeamCount() {
    return AppState.equipos.length;
}

function getRemainingSlots() {
    return Math.max(0, getTournamentCapacity() - getRegisteredTeamCount());
}

function isRegistrationOpen() {
    const tournament = getActiveTournament();
    return Boolean(tournament?.inscripcionAbierta) && getRemainingSlots() > 0;
}

function getTournamentStatusLabel() {
    const tournament = getActiveTournament();
    if (!tournament?.inscripcionAbierta) return 'Inscripciones cerradas';
    if (getRemainingSlots() === 0) return 'Cupo completo';
    return 'Convocatoria abierta';
}

function getTournamentStatusBadgeClass() {
    const tournament = getActiveTournament();
    if (!tournament?.inscripcionAbierta) return 'neon-badge-pink';
    if (getRemainingSlots() === 0) return 'neon-badge-yellow';
    return 'neon-badge-green';
}

function getUserTeam(user = AppState.sessionUser) {
    if (!user) return null;

    const normalizedUserName = normalizeName(user.name);
    return AppState.equipos.find((team) => (
        team.ownerUserId === user.id ||
        normalizeName(team.jugador1) === normalizedUserName ||
        normalizeName(team.jugador2) === normalizedUserName
    )) || null;
}

function getNextTeamId() {
    return AppState.equipos.reduce((maxId, team) => Math.max(maxId, Number(team.id) || 0), 0) + 1;
}

function findDuplicateRegistration({ teamName, player1, player2 }, ignoreId = null) {
    const teamLower = normalizeName(teamName);
    const player1Lower = normalizeName(player1);
    const player2Lower = normalizeName(player2);

    return AppState.equipos.find((equipo) => {
        if (ignoreId && equipo.id === ignoreId) return false;

        const jugador1 = normalizeName(equipo.jugador1);
        const jugador2 = normalizeName(equipo.jugador2);

        return normalizeName(equipo.nombre) === teamLower ||
            jugador1 === player1Lower ||
            jugador1 === player2Lower ||
            jugador2 === player1Lower ||
            jugador2 === player2Lower;
    }) || null;
}

function validateRegistrationPayload({ teamName, player1, player2, level, userId }) {
    if (!teamName || !player1 || !level) {
        return 'Por favor llena todos los campos obligatorios.';
    }

    if (!player2) {
        return 'Debes registrar el nombre completo de tu pareja para continuar.';
    }

    if (normalizeName(player1) === normalizeName(player2)) {
        return 'La pareja debe tener dos jugadores distintos.';
    }

    if (!['profesional', 'principiante'].includes(level)) {
        return 'Selecciona un nivel valido para la inscripcion.';
    }

    if (!isRegistrationOpen()) {
        return getRemainingSlots() === 0
            ? 'El torneo ya no tiene cupos disponibles.'
            : 'La convocatoria del torneo esta cerrada por el momento.';
    }

    const duplicate = findDuplicateRegistration({ teamName, player1, player2 });
    if (duplicate) {
        return 'Ya existe un jugador o nombre de pareja registrado en este torneo.';
    }

    if (userId && getUserTeam({ id: userId, name: player1 })) {
        return 'Tu cuenta ya tiene una inscripcion activa en este torneo.';
    }

    return '';
}

function ensureClientProfile(user) {
    if (!user?.email) return null;

    const email = user.email.toLowerCase();
    let client = AppState.clientes.find((item) => item.email.toLowerCase() === email);

    if (!client) {
        client = {
            id: `C${Date.now()}`,
            nombre: user.name,
            email: user.email,
            tel: 'Pendiente',
            cumple: 'Pendiente',
            visitasBillar: 0,
            torneosJugados: 0,
            compras: '$0 MXN',
            preferido: 'Boliche',
            promoUsadas: 0
        };
        AppState.clientes.push(client);
    } else {
        client.nombre = user.name;
        client.email = user.email;
    }

    saveClients();
    return client;
}

function registerTournamentParticipation(user) {
    const client = ensureClientProfile(user);
    if (!client) return;

    client.preferido = 'Boliche';
    client.torneosJugados += 1;
    saveClients();
}

function invalidateWeeklySchedule() {
    AppState.siguienteJornadaGenerada = false;
    AppState.partidasSiguiente = [];
    saveWeeklyMatchups();

    const generateButton = document.getElementById('btn-generar-roles');
    if (generateButton) generateButton.removeAttribute('disabled');
}

function clearSession() {
    AppState.sessionUser = null;
    localStorage.removeItem(SESSION_STORAGE_KEY);
}

function updateSessionLabels(user) {
    const safeUser = user || { name: 'Invitado', email: '', role: 'jugador' };
    const roleMeta = getRoleMeta(safeUser.role);

    const clientName = document.getElementById('client-user-name');
    const clientWelcome = document.getElementById('client-welcome-title');
    const clientRole = document.getElementById('client-user-role-label');
    const clientRegistrationPlayer = document.getElementById('client-player-name');
    const adminName = document.getElementById('admin-user-name');
    const adminEmail = document.getElementById('admin-user-email');

    if (clientName) clientName.textContent = safeUser.name;
    if (clientWelcome) clientWelcome.textContent = `Hola, ${safeUser.name}`;
    if (clientRole) clientRole.textContent = roleMeta.label;
    if (clientRegistrationPlayer) clientRegistrationPlayer.value = safeUser.name;
    if (adminName) adminName.textContent = safeUser.name;
    if (adminEmail) adminEmail.textContent = safeUser.email || 'admin@bolkristal.mx';
}

async function loadTeams() {
    try {
        // Obtener los equipos desde PostgreSQL
        const data = await apiRequest('/equipos');

        // Convertir los datos al formato del frontend
        AppState.equipos = mergeTeamsWithDefaults(
            data.equipos.map(equipo => ({
                id: equipo.id_equipo,
                nombre: equipo.nombre,
                jugador1: equipo.jugador1,
                jugador2: equipo.jugador2,
                nivel: equipo.nivel,
                precio: Number(equipo.precio),
                puntos: equipo.puntos,
                jugados: equipo.jugados,
                ownerUserId: equipo.id_usuario,
                createdBy: equipo.creado_por,
                createdAt: equipo.fecha_creacion
            }))
        );

    } catch (error) {
        console.error('Error al cargar equipos:', error);
        showToast('No se pudieron cargar los equipos.', 'error');
    }
}

function saveTeams() {
    localStorage.setItem(TEAMS_STORAGE_KEY, JSON.stringify(AppState.equipos));
}

function mergeTeamsWithDefaults(teams) {
    return teams.map((team, index) => ({
        id: Number(team.id) || index + 1,
        nombre: String(team.nombre || '').trim(),
        jugador1: String(team.jugador1 || '').trim(),
        jugador2: String(team.jugador2 || '').trim(),
        nivel: team.nivel === 'profesional' ? 'profesional' : 'principiante',
        precio: Number(team.precio) || (team.nivel === 'profesional' ? 200 : 150),
        puntos: Number(team.puntos) || 0,
        jugados: Number(team.jugados) || 0,
        ownerUserId: team.ownerUserId || null,
        createdBy: team.createdBy || 'admin',
        createdAt: team.createdAt || new Date().toISOString()
    })).filter((team) => team.nombre && team.jugador1 && team.jugador2)
        .sort((teamA, teamB) => teamA.id - teamB.id);
}

function getTeamById(teamId) {
    return AppState.equipos.find((team) => team.id === teamId) || null;
}

function getRoundSlotCapacity(roundKey) {
    const meta = getBracketRoundMeta(roundKey);
    return meta ? meta.matchCount * 2 : 0;
}

function getAutoStartRound(teamCount) {
    if (teamCount <= 2) return 'final';
    if (teamCount <= 4) return 'semifinal';
    if (teamCount <= 8) return 'cuartos';
    if (teamCount <= 16) return 'octavos';
    return 'dieciseisavos';
}

function getDefaultBracketBuilderState() {
    const selectedTeamIds = AppState.equipos
        .slice(0, getRoundSlotCapacity('dieciseisavos'))
        .map((team) => team.id);

    return {
        category: 'todos',
        startRound: getAutoStartRound(selectedTeamIds.length || 2),
        selectedTeamIds
    };
}

function normalizeBracketBuilderState(state, options = {}) {
    const validIds = new Set(AppState.equipos.map((team) => team.id));
    const defaultState = options.useDefaultSelection
        ? getDefaultBracketBuilderState()
        : { category: 'todos', startRound: 'dieciseisavos', selectedTeamIds: [] };
    const category = ['todos', 'profesional', 'principiante'].includes(state?.category)
        ? state.category
        : defaultState.category;
    const startRound = BRACKET_ROUNDS.some((round) => round.key === state?.startRound)
        ? state.startRound
        : defaultState.startRound;
    const selectedTeamIds = Array.isArray(state?.selectedTeamIds)
        ? [...new Set(state.selectedTeamIds.map((id) => Number(id)).filter((id) => validIds.has(id)))]
        : [...defaultState.selectedTeamIds];

    return {
        category,
        startRound,
        selectedTeamIds
    };
}

function loadBracketDraft() {
    const raw = localStorage.getItem(BRACKET_BUILDER_STORAGE_KEY);

    if (!raw) {
        AppState.bracketDraft = getDefaultBracketBuilderState();
        localStorage.setItem(BRACKET_BUILDER_STORAGE_KEY, JSON.stringify(AppState.bracketDraft));
        return;
    }

    try {
        AppState.bracketDraft = normalizeBracketBuilderState(JSON.parse(raw));
    } catch (error) {
        AppState.bracketDraft = getDefaultBracketBuilderState();
    }

    localStorage.setItem(BRACKET_BUILDER_STORAGE_KEY, JSON.stringify(AppState.bracketDraft));
}

function saveBracketDraft() {
    if (!AppState.bracketDraft) return;
    localStorage.setItem(BRACKET_BUILDER_STORAGE_KEY, JSON.stringify(AppState.bracketDraft));
}

function createEmptyBracketRounds() {
    const rounds = {};

    BRACKET_ROUNDS.forEach((round) => {
        rounds[round.key] = Array.from({ length: round.matchCount }, (_, index) => createEmptyBracketMatch(`${round.key}-${index + 1}`));
    });

    return rounds;
}

function createEmptyScoreFrames() {
    return Array.from({ length: BOWLING_FRAME_COUNT }, () => ({
        r1: null,
        r2: null,
        r3: null
    }));
}

function createEmptyBracketMatch(id) {
    return {
        id,
        participantAId: null,
        participantBId: null,
        winnerId: null,
        scoreFramesA: createEmptyScoreFrames(),
        scoreFramesB: createEmptyScoreFrames(),
        totalA: null,
        totalB: null
    };
}

function cloneScoreFrames(frames) {
    return frames.map((frame) => ({
        r1: frame.r1 ?? null,
        r2: frame.r2 ?? null,
        r3: frame.r3 ?? null
    }));
}

function resetMatchScore(match) {
    match.scoreFramesA = createEmptyScoreFrames();
    match.scoreFramesB = createEmptyScoreFrames();
    match.totalA = null;
    match.totalB = null;
}

function normalizeBracketMatch(match, fallbackId) {
    const normalizedMatch = {
        id: match?.id || fallbackId,
        participantAId: match?.participantAId || null,
        participantBId: match?.participantBId || null,
        winnerId: match?.winnerId || null,
        scoreFramesA: createEmptyScoreFrames(),
        scoreFramesB: createEmptyScoreFrames(),
        totalA: Number.isFinite(match?.totalA) ? match.totalA : null,
        totalB: Number.isFinite(match?.totalB) ? match.totalB : null
    };

    if (Array.isArray(match?.scoreFramesA)) {
        normalizedMatch.scoreFramesA = createEmptyScoreFrames().map((frame, index) => ({
            ...frame,
            ...(match.scoreFramesA[index] || {})
        }));
    }

    if (Array.isArray(match?.scoreFramesB)) {
        normalizedMatch.scoreFramesB = createEmptyScoreFrames().map((frame, index) => ({
            ...frame,
            ...(match.scoreFramesB[index] || {})
        }));
    }

    return normalizedMatch;
}

function createEmptyBracketState(config = {}) {
    return {
        participants: [],
        rounds: createEmptyBracketRounds(),
        championId: null,
        config: {
            category: config.category || 'todos',
            startRound: config.startRound || 'dieciseisavos',
            sourceTeamIds: [...(config.sourceTeamIds || [])]
        },
        updatedAt: new Date().toISOString()
    };
}

function buildBracketParticipant(team, seed) {
    return {
        id: `team-${team.id}`,
        teamId: team.id,
        seed,
        nombre: team.nombre,
        integrantes: `${team.jugador1} & ${team.jugador2}`,
        nivel: team.nivel
    };
}

function shuffleArray(items) {
    const cloned = [...items];

    for (let index = cloned.length - 1; index > 0; index -= 1) {
        const swapIndex = Math.floor(Math.random() * (index + 1));
        [cloned[index], cloned[swapIndex]] = [cloned[swapIndex], cloned[index]];
    }

    return cloned;
}

function matchHasEntrants(match) {
    return Boolean(match?.participantAId || match?.participantBId);
}

function getRequiredParticipantsForTournament(state = AppState.bracket) {
    const startRound = state?.config?.startRound || 'dieciseisavos';
    return getRoundSlotCapacity(startRound);
}

function getMissingParticipantsCount(state = AppState.bracket) {
    const required = getRequiredParticipantsForTournament(state);
    const current = Number(state?.participants?.length || 0);
    return Math.max(0, required - current);
}

function hasEnoughParticipantsForTournament(state = AppState.bracket) {
    const required = getRequiredParticipantsForTournament(state);
    return Number(state?.participants?.length || 0) === required;
}

function parseRollValue(value) {
    if (value === '' || value === null || value === undefined) return null;
    const parsed = Number.parseInt(String(value), 10);
    return Number.isNaN(parsed) ? null : parsed;
}

function buildRollSequenceFromFrames(frames) {
    const rolls = [];

    frames.forEach((frame, index) => {
        const first = frame.r1 ?? 0;
        const second = frame.r2 ?? 0;
        const third = frame.r3 ?? null;

        if (index < 9) {
            if (first === 10) {
                rolls.push(10);
            } else {
                rolls.push(first, second);
            }
            return;
        }

        rolls.push(first, second);
        if (third !== null) {
            rolls.push(third);
        }
    });

    return rolls;
}

function validateBowlingFrames(frames) {
    for (let frameIndex = 0; frameIndex < BOWLING_FRAME_COUNT; frameIndex += 1) {
        const frame = frames[frameIndex];
        const frameLabel = `Frame ${frameIndex + 1}`;
        const first = parseRollValue(frame.r1);
        const second = parseRollValue(frame.r2);
        const third = parseRollValue(frame.r3);

        if (first === null || first < 0 || first > 10) {
            return { valid: false, message: `${frameLabel}: captura la primera tirada entre 0 y 10.` };
        }

        if (frameIndex < 9) {
            if (first === 10) {
                if (second !== null && second !== 0) {
                    return { valid: false, message: `${frameLabel}: en un strike la segunda tirada debe quedar vacia o en 0.` };
                }
                continue;
            }

            if (second === null || second < 0 || second > 10) {
                return { valid: false, message: `${frameLabel}: captura la segunda tirada entre 0 y 10.` };
            }

            if (first + second > 10) {
                return { valid: false, message: `${frameLabel}: la suma de las dos tiradas no puede pasar de 10.` };
            }
            continue;
        }

        if (second === null || second < 0 || second > 10) {
            return { valid: false, message: `${frameLabel}: captura la segunda tirada entre 0 y 10.` };
        }

        if (first === 10) {
            if (third === null || third < 0 || third > 10) {
                return { valid: false, message: `${frameLabel}: captura la tirada de bonificacion.` };
            }

            if (second < 10 && second + third > 10) {
                return { valid: false, message: `${frameLabel}: en el decimo frame la bonificacion no puede pasar de 10 si no hubo doble strike.` };
            }
            continue;
        }

        if (first + second > 10) {
            return { valid: false, message: `${frameLabel}: la suma de las dos tiradas no puede pasar de 10.` };
        }

        if (first + second === 10) {
            if (third === null || third < 0 || third > 10) {
                return { valid: false, message: `${frameLabel}: captura la tirada de bonificacion del spare.` };
            }
            continue;
        }

        if (third !== null && third !== 0) {
            return { valid: false, message: `${frameLabel}: no debe haber tercera tirada si no hubo strike o spare.` };
        }
    }

    return { valid: true };
}

function calculateBowlingScoreFromFrames(frames) {
    const validation = validateBowlingFrames(frames);
    if (!validation.valid) {
        return { valid: false, message: validation.message };
    }

    const rolls = buildRollSequenceFromFrames(frames);
    let rollIndex = 0;
    let total = 0;

    for (let frameIndex = 0; frameIndex < 9; frameIndex += 1) {
        if (rolls[rollIndex] === 10) {
            total += 10 + (rolls[rollIndex + 1] || 0) + (rolls[rollIndex + 2] || 0);
            rollIndex += 1;
            continue;
        }

        const framePins = (rolls[rollIndex] || 0) + (rolls[rollIndex + 1] || 0);
        if (framePins === 10) {
            total += 10 + (rolls[rollIndex + 2] || 0);
        } else {
            total += framePins;
        }
        rollIndex += 2;
    }

    total += (rolls[rollIndex] || 0) + (rolls[rollIndex + 1] || 0) + (rolls[rollIndex + 2] || 0);
    return { valid: true, total };
}

function recalculateBracketTree(bracketState) {
    const startIndex = BRACKET_ROUNDS.findIndex((round) => round.key === bracketState.config.startRound);
    if (startIndex < 0) return;

    for (let roundIndex = 0; roundIndex < BRACKET_ROUNDS.length; roundIndex += 1) {
        const roundKey = BRACKET_ROUNDS[roundIndex].key;
        const prevRoundKey = BRACKET_ROUNDS[roundIndex - 1]?.key || null;
        const currentMatches = bracketState.rounds[roundKey];

        currentMatches.forEach((match, matchIndex) => {
            const previousWinner = match.winnerId;
            const previousParticipantAId = match.participantAId;
            const previousParticipantBId = match.participantBId;

            if (roundIndex < startIndex) {
                match.participantAId = null;
                match.participantBId = null;
                match.winnerId = null;
                resetMatchScore(match);
                return;
            }

            if (roundIndex > startIndex && prevRoundKey) {
                const previousMatches = bracketState.rounds[prevRoundKey];
                const feederA = previousMatches[matchIndex * 2];
                const feederB = previousMatches[matchIndex * 2 + 1];

                match.participantAId = feederA?.winnerId || null;
                match.participantBId = feederB?.winnerId || null;
                match.winnerId = null;

                if (
                    previousParticipantAId !== match.participantAId ||
                    previousParticipantBId !== match.participantBId
                ) {
                    resetMatchScore(match);
                }

                if (!match.participantAId && !match.participantBId) {
                    return;
                }

                const feederAOpen = matchHasEntrants(feederA) && !feederA?.winnerId;
                const feederBOpen = matchHasEntrants(feederB) && !feederB?.winnerId;
                if (match.participantAId && match.participantBId) {
                    match.winnerId = [match.participantAId, match.participantBId].includes(previousWinner)
                        ? previousWinner
                        : null;
                    return;
                }

                if (feederAOpen || feederBOpen) {
                    return;
                }

                const canAutoResolve = (
                    (match.participantAId && !matchHasEntrants(feederB)) ||
                    (match.participantBId && !matchHasEntrants(feederA))
                );

                if (roundKey === 'final') {
                    match.winnerId = null;
                    return;
                }

                match.winnerId = canAutoResolve ? (match.participantAId || match.participantBId) : null;
                return;
            }

            const entrants = [match.participantAId, match.participantBId].filter(Boolean);
            if (
                previousParticipantAId !== match.participantAId ||
                previousParticipantBId !== match.participantBId
            ) {
                resetMatchScore(match);
            }

            if (entrants.length === 2) {
                match.winnerId = entrants.includes(previousWinner) ? previousWinner : null;
                return;
            }

            if (entrants.length !== 1) {
                match.winnerId = null;
                return;
            }

            if (roundKey === 'final') {
                match.winnerId = null;
                return;
            }

            match.winnerId = entrants[0];
        });
    }

    bracketState.championId = bracketState.rounds.final[0].winnerId || null;
}

function generateBracketFromDraft(draft) {
    const normalizedDraft = normalizeBracketBuilderState(draft);
    const slotCapacity = getRoundSlotCapacity(normalizedDraft.startRound);
    const selectedTeams = normalizedDraft.selectedTeamIds
        .map((teamId) => getTeamById(teamId))
        .filter(Boolean)
        .slice(0, slotCapacity);
    const bracketState = createEmptyBracketState({
        category: normalizedDraft.category,
        startRound: normalizedDraft.startRound,
        sourceTeamIds: selectedTeams.map((team) => team.id)
    });

    if (!selectedTeams.length) {
        return bracketState;
    }

    const participants = shuffleArray(selectedTeams).map((team, index) => buildBracketParticipant(team, index + 1));
    const randomSlots = shuffleArray(Array.from({ length: slotCapacity }, (_, index) => index));

    participants.forEach((participant, index) => {
        const slotIndex = randomSlots[index];
        const matchIndex = Math.floor(slotIndex / 2);
        const slotField = slotIndex % 2 === 0 ? 'participantAId' : 'participantBId';
        bracketState.rounds[normalizedDraft.startRound][matchIndex][slotField] = participant.id;
    });

    bracketState.participants = participants;
    recalculateBracketTree(bracketState);
    return bracketState;
}

function getDefaultBracketState() {
    return generateBracketFromDraft(AppState.bracketDraft || getDefaultBracketBuilderState());
}

function isValidBracketState(state) {
    if (!state || !Array.isArray(state.participants) || !state.rounds || !state.config) return false;
    if (!BRACKET_ROUNDS.some((round) => round.key === state.config.startRound)) return false;
    if (!['todos', 'profesional', 'principiante'].includes(state.config.category)) return false;
    if (!Array.isArray(state.config.sourceTeamIds)) return false;

    return BRACKET_ROUNDS.every((round) => (
        Array.isArray(state.rounds[round.key]) &&
        state.rounds[round.key].length === round.matchCount
    ));
}

function normalizeBracketState(state) {
    const defaultState = getDefaultBracketState();
    if (!state || typeof state !== 'object') {
        return defaultState;
    }

    const normalizedConfig = {
        category: ['todos', 'profesional', 'principiante'].includes(state.config?.category)
            ? state.config.category
            : defaultState.config.category,
        startRound: BRACKET_ROUNDS.some((round) => round.key === state.config?.startRound)
            ? state.config.startRound
            : defaultState.config.startRound,
        sourceTeamIds: Array.isArray(state.config?.sourceTeamIds)
            ? state.config.sourceTeamIds
                .map((teamId) => Number(teamId))
                .filter((teamId) => Number.isInteger(teamId) && getTeamById(teamId))
            : [...defaultState.config.sourceTeamIds]
    };

    const participants = Array.isArray(state.participants)
        ? state.participants
            .filter((participant) => participant && participant.id && participant.teamId)
            .map((participant, index) => ({
                id: participant.id,
                teamId: participant.teamId,
                seed: Number.isInteger(participant.seed) ? participant.seed : index + 1,
                nombre: participant.nombre || getTeamById(participant.teamId)?.nombre || `Pareja ${index + 1}`,
                integrantes: participant.integrantes || (() => {
                    const team = getTeamById(participant.teamId);
                    return team ? `${team.jugador1} & ${team.jugador2}` : 'Integrantes pendientes';
                })(),
                nivel: ['profesional', 'principiante'].includes(participant.nivel)
                    ? participant.nivel
                    : getTeamById(participant.teamId)?.nivel || 'principiante'
            }))
        : [...defaultState.participants];

    const validParticipantIds = new Set(participants.map((participant) => participant.id));
    const rounds = {};

    BRACKET_ROUNDS.forEach((round) => {
        const sourceMatches = Array.isArray(state.rounds?.[round.key]) ? state.rounds[round.key] : [];
        rounds[round.key] = Array.from({ length: round.matchCount }, (_, index) => {
            const fallbackId = `${round.key}-${index + 1}`;
            const match = normalizeBracketMatch(sourceMatches[index], fallbackId);

            if (!validParticipantIds.has(match.participantAId)) {
                match.participantAId = null;
            }

            if (!validParticipantIds.has(match.participantBId)) {
                match.participantBId = null;
            }

            if (!validParticipantIds.has(match.winnerId)) {
                match.winnerId = null;
            }

            return match;
        });
    });

    return {
        participants,
        rounds,
        championId: validParticipantIds.has(state.championId) ? state.championId : null,
        config: normalizedConfig,
        updatedAt: state.updatedAt || new Date().toISOString()
    };
}

function loadBracketState() {
    const raw = localStorage.getItem(BRACKET_STORAGE_KEY);

    if (!raw) {
        AppState.bracket = getDefaultBracketState();
        recalculateBracketTree(AppState.bracket);
        localStorage.setItem(BRACKET_STORAGE_KEY, JSON.stringify(AppState.bracket));
        return;
    }

    try {
        const parsed = JSON.parse(raw);
        AppState.bracket = isValidBracketState(parsed)
            ? normalizeBracketState(parsed)
            : getDefaultBracketState();
    } catch (error) {
        AppState.bracket = getDefaultBracketState();
    }

    recalculateBracketTree(AppState.bracket);
    localStorage.setItem(BRACKET_STORAGE_KEY, JSON.stringify(AppState.bracket));
}

function saveBracketState() {
    if (!AppState.bracket) return;
    AppState.bracket.updatedAt = new Date().toISOString();
    localStorage.setItem(BRACKET_STORAGE_KEY, JSON.stringify(AppState.bracket));
}

function getBracketRoundMeta(roundKey) {
    return BRACKET_ROUNDS.find((round) => round.key === roundKey) || null;
}

function getNextBracketRoundKey(roundKey) {
    const roundIndex = BRACKET_ROUNDS.findIndex((round) => round.key === roundKey);
    return roundIndex >= 0 ? BRACKET_ROUNDS[roundIndex + 1]?.key || null : null;
}

function getBracketParticipantById(participantId) {
    if (!participantId || !AppState.bracket) return null;
    return AppState.bracket.participants.find((participant) => participant.id === participantId) || null;
}

function getManagedBracketRounds() {
    const startRound = AppState.bracket?.config?.startRound || 'dieciseisavos';
    const startIndex = BRACKET_ROUNDS.findIndex((round) => round.key === startRound);
    return BRACKET_ROUNDS.slice(startIndex >= 0 ? startIndex : 0);
}

function getBracketStats() {
    let completedMatches = 0;
    let readyMatches = 0;
    let totalMatches = 0;

    getManagedBracketRounds().forEach((round) => {
        totalMatches += round.matchCount;
        AppState.bracket.rounds[round.key].forEach((match) => {
            if (match.participantAId && match.participantBId && !match.winnerId) {
                readyMatches += 1;
            }
            if (match.winnerId) {
                completedMatches += 1;
            }
        });
    });

    return {
        completedMatches,
        totalMatches,
        readyMatches
    };
}

function getActiveBracketRound() {
    for (const round of getManagedBracketRounds()) {
        const hasReadyMatch = AppState.bracket.rounds[round.key].some((match) => (
            match.participantAId && match.participantBId && !match.winnerId
        ));

        if (hasReadyMatch) {
            return round;
        }
    }

    return getManagedBracketRounds()[0] || BRACKET_ROUNDS[BRACKET_ROUNDS.length - 1];
}

function getNextPendingBracketMatch() {
    for (const round of getManagedBracketRounds()) {
        const matchIndex = AppState.bracket.rounds[round.key].findIndex((match) => (
            match.participantAId && match.participantBId && !match.winnerId
        ));

        if (matchIndex >= 0) {
            return {
                round,
                matchIndex,
                match: AppState.bracket.rounds[round.key][matchIndex]
            };
        }
    }

    return null;
}

function getFilteredBracketBuilderTeams(category = AppState.bracketDraft?.category || 'todos') {
    const teams = [...AppState.equipos].sort((teamA, teamB) => {
        if (teamA.nivel === teamB.nivel) {
            return teamA.nombre.localeCompare(teamB.nombre, 'es-MX');
        }
        return teamA.nivel === 'profesional' ? -1 : 1;
    });

    if (category === 'todos') {
        return teams;
    }

    return teams.filter((team) => team.nivel === category);
}

function syncBracketDraftWithTeams() {
    AppState.bracketDraft = normalizeBracketBuilderState(AppState.bracketDraft);
    saveBracketDraft();
}

function setBracketBuilderCategory(category) {
    const normalizedCategory = ['todos', 'profesional', 'principiante'].includes(category) ? category : 'todos';
    const filteredIds = normalizedCategory === 'todos'
        ? AppState.bracketDraft.selectedTeamIds
        : AppState.bracketDraft.selectedTeamIds.filter((teamId) => getTeamById(teamId)?.nivel === normalizedCategory);

    AppState.bracketDraft = {
        ...AppState.bracketDraft,
        category: normalizedCategory,
        selectedTeamIds: filteredIds
    };

    saveBracketDraft();
    renderTournamentBracket();
}

function setBracketBuilderStartRound(roundKey) {
    if (!BRACKET_ROUNDS.some((round) => round.key === roundKey)) return;
    const newCapacity = getRoundSlotCapacity(roundKey);

    if (AppState.bracketDraft.selectedTeamIds.length > newCapacity) {
        showToast(`Reduce la seleccion a ${newCapacity} parejas o elige una fase mas amplia.`, 'error');
        renderTournamentBracket();
        return;
    }

    AppState.bracketDraft = {
        ...AppState.bracketDraft,
        startRound: roundKey
    };

    saveBracketDraft();
    renderTournamentBracket();
}

function addTeamToBracketDraft(teamId) {
    const normalizedId = Number(teamId);
    const slotCapacity = getRoundSlotCapacity(AppState.bracketDraft.startRound);
    if (!normalizedId || AppState.bracketDraft.selectedTeamIds.includes(normalizedId)) return;
    if (!getTeamById(normalizedId)) return;

    if (AppState.bracketDraft.selectedTeamIds.length >= slotCapacity) {
        showToast(`La fase ${getBracketRoundMeta(AppState.bracketDraft.startRound).label} admite maximo ${slotCapacity} parejas.`, 'error');
        return;
    }

    AppState.bracketDraft.selectedTeamIds.push(normalizedId);
    saveBracketDraft();
    renderTournamentBracket();
}

function removeTeamFromBracketDraft(teamId) {
    const normalizedId = Number(teamId);
    AppState.bracketDraft.selectedTeamIds = AppState.bracketDraft.selectedTeamIds.filter((id) => id !== normalizedId);
    saveBracketDraft();
    renderTournamentBracket();
}

function addFilteredTeamsToBracketDraft() {
    const slotCapacity = getRoundSlotCapacity(AppState.bracketDraft.startRound);
    const selectedSet = new Set(AppState.bracketDraft.selectedTeamIds);
    const filteredIds = getFilteredBracketBuilderTeams()
        .map((team) => team.id)
        .filter((teamId) => !selectedSet.has(teamId));
    const remainingSlots = slotCapacity - AppState.bracketDraft.selectedTeamIds.length;

    if (remainingSlots <= 0) {
        showToast('Ya no hay espacio en la fase elegida.', 'error');
        return;
    }

    AppState.bracketDraft.selectedTeamIds.push(...filteredIds.slice(0, remainingSlots));
    saveBracketDraft();
    renderTournamentBracket();
}

function clearBracketDraftSelection() {
    AppState.bracketDraft.selectedTeamIds = [];
    saveBracketDraft();
    renderTournamentBracket();
}

function buildBracketTeamListItem(team, action) {
    return `
        <div class="bracket-team-picker-item">
            <div class="bracket-team-picker-copy">
                <strong>${escapeHtml(team.nombre)}</strong>
                <small>${escapeHtml(team.jugador1)} & ${escapeHtml(team.jugador2)}</small>
            </div>
            <button
                type="button"
                class="btn-neon ${action === 'add' ? 'btn-neon-cyan' : 'btn-neon-pink'} bracket-team-picker-btn"
                data-bracket-action="${action}"
                data-team-id="${team.id}"
            >
                <i class="fas ${action === 'add' ? 'fa-plus' : 'fa-times'}"></i>
                ${action === 'add' ? 'Agregar' : 'Quitar'}
            </button>
        </div>
    `;
}

function generateBracketFromCurrentDraft() {
    const slotCapacity = getRoundSlotCapacity(AppState.bracketDraft.startRound);
    const selectedCount = AppState.bracketDraft.selectedTeamIds.length;

    if (selectedCount !== slotCapacity) {
        const missingTeams = Math.max(0, slotCapacity - selectedCount);
        const roundLabel = getBracketRoundMeta(AppState.bracketDraft.startRound)?.label || 'fase elegida';
        showToast(
            missingTeams > 0
                ? `Faltan ${missingTeams} parejas para iniciar en ${roundLabel}.`
                : `La fase ${roundLabel} solo permite ${slotCapacity} parejas.`,
            'error'
        );
        return;
    }

    AppState.bracket = generateBracketFromDraft(AppState.bracketDraft);
    saveBracketState();
    renderTournamentBracket();
    showToast('Cuadro sorteado y generado correctamente.', 'success');
}

function clearBracketDescendants(roundKey, matchIndex) {
    const roundMatches = AppState.bracket?.rounds?.[roundKey];
    const match = roundMatches?.[matchIndex];
    if (!match) return;

    match.winnerId = null;

    const nextRoundKey = getNextBracketRoundKey(roundKey);
    if (!nextRoundKey) {
        AppState.bracket.championId = null;
        return;
    }

    const nextMatchIndex = Math.floor(matchIndex / 2);
    const slotField = matchIndex % 2 === 0 ? 'participantAId' : 'participantBId';
    const nextMatch = AppState.bracket.rounds[nextRoundKey][nextMatchIndex];

    if (nextMatch) {
        nextMatch[slotField] = null;
        clearBracketDescendants(nextRoundKey, nextMatchIndex);
    }
}

function renderBracketProgress(progressContainerId, statusBadgeId) {
    const progressContainer = document.getElementById(progressContainerId);
    const statusBadge = document.getElementById(statusBadgeId);
    if (!progressContainer || !statusBadge || !AppState.bracket) return;

    if (!hasEnoughParticipantsForTournament()) {
        const missingTeams = getMissingParticipantsCount();
        statusBadge.className = 'badge neon-badge-pink';
        statusBadge.innerHTML = '<i class="fas fa-user-clock"></i> En espera';
        progressContainer.innerHTML = `
            <div class="tournament-progress-stage is-pending">
                <span>Estado</span>
                <strong>Faltan ${missingTeams}</strong>
            </div>
        `;
        return;
    }

    const champion = getBracketParticipantById(AppState.bracket.championId);
    const activeRound = getActiveBracketRound();
    const managedRounds = getManagedBracketRounds();

    statusBadge.className = `badge ${champion ? 'neon-badge-green' : 'neon-badge-yellow'}`;
    statusBadge.innerHTML = champion
        ? '<i class="fas fa-crown"></i> Cuadro cerrado'
        : `<i class="fas fa-bolt"></i> Etapa activa: ${activeRound.label}`;

    progressContainer.innerHTML = managedRounds.map((round) => {
        const completed = AppState.bracket.rounds[round.key].filter((match) => match.winnerId).length;
        const isActive = !champion && activeRound.key === round.key;
        const isComplete = completed === round.matchCount;

        return `
            <div class="tournament-progress-stage ${isComplete ? 'is-complete' : ''} ${isActive ? 'is-active' : ''}">
                <span>${round.label}</span>
                <strong>${completed}/${round.matchCount}</strong>
            </div>
        `;
    }).join('');
}

function renderBracketSlot(roundKey, matchIndex, options = {}) {
    const { showMembers = true, compact = false } = options;
    const match = AppState.bracket.rounds[roundKey][matchIndex];
    const participantA = getBracketParticipantById(match.participantAId);
    const participantB = getBracketParticipantById(match.participantBId);
    const hasPlayableMatch = participantA && participantB;

    const renderParticipant = (participant) => {
        if (!participant) {
            return `
                <div class="bracket-team-placeholder">
                    <span class="bracket-team-seed">--</span>
                    <span class="bracket-team-copy bracket-team-copy-empty"></span>
                </div>
            `;
        }

        return `
            <button
                type="button"
                class="bracket-team-btn ${match.winnerId === participant.id ? 'winner' : ''}"
                data-round="${roundKey}"
                data-match-index="${matchIndex}"
                data-participant-id="${participant.id}"
                ${hasPlayableMatch ? '' : 'disabled'}
            >
                <span class="bracket-team-seed">#${participant.seed}</span>
                <span class="bracket-team-copy">
                    <strong>${escapeHtml(participant.nombre)}</strong>
                    ${showMembers ? `<small>${escapeHtml(participant.integrantes)}</small>` : ''}
                </span>
            </button>
        `;
    };

    return `
        <article class="bracket-match-card ${match.winnerId ? 'is-complete' : ''} ${compact ? 'is-compact-card' : ''} round-${roundKey}-card">
            ${renderParticipant(participantA)}
            ${renderParticipant(participantB)}
        </article>
    `;
}

function getMirrorBracketHtml(isCompact = false) {
    const startRound = AppState.bracket?.config?.startRound || 'dieciseisavos';
    const columnMap = {
        dieciseisavos: [
            { roundKey: 'dieciseisavos', label: '16avos', matches: [0, 1, 2, 3, 4, 5, 6, 7], side: 'left' },
            { roundKey: 'octavos', label: '8avos', matches: [0, 1, 2, 3], side: 'left' },
            { roundKey: 'cuartos', label: 'Cuartos', matches: [0, 1], side: 'left' },
            { roundKey: 'semifinal', label: 'Semi', matches: [0], side: 'left' },
            { roundKey: 'final', label: 'Final', matches: [0], side: 'center' },
            { roundKey: 'semifinal', label: 'Semi', matches: [1], side: 'right' },
            { roundKey: 'cuartos', label: 'Cuartos', matches: [2, 3], side: 'right' },
            { roundKey: 'octavos', label: '8avos', matches: [4, 5, 6, 7], side: 'right' },
            { roundKey: 'dieciseisavos', label: '16avos', matches: [8, 9, 10, 11, 12, 13, 14, 15], side: 'right' }
        ],
        octavos: [
            { roundKey: 'octavos', label: '8avos', matches: [0, 1, 2, 3], side: 'left' },
            { roundKey: 'cuartos', label: 'Cuartos', matches: [0, 1], side: 'left' },
            { roundKey: 'semifinal', label: 'Semi', matches: [0], side: 'left' },
            { roundKey: 'final', label: 'Final', matches: [0], side: 'center' },
            { roundKey: 'semifinal', label: 'Semi', matches: [1], side: 'right' },
            { roundKey: 'cuartos', label: 'Cuartos', matches: [2, 3], side: 'right' },
            { roundKey: 'octavos', label: '8avos', matches: [4, 5, 6, 7], side: 'right' }
        ],
        cuartos: [
            { roundKey: 'cuartos', label: 'Cuartos', matches: [0, 1], side: 'left' },
            { roundKey: 'semifinal', label: 'Semi', matches: [0], side: 'left' },
            { roundKey: 'final', label: 'Final', matches: [0], side: 'center' },
            { roundKey: 'semifinal', label: 'Semi', matches: [1], side: 'right' },
            { roundKey: 'cuartos', label: 'Cuartos', matches: [2, 3], side: 'right' }
        ],
        semifinal: [
            { roundKey: 'semifinal', label: 'Semi', matches: [0], side: 'left' },
            { roundKey: 'final', label: 'Final', matches: [0], side: 'center' },
            { roundKey: 'semifinal', label: 'Semi', matches: [1], side: 'right' }
        ],
        final: [
            { roundKey: 'final', label: 'Final', matches: [0], side: 'center' }
        ]
    };
    const columns = columnMap[startRound] || columnMap.dieciseisavos;

    return `
        <div class="tournament-bracket-mirror ${isCompact ? 'is-compact' : 'is-modal'} cols-${columns.length}">
            ${columns.map((column) => `
                <section class="bracket-mirror-column stage-${column.roundKey} side-${column.side} count-${column.matches.length}">
                    <div class="bracket-mirror-heading">
                        <span>${column.label}</span>
                    </div>
                    <div class="bracket-mirror-stack ${column.roundKey === 'final' ? 'final-stack' : ''}">
                        ${column.roundKey === 'final' && AppState.bracket.rounds.final[0].winnerId ? `
                            <div class="bracket-column-trophy ${isCompact ? 'compact' : 'modal'}">
                                <img src="images/champion-pin-crown.png" alt="Pino de boliche con corona" class="bracket-final-trophy-image">
                            </div>
                        ` : ''}
                        ${column.matches.map((matchIndex) => renderBracketSlot(
        column.roundKey,
        matchIndex,
        { showMembers: false, compact: isCompact }
    )).join('')}
                    </div>
                </section>
            `).join('')}
        </div>
    `;
}

function getBracketWaitingMessage(state = AppState.bracket) {
    const missingTeams = getMissingParticipantsCount(state);
    const roundLabel = getBracketRoundMeta(state?.config?.startRound || 'dieciseisavos')?.label || 'fase elegida';

    return `
        <div class="bracket-empty-state">
            <i class="fas fa-users-slash"></i>
            <h4>No hay suficientes jugadores para empezar el torneo.</h4>
            <p>Faltan ${missingTeams} parejas para completar ${roundLabel} y generar la eliminatoria.</p>
        </div>
    `;
}

function getScoreInputHtml(teamKey, frameIndex, rollKey, value, max = 10) {
    const displayValue = value ?? '';
    return `
        <input
            type="number"
            min="0"
            max="${max}"
            step="1"
            class="score-roll-input"
            data-score-team="${teamKey}"
            data-frame-index="${frameIndex}"
            data-roll-key="${rollKey}"
            value="${displayValue}"
        >
    `;
}

function shouldShowTenthBonusInput(frame) {
    const first = parseRollValue(frame?.r1);
    const second = parseRollValue(frame?.r2);

    if (first === 10) {
        return true;
    }

    if (first === null || second === null) {
        return false;
    }

    return first + second === 10;
}

function isBowlingFrameComplete(frameIndex, frame) {
    const first = parseRollValue(frame?.r1);
    const second = parseRollValue(frame?.r2);
    const third = parseRollValue(frame?.r3);

    if (first === null) {
        return false;
    }

    if (frameIndex < 9) {
        if (first === 10) {
            return true;
        }

        return second !== null && first + second <= 10;
    }

    if (second === null) {
        return false;
    }

    if (first === 10) {
        if (third === null) {
            return false;
        }

        return second === 10 || second + third <= 10;
    }

    if (first + second > 10) {
        return false;
    }

    if (first + second === 10) {
        return third !== null;
    }

    return true;
}

function clampScoreInputValue(input, max = 10) {
    const parsed = parseRollValue(input.value);
    if (parsed === null) return;

    const clamped = Math.max(0, Math.min(max, parsed));
    if (clamped !== parsed) {
        input.value = String(clamped);
    }
}

function getCurrentMatchScorecardHtml(teamKey, participant, frames) {
    const safeFrames = Array.isArray(frames) && frames.length === BOWLING_FRAME_COUNT
        ? frames
        : createEmptyScoreFrames();

    return `
        <div class="current-match-scoreboard">
            <div class="current-match-scoreboard-head">
                <div>
                    <h5>${escapeHtml(participant.nombre)}</h5>
                    <p>${escapeHtml(participant.integrantes)}</p>
                </div>
                <span class="badge ${participant.nivel === 'profesional' ? 'neon-badge-pink' : 'neon-badge-cyan'}">${formatTeamLevel(participant.nivel)}</span>
            </div>
            <div class="score-frames-grid">
                ${safeFrames.map((frame, frameIndex) => `
                    <div class="score-frame-card ${frameIndex === 9 ? `is-tenth ${shouldShowTenthBonusInput(frame) ? 'has-bonus-roll' : ''}` : ''}">
                        <span class="score-frame-label">${frameIndex + 1}</span>
                        <div class="score-frame-rolls">
                            ${getScoreInputHtml(teamKey, frameIndex, 'r1', frame.r1)}
                            ${getScoreInputHtml(teamKey, frameIndex, 'r2', frame.r2)}
                            ${frameIndex === 9 ? `
                                <div class="score-roll-bonus-slot ${shouldShowTenthBonusInput(frame) ? 'is-visible' : ''}" data-score-bonus-slot>
                                    ${getScoreInputHtml(teamKey, frameIndex, 'r3', frame.r3)}
                                </div>
                            ` : ''}
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function getCurrentMatchCardHtml(currentMatchInfo) {
    if (!currentMatchInfo) {
        return `
            <div class="current-match-card current-match-empty">
                <span class="badge neon-badge-green"><i class="fas fa-check"></i> Sin duelo pendiente</span>
                <p>No hay un enfrentamiento actual por capturar en este momento.</p>
            </div>
        `;
    }

    const participantA = getBracketParticipantById(currentMatchInfo.match.participantAId);
    const participantB = getBracketParticipantById(currentMatchInfo.match.participantBId);
    const schedule = getBracketMatchSchedule(currentMatchInfo.round.key, currentMatchInfo.matchIndex);
    if (!participantA || !participantB) {
        return '';
    }

    return `
        <div class="current-match-card">
            <div class="card-header-flex">
                <div class="card-title-group">
                    <h3>Enfrentamiento actual</h3>
                    <p>Captura las tiradas de 10 frames por pareja y calcula el ganador automaticamente.</p>
                </div>
                <span class="badge neon-badge-yellow"><i class="fas fa-bowling-ball"></i> ${currentMatchInfo.round.label}</span>
            </div>
            <div class="current-match-versus">
                <strong>${escapeHtml(participantA.nombre)}</strong>
                <span>vs</span>
                <strong>${escapeHtml(participantB.nombre)}</strong>
            </div>
            <div class="data-grid" style="margin-top: 0; margin-bottom: 18px;">
                <span class="data-pill"><i class="far fa-calendar"></i> ${formatTournamentDate(schedule.fecha, { includeWeekday: true })}</span>
                <span class="data-pill"><i class="far fa-clock"></i> ${schedule.horario} - ${schedule.horaFin}</span>
                <span class="data-pill"><i class="fas fa-road"></i> Pista ${schedule.pista}</span>
                <span class="data-pill"><i class="fas fa-hourglass-half"></i> ${schedule.duracionMinutos} min</span>
            </div>
            <div class="current-match-scoreboards">
                ${getCurrentMatchScorecardHtml('A', participantA, currentMatchInfo.match.scoreFramesA)}
                ${getCurrentMatchScorecardHtml('B', participantB, currentMatchInfo.match.scoreFramesB)}
            </div>
            <div class="current-match-actions">
                <button type="button" class="btn-neon btn-neon-cyan" id="btn-calculate-current-match-score" data-round="${currentMatchInfo.round.key}" data-match-index="${currentMatchInfo.matchIndex}">
                    <i class="fas fa-calculator"></i> Calcular y avanzar ganador
                </button>
            </div>
        </div>
    `;
}

function renderTournamentBracket() {
    const previewContainer = document.getElementById('tournament-bracket-preview');
    const modalContainer = document.getElementById('tournament-bracket-modal');
    const adminPanel = document.getElementById('bracket-admin-panel');
    const clientContainer = document.getElementById('client-tournament-bracket');
    const hasAdminBracket = previewContainer && modalContainer && adminPanel;
    if (!hasAdminBracket && !clientContainer) return;
    if (!AppState.bracket) return;

    const enoughParticipants = hasEnoughParticipantsForTournament();

    if (hasAdminBracket) {
        renderBracketProgress('tournament-progress-strip-preview', 'bracket-status-badge-preview');
        renderBracketProgress('tournament-progress-strip-modal', 'bracket-status-badge-modal');

        previewContainer.innerHTML = enoughParticipants ? getMirrorBracketHtml(true) : getBracketWaitingMessage();
        modalContainer.innerHTML = enoughParticipants ? getMirrorBracketHtml(false) : getBracketWaitingMessage();
    }

    const clientStatusBadge = document.getElementById('client-bracket-status-badge');
    if (clientContainer) {
        renderBracketProgress('client-tournament-progress-strip', 'client-bracket-status-badge');
        clientContainer.innerHTML = enoughParticipants ? getMirrorBracketHtml(false) : getBracketWaitingMessage();
        if (clientStatusBadge) {
            clientStatusBadge.innerHTML = `<i class="fas fa-eye"></i> ${enoughParticipants ? 'Visual oficial' : 'En espera de parejas'}`;
        }
    }

    if (!hasAdminBracket) return;

    const stats = getBracketStats();
    const champion = getBracketParticipantById(AppState.bracket.championId);
    const nextPending = getNextPendingBracketMatch();
    const activeRound = getActiveBracketRound();
    const managedRounds = getManagedBracketRounds();
    const selectedTeams = AppState.bracketDraft.selectedTeamIds
        .map((teamId) => getTeamById(teamId))
        .filter(Boolean);
    const selectedIds = new Set(selectedTeams.map((team) => team.id));
    const availableTeams = getFilteredBracketBuilderTeams().filter((team) => !selectedIds.has(team.id));
    const slotCapacity = getRoundSlotCapacity(AppState.bracketDraft.startRound);
    const missingDraftTeams = Math.max(0, slotCapacity - selectedTeams.length);
    const currentCategoryLabel = AppState.bracketDraft.category === 'todos'
        ? 'Todas las categorias'
        : formatTeamLevel(AppState.bracketDraft.category);
    const currentStartLabel = getBracketRoundMeta(AppState.bracketDraft.startRound)?.label || '16avos';

    adminPanel.innerHTML = `
        <div class="bracket-admin-stats">
            <div class="bracket-admin-stat">
                <span>Partidos cerrados</span>
                <strong>${stats.completedMatches}/${stats.totalMatches}</strong>
            </div>
            <div class="bracket-admin-stat">
                <span>Etapa activa</span>
                <strong>${activeRound.label}</strong>
            </div>
            <div class="bracket-admin-stat">
                <span>Cruces listos</span>
                <strong>${stats.readyMatches}</strong>
            </div>
        </div>
        <div class="bracket-builder-card">
            <div class="bracket-builder-toolbar">
                <label class="bracket-builder-field">
                    <span>Categoria del torneo</span>
                    <select id="bracket-builder-category" class="form-input form-select">
                        <option value="todos" ${AppState.bracketDraft.category === 'todos' ? 'selected' : ''}>Todas</option>
                        <option value="profesional" ${AppState.bracketDraft.category === 'profesional' ? 'selected' : ''}>Profesional</option>
                        <option value="principiante" ${AppState.bracketDraft.category === 'principiante' ? 'selected' : ''}>Principiante</option>
                    </select>
                </label>
                <label class="bracket-builder-field">
                    <span>Fase inicial</span>
                    <select id="bracket-builder-start-round" class="form-input form-select">
                        ${BRACKET_ROUNDS.map((round) => `
                            <option value="${round.key}" ${AppState.bracketDraft.startRound === round.key ? 'selected' : ''}>${round.label}</option>
                        `).join('')}
                    </select>
                </label>
            </div>
            <div class="bracket-builder-summary">
                <span class="badge neon-badge-cyan"><i class="fas fa-layer-group"></i> ${selectedTeams.length}/${slotCapacity} parejas</span>
                <span class="badge neon-badge-pink"><i class="fas fa-filter"></i> ${currentCategoryLabel}</span>
                <span class="badge neon-badge-yellow"><i class="fas fa-play"></i> Inicio en ${currentStartLabel}</span>
            </div>
            ${missingDraftTeams > 0 ? `
                <div class="bracket-builder-alert">
                    <i class="fas fa-triangle-exclamation"></i>
                    <span>Faltan ${missingDraftTeams} parejas para poder generar el cuadro en ${currentStartLabel}.</span>
                </div>
            ` : ''}
            <div class="bracket-builder-lists">
                <div class="bracket-builder-column">
                    <div class="bracket-builder-column-title">
                        <h4>Parejas inscritas</h4>
                        <small>El admin las agrega al torneo, pero el lugar en el cuadro se sortea.</small>
                    </div>
                    <div class="bracket-builder-list">
                        ${availableTeams.length
            ? availableTeams.map((team) => buildBracketTeamListItem(team, 'add')).join('')
            : '<div class="bracket-builder-empty">No hay parejas disponibles con ese filtro.</div>'}
                    </div>
                </div>
                <div class="bracket-builder-column">
                    <div class="bracket-builder-column-title">
                        <h4>Participantes del cuadro</h4>
                        <small>La seleccion es manual; la posicion final es aleatoria.</small>
                    </div>
                    <div class="bracket-builder-list selected">
                        ${selectedTeams.length
            ? selectedTeams.map((team) => buildBracketTeamListItem(team, 'remove')).join('')
            : '<div class="bracket-builder-empty">Todavia no hay parejas agregadas al cuadro.</div>'}
                    </div>
                </div>
            </div>
            <div class="bracket-builder-actions">
                <button type="button" class="btn-neon btn-neon-cyan" id="btn-bracket-add-filtered">
                    <i class="fas fa-user-plus"></i> Agregar filtradas
                </button>
                <button type="button" class="btn-neon btn-neon-pink" id="btn-bracket-clear-selection">
                    <i class="fas fa-eraser"></i> Limpiar seleccion
                </button>
                <button type="button" class="btn-neon btn-neon-cyan" id="btn-bracket-generate">
                    <i class="fas fa-random"></i> Sortear y generar cuadro
                </button>
            </div>
        </div>
        <div class="bracket-highlight-card ${champion ? 'has-champion' : ''}">
            <span class="badge ${champion ? 'neon-badge-green' : 'neon-badge-pink'}">
                <i class="fas ${champion ? 'fa-crown' : 'fa-flag-checkered'}"></i>
                ${champion ? 'Campeon actual' : 'Siguiente duelo'}
            </span>
            ${champion ? `
                <div class="champion-trophy-wrap">
                    <img src="images/champion-pin-crown.png" alt="Pino de boliche con corona" class="champion-trophy-image">
                </div>
            ` : ''}
            <h4>${champion ? escapeHtml(champion.nombre) : escapeHtml(
                nextPending
                    ? `${getBracketParticipantById(nextPending.match.participantAId).nombre} vs ${getBracketParticipantById(nextPending.match.participantBId).nombre}`
                    : !enoughParticipants
                        ? 'No hay suficientes jugadores'
                        : selectedTeams.length
                            ? 'Cuadro listo para editar'
                            : 'Configura participantes'
            )}</h4>
            <p>${champion
            ? `${escapeHtml(champion.integrantes)} | ${formatTeamLevel(champion.nivel)}`
            : nextPending
                ? `${nextPending.round.label} listo para capturar ganador.`
                : !enoughParticipants
                    ? `No hay suficientes jugadores para empezar el torneo. Faltan ${getMissingParticipantsCount()} parejas para ${getBracketRoundMeta(AppState.bracket.config.startRound)?.label || 'la fase elegida'}.`
                    : selectedTeams.length
                        ? 'Cuadro generado y listo para seguimiento desde la consola del enfrentamiento actual.'
                        : 'Selecciona parejas inscritas, define la fase inicial y genera el bracket.'}
            </p>
        </div>
        <div class="bracket-stage-list">
            ${managedRounds.map((round) => {
                            const completed = AppState.bracket.rounds[round.key].filter((match) => match.winnerId).length;
                            return `
                    <div class="bracket-stage-item">
                        <span>${round.label}</span>
                        <div class="bracket-stage-meta">
                            <strong>${completed}/${round.matchCount}</strong>
                            <small>${formatTournamentDate(getRoundScheduledDate(round.key))}</small>
                        </div>
                    </div>
                `;
                        }).join('')}
        </div>
        ${getCurrentMatchCardHtml(nextPending)}
    `;

    updateScoreboardInputFlow(adminPanel);
}

function promoteBracketWinner(roundKey, matchIndex, participantId) {
    const roundMatches = AppState.bracket?.rounds?.[roundKey];
    const match = roundMatches?.[matchIndex];
    const participant = getBracketParticipantById(participantId);
    if (!match || !participant) return;

    if (match.winnerId === participantId) {
        showToast(`${participant.nombre} ya estaba marcado como ganador.`, 'info');
        return;
    }

    if (!match.participantAId || !match.participantBId) {
        showToast('Ese cruce aun no esta completo.', 'error');
        return;
    }

    if (participantId !== match.participantAId && participantId !== match.participantBId) {
        showToast('El participante seleccionado no pertenece a ese enfrentamiento.', 'error');
        return;
    }

    const nextRoundKey = getNextBracketRoundKey(roundKey);
    match.winnerId = participantId;
    recalculateBracketTree(AppState.bracket);

    saveBracketState();
    renderTournamentBracket();
    showToast(
        nextRoundKey
            ? `${participant.nombre} avanza a ${getBracketRoundMeta(nextRoundKey).label}.`
            : `Campeon actualizado: ${participant.nombre}.`,
        'success'
    );
}

function readMatchFramesFromPanel(panel, teamKey) {
    const frames = createEmptyScoreFrames();
    const inputs = panel.querySelectorAll(`[data-score-team="${teamKey}"]`);

    inputs.forEach((input) => {
        const frameIndex = Number.parseInt(input.dataset.frameIndex || '', 10);
        const rollKey = input.dataset.rollKey;
        if (Number.isNaN(frameIndex) || !rollKey || !frames[frameIndex]) return;
        frames[frameIndex][rollKey] = parseRollValue(input.value);
    });

    return frames;
}

function updateTenthFrameBonusVisibility(scope = document) {
    const tenthFrameCards = scope.querySelectorAll('.score-frame-card.is-tenth');

    tenthFrameCards.forEach((frameCard) => {
        const firstInput = frameCard.querySelector('[data-roll-key="r1"]');
        const secondInput = frameCard.querySelector('[data-roll-key="r2"]');
        const bonusSlot = frameCard.querySelector('[data-score-bonus-slot]');
        const bonusInput = frameCard.querySelector('[data-roll-key="r3"]');

        if (!(firstInput instanceof HTMLInputElement) || !(secondInput instanceof HTMLInputElement)) return;
        if (!(bonusSlot instanceof HTMLDivElement) || !(bonusInput instanceof HTMLInputElement)) return;

        const shouldShow = shouldShowTenthBonusInput({
            r1: firstInput.value,
            r2: secondInput.value
        });

        frameCard.classList.toggle('has-bonus-roll', shouldShow);
        bonusSlot.classList.toggle('is-visible', shouldShow);
        bonusInput.disabled = !shouldShow;

        if (!shouldShow) {
            bonusInput.value = '';
        }
    });
}

function updateScoreboardInputFlow(scope = document) {
    const scoreboards = scope.querySelectorAll('.current-match-scoreboard');

    scoreboards.forEach((scoreboard) => {
        let previousFramesComplete = true;

        for (let frameIndex = 0; frameIndex < BOWLING_FRAME_COUNT; frameIndex += 1) {
            const firstInput = scoreboard.querySelector(`[data-frame-index="${frameIndex}"][data-roll-key="r1"]`);
            const secondInput = scoreboard.querySelector(`[data-frame-index="${frameIndex}"][data-roll-key="r2"]`);
            const bonusInput = scoreboard.querySelector(`[data-frame-index="${frameIndex}"][data-roll-key="r3"]`);
            const frameCard = firstInput?.closest('.score-frame-card');
            const bonusSlot = frameCard?.querySelector('[data-score-bonus-slot]');

            if (!(firstInput instanceof HTMLInputElement) || !(secondInput instanceof HTMLInputElement) || !frameCard) {
                previousFramesComplete = false;
                continue;
            }

            const frameUnlocked = previousFramesComplete;
            firstInput.disabled = !frameUnlocked;
            firstInput.max = '10';

            const firstValue = parseRollValue(firstInput.value);
            const secondMax = frameIndex < 9
                ? (firstValue === null ? 10 : Math.max(0, 10 - Math.min(firstValue, 10)))
                : (firstValue === null || firstValue === 10 ? 10 : Math.max(0, 10 - Math.min(firstValue, 10)));
            secondInput.max = String(secondMax);
            clampScoreInputValue(secondInput, secondMax);

            const secondValue = parseRollValue(secondInput.value);
            const showBonus = frameIndex === 9 && shouldShowTenthBonusInput({
                r1: firstInput.value,
                r2: secondInput.value
            });

            if (frameIndex < 9) {
                secondInput.disabled = !frameUnlocked || firstValue === null || firstValue === 10;
            } else {
                secondInput.disabled = !frameUnlocked || firstValue === null;
            }

            if (bonusInput instanceof HTMLInputElement && bonusSlot instanceof HTMLDivElement) {
                frameCard.classList.toggle('has-bonus-roll', showBonus);
                bonusSlot.classList.toggle('is-visible', showBonus);

                const bonusMax = firstValue === 10 && secondValue !== null && secondValue < 10
                    ? Math.max(0, 10 - secondValue)
                    : 10;
                bonusInput.max = String(bonusMax);
                clampScoreInputValue(bonusInput, bonusMax);
                bonusInput.disabled = !frameUnlocked || !showBonus || secondValue === null;

                if (!showBonus) {
                    bonusInput.value = '';
                }
            }

            previousFramesComplete = frameUnlocked && isBowlingFrameComplete(frameIndex, {
                r1: firstInput.value,
                r2: secondInput.value,
                r3: bonusInput instanceof HTMLInputElement ? bonusInput.value : null
            });
        }
    });
}

function calculateCurrentMatchFromPanel(button) {
    const adminPanel = document.getElementById('bracket-admin-panel');
    const roundKey = button.dataset.round;
    const matchIndex = Number.parseInt(button.dataset.matchIndex || '', 10);
    if (!adminPanel || !roundKey || Number.isNaN(matchIndex)) return;

    const match = AppState.bracket?.rounds?.[roundKey]?.[matchIndex];
    if (!match || !match.participantAId || !match.participantBId) {
        showToast('Ese enfrentamiento ya no esta disponible para captura.', 'error');
        return;
    }

    const participantA = getBracketParticipantById(match.participantAId);
    const participantB = getBracketParticipantById(match.participantBId);
    if (!participantA || !participantB) return;

    const framesA = readMatchFramesFromPanel(adminPanel, 'A');
    const framesB = readMatchFramesFromPanel(adminPanel, 'B');
    const resultA = calculateBowlingScoreFromFrames(framesA);
    const resultB = calculateBowlingScoreFromFrames(framesB);

    if (!resultA.valid) {
        showToast(`${participantA.nombre}: ${resultA.message}`, 'error');
        return;
    }

    if (!resultB.valid) {
        showToast(`${participantB.nombre}: ${resultB.message}`, 'error');
        return;
    }

    if (resultA.total === resultB.total) {
        showToast('El enfrentamiento termino empatado. Ajusta una tirada para definir al ganador.', 'error');
        return;
    }

    match.scoreFramesA = cloneScoreFrames(framesA);
    match.scoreFramesB = cloneScoreFrames(framesB);
    match.totalA = resultA.total;
    match.totalB = resultB.total;
    saveBracketState();

    const winnerId = resultA.total > resultB.total ? participantA.id : participantB.id;
    const winnerName = resultA.total > resultB.total ? participantA.nombre : participantB.nombre;
    const loserName = resultA.total > resultB.total ? participantB.nombre : participantA.nombre;

    promoteBracketWinner(roundKey, matchIndex, winnerId);
    showToast(`Marcador guardado: ${winnerName} ${Math.max(resultA.total, resultB.total)} - ${Math.min(resultA.total, resultB.total)} ${loserName}.`, 'success');
}

function toggleBracketModal(open) {
    const modal = document.getElementById('bracket-modal');
    const modalScrollArea = document.querySelector('.bracket-scroll-area.modal');
    if (!modal) return;

    if (open) {
        renderTournamentBracket();
        modal.removeAttribute('hidden');
        modal.scrollTop = 0;
        if (modalScrollArea) modalScrollArea.scrollTop = 0;
        document.body.classList.add('bracket-modal-open');
        return;
    }

    modal.setAttribute('hidden', '');
    document.body.classList.remove('bracket-modal-open');
}

function initBracketControls() {
    const adminPanel = document.getElementById('bracket-admin-panel');
    const previewContainer = document.getElementById('tournament-bracket-preview');
    const modalContainer = document.getElementById('tournament-bracket-modal');
    const openButton = document.getElementById('btn-open-bracket-modal');
    const closeButton = document.getElementById('btn-close-bracket-modal');
    const backdrop = document.getElementById('bracket-modal-backdrop');
    const modal = document.getElementById('bracket-modal');

    if (modal && modal.parentElement !== document.body) {
        document.body.appendChild(modal);
    }

    if (adminPanel) {
        adminPanel.addEventListener('click', (event) => {
            const actionButton = event.target.closest('[data-bracket-action]');
            if (actionButton) {
                const teamId = Number(actionButton.dataset.teamId || '0');
                if (actionButton.dataset.bracketAction === 'add') {
                    addTeamToBracketDraft(teamId);
                    return;
                }

                if (actionButton.dataset.bracketAction === 'remove') {
                    removeTeamFromBracketDraft(teamId);
                    return;
                }
            }

            const addFilteredButton = event.target.closest('#btn-bracket-add-filtered');
            if (addFilteredButton) {
                addFilteredTeamsToBracketDraft();
                return;
            }

            const clearSelectionButton = event.target.closest('#btn-bracket-clear-selection');
            if (clearSelectionButton) {
                clearBracketDraftSelection();
                return;
            }

            const generateButton = event.target.closest('#btn-bracket-generate');
            if (generateButton) {
                generateBracketFromCurrentDraft();
                return;
            }

            const calculateScoreButton = event.target.closest('#btn-calculate-current-match-score');
            if (calculateScoreButton) {
                calculateCurrentMatchFromPanel(calculateScoreButton);
            }
        });

        adminPanel.addEventListener('change', (event) => {
            const target = event.target;
            if (!(target instanceof HTMLSelectElement)) return;

            if (target.id === 'bracket-builder-category') {
                setBracketBuilderCategory(target.value);
                return;
            }

            if (target.id === 'bracket-builder-start-round') {
                setBracketBuilderStartRound(target.value);
            }
        });

        adminPanel.addEventListener('input', (event) => {
            const target = event.target;
            if (!(target instanceof HTMLInputElement) || !target.classList.contains('score-roll-input')) return;
            clampScoreInputValue(target, Number.parseInt(target.max || '10', 10));
            updateScoreboardInputFlow(adminPanel);
        });
    }

    if (openButton) {
        openButton.addEventListener('click', () => toggleBracketModal(true));
    }

    if (closeButton) {
        closeButton.addEventListener('click', () => toggleBracketModal(false));
    }

    if (backdrop) {
        backdrop.addEventListener('click', () => toggleBracketModal(false));
    }

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            toggleBracketModal(false);
        }
    });
}

function stopAdminAudio() {
    if (AppState.barAudio) {
        AppState.barAudio.pause();
        AppState.barAudio.currentTime = 0;
    }
    AppState.jukebox.playing = false;
    AppState.updateJukeboxUI();
}

function setActiveView(viewId) {
    const views = ['public-view', 'cliente-view', 'admin-view'];
    views.forEach((id) => {
        const element = document.getElementById(id);
        if (element) {
            element.hidden = id !== viewId;
        }
    });

    AppState.currentView = viewId;
    closeAllSiteMenus();

    if (viewId !== 'admin-view') {
        toggleBracketModal(false);
        stopAdminAudio();
    }

    if (viewId === 'admin-view') {
        activateAdminPanel('resumen');
        const adminMain = document.querySelector('.admin-main');
        if (adminMain) adminMain.scrollTop = 0;
    } else {
        window.scrollTo({ top: 0, behavior: 'auto' });
    }
}

function getUpcomingMatchForTeam(team) {
    if (!team || !AppState.siguienteJornadaGenerada) return null;

    return AppState.partidasSiguiente.find((match) => (
        match.equipoAId === team.id ||
        match.equipoBId === team.id ||
        match.equipoA === team.nombre ||
        match.equipoB === team.nombre
    )) || null;
}

function getNextBracketMatchForTeam(team) {
    if (!team || !AppState.bracket?.participants?.length) return null;

    const participant = AppState.bracket.participants.find((item) => item.teamId === team.id);
    if (!participant) return null;

    for (const round of getManagedBracketRounds()) {
        const matchIndex = AppState.bracket.rounds[round.key].findIndex((match) => (
            match.participantAId === participant.id ||
            match.participantBId === participant.id
        ));

        if (matchIndex < 0) continue;

        const match = AppState.bracket.rounds[round.key][matchIndex];
        if (match.winnerId && match.winnerId !== participant.id) {
            return null;
        }

        if (!match.winnerId) {
            return {
                round,
                matchIndex,
                match,
                participant
            };
        }
    }

    return null;
}

function getBracketProgressForTeam(team) {
    if (!team || !AppState.bracket?.participants?.length) return null;

    const participant = AppState.bracket.participants.find((item) => item.teamId === team.id);
    if (!participant) return null;

    let lastResolved = null;
    let lastWon = null;
    let elimination = null;
    let pending = null;

    for (const round of getManagedBracketRounds()) {
        const matchIndex = AppState.bracket.rounds[round.key].findIndex((match) => (
            match.participantAId === participant.id ||
            match.participantBId === participant.id
        ));

        if (matchIndex < 0) continue;

        const match = AppState.bracket.rounds[round.key][matchIndex];
        const opponentId = match.participantAId === participant.id ? match.participantBId : match.participantAId;
        const opponent = getBracketParticipantById(opponentId);
        const info = {
            round,
            matchIndex,
            match,
            participant,
            opponent
        };

        if (!match.winnerId) {
            pending = info;
            break;
        }

        lastResolved = info;

        if (match.winnerId === participant.id) {
            lastWon = info;
            continue;
        }

        elimination = info;
        break;
    }

    return {
        participant,
        pending,
        lastResolved,
        lastWon,
        elimination,
        isChampion: AppState.bracket.championId === participant.id
    };
}

function formatRegistrationDate(value) {
    if (!value) return 'Pendiente';

    try {
        return new Intl.DateTimeFormat('es-MX', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        }).format(new Date(value));
    } catch (error) {
        return 'Pendiente';
    }
}

function renderClientRegistrationSection() {
    const summary = document.getElementById('client-registration-summary');
    const form = document.getElementById('client-registration-form');
    const playerInput = document.getElementById('client-player-name');
    const helper = document.getElementById('client-registration-helper');
    const submitButton = document.getElementById('client-registration-submit');
    const teamInput = document.getElementById('client-team-name');
    const partnerInput = document.getElementById('client-partner-name');
    const levelSelect = document.getElementById('client-player-experience');
    const costOutput = document.getElementById('client-registration-cost');
    if (!summary || !form || !playerInput || !helper || !submitButton || !teamInput || !partnerInput || !levelSelect || !costOutput) return;

    const tournament = getActiveTournament();
    const user = AppState.sessionUser;
    const userTeam = getUserTeam(user);
    const remainingSlots = getRemainingSlots();
    const open = isRegistrationOpen();
    const statusLabel = getTournamentStatusLabel();
    const statusBadgeClass = getTournamentStatusBadgeClass();
    const activePrice = getRegistrationPrice(levelSelect.value || 'principiante');

    playerInput.value = user?.name || '';
    costOutput.textContent = `$${activePrice} MXN`;

    if (!userTeam) {
        teamInput.value = '';
        partnerInput.value = '';
        levelSelect.value = 'principiante';
        costOutput.textContent = '$150 MXN';
    }

    summary.innerHTML = `
        <article class="schedule-card">
            <span class="badge ${statusBadgeClass}">${escapeHtml(statusLabel)}</span>
            <h3>${escapeHtml(tournament?.nombre || 'Torneo activo')}</h3>
            <p>Inscribe tu pareja en linea con todos los datos obligatorios y confirma tu lugar sin asistencia presencial.</p>
            <div class="data-grid">
                <span class="data-pill"><i class="fas fa-users"></i> ${getRegisteredTeamCount()} / ${getTournamentCapacity()} parejas</span>
                <span class="data-pill"><i class="fas fa-ticket"></i> ${remainingSlots} cupos disponibles</span>
                <span class="data-pill"><i class="fas fa-medal"></i> $150 / $200 MXN</span>
            </div>
        </article>
        <article class="schedule-card">
            <span class="badge ${userTeam ? 'neon-badge-cyan' : 'neon-badge-yellow'}">${userTeam ? 'Tu registro' : 'Pendiente de registro'}</span>
            <h3>${userTeam ? escapeHtml(userTeam.nombre) : 'Tu cuenta aun no participa'}</h3>
            <p>${userTeam
            ? `Pareja registrada por ${escapeHtml(userTeam.jugador1)} y ${escapeHtml(userTeam.jugador2)} en nivel ${formatTeamLevel(userTeam.nivel).toLowerCase()}.`
            : 'Completa nombre de tu pareja, nivel y nombre del equipo para quedar inscrito en el torneo actual.'}</p>
            <div class="data-grid">
                <span class="data-pill"><i class="fas fa-calendar-check"></i> ${userTeam ? `Registrado ${formatRegistrationDate(userTeam.createdAt)}` : 'Registro en linea activo'}</span>
                <span class="data-pill"><i class="fas fa-circle-play"></i> ${userTeam ? 'Listo para sorteo y partidos del torneo' : 'Esperando tu inscripcion'}</span>
            </div>
        </article>
    `;

    if (userTeam) {
        teamInput.value = userTeam.nombre;
        partnerInput.value = userTeam.jugador2;
        levelSelect.value = userTeam.nivel;
        costOutput.textContent = `$${userTeam.precio} MXN`;
        [teamInput, partnerInput, levelSelect, submitButton].forEach((element) => {
            element.disabled = true;
        });
        helper.textContent = 'Tu cuenta ya quedo inscrita. Desde esta misma vista podras revisar rival, pista y horario cuando el administrador genere tus partidos del torneo.';
        submitButton.innerHTML = '<i class="fas fa-check"></i> Inscripcion confirmada';
        return;
    }

    if (!user) {
        [teamInput, partnerInput, levelSelect, submitButton].forEach((element) => {
            element.disabled = true;
        });
        helper.textContent = 'Inicia sesion para inscribirte al torneo.';
        submitButton.innerHTML = '<i class="fas fa-lock"></i> Inicia sesion para inscribirte';
        return;
    }

    if (!open) {
        [teamInput, partnerInput, levelSelect, submitButton].forEach((element) => {
            element.disabled = true;
        });
        helper.textContent = remainingSlots === 0
            ? 'El torneo ya alcanzo el cupo maximo de parejas.'
            : 'La convocatoria esta cerrada por el administrador.';
        submitButton.innerHTML = '<i class="fas fa-ban"></i> Inscripciones no disponibles';
        return;
    }

    [teamInput, partnerInput, levelSelect, submitButton].forEach((element) => {
        element.disabled = false;
    });
    helper.textContent = 'Todos los campos son obligatorios. El precio cambia segun el nivel registrado para la pareja.';
    submitButton.innerHTML = '<i class="fas fa-file-signature"></i> Confirmar inscripcion';
}

function renderClientTournamentInfo() {
    const teamCard = document.getElementById('client-team-status-card');
    const bracketCard = document.getElementById('client-bracket-reference-card');
    const weeklyCard = document.getElementById('client-next-match-card');
    const overviewCard = document.getElementById('client-overview-card');
    const primaryAction = document.getElementById('client-primary-action');
    if (!teamCard || !bracketCard || !weeklyCard || !overviewCard) return;

    const user = AppState.sessionUser;
    const userTeam = getUserTeam(user);
    const bracketProgress = getBracketProgressForTeam(userTeam);
    const bracketMatch = bracketProgress?.pending || getNextBracketMatchForTeam(userTeam);
    const tournament = getActiveTournament();
    const fallbackRound = bracketMatch?.round || (AppState.bracket ? getActiveBracketRound() : getDefaultRoundForCurrentTeams());
    const fallbackDate = fallbackRound ? formatTournamentDate(getRoundScheduledDate(fallbackRound.key), { includeWeekday: true }) : 'Pendiente';
    const participantA = bracketMatch ? getBracketParticipantById(bracketMatch.match.participantAId) : null;
    const participantB = bracketMatch ? getBracketParticipantById(bracketMatch.match.participantBId) : null;
    const lastWonMatch = bracketProgress?.lastWon || null;
    const lastResolvedMatch = bracketProgress?.lastResolved || null;
    const eliminatedMatch = bracketProgress?.elimination || null;
    const isChampion = Boolean(bracketProgress?.isChampion);
    const pendingOpponent = bracketMatch
        ? (
            getBracketParticipantById(bracketMatch.match.participantAId)?.teamId === userTeam?.id
                ? getBracketParticipantById(bracketMatch.match.participantBId)
                : getBracketParticipantById(bracketMatch.match.participantAId)
        )
        : null;
    const officialSchedule = bracketMatch ? getBracketMatchSchedule(bracketMatch.round.key, bracketMatch.matchIndex) : null;
    const officialMatchTitle = participantA && participantB
        ? `${participantA.nombre} vs ${participantB.nombre}`
        : null;
    const hasAdvancedWaitingOpponent = Boolean(userTeam && bracketMatch && !pendingOpponent && lastWonMatch);

    if (primaryAction) {
        if (userTeam) {
            primaryAction.dataset.scrollTo = 'cliente-torneo';
            primaryAction.innerHTML = '<i class="fas fa-trophy"></i> Ver mi torneo';
        } else {
            primaryAction.dataset.scrollTo = 'cliente-inscripcion';
            primaryAction.innerHTML = '<i class="fas fa-user-plus"></i> Inscribirme al torneo';
        }
    }

    teamCard.innerHTML = userTeam ? `
        <span class="badge neon-badge-cyan">Mi pareja</span>
        <h3>${escapeHtml(userTeam.nombre)}</h3>
        <p>Tu registro ya quedo validado dentro del torneo actual y se toma en cuenta para el sorteo administrativo.</p>
        <div class="ranking-list">
            <div class="ranking-pill"><strong>Jugador</strong> <span>${escapeHtml(userTeam.jugador1)}</span></div>
            <div class="ranking-pill"><strong>Pareja</strong> <span>${escapeHtml(userTeam.jugador2)}</span></div>
        </div>
        <div class="data-grid">
            <span class="data-pill"><i class="fas fa-star-half-alt"></i> ${formatTeamLevel(userTeam.nivel)}</span>
            <span class="data-pill"><i class="fas fa-money-bill-wave"></i> $${userTeam.precio} MXN</span>
        </div>
    ` : `
        <span class="badge neon-badge-yellow">Sin inscripcion</span>
        <h3>Tu pareja aun no esta inscrita</h3>
        <p>Primero registra tu nombre, el de tu pareja y el nivel de experiencia para entrar al torneo.</p>
        <div class="data-grid">
            <span class="data-pill"><i class="fas fa-user-plus"></i> Registro 100% en linea</span>
            <span class="data-pill"><i class="fas fa-shield-check"></i> Validacion obligatoria</span>
        </div>
    `;

    bracketCard.innerHTML = userTeam ? `
        <span class="badge neon-badge-yellow">Fase en torneo</span>
        <h3>${fallbackRound?.label || 'Fase por definir'}</h3>
        <p>${isChampion
            ? 'Felicidades, tu pareja gano la final y ya aparece como campeona actual del torneo.'
            : eliminatedMatch
                ? `Tu recorrido en el torneo se cerro en ${escapeHtml(eliminatedMatch.round.label)}.`
                : pendingOpponent
                    ? `Tu rival oficial dentro del cuadro es ${escapeHtml(pendingOpponent.nombre)} en la fase actual del torneo.`
                    : hasAdvancedWaitingOpponent
                        ? `Ganaste tu ultimo cruce en ${escapeHtml(lastWonMatch.round.label)} y ya avanzaste a ${escapeHtml(bracketMatch.round.label)}.`
                        : 'Tu siguiente referencia dentro del cuadro aun no tiene rival definido o depende de resultados previos.'}</p>
        <div class="data-grid">
            <span class="data-pill"><i class="far fa-calendar"></i> ${fallbackDate}</span>
            <span class="data-pill"><i class="fas fa-layer-group"></i> ${fallbackRound?.label || 'Fase por definir'}</span>
            <span class="data-pill"><i class="fas fa-user-group"></i> ${isChampion ? 'Campeones actuales' : (pendingOpponent ? pendingOpponent.nombre : 'Rival por definir')}</span>
            <span class="data-pill"><i class="fas fa-diagram-project"></i> Cuadro general del torneo</span>
        </div>
    ` : `
        <span class="badge neon-badge-yellow">Cuadro pendiente</span>
        <h3>Primero inscribe a tu pareja</h3>
        <p>Despues de inscribirte, el sistema podra ubicar a tu equipo dentro del cuadro general del torneo.</p>
        <div class="data-grid">
            <span class="data-pill"><i class="fas fa-diagram-project"></i> Esperando inscripcion</span>
            <span class="data-pill"><i class="fas fa-flag-checkered"></i> Sin fase asignada</span>
        </div>
    `;

    weeklyCard.innerHTML = isChampion ? `
        <div class="card-header-flex">
            <div class="card-title-group">
                <h3>Mi proximo partido</h3>
                <p>Tu equipo ya completo todo el recorrido del torneo.</p>
            </div>
            <span class="badge neon-badge-green">Campeones</span>
        </div>
        <h3>${escapeHtml(userTeam.nombre)}</h3>
        <p>Felicidades, ganaste el torneo. Tu pareja vencio en la final del cuadro oficial y ahora aparece como campeona del torneo.</p>
        <div class="data-grid">
            <span class="data-pill"><i class="fas fa-crown"></i> Torneo ganado</span>
            <span class="data-pill"><i class="fas fa-layer-group"></i> Campeones actuales</span>
            <span class="data-pill"><i class="fas fa-user-check"></i> Resultado final registrado</span>
        </div>
    ` : userTeam && bracketMatch && pendingOpponent && officialSchedule ? `
        <div class="card-header-flex">
            <div class="card-title-group">
                <h3>Mi proximo partido</h3>
                <p>Este bloque usa solamente el cruce oficial del cuadro del torneo.</p>
            </div>
            <span class="badge neon-badge-pink">Confirmado en cuadro</span>
        </div>
        <h3>${escapeHtml(officialMatchTitle || `${userTeam.nombre} vs ${pendingOpponent.nombre}`)}</h3>
        <p>Este es tu enfrentamiento oficial dentro del torneo, con horario estimado segun la fase y la disponibilidad de pistas.</p>
        <div class="data-grid">
            <span class="data-pill"><i class="far fa-calendar"></i> ${formatTournamentDate(officialSchedule.fecha, { includeWeekday: true })}</span>
            <span class="data-pill"><i class="far fa-clock"></i> ${officialSchedule.horario} - ${officialSchedule.horaFin}</span>
            <span class="data-pill"><i class="fas fa-road"></i> Pista ${officialSchedule.pista}</span>
            <span class="data-pill"><i class="fas fa-layer-group"></i> ${escapeHtml(bracketMatch.round.label)}</span>
            <span class="data-pill"><i class="fas fa-hourglass-half"></i> ${officialSchedule.duracionMinutos} min</span>
            <span class="data-pill"><i class="fas fa-user-check"></i> Rival confirmado: ${escapeHtml(pendingOpponent.nombre)}</span>
        </div>
    ` : hasAdvancedWaitingOpponent ? `
        <div class="card-header-flex">
            <div class="card-title-group">
                <h3>Mi proximo partido</h3>
                <p>Tu siguiente rival todavia no se define, pero tu avance ya quedo registrado en el cuadro.</p>
            </div>
            <span class="badge neon-badge-green">Avanzaste</span>
        </div>
        <h3>${escapeHtml(userTeam.nombre)}</h3>
        <p>Ganaste tu ultimo partido${lastWonMatch?.opponent ? ` contra ${escapeHtml(lastWonMatch.opponent.nombre)}` : ''} y avanzaste a ${escapeHtml(bracketMatch.round.label)}. En cuanto el otro cruce se resuelva, aqui aparecera tu siguiente rival.</p>
        <div class="data-grid">
            <span class="data-pill"><i class="far fa-calendar"></i> ${officialSchedule ? formatTournamentDate(officialSchedule.fecha, { includeWeekday: true }) : fallbackDate}</span>
            <span class="data-pill"><i class="fas fa-layer-group"></i> ${escapeHtml(bracketMatch.round.label)}</span>
            <span class="data-pill"><i class="fas fa-circle-check"></i> Victoria registrada</span>
            <span class="data-pill"><i class="fas fa-user-clock"></i> Rival por definir</span>
        </div>
    ` : userTeam && eliminatedMatch ? `
        <div class="card-header-flex">
            <div class="card-title-group">
                <h3>Mi proximo partido</h3>
                <p>Tu participacion actual ya quedo cerrada dentro del cuadro oficial.</p>
            </div>
            <span class="badge neon-badge-pink">Cerrado</span>
        </div>
        <h3>${escapeHtml(userTeam.nombre)}</h3>
        <p>Tu ultimo resultado registrado fue en ${escapeHtml(eliminatedMatch.round.label)}${eliminatedMatch.opponent ? ` frente a ${escapeHtml(eliminatedMatch.opponent.nombre)}` : ''}.</p>
        <div class="data-grid">
            <span class="data-pill"><i class="fas fa-layer-group"></i> ${escapeHtml(eliminatedMatch.round.label)}</span>
            <span class="data-pill"><i class="fas fa-flag-checkered"></i> Resultado final capturado</span>
            <span class="data-pill"><i class="fas fa-user-check"></i> Sin cruce pendiente</span>
        </div>
    ` : `
        <div class="card-header-flex">
            <div class="card-title-group">
                <h3>Mi proximo partido</h3>
                <p>Aqui aparecera el cruce oficial de tu equipo dentro del cuadro del torneo.</p>
            </div>
            <span class="badge neon-badge-yellow">Pendiente</span>
        </div>
        <h3>${userTeam ? 'Aun no tienes partido asignado' : 'Primero inscribe a tu pareja'}</h3>
        <p>${userTeam
        ? (lastResolvedMatch?.match?.winnerId === bracketProgress?.participant?.id
            ? 'Tu ultima victoria ya se registro, pero tu siguiente rival todavia no queda definido en la eliminatoria.'
            : 'Tu equipo ya puede existir dentro del cuadro general, pero el rival oficial todavia no queda definido en la eliminatoria.')
        : 'Despues de inscribirte, aqui aparecera tu siguiente partido con fecha, horario y pista.'}</p>
        <div class="data-grid">
            <span class="data-pill"><i class="far fa-calendar"></i> ${userTeam ? fallbackDate : 'Pendiente'}</span>
            <span class="data-pill"><i class="fas fa-calendar-week"></i> Esperando definicion del cruce</span>
            <span class="data-pill"><i class="fas fa-road"></i> Pista por definir</span>
        </div>
    `;

    overviewCard.innerHTML = `
        <span class="badge ${getTournamentStatusBadgeClass()}">${escapeHtml(getTournamentStatusLabel())}</span>
        <h3>${escapeHtml(tournament?.nombre || 'Torneo activo')}</h3>
        <p>Este bloque resume el estado general del torneo, mientras que el rival confirmado se muestra en tu proximo partido.</p>
        <div class="data-grid">
            <span class="data-pill"><i class="fas fa-users"></i> ${getRegisteredTeamCount()} parejas registradas</span>
            <span class="data-pill"><i class="fas fa-ticket"></i> ${getRemainingSlots()} cupos libres</span>
            <span class="data-pill"><i class="fas fa-bowling-ball"></i> ${tournament?.pistas || 0} pistas registradas</span>
            <span class="data-pill"><i class="far fa-calendar-check"></i> ${fallbackRound ? `${fallbackRound.label}: ${fallbackDate}` : 'Calendario pendiente'}</span>
        </div>
    `;
}

function renderRegistrationAdminStatus() {
    const summary = document.getElementById('admin-registration-summary');
    const headerBadge = document.getElementById('registration-status-badge');
    const openButton = document.getElementById('btn-open-registration');
    const closeButton = document.getElementById('btn-close-registration');
    if (!summary || !headerBadge || !openButton || !closeButton) return;

    const tournament = getActiveTournament();
    const statusLabel = getTournamentStatusLabel();
    const statusClass = getTournamentStatusBadgeClass();
    const registered = getRegisteredTeamCount();
    const remaining = getRemainingSlots();

    headerBadge.className = `badge ${statusClass}`;
    headerBadge.innerHTML = `<i class="fas fa-clipboard-check"></i> ${escapeHtml(statusLabel)}`;

    openButton.disabled = Boolean(tournament?.inscripcionAbierta) || remaining === 0;
    closeButton.disabled = !tournament?.inscripcionAbierta;

    summary.innerHTML = `
        <article class="team-category-card team-category-card-neutral">
            <span class="team-category-label">Cupo total</span>
            <strong class="team-category-value">${getTournamentCapacity()}</strong>
            <span class="team-category-caption">parejas para esta temporada</span>
        </article>
        <article class="team-category-card team-category-card-cyan">
            <span class="team-category-label">Inscritas</span>
            <strong class="team-category-value">${registered}</strong>
            <span class="team-category-caption">${registered === 1 ? 'pareja confirmada' : 'parejas confirmadas'}</span>
        </article>
        <article class="team-category-card team-category-card-pink">
            <span class="team-category-label">Disponibles</span>
            <strong class="team-category-value">${remaining}</strong>
            <span class="team-category-caption">${remaining === 1 ? 'cupo restante' : 'cupos restantes'}</span>
        </article>
    `;
}

function routeByRole(user, announce = true) {
    updateSessionLabels(user);
    renderClientRegistrationSection();
    renderClientTournamentInfo();

    if (user.role === 'administrador' || user.role === 'marketing') {
        setActiveView('admin-view');
        if (user.role === 'marketing') {
            activateAdminPanel('promociones');
        }
        if (announce) {
            const message = user.role === 'marketing'
                ? `Bienvenido, ${user.name}. Entraste al panel de marketing.`
                : `Bienvenido, ${user.name}. Entraste al panel de administrador.`;
            showToast(message, 'success');
        }
        return;
    }

    setActiveView('cliente-view');
    if (announce) {
        showToast(`Bienvenido, ${user.name}. Entraste a la vista de jugador.`, 'success');
    }
}

async function logoutToPublic(message = 'Sesion cerrada correctamente.') {
    try {
        await apiRequest('/auth/logout', {
            method: 'POST'
        });

        clearSession();
        AppState.sessionUser = null;

        updateSessionLabels(null);
        renderClientRegistrationSection();
        renderClientTournamentInfo();
        setActiveView('public-view');

        showToast(message, 'success');

    } catch (error) {
        showToast('No se pudo cerrar la sesión. Inténtalo nuevamente.', 'error');
    }
}

function scrollToSection(sectionId) {
    const target = document.getElementById(sectionId);
    if (!target) return;

    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function setSiteMenuState(topbar, toggleButton, isOpen) {
    if (!topbar || !toggleButton) return;
    topbar.classList.toggle('menu-open', isOpen);
    toggleButton.setAttribute('aria-expanded', String(isOpen));
}

function closeAllSiteMenus() {
    const menuConfigs = [
        { topbarId: 'public-topbar', toggleId: 'public-menu-toggle' },
        { topbarId: 'client-topbar', toggleId: 'client-menu-toggle' }
    ];

    menuConfigs.forEach((config) => {
        const topbar = document.getElementById(config.topbarId);
        const toggleButton = document.getElementById(config.toggleId);
        setSiteMenuState(topbar, toggleButton, false);
    });
}

function openAuthModal(mode = 'login') {
    const modal = document.getElementById('auth-modal');
    if (!modal) return;

    modal.hidden = false;
    switchAuthTab(mode);
}

function closeAuthModal() {
    const modal = document.getElementById('auth-modal');
    if (!modal) return;

    modal.hidden = true;
}

function switchAuthTab(mode) {
    const tabs = document.querySelectorAll('.auth-tab');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    tabs.forEach((tab) => {
        tab.classList.toggle('active', tab.dataset.authTab === mode);
    });

    if (loginForm) loginForm.hidden = mode !== 'login';
    if (registerForm) registerForm.hidden = mode !== 'register';
}

function initEntryNavigation() {
    const menuConfigs = [
        { topbarId: 'public-topbar', toggleId: 'public-menu-toggle' },
        { topbarId: 'client-topbar', toggleId: 'client-menu-toggle' }
    ];

    menuConfigs.forEach((config) => {
        const topbar = document.getElementById(config.topbarId);
        const toggleButton = document.getElementById(config.toggleId);
        if (!topbar || !toggleButton) return;

        toggleButton.addEventListener('click', () => {
            const isOpen = topbar.classList.contains('menu-open');
            closeAllSiteMenus();
            setSiteMenuState(topbar, toggleButton, !isOpen);
        });
    });

    const scrollButtons = document.querySelectorAll('[data-scroll-to]');
    scrollButtons.forEach((button) => {
        button.addEventListener('click', () => {
            closeAllSiteMenus();
            scrollToSection(button.dataset.scrollTo);
        });
    });

    const authButtons = document.querySelectorAll('[data-open-auth]');
    authButtons.forEach((button) => {
        button.addEventListener('click', () => {
            closeAllSiteMenus();
            openAuthModal(button.dataset.openAuth || 'login');
        });
    });

    const clientBackPublic = document.getElementById('client-back-public');
    if (clientBackPublic) {
        clientBackPublic.addEventListener('click', () => {
            setActiveView('public-view');
        });
    }

    const clientHomeTrigger = document.getElementById('client-home-trigger');
    if (clientHomeTrigger) {
        clientHomeTrigger.addEventListener('click', () => {
            closeAllSiteMenus();
            scrollToSection('cliente-bienvenida');
        });
    }
}

function initAuth() {
    const closeButton = document.getElementById('auth-close-btn');
    const modal = document.getElementById('auth-modal');
    const tabButtons = document.querySelectorAll('.auth-tab');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    if (closeButton) {
        closeButton.addEventListener('click', closeAuthModal);
    }

    if (modal) {
        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                closeAuthModal();
            }
        });
    }

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeAuthModal();
        }
    });

    tabButtons.forEach((button) => {
        button.addEventListener('click', () => {
            switchAuthTab(button.dataset.authTab);
        });
    });

    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const email = document.getElementById('login-email').value.trim().toLowerCase();
            const password = document.getElementById('login-password').value;

            try {
                const resultado = await apiRequest('/auth/login', {
                    method: 'POST',
                    body: JSON.stringify({
                        email,
                        password
                    })
                });

                const usuario = {
                    id: resultado.usuario.id_usuario,
                    name: resultado.usuario.nombre_completo,
                    email: resultado.usuario.email,
                    role: resultado.usuario.rol
                };

                AppState.sessionUser = usuario;

                updateSessionLabels(usuario);
                closeAuthModal();
                loginForm.reset();
                routeByRole(usuario);

            } catch (error) {
                showToast(error.message, 'error');
            }
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const name = document.getElementById('register-name').value.trim();
            const email = document.getElementById('register-email').value.trim().toLowerCase();
            const password = document.getElementById('register-password').value;

            if (!name || !email || !password) {
                showToast('Completa todos los campos del registro.', 'error');
                return;
            }

            if (password.length < 8) {
                showToast('La contraseña debe tener al menos 8 caracteres.', 'error');
                return;
            }

            try {
                await apiRequest('/auth/register', {
                    method: 'POST',
                    body: JSON.stringify({
                        nombre_completo: name,
                        email,
                        password
                    })
                });

                closeAuthModal();
                registerForm.reset();

                showToast(
                    'Cuenta creada correctamente. Ahora puedes iniciar sesión.',
                    'success'
                );

            } catch (error) {
                showToast(error.message, 'error');
            }
        });
    }

    const clientLogout = document.getElementById('client-logout-btn');
    const adminLogout = document.getElementById('admin-logout-btn');

    if (clientLogout) {
        clientLogout.addEventListener('click', () => {
            logoutToPublic('Sesion de jugador cerrada.');
        });
    }

    if (adminLogout) {
        adminLogout.addEventListener('click', () => {
            logoutToPublic('Sesion de administrador cerrada.');
        });
    }
}

function activateAdminPanel(targetId) {
    const navItems = document.querySelectorAll('.admin-nav .nav-item');
    const panels = document.querySelectorAll('.page-panel');

    navItems.forEach((item) => {
        item.classList.toggle('active', item.dataset.target === targetId);
    });

    panels.forEach((panel) => {
        panel.classList.toggle('active', panel.id === targetId);
    });

    if (targetId === 'reportes') {
        animateCharts();
    }

    // Cargar usuarios registrados desde PostgreSQL
    if (targetId === 'usuarios') {
        cargarUsuariosAdmin();
    }
}

function initRouting() {
    const navItems = document.querySelectorAll('.admin-nav .nav-item');
    navItems.forEach((item) => {
        item.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = item.getAttribute('data-target');
            if (!targetId) return;
            activateAdminPanel(targetId);
        });
    });
}

function initAdminMenu() {
    const aside = document.querySelector('.admin-aside');
    const toggleButton = document.getElementById('admin-menu-toggle');
    const toggleIcon = toggleButton ? toggleButton.querySelector('i') : null;
    const navItems = document.querySelectorAll('.admin-nav .nav-item');

    if (!aside || !toggleButton) return;

    const mobileQuery = window.matchMedia('(max-width: 992px)');

    function setMenuState(isOpen) {
        aside.classList.toggle('menu-open', isOpen);
        toggleButton.setAttribute('aria-expanded', String(isOpen));

        if (toggleIcon) {
            toggleIcon.className = isOpen ? 'fas fa-xmark' : 'fas fa-bars';
        }
    }

    function syncMenuMode() {
        if (mobileQuery.matches) {
            setMenuState(false);
        } else {
            setMenuState(true);
        }
    }

    toggleButton.addEventListener('click', () => {
        if (!mobileQuery.matches) return;
        const isOpen = !aside.classList.contains('menu-open');
        setMenuState(isOpen);
    });

    navItems.forEach((item) => {
        item.addEventListener('click', () => {
            if (mobileQuery.matches) {
                setMenuState(false);
            }
        });
    });

    if (typeof mobileQuery.addEventListener === 'function') {
        mobileQuery.addEventListener('change', syncMenuMode);
    } else if (typeof mobileQuery.addListener === 'function') {
        mobileQuery.addListener(syncMenuMode);
    }

    syncMenuMode();
}

function initAtmosphereControls() {
    const lightSwitch = document.getElementById('neon-lights-switch');
    if (lightSwitch) {
        lightSwitch.addEventListener('change', function onLightSwitchChange() {
            if (this.checked) {
                document.body.classList.remove('lights-off');
                showToast('Luces de neon encendidas.', 'success');
            } else {
                document.body.classList.add('lights-off');
                showToast('Luces atenuadas. Ambiente intimo activado.');
            }
        });
    }

    const playBtn = document.getElementById('jukebox-play');
    const nextBtn = document.getElementById('jukebox-next');
    const songTitle = document.getElementById('song-title');
    const songGenre = document.getElementById('song-genre');
    const visualizer = document.getElementById('jukebox-visualizer');

    const barAudio = new Audio();
    barAudio.volume = 0.35;
    AppState.barAudio = barAudio;

    function updateJukeboxUI() {
        const track = AppState.jukebox.tracks[AppState.jukebox.currentTrackIndex];
        if (songTitle) songTitle.textContent = track.title;
        if (songGenre) songGenre.textContent = `${track.artist} - ${track.genre}`;

        if (!playBtn || !visualizer) return;

        if (AppState.jukebox.playing) {
            playBtn.innerHTML = '<i class="fas fa-pause"></i>';
            visualizer.classList.add('playing');

            if (barAudio.src !== track.url) {
                barAudio.src = track.url;
            }
            barAudio.play().catch(() => {
                showToast('La reproduccion requiere interaccion previa del usuario.');
            });
        } else {
            playBtn.innerHTML = '<i class="fas fa-play"></i>';
            visualizer.classList.remove('playing');
            barAudio.pause();
        }
    }

    AppState.updateJukeboxUI = updateJukeboxUI;

    barAudio.addEventListener('ended', () => {
        AppState.jukebox.currentTrackIndex = (AppState.jukebox.currentTrackIndex + 1) % AppState.jukebox.tracks.length;
        updateJukeboxUI();
    });

    if (playBtn) {
        playBtn.addEventListener('click', () => {
            AppState.jukebox.playing = !AppState.jukebox.playing;
            updateJukeboxUI();
            if (AppState.jukebox.playing) {
                showToast(`Sonando ahora: "${AppState.jukebox.tracks[AppState.jukebox.currentTrackIndex].title}"`, 'success');
            } else {
                showToast('Musica pausada.');
            }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            AppState.jukebox.currentTrackIndex = (AppState.jukebox.currentTrackIndex + 1) % AppState.jukebox.tracks.length;

            if (AppState.jukebox.playing) {
                barAudio.src = AppState.jukebox.tracks[AppState.jukebox.currentTrackIndex].url;
                barAudio.play().catch(() => { });
            }

            updateJukeboxUI();
            if (AppState.jukebox.playing) {
                showToast(`Siguiente pista: "${AppState.jukebox.tracks[AppState.jukebox.currentTrackIndex].title}"`);
            }
        });
    }

    updateJukeboxUI();
}

function initRegistrationPricing() {
    const pricingPairs = [
        { selectId: 'player-experience', outputId: 'registration-cost' },
        { selectId: 'client-player-experience', outputId: 'client-registration-cost' }
    ];

    pricingPairs.forEach(({ selectId, outputId }) => {
        const experienceSelect = document.getElementById(selectId);
        const costOutput = document.getElementById(outputId);
        if (!experienceSelect || !costOutput) return;

        const syncPrice = () => {
            costOutput.textContent = `$${getRegistrationPrice(experienceSelect.value)} MXN`;
        };

        experienceSelect.addEventListener('change', syncPrice);
        syncPrice();
    });
}

function initRegistrationForm() {
    const form = document.getElementById('torneo-registration-form');
    if (!form) return;

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const teamName = document.getElementById('team-name').value.trim();
        const player1 = document.getElementById('player1-name').value.trim();
        const player2 = document.getElementById('player2-name').value.trim();
        const level = document.getElementById('player-experience').value;

        const validationError = validateRegistrationPayload({
            teamName,
            player1,
            player2,
            level,
            userId: null
        });
        if (validationError) {
            showToast(validationError, 'error');
            return;
        }

        const cost = getRegistrationPrice(level);
        AppState.equipos.push({
            id: getNextTeamId(),
            nombre: teamName,
            jugador1: player1,
            jugador2: player2,
            nivel: level,
            precio: cost,
            puntos: 0,
            jugados: 0,
            ownerUserId: null,
            createdBy: 'admin',
            createdAt: new Date().toISOString()
        });

        saveTeams();
        syncBracketDraftWithTeams();
        invalidateWeeklySchedule();
        showToast(`Inscripcion exitosa de "${teamName}". Total pagado: $${cost} MXN.`, 'success');
        form.reset();
        document.getElementById('registration-cost').textContent = '$150 MXN';
        renderLeaderboard();
        renderTeamsTable();
        renderTournamentBracket();
        renderRegistrationAdminStatus();
        renderClientRegistrationSection();
        renderClientTournamentInfo();
        renderSiguienteJornada();
    });
}

function initClientRegistrationForm() {
    const form = document.getElementById('client-registration-form');
    if (!form) return;

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const user = AppState.sessionUser;
        if (!user) {
            showToast('Inicia sesion para inscribirte al torneo.', 'error');
            return;
        }

        const teamName = document.getElementById('client-team-name').value.trim();
        const player1 = user.name.trim();
        const player2 = document.getElementById('client-partner-name').value.trim();
        const level = document.getElementById('client-player-experience').value;

        const validationError = validateRegistrationPayload({
            teamName,
            player1,
            player2,
            level,
            userId: user.id
        });
        if (validationError) {
            showToast(validationError, 'error');
            return;
        }

        const cost = getRegistrationPrice(level);

        try {
            // Registrar el equipo en PostgreSQL
            const data = await apiRequest('/equipos', {
                method: 'POST',
                body: JSON.stringify({
                    nombre: teamName,
                    jugador1: player1,
                    jugador2: player2,
                    nivel: level
                })
            });

            const equipo = data.equipo;

            // Agregar el equipo devuelto por PostgreSQL al estado del frontend
            AppState.equipos.push({
                id: equipo.id_equipo,
                nombre: equipo.nombre,
                jugador1: equipo.jugador1,
                jugador2: equipo.jugador2,
                nivel: equipo.nivel,
                precio: Number(equipo.precio),
                puntos: equipo.puntos,
                jugados: equipo.jugados,
                ownerUserId: equipo.id_usuario,
                createdBy: equipo.creado_por,
                createdAt: equipo.fecha_creacion
            });

        } catch (error) {
            console.error('Error al registrar equipo:', error);
            showToast(error.message, 'error');
            return;
        }
        syncBracketDraftWithTeams();
        registerTournamentParticipation(user);
        invalidateWeeklySchedule();

        form.reset();
        document.getElementById('client-player-name').value = user.name;
        document.getElementById('client-registration-cost').textContent = '$150 MXN';

        renderLeaderboard();
        renderTeamsTable();
        renderTournamentBracket();
        renderRegistrationAdminStatus();
        renderClientRegistrationSection();
        renderClientTournamentInfo();
        renderClientes();
        renderSiguienteJornada();
        showToast(`Tu pareja "${teamName}" quedo inscrita correctamente. Total: $${cost} MXN.`, 'success');
    });
}

function renderLeaderboard() {
    const tbody = document.getElementById('leaderboard-tbody');
    if (!tbody) return;

    const sortedTeams = [...AppState.equipos].sort((a, b) => b.puntos - a.puntos);
    tbody.innerHTML = '';

    sortedTeams.forEach((team, index) => {
        const tr = document.createElement('tr');

        let rankBadgeClass = 'neon-badge-pink';
        if (index === 0) rankBadgeClass = 'neon-badge-green';
        else if (index === 1) rankBadgeClass = 'neon-badge-cyan';
        else if (index === 2) rankBadgeClass = 'neon-badge-yellow';

        tr.innerHTML = `
            <td><span class="badge ${rankBadgeClass}">${index + 1}o</span></td>
            <td><strong>${team.nombre}</strong><br><small style="color: var(--text-muted)">${team.jugador1} & ${team.jugador2}</small></td>
            <td><span class="badge ${team.nivel === 'profesional' ? 'neon-badge-pink' : 'neon-badge-cyan'}">${formatTeamLevel(team.nivel)}</span></td>
            <td>${team.jugados}</td>
            <td style="color: var(--neon-pink); font-weight: 700; text-shadow: 0 0 4px var(--neon-pink-glow)">${team.puntos} pts</td>
        `;
        tbody.appendChild(tr);
    });
}

function renderTeamsTable() {
    const tbody = document.getElementById('admin-teams-tbody');
    const summary = document.getElementById('team-category-summary');
    if (!tbody) return;

    const professionalCount = AppState.equipos.filter((team) => team.nivel === 'profesional').length;
    const beginnerCount = AppState.equipos.filter((team) => team.nivel === 'principiante').length;
    const totalCount = AppState.equipos.length;

    if (summary) {
        summary.innerHTML = `
            <article class="team-category-card team-category-card-pink">
                <span class="team-category-label">Profesional</span>
                <strong class="team-category-value">${professionalCount}</strong>
                <span class="team-category-caption">${professionalCount === 1 ? 'pareja inscrita' : 'parejas inscritas'}</span>
            </article>
            <article class="team-category-card team-category-card-cyan">
                <span class="team-category-label">Principiante</span>
                <strong class="team-category-value">${beginnerCount}</strong>
                <span class="team-category-caption">${beginnerCount === 1 ? 'pareja inscrita' : 'parejas inscritas'}</span>
            </article>
            <article class="team-category-card team-category-card-neutral">
                <span class="team-category-label">Total</span>
                <strong class="team-category-value">${totalCount}</strong>
                <span class="team-category-caption">${totalCount === 1 ? 'registro activo' : 'registros activos'}</span>
            </article>
        `;
    }

    tbody.innerHTML = '';
    if (!AppState.equipos.length) {
        tbody.innerHTML = '<tr><td colspan="8" style="text-align: center; color: var(--text-muted);">No hay parejas inscritas.</td></tr>';
        return;
    }

    const groupedTeams = [
        { label: 'Profesional', key: 'profesional' },
        { label: 'Principiante', key: 'principiante' }
    ];

    groupedTeams.forEach((group) => {
        const teams = AppState.equipos
            .filter((team) => team.nivel === group.key)
            .sort((teamA, teamB) => teamA.nombre.localeCompare(teamB.nombre, 'es-MX'));

        if (!teams.length) return;

        const titleRow = document.createElement('tr');
        titleRow.className = 'table-section-row';
        titleRow.innerHTML = `<td colspan="8">${group.label}</td>`;
        tbody.appendChild(titleRow);

        teams.forEach((team) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${team.id}</td>
                <td><strong>${team.nombre}</strong></td>
                <td>${team.jugador1} & ${team.jugador2}</td>
                <td><span class="badge ${team.nivel === 'profesional' ? 'neon-badge-pink' : 'neon-badge-cyan'}">${formatTeamLevel(team.nivel)}</span></td>
                <td>$${team.precio} MXN</td>
                <td>${formatRegistrationDate(team.createdAt)}</td>
                <td><span class="badge ${team.createdBy === 'jugador' ? 'neon-badge-cyan' : 'neon-badge-yellow'}">${team.createdBy === 'jugador' ? 'Jugador' : 'Admin'}</span></td>
                <td>
                    <button class="jukebox-btn" onclick="eliminarEquipo(${team.id})" style="color: var(--neon-pink)">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    });
}

window.eliminarEquipo = function eliminarEquipo(id) {
    const index = AppState.equipos.findIndex((equipo) => equipo.id === id);
    if (index === -1) return;

    const teamName = AppState.equipos[index].nombre;
    AppState.equipos.splice(index, 1);
    saveTeams();
    syncBracketDraftWithTeams();
    invalidateWeeklySchedule();
    showToast(`Pareja "${teamName}" eliminada del torneo.`);

    renderLeaderboard();
    renderTeamsTable();
    renderTournamentBracket();
    renderRegistrationAdminStatus();
    renderClientRegistrationSection();
    renderClientTournamentInfo();
    renderSiguienteJornada();
};

function initTournamentAdminControls() {
    const openButton = document.getElementById('btn-open-registration');
    const closeButton = document.getElementById('btn-close-registration');
    if (!openButton || !closeButton) return;

    openButton.addEventListener('click', () => {
        const tournament = getActiveTournament();
        if (!tournament) return;
        if (getRemainingSlots() === 0) {
            showToast('No puedes abrir la convocatoria porque el torneo ya esta lleno.', 'error');
            return;
        }

        tournament.inscripcionAbierta = true;
        tournament.estado = 'Convocatoria abierta';
        saveTournamentConfig();
        renderRegistrationAdminStatus();
        renderClientRegistrationSection();
        renderClientTournamentInfo();
        showToast('La convocatoria del torneo quedo abierta nuevamente.', 'success');
    });

    closeButton.addEventListener('click', () => {
        const tournament = getActiveTournament();
        if (!tournament) return;

        tournament.inscripcionAbierta = false;
        tournament.estado = 'Inscripciones cerradas';
        saveTournamentConfig();
        renderRegistrationAdminStatus();
        renderClientRegistrationSection();
        renderClientTournamentInfo();
        showToast('Las nuevas inscripciones quedaron bloqueadas por el administrador.', 'success');
    });
}

function initRoleGenerator() {
    const button = document.getElementById('btn-generar-roles');
    if (!button) return;

    button.addEventListener('click', () => {
        if (AppState.equipos.length < 2) {
            showToast('Se necesitan al menos 2 parejas para generar partidos del torneo.', 'error');
            return;
        }

        button.setAttribute('disabled', 'true');
        showToast('Generando emparejamientos en neon...');

        setTimeout(() => {
            generateWeeklyMatchups();
            AppState.siguienteJornadaGenerada = true;
            saveWeeklyMatchups();
            renderSiguienteJornada();
            renderClientTournamentInfo();
            showToast('Jornada generada con exito.', 'success');
        }, 1000);
    });
}

function generateWeeklyMatchups() {
    const shuffledTeams = [...AppState.equipos].sort(() => Math.random() - 0.5);
    const generated = [];
    const pistasDisponibles = Math.max(1, Number(getActiveTournament()?.pistas) || 1);
    const activeRound = AppState.bracket ? getActiveBracketRound() : getDefaultRoundForCurrentTeams();
    const scheduledDate = getRoundScheduledDate(activeRound?.key || 'dieciseisavos');
    const scheduledPhase = activeRound?.label || 'Fase actual del torneo';

    for (let index = 0; index < shuffledTeams.length; index += 2) {
        if (index + 1 >= shuffledTeams.length) {
            showToast(`El equipo "${shuffledTeams[index].nombre}" descansa esta semana.`);
            break;
        }

        const matchIndex = generated.length;
        const slotIndex = Math.floor(matchIndex / pistasDisponibles);
        const startMinutes = WEEKLY_SLOT_START_MINUTES + (slotIndex * MATCH_DURATION_MINUTES);
        const endMinutes = startMinutes + MATCH_DURATION_MINUTES;
        generated.push({
            id: `N${matchIndex + 1}`,
            equipoA: shuffledTeams[index].nombre,
            equipoB: shuffledTeams[index + 1].nombre,
            equipoAId: shuffledTeams[index].id,
            equipoBId: shuffledTeams[index + 1].id,
            fecha: scheduledDate,
            fase: scheduledPhase,
            pista: (matchIndex % pistasDisponibles) + 1,
            horario: formatTimeLabel(startMinutes),
            horaFin: formatTimeLabel(endMinutes),
            duracionMinutos: MATCH_DURATION_MINUTES,
            scoreA: 0,
            scoreB: 0,
            estado: 'Pendiente'
        });
    }

    AppState.partidasSiguiente = generated;
}

function renderSiguienteJornada() {
    const listContainer = document.getElementById('siguiente-jornada-container');
    const adminScoreContainer = document.getElementById('admin-captura-container');
    if (!listContainer || !adminScoreContainer) return;

    if (!AppState.siguienteJornadaGenerada) {
        const generalRound = AppState.bracket ? getActiveBracketRound() : getDefaultRoundForCurrentTeams();
        const generalDate = formatTournamentDate(getRoundScheduledDate(generalRound.key), { includeWeekday: true });
        listContainer.innerHTML = `
            <div style="text-align: center; padding: 40px 20px; color: var(--text-muted)">
                <i class="fas fa-dice-six" style="font-size: 3rem; margin-bottom: 16px; color: var(--text-muted)"></i>
                <p>No se han generado los partidos de la fase actual.</p>
                <p style="font-size: 0.85rem">Fecha general estimada para ${generalRound.label}: ${generalDate}.</p>
            </div>
        `;
        adminScoreContainer.innerHTML = `
            <p style="color: var(--text-muted)">Genera primero los partidos del torneo para poder capturar marcadores. La fase ${generalRound.label} esta proyectada para ${generalDate}.</p>
        `;
        return;
    }

    listContainer.innerHTML = '';
    AppState.partidasSiguiente.forEach((match) => {
        const card = document.createElement('div');
        card.className = 'match-card';
        if (match.estado === 'Completado') {
            card.style.borderColor = 'rgba(57, 255, 20, 0.2)';
        }

        card.innerHTML = `
            <div class="match-info-top">
                <span><i class="far fa-calendar"></i> ${formatTournamentDate(match.fecha, { includeWeekday: true })}</span>
                <span><i class="fas fa-bowling-ball"></i> Pista ${match.pista}</span>
                <span><i class="far fa-clock"></i> ${match.horario} - ${match.horaFin || 'Pendiente'}</span>
                <span class="badge ${match.estado === 'Completado' ? 'neon-badge-green' : 'neon-badge-yellow'}">${match.estado}</span>
            </div>
            <div class="data-grid" style="margin-top: 0; margin-bottom: 14px;">
                <span class="data-pill"><i class="fas fa-layer-group"></i> ${escapeHtml(match.fase || 'Fase actual del torneo')}</span>
                <span class="data-pill"><i class="fas fa-hourglass-half"></i> ${match.duracionMinutos || MATCH_DURATION_MINUTES} min</span>
            </div>
            <div class="match-team-row">
                <span class="match-team-name">${match.equipoA}</span>
                <span class="match-team-score">${match.estado === 'Completado' ? match.scoreA : '--'}</span>
            </div>
            <div class="match-vs">VS</div>
            <div class="match-team-row">
                <span class="match-team-name">${match.equipoB}</span>
                <span class="match-team-score">${match.estado === 'Completado' ? match.scoreB : '--'}</span>
            </div>
        `;
        listContainer.appendChild(card);
    });

    adminScoreContainer.innerHTML = `
        <div class="table-responsive">
            <table>
                <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>Fase</th>
                        <th>Horario</th>
                        <th>Duracion</th>
                        <th>Pista</th>
                        <th>Pareja A</th>
                        <th>Marcador A</th>
                        <th></th>
                        <th>Marcador B</th>
                        <th>Pareja B</th>
                        <th>Accion</th>
                    </tr>
                </thead>
                <tbody id="admin-scores-tbody"></tbody>
            </table>
        </div>
    `;

    const tbody = document.getElementById('admin-scores-tbody');
    AppState.partidasSiguiente.forEach((match, index) => {
        const tr = document.createElement('tr');
        const isCompleted = match.estado === 'Completado';

        tr.innerHTML = `
            <td>${formatTournamentDate(match.fecha)}</td>
            <td>${escapeHtml(match.fase || 'Fase actual del torneo')}</td>
            <td>${match.horario} - ${match.horaFin || 'Pendiente'}</td>
            <td>${match.duracionMinutos || MATCH_DURATION_MINUTES} min</td>
            <td>Pista ${match.pista}</td>
            <td><strong>${match.equipoA}</strong></td>
            <td><input type="number" class="score-input-box" id="scoreA-${match.id}" value="${match.scoreA}" ${isCompleted ? 'disabled' : ''} min="0" max="900"></td>
            <td style="text-align: center; color: var(--text-muted)">VS</td>
            <td><input type="number" class="score-input-box" id="scoreB-${match.id}" value="${match.scoreB}" ${isCompleted ? 'disabled' : ''} min="0" max="900"></td>
            <td><strong>${match.equipoB}</strong></td>
            <td>
                ${isCompleted
                ? '<span class="badge neon-badge-green"><i class="fas fa-check"></i> Guardado</span>'
                : `<button class="btn-neon btn-neon-pink" onclick="guardarMarcador('${match.id}', ${index})" style="padding: 6px 12px; font-size: 0.8rem; border-radius: 8px"><i class="fas fa-save"></i> Registrar</button>`
            }
            </td>
        `;
        tbody.appendChild(tr);
    });
}

window.guardarMarcador = function guardarMarcador(matchId, arrayIndex) {
    const match = AppState.partidasSiguiente[arrayIndex];
    if (!match) return;

    const scoreValA = parseInt(document.getElementById(`scoreA-${matchId}`).value, 10);
    const scoreValB = parseInt(document.getElementById(`scoreB-${matchId}`).value, 10);

    if (Number.isNaN(scoreValA) || Number.isNaN(scoreValB) || scoreValA < 0 || scoreValB < 0) {
        showToast('Ingresa marcadores validos mayores o iguales a 0.', 'error');
        return;
    }

    match.scoreA = scoreValA;
    match.scoreB = scoreValB;
    match.estado = 'Completado';

    const equipoA = AppState.equipos.find((equipo) => equipo.nombre === match.equipoA);
    const equipoB = AppState.equipos.find((equipo) => equipo.nombre === match.equipoB);

    if (equipoA) {
        equipoA.puntos += scoreValA;
        equipoA.jugados += 1;
    }

    if (equipoB) {
        equipoB.puntos += scoreValB;
        equipoB.jugados += 1;
    }

    saveTeams();
    saveWeeklyMatchups();
    showToast(`Marcador registrado: ${match.equipoA} (${scoreValA}) vs ${match.equipoB} (${scoreValB}).`, 'success');
    renderLeaderboard();
    renderSiguienteJornada();
    renderClientTournamentInfo();
};

function renderClientes(filterText = '', segment = 'Todos') {
    const container = document.getElementById('clientes-grid');
    if (!container) return;

    container.innerHTML = '';

    const filtered = AppState.clientes.filter((cliente) => {
        const matchText = cliente.nombre.toLowerCase().includes(filterText.toLowerCase()) ||
            cliente.tel.includes(filterText) ||
            cliente.email.toLowerCase().includes(filterText.toLowerCase());

        if (segment === 'Todos') return matchText;
        if (segment === 'Billar') return matchText && cliente.preferido === 'Billar';
        if (segment === 'Cumple') return matchText && cliente.cumple.includes('Mayo');
        if (segment === 'Frecuentes') return matchText && cliente.visitasBillar > 15;
        return matchText;
    });

    if (!filtered.length) {
        container.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: var(--text-muted)">
                <i class="fas fa-user-slash" style="font-size: 2.5rem; margin-bottom: 12px"></i>
                <p>No se encontraron clientes con esos filtros.</p>
            </div>
        `;
        return;
    }

    filtered.forEach((cliente) => {
        const card = document.createElement('div');
        card.className = 'card-glass cyan-accent';

        const iconClass = cliente.preferido === 'Billar' ? 'fas fa-eye' : 'fas fa-bowling-ball';
        const badgeClass = cliente.preferido === 'Billar' ? 'neon-badge-cyan' : 'neon-badge-pink';

        card.innerHTML = `
            <div class="card-header-flex" style="margin-bottom: 14px">
                <span class="badge ${badgeClass}">
                    <i class="${iconClass}"></i> Preferido: ${cliente.preferido}
                </span>
                <span class="badge neon-badge-yellow"><i class="fas fa-gift"></i> ${cliente.cumple}</span>
            </div>
            <h4 style="font-size: 1.25rem; color: #fff; margin-bottom: 4px">${cliente.nombre}</h4>
            <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 16px">
                <i class="far fa-envelope"></i> ${cliente.email} | <i class="fas fa-phone-alt"></i> ${cliente.tel}
            </p>
            <div style="border-top: 1px solid rgba(255,255,255,0.05); padding-top: 12px; display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 0.8rem">
                <div><span style="color: var(--text-muted)">Visitas billar:</span> <strong style="color: var(--neon-cyan)">${cliente.visitasBillar}</strong></div>
                <div><span style="color: var(--text-muted)">Torneos:</span> <strong>${cliente.torneosJugados} temp</strong></div>
                <div><span style="color: var(--text-muted)">Consumo total:</span> <strong style="color: var(--neon-green)">${cliente.compras}</strong></div>
                <div><span style="color: var(--text-muted)">Promos usadas:</span> <strong>${cliente.promoUsadas}</strong></div>
            </div>
        `;
        container.appendChild(card);
    });
}

function initClientesSearch() {
    const searchInput = document.getElementById('search-clientes');
    const segmentButtons = document.querySelectorAll('.seg-btn');

    let activeSegment = 'Todos';
    let activeSearch = '';

    if (searchInput) {
        searchInput.addEventListener('input', function onClientSearch() {
            activeSearch = this.value;
            renderClientes(activeSearch, activeSegment);
        });
    }

    segmentButtons.forEach((button) => {
        button.addEventListener('click', () => {
            segmentButtons.forEach((item) => item.classList.remove('active'));
            button.classList.add('active');
            activeSegment = button.dataset.segment;
            renderClientes(activeSearch, activeSegment);
        });
    });
}

function renderPromociones() {
    const container = document.getElementById('promociones-container');
    if (!container) return;

    container.innerHTML = '';
    AppState.promociones.forEach((promo, index) => {
        const card = document.createElement('div');
        card.className = 'promo-chalk-card';

        let colorClass = 'neon-pink';
        if (index === 0) colorClass = 'neon-cyan';
        if (index === 2) colorClass = 'neon-green';

        card.innerHTML = `
            <div class="promo-chalk-title ${colorClass}">${promo.titulo}</div>
            <p class="promo-chalk-desc">${promo.desc}</p>
            <div class="promo-metrics-row">
                <div class="promo-metric-item">
                    <div class="promo-metric-label">Vistas web/redes</div>
                    <div class="promo-metric-value">${promo.vistas}</div>
                </div>
                <div class="promo-metric-item">
                    <div class="promo-metric-label">Usos registrados</div>
                    <div class="promo-metric-value" style="color: var(--neon-green)">${promo.usos}</div>
                </div>
            </div>
            <div style="display: flex; gap: 8px">
                <button class="btn-neon btn-neon-cyan" onclick="simularUsoPromo('${promo.id}')" style="flex: 1; padding: 10px; font-size: 0.8rem; border-radius: 10px">
                    <i class="fas fa-barcode"></i> Canjear promo
                </button>
                <button class="btn-neon" onclick="publicarRedes('${promo.id}')" title="Simular alcance en redes" aria-label="Simular alcance en redes" style="padding: 10px 12px; border-radius: 10px">
                    <i class="fas fa-bullhorn"></i>
                </button>
            </div>
        `;
        container.appendChild(card);
    });
}

window.simularUsoPromo = function simularUsoPromo(id) {
    const promo = AppState.promociones.find((item) => item.id === id);
    if (!promo) return;

    promo.usos += 1;
    promo.vistas += Math.floor(Math.random() * 4) + 1;
    AppState.clientes[0].promoUsadas += 1;
    showToast(`Codigo de promocion "${promo.titulo}" aplicado correctamente.`, 'success');
    renderPromociones();
};

window.publicarRedes = function publicarRedes(id) {
    const promo = AppState.promociones.find((item) => item.id === id);
    if (!promo) return;

    promo.vistas += Math.floor(Math.random() * 50) + 20;
    showToast('Alcance promocional simulado en redes actualizado.');
    renderPromociones();
};

function initPromoForm() {
    const form = document.getElementById('promo-form');
    if (!form) return;

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const title = document.getElementById('promo-title').value.trim();
        const area = document.getElementById('promo-area').value;
        const description = document.getElementById('promo-desc').value.trim();

        if (!title || !area || !description) {
            showToast('Completa toda la informacion de la promocion.', 'error');
            return;
        }

        AppState.promociones.push({
            id: `P${Date.now()}`,
            titulo: `${title} (${area})`,
            desc: description,
            vistas: 0,
            usos: 0,
            engagement: 'Nuevo'
        });

        form.reset();
        renderPromociones();
        showToast('Nueva promocion registrada y publicada en la pizarra.', 'success');
    });
}

function animateCharts() {
    const bars = document.querySelectorAll('.demand-bar-inner');
    setTimeout(() => {
        bars.forEach((bar) => {
            const targetVal = bar.getAttribute('data-value');
            bar.style.width = `${targetVal}%`;
        });
    }, 80);
}

async function restoreSession() {
    try {
        const resultado = await apiRequest('/auth/me');

        const usuario = {
            id: resultado.usuario.id_usuario,
            name: resultado.usuario.nombre_completo,
            email: resultado.usuario.email,
            role: resultado.usuario.rol
        };

        AppState.sessionUser = usuario;

        routeByRole(usuario, false);

    } catch (error) {
        AppState.sessionUser = null;
        updateSessionLabels(null);
        setActiveView('public-view');
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    loadTournamentConfig();
    await loadTeams();
    loadClients();
    loadWeeklyMatchups();
    loadBracketDraft();
    loadBracketState();
    initEntryNavigation();
    initAuth();
    initRouting();
    initAdminMenu();
    initAtmosphereControls();
    initBracketControls();
    initRegistrationPricing();
    initRegistrationForm();
    initClientRegistrationForm();
    initTournamentAdminControls();
    initRoleGenerator();
    initClientesSearch();
    initPromoForm();
    inicializarEdicionUsuarios();

    renderTournamentBracket();
    renderLeaderboard();
    renderTeamsTable();
    renderRegistrationAdminStatus();
    renderClientRegistrationSection();
    renderClientTournamentInfo();
    renderSiguienteJornada();
    renderClientes();
    renderPromociones();
    restoreSession();
});
