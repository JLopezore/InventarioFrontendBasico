import { useState } from 'react';
import InputProducto from './InputProducto';
import { crearLimpieza } from '../Services/api';
import { Sparkles, Save, Loader2 } from 'lucide-react';

const InputLimpieza = ({ onLimpiezaCreado }) => {
  const [datosGenerales, setDatosGenerales] = useState(null);
  const [datosLimpieza, setDatosLimpieza] = useState({
    presentacion: '',
    es_biodegradable: false,
    contenido_neto: '',
    unidad_contenido: '',
    uso_principal: '',
  });
  const [cargando, setCargando] = useState(false);

  const handleDatosGeneralesChange = (datos) => {
    setDatosGenerales(datos);
  };

  const handleLimpiezaChange = (e) => {
    const { name, value, type, checked } = e.target;
    setDatosLimpieza({
      ...datosLimpieza,
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

    const nuevaLimpieza = {
      nombre: datosGenerales.nombre,
      precio: parseFloat(datosGenerales.precio),
      stock: parseInt(datosGenerales.stock),
      id_ubicacion: parseInt(datosGenerales.id_ubicacion),
      
      presentacion: datosLimpieza.presentacion,
      es_biodegradable: datosLimpieza.es_biodegradable,
      contenido_neto: parseFloat(datosLimpieza.contenido_neto) || 0,
      unidad_contenido: datosLimpieza.unidad_contenido,
      uso_principal: datosLimpieza.uso_principal,

      dims: {
        medida_alto: parseFloat(datosGenerales.dims.medida_alto) || 0,
        medida_ancho: parseFloat(datosGenerales.dims.medida_ancho) || 0,
        medida_profundidad: parseFloat(datosGenerales.dims.medida_profundidad) || 0,
        unidad_medida: datosGenerales.dims.unidad_medida,
      },
    };

    try {
      await crearLimpieza(nuevaLimpieza);
      alert('¡Producto de limpieza creado exitosamente!');
      
      setDatosLimpieza({
        presentacion: '',
        es_biodegradable: false,
        contenido_neto: '',
        unidad_contenido: '',
        uso_principal: '',
      });
      
      onLimpiezaCreado && onLimpiezaCreado();
      window.location.reload();
    } catch (error) {
      alert('Error al crear producto de limpieza: ' + error.message);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="bg-[#1a1a1a] p-6 rounded-lg shadow-lg border-2 border-[#646cff]/30">
      <h2 className="text-2xl font-bold mb-4 border-b-2 border-[#646cff]/50 pb-3 text-white flex items-center gap-2">
        <Sparkles size={28} className="text-[#646cff]" />
        Crear Producto de Limpieza
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <InputProducto onDatosChange={handleDatosGeneralesChange} />

        <div>
          <h3 className="text-sm font-semibold text-[#646cff] uppercase mb-3">
            Datos de Limpieza (Herencia)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="presentacion"
              value={datosLimpieza.presentacion}
              onChange={handleLimpiezaChange}
              placeholder="Presentación (ej: spray, líquido, polvo)"
              className="border border-[#646cff]/50 bg-[#2a2a2a] text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#646cff] placeholder-gray-400"
            />
            <input
              type="text"
              name="uso_principal"
              value={datosLimpieza.uso_principal}
              onChange={handleLimpiezaChange}
              placeholder="Uso principal (ej: pisos, baño, cocina)"
              className="border border-[#646cff]/50 bg-[#2a2a2a] text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#646cff] placeholder-gray-400"
            />
            <input
              type="number"
              name="contenido_neto"
              value={datosLimpieza.contenido_neto}
              onChange={handleLimpiezaChange}
              placeholder="Contenido neto"
              step="0.1"
              className="border border-[#646cff]/50 bg-[#2a2a2a] text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#646cff] placeholder-gray-400"
            />
            <input
              type="text"
              name="unidad_contenido"
              value={datosLimpieza.unidad_contenido}
              onChange={handleLimpiezaChange}
              placeholder="Unidad (ej: ml, L, g, kg)"
              className="border border-[#646cff]/50 bg-[#2a2a2a] text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#646cff] placeholder-gray-400"
            />
            <div className="flex items-center bg-[#2a2a2a] p-3 rounded border border-[#646cff]/50">
              <input
                type="checkbox"
                name="es_biodegradable"
                checked={datosLimpieza.es_biodegradable}
                onChange={handleLimpiezaChange}
                className="mr-2 w-4 h-4 accent-[#646cff]"
                id="es_biodegradable"
              />
              <label htmlFor="es_biodegradable" className="text-white font-medium">¿Es biodegradable?</label>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={cargando}
          className="w-full bg-[#646cff] text-white font-bold py-3 px-4 rounded-lg hover:bg-[#535bf2] disabled:bg-gray-600 disabled:cursor-not-allowed transition-all shadow-lg shadow-[#646cff]/40 hover:shadow-xl hover:scale-105 flex items-center justify-center gap-2"
        >
          {cargando ? (
            <>
              <Loader2 size={20} className="animate-spin" />
              Guardando...
            </>
          ) : (
            <>
              <Save size={20} />
              Guardar en Base de Datos
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default InputLimpieza;
