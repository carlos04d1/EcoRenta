// Funciones de actualización de vista
function actualizarVista() {
    actualizarVisibilidad();
    mostrarAutos(autos);
    mostrarRentas();
}

function actualizarVisibilidad() {
    const formularioAlquiler = document.getElementById('formularioAlquiler');
    const panelAdmin = document.getElementById('panelAdmin');
    const filtros = document.getElementById('filtros');

    // Mostrar/ocultar elementos según el rol
    formularioAlquiler.style.display = rolActual === 'cliente' ? 'block' : 'none';
    panelAdmin.style.display = rolActual === 'admin' ? 'block' : 'none';
    filtros.style.display = rolActual !== 'admin' ? 'block' : 'none';
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
    div.className = 'bg-white rounded-lg shadow-lg overflow-hidden';
    
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
                    <p class="text-gray-600">Inicio: ${new Date(renta.fechaInicio).toLocaleString()}</p>
                    <p class="text-gray-600">Fin: ${new Date(renta.fechaFin).toLocaleString()}</p>
                </div>
                <div class="text-right">
                    <p class="text-blue-500 font-bold">Total: Bs. ${renta.total}</p>
                </div>
            </div>
        `;
        
        contenedor.appendChild(div);
    });
}

// Funciones de formularios
function actualizarSelectAutos() {
    const select = document.getElementById('autoSeleccionado');
    select.innerHTML = '';

    autos.filter(auto => auto.disponible).forEach(auto => {
        const option = document.createElement('option');
        option.value = auto.id;
        option.textContent = `${auto.nombre} - Bs. ${auto.precioHora}/hora`;
        select.appendChild(option);
    });
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Formulario de alquiler
    document.getElementById('alquilerForm').addEventListener('submit', (e) => {
        e.preventDefault();
        
        const nombre = document.getElementById('nombreCliente').value;
        const autoId = parseInt(document.getElementById('autoSeleccionado').value);
        const fechaInicio = document.getElementById('fechaInicio').value;
        const fechaFin = document.getElementById('fechaFin').value;

        if (validarAlquiler(fechaInicio, fechaFin)) {
            clienteActual = nombre;
            crearAlquiler(nombre, autoId, fechaInicio, fechaFin);
            e.target.reset();
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
});

// Inicialización
actualizarVista(); 