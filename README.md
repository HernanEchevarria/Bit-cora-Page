# Bitácora 🗺️

Red social de viajes: registra tus viajes, conecta con tu pareja o amigos, publica fotos y reseñas, y mira cómo se pintan en el mapa los países que ya conoces. Gana puntos, sube de nivel y desbloquea logros.

> **Estado: MVP / prototipo.** Funciona 100 % en el navegador, sin servidor. Los datos se guardan en el `localStorage` de cada navegador, así que cada persona ve solo lo suyo. Para que los usuarios se vean entre sí hace falta un backend (ver "Siguientes pasos").

## Estructura

```
bitacora-web/
├── index.html        # Estructura de la página
├── css/styles.css    # Estilos (modo claro y oscuro)
├── js/app.js         # Lógica: datos, mapa, feed, logros
├── .nojekyll         # Evita que GitHub Pages procese los archivos
└── README.md
```

No usa librerías ni pasos de compilación: el mapa está dibujado con SVG dentro de `app.js`. Solo carga las fuentes Inter y Grand Hotel desde Google Fonts.

## Probar en tu computadora

Abre `index.html` con doble clic, o levanta un servidor local:

```bash
npx serve .
# o
python3 -m http.server 8000   # y abre http://localhost:8000
```

## Publicar en GitHub Pages

### Opción A: desde la web de GitHub (sin usar la terminal)

1. Entra a <https://github.com/new>, ponle nombre al repositorio (por ejemplo `bitacora`), déjalo **Public** y créalo.
2. En el repositorio vacío, haz clic en **uploading an existing file**.
3. Arrastra **el contenido** de esta carpeta (`index.html`, `css/`, `js/`, `README.md`, `.nojekyll`) y pulsa **Commit changes**.
   - En Mac, los archivos que empiezan con punto están ocultos: pulsa `Cmd + Shift + .` para verlos. Si no subes `.nojekyll`, la página funciona igual.
4. Ve a **Settings → Pages**. En **Source** elige **Deploy from a branch**, rama `main`, carpeta `/ (root)`, y pulsa **Save**.
5. Espera de 1 a 2 minutos. Tu página quedará en:
   `https://TU-USUARIO.github.io/bitacora/`

### Opción B: con la terminal (git)

```bash
cd bitacora-web
git init
git add .
git commit -m "Primera versión de Bitácora"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/bitacora.git
git push -u origin main
```

Luego activa Pages igual que en el paso 4 de la opción A.

### Actualizar la página

Cada vez que cambies algo:

```bash
git add .
git commit -m "Describe tu cambio"
git push
```

GitHub Pages se actualiza solo en uno o dos minutos.

## Qué incluye

- **Inicio con mapa de recompensas:** los países que conoces se pintan en coral, con contador de países, porcentaje del mundo, kilómetros, continentes, niveles y 10 logros.
- **Celebración** con confeti al desbloquear un país, un logro o un nivel.
- **Viajes compartidos** con portada, fechas, participantes, privacidad (público, solo conexiones o privado) y ruta de paradas.
- **Lugares:** se buscan entre destinos sugeridos o se marcan tocando el mapa, y el país se detecta solo.
- **Feed estilo Instagram:** fotos en carrusel, me gusta con doble toque, comentarios y reseñas con estrellas.
- **Perfiles** con cuadrícula de publicaciones y **conexiones** como pareja, amigos, familia o grupo.
- Cuentas de demostración para probar cómo lo ve cada usuario.

## Siguientes pasos para producción

1. **Backend y usuarios reales:** por ejemplo [Supabase](https://supabase.com), que incluye autenticación, base de datos Postgres y almacenamiento de fotos. Reemplaza las funciones `save()` y `seed()` de `app.js` por llamadas a la base de datos.
2. **Fotos:** súbelas a un almacenamiento (Supabase Storage o Cloudinary) en lugar de guardarlas en el navegador.
3. **Búsqueda de lugares real:** usa un servicio de geocodificación (Mapbox o Nominatim) en lugar de la lista fija `GAZ`.
4. **Mapa más detallado:** si necesitas fronteras exactas, cambia el mapa de puntos por Leaflet o MapLibre con datos de Natural Earth.
