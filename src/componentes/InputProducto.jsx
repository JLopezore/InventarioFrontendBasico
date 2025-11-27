import { useState } from 'react';

/**
 * Componente reutilizable para los campos comunes de todos los productos
 * (Datos Generales + Tipo Compuesto Dimensiones)
 */
const InputProducto = ({ onDatosChange, valoresIniciales = {} }) => {
  const [datosProducto, setDatosProducto] = useState({
    nombre: valoresIniciales.nombre || '',
    precio: valoresIniciales.precio || '',
    stock: valoresIniciales.stock || '',
    id_ubicacion: valoresIniciales.id_ubicacion || '',
    // Dimensiones (Tipo Compuesto UDT)
    dims: {
      medida_alto: valoresIniciales.dims?.medida_alto || '',
      medida_ancho: valoresIniciales.dims?.medida_ancho || '',
      medida_profundidad: valoresIniciales.dims?.medida_profundidad || '',
      unidad_medida: valoresIniciales.dims?.unidad_medida || 'cm',
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Si es un campo de dimensiones
    if (['medida_alto', 'medida_ancho', 'medida_profundidad', 'unidad_medida'].includes(name)) {
      const nuevosDatos = {
        ...datosProducto,
        dims: {
          ...datosProducto.dims,
          [name]: name === 'unidad_medida' ? value : parseFloat(value) || 0,
        },
      };
      setDatosProducto(nuevosDatos);
      onDatosChange && onDatosChange(nuevosDatos);
    } else {
      const nuevosDatos = {
        ...datosProducto,
        [name]: value,
      };
      setDatosProducto(nuevosDatos);
      onDatosChange && onDatosChange(nuevosDatos);
    }
  };

  return (
    <div className="space-y-4">
      {/* Datos Generales */}
      <div>
        <h3 className="text-sm font-semibold text-[#646cff] uppercase mb-3">
          Datos Generales
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="nombre"
            value={datosProducto.nombre}
            onChange={handleChange}
            placeholder="Nombre Producto"
            className="border border-[#646cff]/50 bg-[#2a2a2a] text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#646cff] placeholder-gray-400"
            required
          />
          <input
            type="number"
            name="precio"
            value={datosProducto.precio}
            onChange={handleChange}
            placeholder="Precio ($)"
            step="0.01"
            className="border border-[#646cff]/50 bg-[#2a2a2a] text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#646cff] placeholder-gray-400"
            required
          />
          <input
            type="number"
            name="stock"
            value={datosProducto.stock}
            onChange={handleChange}
            placeholder="Stock Inicial"
            className="border border-[#646cff]/50 bg-[#2a2a2a] text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#646cff] placeholder-gray-400"
            required
          />
          <input
            type="number"
            name="id_ubicacion"
            value={datosProducto.id_ubicacion}
            onChange={handleChange}
            placeholder="ID Ubicación (FK)"
            className="border border-[#646cff]/50 bg-[#2a2a2a] text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#646cff] placeholder-gray-400"
            required
          />
        </div>
      </div>

      {/* Dimensiones (Tipo Compuesto) */}
      <div>
        <h3 className="text-sm font-semibold text-[#646cff] uppercase mb-3">
          Dimensiones Físicas (Tipo Compuesto)
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <input
            type="number"
            name="medida_alto"
            value={datosProducto.dims.medida_alto}
            onChange={handleChange}
            placeholder="Alto"
            className="border border-[#646cff]/50 bg-[#2a2a2a] text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#646cff] placeholder-gray-400"
          />
          <input
            type="number"
            name="medida_ancho"
            value={datosProducto.dims.medida_ancho}
            onChange={handleChange}
            placeholder="Ancho"
            className="border border-[#646cff]/50 bg-[#2a2a2a] text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#646cff] placeholder-gray-400"
          />
          <input
            type="number"
            name="medida_profundidad"
            value={datosProducto.dims.medida_profundidad}
            onChange={handleChange}
            placeholder="Profundidad"
            className="border border-[#646cff]/50 bg-[#2a2a2a] text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#646cff] placeholder-gray-400"
          />
          <input
            type="text"
            name="unidad_medida"
            value={datosProducto.dims.unidad_medida}
            onChange={handleChange}
            placeholder="Unidad"
            className="border border-[#646cff]/50 bg-[#2a2a2a] text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#646cff] placeholder-gray-400"
          />
        </div>
      </div>
    </div>
  );
};

export default InputProducto;
