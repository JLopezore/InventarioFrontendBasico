import { useState, useEffect, useCallback } from 'react';
import { 
  obtenerProductos, 
  obtenerProductosPorTipo,
  eliminarProducto, 
  calcularValorInventario 
} from '../Services/api';
import { 
  RefreshCw, 
  Trash2, 
  DollarSign, 
  Package, 
  Wine, 
  Beef,
  ShoppingCart, 
  Candy, 
  Soup, 
  Martini, 
  Sparkles, 
  Croissant,
  Ruler
} from 'lucide-react';

/**
 * Componente para mostrar la tabla de productos
 * Muestra datos polimórficos de la superclase y subclases
 */
const Producto = ({ categoria = null, onRecargar }) => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const cargarProductos = useCallback(async () => {
    setCargando(true);
    setError(null);
    
    try {
      let data;
      
      // Mapeo de categorías a tipos
      const mapeoTipos = {
        'bebidas': 'bebida',
        'carnes': 'carne',
        'abarrotes': 'abarrote',
        'dulces': 'dulce',
        'enlatados': 'enlatado',
        'licores': 'licor',
        'limpieza': 'limpieza',
        'panaderia': 'panaderia'
      };
      
      // Usar el endpoint /productos/tipo/{tipo} según la categoría
      if (categoria) {
        const tipo = mapeoTipos[categoria.toLowerCase()];
        if (tipo) {
          data = await obtenerProductosPorTipo(tipo);
        } else {
          data = await obtenerProductos();
        }
      } else {
        data = await obtenerProductos();
      }
      
      setProductos(data);
    } catch (err) {
      setError('Error al cargar productos. Verifica que el backend esté corriendo.');
      console.error(err);
    } finally {
      setCargando(false);
    }
  }, [categoria]);

  useEffect(() => {
    cargarProductos();
  }, [cargarProductos, onRecargar]);

  const handleEliminar = async (id) => {
    if (!window.confirm('¿Seguro que deseas eliminar este producto?')) return;

    try {
      await eliminarProducto(id);
      alert('Producto eliminado exitosamente');
      cargarProductos();
    } catch (err) {
      alert('Error al eliminar producto');
      console.error(err);
    }
  };

  const handleCalcularValor = async (id) => {
    try {
      const data = await calcularValorInventario(id);
      alert(
        `Cálculo desde PostgreSQL:\n\nEl valor total del inventario para el producto ${id} es: $${data.valor_inventario_calculado_en_db}`
      );
    } catch (err) {
      alert(
        'Para que esto funcione, asegúrate de tener el endpoint del método almacenado en tu backend.'
      );
      console.error(err);
    }
  };

  const formatearDimensiones = (dims) => {
    if (!dims) return 'N/A';
    return `${dims.medida_alto}x${dims.medida_ancho}x${dims.medida_profundidad} ${dims.unidad_medida}`;
  };

  const obtenerIconoTipo = (tipo) => {
    const iconProps = { size: 28, strokeWidth: 2 };
    const iconos = {
      bebida: <Wine {...iconProps} />,
      carne: <Beef {...iconProps} />,
      abarrote: <ShoppingCart {...iconProps} />,
      dulce: <Candy {...iconProps} />,
      enlatado: <Soup {...iconProps} />,
      licor: <Martini {...iconProps} />,
      limpieza: <Sparkles {...iconProps} />,
      panaderia: <Croissant {...iconProps} />,
    };
    return iconos[tipo?.toLowerCase()] || <Package {...iconProps} />;
  };

  if (cargando) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        <p className="font-bold">Error</p>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-[#1a1a1a] p-6 rounded-lg shadow-lg border-2 border-[#646cff]/30">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">
          {categoria ? `Inventario de ${categoria}` : 'Inventario Global'}
        </h2>
        <button
          onClick={cargarProductos}
          className="bg-[#646cff] text-white px-4 py-2 rounded-lg hover:bg-[#535bf2] transition-all shadow-lg shadow-[#646cff]/40 flex items-center gap-2 hover:scale-105"
        >
          <RefreshCw size={18} />
          Recargar
        </button>
      </div>

      {productos.length === 0 ? (
        <p className="text-gray-400 text-center py-12 text-lg">
          No hay productos registrados en esta categoría
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {productos.map((producto) => (
            <div
              key={producto.id_prod}
              className="bg-[#2a2a2a] rounded-xl shadow-lg hover:shadow-2xl hover:shadow-[#646cff]/30 transition-all duration-300 border-2 border-[#646cff]/50 overflow-hidden hover:scale-105"
            >
              {/* Header de la tarjeta */}
              <div className="p-4 bg-[#1a1a1a] border-b-2 border-[#646cff]/50">
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-3">
                    <div className="text-[#646cff]">
                      {obtenerIconoTipo(producto.tipo_producto)}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-white">
                        {producto.nombre}
                      </h3>
                      <span className="text-xs font-semibold px-2 py-1 rounded bg-[#646cff] text-white">
                        {producto.tipo_producto?.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-gray-400 bg-[#2a2a2a] px-2 py-1 rounded">
                    ID: {producto.id_prod}
                  </span>
                </div>
              </div>

              {/* Contenido de la tarjeta */}
              <div className="p-4 space-y-3">
                {/* Precio y Stock */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#1a1a1a] p-3 rounded-lg border border-[#646cff]/50">
                    <p className="text-xs text-gray-400 mb-1">Precio</p>
                    <p className="text-xl font-bold text-[#646cff]">${producto.precio}</p>
                  </div>
                  <div className="bg-[#1a1a1a] p-3 rounded-lg border border-[#646cff]/50">
                    <p className="text-xs text-gray-400 mb-1">Stock</p>
                    <p className="text-xl font-bold text-[#646cff]">{producto.stock} unidades</p>
                  </div>
                </div>

                {/* Dimensiones */}
                <div className="bg-[#1a1a1a] p-3 rounded-lg border border-[#646cff]/50">
                  <p className="text-xs text-[#646cff] font-semibold mb-1 flex items-center gap-1">
                    <Ruler size={14} />
                    Dimensiones (UDT)
                  </p>
                  <p className="text-sm text-gray-300 font-mono">
                    {formatearDimensiones(producto.dims)}
                  </p>
                </div>

                {/* Acciones */}
                <div className="flex space-x-2 pt-2">
                  <button
                    onClick={() => handleCalcularValor(producto.id_prod)}
                    className="flex-1 bg-[#646cff] text-white px-3 py-2 rounded-lg hover:bg-[#535bf2] transition-all text-sm font-semibold shadow-lg shadow-[#646cff]/40 flex items-center justify-center gap-2 hover:scale-105"
                    title="Llamar Stored Function"
                  >
                    <DollarSign size={16} />
                    Valor del Stock
                  </button>
                  <button
                    onClick={() => handleEliminar(producto.id_prod)}
                    className="bg-[#1a1a1a] border-2 border-red-500 text-red-500 px-4 py-2 rounded-lg hover:bg-red-500 hover:text-white transition-all text-sm font-semibold flex items-center justify-center hover:scale-105"
                    title="Eliminar producto"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Producto;
