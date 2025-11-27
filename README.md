# 📦 Sistema de Inventario ORDBMS - Frontend

Frontend React para sistema de inventario con soporte para **Herencia de Tablas**, **Tipos Compuestos (UDT)** y **Métodos SQL** en PostgreSQL.

## 🚀 Inicio Rápido

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# La aplicación estará disponible en http://localhost:5173
```

## ✨ Características

- ✅ **Navegación por categorías** (8 tipos de productos)
- ✅ **Componentes reutilizables** (InputProducto para todos los formularios)
- ✅ **Gestión de Bebidas completa** (crear, listar, eliminar)
- ✅ **API centralizada** en `Services/api.jsx`
- ✅ **Tabla polimórfica** mostrando herencia de PostgreSQL
- ✅ **Soporte para UDT** (tipos compuestos - dimensiones)
- ✅ **Métodos SQL** (calcular valor de inventario)
- ✅ **Diseño moderno** con Tailwind CSS

## 📁 Estructura del Proyecto

```
src/
├── Services/
│   └── api.jsx                 # 🔧 Servicios API centralizados
├── componentes/
│   ├── InputProducto.jsx       # 📝 Formulario reutilizable (base)
│   ├── InputBebida.jsx         # 🥤 Formulario de Bebidas
│   └── Producto.jsx            # 📋 Tabla de productos
├── pages/
│   ├── Home.jsx                # 🏠 Página principal
│   ├── Contenido.jsx           # 📄 Página dinámica por categoría
│   └── PaginaBebidas.jsx       # 🥤 Ejemplo completo
└── routes/
    └── Router.jsx              # 🛣️ Rutas de la aplicación
```

## 🎯 Componentes Principales

### 1️⃣ InputProducto (Reutilizable)
Campos comunes para **todos** los productos:
- Datos generales (nombre, precio, stock, ubicación)
- Tipo compuesto UDT (dimensiones)

### 2️⃣ InputBebida (Específico)
Formulario completo para bebidas:
- Incluye InputProducto
- Campos específicos (marca, sabor, envase, capacidad, retornable)
- Integración con API

### 3️⃣ Producto (Tabla)
Visualización de productos:
- Consulta polimórfica (muestra herencia)
- Filtrado por categoría
- Acciones: eliminar, calcular valor SQL

## 🌐 API Backend

La aplicación espera un backend en `http://localhost:8000` con estos endpoints:

```
GET    /productos/                     # Listar todos
GET    /productos/{id}                 # Obtener uno
DELETE /productos/{id}                 # Eliminar
GET    /productos/{id}/valor-inventario # Método SQL

POST   /productos/bebidas              # Crear bebida
POST   /productos/carnes               # Crear carne
... (8 categorías en total)
```

## 📊 Categorías Disponibles

| Categoría | Ruta | Estado Formulario |
|-----------|------|-------------------|
| 🥤 Bebidas | `/contenido/bebidas` | ✅ Completo |
| 🥩 Carnes | `/contenido/carnes` | ⏳ Pendiente |
| 🛒 Abarrotes | `/contenido/abarrotes` | ⏳ Pendiente |
| 🍬 Dulces | `/contenido/dulces` | ⏳ Pendiente |
| 🥫 Enlatados | `/contenido/enlatados` | ⏳ Pendiente |
| 🍷 Licores | `/contenido/licores` | ⏳ Pendiente |
| 🧹 Limpieza | `/contenido/limpieza` | ⏳ Pendiente |
| 🥖 Panadería | `/contenido/panaderia` | ⏳ Pendiente |

## 🔨 Cómo Crear Nuevos Formularios

1. **Copia** `InputBebida.jsx` como plantilla
2. **Renombra** a `InputCarne.jsx` (o tu categoría)
3. **Modifica** los campos específicos
4. **Usa** la API correspondiente de `Services/api.jsx`
5. **Actualiza** `Contenido.jsx` para incluirlo

Ver documentación completa en [ARQUITECTURA.md](./ARQUITECTURA.md)

## 🎨 Tecnologías

- **React 19** - Framework UI
- **React Router DOM** - Navegación
- **Tailwind CSS** - Estilos (vía CDN)
- **Vite** - Build tool
- **Fetch API** - Peticiones HTTP

## 📝 Notas Importantes

- ⚠️ **CORS**: El backend debe permitir `http://localhost:5173`
- ⚠️ **Puerto**: Backend en puerto `8000` (configurable en `api.jsx`)
- ✅ Por ahora solo **Bebidas** tiene formulario completo
- ✅ La tabla **Producto.jsx** funciona para todas las categorías

## 🔜 Roadmap

- [ ] Formularios para las 7 categorías restantes
- [ ] Edición de productos existentes
- [ ] Paginación en la tabla
- [ ] Búsqueda y filtros avanzados
- [ ] Toast notifications (reemplazar alerts)
- [ ] Validación de formularios mejorada
- [ ] Manejo de errores más robusto

## 📚 Documentación Adicional

- [ARQUITECTURA.md](./ARQUITECTURA.md) - Guía detallada de componentes
- Ver comentarios JSDoc en cada componente

## 🐛 Troubleshooting

**Error de conexión a la API**
```bash
# Verifica que el backend esté corriendo
curl http://localhost:8000/productos/

# Revisa la consola del navegador (F12)
```

**No se muestran productos**
- Verifica que haya datos en PostgreSQL
- Revisa DevTools > Network > Response

---

**Desarrollado con ❤️ para proyecto de Base de Datos Orientadas a Objetos**

