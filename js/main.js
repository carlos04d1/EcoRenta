// Renderizado de autos y filtros simples
function renderAutos(lista) {
    const cont = document.getElementById('listaAutos');
    if (!cont) return;
    cont.innerHTML = '';
    lista.forEach(auto => {
        const card = document.createElement('div');
        card.className = 'min-w-[250px] bg-white rounded-xl shadow-md overflow-hidden hover:scale-105 transition-all';
        card.innerHTML = `
            <img src="${auto.imagen}" alt="${auto.nombre}" class="w-full h-40 object-cover">
            <div class="p-4">
                <h4 class="font-semibold text-gray-700 mb-1">${auto.nombre}</h4>
                <p class="text-gray-500">Bs. ${auto.precioHora}/hora</p>
            </div>`;
        cont.appendChild(card);
    });
}

function filtrar(tipo) {
    const lista = tipo === 'todos' ? autos : autos.filter(a => a.tipo === tipo);
    renderAutos(lista);
}

document.addEventListener('DOMContentLoaded', () => {
    renderAutos(autos);
});
