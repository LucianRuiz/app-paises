# 🌍 App de Países del Mundo

Una aplicación web moderna desarrollada con Next.js que permite explorar información de países de todo el mundo con filtros avanzados y sistema de favoritos.

## ✨ Características

### Requisitos Mínimos ✅
- **Listado de países** con nombre, bandera, región y población
- **Búsqueda por nombre** (case-insensitive)
- **Filtro por región** con todas las regiones disponibles
- **Rango de población** (mínimo y máximo)
- **Modal de detalles** con información completa del país
- **Sistema de favoritos** con estado global persistente
- **Página de favoritos** en `/favorites`

### Funcionalidad Opcional ✅
- **Persistencia de filtros en URL** - Los filtros se mantienen al recargar la página

### Características Adicionales
- **Diseño responsive** optimizado para móviles y desktop
- **Animaciones suaves** y transiciones
- **Manejo de errores** y estados de carga
- **Persistencia de favoritos** en localStorage

## 🚀 Cómo ejecutar la aplicación

### Prerrequisitos
- Node.js 18+ 
- npm o yarn

### Instalación

1. **Instalar dependencias**
   ```bash
   npm install
   ```

2. **Ejecutar en modo desarrollo**
   ```bash
   npm run dev
   ```

3. **Abrir en el navegador**
   ```
   http://localhost:3000
   ```
   
## 🛠️ Tecnologías utilizadas

- **Next.js 15** - Framework de React
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos utilitarios
- **ShadCN UI** - Componentes de interfaz
- **Lucide React** - Iconos
- **REST Countries API** - Datos de países

## 📱 Funcionalidades

### Página Principal (`/`)
- Listado de todos los países con información básica
- Sistema de búsqueda en tiempo real
- Filtros avanzados (región, población)
- Cards interactivas con hover effects
- Modal de detalles al hacer clic

### Página de Favoritos (`/favorites`)
- Lista de países marcados como favoritos
- Opción de eliminar favoritos individuales
- Botón para limpiar todos los favoritos

### Filtros y Búsqueda
- **Búsqueda**: Por nombre común u oficial
- **Región**: Dropdown con todas las regiones
- **Población**: Rango mínimo y máximo
- **Persistencia**: Los filtros se mantienen en la URL

### Sistema de Favoritos
- Botón de corazón en cada card
- Persistencia en localStorage
- Estado global con React Context
- Indicadores visuales de favoritos

## 🔧 API utilizada

La aplicación consume la API pública de REST Countries:
```
https://restcountries.com/v3.1/all?fields=name,cca3,flags,region,population,capital
```

## 📱 Responsive Design

- **Mobile First**: Optimizado para dispositivos móviles
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Grid adaptativo**: 1 columna en móvil, hasta 4 en desktop
- **Navegación táctil**: Botones y áreas de toque optimizadas

## 📝 Notas de desarrollo

- **Manejo de errores**: Implementado en el hook de API
- **Estados de carga**: Spinners y mensajes informativos
- **Accesibilidad**: Labels, alt texts y navegación por teclado
- **Performance**: Lazy loading y optimizaciones de imágenes
- **SEO**: Metadatos y estructura semántica
+
