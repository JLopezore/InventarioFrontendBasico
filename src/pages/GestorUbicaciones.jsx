import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MapPin, 
  Edit, 
  Trash2, 
  Plus, 
  Save, 
  X, 
  ArrowLeft,
  Package,
  MoveRight,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { 
  obtenerUbicaciones, 
  crearUbicacion, 
  actualizarUbicacion, 
  eliminarUbicacion,
  obtenerProductos,
  actualizarUbicacionProducto
} from '../Services/api';
import '../styles/GestorUbicaciones.css';

const GestorUbicaciones = () => {
  const navigate = useNavigate();
  const [ubicaciones, setUbicaciones] = useState([]);
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [modalProductosAbierto, setModalProductosAbierto] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [ubicacionSeleccionada, setUbicacionSeleccionada] = useState(null);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [nuevaUbicacionId, setNuevaUbicacionId] = useState('');
  const [ubicacionesExpandidas, setUbicacionesExpandidas] = useState({});
  const [formData, setFormData] = useState({
    id_ubicacion: '',
    zona: '',
    estante: '',
    nivel: 1,
  });

  useEffect(() => {
    cargarUbicaciones();
    cargarProductos();
  }, []);

  const cargarUbicaciones = async () => {
    try {
      setCargando(true);
      const data = await obtenerUbicaciones();
      setUbicaciones(data);
    } catch (error) {
      console.error('Error al cargar ubicaciones:', error);
      alert('Error al cargar ubicaciones');
    } finally {
      setCargando(false);
    }
  };

  const cargarProductos = async () => {
    try {
      const data = await obtenerProductos();
      setProductos(data);
    } catch (error) {
      console.error('Error al cargar productos:', error);
    }
  };

  const abrirModalCrear = () => {
    setModoEdicion(false);
    setUbicacionSeleccionada(null);
    
    // Calcular el próximo ID disponible automáticamente
    const siguienteId = calcularSiguienteId();
    
    setFormData({ id_ubicacion: siguienteId, zona: '', estante: '', nivel: 1 });
    setModalAbierto(true);
  };

  const calcularSiguienteId = () => {
    if (ubicaciones.length === 0) return 1;
    
    // Buscar todos los IDs existentes y encontrar el siguiente disponible
    const idsExistentes = ubicaciones.map(ub => ub.id_ubicacion).sort((a, b) => a - b);
    
    // Buscar el primer hueco en la secuencia
    for (let i = 1; i <= idsExistentes.length; i++) {
      if (!idsExistentes.includes(i)) {
        return i;
      }
    }
    
    // Si no hay huecos, devolver el siguiente después del máximo
    return Math.max(...idsExistentes) + 1;
  };

  const abrirModalEditar = (ubicacion) => {
    setModoEdicion(true);
    setUbicacionSeleccionada(ubicacion);
    setFormData({
      id_ubicacion: ubicacion.id_ubicacion,
      zona: ubicacion.zona,
      estante: ubicacion.estante,
      nivel: ubicacion.nivel,
    });
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setUbicacionSeleccionada(null);
    setFormData({ id_ubicacion: '', zona: '', estante: '', nivel: 1 });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: (name === 'nivel' || name === 'id_ubicacion') ? parseInt(value) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validar que todos los campos estén completos
    if (!formData.id_ubicacion || !formData.zona.trim() || !formData.estante.trim() || !formData.nivel) {
      alert('Por favor completa todos los campos de la ubicación');
      return;
    }
    
    try {
      if (modoEdicion && ubicacionSeleccionada) {
        // Actualizar (PUT)
        await actualizarUbicacion(ubicacionSeleccionada.id_ubicacion, formData);
        alert('Ubicación actualizada exitosamente');
      } else {
        // Crear (POST) - Validar que el ID no exista
        const idExiste = ubicaciones.some(ub => ub.id_ubicacion === parseInt(formData.id_ubicacion));
        if (idExiste) {
          alert(`El ID ${formData.id_ubicacion} ya está en uso. Por favor, elige otro ID.`);
          return;
        }
        
        await crearUbicacion(formData);
        alert('Ubicación creada exitosamente');
      }
      
      cerrarModal();
      cargarUbicaciones();
    } catch (error) {
      console.error('Error al guardar ubicación:', error);
      alert('Error al guardar ubicación: ' + error.message);
    }
  };

  const handleEliminar = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar esta ubicación?')) {
      return;
    }

    try {
      await eliminarUbicacion(id);
      alert('Ubicación eliminada');
      cargarUbicaciones();
    } catch (error) {
      console.error('Error al eliminar:', error);
      alert('Error al eliminar ubicación');
    }
  };

  const agruparPorZona = () => {
    const grupos = {};
    ubicaciones.forEach(ub => {
      if (!grupos[ub.zona]) {
        grupos[ub.zona] = [];
      }
      grupos[ub.zona].push(ub);
    });
    return grupos;
  };

  const obtenerProductosPorUbicacion = (idUbicacion) => {
    return productos.filter(p => p.id_ubicacion === idUbicacion);
  };

  const abrirModalMoverProducto = (producto) => {
    setProductoSeleccionado(producto);
    setNuevaUbicacionId(producto.id_ubicacion || '');
    setModalProductosAbierto(true);
  };

  const cerrarModalProductos = () => {
    setModalProductosAbierto(false);
    setProductoSeleccionado(null);
    setNuevaUbicacionId('');
  };

  const handleMoverProducto = async () => {
    if (!productoSeleccionado || !nuevaUbicacionId) {
      alert('Por favor selecciona una ubicación');
      return;
    }

    try {
      await actualizarUbicacionProducto(productoSeleccionado.id_prod, parseInt(nuevaUbicacionId));
      alert(`Producto movido exitosamente a ubicación ${nuevaUbicacionId}`);
      cerrarModalProductos();
      cargarProductos();
    } catch (error) {
      console.error('Error al mover producto:', error);
      alert('Error al mover producto: ' + error.message);
    }
  };

  const zonas = agruparPorZona();

  const toggleExpandirUbicacion = (idUbicacion) => {
    setUbicacionesExpandidas(prev => ({
      ...prev,
      [idUbicacion]: !prev[idUbicacion]
    }));
  };

  return (
    <div className="gestor-ubicaciones-container">
      <div className="gestor-header">
        <button className="btn-volver" onClick={() => navigate('/')}>
          <ArrowLeft size={20} />
          Volver
        </button>
        <h1 className="titulo-gestor">
          <MapPin size={32} />
          Gestor de Ubicaciones
        </h1>
        <button className="btn-crear" onClick={abrirModalCrear}>
          <Plus size={20} />
          Nueva Ubicación
        </button>
      </div>

      {cargando ? (
        <div className="loading-container">
          <p>Cargando ubicaciones...</p>
        </div>
      ) : (
        <div className="zonas-container">
          {Object.keys(zonas).length === 0 ? (
            <div className="empty-state">
              <Package size={64} />
              <p>No hay ubicaciones registradas</p>
              <button className="btn-crear" onClick={abrirModalCrear}>
                <Plus size={20} />
                Crear primera ubicación
              </button>
            </div>
          ) : (
            Object.entries(zonas).map(([nombreZona, ubicacionesZona]) => (
              <div key={nombreZona} className="zona-card">
                <h2 className="zona-titulo">{nombreZona}</h2>
                <div className="ubicaciones-grid">
                  {ubicacionesZona.map((ub) => {
                    const productosEnUbicacion = obtenerProductosPorUbicacion(ub.id_ubicacion);
                    const estaExpandida = ubicacionesExpandidas[ub.id_ubicacion];
                    const productosAMostrar = estaExpandida ? productosEnUbicacion : productosEnUbicacion.slice(0, 3);
                    
                    return (
                      <div key={ub.id_ubicacion} className="ubicacion-card">
                        <div className="ubicacion-info">
                          <div className="ubicacion-header">
                            <MapPin size={20} className="ubicacion-icon" />
                            <span className="ubicacion-id">ID: {ub.id_ubicacion}</span>
                          </div>
                          <div className="ubicacion-detalles">
                            <p><strong>Estante:</strong> {ub.estante}</p>
                            <p><strong>Nivel:</strong> {ub.nivel}</p>
                            <p><strong>Productos:</strong> {productosEnUbicacion.length}</p>
                          </div>
                          {productosEnUbicacion.length > 0 && (
                            <div className="productos-lista">
                              {productosAMostrar.map(prod => (
                                <div key={prod.id_prod} className="producto-item">
                                  <span className="producto-nombre">{prod.nombre}</span>
                                  <button
                                    className="btn-mover-mini"
                                    onClick={() => abrirModalMoverProducto(prod)}
                                    title="Mover producto a otra ubicación"
                                  >
                                    <MoveRight size={14} />
                                  </button>
                                </div>
                              ))}
                              {productosEnUbicacion.length > 3 && (
                                <button 
                                  className="btn-expandir-productos"
                                  onClick={() => toggleExpandirUbicacion(ub.id_ubicacion)}
                                >
                                  {estaExpandida ? (
                                    <>
                                      <ChevronUp size={16} />
                                      Mostrar menos
                                    </>
                                  ) : (
                                    <>
                                      <ChevronDown size={16} />
                                      Ver todos ({productosEnUbicacion.length})
                                    </>
                                  )}
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                        <div className="ubicacion-acciones">
                          <button
                            className="btn-editar"
                            onClick={() => abrirModalEditar(ub)}
                            title="Editar ubicación (PUT)"
                          >
                            <Edit size={18} />
                          </button>
                          <button
                            className="btn-eliminar"
                            onClick={() => handleEliminar(ub.id_ubicacion)}
                            title="Eliminar ubicación"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Modal para crear/editar */}
      {modalAbierto && (
        <div className="modal-overlay" onClick={cerrarModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>
                {modoEdicion ? (
                  <>
                    <Edit size={24} />
                    Editar Ubicación (PUT)
                  </>
                ) : (
                  <>
                    <Plus size={24} />
                    Nueva Ubicación
                  </>
                )}
              </h2>
              <button className="btn-cerrar" onClick={cerrarModal}>
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-group">
                <label htmlFor="id_ubicacion">ID Ubicación * (Autogenerado)</label>
                <input
                  type="number"
                  id="id_ubicacion"
                  name="id_ubicacion"
                  value={formData.id_ubicacion}
                  readOnly
                  required
                  disabled={modoEdicion}
                  style={{
                    backgroundColor: '#2a2a2a',
                    cursor: 'default'
                  }}
                />
                {modoEdicion ? (
                  <small style={{ color: '#888', fontSize: '0.85rem' }}>
                    El ID no se puede modificar en modo edición
                  </small>
                ) : (
                  <small style={{ color: '#10b981', fontSize: '0.85rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <CheckCircle size={14} />
                    ID asignado automáticamente
                  </small>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="zona">Zona *</label>
                <input
                  type="text"
                  id="zona"
                  name="zona"
                  value={formData.zona}
                  onChange={handleChange}
                  placeholder="ej: Refrigeradores, Almacén, Estantería A"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="estante">Estante *</label>
                <input
                  type="text"
                  id="estante"
                  name="estante"
                  value={formData.estante}
                  onChange={handleChange}
                  placeholder="ej: A-1, B-3, C-5"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="nivel">Nivel *</label>
                <input
                  type="number"
                  id="nivel"
                  name="nivel"
                  value={formData.nivel}
                  onChange={handleChange}
                  min="1"
                  max="10"
                  required
                />
              </div>

              <div className="modal-acciones">
                <button type="button" className="btn-cancelar" onClick={cerrarModal}>
                  <X size={20} />
                  Cancelar
                </button>
                <button type="submit" className="btn-guardar">
                  <Save size={20} />
                  {modoEdicion ? 'Actualizar' : 'Crear'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal para mover productos */}
      {modalProductosAbierto && productoSeleccionado && (
        <div className="modal-overlay" onClick={cerrarModalProductos}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>
                <MoveRight size={24} />
                Mover Producto a Nueva Ubicación
              </h2>
              <button className="btn-cerrar" onClick={cerrarModalProductos}>
                <X size={24} />
              </button>
            </div>

            <div className="modal-form">
              <div className="producto-info-modal">
                <h3>Producto seleccionado:</h3>
                <p><strong>Nombre:</strong> {productoSeleccionado.nombre}</p>
                <p><strong>ID:</strong> {productoSeleccionado.id_prod}</p>
                <p><strong>Ubicación actual:</strong> {productoSeleccionado.id_ubicacion || 'Sin asignar'}</p>
              </div>

              <div className="form-group">
                <label htmlFor="nuevaUbicacion">Nueva Ubicación *</label>
                <select
                  id="nuevaUbicacion"
                  value={nuevaUbicacionId}
                  onChange={(e) => setNuevaUbicacionId(e.target.value)}
                  className="select-ubicacion"
                >
                  <option value="">Seleccionar ubicación...</option>
                  {ubicaciones.map(ub => (
                    <option key={ub.id_ubicacion} value={ub.id_ubicacion}>
                      ID: {ub.id_ubicacion} - {ub.zona} / {ub.estante} / Nivel {ub.nivel}
                    </option>
                  ))}
                </select>
              </div>

              <div className="modal-acciones">
                <button type="button" className="btn-cancelar" onClick={cerrarModalProductos}>
                  <X size={20} />
                  Cancelar
                </button>
                <button type="button" className="btn-guardar" onClick={handleMoverProducto}>
                  <MoveRight size={20} />
                  Mover Producto
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GestorUbicaciones;
