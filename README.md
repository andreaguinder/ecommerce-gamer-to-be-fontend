# 🚀 Gamer To Be — Frontend E-commerce

Interfaz web interactiva desarrollada para el e-commerce **Gamer To Be**, conectada a una API RESTful propia (Node.js/Express) y desplegada en producción a través de Vercel.

🌐 **Enlace al Frontend en Producción (Vercel):** [https://tu-frontend.vercel.app](https://tu-frontend.vercel.app) *(reemplazá con tu URL exacta)*  
🔌 **Backend asociado (Render):** [https://gamer-to-be.onrender.com](https://gamer-to-be.onrender.com)

---

## 🛠️ Tech Stack & Herramientas

- **Framework / Interfaz:** Desarrollado con asistencia de Lovable / React + Vite
- **Tipado:** TypeScript
- **Enrutamiento y Estado:** React Router / TanStack Query
- **Estilos:** Tailwind CSS / SASS Modules
- **Gestión de Peticiones:** Fetch API / Axios configurado con interceptores para JWT
- **Despliegue:** Vercel

---

## 📂 Estructura Principal del Proyecto

```text
src/
├── assets/         # Recursos estáticos (banners, imágenes)
├── components/     # Componentes modulares y UI (AdminPanel, AdminTable, ProductCard, ContactForm, etc.)
├── context/        # Contextos globales (AuthContext para manejo de sesiones)
├── hooks/          # Custom hooks reutilizables (useProducts, etc.)
├── lib/            # Utilidades de configuración y manejo de errores
├── routes/         # Vistas y páginas basadas en archivos (__root.tsx, admin, contacto, index, login, productos)
├── services/       # Servicios centralizados para la comunicación con la API (authService, productService, contactService, http)
├── test/           # Pruebas y configuración de testing
├── types/          # Interfaces y tipados de TypeScript (product.ts)
└── utils/          # Funciones de utilidad general
```

## ⚙️ Instalación y Ejecución Local

### Prerrequisitos
- Node.js (v18 o superior)

### Pasos de Configuración

1. **Clonar el repositorio y navegar a la carpeta del servidor:**
   ```bash
   git clone <https://github.com/andreaguinder/ecommerce-gamer-to-be-fontend.git>
   ```

2. **Instalar las dependencias**

```bash
    npm install
```
3. **Configurar las variables de entorno**

Creá un archivo llamado **`.env`** en la raíz del proyecto (al mismo nivel que el `package.json`) y agregá la siguiente variable con tus datos de conexión:

```bash
VITE_API_URL=https://gamer-to-be.onrender.com
```

4. Ejecutar la aplicación

```bash
    npm run dev
```

---

## 📡 Integración y Consumo de la API

La aplicación interactúa dinámicamente con el backend mediante servicios dedicados (`src/services/`):
* **Catálogo de Productos (GET):** Consulta y renderiza en tiempo real los productos alojados en la base de datos de MongoDB Atlas.
* **Formulario de Contacto (POST):** Envía las consultas de los usuarios directo al servidor.
* **Panel de Administración (CRUD Protegido):** Permite a los usuarios con permisos de administrador crear, actualizar y eliminar productos enviando el token JWT mediante el header `Authorization`.
* **Manejo de Errores y Estados:** La interfaz gestiona estados de carga y captura fallas de red o respuestas no autorizadas (401).

---

## 📸 Capturas de Pantalla (Evidencias de Funcionamiento)

1. **Datos obtenidos desde la API (GET):**
   * Vista de productos consumiendo el backend.
2. **Formulario enviando datos (POST):**
   * Envío exitoso de consultas de contacto o altas de productos.
3. **Manejo de Estados y Errores:**
   * Indicadores visuales y retroalimentación en la interfaz.

---

## 👤 Créditos y Datos de la Entrega

* **Estudiante:** Andrea Guinder
* **Curso / Comisión:** UTN BA e-learning (Comisión 181805)
* **Entrega:** Trabajo Práctico / Proyecto Final Integrador Frontend

---

## 📚 Bibliografía y Fuentes

* Lovable.
* Material teórico y clases grabadas del curso de Programación Web Full Stack de la Universidad Tecnológica Nacional (UTN BA).