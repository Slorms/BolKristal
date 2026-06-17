const USERS_STORAGE_KEY = 'bolkristal-users';
const SESSION_STORAGE_KEY = 'bolkristal-session';
const TEAMS_STORAGE_KEY = 'bolkristal-teams';
const BRACKET_STORAGE_KEY = 'bolkristal-bracket-demo';
const BRACKET_BUILDER_STORAGE_KEY = 'bolkristal-bracket-builder';

const BRACKET_ROUNDS = [
    { key: 'dieciseisavos', label: '16avos', matchCount: 16 },
    { key: 'octavos', label: '8avos', matchCount: 8 },
    { key: 'cuartos', label: 'Cuartos', matchCount: 4 },
    { key: 'semifinal', label: 'Semifinal', matchCount: 2 },
    { key: 'final', label: 'Final', matchCount: 1 }
];
const BOWLING_FRAME_COUNT = 10;

const DEFAULT_TEAMS = [
    { id: 1, nombre: 'Impacto 300', jugador1: 'Ana Torres', jugador2: 'Luis Herrera', nivel: 'profesional', precio: 200, puntos: 268, jugados: 1 },
    { id: 2, nombre: 'Chuza Real', jugador1: 'Maria Gomez', jugador2: 'Pedro Diaz', nivel: 'principiante', precio: 150, puntos: 215, jugados: 1 },
    { id: 3, nombre: 'Neon Rollers', jugador1: 'Fernanda Ruiz', jugador2: 'Jorge Salas', nivel: 'profesional', precio: 200, puntos: 240, jugados: 1 },
    { id: 4, nombre: 'Power Pins', jugador1: 'Sofia Luna', jugador2: 'Diego Ortiz', nivel: 'principiante', precio: 150, puntos: 184, jugados: 1 },
    { id: 5, nombre: 'Strikers Club', jugador1: 'Valeria Mora', jugador2: 'Ivan Reyes', nivel: 'profesional', precio: 200, puntos: 251, jugados: 1 },
    { id: 6, nombre: 'Pista Central', jugador1: 'Daniela Ponce', jugador2: 'Mario Silva', nivel: 'principiante', precio: 150, puntos: 176, jugados: 1 },
    { id: 7, nombre: 'Golden Frames', jugador1: 'Karen Soto', jugador2: 'Elias Medina', nivel: 'profesional', precio: 200, puntos: 233, jugados: 1 },
    { id: 8, nombre: 'Turbo Split', jugador1: 'Paola Campos', jugador2: 'Rene Vega', nivel: 'principiante', precio: 150, puntos: 171, jugados: 1 },
    { id: 9, nombre: 'Black Lanes', jugador1: 'Lucia Roman', jugador2: 'Axel Cruz', nivel: 'profesional', precio: 200, puntos: 247, jugados: 1 },
    { id: 10, nombre: 'King Bowlers', jugador1: 'Elena Castro', jugador2: 'Pablo Nunez', nivel: 'principiante', precio: 150, puntos: 188, jugados: 1 },
    { id: 11, nombre: 'Flash Team', jugador1: 'Andrea Villa', jugador2: 'Hugo Rosales', nivel: 'profesional', precio: 200, puntos: 221, jugados: 1 },
    { id: 12, nombre: 'Perfect Roll', jugador1: 'Miriam Acosta', jugador2: 'Sergio Galvan', nivel: 'principiante', precio: 150, puntos: 194, jugados: 1 },
    { id: 13, nombre: 'Royal Strike', jugador1: 'Camila Rocha', jugador2: 'Alonso Meza', nivel: 'profesional', precio: 200, puntos: 259, jugados: 1 },
    { id: 14, nombre: 'Blue Sparks', jugador1: 'Bianca Rios', jugador2: 'Omar Valle', nivel: 'principiante', precio: 150, puntos: 182, jugados: 1 },
    { id: 15, nombre: 'Silver Bowl', jugador1: 'Natalia Rangel', jugador2: 'Cesar Tapia', nivel: 'profesional', precio: 200, puntos: 238, jugados: 1 },
    { id: 16, nombre: 'Luna Pins', jugador1: 'Grecia Cardenas', jugador2: 'Julio Mena', nivel: 'principiante', precio: 150, puntos: 169, jugados: 1 },
    { id: 17, nombre: 'Titanes 10', jugador1: 'Erika Bravo', jugador2: 'Raul Ochoa', nivel: 'profesional', precio: 200, puntos: 227, jugados: 1 },
    { id: 18, nombre: 'Zona Chuza', jugador1: 'Ximena Solis', jugador2: 'Bruno Rivas', nivel: 'principiante', precio: 150, puntos: 178, jugados: 1 },
    { id: 19, nombre: 'Lane Masters', jugador1: 'Danna Hurtado', jugador2: 'Nestor Lara', nivel: 'profesional', precio: 200, puntos: 244, jugados: 1 },
    { id: 20, nombre: 'Diamante Bowl', jugador1: 'Alexa Padilla', jugador2: 'Tadeo Velez', nivel: 'principiante', precio: 150, puntos: 191, jugados: 1 },
    { id: 21, nombre: 'Orbit Strikers', jugador1: 'Paula Ibarra', jugador2: 'Ramon Juarez', nivel: 'profesional', precio: 200, puntos: 236, jugados: 1 },
    { id: 22, nombre: 'Lucky Lane', jugador1: 'Regina Baeza', jugador2: 'Kevin Flores', nivel: 'principiante', precio: 150, puntos: 186, jugados: 1 },
    { id: 23, nombre: 'Spin Masters', jugador1: 'Melissa Trejo', jugador2: 'Gael Prieto', nivel: 'profesional', precio: 200, puntos: 242, jugados: 1 },
    { id: 24, nombre: 'Glow Roll', jugador1: 'Carla Montalvo', jugador2: 'Jesus Tovar', nivel: 'principiante', precio: 150, puntos: 173, jugados: 1 },
    { id: 25, nombre: 'Phantom Pins', jugador1: 'Jimena Huerta', jugador2: 'Adrian Sosa', nivel: 'profesional', precio: 200, puntos: 254, jugados: 1 },
    { id: 26, nombre: 'Night Bowl', jugador1: 'Daniela Cota', jugador2: 'Emilio Paredes', nivel: 'principiante', precio: 150, puntos: 189, jugados: 1 },
    { id: 27, nombre: 'Crown Splitters', jugador1: 'Renata Bonilla', jugador2: 'Saul Beltran', nivel: 'profesional', precio: 200, puntos: 249, jugados: 1 },
    { id: 28, nombre: 'Fire Lanes', jugador1: 'Ariadna Escobar', jugador2: 'Ian Ceballos', nivel: 'principiante', precio: 150, puntos: 177, jugados: 1 },
    { id: 29, nombre: 'Vector Rollers', jugador1: 'Monica Yanez', jugador2: 'Rodrigo Tapia', nivel: 'profesional', precio: 200, puntos: 231, jugados: 1 },
    { id: 30, nombre: 'Strike Nova', jugador1: 'Marisol Figueroa', jugador2: 'Alan Nieto', nivel: 'principiante', precio: 150, puntos: 192, jugados: 1 },
    { id: 31, nombre: 'Velocity Pins', jugador1: 'Gabriela Arce', jugador2: 'Fabian Rosas', nivel: 'profesional', precio: 200, puntos: 246, jugados: 1 },
    { id: 32, nombre: 'Crystal Frames', jugador1: 'Natalie Rosales', jugador2: 'Tomas Ledezma', nivel: 'principiante', precio: 150, puntos: 181, jugados: 1 }
];

const DEFAULT_USERS = [
    {
        id: 'U-ADMIN-1',
        name: 'Laura Martinez',
        email: 'admin@bolkristal.mx',
        password: 'Admin123!',
        role: 'administrador'
    },
    {
        id: 'U-MKT-1',
        name: 'Carlos Ramos',
        email: 'marketing@bolkristal.mx',
        password: 'Marketing123!',
        role: 'marketing'
    },
    {
        id: 'U-JUGADOR-1',
        name: 'Ana Torres',
        email: 'ana@gmail.com',
        password: 'Jugador123!',
        role: 'jugador'
    }
];

const AppState = {
    sessionUser: null,
    currentView: 'public-view',
    barAudio: null,
    updateJukeboxUI: () => {},
    torneos: [
        {
            id: 'T1',
            nombre: 'Torneo de Verano 2026',
            estado: 'Convocatoria',
            pistas: 4,
            fechaInicio: '2026-07-01',
            fechaFin: '2026-08-31',
            criterio: 'Puntos'
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
    clientes: [
        { id: 'C001', nombre: 'Ana Torres', email: 'ana@gmail.com', tel: '449-111-2233', cumple: '14 de Mayo', visitasBillar: 8, torneosJugados: 4, compras: '$3,200 MXN', preferido: 'Boliche', promoUsadas: 2 },
        { id: 'C002', nombre: 'Luis Herrera', email: 'luis@gmail.com', tel: '449-444-5566', cumple: '03 de Junio', visitasBillar: 6, torneosJugados: 4, compras: '$2,980 MXN', preferido: 'Billar', promoUsadas: 1 },
        { id: 'C003', nombre: 'Maria Gomez', email: 'maria@gmail.com', tel: '449-777-8899', cumple: '28 de Mayo', visitasBillar: 17, torneosJugados: 2, compras: '$2,150 MXN', preferido: 'Billar', promoUsadas: 3 },
        { id: 'C004', nombre: 'Pedro Diaz', email: 'pedro@gmail.com', tel: '449-333-4455', cumple: '22 de Agosto', visitasBillar: 9, torneosJugados: 2, compras: '$1,840 MXN', preferido: 'Boliche', promoUsadas: 1 },
        { id: 'C005', nombre: 'Carlos Ramos', email: 'marketing@bolkristal.mx', tel: '449-765-4321', cumple: '10 de Noviembre', visitasBillar: 4, torneosJugados: 0, compras: '$890 MXN', preferido: 'Bar / Consumo', promoUsadas: 0 }
    ],
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

function normalizeUserRecord(user) {
    return {
        ...user,
        role: normalizeRole(user.role)
    };
}

function mergeUsersWithDefaults(users) {
    const normalizedUsers = users.map(normalizeUserRecord);
    const merged = [...normalizedUsers];

    DEFAULT_USERS.forEach((defaultUser) => {
        const exists = merged.some((user) => user.email.toLowerCase() === defaultUser.email.toLowerCase());
        if (!exists) {
            merged.push(defaultUser);
        }
    });

    return merged;
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

function getUsers() {
    const raw = localStorage.getItem(USERS_STORAGE_KEY);
    if (!raw) {
        localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(DEFAULT_USERS));
        return [...DEFAULT_USERS];
    }

    try {
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed) || !parsed.length) {
            localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(DEFAULT_USERS));
            return [...DEFAULT_USERS];
        }

        const merged = mergeUsersWithDefaults(parsed);
        localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(merged));
        return merged;
    } catch (error) {
        localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(DEFAULT_USERS));
        return [...DEFAULT_USERS];
    }
}

function saveUsers(users) {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
}

function saveSession(user) {
    AppState.sessionUser = user;
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(user));
}

function clearSession() {
    AppState.sessionUser = null;
    localStorage.removeItem(SESSION_STORAGE_KEY);
}

function getStoredSession() {
    const raw = localStorage.getItem(SESSION_STORAGE_KEY);
    if (!raw) return null;

    try {
        return normalizeUserRecord(JSON.parse(raw));
    } catch (error) {
        localStorage.removeItem(SESSION_STORAGE_KEY);
        return null;
    }
}

function updateSessionLabels(user) {
    const safeUser = user || { name: 'Invitado', email: '', role: 'jugador' };
    const roleMeta = getRoleMeta(safeUser.role);

    const clientName = document.getElementById('client-user-name');
    const clientWelcome = document.getElementById('client-welcome-title');
    const clientRole = document.getElementById('client-user-role-label');
    const adminName = document.getElementById('admin-user-name');
    const adminEmail = document.getElementById('admin-user-email');

    if (clientName) clientName.textContent = safeUser.name;
    if (clientWelcome) clientWelcome.textContent = `Hola, ${safeUser.name}`;
    if (clientRole) clientRole.textContent = roleMeta.label;
    if (adminName) adminName.textContent = safeUser.name;
    if (adminEmail) adminEmail.textContent = safeUser.email || 'admin@bolkristal.mx';
}

function loadTeams() {
    const raw = localStorage.getItem(TEAMS_STORAGE_KEY);

    if (!raw) {
        AppState.equipos = mergeTeamsWithDefaults(DEFAULT_TEAMS);
        localStorage.setItem(TEAMS_STORAGE_KEY, JSON.stringify(AppState.equipos));
        return;
    }

    try {
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed) || !parsed.length) {
            AppState.equipos = mergeTeamsWithDefaults(DEFAULT_TEAMS);
        } else {
            AppState.equipos = mergeTeamsWithDefaults(parsed);
        }
    } catch (error) {
        AppState.equipos = mergeTeamsWithDefaults(DEFAULT_TEAMS);
    }

    localStorage.setItem(TEAMS_STORAGE_KEY, JSON.stringify(AppState.equipos));
}

function saveTeams() {
    localStorage.setItem(TEAMS_STORAGE_KEY, JSON.stringify(AppState.equipos));
}

function mergeTeamsWithDefaults(teams) {
    const normalizedTeams = teams.map((team, index) => ({
        id: Number(team.id) || index + 1,
        nombre: String(team.nombre || '').trim(),
        jugador1: String(team.jugador1 || '').trim(),
        jugador2: String(team.jugador2 || '').trim(),
        nivel: team.nivel === 'profesional' ? 'profesional' : 'principiante',
        precio: Number(team.precio) || (team.nivel === 'profesional' ? 200 : 150),
        puntos: Number(team.puntos) || 0,
        jugados: Number(team.jugados) || 0
    })).filter((team) => team.nombre && team.jugador1 && team.jugador2);

    const mergedTeams = [...normalizedTeams];

    DEFAULT_TEAMS.forEach((defaultTeam) => {
        const exists = mergedTeams.some((team) => (
            team.id === defaultTeam.id ||
            team.nombre.toLowerCase() === defaultTeam.nombre.toLowerCase()
        ));

        if (!exists) {
            mergedTeams.push({ ...defaultTeam });
        }
    });

    return mergedTeams.sort((teamA, teamB) => teamA.id - teamB.id);
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
            clientStatusBadge.innerHTML = `${clientStatusBadge.innerHTML} <span class="client-bracket-status-copy">Visual oficial</span>`;
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
                        <strong>${completed}/${round.matchCount}</strong>
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

function routeByRole(user, announce = true) {
    updateSessionLabels(user);

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

function logoutToPublic(message = 'Sesion cerrada correctamente.') {
    clearSession();
    updateSessionLabels(null);
    setActiveView('public-view');
    showToast(message);
}

function scrollToSection(sectionId) {
    const target = document.getElementById(sectionId);
    if (!target) return;

    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
    const scrollButtons = document.querySelectorAll('[data-scroll-to]');
    scrollButtons.forEach((button) => {
        button.addEventListener('click', () => {
            scrollToSection(button.dataset.scrollTo);
        });
    });

    const authButtons = document.querySelectorAll('[data-open-auth]');
    authButtons.forEach((button) => {
        button.addEventListener('click', () => {
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
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const email = document.getElementById('login-email').value.trim().toLowerCase();
            const password = document.getElementById('login-password').value;
            const users = getUsers();
            const user = users.find((item) => item.email.toLowerCase() === email && item.password === password);

            if (!user) {
                showToast('Correo o contrasena incorrectos.', 'error');
                return;
            }

            saveSession(user);
            updateSessionLabels(user);
            closeAuthModal();
            loginForm.reset();
            routeByRole(user);
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const name = document.getElementById('register-name').value.trim();
            const email = document.getElementById('register-email').value.trim().toLowerCase();
            const password = document.getElementById('register-password').value;
            const role = document.getElementById('register-role').value;

            if (!name || !email || !password) {
                showToast('Completa todos los campos del registro.', 'error');
                return;
            }

            if (password.length < 6) {
                showToast('La contrasena debe tener al menos 6 caracteres.', 'error');
                return;
            }

            const users = getUsers();
            const exists = users.some((user) => user.email.toLowerCase() === email);

            if (exists) {
                showToast('Ese correo ya tiene una cuenta registrada.', 'error');
                return;
            }

            const newUser = {
                id: `U-${Date.now()}`,
                name,
                email,
                password,
                role
            };

            users.push(newUser);
            saveUsers(users);
            saveSession(newUser);
            updateSessionLabels(newUser);
            closeAuthModal();
            registerForm.reset();
            routeByRole(newUser);
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
                barAudio.play().catch(() => {});
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
    const experienceSelect = document.getElementById('player-experience');
    const costOutput = document.getElementById('registration-cost');

    if (!experienceSelect || !costOutput) return;

    experienceSelect.addEventListener('change', function onExperienceChange() {
        const cost = this.value === 'profesional' ? 200 : 150;
        costOutput.textContent = `$${cost} MXN`;
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

        if (!teamName || !player1 || !player2) {
            showToast('Por favor llena todos los campos obligatorios.', 'error');
            return;
        }

        const teamLower = teamName.toLowerCase();
        const player1Lower = player1.toLowerCase();
        const player2Lower = player2.toLowerCase();

        const isDuplicate = AppState.equipos.some((equipo) => (
            equipo.nombre.toLowerCase() === teamLower ||
            equipo.jugador1.toLowerCase() === player1Lower ||
            equipo.jugador1.toLowerCase() === player2Lower ||
            equipo.jugador2.toLowerCase() === player1Lower ||
            equipo.jugador2.toLowerCase() === player2Lower
        ));

        if (isDuplicate) {
            showToast('Ya existe un jugador o nombre de pareja registrado.', 'error');
            return;
        }

        const cost = level === 'profesional' ? 200 : 150;
        const nextId = Math.max(...AppState.equipos.map((equipo) => equipo.id), 0) + 1;

        AppState.equipos.push({
            id: nextId,
            nombre: teamName,
            jugador1: player1,
            jugador2: player2,
            nivel: level,
            precio: cost,
            puntos: 0,
            jugados: 0
        });

        saveTeams();
        syncBracketDraftWithTeams();
        showToast(`Inscripcion exitosa de "${teamName}". Total pagado: $${cost} MXN.`, 'success');
        form.reset();
        document.getElementById('registration-cost').textContent = '$150 MXN';
        renderLeaderboard();
        renderTeamsTable();
        renderTournamentBracket();

        AppState.siguienteJornadaGenerada = false;
        const generateButton = document.getElementById('btn-generar-roles');
        if (generateButton) generateButton.removeAttribute('disabled');
        renderSiguienteJornada();
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
        tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; color: var(--text-muted);">No hay parejas inscritas.</td></tr>';
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
        titleRow.innerHTML = `<td colspan="6">${group.label}</td>`;
        tbody.appendChild(titleRow);

        teams.forEach((team) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${team.id}</td>
                <td><strong>${team.nombre}</strong></td>
                <td>${team.jugador1} & ${team.jugador2}</td>
                <td><span class="badge ${team.nivel === 'profesional' ? 'neon-badge-pink' : 'neon-badge-cyan'}">${formatTeamLevel(team.nivel)}</span></td>
                <td>$${team.precio} MXN</td>
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
    showToast(`Pareja "${teamName}" eliminada del torneo.`);

    renderLeaderboard();
    renderTeamsTable();
    renderTournamentBracket();
    AppState.siguienteJornadaGenerada = false;
    const generateButton = document.getElementById('btn-generar-roles');
    if (generateButton) generateButton.removeAttribute('disabled');
    renderSiguienteJornada();
};

function initRoleGenerator() {
    const button = document.getElementById('btn-generar-roles');
    if (!button) return;

    button.addEventListener('click', () => {
        if (AppState.equipos.length < 2) {
            showToast('Se necesitan al menos 2 parejas para generar una jornada.', 'error');
            return;
        }

        button.setAttribute('disabled', 'true');
        showToast('Generando emparejamientos en neon...');

        setTimeout(() => {
            generateWeeklyMatchups();
            AppState.siguienteJornadaGenerada = true;
            renderSiguienteJornada();
            showToast('Jornada generada con exito.', 'success');
        }, 1000);
    });
}

function generateWeeklyMatchups() {
    const shuffledTeams = [...AppState.equipos].sort(() => Math.random() - 0.5);
    const generated = [];
    let pistaActual = 1;
    let horarioActualIndex = 0;
    const horarios = ['19:00', '20:30', '22:00'];

    for (let index = 0; index < shuffledTeams.length; index += 2) {
        if (index + 1 >= shuffledTeams.length) {
            showToast(`El equipo "${shuffledTeams[index].nombre}" descansa esta semana.`);
            break;
        }

        generated.push({
            id: `N${generated.length + 1}`,
            equipoA: shuffledTeams[index].nombre,
            equipoB: shuffledTeams[index + 1].nombre,
            pista: pistaActual,
            horario: horarios[horarioActualIndex],
            scoreA: 0,
            scoreB: 0,
            estado: 'Pendiente'
        });

        pistaActual += 1;
        if (pistaActual > 2) {
            pistaActual = 1;
            horarioActualIndex = (horarioActualIndex + 1) % horarios.length;
        }
    }

    AppState.partidasSiguiente = generated;
}

function renderSiguienteJornada() {
    const listContainer = document.getElementById('siguiente-jornada-container');
    const adminScoreContainer = document.getElementById('admin-captura-container');
    if (!listContainer || !adminScoreContainer) return;

    if (!AppState.siguienteJornadaGenerada) {
        listContainer.innerHTML = `
            <div style="text-align: center; padding: 40px 20px; color: var(--text-muted)">
                <i class="fas fa-dice-six" style="font-size: 3rem; margin-bottom: 16px; color: var(--text-muted)"></i>
                <p>No se ha generado la proxima jornada.</p>
                <p style="font-size: 0.85rem">Usa la pagina Jornadas para generar los roles de juego.</p>
            </div>
        `;
        adminScoreContainer.innerHTML = `
            <p style="color: var(--text-muted)">Genera la jornada primero para poder capturar marcadores.</p>
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
                <span><i class="fas fa-bowling-ball"></i> Pista ${match.pista}</span>
                <span><i class="far fa-clock"></i> ${match.horario} hrs</span>
                <span class="badge ${match.estado === 'Completado' ? 'neon-badge-green' : 'neon-badge-yellow'}">${match.estado}</span>
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
                        <th>Horario</th>
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
            <td>${match.horario} hrs</td>
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

    showToast(`Marcador registrado: ${match.equipoA} (${scoreValA}) vs ${match.equipoB} (${scoreValB}).`, 'success');
    renderLeaderboard();
    renderSiguienteJornada();
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
                <button class="btn-neon" onclick="publicarRedes('${promo.id}')" style="padding: 10px; border-radius: 10px">
                    <i class="fab fa-facebook-square"></i>
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
    showToast('Publicacion compartida en Facebook e Instagram.');
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

function restoreSession() {
    const session = getStoredSession();
    if (!session) {
        updateSessionLabels(null);
        setActiveView('public-view');
        return;
    }

    const users = getUsers();
    const existingUser = users.find((user) => user.email === session.email);
    if (!existingUser) {
        clearSession();
        updateSessionLabels(null);
        setActiveView('public-view');
        return;
    }

    saveSession(existingUser);
    routeByRole(existingUser, false);
}

document.addEventListener('DOMContentLoaded', () => {
    getUsers();
    loadTeams();
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
    initRoleGenerator();
    initClientesSearch();
    initPromoForm();

    renderTournamentBracket();
    renderLeaderboard();
    renderTeamsTable();
    renderSiguienteJornada();
    renderClientes();
    renderPromociones();
    restoreSession();
});
