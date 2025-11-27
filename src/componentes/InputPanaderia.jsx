import { useState } from 'react';
import InputProducto from './InputProducto';
import { crearPanderia } from '../Services/api';
import { Croissant, Save, Loader2 } from 'lucide-react';

const InputPanaderia = ({ onPanaderiaCreado }) => {
  const [datosGenerales, setDatosGenerales] = useState(null);
  const [datosPanaderia, setDatosPanaderia] = useState({
    tipo_masa: '',
    presentacion: '',
    es_artesanal: false,
  });
  const [cargando, setCargando] = useState(false);

  const handleDatosGeneralesChange = (datos) => {
    setDatosGenerales(datos);
  };

  const handlePanaderiaChange = (e) => {
    const { name, value, type, checked } = e.target;
    setDatosPanaderia({
      ...datosPanaderia,
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

    const nuevaPanaderia = {
      nombre: datosGenerales.nombre,
      precio: parseFloat(datosGenerales.precio),
      stock: parseInt(datosGenerales.stock),
      id_ubicacion: parseInt(datosGenerales.id_ubicacion),
      
      tipo_masa: datosPanaderia.tipo_masa,
      presentacion: datosPanaderia.presentacion,
      es_artesanal: datosPanaderia.es_artesanal,

      dims: {
        medida_alto: parseFloat(datosGenerales.dims.medida_alto) || 0,
        medida_ancho: parseFloat(datosGenerales.dims.medida_ancho) || 0,
        medida_profundidad: parseFloat(datosGenerales.dims.medida_profundidad) || 0,
        unidad_medida: datosGenerales.dims.unidad_medida,
      },
    };

    try {
      await crearPanderia(nuevaPanaderia);
      alert('¡Producto de panadería creado exitosamente!');
      
      setDatosPanaderia({
        tipo_masa: '',
        presentacion: '',
        es_artesanal: false,
      });
      
      onPanaderiaCreado && onPanaderiaCreado();
      window.location.reload();
    } catch (error) {
      alert('Error al crear producto de panadería: ' + error.message);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="bg-[#1a1a1a] p-6 rounded-lg shadow-lg border-2 border-[#646cff]/30">
      <h2 className="text-2xl font-bold mb-4 border-b-2 border-[#646cff]/50 pb-3 text-white flex items-center gap-2">
        <Croissant size={28} className="text-[#646cff]" />
        Crear Producto de Panadería
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <InputProducto onDatosChange={handleDatosGeneralesChange} />

        <div>
          <h3 className="text-sm font-semibold text-[#646cff] uppercase mb-3">
            Datos de Panadería (Herencia)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="tipo_masa"
              value={datosPanaderia.tipo_masa}
              onChange={handlePanaderiaChange}
              placeholder="Tipo de masa (ej: hojaldre, brioche, baguette)"
              className="border border-[#646cff]/50 bg-[#2a2a2a] text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#646cff] placeholder-gray-400"
            />
            <input
              type="text"
              name="presentacion"
              value={datosPanaderia.presentacion}
              onChange={handlePanaderiaChange}
              placeholder="Presentación (ej: pieza, bolsa, paquete)"
              className="border border-[#646cff]/50 bg-[#2a2a2a] text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#646cff] placeholder-gray-400"
            />
            <div className="flex items-center bg-[#2a2a2a] p-3 rounded border border-[#646cff]/50">
              <input
                type="checkbox"
                name="es_artesanal"
                checked={datosPanaderia.es_artesanal}
                onChange={handlePanaderiaChange}
                className="mr-2 w-4 h-4 accent-[#646cff]"
                id="es_artesanal"
              />
              <label htmlFor="es_artesanal" className="text-white font-medium">¿Es artesanal?</label>
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

export default InputPanaderia;
