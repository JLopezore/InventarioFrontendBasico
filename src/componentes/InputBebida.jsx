import { useState } from 'react';
import InputProducto from './InputProducto';
import { crearBebida } from '../Services/api';
import { Wine, Save, Loader2 } from 'lucide-react';

/**
 * Componente para crear una nueva Bebida
 * Incluye campos específicos de bebida + campos generales de producto
 */
const InputBebida = ({ onBebidaCreada }) => {
  const [datosGenerales, setDatosGenerales] = useState(null);
  const [datosBebida, setDatosBebida] = useState({
    marca: '',
    sabor: '',
    envase: 'plastico',
    capacidad_ml: '',
    es_retornable: false,
  });
  const [cargando, setCargando] = useState(false);

  const handleDatosGeneralesChange = (datos) => {
    setDatosGenerales(datos);
  };

  const handleBebidaChange = (e) => {
    const { name, value, type, checked } = e.target;
    setDatosBebida({
      ...datosBebida,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!datosGenerales) {
      alert('Por favor completa todos los campos generales');
      return;
    }

    // Validar campos específicos
    if (!datosBebida.marca.trim() || !datosBebida.sabor.trim() || !datosBebida.capacidad_ml) {
      alert('Por favor completa todos los campos de bebida');
      return;
    }

    setCargando(true);

    // Construir objeto completo
    const nuevaBebida = {
      // Datos generales del producto
      nombre: datosGenerales.nombre,
      precio: parseFloat(datosGenerales.precio),
      stock: parseInt(datosGenerales.stock),
      id_ubicacion: parseInt(datosGenerales.id_ubicacion),
      
      // Datos específicos de bebida
      marca: datosBebida.marca,
      sabor: datosBebida.sabor,
      envase: datosBebida.envase,
      capacidad_ml: parseInt(datosBebida.capacidad_ml) || 0,
      es_retornable: datosBebida.es_retornable,

      // Tipo Compuesto (Dimensiones)
      dims: {
        medida_alto: parseFloat(datosGenerales.dims.medida_alto) || 0,
        medida_ancho: parseFloat(datosGenerales.dims.medida_ancho) || 0,
        medida_profundidad: parseFloat(datosGenerales.dims.medida_profundidad) || 0,
        unidad_medida: datosGenerales.dims.unidad_medida,
      },
    };

    try {
      await crearBebida(nuevaBebida);
      alert('¡Bebida creada exitosamente!');
      
      // Resetear formulario
      setDatosBebida({
        marca: '',
        sabor: '',
        envase: 'plastico',
        capacidad_ml: '',
        es_retornable: false,
      });
      
      // Notificar al componente padre
      onBebidaCreada && onBebidaCreada();
      
      // Recargar página para resetear InputProducto
      window.location.reload();
    } catch (error) {
      alert('Error al crear bebida: ' + error.message);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="bg-[#1a1a1a] p-6 rounded-lg shadow-lg border-2 border-[#646cff]/30">
      <h2 className="text-2xl font-bold mb-4 border-b-2 border-[#646cff]/50 pb-3 text-white flex items-center gap-2">
        <Wine size={28} className="text-[#646cff]" />
        Crear Nueva Bebida
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Componente Reutilizable - Datos Generales */}
        <InputProducto onDatosChange={handleDatosGeneralesChange} />

        {/* Datos Específicos de Bebida */}
        <div>
          <h3 className="text-sm font-semibold text-[#646cff] uppercase mb-3">
            Datos de Bebida (Herencia)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="marca"
              value={datosBebida.marca}
              onChange={handleBebidaChange}
              placeholder="Marca"
              className="border border-[#646cff]/50 bg-[#2a2a2a] text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#646cff] placeholder-gray-400"
              required
            />
            <input
              type="text"
              name="sabor"
              value={datosBebida.sabor}
              onChange={handleBebidaChange}
              placeholder="Sabor"
              className="border border-[#646cff]/50 bg-[#2a2a2a] text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#646cff] placeholder-gray-400"
              required
            />
            <select
              name="envase"
              value={datosBebida.envase}
              onChange={handleBebidaChange}
              className="border border-[#646cff]/50 bg-[#2a2a2a] text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#646cff]"
              style={{
                colorScheme: 'dark'
              }}
            >
              <option value="plastico" className="bg-[#2a2a2a] text-white">Plástico</option>
              <option value="lata" className="bg-[#2a2a2a] text-white">Lata</option>
              <option value="vidrio" className="bg-[#2a2a2a] text-white">Vidrio</option>
            </select>
            <input
              type="number"
              name="capacidad_ml"
              value={datosBebida.capacidad_ml}
              onChange={handleBebidaChange}
              placeholder="Capacidad (ml)"
              min="0"
              className="border border-[#646cff]/50 bg-[#2a2a2a] text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#646cff] placeholder-gray-400"
              required
            />
            <div className="flex items-center bg-[#2a2a2a] p-3 rounded border border-[#646cff]/50">
              <input
                type="checkbox"
                name="es_retornable"
                checked={datosBebida.es_retornable}
                onChange={handleBebidaChange}
                className="mr-2 w-4 h-4 accent-[#646cff]"
                id="es_retornable"
              />
              <label htmlFor="es_retornable" className="text-white font-medium">¿Es Retornable?</label>
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

export default InputBebida;
