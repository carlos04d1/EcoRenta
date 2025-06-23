// Funciones de actualización de vista
function actualizarVista() {
    actualizarVisibilidad();
    mostrarAutos(autos);
    filtrarAutos(typeof filtroActual !== 'undefined' ? filtroActual : 'todos');
    mostrarRentas();
    mostrarReservasPendientes();
    mostrarRevisiones();
    mostrarMultas();
}

function actualizarVisibilidad() {
    const formularioAlquiler = document.getElementById('formularioAlquiler');
    const panelAdmin = document.getElementById('panelAdmin');
    const panelTrabajador = document.getElementById('panelTrabajador');
    const multasSection = document.getElementById('multasSection');
    const filtros = document.getElementById('filtros');
    const listaAutos = document.getElementById('listaAutos');

    // Mostrar/ocultar elementos según el rol
    formularioAlquiler.style.display = rolActual === 'cliente' ? 'block' : 'none';
    panelAdmin.style.display = rolActual === 'admin' ? 'block' : 'none';
    panelTrabajador.style.display = rolActual === 'trabajador' || rolActual === 'admin' ? 'block' : 'none';
    filtros.style.display = rolActual === 'cliente' ? 'block' : 'none';
    if (listaAutos) {
        listaAutos.style.display = rolActual === 'cliente' || rolActual === 'admin' ? 'grid' : 'none';
    }
    if (multasSection) {
        multasSection.style.display = rolActual === 'trabajador' || rolActual === 'admin' ? 'block' : 'none';
    }
}

// Funciones de renderizado
function mostrarAutos(autosAMostrar) {
    const contenedor = document.getElementById('listaAutos');
    contenedor.innerHTML = '';

    autosAMostrar.forEach(auto => {
        const tarjeta = crearTarjetaAuto(auto);
        contenedor.appendChild(tarjeta);
    });

    // Actualizar select de autos en el formulario
    actualizarSelectAutos();
}

function crearTarjetaAuto(auto) {
    const div = document.createElement('div');
    div.className = 'bg-white rounded-lg shadow-lg overflow-hidden transition-opacity';
    div.dataset.tipo = auto.tipo;
    
    div.innerHTML = `
        <img src="${auto.imagen}" alt="${auto.nombre}" class="w-full h-48 object-cover">
        <div class="p-4">
            <h3 class="text-xl font-bold mb-2">${auto.nombre}</h3>
            <p class="text-gray-600 mb-2">Tipo: ${auto.tipo === 'electrico' ? 'Eléctrico' : 'Híbrido'}</p>
            <p class="text-blue-500 font-bold mb-2">Bs. ${auto.precioHora}/hora</p>
            <p class="text-${auto.disponible ? 'green' : 'red'}-500 mb-4">
                ${auto.disponible ? 'Disponible' : 'No disponible'}
            </p>
            ${rolActual === 'admin' ? `
                <button onclick="eliminarAuto(${auto.id})" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                    Eliminar
                </button>
            ` : ''}
        </div>
    `;
    
    return div;
}

function mostrarRentas() {
    const contenedor = document.getElementById('listaRentas');
    const rentasAMostrar = obtenerRentas();
    contenedor.innerHTML = '';

    rentasAMostrar.forEach(renta => {
        const auto = obtenerAutoPorId(renta.autoId);
        const div = document.createElement('div');
        div.className = 'bg-gray-50 p-4 rounded-lg';

        div.innerHTML = `
            <div class="flex justify-between items-center">
                <div>
                    <h4 class="font-bold">${auto.nombre}</h4>
                    <p class="text-gray-600">Cliente: ${renta.cliente}</p>
                    ${renta.clienteCI ? `<p class="text-gray-600">CI: ${renta.clienteCI}</p>` : ''}
                    <p class="text-gray-600">Inicio: ${new Date(renta.fechaInicio).toLocaleString()}</p>
                    <p class="text-gray-600">Fin: ${new Date(renta.fechaFin).toLocaleString()}</p>
                    ${renta.trabajadorNombre ? `<p class="text-gray-600">Atendido por: ${renta.trabajadorNombre}</p>` : ''}
                    ${renta.estado ? `<p class="font-semibold ${renta.estado === 'aprobado' ? 'text-green-600' : renta.estado === 'rechazado' ? 'text-red-600' : 'text-yellow-600'}">Estado: ${renta.estado}</p>` : ''}
                </div>
                <div class="text-right">
                    ${renta.total ? `<p class="text-blue-500 font-bold">Total: Bs. ${renta.total}</p>` : ''}
                </div>
            </div>
        `;
        
        contenedor.appendChild(div);
    });
}

function mostrarReservasPendientes() {
    const contenedor = document.getElementById('listaReservas');
    if (!contenedor) return;
    contenedor.innerHTML = '';

    reservasPendientes.forEach((sol, index) => {
        const auto = obtenerAutoPorId(sol.autoID);
        const div = document.createElement('div');
        div.className = 'bg-gray-50 p-4 rounded-lg flex justify-between items-center mb-2 border-l-4 border-yellow-500';
        div.innerHTML = `
            <div>
                <p class="font-bold">${sol.clienteNombre} (CI: ${sol.clienteCI})</p>
                <p>${auto.nombre}</p>
                <p>${new Date(sol.fechaInicio).toLocaleString()} - ${new Date(sol.fechaFin).toLocaleString()}</p>
            </div>
            <div class="flex gap-2">
                <button class="bg-green-500 text-white px-2 py-1 rounded" onclick="aprobarSolicitudUI(${index})">Aprobar</button>
                <button class="bg-red-500 text-white px-2 py-1 rounded" onclick="rechazarSolicitudUI(${index})">Rechazar</button>
            </div>
        `;
        contenedor.appendChild(div);
    });
}

function mostrarRevisiones() {
    const contenedor = document.getElementById('listaRevisiones');
    if (!contenedor) return;
    contenedor.innerHTML = '';
    revisionesVehiculo.forEach(rev => {
        const auto = obtenerAutoPorId(rev.autoID);
        const div = document.createElement('div');
        div.className = 'bg-gray-50 p-4 rounded-lg mb-2';
        div.innerHTML = `
            <p class="font-bold">${auto.nombre} - ${rev.fechaRevision}</p>
            <p>Estado: ${rev.estadoAnterior}</p>
            <p>Notas: ${rev.notas}</p>
            <p>Revisado por: ${rev.trabajadorNombre} (${rev.trabajadorCI})</p>
        `;
        contenedor.appendChild(div);
    });
}

function mostrarMultas() {
    const contenedor = document.getElementById('listaMultas');
    if (!contenedor) return;
    contenedor.innerHTML = '';
    multas.forEach((multa, index) => {
        const div = document.createElement('div');
        div.className = 'bg-gray-50 p-4 rounded-lg mb-2';
        const estadoClase = multa.estado === 'pagada' ? 'text-green-600' : 'text-yellow-600';
        div.innerHTML = `
            <p class="font-bold">${multa.clienteNombre} (CI: ${multa.clienteCI})</p>
            <p>Vehículo: ${multa.vehiculo}</p>
            <p>Motivo: ${multa.motivo}</p>
            <p>Monto: Bs. ${multa.monto}</p>
            <p>Emitida por: ${multa.trabajador}</p>
            <p class="${estadoClase}">Estado: ${multa.estado}</p>
            ${multa.estado === 'pendiente' ? `<button class="bg-blue-500 text-white px-2 py-1 rounded mt-2" onclick="pagarMulta(${index})">Marcar como pagada</button>` : ''}
        `;
        contenedor.appendChild(div);
    });
}

function toggleTabs(seccion, mostrarId, boton) {
    const contenedor = document.getElementById(seccion);
    if (!contenedor) return;
    const contenidos = contenedor.querySelectorAll('.tab-content');
    contenidos.forEach(c => c.classList.add('hidden'));
    const botones = contenedor.querySelectorAll('.tab-button');
    botones.forEach(b => {
        b.classList.remove('bg-blue-500', 'text-white');
        b.classList.add('bg-gray-100');
    });
    const activo = contenedor.querySelector('#' + mostrarId);
    if (activo) activo.classList.remove('hidden');
    if (boton) {
        boton.classList.remove('bg-gray-100');
        boton.classList.add('bg-blue-500', 'text-white');
    }
}

function toggleAccordion(id) {
    const contenedor = document.getElementById(id);
    if (!contenedor) return;
    if (contenedor.classList.contains('max-h-0')) {
        contenedor.classList.remove('max-h-0');
        contenedor.classList.add('max-h-screen');
    } else {
        contenedor.classList.add('max-h-0');
        contenedor.classList.remove('max-h-screen');
    }
}

function toggleUserMenu() {
    const menu = document.getElementById('userMenu');
    if (menu) {
        menu.classList.toggle('hidden');
    }
}

function aprobarSolicitudUI(indice) {
    if (!trabajadorActual.nombre || !trabajadorActual.ci) {
        alert('Ingrese nombre y CI del trabajador');
        return;
    }
    aprobarSolicitud(indice, trabajadorActual.nombre, trabajadorActual.ci);
    mostrarNotificacion('Reserva aprobada', 'green');
}

function rechazarSolicitudUI(indice) {
    if (!trabajadorActual.nombre || !trabajadorActual.ci) {
        alert('Ingrese nombre y CI del trabajador');
        return;
    }
    rechazarSolicitud(indice, trabajadorActual.nombre, trabajadorActual.ci);
    mostrarNotificacion('Reserva rechazada', 'red');
}
// Notificación visual al enviar formularios
function mostrarNotificacion(mensaje, color = 'green') {
    const contenedor = document.getElementById('alert-container');
    if (!contenedor) return;

    const alerta = document.createElement('div');
    const colores = {
        yellow: 'bg-yellow-100 text-yellow-800',
        green: 'bg-green-100 text-green-800',
        red: 'bg-red-100 text-red-800'
    };
    alerta.className = `${colores[color] || colores.green} rounded-md shadow px-4 py-3 mb-2 transition`; 
    alerta.textContent = mensaje;

    contenedor.appendChild(alerta);

    setTimeout(() => {
        alerta.remove();
    }, 3500);
}

// Funciones de formularios
function actualizarSelectAutos() {
    const select = document.getElementById('autoSeleccionado');
    const revisionSelect = document.getElementById('revisionAuto');
    if (select) select.innerHTML = '';
    if (revisionSelect) revisionSelect.innerHTML = '';

    autos.filter(auto => auto.disponible).forEach(auto => {
        const option = document.createElement('option');
        option.value = auto.id;
        option.textContent = `${auto.nombre} - Bs. ${auto.precioHora}/hora`;
        if (select) select.appendChild(option.cloneNode(true));
        if (revisionSelect) revisionSelect.appendChild(option);
    });
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    const storedRole = localStorage.getItem('ecorenta-rol');
    if (storedRole) {
        cambiarRol(storedRole);
    }
    // Formulario de alquiler
    document.getElementById('alquilerForm').addEventListener('submit', (e) => {
        e.preventDefault();
        
        const nombre = document.getElementById('nombreCliente').value;
        const autoId = parseInt(document.getElementById('autoSeleccionado').value);
        const fechaInicio = document.getElementById('fechaInicio').value;
        const fechaFin = document.getElementById('fechaFin').value;

        if (validarAlquiler(fechaInicio, fechaFin)) {
            const ci = document.getElementById('ciCliente').value;
            clienteActual = nombre;
            crearSolicitud(nombre, ci, autoId, fechaInicio, fechaFin);
            e.target.reset();
            mostrarNotificacion('Reserva enviada para aprobación del trabajador', 'yellow');
        }
    });

    // Formulario de agregar auto
    document.getElementById('agregarAutoForm').addEventListener('submit', (e) => {
        e.preventDefault();
        
        const nombre = document.getElementById('nombreAuto').value;
        const tipo = document.getElementById('tipoAuto').value;
        const precio = parseInt(document.getElementById('precioAuto').value);
        const imagen = document.getElementById('imagenAuto').value;

        agregarAuto(nombre, tipo, precio, imagen);
        e.target.reset();
    });

    // Formulario datos trabajador
    const datosTrabajador = document.getElementById('datosTrabajadorForm');
    if (datosTrabajador) {
        datosTrabajador.addEventListener('submit', (e) => {
            e.preventDefault();
            trabajadorActual.nombre = document.getElementById('nombreTrabajador').value;
            trabajadorActual.ci = document.getElementById('ciTrabajador').value;
        });
    }

    const revisionForm = document.getElementById('revisionForm');
    if (revisionForm) {
        revisionForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const autoID = parseInt(document.getElementById('revisionAuto').value);
            const estadoAnterior = document.getElementById('estadoAnterior').value;
            const notas = document.getElementById('notasRevision').value;
            const fecha = document.getElementById('fechaRevision').value;
            registrarRevision(autoID, estadoAnterior, notas, trabajadorActual.nombre, trabajadorActual.ci, fecha);
            e.target.reset();
        });
    }

    const multaForm = document.getElementById('multaForm');
    if (multaForm) {
        multaForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const clienteNombre = document.getElementById('multaClienteNombre').value;
            const clienteCI = document.getElementById('multaClienteCI').value;
            const vehiculo = document.getElementById('multaVehiculo').value;
            const motivo = document.getElementById('motivoMulta').value;
            const monto = document.getElementById('montoMulta').value;
            const fecha = document.getElementById('fechaMulta').value;
            registrarMulta(clienteCI, clienteNombre, vehiculo, motivo, monto, trabajadorActual.nombre, trabajadorActual.ci, fecha);
            e.target.reset();
        });
    }
    actualizarVista();
});
