const USERS_STORAGE_KEY = 'bolkristal-users';
const SESSION_STORAGE_KEY = 'bolkristal-session';

const DEFAULT_USERS = [
    {
        id: 'U-ADMIN-1',
        name: 'Admin BolKristal',
        email: 'admin@bolkristal.com',
        password: 'Admin123!',
        role: 'admin'
    },
    {
        id: 'U-CLIENTE-1',
        name: 'Cliente Demo',
        email: 'cliente@bolkristal.com',
        password: 'Cliente123!',
        role: 'cliente'
    }
];

const AppState = {
    sessionUser: null,
    currentView: 'public-view',
    barAudio: null,
    updateJukeboxUI: () => {},
    torneos: [
        { id: 'T1', nombre: 'Torneo de Primavera BolKristal 2026', estado: 'En Curso', pistas: 2, fechaInicio: '2026-05-01' }
    ],
    equipos: [
        { id: 1, nombre: 'Los Rompe-Pines', jugador1: 'Carlos Mendoza', jugador2: 'Sofia Castro', nivel: 'Con Experiencia', precio: 350, puntos: 1420, jugados: 3 },
        { id: 2, nombre: 'Boliche Nocturno', jugador1: 'David Juarez', jugador2: 'Luisa Mendez', nivel: 'Sin Experiencia', precio: 250, puntos: 1100, jugados: 3 },
        { id: 3, nombre: 'Strike Force', jugador1: 'Alejandro Gomez', jugador2: 'Patricia Ruiz', nivel: 'Con Experiencia', precio: 350, puntos: 1530, jugados: 3 },
        { id: 4, nombre: 'Los Amigos del Fieltro', jugador1: 'Roberto Torres', jugador2: 'Elena Silva', nivel: 'Sin Experiencia', precio: 250, puntos: 1050, jugados: 3 },
        { id: 5, nombre: 'Clubeadores', jugador1: 'Fernando Herrera', jugador2: 'Gabriela Sanz', nivel: 'Con Experiencia', precio: 350, puntos: 1390, jugados: 3 },
        { id: 6, nombre: 'Split Masters', jugador1: 'Mauricio Ortiz', jugador2: 'Isabel Vega', nivel: 'Sin Experiencia', precio: 250, puntos: 1210, jugados: 3 }
    ],
    partidas: [
        { id: 'M1', equipoA: 'Strike Force', equipoB: 'Los Rompe-Pines', pista: 1, horario: '19:00', scoreA: 450, scoreB: 410, estado: 'Completado' },
        { id: 'M2', equipoA: 'Clubeadores', equipoB: 'Split Masters', pista: 2, horario: '19:00', scoreA: 380, scoreB: 395, estado: 'Completado' },
        { id: 'M3', equipoA: 'Boliche Nocturno', equipoB: 'Los Amigos del Fieltro', pista: 1, horario: '20:30', scoreA: 320, scoreB: 310, estado: 'Completado' }
    ],
    siguienteJornadaGenerada: false,
    partidasSiguiente: [],
    clientes: [
        { id: 'C001', nombre: 'Jose Luis Esquivel', email: 'joseluis@mail.com', tel: '449-123-4567', cumple: '14 de Mayo', visitasBillar: 24, torneosJugados: 3, compras: '$2,450 MXN', preferido: 'Billar', promoUsadas: 4 },
        { id: 'C002', nombre: 'Mariana Delgado', email: 'mariana.d@mail.com', tel: '449-876-5432', cumple: '03 de Junio', visitasBillar: 5, torneosJugados: 5, compras: '$4,120 MXN', preferido: 'Boliche', promoUsadas: 2 },
        { id: 'C003', nombre: 'Oscar Villanueva', email: 'oscar.v@mail.com', tel: '449-456-7890', cumple: '28 de Mayo', visitasBillar: 42, torneosJugados: 1, compras: '$5,800 MXN', preferido: 'Billar', promoUsadas: 8 },
        { id: 'C004', nombre: 'Beatriz Luna', email: 'betty.l@mail.com', tel: '449-321-7654', cumple: '22 de Agosto', visitasBillar: 12, torneosJugados: 4, compras: '$3,100 MXN', preferido: 'Boliche', promoUsadas: 3 },
        { id: 'C005', nombre: 'Hector Cardona', email: 'hector.car@mail.com', tel: '449-654-3210', cumple: '10 de Noviembre', visitasBillar: 3, torneosJugados: 6, compras: '$6,200 MXN', preferido: 'Bar / Consumo', promoUsadas: 5 }
    ],
    promociones: [
        { id: 'P1', titulo: 'Jueves de Pool & Pins', desc: 'Compra 1 hora de billar y te regalamos la segunda mas una orden de nachos gratis.', vistas: 420, usos: 84, engagement: '94%' },
        { id: 'P2', titulo: 'Chuzas & Chelas', desc: 'Cubetazo nacional (6 medias de cerveza) por $180 MXN al jugar en cualquier linea.', vistas: 890, usos: 215, engagement: '88%' },
        { id: 'P3', titulo: 'Cumpleanero Bolero', desc: 'Linea de boliche gratis por 1 hora mostrando identificacion oficial el dia de tu cumpleanos.', vistas: 310, usos: 45, engagement: '97%' }
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
        return Array.isArray(parsed) && parsed.length ? parsed : [...DEFAULT_USERS];
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
        return JSON.parse(raw);
    } catch (error) {
        localStorage.removeItem(SESSION_STORAGE_KEY);
        return null;
    }
}

function updateSessionLabels(user) {
    const safeUser = user || { name: 'Invitado', email: '', role: 'cliente' };
    const roleLabel = safeUser.role === 'admin' ? 'Cuenta administrador' : 'Cuenta cliente';

    const clientName = document.getElementById('client-user-name');
    const clientWelcome = document.getElementById('client-welcome-title');
    const clientRole = document.getElementById('client-user-role-label');
    const adminName = document.getElementById('admin-user-name');
    const adminEmail = document.getElementById('admin-user-email');

    if (clientName) clientName.textContent = safeUser.name;
    if (clientWelcome) clientWelcome.textContent = `Hola, ${safeUser.name}`;
    if (clientRole) clientRole.textContent = roleLabel;
    if (adminName) adminName.textContent = safeUser.name;
    if (adminEmail) adminEmail.textContent = safeUser.email || 'admin@bolkristal.com';
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

    if (user.role === 'admin') {
        setActiveView('admin-view');
        if (announce) {
            showToast(`Bienvenido, ${user.name}. Entraste al panel de administrador.`, 'success');
        }
        return;
    }

    setActiveView('cliente-view');
    if (announce) {
        showToast(`Bienvenido, ${user.name}. Entraste a la vista de cliente.`, 'success');
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
            logoutToPublic('Sesion de cliente cerrada.');
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
        if (songGenre) songGenre.textContent = `${track.artist} • ${track.genre}`;

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
        const cost = this.value === 'Con Experiencia' ? 350 : 250;
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

        const cost = level === 'Con Experiencia' ? 350 : 250;
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

        showToast(`Inscripcion exitosa de "${teamName}". Total pagado: $${cost} MXN.`, 'success');
        form.reset();
        document.getElementById('registration-cost').textContent = '$250 MXN';
        renderLeaderboard();
        renderTeamsTable();

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
            <td><span class="badge ${team.nivel === 'Con Experiencia' ? 'neon-badge-pink' : 'neon-badge-cyan'}">${team.nivel}</span></td>
            <td>${team.jugados}</td>
            <td style="color: var(--neon-pink); font-weight: 700; text-shadow: 0 0 4px var(--neon-pink-glow)">${team.puntos} pts</td>
        `;
        tbody.appendChild(tr);
    });
}

function renderTeamsTable() {
    const tbody = document.getElementById('admin-teams-tbody');
    if (!tbody) return;

    tbody.innerHTML = '';
    AppState.equipos.forEach((team) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${team.id}</td>
            <td><strong>${team.nombre}</strong></td>
            <td>${team.jugador1} & ${team.jugador2}</td>
            <td><span class="badge ${team.nivel === 'Con Experiencia' ? 'neon-badge-pink' : 'neon-badge-cyan'}">${team.nivel}</span></td>
            <td>$${team.precio} MXN</td>
            <td>
                <button class="jukebox-btn" onclick="eliminarEquipo(${team.id})" style="color: var(--neon-pink)">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

window.eliminarEquipo = function eliminarEquipo(id) {
    const index = AppState.equipos.findIndex((equipo) => equipo.id === id);
    if (index === -1) return;

    const teamName = AppState.equipos[index].nombre;
    AppState.equipos.splice(index, 1);
    showToast(`Pareja "${teamName}" eliminada del torneo.`);

    renderLeaderboard();
    renderTeamsTable();
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
                <p style="font-size: 0.85rem">Usa la consola del administrador para generar los roles de juego.</p>
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
    initEntryNavigation();
    initAuth();
    initRouting();
    initAtmosphereControls();
    initRegistrationPricing();
    initRegistrationForm();
    initRoleGenerator();
    initClientesSearch();
    initPromoForm();

    renderLeaderboard();
    renderTeamsTable();
    renderSiguienteJornada();
    renderClientes();
    renderPromociones();
    restoreSession();
});
