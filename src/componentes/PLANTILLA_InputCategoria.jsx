import { useState } from 'react';
import InputProducto from './InputProducto';
import { crearCarne } from '../Services/api';

/**
 * EJEMPLO DE PLANTILLA PARA INPUTCARNE.JSX
 * Copia este archivo y modifica según la categoría
 */
const InputCarneEjemplo = ({ onCarneCreada }) => {
  const [datosGenerales, setDatosGenerales] = useState(null);
  
  // TODO: Modifica estos campos según los atributos específicos de CARNE
  const [datosCarne, setDatosCarne] = useState({
    tipo_corte: '',              // Ejemplo: "Filete", "Chuleta", "Molida"
    fecha_caducidad: '',          // Ejemplo: "2025-12-31"
    temperatura_conservacion: '', // Ejemplo: "-18°C"
    origen: '',                   // Ejemplo: "Nacional", "Importado"
  });
  
  const [cargando, setCargando] = useState(false);

  const handleDatosGeneralesChange = (datos) => {
    setDatosGenerales(datos);
  };

  const handleCarneChange = (e) => {
    const { name, value, type, checked } = e.target;
    setDatosCarne({
      ...datosCarne,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!datosGenerales) {
      alert('Por favor completa todos los campos generales');
      return;
    }

    setCargando(true);

    // Construir objeto completo
    const nuevaCarne = {
      // Datos generales del producto
      nombre: datosGenerales.nombre,
      precio: parseFloat(datosGenerales.precio),
      stock: parseInt(datosGenerales.stock),
      id_ubicacion: parseInt(datosGenerales.id_ubicacion),
      
      // TODO: Datos específicos de carne (modifica según tu esquema)
      tipo_corte: datosCarne.tipo_corte,
      fecha_caducidad: datosCarne.fecha_caducidad,
      temperatura_conservacion: datosCarne.temperatura_conservacion,
      origen: datosCarne.origen,

      // Tipo Compuesto (Dimensiones)
      dims: {
        medida_alto: parseFloat(datosGenerales.dims.medida_alto) || 0,
        medida_ancho: parseFloat(datosGenerales.dims.medida_ancho) || 0,
        medida_profundidad: parseFloat(datosGenerales.dims.medida_profundidad) || 0,
        unidad_medida: datosGenerales.dims.unidad_medida,
      },
    };

    try {
      await crearCarne(nuevaCarne);
      alert('¡Carne creada exitosamente!');
      
      // Resetear formulario
      setDatosCarne({
        tipo_corte: '',
        fecha_caducidad: '',
        temperatura_conservacion: '',
        origen: '',
      });
      
      // Notificar al componente padre
      onCarneCreada && onCarneCreada();
      
      // Recargar página para resetear InputProducto
      window.location.reload();
    } catch (error) {
      alert('Error al crear carne: ' + error.message);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 border-b pb-2">Crear Nueva Carne</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Componente Reutilizable - Datos Generales */}
        <InputProducto onDatosChange={handleDatosGeneralesChange} />

        {/* TODO: Datos Específicos de Carne - MODIFICA ESTOS CAMPOS */}
        <div>
          <h3 className="text-sm font-semibold text-red-600 uppercase mb-3">
            Datos de Carne (Herencia)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="tipo_corte"
              value={datosCarne.tipo_corte}
              onChange={handleCarneChange}
              placeholder="Tipo de Corte"
              className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <input
              type="date"
              name="fecha_caducidad"
              value={datosCarne.fecha_caducidad}
              onChange={handleCarneChange}
              placeholder="Fecha de Caducidad"
              className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <input
              type="text"
              name="temperatura_conservacion"
              value={datosCarne.temperatura_conservacion}
              onChange={handleCarneChange}
              placeholder="Temperatura de Conservación"
              className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <select
              name="origen"
              value={datosCarne.origen}
              onChange={handleCarneChange}
              className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="">Seleccionar Origen</option>
              <option value="nacional">Nacional</option>
              <option value="importado">Importado</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={cargando}
          className="w-full bg-red-600 text-white font-bold py-3 px-4 rounded hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {cargando ? 'Guardando...' : 'Guardar en Base de Datos'}
        </button>
      </form>
    </div>
  );
};

export default InputCarneEjemplo;

/* 
 * INSTRUCCIONES PARA USAR ESTA PLANTILLA:
 * 
 * 1. Copia este archivo y renómbralo a InputCarne.jsx
 * 2. Renombra la función de InputCarneEjemplo a InputCarne
 * 3. Modifica el estado datosCarne con los campos reales de tu tabla
 * 4. Actualiza los inputs en el formulario según tus necesidades
 * 5. Verifica que el objeto nuevaCarne tenga la estructura correcta
 * 6. Cambia los colores si quieres (red-600 por el color de tu categoría)
 * 7. Importa este componente en Contenido.jsx:
 * 
 *    import InputCarne from '../componentes/InputCarne';
 * 
 *    // En el JSX, agrega:
 *    {categoria === 'carnes' && (
 *      <div className="mb-8">
 *        <InputCarne onCarneCreada={handleProductoCreado} />
 *      </div>
 *    )}
 * 
 * 8. ¡Listo! Repite para las demás categorías
 */
