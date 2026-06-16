# BolKristal

Portal web prototipo para **BolKristal Lounge & Sports Bar**, diseñado para mostrar una experiencia separada por tipo de usuario:

- **Vista pública** para presentar el negocio.
- **Vista de cliente** con contenido de interés como historia, promociones y beneficios.
- **Vista de administrador** para operar torneos, clientes, promociones y reportes.

Este proyecto fue pensado como una propuesta visual y funcional para una plataforma de gestión y atención digital dentro de un bar temático con boliche, billar y promociones comerciales.

---

## Vista General

BolKristal no solo muestra información del negocio, también plantea una experiencia de acceso por perfiles:

- Un visitante puede entrar a una **landing page pública**.
- Un usuario registrado como **cliente** accede a una vista enfocada en contenido comercial e informativo.
- Un usuario con perfil **administrador** entra a un panel de gestión con herramientas operativas.

La aplicación funciona actualmente del lado del cliente con **HTML, CSS y JavaScript puro**, utilizando `localStorage` para simular cuentas y sesión.

---

## Características Principales

### Portal público

- Barra de navegación con acceso rápido a:
  - Quiénes somos
  - Nuestra historia
  - Promociones
  - Contacto
- Botones visibles de:
  - `Iniciar sesión`
  - `Crear cuenta`
- Modal de autenticación y registro desde la misma página principal

### Vista de cliente

- Sección de bienvenida personalizada
- Información sobre el negocio
- Historia de BolKristal
- Promociones destacadas
- Beneficios potenciales para clientes frecuentes

### Panel de administrador

- Resumen general del negocio
- Gestión de torneo de boliche
- Registro de equipos
- Tabla de clasificación
- Generación de jornadas
- Captura de marcadores
- Directorio de clientes frecuentes
- Gestión de promociones
- Reportes de demanda y rentabilidad
- Controles visuales como luces y jukebox temática

---

## Roles de Usuario

El sistema contempla dos roles:

| Rol | Acceso |
|---|---|
| `cliente` | Vista enfocada en contenido, promociones e identidad del negocio |
| `admin` | Panel interno con herramientas operativas |

Cuando un usuario inicia sesión o crea una cuenta, el sistema detecta el rol y lo redirige automáticamente a la vista correspondiente.

---

## Credenciales Demo

Puedes probar el flujo administrativo con esta cuenta:

```txt
Correo: admin@bolkristal.com
Contraseña: Admin123!
```

También existe una cuenta cliente de ejemplo:

```txt
Correo: cliente@bolkristal.com
Contraseña: Cliente123!
```

---

## Tecnologías Utilizadas

- **HTML5**
- **CSS3**
- **JavaScript Vanilla**
- **Font Awesome** para iconografía
- **Google Fonts** para tipografía visual
- **localStorage** para persistencia simple de usuarios y sesión

---

## Estructura del Proyecto

```txt
BolKristal_Bar/
│
├── index.html
├── README.md
├── images/
│   └── neon_banner.png
├── js/
│   └── app.js
└── styles/
    └── neon.css
```

---

## Cómo Ejecutarlo

Este proyecto no requiere instalación de dependencias.

### Opción 1: abrir directamente

Abre el archivo `index.html` en tu navegador.

### Opción 2: usar un servidor local

Si prefieres probarlo con un servidor local, puedes usar cualquiera de estas opciones:

```bash
# Con VS Code Live Server
Abrir index.html con Live Server
```

```bash
# Con Python
python -m http.server
```

Luego abre en tu navegador una ruta similar a:

```txt
http://localhost:8000/
```

---

## Flujo de Uso

### 1. Entrada pública

El usuario llega a la página principal y puede:

- explorar información del negocio
- revisar promociones
- abrir el modal de autenticación

### 2. Iniciar sesión o crear cuenta

Desde el modal puede:

- iniciar sesión con una cuenta existente
- registrarse como `cliente` o `admin`

### 3. Redirección por rol

- Si la cuenta es `cliente`, entra a la vista de cliente.
- Si la cuenta es `admin`, entra al panel administrativo.

### 4. Persistencia local

La sesión queda guardada en `localStorage`, por lo que al recargar la página se intenta restaurar automáticamente.

---

## Diseño y Enfoque Visual

El proyecto utiliza una estética **neón / lounge / nightlife**, alineada con la identidad del negocio:

- fondos oscuros con degradados
- tarjetas tipo glassmorphism
- acentos en rosa, cian, verde y amarillo neón
- navegación moderna
- modal de acceso integrado
- diseño responsive para escritorio y móvil

---

## Estado Actual del Proyecto

Actualmente el sistema funciona como **prototipo funcional de interfaz**:

- la autenticación es simulada con almacenamiento local
- no existe backend conectado
- no hay base de datos real
- la información administrativa se mantiene en memoria durante la ejecución

Esto lo hace ideal para:

- demostraciones académicas
- presentación de propuesta funcional
- validación de requerimientos
- evolución futura hacia una aplicación completa

---

## Mejoras Futuras Recomendadas

- Conectar autenticación con backend real
- Guardar usuarios en base de datos
- Implementar recuperación de contraseña
- Agregar reservas en línea
- Crear historial real de visitas y promociones
- Incorporar panel de métricas dinámicas
- Separar vistas en componentes o módulos más escalables
- Migrar a un framework como React, Vue o Angular si el proyecto crece

---

## Objetivo del Proyecto

Este proyecto busca demostrar cómo una misma plataforma puede atender necesidades distintas dentro del negocio:

- **marketing y presentación** para visitantes
- **experiencia informativa** para clientes
- **operación interna** para administración

La separación por perfiles mejora la organización del sistema y hace más clara la experiencia de uso para cada tipo de usuario.

---

## Autoría

Proyecto desarrollado como prototipo para **BolKristal Lounge & Sports Bar**, con enfoque en experiencia visual, navegación por roles y validación funcional.

Si este repositorio se publica en GitHub, este `README` puede servir como base oficial de presentación del proyecto.
