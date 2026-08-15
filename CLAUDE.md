# KeyLab

**Qué es:** web-laboratorio interactivo para **entender el chroma key** (croma verde/azul). Material docente de
**CIFP Tartanga LHII** (Realización A/V). PWA estática en el navegador — **sin backend, sin subir nada a internet**.
Hermano de SoundLab (jugar/entender) y complemento de **LiveMixR** (que hace el croma básico en vivo; KeyLab es el
"para profundizar").

**Principio rector:** es una herramienta **para ENTENDER, no para producir.** El croma "de verdad" lo harán en
After Effects / Fusion. Por eso: **NO hace falta exportar vídeo** (nada de re-codificar en el navegador).

**En vivo (pendiente):** https://keylab.cinemafilmak.com · repo previsto `ondarrupeasu/keylab` (GitHub Pages).

## Decisión de arquitectura CLAVE — modo "fotograma congelado"
Para esquivar el único cuello de botella (reproducción en tiempo real a 4K), **NO hay botón de play**:
- El alumno **carga un vídeo LOCAL** (File API → nunca se sube; privado y offline). Opcional: grabarse con la webcam
  (`getUserMedia`) su propio croma sin salir de la web.
- Hace **scrub por el timeline**, elige el **fotograma** donde quiere trabajar y **ve el croma aplicado en ESE
  fotograma**. Al mover el timeline se recalcula el fotograma nuevo, pero **no se reproduce en continuo**.
- Procesar un solo fotograma es **instantáneo aunque sea 4K**. (Scrub: `<video>.currentTime`+dibujar a canvas, o
  WebCodecs estilo FreeCut si se quiere paso-a-paso exacto.)

## Funciones
- **Chroma key** (shader WebGL): cuentagotas para el color, tolerancia, suavizado/borde.
- **⭐ Los 4 canales R/G/B/A a la vez** (vistas en gris) — la estrella pedagógica. Ej.: en verde, el **canal G sale
  blanquísimo** en el fondo, y el **canal B más ruidoso** → se ve por qué se elige verde vs azul.
- **⭐ Canal ALPHA** destacado (blanco = sujeto, negro = fondo) — enseñar su función es prioritario.
- **Spill suppression (despill):** quitar el tinte verde/azul de los bordes (shader).
- **Fondo + light wrap:** cargar una **imagen de fondo** y que el **light wrap y sus ajustes se basen en ESA imagen**
  (muestrea sus colores y los envuelve en los bordes del matte para integrar).
- **Garbage matte:** el alumno dibuja un polígono en un canvas para tapar micro/pie/bordes.
- **Scopes:** reutilizar la **matemática de scopes de FreeCut** (histograma/waveform/parade/vectorscopio) → ver dónde
  cae el color de croma. FreeCut = MIT; sus scopes son **WGSL/WebGPU** → portar a WebGL o usar WebGPU. Conservar aviso MIT.
- **Extras deseables:** comparar **verde vs azul** con el mismo clip; **vista partida** (original | alpha | compuesto);
  ejemplos de **"croma malo"** (iluminación desigual, sombras) para enseñar a iluminar.

## Límites asumidos (honestos)
- **Sin exportar vídeo** (por diseño). Si algún día se quiere, un PNG del fotograma es fácil.
- **Códecs:** el navegador abre H.264 / WebM / VP9 / AV1 (lo que graban móviles/webcams). ProRes o algún HEVC pueden
  no decodificar en navegador. Menor para este uso.
- El modo "fotograma congelado" evita el problema de 4K en tiempo real.

## Estructura técnica (como SoundLab)
- Estática/PWA: `index.html` + `app.js` + **WebGL2** (shaders del key/despill/lightwrap) + canvas (garbage matte).
  WebGPU opcional para los scopes. File API para el vídeo local. Sin backend, sin build (o mínimo).
- **Deploy:** push a `main` → GitHub Pages sirve `main`. `CNAME` = keylab.cinemafilmak.com. Manifest + iconos para instalable.
- **PASO MANUAL de Alex (cuando se despliegue):** DNS `keylab → ondarrupeasu.github.io` + custom domain + Enforce HTTPS.

## Convenciones (casa de estilo)
- **Coral sobre oscuro**, scrollbars finas 8px, UI **simple e intuitiva** (alumnos).
- **Idiomas:** SoundLab es trilingüe (es/eu/en). Decidir con Alex si KeyLab también (probable que sí, mismo público).

## Créditos / licencia
- **FreeCut = MIT** (scopes que se reutilicen) → conservar aviso. Ver [[freecut-webcodecs-reference]].
- Si se usa **mediabunny** (MPL) para decodificar por WebCodecs → usar sin modificar, conservar aviso.

## Primer paso en la sesión
Preguntar a Alex si arrancar por (a) el key básico + los 4 canales + alpha (el núcleo pedagógico), o (b) montar
primero el cargador de vídeo local + scrub. Recomendado: núcleo primero sobre una imagen fija, luego el vídeo/scrub.
Ver [[livemixr-atem-integration]] (LiveMixR hace el croma básico), [[soundlab-*]] como referencia de web docente,
[[freecut-webcodecs-reference]].
