import { useState } from 'react';
import InputProducto from './InputProducto';
import { crearLicor } from '../Services/api';
import { Martini, Save, Loader2 } from 'lucide-react';

const InputLicor = ({ onLicorCreado }) => {
  const [datosGenerales, setDatosGenerales] = useState(null);
  const [datosLicor, setDatosLicor] = useState({
    grado_alcohol: '',
    tipo_licor: '',
    capacidad_ml: '',
    anos_anejamiento: '',
    pais_origen: '',
  });
  const [cargando, setCargando] = useState(false);

  const handleDatosGeneralesChange = (datos) => {
    setDatosGenerales(datos);
  };

  const handleLicorChange = (e) => {
    const { name, value } = e.target;
    setDatosLicor({
      ...datosLicor,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!datosGenerales) {
      alert('Por favor completa todos los campos generales');
      return;
    }

    setCargando(true);

    const nuevoLicor = {
      nombre: datosGenerales.nombre,
      precio: parseFloat(datosGenerales.precio),
      stock: parseInt(datosGenerales.stock),
      id_ubicacion: parseInt(datosGenerales.id_ubicacion),
      
      grado_alcohol: parseFloat(datosLicor.grado_alcohol) || 0,
      tipo_licor: datosLicor.tipo_licor,
      capacidad_ml: parseFloat(datosLicor.capacidad_ml) || 0,
      anos_anejamiento: datosLicor.anos_anejamiento ? parseInt(datosLicor.anos_anejamiento) : null,
      pais_origen: datosLicor.pais_origen,

      dims: {
        medida_alto: parseFloat(datosGenerales.dims.medida_alto) || 0,
        medida_ancho: parseFloat(datosGenerales.dims.medida_ancho) || 0,
        medida_profundidad: parseFloat(datosGenerales.dims.medida_profundidad) || 0,
        unidad_medida: datosGenerales.dims.unidad_medida,
      },
    };

    try {
      await crearLicor(nuevoLicor);
      alert('¡Licor creado exitosamente!');
      
      setDatosLicor({
        grado_alcohol: '',
        tipo_licor: '',
        capacidad_ml: '',
        anos_anejamiento: '',
        pais_origen: '',
      });
      
      onLicorCreado && onLicorCreado();
      window.location.reload();
    } catch (error) {
      alert('Error al crear licor: ' + error.message);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="bg-[#1a1a1a] p-6 rounded-lg shadow-lg border-2 border-[#646cff]/30">
      <h2 className="text-2xl font-bold mb-4 border-b-2 border-[#646cff]/50 pb-3 text-white flex items-center gap-2">
        <Martini size={28} className="text-[#646cff]" />
        Crear Nuevo Licor
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <InputProducto onDatosChange={handleDatosGeneralesChange} />

        <div>
          <h3 className="text-sm font-semibold text-[#646cff] uppercase mb-3">
            Datos de Licor (Herencia)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="tipo_licor"
              value={datosLicor.tipo_licor}
              onChange={handleLicorChange}
              placeholder="Tipo (ej: whisky, vodka, ron)"
              className="border border-[#646cff]/50 bg-[#2a2a2a] text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#646cff] placeholder-gray-400"
            />
            <input
              type="number"
              name="grado_alcohol"
              value={datosLicor.grado_alcohol}
              onChange={handleLicorChange}
              placeholder="Grado Alcohol (%)"
              step="0.1"
              className="border border-[#646cff]/50 bg-[#2a2a2a] text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#646cff] placeholder-gray-400"
            />
            <input
              type="number"
              name="capacidad_ml"
              value={datosLicor.capacidad_ml}
              onChange={handleLicorChange}
              placeholder="Capacidad (ml)"
              step="1"
              className="border border-[#646cff]/50 bg-[#2a2a2a] text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#646cff] placeholder-gray-400"
            />
            <input
              type="number"
              name="anos_anejamiento"
              value={datosLicor.anos_anejamiento}
              onChange={handleLicorChange}
              placeholder="Años de añejamiento (opcional)"
              step="1"
              className="border border-[#646cff]/50 bg-[#2a2a2a] text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#646cff] placeholder-gray-400"
            />
            <input
              type="text"
              name="pais_origen"
              value={datosLicor.pais_origen}
              onChange={handleLicorChange}
              placeholder="País de origen"
              className="border border-[#646cff]/50 bg-[#2a2a2a] text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#646cff] placeholder-gray-400"
            />
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

export default InputLicor;
