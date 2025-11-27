# 🎓 Guía de Uso Rápido - Sistema de Inventario

## 📋 Resumen de lo Creado

### ✅ Archivos Funcionales Completos

```
✅ Services/api.jsx              - API completa para 8 categorías
✅ componentes/InputProducto.jsx - Formulario base reutilizable
✅ componentes/InputBebida.jsx   - Formulario de Bebidas (COMPLETO)
✅ componentes/Producto.jsx      - Tabla polimórfica (COMPLETO)
✅ pages/Home.jsx                - Página principal con botones
✅ pages/Contenido.jsx           - Página dinámica por categoría
✅ pages/PaginaBebidas.jsx       - Ejemplo de página completa
✅ routes/Router.jsx             - Rutas configuradas
✅ App.jsx                       - App principal actualizada
✅ index.html                    - Con Tailwind CSS
```

### 📝 Archivos de Plantilla/Referencia

```
📝 PLANTILLA_InputCategoria.jsx  - Plantilla para crear nuevos formularios
📝 ARQUITECTURA.md               - Documentación técnica completa
📝 README.md                     - Guía de inicio rápido
```

---

## 🚀 Cómo Iniciar

### 1. Iniciar el Frontend

```bash
cd /home/yeibby/Documents/practica-bdoo/InventarioFrontendBasico
npm install
npm run dev
```

La app estará en: **http://localhost:5173** (o 5174 si el puerto está ocupado)

### 2. Verificar Backend (Debe estar corriendo)

```bash
# Tu backend debe estar en http://localhost:8000
curl http://localhost:8000/productos/
```

---

## 🎯 Flujo de Trabajo Actual

### Para Bebidas (Ya funciona 100%)

1. Ve a **Home** → Click en botón **"Bebidas"**
2. Se abre `/contenido/bebidas`
3. Llena el formulario:
   - **Datos Generales**: nombre, precio, stock, ubicación
   - **Dimensiones**: alto, ancho, profundidad, unidad
   - **Datos de Bebida**: marca, sabor, envase, capacidad, retornable
4. Click en **"Guardar en Base de Datos"**
5. La tabla se recarga automáticamente mostrando la nueva bebida
6. Puedes **eliminar** o **calcular valor SQL** de cualquier producto

### Para Otras Categorías (Carnes, Abarrotes, etc.)

1. Ve a **Home** → Click en cualquier categoría
2. Se abre `/contenido/{categoria}`
3. Por ahora solo verás:
   - ⚠️ Mensaje: "Formulario en desarrollo"
   - ✅ Tabla de productos (si existen en la DB)

---

## 🔧 Cómo Crear Formulario para Otra Categoría

### Ejemplo: Crear InputCarne.jsx

#### Paso 1: Copiar la plantilla

```bash
cd src/componentes
cp PLANTILLA_InputCategoria.jsx InputCarne.jsx
```

#### Paso 2: Editar InputCarne.jsx

```javascript
// 1. Cambiar el import
import { crearCarne } from '../Services/api';

// 2. Renombrar la función
const InputCarne = ({ onCarneCreada }) => {

// 3. Modificar el estado según tus campos
const [datosCarne, setDatosCarne] = useState({
  tipo_corte: '',              // Tu campo real de la BD
  fecha_caducidad: '',         // Tu campo real de la BD
  temperatura_conservacion: '',// Tu campo real de la BD
  origen: '',                  // Tu campo real de la BD
});

// 4. En handleSubmit, construir el objeto correctamente
const nuevaCarne = {
  ...datosGenerales,
  tipo_corte: datosCarne.tipo_corte,
  fecha_caducidad: datosCarne.fecha_caducidad,
  temperatura_conservacion: datosCarne.temperatura_conservacion,
  origen: datosCarne.origen,
  dims: datosGenerales.dims
};

await crearCarne(nuevaCarne);

// 5. Cambiar el callback
onCarneCreada && onCarneCreada();

// 6. Export
export default InputCarne;
```

#### Paso 3: Actualizar Contenido.jsx

```javascript
// Importar el nuevo componente
import InputCarne from '../componentes/InputCarne';

// En el JSX, después del bloque de Bebidas:
{categoria === 'carnes' && (
  <div className="mb-8">
    <InputCarne onCarneCreada={handleProductoCreado} />
  </div>
)}
```

#### Paso 4: ¡Listo! Ahora Carnes tiene formulario

---

## 📊 Estructura de Datos (Ejemplo Bebida)

### Lo que envía el Frontend al Backend:

```json
{
  "nombre": "Coca Cola",
  "precio": 2.50,
  "stock": 100,
  "id_ubicacion": 1,
  "marca": "Coca Cola Company",
  "sabor": "Original",
  "envase": "plastico",
  "capacidad_ml": 500,
  "es_retornable": true,
  "dims": {
    "medida_alto": 20.5,
    "medida_ancho": 6.5,
    "medida_profundidad": 6.5,
    "unidad_medida": "cm"
  }
}
```

### Lo que el Backend debe retornar en GET /productos/:

```json
[
  {
    "id_prod": 1,
    "tipo_producto": "bebida",
    "nombre": "Coca Cola",
    "precio": 2.50,
    "stock": 100,
    "dims": {
      "medida_alto": 20.5,
      "medida_ancho": 6.5,
      "medida_profundidad": 6.5,
      "unidad_medida": "cm"
    }
  }
]
```

---

## 🔍 Endpoints Necesarios en el Backend

### Implementados en Services/api.jsx:

```javascript
// GENERALES
GET    /productos/                      ✅ obtenerProductos()
GET    /productos/{id}                  ✅ obtenerProductoPorId()
DELETE /productos/{id}                  ✅ eliminarProducto()
GET    /productos/{id}/valor-inventario ✅ calcularValorInventario()

// POR CATEGORÍA (Crear)
POST   /productos/bebidas               ✅ crearBebida()
POST   /productos/carnes                ✅ crearCarne()
POST   /productos/abarrotes             ✅ crearAbarrote()
POST   /productos/dulces                ✅ crearDulce()
POST   /productos/enlatados             ✅ crearEnlatado()
POST   /productos/licores               ✅ crearLicor()
POST   /productos/limpieza              ✅ crearLimpieza()
POST   /productos/panaderia             ✅ crearPanderia()
```

---

## 🎨 Personalización de Estilos

### Colores por Categoría (ya configurados)

```javascript
bebida    → Verde  (green-600)
carne     → Rojo   (red-600)
abarrote  → Amarillo (yellow-600)
dulce     → Rosa   (pink-600)
enlatado  → Azul   (blue-600)
licor     → Morado (purple-600)
limpieza  → Cyan   (cyan-600)
panaderia → Naranja (orange-600)
```

Para cambiar colores, busca en el componente:
- `focus:ring-COLOR-500` (color del borde al hacer focus)
- `bg-COLOR-600` (color del botón)
- `hover:bg-COLOR-700` (color del botón al pasar el mouse)

---

## 🐛 Solución de Problemas Comunes

### Error: "Error conectando a la API"

```bash
# Verificar que el backend esté corriendo
ps aux | grep python  # o el proceso de tu backend

# Verificar el puerto
curl http://localhost:8000/productos/

# Ver detalles del error
# Abre DevTools (F12) → Console → Network
```

### Error: "CORS policy"

Tu backend necesita permitir el origen del frontend:

```python
# Python/FastAPI ejemplo:
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### No se muestran productos en la tabla

1. Verifica que haya datos en PostgreSQL:
   ```sql
   SELECT * FROM productos;
   ```
2. Revisa la respuesta del backend en DevTools → Network
3. Verifica que `tipo_producto` en la BD coincida con la categoría

---

## 📚 Archivos de Referencia

| Archivo | Qué Consultar |
|---------|---------------|
| `ARQUITECTURA.md` | Documentación técnica completa |
| `README.md` | Guía rápida de inicio |
| `Services/api.jsx` | Ver todos los endpoints disponibles |
| `InputBebida.jsx` | Ejemplo de formulario completo |
| `PLANTILLA_InputCategoria.jsx` | Plantilla para nuevos formularios |
| `Producto.jsx` | Ver cómo se renderizan los productos |

---

## ✅ Checklist para Nuevas Categorías

- [ ] Copiar `PLANTILLA_InputCategoria.jsx`
- [ ] Renombrar a `Input{Categoria}.jsx`
- [ ] Modificar estado con campos específicos
- [ ] Actualizar JSX del formulario
- [ ] Verificar que use la función API correcta
- [ ] Importar en `Contenido.jsx`
- [ ] Agregar condición `{categoria === '...' && <Input... />}`
- [ ] Probar: crear, ver en tabla, eliminar

---

## 🎉 ¡Feliz Codificación!

Si tienes dudas:
1. Revisa `InputBebida.jsx` como ejemplo
2. Consulta `ARQUITECTURA.md` para detalles técnicos
3. Verifica la consola del navegador (F12)
4. Revisa los errores de ESLint en VS Code
