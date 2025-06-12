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
        precioHora: 1920,
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

const rentasConfirmadas = [
    {
        id: 1,
        cliente: "Juan Pérez",
        autoId: 1,
        fechaInicio: "2024-03-20T10:00",
        fechaFin: "2024-03-20T14:00",
        total: 600
    }
];

const solicitudesPendientes = [];
const revisionesVehiculo = [];
const multas = [];