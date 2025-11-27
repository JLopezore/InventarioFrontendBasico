import { useState } from 'react';
import InputProducto from './InputProducto';
import { crearEnlatado } from '../Services/api';
import { Soup, Save, Loader2 } from 'lucide-react';

const InputEnlatado = ({ onEnlatadoCreado }) => {
  const [datosGenerales, setDatosGenerales] = useState(null);
  const [datosEnlatado, setDatosEnlatado] = useState({
    tipo_envase: '',
    peso_drenado: '',
    peso_neto: '',
    tipo_alimento: '',
  });
  const [cargando, setCargando] = useState(false);

  const handleDatosGeneralesChange = (datos) => {
    setDatosGenerales(datos);
  };

  const handleEnlatadoChange = (e) => {
    const { name, value } = e.target;
    setDatosEnlatado({
      ...datosEnlatado,
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

    const nuevoEnlatado = {
      nombre: datosGenerales.nombre,
      precio: parseFloat(datosGenerales.precio),
      stock: parseInt(datosGenerales.stock),
      id_ubicacion: parseInt(datosGenerales.id_ubicacion),
      
      tipo_envase: datosEnlatado.tipo_envase,
      peso_drenado: parseFloat(datosEnlatado.peso_drenado) || 0,
      peso_neto: parseFloat(datosEnlatado.peso_neto) || 0,
      tipo_alimento: datosEnlatado.tipo_alimento,

      dims: {
        medida_alto: parseFloat(datosGenerales.dims.medida_alto) || 0,
        medida_ancho: parseFloat(datosGenerales.dims.medida_ancho) || 0,
        medida_profundidad: parseFloat(datosGenerales.dims.medida_profundidad) || 0,
        unidad_medida: datosGenerales.dims.unidad_medida,
      },
    };

    try {
      await crearEnlatado(nuevoEnlatado);
      alert('¡Enlatado creado exitosamente!');
      
      setDatosEnlatado({
        tipo_envase: '',
        peso_drenado: '',
        peso_neto: '',
        tipo_alimento: '',
      });
      
      onEnlatadoCreado && onEnlatadoCreado();
      window.location.reload();
    } catch (error) {
      alert('Error al crear enlatado: ' + error.message);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="bg-[#1a1a1a] p-6 rounded-lg shadow-lg border-2 border-[#646cff]/30">
      <h2 className="text-2xl font-bold mb-4 border-b-2 border-[#646cff]/50 pb-3 text-white flex items-center gap-2">
        <Soup size={28} className="text-[#646cff]" />
        Crear Nuevo Enlatado
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <InputProducto onDatosChange={handleDatosGeneralesChange} />

        <div>
          <h3 className="text-sm font-semibold text-[#646cff] uppercase mb-3">
            Datos de Enlatado (Herencia)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="tipo_envase"
              value={datosEnlatado.tipo_envase}
              onChange={handleEnlatadoChange}
              placeholder="Tipo de envase (ej: lata, tetra pak)"
              className="border border-[#646cff]/50 bg-[#2a2a2a] text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#646cff] placeholder-gray-400"
            />
            <input
              type="text"
              name="tipo_alimento"
              value={datosEnlatado.tipo_alimento}
              onChange={handleEnlatadoChange}
              placeholder="Tipo de alimento (ej: atún, frijoles)"
              className="border border-[#646cff]/50 bg-[#2a2a2a] text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#646cff] placeholder-gray-400"
            />
            <input
              type="number"
              name="peso_drenado"
              value={datosEnlatado.peso_drenado}
              onChange={handleEnlatadoChange}
              placeholder="Peso drenado (gramos)"
              step="0.1"
              className="border border-[#646cff]/50 bg-[#2a2a2a] text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#646cff] placeholder-gray-400"
            />
            <input
              type="number"
              name="peso_neto"
              value={datosEnlatado.peso_neto}
              onChange={handleEnlatadoChange}
              placeholder="Peso neto (gramos)"
              step="0.1"
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

export default InputEnlatado;
