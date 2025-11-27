import { useState } from 'react';
import InputProducto from './InputProducto';
import { crearCarne } from '../Services/api';
import { Beef, Save, Loader2 } from 'lucide-react';

const InputCarne = ({ onCarneCreada }) => {
  const [datosGenerales, setDatosGenerales] = useState(null);
  const [datosCarne, setDatosCarne] = useState({
    animal: '',
    tipo_corte: '',
    peso_kg: '',
    temperatura_conservacion: '',
    esta_congelado: false,
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

    // Validar campos específicos
    if (!datosCarne.animal.trim() || !datosCarne.tipo_corte.trim() || !datosCarne.peso_kg || !datosCarne.temperatura_conservacion) {
      alert('Por favor completa todos los campos de carne');
      return;
    }

    setCargando(true);

    const nuevaCarne = {
      nombre: datosGenerales.nombre,
      precio: parseFloat(datosGenerales.precio),
      stock: parseInt(datosGenerales.stock),
      id_ubicacion: parseInt(datosGenerales.id_ubicacion),
      
      animal: datosCarne.animal,
      tipo_corte: datosCarne.tipo_corte,
      peso_kg: parseFloat(datosCarne.peso_kg) || 0,
      temperatura_conservacion: parseFloat(datosCarne.temperatura_conservacion) || 0,
      esta_congelado: datosCarne.esta_congelado,

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
      
      setDatosCarne({
        animal: '',
        tipo_corte: '',
        peso_kg: '',
        temperatura_conservacion: '',
        esta_congelado: false,
      });
      
      onCarneCreada && onCarneCreada();
      window.location.reload();
    } catch (error) {
      alert('Error al crear carne: ' + error.message);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="bg-[#1a1a1a] p-6 rounded-lg shadow-lg border-2 border-[#646cff]/30">
      <h2 className="text-2xl font-bold mb-4 border-b-2 border-[#646cff]/50 pb-3 text-white flex items-center gap-2">
        <Beef size={28} className="text-[#646cff]" />
        Crear Nueva Carne
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <InputProducto onDatosChange={handleDatosGeneralesChange} />

        <div>
          <h3 className="text-sm font-semibold text-[#646cff] uppercase mb-3">
            Datos de Carne (Herencia)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="animal"
              value={datosCarne.animal}
              onChange={handleCarneChange}
              placeholder="Animal (ej: res, cerdo, pollo)"
              className="border border-[#646cff]/50 bg-[#2a2a2a] text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#646cff] placeholder-gray-400"
              required
            />
            <input
              type="text"
              name="tipo_corte"
              value={datosCarne.tipo_corte}
              onChange={handleCarneChange}
              placeholder="Tipo de corte (ej: lomo, chuleta)"
              className="border border-[#646cff]/50 bg-[#2a2a2a] text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#646cff] placeholder-gray-400"
              required
            />
            <input
              type="number"
              name="peso_kg"
              value={datosCarne.peso_kg}
              onChange={handleCarneChange}
              placeholder="Peso (kg)"
              step="0.01"
              min="0"
              className="border border-[#646cff]/50 bg-[#2a2a2a] text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#646cff] placeholder-gray-400"
              required
            />
            <input
              type="number"
              name="temperatura_conservacion"
              value={datosCarne.temperatura_conservacion}
              onChange={handleCarneChange}
              placeholder="Temperatura de conservación (°C)"
              step="0.1"
              className="border border-[#646cff]/50 bg-[#2a2a2a] text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#646cff] placeholder-gray-400"
              required
            />
            <div className="flex items-center bg-[#2a2a2a] p-3 rounded border border-[#646cff]/50">
              <input
                type="checkbox"
                name="esta_congelado"
                checked={datosCarne.esta_congelado}
                onChange={handleCarneChange}
                className="mr-2 w-4 h-4 accent-[#646cff]"
                id="esta_congelado"
              />
              <label htmlFor="esta_congelado" className="text-white font-medium">¿Está congelado?</label>
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

export default InputCarne;
