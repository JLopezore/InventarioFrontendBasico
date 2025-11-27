import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import InputBebida from '../componentes/InputBebida';
import InputCarne from '../componentes/InputCarne';
import InputAbarrote from '../componentes/InputAbarrote';
import InputDulce from '../componentes/InputDulce';
import InputEnlatado from '../componentes/InputEnlatado';
import InputLicor from '../componentes/InputLicor';
import InputLimpieza from '../componentes/InputLimpieza';
import InputPanaderia from '../componentes/InputPanaderia';
import Producto from '../componentes/Producto';
import { ArrowLeft, Wine, Beef, ShoppingCart, Candy, Soup, Martini, Sparkles, Croissant } from 'lucide-react';
import '../App.css';

const Contenido = () => {
  const { categoria } = useParams();
  const navigate = useNavigate();
  const [recargarTabla, setRecargarTabla] = useState(0);

  const categoriaNombre = categoria.charAt(0).toUpperCase() + categoria.slice(1);

  const handleProductoCreado = () => {
    setRecargarTabla(prev => prev + 1);
  };

  // Componente de input según categoría
  const renderFormularioInput = () => {
    switch(categoria) {
      case 'bebidas':
        return <InputBebida onBebidaCreada={handleProductoCreado} />;
      case 'carnes':
        return <InputCarne onCarneCreada={handleProductoCreado} />;
      case 'abarrotes':
        return <InputAbarrote onAbarroteCreado={handleProductoCreado} />;
      case 'dulces':
        return <InputDulce onDulceCreado={handleProductoCreado} />;
      case 'enlatados':
        return <InputEnlatado onEnlatadoCreado={handleProductoCreado} />;
      case 'licores':
        return <InputLicor onLicorCreado={handleProductoCreado} />;
      case 'limpieza':
        return <InputLimpieza onLimpiezaCreado={handleProductoCreado} />;
      case 'panaderia':
        return <InputPanaderia onPanaderiaCreado={handleProductoCreado} />;
      default:
        return null;
    }
  };

  // Obtener el icono según la categoría
  const obtenerIcono = () => {
    const iconProps = { size: 28, strokeWidth: 2 };
    const iconos = {
      bebidas: <Wine {...iconProps} />,
      carnes: <Beef {...iconProps} />,
      abarrotes: <ShoppingCart {...iconProps} />,
      dulces: <Candy {...iconProps} />,
      enlatados: <Soup {...iconProps} />,
      licores: <Martini {...iconProps} />,
      limpieza: <Sparkles {...iconProps} />,
      panaderia: <Croissant {...iconProps} />,
    };
    return iconos[categoria] || null;
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-white flex items-center gap-3" style={{ color: '#646cff', textShadow: '0 0 10px rgba(100, 108, 255, 0.3)' }}>
                {obtenerIcono()} Sistema de Inventario - {categoriaNombre}
              </h1>
              <p className="text-gray-300">
                Gestión de {categoriaNombre} con Herencia, Tipos Compuestos y Métodos SQL
              </p>
            </div>
            <button
              onClick={() => navigate('/')}
              className="bg-[#1a1a1a] border-2 border-[#646cff] text-white px-4 py-2 rounded-lg hover:bg-[#646cff] transition-all flex items-center gap-2 hover:shadow-lg hover:shadow-[#646cff]/40"
            >
              <ArrowLeft size={18} />
              Volver al Inicio
            </button>
          </div>
        </header>

        {/* Formulario de Creación */}
        <div className="mb-8">
          {renderFormularioInput()}
        </div>

        {/* Tabla de Productos */}
        <Producto categoria={categoria} onRecargar={recargarTabla} />
      </div>
    </div>
  );
};

export default Contenido;
