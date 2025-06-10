// Variables globales
let rolActual = 'cliente';
let clienteActual = '';

// Funciones de manejo de roles
function cambiarRol(rol) {
    rolActual = rol;
    actualizarVista();
}

// Funciones de filtrado
function filtrarAutos(tipo) {
    const autosFiltrados = tipo === 'todos' 
        ? autos 
        : autos.filter(auto => auto.tipo === tipo);
    mostrarAutos(autosFiltrados);
}

// Funciones de alquiler
function validarAlquiler(fechaInicio, fechaFin) {
    const inicio = new Date(fechaInicio);
    const fin = new Date(fechaFin);
    const duracionHoras = (fin - inicio) / (1000 * 60 * 60);
    
    if (duracionHoras < 2) {
        alert('La duración mínima del alquiler es de 2 horas');
        return false;
    }
    return true;
}

function crearAlquiler(cliente, autoId, fechaInicio, fechaFin) {
    const auto = autos.find(a => a.id === autoId);
    if (!auto || !auto.disponible) {
        alert('El auto no está disponible');
        return;
    }

    const inicio = new Date(fechaInicio);
    const fin = new Date(fechaFin);
    const duracionHoras = (fin - inicio) / (1000 * 60 * 60);
    const total = duracionHoras * auto.precioHora;

    const nuevaRenta = {
        id: rentas.length + 1,
        cliente,
        autoId,
        fechaInicio,
        fechaFin,
        total
    };

    rentas.push(nuevaRenta);
    auto.disponible = false;
    actualizarVista();
}

// Funciones de administración
function agregarAuto(nombre, tipo, precio, imagen) {
    const nuevoAuto = {
        id: autos.length + 1,
        nombre,
        tipo,
        precioHora: precio,
        disponible: true,
        imagen
    };
    autos.push(nuevoAuto);
    actualizarVista();
}

function eliminarAuto(id) {
    const index = autos.findIndex(auto => auto.id === id);
    if (index !== -1) {
        autos.splice(index, 1);
        actualizarVista();
    }
}

function reiniciarDisponibilidad() {
    autos.forEach(auto => {
        auto.disponible = true;
    });
    actualizarVista();
}

// Funciones de obtención de datos
function obtenerAutos() {
    return autos;
}

function obtenerRentas() {
    if (rolActual === 'cliente') {
        return rentas.filter(renta => renta.cliente === clienteActual);
    }
    return rentas;
}

function obtenerAutoPorId(id) {
    return autos.find(auto => auto.id === id);
} 