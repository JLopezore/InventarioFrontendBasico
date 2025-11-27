import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../App.css';

import { 
  Wine, 
  Beef,
  ShoppingCart, 
  Candy, 
  Soup, 
  Martini, 
  Sparkles, 
  Croissant,
  DollarSign,
  MapPin,
} from 'lucide-react';

import { obtenerProductos } from '../Services/api';

const Home = () => {
  const navigate = useNavigate();
  const [valorTotal, setValorTotal] = useState(0);
  const [cargando, setCargando] = useState(true);

  const categorias = [
    { nombre: 'Bebidas', icono: Wine, ruta: '/contenido/bebidas' },
    { nombre: 'Carnes', icono: Beef, ruta: '/contenido/carnes' },
    { nombre: 'Abarrotes', icono: ShoppingCart, ruta: '/contenido/abarrotes' },
    { nombre: 'Dulces', icono: Candy, ruta: '/contenido/dulces' },
    { nombre: 'Enlatados', icono: Soup, ruta: '/contenido/enlatados' },
    { nombre: 'Licores', icono: Martini, ruta: '/contenido/licores' },
    { nombre: 'Limpieza', icono: Sparkles, ruta: '/contenido/limpieza' },
    { nombre: 'Panadería', icono: Croissant, ruta: '/contenido/panaderia' },
  ];

  const handleCategoriaClick = (ruta) => {
    navigate(ruta);
  };

  useEffect(() => {
    const calcularValorTotal = async () => {
      try {
        setCargando(true);
        const productos = await obtenerProductos();
        const total = productos.reduce((acc, prod) => {
          return acc + (prod.precio * prod.stock);
        }, 0);
        setValorTotal(total);
      } catch (error) {
        console.error('Error al calcular valor total:', error);
      } finally {
        setCargando(false);
      }
    };

    calcularValorTotal();
  }, []);

  return (
    <div className="home-container">
      <h1 className="titulo-principal">Inventario de Productos</h1>
      
      <div className="categorias-grid">
        {categorias.map((categoria, index) => {
          const IconoComponente = categoria.icono;
          return (
            <button
              key={index}
              className="categoria-btn"
              onClick={() => handleCategoriaClick(categoria.ruta)}
            >
              <IconoComponente /> {categoria.nombre}
            </button>
          );
        })}
      </div>

      <div className="valor-inventario-container">
        <div className="valor-inventario-card">
          <DollarSign size={32} className="valor-icono" />
          <div className="valor-info">
            <p className="valor-label">Valor Total del Inventario</p>
            {cargando ? (
              <p className="valor-monto cargando">Calculando...</p>
            ) : (
              <p className="valor-monto">${valorTotal.toFixed(2)}</p>
            )}
          </div>
        </div>
      </div>

      <div className="gestor-ubicaciones-link">
        <button 
          className="btn-ubicaciones"
          onClick={() => navigate('/ubicaciones')}
        >
          <MapPin size={24} />
          <div className="btn-ubicaciones-text">
            <span className="btn-titulo">Gestión de Ubicaciones</span>
            <span className="btn-subtitulo">Administrar zonas, estantes y niveles</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Home;
