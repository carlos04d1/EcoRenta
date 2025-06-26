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

    if (rentasAMostrar.length === 0) {
        contenedor.innerHTML = `
            <div class="text-center py-8 text-gray-500">
                <i class="fas fa-history text-4xl mb-2"></i>
                <p>No hay historial de reservas</p>
            </div>
        `;
        return;
    }

    rentasAMostrar.forEach(renta => {
        const auto = obtenerAutoPorId(renta.autoId);
        const div = document.createElement('div');
        div.className = 'bg-white shadow-md rounded-lg p-4 mb-4 hover:shadow-lg transition-all duration-300 ease-in-out';
        
        const fechaInicio = new Date(renta.fechaInicio).toLocaleString('es-BO');
        const fechaFin = new Date(renta.fechaFin).toLocaleString('es-BO');
        
        // Determinar el color del borde y estado según el estado de la reserva
        let borderColor = 'border-gray-200';
        let estadoColor = 'text-gray-600';
        let estadoIcon = 'fas fa-clock';
        
        if (renta.estado === 'confirmada') {
            borderColor = 'border-l-4 border-green-500';
            estadoColor = 'text-green-600';
            estadoIcon = 'fas fa-check-circle';
        } else if (renta.estado === 'rechazada') {
            borderColor = 'border-l-4 border-red-500';
            estadoColor = 'text-red-600';
            estadoIcon = 'fas fa-times-circle';
        }

        div.innerHTML = `
            <div class="flex justify-between items-start ${borderColor}">
                <div class="flex-1">
                    <div class="flex items-center gap-2 mb-2">
                        <i class="fas fa-car text-violet-600"></i>
                        <h4 class="font-bold text-lg">${auto ? auto.nombre : 'Auto no encontrado'}</h4>
                        <span class="bg-${renta.estado === 'confirmada' ? 'green' : renta.estado === 'rechazada' ? 'red' : 'yellow'}-100 text-${renta.estado === 'confirmada' ? 'green' : renta.estado === 'rechazada' ? 'red' : 'yellow'}-800 text-xs px-2 py-1 rounded-full">
                            <i class="${estadoIcon} mr-1"></i>${renta.estado ? renta.estado.charAt(0).toUpperCase() + renta.estado.slice(1) : 'Pendiente'}
                        </span>
                    </div>
                    <p class="text-gray-600 mb-1"><i class="fas fa-user text-gray-400 mr-1"></i>Cliente: ${renta.cliente}</p>
                    ${renta.clienteCI ? `<p class="text-gray-600 mb-1"><i class="fas fa-id-card text-gray-400 mr-1"></i>CI: ${renta.clienteCI}</p>` : ''}
                    <p class="text-gray-600 mb-1"><i class="fas fa-calendar text-gray-400 mr-1"></i>Inicio: ${fechaInicio}</p>
                    <p class="text-gray-600 mb-1"><i class="fas fa-calendar-check text-gray-400 mr-1"></i>Fin: ${fechaFin}</p>
                    ${renta.trabajadorNombre ? `<p class="text-gray-600 mb-1"><i class="fas fa-user-tie text-gray-400 mr-1"></i>Atendido por: ${renta.trabajadorNombre}</p>` : ''}
                    ${renta.fechaConfirmacion ? `<p class="text-xs text-gray-500"><i class="fas fa-check text-gray-400 mr-1"></i>Confirmado: ${new Date(renta.fechaConfirmacion).toLocaleString('es-BO')}</p>` : ''}
                    ${renta.fechaRechazo ? `<p class="text-xs text-gray-500"><i class="fas fa-times text-gray-400 mr-1"></i>Rechazado: ${new Date(renta.fechaRechazo).toLocaleString('es-BO')}</p>` : ''}
                </div>
                <div class="text-right ml-4">
                    ${renta.total ? `<p class="text-blue-500 font-bold text-lg">Total: Bs. ${renta.total}</p>` : ''}
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

    if (reservasPendientes.length === 0) {
        contenedor.innerHTML = `
            <div class="text-center py-8 text-gray-500">
                <i class="fas fa-inbox text-4xl mb-2"></i>
                <p>No hay reservas pendientes</p>
            </div>
        `;
        return;
    }

    reservasPendientes.forEach((sol, index) => {
        const auto = obtenerAutoPorId(sol.autoID);
        const div = document.createElement('div');
        div.className = 'bg-white shadow-md rounded-lg p-4 mb-4 border-l-4 border-yellow-500 hover:shadow-lg transition-all duration-300 ease-in-out';
        
        const fechaInicio = new Date(sol.fechaInicio).toLocaleString('es-BO');
        const fechaFin = new Date(sol.fechaFin).toLocaleString('es-BO');
        const fechaCreacion = new Date(sol.fechaCreacion).toLocaleString('es-BO');
        
        div.innerHTML = `
            <div class="flex justify-between items-start">
                <div class="flex-1">
                    <div class="flex items-center gap-2 mb-2">
                        <i class="fas fa-user text-violet-600"></i>
                        <h4 class="font-bold text-lg">${sol.clienteNombre}</h4>
                        <span class="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">Pendiente</span>
                    </div>
                    <p class="text-gray-600 mb-1"><i class="fas fa-id-card text-gray-400 mr-1"></i>CI: ${sol.clienteCI}</p>
                    <p class="text-gray-600 mb-1"><i class="fas fa-car text-gray-400 mr-1"></i>${auto ? auto.nombre : 'Auto no encontrado'}</p>
                    <p class="text-gray-600 mb-1"><i class="fas fa-calendar text-gray-400 mr-1"></i>Inicio: ${fechaInicio}</p>
                    <p class="text-gray-600 mb-1"><i class="fas fa-calendar-check text-gray-400 mr-1"></i>Fin: ${fechaFin}</p>
                    <p class="text-xs text-gray-500"><i class="fas fa-clock text-gray-400 mr-1"></i>Solicitado: ${fechaCreacion}</p>
                </div>
                <div class="flex flex-col gap-2 ml-4">
                    <button 
                        onclick="aprobarSolicitudUI(${index})" 
                        class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition duration-300 ease-in-out flex items-center gap-2 shadow-md hover:shadow-lg">
                        <i class="fas fa-check"></i>
                        <span>✅ Aceptar</span>
                    </button>
                    <button 
                        onclick="rechazarSolicitudUI(${index})" 
                        class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-300 ease-in-out flex items-center gap-2 shadow-md hover:shadow-lg">
                        <i class="fas fa-times"></i>
                        <span>❌ Rechazar</span>
                    </button>
                </div>
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
        mostrarNotificacion('Ingrese nombre y CI del trabajador', 'red');
        return;
    }
    aprobarSolicitud(indice, trabajadorActual.nombre, trabajadorActual.ci);
}

function rechazarSolicitudUI(indice) {
    if (!trabajadorActual.nombre || !trabajadorActual.ci) {
        mostrarNotificacion('Ingrese nombre y CI del trabajador', 'red');
        return;
    }
    rechazarSolicitud(indice, trabajadorActual.nombre, trabajadorActual.ci);
}

// Notificación visual al enviar formularios
function mostrarNotificacion(mensaje, color = 'green') {
    const contenedor = document.getElementById('alert-container');
    if (!contenedor) return;

    const alerta = document.createElement('div');
    const colores = {
        yellow: 'bg-yellow-100 text-yellow-800 border-yellow-300',
        green: 'bg-green-100 text-green-800 border-green-300',
        red: 'bg-red-100 text-red-800 border-red-300'
    };
    
    const iconos = {
        yellow: 'fas fa-exclamation-triangle',
        green: 'fas fa-check-circle',
        red: 'fas fa-times-circle'
    };
    
    alerta.className = `${colores[color] || colores.green} border rounded-lg shadow-lg px-6 py-4 mb-4 transition-all duration-300 ease-in-out transform translate-y-0 opacity-100 flex items-center gap-3 max-w-md mx-auto`; 
    
    alerta.innerHTML = `
        <i class="${iconos[color] || iconos.green} text-xl"></i>
        <span class="font-medium">${mensaje}</span>
        <button onclick="this.parentElement.remove()" class="ml-auto text-gray-500 hover:text-gray-700">
            <i class="fas fa-times"></i>
        </button>
    `;

    contenedor.appendChild(alerta);

    // Animación de entrada
    setTimeout(() => {
        alerta.classList.add('translate-y-0', 'opacity-100');
    }, 100);

    // Auto-remover después de 5 segundos
    setTimeout(() => {
        alerta.classList.add('translate-y-2', 'opacity-0');
        setTimeout(() => {
            if (alerta.parentElement) {
                alerta.remove();
            }
        }, 300);
    }, 5000);
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
        const ci = document.getElementById('ciCliente').value;
        const autoId = parseInt(document.getElementById('autoSeleccionado').value);
        const fechaInicio = document.getElementById('fechaInicio').value;
        const fechaFin = document.getElementById('fechaFin').value;

        if (validarAlquiler(fechaInicio, fechaFin)) {
            clienteActual = nombre;
            const resultado = crearSolicitud(nombre, ci, autoId, fechaInicio, fechaFin);
            if (resultado) {
                e.target.reset();
            }
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
