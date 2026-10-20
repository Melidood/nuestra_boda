# Invitación web de Ana & Julio

## Archivos
- `index.html`: estructura de la invitación.
- `styles.css`: diseño visual y responsivo.
- `script.js`: configuración editable y cuenta regresiva.
- `assets/`: ilustraciones florales SVG y fotografía placeholder extraída de la referencia.

## Cambiar la fotografía
Reemplaza `assets/foto-pareja-placeholder.png` por tu fotografía optimizada, conservando ese nombre, o cambia `photo` en `script.js` por una ruta relativa como `assets/foto-novios.jpg`. Para obtener el mejor resultado, usa una foto vertical o cuadrada, con los rostros cerca del centro.

La fotografía incluida es solo un recorte aproximado del área visible en la imagen de referencia; conviene reemplazarla por el archivo fotográfico original para obtener mayor nitidez.

## Personalizar
Edita `WEDDING_CONFIG` al inicio de `script.js`. La cuenta regresiva toma como objetivo la medianoche que inicia el 19 de diciembre de 2026 en `America/Mexico_City`, ya que no se proporcionó hora de ceremonia.

## Probar localmente
Abre `index.html` en un navegador moderno. Para evitar restricciones locales en algunos navegadores, también puedes ejecutar desde esta carpeta:
`python3 -m http.server 8000`
y visitar `http://localhost:8000`.

## Publicar gratis
- **GitHub Pages:** sube el contenido de esta carpeta a un repositorio, abre Settings → Pages y selecciona la rama principal y la carpeta raíz.
- **Netlify:** arrastra la carpeta del proyecto al área de despliegue manual de Netlify.
- Sube también la carpeta `assets`; no cambies las rutas relativas.

## Pruebas recomendadas
- Revisar en ancho móvil (320–390 px), tablet y escritorio.
- Confirmar que la fotografía y los dos SVG cargan correctamente.
- Comprobar la cuenta regresiva antes y después de la fecha objetivo.
- Verificar que no exista desplazamiento horizontal.
- Revisar contraste y lectura con zoom de 200 %.

No se ha ejecutado una comparación visual automatizada en múltiples navegadores; la composición es una implementación inicial ajustable y no debe considerarse una réplica pixel-perfect verificada.
