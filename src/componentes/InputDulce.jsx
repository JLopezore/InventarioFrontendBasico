import { useState } from 'react';
import InputProducto from './InputProducto';
import { crearDulce } from '../Services/api';
import { Candy, Save, Loader2 } from 'lucide-react';

const InputDulce = ({ onDulceCreado }) => {
  const [datosGenerales, setDatosGenerales] = useState(null);
  const [datosDulce, setDatosDulce] = useState({
    tipo_empaque: '',
    peso_unidad: '',
    sabor: '',
    es_libre_azucar: false,
  });
  const [cargando, setCargando] = useState(false);

  const handleDatosGeneralesChange = (datos) => {
    setDatosGenerales(datos);
  };

  const handleDulceChange = (e) => {
    const { name, value, type, checked } = e.target;
    setDatosDulce({
      ...datosDulce,
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

    const nuevoDulce = {
      nombre: datosGenerales.nombre,
      precio: parseFloat(datosGenerales.precio),
      stock: parseInt(datosGenerales.stock),
      id_ubicacion: parseInt(datosGenerales.id_ubicacion),
      
      tipo_empaque: datosDulce.tipo_empaque,
      peso_unidad: parseFloat(datosDulce.peso_unidad) || 0,
      sabor: datosDulce.sabor,
      es_libre_azucar: datosDulce.es_libre_azucar,

      dims: {
        medida_alto: parseFloat(datosGenerales.dims.medida_alto) || 0,
        medida_ancho: parseFloat(datosGenerales.dims.medida_ancho) || 0,
        medida_profundidad: parseFloat(datosGenerales.dims.medida_profundidad) || 0,
        unidad_medida: datosGenerales.dims.unidad_medida,
      },
    };

    try {
      await crearDulce(nuevoDulce);
      alert('¡Dulce creado exitosamente!');
      
      setDatosDulce({
        tipo_empaque: '',
        peso_unidad: '',
        sabor: '',
        es_libre_azucar: false,
      });
      
      onDulceCreado && onDulceCreado();
      window.location.reload();
    } catch (error) {
      alert('Error al crear dulce: ' + error.message);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="bg-[#1a1a1a] p-6 rounded-lg shadow-lg border-2 border-[#646cff]/30">
      <h2 className="text-2xl font-bold mb-4 border-b-2 border-[#646cff]/50 pb-3 text-white flex items-center gap-2">
        <Candy size={28} className="text-[#646cff]" />
        Crear Nuevo Dulce
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <InputProducto onDatosChange={handleDatosGeneralesChange} />

        <div>
          <h3 className="text-sm font-semibold text-[#646cff] uppercase mb-3">
            Datos de Dulce (Herencia)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="tipo_empaque"
              value={datosDulce.tipo_empaque}
              onChange={handleDulceChange}
              placeholder="Tipo de empaque (ej: bolsa, caja)"
              className="border border-[#646cff]/50 bg-[#2a2a2a] text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#646cff] placeholder-gray-400"
            />
            <input
              type="number"
              name="peso_unidad"
              value={datosDulce.peso_unidad}
              onChange={handleDulceChange}
              placeholder="Peso por unidad (gramos)"
              step="0.1"
              className="border border-[#646cff]/50 bg-[#2a2a2a] text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#646cff] placeholder-gray-400"
            />
            <input
              type="text"
              name="sabor"
              value={datosDulce.sabor}
              onChange={handleDulceChange}
              placeholder="Sabor"
              className="border border-[#646cff]/50 bg-[#2a2a2a] text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#646cff] placeholder-gray-400"
            />
            <div className="flex items-center bg-[#2a2a2a] p-3 rounded border border-[#646cff]/50">
              <input
                type="checkbox"
                name="es_libre_azucar"
                checked={datosDulce.es_libre_azucar}
                onChange={handleDulceChange}
                className="mr-2 w-4 h-4 accent-[#646cff]"
                id="es_libre_azucar"
              />
              <label htmlFor="es_libre_azucar" className="text-white font-medium">¿Libre de azúcar?</label>
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

export default InputDulce;
