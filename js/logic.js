// Variables globales
let rolActual = 'cliente';
let clienteActual = '';
let trabajadorActual = { nombre: '', ci: '' };
let filtroActual = 'todos';

// Funciones de manejo de roles
function cambiarRol(rol) {
    rolActual = rol;
    actualizarVista();
}

function setRole(rol) {
    cambiarRol(rol);
    localStorage.setItem('ecorenta-rol', rol);
    if (typeof toggleUserMenu === 'function') {
        toggleUserMenu();
    }
}

// Funciones de filtrado
function filtrarAutos(tipo) {
    filtroActual = tipo;
    const cards = document.querySelectorAll('#listaAutos > div');
    cards.forEach(card => {
        if (tipo === 'todos' || card.dataset.tipo === tipo) {
            card.classList.remove('hidden', 'opacity-0');
        } else {
            card.classList.add('opacity-0');
            setTimeout(() => card.classList.add('hidden'), 200);
        }
    });
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

function crearSolicitud(nombre, ci, autoId, fechaInicio, fechaFin) {
    const auto = autos.find(a => a.id === autoId);
    if (!auto || !auto.disponible) {
        alert('El auto no está disponible');
        return;
    }

    const solicitud = {
        clienteNombre: nombre,
        clienteCI: ci,
        autoID: autoId,
        fechaInicio,
        fechaFin,
        estado: 'pendiente'
    };

    reservasPendientes.push(solicitud);
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
        return reservasConfirmadas.filter(renta => renta.cliente === clienteActual);
    }
    return reservasConfirmadas;
}

function obtenerAutoPorId(id) {
    return autos.find(auto => auto.id === id);
}

// Gestión de solicitudes
function aprobarSolicitud(index, trabajadorNombre, trabajadorCI) {
    const solicitud = reservasPendientes.splice(index, 1)[0];
    if (!solicitud) return;

    const auto = obtenerAutoPorId(solicitud.autoID);
    if (!auto) return;

    const inicio = new Date(solicitud.fechaInicio);
    const fin = new Date(solicitud.fechaFin);
    const horas = (fin - inicio) / (1000 * 60 * 60);
    const total = horas * auto.precioHora;

    const renta = {
        id: reservasConfirmadas.length + 1,
        cliente: solicitud.clienteNombre,
        clienteCI: solicitud.clienteCI,
        autoId: solicitud.autoID,
        fechaInicio: solicitud.fechaInicio,
        fechaFin: solicitud.fechaFin,
        trabajadorNombre,
        trabajadorCI,
        estado: 'aprobado',
        total
    };

    reservasConfirmadas.push(renta);
    auto.disponible = false;
    actualizarVista();
}

function rechazarSolicitud(index, trabajadorNombre, trabajadorCI) {
    const solicitud = reservasPendientes.splice(index, 1)[0];
    if (!solicitud) return;

    const registro = {
        id: reservasConfirmadas.length + 1,
        cliente: solicitud.clienteNombre,
        clienteCI: solicitud.clienteCI,
        autoId: solicitud.autoID,
        fechaInicio: solicitud.fechaInicio,
        fechaFin: solicitud.fechaFin,
        trabajadorNombre,
        trabajadorCI,
        estado: 'rechazado'
    };

    reservasConfirmadas.push(registro);
    actualizarVista();
}

// Revisiones y multas
function registrarRevision(autoID, estadoAnterior, notas, trabajadorNombre, trabajadorCI, fechaRevision) {
    revisionesVehiculo.push({
        autoID,
        estadoAnterior,
        notas,
        trabajadorNombre,
        trabajadorCI,
        fechaRevision
    });
    actualizarVista();
}

function registrarMulta(clienteCI, clienteNombre, vehiculo, motivo, monto, trabajadorNombre, trabajadorCI, fecha) {
    multas.push({
        clienteCI,
        clienteNombre,
        vehiculo,
        motivo,
        monto: parseFloat(monto),
        trabajador: trabajadorNombre,
        trabajadorCI,
        fecha,
        estado: 'pendiente'
    });
    actualizarVista();
}

function pagarMulta(indice) {
    if (multas[indice]) {
        multas[indice].estado = 'pagada';
        actualizarVista();
    }
}