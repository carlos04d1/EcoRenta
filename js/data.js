// Arrays de datos
const autos = [
    {
        id: 1,
        nombre: "Tesla Model 3",
        tipo: "electrico",
        precioHora: 240,
        disponible: true,
        imagen: "https://www.shop4tesla.com/cdn/shop/articles/lohnt-sich-ein-gebrauchtes-tesla-model-3-vor-und-nachteile-833053.jpg?v=1733570691"
    },
    {
        id: 2,
        nombre: "Hyundai loniq 6",
        tipo: "electrico",
        precioHora: 208,
        disponible: true,
        imagen: "https://hips.hearstapps.com/hmg-prod/images/hyundai-ioniq-6-141-64594931612f1.jpg?crop=0.681xw:0.575xh;0.207xw,0.409xh&resize=2048:*"
    },
    {
        id: 3,
        nombre: "Kia Ev9",
        tipo: "electrico",
        precioHora: 288,
        disponible: true,
        imagen: "https://stimg.cardekho.com/images/carexteriorimages/930x620/Kia/EV9/9560/1727949076624/front-left-side-47.jpg"
    },
    {
        id: 4,
        nombre: "Volkswagen ID. Buzz",
        tipo: "electrico",
        precioHora: 272,
        disponible: true,
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpGRPP3jmBEbZXdG9jKKXtGHFuisc1yAWO6g&s"
    },
    {
        id: 6,
        nombre: "Ford Mustang Mach-E",
        tipo: "electrico",
        precioHora: 256,
        disponible: true,
        imagen: "https://hips.hearstapps.com/hmg-prod/images/2025-ford-mustang-mach-e-premium-sport-appearance-exterior-104-67166e9edffb1.jpg"
    },
    {
        id: 7,
        nombre: "Rivian R1T",
        tipo: "electrico",
        precioHora: 320,
        disponible: true,
        imagen: "https://cdn.motor1.com/images/mgl/0eKrAn/325:196:2299:1724/rivian-r1t.webp"
    },
    {
        id: 8,
        nombre: "BMW i4 M50",
        tipo: "electrico",
        precioHora: 304,
        disponible: true,
        imagen: "https://i.redd.it/sbui8tb57toc1.jpeg"
    },
    {
        id: 9,
        nombre: "Chevrolet Bolt EUV",
        tipo: "electrico",
        precioHora: 192,
        disponible: true,
        imagen: "https://di-uploads-pod31.dealerinspire.com/executivechevy/uploads/2022/10/2022-Chevrolet-Bolt-EUV-Premier.png"
    },
    {
        id: 10,
        nombre: "Toyota Accord Hybrid",
        tipo: "hibrido",
        precioHora: 160,
        disponible: true,
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUZKmEsnmA6XENcja9zsk1br4KZvgKx3QXIg&s"
    },
    {
        id: 11,
        nombre: "Honda Accord Hybrid",
        tipo: "hibrido",
        precioHora: 176,
        disponible: true,
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6r05dxr_t8_xjFGScggc-PX0j9_Wz984aeA&s"
    },
    {
        id: 12,
        nombre: "Toyota Prius",
        tipo: "hibrido",
        precioHora: 144,
        disponible: true,
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbgtYWLNvnNNjqFNR_YEqo_hP4Zv81a4tdwA&s"
    },
    {
        id: 13,
        nombre: "Hyundai Tucson Hybrid",
        tipo: "hibrido",
        precioHora: 192,
        disponible: true,
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPJiwpSBbDtlOpMQpOemyJmZrRLirVB7qDZA&s"
    },
    {
        id: 14,
        nombre: "Kia Sportage Hybrid",
        tipo: "hibrido",
        precioHora: 176,
        disponible: true,
        imagen: "https://hips.hearstapps.com/hmg-prod/images/2023-kia-sportage-hybrid-sx-prestige-awd-206-1673464779.jpg?crop=0.726xw:0.612xh;0.239xw,0.288xh&resize=2048:*"
    },
    {
        id: 15,
        nombre: "Ford Maverick Hybrid",
        tipo: "hibrido",
        precioHora: 208,
        disponible: true,
        imagen: "https://cdn.prod.website-files.com/5ec85520c4dfff034b036be2/66c63e70b7367d01def1e2f0_ford-maverick-hybrid-awd_main.webp"
    }
];
const reservasConfirmadas = [
    {
        id: 1,
        cliente: "Juan Pérez",
        clienteCI: "123456",
        autoId: 1,
        fechaInicio: "2024-03-20T10:00",
        fechaFin: "2024-03-20T14:00",
        trabajadorNombre: "Ana Torres",
        trabajadorCI: "12345",
        estado: "confirmada",
        total: 600,
        fechaConfirmacion: "2024-03-19T15:30:00.000Z"
    },
    {
        id: 2,
        cliente: "María Gómez",
        clienteCI: "234567",
        autoId: 3,
        fechaInicio: "2024-03-22T09:00",
        fechaFin: "2024-03-22T15:00",
        trabajadorNombre: "Luis López",
        trabajadorCI: "98765",
        estado: "confirmada",
        total: 1728,
        fechaConfirmacion: "2024-03-21T14:20:00.000Z"
    },
    {
        id: 3,
        cliente: "Carlos Sánchez",
        clienteCI: "345678",
        autoId: 10,
        fechaInicio: "2024-03-25T08:00",
        fechaFin: "2024-03-25T12:00",
        trabajadorNombre: "Ana Torres",
        trabajadorCI: "12345",
        estado: "confirmada",
        total: 640,
        fechaConfirmacion: "2024-03-24T16:45:00.000Z"
    },
    {
        id: 4,
        cliente: "Laura Ruiz",
        clienteCI: "456789",
        autoId: 14,
        fechaInicio: "2024-03-26T14:00",
        fechaFin: "2024-03-26T18:00",
        trabajadorNombre: "Luis López",
        trabajadorCI: "98765",
        estado: "confirmada",
        total: 704,
        fechaConfirmacion: "2024-03-25T11:15:00.000Z"
    },
    {
        id: 5,
        cliente: "Pedro Morales",
        clienteCI: "567890",
        autoId: 8,
        fechaInicio: "2024-03-27T09:00",
        fechaFin: "2024-03-27T17:00",
        trabajadorNombre: "Ana Torres",
        trabajadorCI: "12345",
        estado: "confirmada",
        total: 2432,
        fechaConfirmacion: "2024-03-26T13:30:00.000Z"
    }
];

const reservasPendientes = [
    {
        id: Date.now() - 1000,
        clienteNombre: "María López",
        clienteCI: "789012",
        autoID: 2,
        fechaInicio: "2024-12-20T14:00",
        fechaFin: "2024-12-20T18:00",
        estado: "pendiente",
        fechaCreacion: "2024-12-19T10:30:00.000Z"
    },
    {
        id: Date.now() - 2000,
        clienteNombre: "Carlos Rodríguez",
        clienteCI: "345678",
        autoID: 5,
        fechaInicio: "2024-12-21T09:00",
        fechaFin: "2024-12-21T17:00",
        estado: "pendiente",
        fechaCreacion: "2024-12-19T11:15:00.000Z"
    }
];
const revisionesVehiculo = [
    {
        autoID: 1,
        estadoAnterior: "Buen estado",
        notas: "Sin observaciones",
        trabajadorNombre: "Ana Torres",
        trabajadorCI: "12345",
        fechaRevision: "2024-03-01"
    },
    {
        autoID: 3,
        estadoAnterior: "Necesita limpieza",
        notas: "Se sugirió lavado",
        trabajadorNombre: "Luis López",
        trabajadorCI: "98765",
        fechaRevision: "2024-03-05"
    },
    {
        autoID: 10,
        estadoAnterior: "Rasguño leve",
        notas: "Daño en puerta",
        trabajadorNombre: "Ana Torres",
        trabajadorCI: "12345",
        fechaRevision: "2024-03-10"
    },
    {
        autoID: 7,
        estadoAnterior: "Buen estado",
        notas: "Chequeo de rutina",
        trabajadorNombre: "Luis López",
        trabajadorCI: "98765",
        fechaRevision: "2024-03-15"
    },
    {
        autoID: 14,
        estadoAnterior: "Neumáticos desgastados",
        notas: "Próximo reemplazo",
        trabajadorNombre: "Ana Torres",
        trabajadorCI: "12345",
        fechaRevision: "2024-03-18"
    }
];
const multas = [
    {
        clienteCI: "123456",
        clienteNombre: "Juan Pérez",
        vehiculo: "Tesla Model 3",
        motivo: "Exceso de velocidad",
        monto: 150,
        trabajador: "Ana Torres",
        trabajadorCI: "12345",
        fecha: "2024-03-20",
        estado: "pendiente"
    },
    {
        clienteCI: "234567",
        clienteNombre: "María Gómez",
        vehiculo: "Kia Ev9",
        motivo: "Mal estacionamiento",
        monto: 100,
        trabajador: "Luis López",
        trabajadorCI: "98765",
        fecha: "2024-03-22",
        estado: "pendiente"
    },
    {
        clienteCI: "345678",
        clienteNombre: "Carlos Sánchez",
        vehiculo: "Toyota Accord Hybrid",
        motivo: "Daños menores",
        monto: 200,
        trabajador: "Ana Torres",
        trabajadorCI: "12345",
        fecha: "2024-03-25",
        estado: "pendiente"
    },
    {
        clienteCI: "456789",
        clienteNombre: "Laura Ruiz",
        vehiculo: "Kia Sportage Hybrid",
        motivo: "No devolver a tiempo",
        monto: 250,
        trabajador: "Luis López",
        trabajadorCI: "98765",
        fecha: "2024-03-26",
        estado: "pendiente"
    },
    {
        clienteCI: "567890",
        clienteNombre: "Pedro Morales",
        vehiculo: "BMW i4 M50",
        motivo: "Uso no autorizado",
        monto: 300,
        trabajador: "Ana Torres",
        trabajadorCI: "12345",
        fecha: "2024-03-27",
        estado: "pendiente"
    }
];

// Funciones para persistir datos en localStorage
function guardarDatos() {
    localStorage.setItem('ecorenta-reservas-pendientes', JSON.stringify(reservasPendientes));
    localStorage.setItem('ecorenta-reservas-confirmadas', JSON.stringify(reservasConfirmadas));
    localStorage.setItem('ecorenta-autos', JSON.stringify(autos));
    localStorage.setItem('ecorenta-revisiones', JSON.stringify(revisionesVehiculo));
    localStorage.setItem('ecorenta-multas', JSON.stringify(multas));
}

function cargarDatos() {
    const reservasPendientesGuardadas = localStorage.getItem('ecorenta-reservas-pendientes');
    const reservasConfirmadasGuardadas = localStorage.getItem('ecorenta-reservas-confirmadas');
    const autosGuardados = localStorage.getItem('ecorenta-autos');
    const revisionesGuardadas = localStorage.getItem('ecorenta-revisiones');
    const multasGuardadas = localStorage.getItem('ecorenta-multas');

    if (reservasPendientesGuardadas) {
        reservasPendientes.length = 0;
        reservasPendientes.push(...JSON.parse(reservasPendientesGuardadas));
    }
    
    if (reservasConfirmadasGuardadas) {
        reservasConfirmadas.length = 0;
        reservasConfirmadas.push(...JSON.parse(reservasConfirmadasGuardadas));
    }
    
    if (autosGuardados) {
        autos.length = 0;
        autos.push(...JSON.parse(autosGuardados));
    }
    
    if (revisionesGuardadas) {
        revisionesVehiculo.length = 0;
        revisionesVehiculo.push(...JSON.parse(revisionesGuardadas));
    }
    
    if (multasGuardadas) {
        multas.length = 0;
        multas.push(...JSON.parse(multasGuardadas));
    }
}

// Cargar datos al inicializar
cargarDatos();
