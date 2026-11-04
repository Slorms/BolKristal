# <div align="center">🎳 BolKristal</div>

<div align="center">

### ✨ Sistema web para la gestión de torneos, inscripciones, promociones y experiencia de jugador

[![Abrir página](https://img.shields.io/badge/🌐%20Abrir%20pagina-BolKristal-ff0055?style=for-the-badge&logo=google-chrome&logoColor=white)](https://bol-kristal.vercel.app/)

[![Estado](https://img.shields.io/badge/Estado-Desplegado%20en%20Vercel-00c2ff?style=for-the-badge)](https://bol-kristal.vercel.app/)

[![Frontend](https://img.shields.io/badge/Frontend-HTML%20%7C%20CSS%20%7C%20JS-ffb703?style=for-the-badge&logo=javascript&logoColor=white)](https://bol-kristal.vercel.app/)

[![Backend](https://img.shields.io/badge/Backend-Node.js%20%7C%20Express-43853d?style=for-the-badge&logo=node.js&logoColor=white)](https://bol-kristal.vercel.app/)

[![Database](https://img.shields.io/badge/Database-PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white)](https://bol-kristal.vercel.app/)

<br>

<img src="/prototipo/images/hero-bowling-party.png" alt="BolKristal portada" width="330">

</div>

---

## 🚀 Acceso directo

<div align="center">

## [👉 Entrar a la página](https://bol-kristal.vercel.app/)

</div>

**URL pública del proyecto:**  

https://bol-kristal.vercel.app/

---

## ⚙️ Tecnologías del proyecto

BolKristal utiliza tecnologías web para desarrollar su interfaz, gestionar las operaciones del sistema y almacenar la información.

| Tecnología | Función |
|---|---|
| HTML5 | Estructura de las páginas |
| CSS3 | Diseño y estilos de la interfaz |
| JavaScript | Funcionalidades e interactividad |
| Node.js | Entorno de ejecución del backend |
| Express | Gestión de rutas y solicitudes HTTP |
| PostgreSQL | Base de datos relacional |
| Vercel | Despliegue de la aplicación |
| Git y GitHub | Control de versiones y colaboración |

---

## 🧭 ¿Qué es este proyecto?

BolKristal es un sistema web desarrollado para facilitar la operación digital de un negocio de boliche. Su objetivo es centralizar la administración de torneos, jugadores, inscripciones, clientes y promociones mediante una plataforma accesible desde diferentes dispositivos.

La aplicación integra:

- 🎉 Página pública con información del negocio y promociones.
- 🔐 Creación de cuentas e inicio de sesión.
- 👤 Vista de jugador.
- 🛠️ Panel administrativo responsivo.
- 🏆 Administración de torneos con bracket eliminatorio.
- 📝 Inscripciones de parejas.
- 👥 Directorio de clientes.
- 📣 Administración de promociones.
- 🎵 Jukebox visual dentro del panel administrativo.

---

## 🖼️ Vista general

<table>
  <tr>
    <td align="center" width="50%">
      <img src="/prototipo/images/tournament-strike.png" alt="Torneo" width="100%">
      <br>
      <strong>Módulo de torneo</strong>
    </td>
    <td align="center" width="50%">
      <img src="/prototipo/images/party-package.png" alt="Promociones y fiestas" width="100%">
      <br>
      <strong>Promociones y experiencia del negocio</strong>
    </td>
  </tr>
</table>

---

## 🧩 Vistas disponibles

### 🧪 Cuentas de prueba

Para facilitar la revisión y demostración del sistema, se pueden utilizar las siguientes cuentas:

| Rol | Correo electrónico | Contraseña |
|---|---|---|
| Administrador | [admin@bolkristal.com] | [admin123] |
| Jugador | [prueba@bolkristal.com] | [Prueba123!] |

**Nota:** Estas credenciales son exclusivamente para pruebas y demostraciones.

### 🌐 Vista pública

La página principal incluye:

- Imagen y presentación del negocio.
- Información sobre la experiencia BolKristal.
- Torneo activo.
- Promociones.
- Acceso al inicio de sesión y registro.
- Menú hamburguesa para dispositivos móviles.

### 👤 Vista de jugador

Cuando inicia sesión, el jugador puede consultar:

- Bienvenida personalizada.
- Resumen de su pareja inscrita.
- Estado de su avance dentro del torneo.
- Próximo enfrentamiento según el cuadro oficial.
- Fecha, hora estimada y pista del enfrentamiento.
- Notificaciones cuando gana una ronda o el torneo.
- Bracket oficial en modo de solo lectura.
- Promociones del mes.
- Bloque de beneficios.

### 🛠️ Vista administrativa

El panel administrativo cuenta con los siguientes módulos:

- `Resumen`
- `Torneo Boliche`
- `Inscripciones`
- `Clientes Bar`
- `Promociones`
- `Reportes`

Dentro de `Torneo Boliche`, el administrador puede:

- Armar el cuadro con parejas inscritas.
- Sortear posiciones.
- Consultar la etapa activa.
- Capturar los resultados del enfrentamiento actual por frames.
- Avanzar automáticamente al ganador dentro del bracket.

Dentro de `Inscripciones`, el administrador puede:

- Consultar las parejas registradas.
- Abrir convocatorias.
- Cerrar convocatorias.
- Revisar el origen del registro.

En dispositivos móviles:

- La barra lateral se convierte en un menú hamburguesa.
- El panel se adapta al tamaño de pantalla.
- La navegación permite acceder a las diferentes secciones.

---

## 🔐 Acceso y cuentas

El sistema cuenta con un módulo de autenticación que permite acceder mediante dos opciones:

- `Iniciar sesión`
- `Crear cuenta`

### ✅ Inicio de sesión

El sistema contempla:

- Autenticación de usuarios.
- Validación de credenciales.
- Acceso según el rol del usuario.
- Gestión de sesiones.

### 👥 Tipos de usuario

Los roles contemplados en el sistema son:

| Rol | Descripción |
|---|---|
| Administrador | Gestiona las operaciones del negocio y los torneos. |
| Marketing | Administra las promociones y actividades relacionadas. |
| Jugador | Consulta su información y participa en los torneos. |

### 📝 Registro de usuarios

El registro permite crear cuentas de jugadores desde la vista pública, de acuerdo con las validaciones y permisos establecidos en el sistema.

---

## 🗄️ Gestión de información y base de datos

BolKristal utiliza PostgreSQL como sistema de gestión de bases de datos para almacenar la información de la aplicación.

El backend se encarga de gestionar las operaciones relacionadas con los usuarios, equipos y demás recursos del sistema mediante servicios y rutas.

Entre los elementos principales se encuentran:

- Usuarios y autenticación.
- Equipos y parejas inscritas.
- Información necesaria para la administración del sistema.
- Datos relacionados con las operaciones del negocio.

La comunicación entre el frontend y el backend permite realizar las solicitudes necesarias para consultar y gestionar la información.

---

## 🏆 Módulo de torneo

Es uno de los módulos principales del proyecto.

### Funcionalidades

- Bracket eliminatorio desde `16avos` hasta `Final`.
- Configuración de la fase inicial:
  - `16avos`
  - `8avos`
  - `Cuartos`
  - `Semifinal`
  - `Final`
- Selección de parejas inscritas.
- Sorteo de posiciones.
- Validación del cupo mínimo según la fase elegida.
- Avance de rondas.
- Asignación estimada de fecha, hora y pista para los enfrentamientos.
- Notificaciones al jugador cuando gana y avanza.
- Mensaje especial cuando gana la final del torneo.
- Identificación visual del campeón.

### Estado del bracket

- El bracket compacto ya no se edita mediante clics.
- El bracket grande funciona como visualización del cuadro.
- El jugador consulta el bracket en modo de solo lectura.
- El administrador controla el avance desde el enfrentamiento actual dentro del módulo `Torneo Boliche`.
- El rival que visualiza el jugador corresponde al cuadro oficial administrado por el sistema.

---

## 🎳 Captura del enfrentamiento actual

Dentro del módulo de torneo existe una sección para registrar los resultados del enfrentamiento activo.

### Incluye

- Puntuación por pareja.
- 10 frames por pareja.
- Validación de tiros.
- Cálculo de puntuaciones de boliche.
- Avance del ganador a la siguiente ronda.

### Mejoras aplicadas

- El frame 10 se expande cuando se requiere un tiro adicional.
- Los tiros se habilitan de forma guiada.
- Cuando hay un strike, se bloquea el segundo tiro del frame.
- Se permite capturar valores como `10` correctamente.
- Se mejoró la navegación entre campos de captura.

---

## 📝 Inscripciones

El módulo de inscripciones permite registrar y administrar parejas participantes en los torneos.

Incluye:

- Formulario de registro de parejas.
- Inscripción desde la cuenta del jugador.
- Validación de campos obligatorios.
- Validación de pareja obligatoria.
- Validación para evitar jugadores o equipos repetidos.
- Costo según categoría.
- Bloqueo de inscripciones cuando la convocatoria está cerrada.
- Control de cupos disponibles.
- Tabla de parejas registradas.
- Conteo por categoría.
- Total de parejas inscritas.

### Categorías actuales

- `Profesional`
- `Principiante`

---

## 👥 Clientes y promociones

### Clientes

El directorio de clientes contempla información como:

- Nombre y contacto.
- Visitas.
- Torneos jugados.
- Consumo.
- Promociones utilizadas.
- Filtros y segmentos visuales.

### Promociones

El módulo de promociones permite:

- Consultar promociones disponibles.
- Registrar nuevas promociones.
- Administrar la información promocional.
- Simular el canje de promociones.
- Consultar actividades relacionadas con su difusión.

---

## 📱 Responsividad y experiencia de usuario

Durante el desarrollo se trabajaron diferentes mejoras en la experiencia de uso:

- Menú hamburguesa para la vista pública.
- Menú hamburguesa para la vista de jugador.
- Menú hamburguesa para el panel administrativo.
- Panel administrativo más compacto.
- Mejor distribución del espacio en dispositivos móviles.
- Modal de acceso más claro.
- Formularios de inicio de sesión y registro mejor alineados.
- Formulario de captura de resultados más usable.
- Bracket móvil más visible y desplazable.
- Textos más claros y orientados al negocio.

---

## 🗂️ Estructura del proyecto

```text
BolKristal/
│
├── api/
│   ├── index.js
│
├── backend/
│   ├── config/
│   │   └── database.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── equipoController.js
│   │   └── usuarioController.js
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── equipoRoutes.js
│   │   └── usuarioRoutes.js
│   │
│   ├── services/
│   │   ├── authService.js
│   │   ├── equipoService.js
│   │   └── usuarioService.js
│   │
│   ├── tests/
│   └── server.js
│
├── diagramas/
│   ├── Diagrama_AS-IS.pdf
│   ├── Diagrama_ER.mwb
│   ├── Diagrama_ER.pdf
│   └── Diagrama_TO_BE.pdf
│
├── documentacion/
│   ├── 01-Especificacion_Final_Proyecto.pdf
│   ├── 02-Matriz_Requerimientos_Validada.xlsx
│   ├── Caso_Estudio_BolKristal.docx
│   ├── Entrevista_BolKristal.docx
│   ├── Guia_Entrevistas_Matriz_BolKristal.docx3
│   └── Matriz_Trazabilidad_BolKristal.xlsx
│
├── minutas/
│   ├── MInuta Primera Reunion.pdf
│   ├── Minuta Segunda Reunion.pdf
│   └── Minuta Validación Prototipo.pdf
│
├── prototipo/
│   ├── images/
│   ├── js/
│   │   └── app.js
│   ├── styles/
│   │   └── neon.css
│   └── index.html
│
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
└── vercel.json
```

### Distribución por carpetas

- `api/`: contiene los recursos de API utilizados por la aplicación.
- `backend/`: contiene la lógica del servidor.
- `backend/config/`: contiene la configuración de conexión a PostgreSQL.
- `backend/controllers/`: procesa las solicitudes de los diferentes módulos.
- `backend/middleware/`: contiene funciones intermedias, como la autenticación.
- `backend/routes/`: define las rutas disponibles del backend.
- `backend/services/`: organiza la lógica de los servicios.
- `backend/tests/`: contiene el espacio destinado a las pruebas.
- `diagramas/`: almacena los diagramas del sistema.
- `documentacion/`: reúne los documentos relacionados con el análisis y desarrollo.
- `minutas/`: guarda los registros de reuniones y acuerdos del equipo.
- `prototipo/`: contiene la interfaz web desarrollada con HTML, CSS y JavaScript.

---

## 🧪 Tecnologías

<div align="center">

![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)

![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=111)

![Node.js](https://img.shields.io/badge/Node.js-43853d?style=for-the-badge&logo=node.js&logoColor=white)

![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)

![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white)

![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)

</div>

---

## ⚙️ Instalación y ejecución local

### Requisitos

- Node.js.
- npm.
- PostgreSQL.
- Git.
- Editor de código, como Visual Studio Code.

### 1. Clonar el repositorio

```bash
git clone URL_DEL_REPOSITORIO
```

### 2. Entrar al proyecto

```bash
cd BolKristal
```

### 3. Instalar dependencias

Desde la carpeta principal:

```bash
npm install
```

Si el backend cuenta con dependencias independientes:

```bash
cd backend
npm install
```

### 4. Configurar variables de entorno

Crear los archivos `.env` necesarios para la configuración del backend y la conexión con PostgreSQL.

Las variables deben corresponder con las utilizadas en el archivo de configuración de la base de datos.

**Importante:** No subir credenciales, contraseñas ni claves privadas al repositorio.

### 5. Ejecutar el proyecto

Consultar los scripts definidos en los archivos `package.json` para utilizar el comando de ejecución correspondiente.

```bash
npm run
```

---

## ☁️ Despliegue

BolKristal se encuentra desplegado en Vercel.

**Aplicación:** https://bol-kristal.vercel.app/

El sistema utiliza **Node.js, Express y PostgreSQL** para gestionar la información de sus usuarios y equipos.

La configuración del despliegue se encuentra en:

```text
vercel.json
```

Los cambios integrados en la rama configurada para producción pueden generar una nueva versión desplegada en Vercel.

---

## 👥 Trabajo colaborativo

El desarrollo de BolKristal se realiza mediante Git y GitHub, utilizando ramas independientes para organizar las modificaciones de cada integrante.

### Flujo de trabajo

1. Actualizar la rama principal.
2. Crear una rama para la modificación.
3. Realizar los cambios correspondientes.
4. Crear un commit descriptivo.
5. Subir la rama al repositorio remoto.
6. Crear un Pull Request hacia `main`.
7. Revisar e integrar los cambios.

### Comandos básicos

```bash
git switch main
git pull origin main
git switch -c nombre-de-la-rama

git add .
git commit -m "Descripcion de los cambios"
git push -u origin nombre-de-la-rama
```

---

## ✅ Estado actual

BolKristal cuenta con una aplicación web desplegada en Vercel, una estructura backend organizada y una base de datos PostgreSQL.

Entre sus funcionalidades principales se encuentran:

- Presentación digital del negocio.
- Registro e inicio de sesión de usuarios.
- Navegación entre las vistas pública, jugador y administrativa.
- Gestión de parejas inscritas.
- Administración de torneos.
- Generación y seguimiento de brackets.
- Captura de resultados de enfrentamientos.
- Consulta de clientes.
- Administración de promociones.

---

## ⚠️ Consideraciones

- El funcionamiento de la aplicación depende de la disponibilidad del backend y de la base de datos.
- Las variables de entorno deben configurarse correctamente para ejecutar el sistema.
- Las credenciales de acceso y configuración no deben compartirse públicamente.
- Algunas funcionalidades pueden requerir pruebas adicionales antes de considerarse completamente terminadas.

---

## 🎯 Objetivo del proyecto

Desarrollar un sistema de gestión digital que permita mejorar la administración de un negocio de boliche, facilitando la organización de torneos, el registro de jugadores, la gestión de clientes y el manejo de promociones desde una plataforma web.

---

## 💖 Acceso final

<div align="center">

[![Entrar a BolKristal](https://img.shields.io/badge/🎳%20Entrar%20a%20BolKristal-ff0055?style=for-the-badge&logoColor=white)](https://bol-kristal.vercel.app/)

**BolKristal — Más que un juego, una experiencia.**

</div>
