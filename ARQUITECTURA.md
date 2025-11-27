# 📦 Sistema de Inventario ORDBMS - Frontend

Sistema de gestión de inventario con soporte para herencia, tipos compuestos (UDT) y métodos SQL en PostgreSQL.

## 🏗️ Arquitectura de Componentes

### 📁 Estructura del Proyecto

```
src/
├── Services/
│   └── api.jsx                 # Servicios API centralizados
├── componentes/
│   ├── InputProducto.jsx       # Formulario reutilizable (datos generales)
│   ├── InputBebida.jsx         # Formulario específico de Bebidas
│   └── Producto.jsx            # Tabla de productos (polimórfica)
├── pages/
│   ├── Home.jsx                # Página principal con categorías
│   ├── Contenido.jsx           # Página dinámica por categoría
│   └── PaginaBebidas.jsx       # Ejemplo de página completa
└── routes/
    └── Router.jsx              # Configuración de rutas
```

## 🧩 Componentes Principales

### 1. **InputProducto.jsx** (Componente Reutilizable)
Maneja los campos comunes de todos los productos:
- ✅ Datos generales (nombre, precio, stock, ubicación)
- ✅ Tipo compuesto UDT (dimensiones físicas)

**Props:**
- `onDatosChange`: Callback que retorna los datos actualizados
- `valoresIniciales`: Objeto con valores predeterminados (opcional)

**Uso:**
```jsx
<InputProducto 
  onDatosChange={(datos) => setDatosGenerales(datos)} 
/>
```

### 2. **InputBebida.jsx** (Componente Específico)
Formulario completo para crear bebidas:
- ✅ Incluye `InputProducto` para datos generales
- ✅ Campos específicos de bebida (marca, sabor, envase, etc.)
- ✅ Integración con API
- ✅ Manejo de estado y validación

**Props:**
- `onBebidaCreada`: Callback ejecutado después de crear exitosamente

**Uso:**
```jsx
<InputBebida onBebidaCreada={() => recargarTabla()} />
```

### 3. **Producto.jsx** (Tabla Polimórfica)
Muestra productos de la base de datos:
- ✅ Consulta polimórfica (superclase + subclases)
- ✅ Filtrado por categoría
- ✅ Acciones: eliminar, calcular valor (método SQL)
- ✅ Visualización de tipos compuestos (UDT)

**Props:**
- `categoria`: Filtra productos por tipo (opcional)
- `onRecargar`: Trigger para recargar datos

**Uso:**
```jsx
<Producto categoria="bebida" onRecargar={contador} />
```

## 🌐 Servicio API (api.jsx)

Centraliza todas las llamadas al backend:

### Métodos Generales
```javascript
obtenerProductos()              // GET /productos/
obtenerProductoPorId(id)        // GET /productos/{id}
eliminarProducto(id)            // DELETE /productos/{id}
calcularValorInventario(id)     // GET /productos/{id}/valor-inventario
```

### Métodos por Categoría
```javascript
// Bebidas
obtenerBebidas()
crearBebida(bebidaData)

// Carnes
obtenerCarnes()
crearCarne(carneData)

// ... (8 categorías en total)
```

## 🎯 Flujo de Datos

### Creación de Producto (Ejemplo: Bebida)

```
1. Usuario completa InputProducto
   ↓
2. Datos generales enviados a InputBebida
   ↓
3. Usuario completa campos específicos
   ↓
4. Al submit: combina datos generales + específicos
   ↓
5. Llama a crearBebida(datos) del servicio API
   ↓
6. Backend guarda en PostgreSQL
   ↓
7. Callback onBebidaCreada() recarga tabla
```

## 📋 Formato de Datos

### Objeto Bebida Completo
```javascript
{
  // Datos generales (heredados)
  nombre: "Coca Cola",
  precio: 2.50,
  stock: 100,
  id_ubicacion: 1,
  
  // Datos específicos (subclase)
  marca: "Coca Cola Company",
  sabor: "Original",
  envase: "plastico",
  capacidad_ml: 500,
  es_retornable: true,
  
  // Tipo compuesto UDT
  dims: {
    medida_alto: 20.5,
    medida_ancho: 6.5,
    medida_profundidad: 6.5,
    unidad_medida: "cm"
  }
}
```

## 🚀 Cómo Usar

### Crear un nuevo formulario de categoría

1. **Copia InputBebida.jsx** como plantilla
2. **Renombra** a `InputCarne.jsx` (o la categoría correspondiente)
3. **Modifica** los campos específicos
4. **Importa** el servicio API correspondiente:
   ```javascript
   import { crearCarne } from '../Services/api';
   ```
5. **Actualiza** el objeto de datos antes del submit

### Ejemplo: InputCarne.jsx
```javascript
const [datosCarne, setDatosCarne] = useState({
  tipo_corte: '',
  fecha_caducidad: '',
  temperatura_conservacion: '',
  origen: ''
});

// En el submit:
const nuevaCarne = {
  ...datosGenerales,
  ...datosCarne,
  dims: datosGenerales.dims
};

await crearCarne(nuevaCarne);
```

## 🔧 Requisitos del Backend

Tu API debe implementar estos endpoints:

```
GET    /productos/                    # Listar todos
GET    /productos/{id}                # Obtener uno
DELETE /productos/{id}                # Eliminar
GET    /productos/{id}/valor-inventario  # Método SQL

POST   /productos/bebidas             # Crear bebida
POST   /productos/carnes              # Crear carne
... (otros endpoints por categoría)
```

## 🎨 Estilos

- **Tailwind CSS** (vía CDN en index.html)
- **App.css** para componentes custom (Home, categorías)
- **index.css** para estilos globales

## 📝 Notas Importantes

1. **CORS**: Asegúrate que el backend tenga CORS habilitado para `http://localhost:5173`
2. **Puerto**: Backend debe correr en `http://localhost:8000`
3. **Validación**: Los componentes tienen validación básica, añade más según necesites
4. **Error Handling**: Implementado con try/catch y alerts (mejorable con toasts)

## 🔜 Próximos Pasos

- [ ] Crear formularios para las otras 7 categorías
- [ ] Implementar edición de productos
- [ ] Mejorar estilos de la tabla Producto.jsx
- [ ] Añadir paginación
- [ ] Implementar búsqueda/filtros
- [ ] Toast notifications en vez de alerts

## 🐛 Troubleshooting

**Error: "Error conectando a la API"**
- ✅ Verifica que el backend esté corriendo
- ✅ Revisa la consola del navegador para detalles
- ✅ Confirma que el puerto sea 8000

**No se muestran productos**
- ✅ Verifica que haya datos en la base de datos
- ✅ Revisa el filtro por categoría
- ✅ Abre DevTools > Network para ver la respuesta

---

**Desarrollado con ❤️ usando React + Vite + Tailwind CSS**
