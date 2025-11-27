// API Base URL
const API_URL = 'http://localhost:8000/productos';
const UBICACIONES_URL = 'http://localhost:8000/productos/ubicaciones';

// ==================== UBICACIONES ====================

/**
 * Obtener todas las ubicaciones
 */
export const obtenerUbicaciones = async () => {
  try {
    const response = await fetch(`${UBICACIONES_URL}/`);
    if (!response.ok) throw new Error('Error al obtener ubicaciones');
    return await response.json();
  } catch (error) {
    console.error('Error en obtenerUbicaciones:', error);
    throw error;
  }
};

/**
 * Obtener una ubicación por ID
 */
export const obtenerUbicacionPorId = async (id) => {
  try {
    const response = await fetch(`${UBICACIONES_URL}/${id}`);
    if (!response.ok) throw new Error('Error al obtener ubicación');
    return await response.json();
  } catch (error) {
    console.error('Error en obtenerUbicacionPorId:', error);
    throw error;
  }
};

/**
 * Crear una nueva ubicación
 */
export const crearUbicacion = async (ubicacionData) => {
  try {
    const response = await fetch(`${UBICACIONES_URL}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ubicacionData),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(JSON.stringify(error));
    }
    return await response.json();
  } catch (error) {
    console.error('Error en crearUbicacion:', error);
    throw error;
  }
};

/**
 * Actualizar una ubicación existente (PUT)
 */
export const actualizarUbicacion = async (id, ubicacionData) => {
  try {
    const response = await fetch(`${UBICACIONES_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ubicacionData),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(JSON.stringify(error));
    }
    return await response.json();
  } catch (error) {
    console.error('Error en actualizarUbicacion:', error);
    throw error;
  }
};

/**
 * Eliminar una ubicación
 */
export const eliminarUbicacion = async (id) => {
  try {
    const response = await fetch(`${UBICACIONES_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Error al eliminar ubicación');
    return await response.json();
  } catch (error) {
    console.error('Error en eliminarUbicacion:', error);
    throw error;
  }
};

/**
 * Actualizar ubicación de un producto (PUT)
 */
export const actualizarUbicacionProducto = async (productoId, idUbicacion) => {
  try {
    const response = await fetch(`${API_URL}/ubicacion/${productoId}?id_ubicacion=${idUbicacion}`, {
      method: 'PUT',
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(JSON.stringify(error));
    }
    return await response.json();
  } catch (error) {
    console.error('Error en actualizarUbicacionProducto:', error);
    throw error;
  }
};

// ==================== PRODUCTOS GENERALES ====================

/**
 * Obtener todos los productos
 */
export const obtenerProductos = async () => {
  try {
    const response = await fetch(`${API_URL}/`);
    if (!response.ok) throw new Error('Error al obtener productos');
    return await response.json();
  } catch (error) {
    console.error('Error en obtenerProductos:', error);
    throw error;
  }
};

/**
 * Obtener un producto por ID
 */
export const obtenerProductoPorId = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) throw new Error('Error al obtener producto');
    return await response.json();
  } catch (error) {
    console.error('Error en obtenerProductoPorId:', error);
    throw error;
  }
};

/**
 * Obtener productos por tipo
 */
export const obtenerProductosPorTipo = async (tipo) => {
  try {
    const response = await fetch(`${API_URL}/tipo/${tipo}`);
    if (!response.ok) throw new Error('Error al obtener productos por tipo');
    return await response.json();
  } catch (error) {
    console.error('Error en obtenerProductosPorTipo:', error);
    throw error;
  }
};

/**
 * Eliminar un producto por ID
 */
export const eliminarProducto = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Error al eliminar producto');
    return await response.json();
  } catch (error) {
    console.error('Error en eliminarProducto:', error);
    throw error;
  }
};

/**
 * Invocar método SQL para calcular valor de inventario
 */
export const calcularValorInventario = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}/valor-inventario`);
    if (!response.ok) throw new Error('Error al calcular valor');
    return await response.json();
  } catch (error) {
    console.error('Error en calcularValorInventario:', error);
    throw error;
  }
};

// ==================== BEBIDAS ====================

/**
 * Obtener todas las bebidas
 */
export const obtenerBebidas = async () => {
  try {
    const response = await fetch(`${API_URL}/bebidas`);
    if (!response.ok) throw new Error('Error al obtener bebidas');
    return await response.json();
  } catch (error) {
    console.error('Error en obtenerBebidas:', error);
    throw error;
  }
};

/**
 * Crear una nueva bebida
 */
export const crearBebida = async (bebidaData) => {
  try {
    const response = await fetch(`${API_URL}/bebidas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bebidaData),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(JSON.stringify(error));
    }
    return await response.json();
  } catch (error) {
    console.error('Error en crearBebida:', error);
    throw error;
  }
};

// ==================== CARNES ====================

/**
 * Obtener todas las carnes
 */
export const obtenerCarnes = async () => {
  try {
    const response = await fetch(`${API_URL}/carnes`);
    if (!response.ok) throw new Error('Error al obtener carnes');
    return await response.json();
  } catch (error) {
    console.error('Error en obtenerCarnes:', error);
    throw error;
  }
};

/**
 * Crear una nueva carne
 */
export const crearCarne = async (carneData) => {
  try {
    const response = await fetch(`${API_URL}/carnes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(carneData),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(JSON.stringify(error));
    }
    return await response.json();
  } catch (error) {
    console.error('Error en crearCarne:', error);
    throw error;
  }
};

// ==================== ABARROTES ====================

export const obtenerAbarrotes = async () => {
  try {
    const response = await fetch(`${API_URL}/abarrotes`);
    if (!response.ok) throw new Error('Error al obtener abarrotes');
    return await response.json();
  } catch (error) {
    console.error('Error en obtenerAbarrotes:', error);
    throw error;
  }
};

export const crearAbarrote = async (abarroteData) => {
  try {
    const response = await fetch(`${API_URL}/abarrotes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(abarroteData),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(JSON.stringify(error));
    }
    return await response.json();
  } catch (error) {
    console.error('Error en crearAbarrote:', error);
    throw error;
  }
};

// ==================== DULCES ====================

export const obtenerDulces = async () => {
  try {
    const response = await fetch(`${API_URL}/dulces`);
    if (!response.ok) throw new Error('Error al obtener dulces');
    return await response.json();
  } catch (error) {
    console.error('Error en obtenerDulces:', error);
    throw error;
  }
};

export const crearDulce = async (dulceData) => {
  try {
    const response = await fetch(`${API_URL}/dulces`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dulceData),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(JSON.stringify(error));
    }
    return await response.json();
  } catch (error) {
    console.error('Error en crearDulce:', error);
    throw error;
  }
};

// ==================== ENLATADOS ====================

export const obtenerEnlatados = async () => {
  try {
    const response = await fetch(`${API_URL}/enlatados`);
    if (!response.ok) throw new Error('Error al obtener enlatados');
    return await response.json();
  } catch (error) {
    console.error('Error en obtenerEnlatados:', error);
    throw error;
  }
};

export const crearEnlatado = async (enlatadoData) => {
  try {
    const response = await fetch(`${API_URL}/enlatados`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(enlatadoData),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(JSON.stringify(error));
    }
    return await response.json();
  } catch (error) {
    console.error('Error en crearEnlatado:', error);
    throw error;
  }
};

// ==================== LICORES ====================

export const obtenerLicores = async () => {
  try {
    const response = await fetch(`${API_URL}/licores`);
    if (!response.ok) throw new Error('Error al obtener licores');
    return await response.json();
  } catch (error) {
    console.error('Error en obtenerLicores:', error);
    throw error;
  }
};

export const crearLicor = async (licorData) => {
  try {
    const response = await fetch(`${API_URL}/licores`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(licorData),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(JSON.stringify(error));
    }
    return await response.json();
  } catch (error) {
    console.error('Error en crearLicor:', error);
    throw error;
  }
};

// ==================== LIMPIEZA ====================

export const obtenerLimpieza = async () => {
  try {
    const response = await fetch(`${API_URL}/limpieza`);
    if (!response.ok) throw new Error('Error al obtener limpieza');
    return await response.json();
  } catch (error) {
    console.error('Error en obtenerLimpieza:', error);
    throw error;
  }
};

export const crearLimpieza = async (limpiezaData) => {
  try {
    const response = await fetch(`${API_URL}/limpieza`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(limpiezaData),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(JSON.stringify(error));
    }
    return await response.json();
  } catch (error) {
    console.error('Error en crearLimpieza:', error);
    throw error;
  }
};

// ==================== PANADERÍA ====================

export const obtenerPanaderia = async () => {
  try {
    const response = await fetch(`${API_URL}/panaderia`);
    if (!response.ok) throw new Error('Error al obtener panadería');
    return await response.json();
  } catch (error) {
    console.error('Error en obtenerPanaderia:', error);
    throw error;
  }
};

export const crearPanaderia = async (panaderiaData) => {
  try {
    const response = await fetch(`${API_URL}/panaderia`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(panaderiaData),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(JSON.stringify(error));
    }
    return await response.json();
  } catch (error) {
    console.error('Error en crearPanaderia:', error);
    throw error;
  }
};

// Aliases para compatibilidad con nombres anteriores
export const obtenerPanderia = obtenerPanaderia;
export const crearPanderia = crearPanaderia;
