# EcoRenta Bolivia

Aplicación web para el alquiler de autos eléctricos e híbridos en Bolivia.

## Características

- Interfaz moderna y responsiva con Tailwind CSS
- Sistema de roles (cliente, trabajador, admin)
- Filtrado de autos por tipo (eléctrico/híbrido)
- Gestión de alquileres con validaciones
- Panel de administración para gestión de autos
- Historial de rentas por rol

## Tecnologías Utilizadas

- HTML5
- Tailwind CSS
- JavaScript Vanilla
- No requiere backend ni base de datos

## Estructura del Proyecto

```
ecorenta-bolivia/
├── index.html          # Página principal
├── css/
│   └── styles.css      # Estilos personalizados
├── js/
│   ├── data.js         # Arrays de datos
│   ├── logic.js        # Lógica de negocio
│   └── ui.js           # Manipulación del DOM
└── README.md           # Documentación
```

## Funcionalidades por Rol

### Cliente
- Ver listado de autos disponibles
- Filtrar autos por tipo
- Realizar alquileres
- Ver historial personal de rentas

### Trabajador
- Ver listado de autos
- Ver historial completo de rentas
- Sin capacidad de modificación

### Administrador
- Gestión completa de autos (agregar/eliminar)
- Reinicio de disponibilidad
- Acceso a todas las funcionalidades

## Instalación

1. Clonar el repositorio
2. Abrir `index.html` en un navegador moderno

## Notas

- La aplicación funciona 100% en el frontend
- No hay persistencia de datos (se reinician al recargar)
- No requiere configuración adicional

## Licencia

MIT #   E c o R e n t a  
 