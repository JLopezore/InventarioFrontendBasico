import { useState } from 'react';
import InputProducto from './InputProducto';
import { crearAbarrote } from '../Services/api';
import { ShoppingCart, Save, Loader2 } from 'lucide-react';

const InputAbarrote = ({ onAbarroteCreado }) => {
  const [datosGenerales, setDatosGenerales] = useState(null);
  const [datosAbarrote, setDatosAbarrote] = useState({
    categoria: '',
    marca: '',
    peso_neto: '',
  });
  const [cargando, setCargando] = useState(false);

  const handleDatosGeneralesChange = (datos) => {
    setDatosGenerales(datos);
  };

  const handleAbarroteChange = (e) => {
    const { name, value, type, checked } = e.target;
    setDatosAbarrote({
      ...datosAbarrote,
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

    const nuevoAbarrote = {
      nombre: datosGenerales.nombre,
      precio: parseFloat(datosGenerales.precio),
      stock: parseInt(datosGenerales.stock),
      id_ubicacion: parseInt(datosGenerales.id_ubicacion),
      
      categoria: datosAbarrote.categoria,
      marca: datosAbarrote.marca,
      peso_neto: parseFloat(datosAbarrote.peso_neto) || 0,

      dims: {
        medida_alto: parseFloat(datosGenerales.dims.medida_alto) || 0,
        medida_ancho: parseFloat(datosGenerales.dims.medida_ancho) || 0,
        medida_profundidad: parseFloat(datosGenerales.dims.medida_profundidad) || 0,
        unidad_medida: datosGenerales.dims.unidad_medida,
      },
    };

    try {
      await crearAbarrote(nuevoAbarrote);
      alert('¡Abarrote creado exitosamente!');
      
      setDatosAbarrote({
        categoria: '',
        marca: '',
        peso_neto: '',
      });
      
      onAbarroteCreado && onAbarroteCreado();
      window.location.reload();
    } catch (error) {
      alert('Error al crear abarrote: ' + error.message);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="bg-[#1a1a1a] p-6 rounded-lg shadow-lg border-2 border-[#646cff]/30">
      <h2 className="text-2xl font-bold mb-4 border-b-2 border-[#646cff]/50 pb-3 text-white flex items-center gap-2">
        <ShoppingCart size={28} className="text-[#646cff]" />
        Crear Nuevo Abarrote
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <InputProducto onDatosChange={handleDatosGeneralesChange} />

        <div>
          <h3 className="text-sm font-semibold text-[#646cff] uppercase mb-3">
            Datos de Abarrote (Herencia)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="categoria"
              value={datosAbarrote.categoria}
              onChange={handleAbarroteChange}
              placeholder="Categoría (ej: granos, cereales)"
              className="border border-[#646cff]/50 bg-[#2a2a2a] text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#646cff] placeholder-gray-400"
            />
            <input
              type="text"
              name="marca"
              value={datosAbarrote.marca}
              onChange={handleAbarroteChange}
              placeholder="Marca"
              className="border border-[#646cff]/50 bg-[#2a2a2a] text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#646cff] placeholder-gray-400"
            />
            <input
              type="number"
              name="peso_neto"
              value={datosAbarrote.peso_neto}
              onChange={handleAbarroteChange}
              placeholder="Peso Neto (kg)"
              step="0.01"
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

export default InputAbarrote;
