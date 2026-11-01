# <div align="center">🎳 BolKristal</div>

<div align="center">

### ✨ Prototipo web para torneo, inscripciones, promociones y experiencia de jugador

[![Abrir pagina](https://img.shields.io/badge/🌐%20Abrir%20pagina-BolKristal-ff0055?style=for-the-badge&logo=google-chrome&logoColor=white)](https://slorms.github.io/BolKristal/prototipo/)
[![Estado](https://img.shields.io/badge/Estado-Prototipo%20activo-00c2ff?style=for-the-badge)](https://slorms.github.io/BolKristal/prototipo/)
[![Frontend](https://img.shields.io/badge/Stack-HTML%20%7C%20CSS%20%7C%20JS-ffb703?style=for-the-badge)](https://slorms.github.io/BolKristal/prototipo/)

<br>

<img src="/prototipo/images/hero-bowling-party.png" alt="BolKristal portada" width="330">

</div>

---

## 🚀 Acceso directo

<div align="center">

## [👉 Entrar a la pagina](https://slorms.github.io/BolKristal/prototipo/)

</div>

**URL publica del proyecto:**  
`https://slorms.github.io/BolKristal/prototipo/`

---

## Como ejecutar el proyecto

Este proyecto es un prototipo estatico. No necesita backend, base de datos ni `npm install`.

### Requisitos

- navegador web moderno como `Google Chrome`, `Microsoft Edge` o `Firefox`
- conexion a internet para cargar los iconos de `Font Awesome` y las pistas de audio de ejemplo

### Opcion 1: abrirlo directo

1. Clona o descarga este repositorio.
2. Entra a la carpeta `prototipo/`.
3. Abre el archivo `index.html` en tu navegador.

### Opcion 2: usar un servidor local

Si prefieres ejecutarlo como sitio local durante desarrollo, puedes usar cualquiera de estas opciones:

- `VS Code + Live Server`: abre la carpeta y ejecuta `Open with Live Server` sobre `prototipo/index.html`.
- `Python 3`: desde la raiz del proyecto ejecuta `python -m http.server 5500` y luego abre `http://localhost:5500/prototipo/`.

### Nota sobre los datos

- El proyecto guarda usuarios, sesion, inscripciones de parejas y estado del torneo en `localStorage` del navegador.
- **Todo es local al navegador y al dispositivo.**
- Si creas una cuenta en un dispositivo e intentas iniciar sesion desde otro, ese usuario **no va a aparecer**.
- Tampoco aparecera si cambias de navegador en el mismo equipo, por ejemplo de `Chrome` a `Edge`.
- Solo podras volver a ver esa cuenta si entras desde el mismo navegador del mismo dispositivo donde fue creada y mientras no se borren los datos del sitio.
- Si quieres reiniciar la informacion demo, borra el almacenamiento del sitio en tu navegador.

---

## 🧭 Que es este proyecto

BolKristal es un prototipo visual pensado para mostrar la operacion digital de un negocio de boliche con ambiente de fiesta. La pagina ya integra:

- 🎉 portada publica con imagenes, promociones y acceso
- 🔐 creacion de cuenta de jugador e inicio de sesion
- 👤 vista de jugador
- 🛠️ panel administrativo responsivo
- 🏆 torneo con bracket eliminatorio
- 📝 inscripciones de parejas
- 👥 directorio de clientes
- 📣 promociones
- 🎵 jukebox visual dentro del panel admin

---

## 🖼️ Vista general

<table>
  <tr>
    <td align="center" width="50%">
      <img src="/prototipo/images/tournament-strike.png" alt="Torneo" width="100%">
      <br>
      <strong>Modulo de torneo</strong>
    </td>
    <td align="center" width="50%">
      <img src="/prototipo/images/party-package.png" alt="Promos y fiestas" width="100%">
      <br>
      <strong>Promociones y experiencia del negocio</strong>
    </td>
  </tr>
</table>

---

## 🧩 Vistas disponibles

### 🌐 Vista publica

La portada principal ya incluye:

- hero visual de boliche y fiesta
- experiencia BolKristal
- torneo activo
- promociones
- acceso a login
- menu hamburguesa en movil

### 👤 Vista de jugador

Cuando entra un jugador, puede ver:

- bienvenida personalizada
- resumen de su pareja inscrita
- estado de su avance dentro del torneo
- proximo cruce oficial segun el cuadro
- fecha, hora estimada y pista del cruce oficial
- mensaje cuando gana una ronda y cuando gana el torneo
- bracket oficial en solo lectura
- promociones del mes
- bloque de beneficios
- menu hamburguesa en movil

> Nota: esta vista ya refleja el estado del jugador dentro del torneo, pero sigue siendo local al navegador y no se sincroniza con otros dispositivos.

### 🛠️ Vista administrativa

El panel admin ya tiene:

- `Resumen`
- `Torneo Boliche`
- `Inscripciones`
- `Clientes Bar`
- `Promociones`
- `Reportes`

Dentro de `Torneo Boliche`, el admin puede:

- armar el cuadro con parejas inscritas
- sortear posiciones
- ver la etapa activa
- capturar el enfrentamiento actual por frames
- avanzar automaticamente al ganador dentro del mismo bracket

Dentro de `Inscripciones`, el admin puede:

- ver todas las parejas registradas
- abrir convocatoria
- cerrar convocatoria
- revisar el origen del registro

En movil:

- la barra lateral pasa a menu hamburguesa
- el panel se mantiene fijo
- la navegacion se despliega sin tapar toda la experiencia

---

## 🔐 Acceso y cuentas

El modal de acceso tiene dos pestañas:

- `Iniciar sesion`
- `Crear cuenta`

### ✅ Login activo

Actualmente si funciona:

- inicio de sesion con usuarios demo
- enrutamiento segun rol
- persistencia de sesion local

### 🧪 Cuentas demo

| Rol | Correo | Contrasena |
|---|---|---|
| Administrador | `admin@bolkristal.mx` | `Admin123!` |
| Marketing | `marketing@bolkristal.mx` | `Marketing123!` |
| Jugador | `ana@gmail.com` | `Jugador123!` |

### 🚧 Crear cuenta

La pestaña de crear cuenta:

- si permite crear cuentas nuevas de tipo `Jugador`
- no permite crear administradores ni marketing desde la vista publica
- guarda la cuenta creada de forma local en el navegador
- despues del registro, el jugador puede entrar a su cuenta e inscribirse al torneo desde su propia vista

### 💾 Donde se guarda

Por ahora todo se guarda en `localStorage` del navegador:

- usuarios: `bolkristal-users`
- sesion: `bolkristal-session`
- parejas: `bolkristal-teams`
- clientes: `bolkristal-clientes`
- torneo activo: `bolkristal-torneo-activo`
- bracket: `bolkristal-bracket-demo`
- configuracion del bracket: `bolkristal-bracket-builder`

> Importante: esto significa que una cuenta creada en un dispositivo o navegador no aparece automaticamente en otro. Si un usuario se registra en una laptop, no podra entrar desde otro celular o computadora a menos que exista un backend real con base de datos compartida.
> Tambien aplica para las parejas demo: si el navegador ya tiene inscripciones guardadas, esas reemplazan a los datos iniciales del prototipo.

---

## 🏆 Modulo de torneo

Es una de las partes mas completas del proyecto.

### Lo que ya hace

- bracket eliminatorio desde `16avos` hasta `Final`
- inicio configurable en:
  `16avos`, `8avos`, `Cuartos`, `Semifinal` o `Final`
- seleccion de parejas inscritas
- sorteo de posiciones
- validacion de cupo minimo exacto segun la fase elegida
- avance de rondas
- asignacion estimada de fecha, hora y pista para el cruce oficial
- mensaje al jugador cuando gana y avanza
- mensaje especial de felicitacion cuando gana la final del torneo
- campeon visual con pino y corona
- guardado local del estado del torneo

### Estado actual del bracket

- el bracket compacto ya no se edita con clic
- el bracket grande ya no funciona como editor manual
- el jugador lo ve en solo lectura
- el admin controla el avance desde el bloque del enfrentamiento actual dentro del mismo modulo `Torneo Boliche`
- ya no existe un modulo aparte de `Jornadas` con rivales distintos al cuadro oficial
- el rival que ve el jugador sale del mismo cuadro oficial que administra el panel

---

## 🎳 Captura del enfrentamiento actual

Dentro del torneo existe un bloque de captura para el duelo activo.

### Incluye

- score por pareja
- 10 frames por pareja
- validacion de tiros
- calculo de score de boliche
- avance automatico del ganador

### Mejoras aplicadas

- el frame 10 solo se expande si aparece el tiro bonus
- los tiros se habilitan de forma guiada
- si hay strike se bloquea el segundo tiro del frame
- ya no brinca automaticamente al siguiente campo al escribir
- se pueden capturar valores como `10` sin problema
- se quitaron las flechas de los inputs numericos

---

## 📝 Inscripciones

La inscripcion del torneo ya funciona tanto para jugador como para administrador.

Incluye:

- formulario de alta de parejas
- inscripcion en linea desde la cuenta del jugador
- validacion de campos obligatorios
- validacion de pareja obligatoria
- validacion para evitar jugadores o equipos repetidos
- costo segun categoria
- bloqueo automatico si la convocatoria esta cerrada
- bloqueo automatico cuando ya no hay cupos
- tabla de directorio
- conteo por categoria
- total de parejas registradas

Categorias actuales:

- `Profesional`
- `Principiante`

---

## 👥 Clientes y promociones

### Clientes

El directorio de clientes muestra:

- nombre y contacto
- visitas
- torneos jugados
- consumo
- promociones usadas
- filtros y segmentos visuales

### Promociones

El modulo de promociones ya permite:

- ver promos activas
- registrar nuevas promos en pizarra
- simular canje de promo
- simular alcance promocional en redes

> El boton de redes **no publica de verdad** en Facebook o Instagram. Solo incrementa un contador local y muestra una notificacion visual.

---

## 📱 Responsividad y UX

Durante el desarrollo se trabajaron muchos ajustes:

- menu hamburguesa para vista publica
- menu hamburguesa para vista de jugador
- menu hamburguesa para panel admin
- panel admin mas compacto
- mejor uso de espacio en movil
- modal de acceso mas claro
- botones de login y registro mejor alineados
- formulario de score mas usable
- bracket movil mas visible y desplazable
- textos menos tecnicos y mas orientados al negocio

---

## 🗂️ Estructura del proyecto

```text
BolKristal/
|- README.md
|- diagramas/
|  |- Diagrama_AS-IS.pdf
|  |- Diagrama_ER.mwb
|  |- Diagrama_ER.pdf
|  |- Diagrama_TO-BE.pdf
|- documentacion/
|  |- 02-Matriz_Requerimientos_Validada.xlsx
|  |- Caso_Estudio_BolKristal.docx
|  |- Entrevista_BolKristal.docx
|  |- Guia_Entrevistas_Matriz_BolKristal.docx
|  |- Matriz_Trazabilidad_BolKristal.xlsx
|- minutas/
|  |- MInuta Primera Reunion.pdf
|  |- Minuta Segunda Reunion.pdf
|  |- Minuta Validación Prototipo.pdf
|- prototipo/
|  |- index.html
|  |- styles/
|  |  |- neon.css
|  |- js/
|  |  |- app.js
|  |- images/
|     |- champion-bowling-crown.png
|     |- champion-pin-crown.png
|     |- hero-bowling-party.png
|     |- neon_banner.png
|     |- party-package.png
|     |- tournament-strike.png
```

### Distribucion por carpetas

- `diagramas/`: contiene los diagramas del proyecto, incluyendo el modelo editable `Diagrama_ER.mwb` y su version en pdf `Diagrama_ER.pdf`, diagramas de proceso de negocio `Diagrama_AS-IS.pdf` y `Diagrama_TO-BE.pdf`.
- `documentacion/`: reune los documentos base del proyecto, como `Caso_Estudio_BolKristal.docx`, `Entrevista_BolKristal.docx`, `Guia_Entrevistas_Matriz_BolKristal.docx`, `02-Matriz_Requerimientos_Validada.xlsx` y `Matriz_Trazabilidad_BolKristal.xlsx`.
- `minutas/`: guarda evidencia de reuniones y validaciones del proyecto, incluyendo `MInuta Primera Reunion.pdf`, `Minuta Segunda Reunion.pdf` y `Minuta Validación Prototipo.pdf`.
- `prototipo/`: contiene el prototipo web funcional en `HTML`, `CSS` y `JavaScript`.

---

## 🧪 Tecnologias

<div align="center">

![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=111)
![Storage](https://img.shields.io/badge/localStorage-444?style=for-the-badge)

</div>

---

## ✅ Estado actual

Hoy el prototipo ya sirve para:

- presentar visualmente la marca
- crear cuentas de jugador
- iniciar sesion con usuarios demo
- navegar entre vista publica, jugador y admin
- inscribir parejas desde la cuenta del jugador
- administrar parejas inscritas
- generar y seguir un bracket
- capturar scores del enfrentamiento actual
- mostrar al jugador si avanzo o si gano el torneo
- mostrar clientes y promociones

---

## ⚠️ Limitaciones actuales

Todavia no incluye:

- backend real
- base de datos compartida
- sincronizacion entre navegadores
- sincronizacion entre dispositivos
- analiticas personalizadas por jugador
- persistencia compartida entre cuentas y torneos fuera del navegador actual
- publicacion real a redes sociales

---

## 🎯 Siguiente paso recomendado

Si este prototipo sigue creciendo, el paso mas importante seria conectar:

- usuarios
- parejas inscritas
- enfrentamientos
- resultados
- estadisticas

con una persistencia real para que funcione igual en cualquier navegador o dispositivo.

---

## 💖 Acceso final

<div align="center">

[![Entrar a BolKristal](https://img.shields.io/badge/🎳%20Entrar%20a%20BolKristal-ff0055?style=for-the-badge&logoColor=white)](https://slorms.github.io/BolKristal/prototipo/)

</div>

<!-- Despliegue automatico Vercel -->
