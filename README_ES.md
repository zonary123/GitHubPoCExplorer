# GitHub PoC Explorer 🛡️

**Español** | [English](README.md)

---

**GitHub PoC Explorer** es una herramienta avanzada y minimalista diseñada para analistas de seguridad, investigadores y entusiastas de la ciberseguridad. Permite realizar búsquedas rápidas y eficientes de Proof of Concepts (PoCs) alojados en GitHub, utilizando la base de datos de [PoC-in-GitHub](https://poc-in-github.motikan2010.net/).

La aplicación está diseñada con un enfoque en la agilidad, permitiendo pasar de un ID de CVE a un repositorio de exploit en cuestión de segundos.

## ✨ Características Principales

- **Búsqueda Instantánea por CVE**: Encuentra exploits específicos simplemente ingresando el ID del CVE (ej. `CVE-2023-48795`).
- **Sanitización de Entrada**: Limpieza automática de espacios y caracteres extraños para asegurar búsquedas precisas.
- **Filtros Avanzados**:
  - **Ordenación**: Alterna entre los PoCs más recientes o los más populares (por número de estrellas).
  - **Umbral de Estrellas**: Filtra resultados en tiempo real para encontrar solo los repositorios con mayor impacto.
- **Diseño Premium**: Interfaz moderna basada en *Glassmorphism* con soporte completo para modo oscuro.
- **Flujo de Trabajo Optimizado**:
  - Copiado rápido de IDs de CVE al portapapeles.
  - Enlaces directos a los repositorios de GitHub.
  - Vistas expandibles con descripciones detalladas de las vulnerabilidades.

## 🚀 Tecnologías Utilizadas

- **Frontend**: [React](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- **Iconografía**: [Lucide React](https://lucide.dev/)
- **Estilos**: CSS3 Moderno (Variables, Flexbox, Grid, Animaciones)
- **API**: [PoC-in-GitHub API](https://poc-in-github.motikan2010.net/api/v1/)

## 🛠️ Instalación y Configuración

Para ejecutar este proyecto localmente, sigue estos pasos:

1. **Clonar el repositorio**:
   ```bash
   git clone <url-del-repositorio>
   cd GitHubPoCExplorer
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   ```

3. **Iniciar el servidor de desarrollo**:
   ```bash
   npm run dev
   ```

4. **Acceder a la aplicación**:
   Abre tu navegador en `http://localhost:5173`.

## 📡 Configuración del Proxy (CORS)

Debido a que la API de PoC-in-GitHub no permite peticiones directas desde el navegador (CORS), este proyecto utiliza el servidor de desarrollo de Vite como proxy. La configuración se encuentra en `vite.config.js`.

## ⚠️ Descargo de Responsabilidad / Disclaimer

Esta herramienta tiene fines exclusivamente educativos y de investigación. El autor no se hace responsable del mal uso, daños o actividades ilegales realizadas con esta aplicación. Utilízala con responsabilidad y siempre dentro del marco legal y las políticas de GitHub.

---
Desarrollado con ❤️ para la comunidad de seguridad.
