# <div align="center">BolKristal Lounge & Sports Bar</div>

<div align="center">

Prototipo web para la operacion visual de BolKristal: torneos de boliche, jornadas, inscripciones, promociones y experiencia de jugador.

[Abrir pagina](https://slorms.github.io/BolKristal/prototipo/)

</div>

---

## Acceso rapido

- URL publica del prototipo:
  `https://slorms.github.io/BolKristal/prototipo/`
- Archivo principal del proyecto:
  `index.html`
- Frontend base:
  `styles/neon.css` y `js/app.js`

## Resumen general

Este proyecto evoluciono de una pagina estatica a un prototipo visual mucho mas completo para BolKristal. Hoy incluye:

- vista publica de la marca con enfoque en boliche, fiestas y promociones
- modal de acceso con inicio de sesion
- vista de jugador
- panel administrativo responsivo
- modulo de torneo con bracket eliminatorio
- modulo de jornadas
- modulo de inscripciones
- modulo de promociones
- directorio de clientes
- jukebox visual en el panel admin

## Vistas disponibles

### 1. Vista publica

La vista publica presenta la identidad del negocio y funciona como portada principal.

Incluye:

- hero principal con imagenes de boliche y fiesta
- seccion de experiencia BolKristal
- torneo activo
- promociones
- acceso a login
- menu hamburguesa en movil

### 2. Vista de jugador

Cuando un usuario entra con cuenta de jugador, se le muestra una zona propia con:

- bienvenida personalizada
- resumen de torneo
- bracket oficial en solo lectura
- promociones
- seccion de beneficios
- menu hamburguesa en movil

Importante:

- hoy esta vista es informativa
- aun no tiene analiticas personales reales ligadas a una pareja o a un historial individual

### 3. Vista administrativa

El panel administrativo concentra la operacion interna del prototipo.

Secciones actuales:

- `Resumen`
- `Torneo Boliche`
- `Jornadas`
- `Inscripciones`
- `Clientes Bar`
- `Promociones`
- `Reportes`

En movil:

- la barra lateral se convierte en menu hamburguesa
- el panel lateral queda fijo y desplegable

## Modulo de autenticacion

El acceso se hace desde un modal con pestanas:

- `Iniciar sesion`
- `Crear cuenta`

### Estado actual de login

Funciona con cuentas guardadas en `localStorage`.

Claves usadas:

- usuarios: `bolkristal-users`
- sesion: `bolkristal-session`

### Cuentas demo incluidas

- Administrador:
  `admin@bolkristal.mx` / `Admin123!`
- Marketing:
  `marketing@bolkristal.mx` / `Marketing123!`
- Jugador:
  `ana@gmail.com` / `Jugador123!`

### Crear cuenta

Actualmente la pestana de `Crear cuenta`:

- sigue visible
- muestra una superposicion estilo construccion
- esta bloqueada visualmente con cintas cruzadas
- no registra usuarios nuevos por el momento

Ademas:

- si en el futuro se activa el flujo publico, las cuentas creadas desde esa pantalla deben entrar solo como `jugador`

### Limitacion actual importante

Las cuentas se guardan solo en el navegador local. Eso significa:

- si una cuenta se crea en Firefox, Chrome no la ve
- no existe aun una base de datos compartida entre navegadores o dispositivos

## Modulo de torneo

Es una de las partes mas trabajadas del proyecto.

### Bracket eliminatorio

El sistema ya incluye:

- eliminatoria desde `16avos` hasta `Final`
- soporte para iniciar en distintas fases:
  `16avos`, `8avos`, `Cuartos`, `Semifinal` o `Final`
- espejo visual del bracket
- vista compacta
- vista grande para jugador en solo lectura
- guardado local del estado del cuadro

### Control de eliminatoria

Dentro del panel admin se puede:

- elegir categoria del torneo
- elegir fase inicial
- seleccionar parejas inscritas
- sortear posiciones dentro del cuadro
- generar el bracket
- revisar progreso del torneo
- ver siguiente duelo
- ver avance por ronda

Tambien se agrego validacion para que:

- no se genere un cuadro si faltan parejas para completar la fase elegida
- el sistema muestre cuantas parejas faltan

### Estado visual del bracket

Actualmente:

- el bracket admin ya no se edita dando clic sobre equipos
- el bracket chico ya no es editable
- el bracket grande ya no se usa como editor manual
- la lectura del avance se hace desde el panel y desde el bloque de enfrentamiento actual

### Campeon del torneo

Cuando ya hay campeon:

- aparece una imagen de pino con corona
- se refleja tanto en vista compacta como en vista grande del cuadro

## Captura de enfrentamiento actual

Se agrego un bloque especial para capturar el partido activo dentro del torneo.

Incluye:

- marcador por pareja
- 10 frames por pareja
- validacion de score de boliche
- calculo automatico del ganador
- avance automatico del ganador al siguiente cruce

### Como esta modelado hoy

El marcador actual funciona como score por `pareja`, parecido a una dinamica tipo Baker:

- 10 frames por pareja
- hasta 2 tiros por frame
- tiro extra en frame 10 cuando aplica

### Mejoras ya hechas en esta parte

- el frame 10 ya solo crece cuando aparece el tiro bonus
- los tiros se habilitan de forma guiada
- si hay strike, se bloquea el segundo tiro del frame
- el flujo evita capturas imposibles
- se quitaron las flechas de los inputs numericos
- ya no brinca automaticamente a otra casilla al escribir, para permitir capturar `10`

## Modulo de jornadas

Se separo la logica semanal del torneo.

Actualmente se puede:

- generar una jornada semanal
- revisar cruces
- ver horarios
- ver pistas asignadas
- revisar estado de las partidas
- capturar marcadores semanales en su propia seccion

## Modulo de inscripciones

La seccion de inscripciones ya esta organizada en una sola columna.

Incluye:

- formulario de alta de parejas
- costo segun nivel
- tabla de parejas inscritas
- conteo por categoria
- total de registros

Categorias actuales:

- `Profesional`
- `Principiante`

## Directorio de clientes

El modulo de clientes incluye:

- listado visual de clientes
- filtros de busqueda
- segmentos de interes
- datos de contacto
- visitas
- torneos jugados
- consumo
- promos usadas

## Modulo de promociones

El panel de promociones permite:

- mostrar promociones activas
- registrar nuevas promociones en la pizarra
- simular canje de promo
- simular alcance promocional en redes

Importante:

- el boton de redes no publica en Facebook ni Instagram de verdad
- solo incrementa un contador local y muestra un mensaje de simulacion

## Diseno y experiencia visual

Durante el desarrollo se trabajaron muchos ajustes de interfaz:

- diseno mas llamativo para el inicio
- imagenes de boliche y fiesta
- pagina mas corporativa y menos explicativa del proceso de construccion
- textos depurados para que hablen del negocio y no del prototipo
- panel admin mas compacto
- menu admin fijo
- menu hamburguesa en pantallas verticales
- animacion del menu de arriba hacia abajo
- mejoras de responsividad en multiples bloques

## Responsividad

Se ajustaron varios puntos importantes:

- formulario de acceso y registro
- botones de login y crear cuenta
- panel administrativo
- menu hamburguesa en movil
- bracket en vista de jugador
- tablero de score del enfrentamiento actual
- pagina de inscripciones en una sola columna

## Estructura principal del proyecto

```text
prototipo/
|- index.html
|- styles/
|  |- neon.css
|- js/
|  |- app.js
|- images/
```

## Tecnologias usadas

- HTML
- CSS
- JavaScript vanilla
- `localStorage` para persistencia local del prototipo

## Estado actual del proyecto

Hoy el prototipo ya sirve para:

- presentar la marca
- iniciar sesion con usuarios demo
- navegar entre vista publica, jugador y admin
- administrar parejas inscritas
- generar y seguir un bracket
- capturar scores del enfrentamiento actual
- revisar jornadas
- mostrar promociones y clientes

## Limitaciones actuales

Todavia no esta resuelto:

- backend real
- base de datos compartida
- cuentas sincronizadas entre navegadores
- analiticas personalizadas para cada jugador
- relacion real entre usuario, pareja inscrita y estadisticas historicas
- publicacion real a redes sociales

## Siguiente paso recomendado

Si este prototipo va a seguir creciendo, el paso mas importante seria conectar:

- usuarios
- parejas inscritas
- jornadas
- resultados
- estadisticas

a una persistencia real, para que el sistema funcione igual en cualquier navegador o dispositivo.

---

## Acceso directo

Para entrar a la pagina usa:

`https://slorms.github.io/BolKristal/prototipo/`
