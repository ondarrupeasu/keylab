/* KeyLab — núcleo WebGL2: chroma key + 4 canales R/G/B/A + alpha.
   Todo local, sin backend. Material docente CIFP Tartanga LHII. */

'use strict';

/* ------------------------------------------------------------------ */
/*  i18n                                                               */
/* ------------------------------------------------------------------ */
const I18N = {
  es: {
    subtitle: 'Laboratorio de croma',
    reset: '↺ Reiniciar',
    'help.btn': '? Ayuda',
    'help.title': 'Guía rápida',
    'ex.title': 'Ejemplos de croma',
    'ex.green': 'Croma verde',
    'ex.blue': 'Croma azul',
    'ex.hint.green': 'Modelo sobre croma VERDE. Su ropa azul va perfecta aquí, pero sobre croma azul desaparecería: el vestuario nunca debe ser del color del fondo. Coge el verde y pasa a Compuesto (fíjate en el pelo, el reto del alpha).',
    'ex.hint.blue': 'Modelo sobre croma AZUL, con ropa neutra: por eso funciona. Coge el azul con el cuentagotas. El key es el mismo; solo cambia el color y el canal más ruidoso.',
    'src.title': 'Fuente',
    'src.load': 'Cargar imagen o vídeo…',
    'src.demo': 'Demo',
    'src.webcam': 'Webcam',
    'src.hint': 'Arrastra una imagen o vídeo aquí. Todo es local: nada se sube a internet.',
    'webcam.live': 'En directo',
    'webcam.freeze': 'Congelar',
    'webcam.resume': 'Reanudar',
    'webcam.error': 'No se pudo acceder a la cámara. Da permiso al navegador (y usa https).',
    'nm.title': 'Pipeline',
    'nm.source': 'Fuente',
    'nm.key': 'Key',
    'nm.despill': 'Despill',
    'nm.bg': 'Fondo',
    'nm.merge': 'Merge',
    'nm.lw': 'light wrap',
    'media.frozen': 'Modo fotograma congelado: mueve el timeline y elige el cuadro. No se reproduce en continuo.',
    'media.badcodec': 'No se puede decodificar este vídeo en el navegador (¿ProRes o HEVC?). Prueba con MP4 (H.264) o WebM.',
    'key.despill': 'Despill',
    'key.despill.hint': 'Despill: quita el tinte del croma que se cuela en los bordes del sujeto.',
    'bg.title': 'Fondo y light wrap',
    'bg.load': 'Cargar fondo…',
    'bg.clear': 'Quitar',
    'bg.wrap': 'Light wrap',
    'bg.radius': 'Radio',
    'bg.hint': 'El compuesto se ve sobre esta imagen; el light wrap envuelve sus colores en los bordes del sujeto (solo en vista Compuesto).',
    'matte.title': 'Garbage matte',
    'matte.draw': 'Dibujar',
    'matte.finish': 'Terminar',
    'matte.clear': 'Borrar',
    'matte.invert': 'Invertir',
    'matte.hint': 'Pulsa «Dibujar» y haz clic para marcar un polígono alrededor del sujeto; lo de fuera se quita (o lo de dentro si inviertes).',
    'plate.title': 'Clean plate',
    'plate.capture': 'Capturar fondo vacío',
    'plate.clear': 'Quitar',
    'plate.use': 'Keyear por diferencia',
    'plate.hint': 'Ve a un fotograma SIN sujeto (fondo vacío) y captúralo. El key comparará cada píxel con ese fondo: aguanta la iluminación desigual.',
    'nm.matte': 'Garbage',
    'nm.plate': 'Clean plate',
    'scope.title': 'Scopes',
    'scope.off': 'Ninguno',
    'scope.hist': 'Histograma',
    'scope.wave': 'Waveform',
    'scope.parade': 'Parade',
    'scope.vector': 'Vectorscopio',
    'scope.hint': 'En el vectorscopio, el aro coral marca dónde cae el color de croma.',
    'key.title': 'Chroma key',
    'key.pick': 'Cuentagotas',
    'key.tolerance': 'Tolerancia',
    'key.softness': 'Suavizado',
    'save.png': '⬇ Guardar PNG',
    'view.title': 'Vista',
    'view.composite': 'Compuesto',
    'view.original': 'Original',
    'view.alpha': 'Alpha',
    'view.rgba': 'Canales RGBA',
    'view.split': 'Partida',
    'view.hint.composite': 'Croma aplicado sobre cuadros: lo transparente deja ver el ajedrezado.',
    'view.hint.original': 'La imagen tal cual, sin key.',
    'view.hint.alpha': 'El matte: blanco = sujeto, negro = fondo. Su función es decir qué se ve.',
    'view.hint.rgba': 'Los 4 canales a la vez. Fíjate: en verde el canal G sale muy claro y el B más ruidoso.',
    'view.hint.split': 'Original | alpha | compuesto a la vez, para comparar de un vistazo.',
    'drop.big': 'Carga una imagen o vídeo para empezar',
    'drop.small': 'o pulsa «Demo» para ver un croma de ejemplo',
    'foot.credits': 'CIFP Tartanga LHII · Realización A/V',
    'pick.on': 'Cuentagotas activo — pulsa en la imagen',
  },
  eu: {
    subtitle: 'Kroma laborategia',
    reset: '↺ Berrabiarazi',
    'help.btn': '? Laguntza',
    'help.title': 'Gida azkarra',
    'ex.title': 'Kroma adibideak',
    'ex.green': 'Kroma berdea',
    'ex.blue': 'Kroma urdina',
    'ex.hint.green': 'Modeloa kroma BERDEAN. Bere arropa urdina primeran dabil hemen, baina kroma urdinaren gainean desagertu egingo litzateke: jantziak ez du inoiz atzealdearen kolorekoa izan behar. Hartu berdea eta pasatu Konposatura (begiratu ileari, alpha-ren erronka).',
    'ex.hint.blue': 'Modeloa kroma URDINEAN, arropa neutroarekin: horregatik dabil ondo. Hartu urdina tanta-kontagailuarekin. Key-a berbera da; kolorea eta kanal zaratatsuena baino ez dira aldatzen.',
    'src.title': 'Iturria',
    'src.load': 'Kargatu irudia edo bideoa…',
    'src.demo': 'Demo',
    'src.webcam': 'Webcama',
    'src.hint': 'Arrastatu irudi edo bideo bat hona. Dena lokala da: ezer ez da internetera igotzen.',
    'webcam.live': 'Zuzenean',
    'webcam.freeze': 'Izoztu',
    'webcam.resume': 'Berrekin',
    'webcam.error': 'Ezin izan da kamera atzitu. Eman baimena nabigatzaileari (eta erabili https).',
    'nm.title': 'Pipeline',
    'nm.source': 'Iturria',
    'nm.key': 'Key',
    'nm.despill': 'Despill',
    'nm.bg': 'Atzealdea',
    'nm.merge': 'Merge',
    'nm.lw': 'light wrap',
    'media.frozen': 'Fotograma izoztuaren modua: mugitu denbora-lerroa eta aukeratu markoa. Ez da jarraian erreproduzitzen.',
    'media.badcodec': 'Bideo hau ezin da nabigatzailean deskodetu (ProRes edo HEVC?). Saiatu MP4 (H.264) edo WebM formatuarekin.',
    'key.despill': 'Despill',
    'key.despill.hint': 'Despill: subjektuaren ertzetan sartzen den kroma-tindua kentzen du.',
    'bg.title': 'Atzealdea eta light wrap',
    'bg.load': 'Kargatu atzealdea…',
    'bg.clear': 'Kendu',
    'bg.wrap': 'Light wrap',
    'bg.radius': 'Erradioa',
    'bg.hint': 'Konposatua irudi honen gainean ikusten da; light wrap-ek bere koloreak subjektuaren ertzetan biltzen ditu (Konposatua ikuspegian soilik).',
    'matte.title': 'Garbage matte',
    'matte.draw': 'Marraztu',
    'matte.finish': 'Amaitu',
    'matte.clear': 'Ezabatu',
    'matte.invert': 'Alderantzikatu',
    'matte.hint': 'Sakatu «Marraztu» eta egin klik subjektuaren inguruan poligono bat markatzeko; kanpokoa kentzen da (edo barrukoa alderantzikatzen baduzu).',
    'plate.title': 'Clean plate',
    'plate.capture': 'Hartu atzealde hutsa',
    'plate.clear': 'Kendu',
    'plate.use': 'Diferentziaz keyeatu',
    'plate.hint': 'Joan subjekturik GABEKO fotograma batera (atzealde hutsa) eta hartu. Key-ak pixel bakoitza atzealde horrekin alderatuko du: argiztapen desorekatua jasaten du.',
    'nm.matte': 'Garbage',
    'nm.plate': 'Clean plate',
    'scope.title': 'Scope-ak',
    'scope.off': 'Bat ere ez',
    'scope.hist': 'Histograma',
    'scope.wave': 'Waveform',
    'scope.parade': 'Parade',
    'scope.vector': 'Bektorroskopioa',
    'scope.hint': 'Bektorroskopioan, koral eraztunak kroma-kolorea non erortzen den markatzen du.',
    'key.title': 'Chroma key',
    'key.pick': 'Tanta-kontagailua',
    'key.tolerance': 'Tolerantzia',
    'key.softness': 'Leuntzea',
    'save.png': '⬇ Gorde PNG',
    'view.title': 'Ikuspegia',
    'view.composite': 'Konposatua',
    'view.original': 'Jatorrizkoa',
    'view.alpha': 'Alpha',
    'view.rgba': 'RGBA kanalak',
    'view.split': 'Zatitua',
    'view.hint.composite': 'Kroma laukien gainean: gardena denak lauki-taula erakusten du.',
    'view.hint.original': 'Irudia bere horretan, key-rik gabe.',
    'view.hint.alpha': 'Mattea: zuria = subjektua, beltza = atzealdea. Zer ikusten den esaten du.',
    'view.hint.rgba': '4 kanalak batera. Begiratu: berdean G kanala oso argi ateratzen da eta B zaratatsuagoa.',
    'view.hint.split': 'Jatorrizkoa | alpha | konposatua batera, begiratu batez alderatzeko.',
    'drop.big': 'Kargatu irudi edo bideo bat hasteko',
    'drop.small': 'edo sakatu «Demo» adibide bat ikusteko',
    'foot.credits': 'CIFP Tartanga LHII · Ikus-entzunezko Errealizazioa',
    'pick.on': 'Tanta-kontagailua aktibo — sakatu irudian',
  },
  en: {
    subtitle: 'Chroma key lab',
    reset: '↺ Reset',
    'help.btn': '? Help',
    'help.title': 'Quick guide',
    'ex.title': 'Chroma examples',
    'ex.green': 'Green screen',
    'ex.blue': 'Blue screen',
    'ex.hint.green': 'Model on a GREEN screen. Her blue clothes work fine here, but on a blue screen they’d vanish: wardrobe must never match the screen colour. Pick the green and switch to Composite (watch the hair, the alpha challenge).',
    'ex.hint.blue': 'Model on a BLUE screen, wearing neutral clothes: that’s why it works. Pick the blue with the eyedropper. Same key; only the colour and the noisiest channel change.',
    'src.title': 'Source',
    'src.load': 'Load image or video…',
    'src.demo': 'Demo',
    'src.webcam': 'Webcam',
    'src.hint': 'Drop an image or video here. Everything is local: nothing is uploaded.',
    'webcam.live': 'Live',
    'webcam.freeze': 'Freeze',
    'webcam.resume': 'Resume',
    'webcam.error': 'Could not access the camera. Grant the browser permission (and use https).',
    'nm.title': 'Pipeline',
    'nm.source': 'Source',
    'nm.key': 'Key',
    'nm.despill': 'Despill',
    'nm.bg': 'Background',
    'nm.merge': 'Merge',
    'nm.lw': 'light wrap',
    'media.frozen': 'Frozen-frame mode: move the timeline and pick the frame. It does not play back.',
    'media.badcodec': 'This video can’t be decoded in the browser (ProRes or HEVC?). Try MP4 (H.264) or WebM.',
    'key.despill': 'Despill',
    'key.despill.hint': 'Despill: removes the chroma tint that spills onto the subject’s edges.',
    'bg.title': 'Background & light wrap',
    'bg.load': 'Load background…',
    'bg.clear': 'Remove',
    'bg.wrap': 'Light wrap',
    'bg.radius': 'Radius',
    'bg.hint': 'The composite is shown over this image; light wrap wraps its colours onto the subject’s edges (Composite view only).',
    'matte.title': 'Garbage matte',
    'matte.draw': 'Draw',
    'matte.finish': 'Finish',
    'matte.clear': 'Clear',
    'matte.invert': 'Invert',
    'matte.hint': 'Press “Draw” and click to mark a polygon around the subject; everything outside is removed (or inside, if you invert).',
    'plate.title': 'Clean plate',
    'plate.capture': 'Capture empty screen',
    'plate.clear': 'Remove',
    'plate.use': 'Key by difference',
    'plate.hint': 'Go to a frame with NO subject (empty screen) and capture it. The key then compares every pixel to that screen: it survives uneven lighting.',
    'nm.matte': 'Garbage',
    'nm.plate': 'Clean plate',
    'scope.title': 'Scopes',
    'scope.off': 'None',
    'scope.hist': 'Histogram',
    'scope.wave': 'Waveform',
    'scope.parade': 'Parade',
    'scope.vector': 'Vectorscope',
    'scope.hint': 'On the vectorscope, the coral ring marks where the chroma colour falls.',
    'key.title': 'Chroma key',
    'key.pick': 'Eyedropper',
    'key.tolerance': 'Tolerance',
    'key.softness': 'Softness',
    'save.png': '⬇ Save PNG',
    'view.title': 'View',
    'view.composite': 'Composite',
    'view.original': 'Original',
    'view.alpha': 'Alpha',
    'view.rgba': 'RGBA channels',
    'view.split': 'Split',
    'view.hint.composite': 'Key applied over a checkerboard: transparent areas show it through.',
    'view.hint.original': 'The image as-is, no key.',
    'view.hint.alpha': 'The matte: white = subject, black = background. It decides what shows.',
    'view.hint.rgba': 'All 4 channels at once. Note: on green, the G channel is very bright and B is noisier.',
    'view.hint.split': 'Original | alpha | composite at once, to compare at a glance.',
    'drop.big': 'Load an image or video to start',
    'drop.small': 'or press “Demo” to see an example key',
    'foot.credits': 'CIFP Tartanga LHII · A/V Production',
    'pick.on': 'Eyedropper active — click on the image',
  },
};

let lang = localStorage.getItem('keylab.lang') || 'es';
let demoHintKey = null;   // clave i18n del ejemplo cargado (croma malo)

/* Contenido del panel de ayuda (guía rápida) por idioma */
const HELP = {
  es: [
    ['¿Qué es el chroma key?', 'Grabas al sujeto delante de un fondo de color uniforme (verde o azul) y ese color se vuelve transparente para poner otro fondo. Aquí trabajas sobre un fotograma congelado: mueves el timeline, eliges el cuadro y ves el key en ESE fotograma, sin reproducir.'],
    ['Verde vs azul', 'Se elige el color más lejano a la piel. El verde suele dar una señal más limpia (la cámara capta más resolución en ese canal); el azul es más ruidoso, pero útil si en el vestuario o el atrezo hay verdes.'],
    ['El canal alpha', 'Es el matte: blanco = sujeto (se ve), negro = fondo (se quita), grises = semitransparente (bordes, pelo). Es lo que decide qué se compone. Míralo en la vista «Alpha».'],
    ['Vestuario', 'Nunca vistas al sujeto del color del croma: ropa verde sobre verde (o azul sobre azul) desaparece con el fondo. Por eso elegimos el color del croma según el vestuario, o al revés.'],
    ['Tolerancia y suavizado', 'Con el cuentagotas eliges el color clave. La tolerancia es cuánto se parece un píxel a ese color para considerarlo fondo; el suavizado, cómo de progresivo es el borde.'],
    ['Despill y light wrap', 'El despill quita el tinte del croma que rebota en los bordes del sujeto. Si cargas una imagen de fondo, el light wrap envuelve sus colores en el borde para integrar el sujeto.'],
    ['Garbage matte y clean plate', 'Garbage matte: dibujas un polígono para tapar lo que sobra (pie de foco, micro, banderas). Clean plate: capturas un fotograma del fondo vacío y el key compara cada píxel con él, aguantando la iluminación desigual.'],
    ['Scopes', 'Histograma, waveform, parade y vectorscopio muestran dónde caen los colores. En el vectorscopio, el aro coral marca el color del croma. Son la misma matemática que usan las mesas de realización.'],
    ['Créditos', 'Fotos demo: “Girl in front of a green background” de PictureYouth (CC BY 2.0, Wikimedia Commons) y un retrato de Pexels. Scopes: matemática tipo FreeCut (MIT). Material docente de CIFP Tartanga LHII.'],
  ],
  eu: [
    ['Zer da chroma key-a?', 'Subjektua kolore uniformeko atzealde baten aurrean grabatzen duzu (berdea edo urdina) eta kolore hori gardena bihurtzen da beste atzealde bat jartzeko. Hemen fotograma izoztu batekin lan egiten duzu: denbora-lerroa mugitu, markoa aukeratu eta key-a marko HORRETAN ikusi, erreproduzitu gabe.'],
    ['Berdea vs urdina', 'Azaletik urrunen dagoen kolorea aukeratzen da. Berdeak seinale garbiagoa ematen du normalean; urdina zaratatsuagoa da, baina baliagarria jantzian edo atrezzoan berdeak badaude.'],
    ['Alpha kanala', 'Mattea da: zuria = subjektua (ikusten da), beltza = atzealdea (kentzen da), grisak = erdi-gardena (ertzak, ilea). Zer konposatzen den erabakitzen du. Ikusi «Alpha» ikuspegian.'],
    ['Jantzia', 'Ez jantzi subjektua kromaren kolorez: arropa berdea berdearen gainean (edo urdina urdinaren gainean) atzealdearekin desagertzen da. Horregatik aukeratzen da kromaren kolorea jantziaren arabera, edo alderantziz.'],
    ['Tolerantzia eta leuntzea', 'Tanta-kontagailuarekin kolore gakoa aukeratzen duzu. Tolerantzia: pixel bat kolore horretatik zenbateraino hurbil dagoen atzealdetzat hartzeko; leuntzea: ertza zenbateraino progresiboa den.'],
    ['Despill eta light wrap', 'Despill-ak subjektuaren ertzetan islatzen den kroma-tindua kentzen du. Atzealde-irudi bat kargatzen baduzu, light wrap-ek bere koloreak ertzean biltzen ditu subjektua integratzeko.'],
    ['Garbage matte eta clean plate', 'Garbage matte: poligono bat marrazten duzu soberan dagoena estaltzeko (oin-fokua, mikroa). Clean plate: atzealde hutseko fotograma bat hartzen duzu eta key-ak pixel bakoitza harekin alderatzen du, argiztapen desorekatua jasanez.'],
    ['Scope-ak', 'Histograma, waveform, parade eta bektorroskopioak koloreak non erortzen diren erakusten dute. Bektorroskopioan, koral eraztunak kromaren kolorea markatzen du.'],
    ['Kredituak', 'Demo argazkiak: PictureYouth-en “Girl in front of a green background” (CC BY 2.0, Wikimedia) eta Pexels-eko erretratu bat. Scope-ak: FreeCut moduko matematika (MIT). CIFP Tartanga LHII-ren material didaktikoa.'],
  ],
  en: [
    ['What is chroma key?', 'You shoot the subject in front of an even coloured screen (green or blue) and that colour becomes transparent so you can drop in another background. Here you work on a frozen frame: scrub the timeline, pick the frame and see the key on THAT frame, without playback.'],
    ['Green vs blue', 'You pick the colour furthest from skin. Green usually gives a cleaner signal (the camera captures more resolution in that channel); blue is noisier but useful when wardrobe or props have greens.'],
    ['The alpha channel', 'It is the matte: white = subject (kept), black = background (removed), greys = semi-transparent (edges, hair). It decides what gets composited. See the “Alpha” view.'],
    ['Wardrobe', 'Never dress the subject in the screen colour: green clothes on green (or blue on blue) vanish with the background. So you choose the screen colour to suit wardrobe, or vice versa.'],
    ['Tolerance and softness', 'The eyedropper picks the key colour. Tolerance is how close a pixel must be to that colour to count as background; softness is how gradual the edge is.'],
    ['Despill and light wrap', 'Despill removes the screen tint that bounces onto the subject’s edges. If you load a background image, light wrap wraps its colours onto the edge to blend the subject in.'],
    ['Garbage matte and clean plate', 'Garbage matte: draw a polygon to hide junk (light stands, mic, flags). Clean plate: capture a frame of the empty screen and the key compares each pixel to it, surviving uneven lighting.'],
    ['Scopes', 'Histogram, waveform, parade and vectorscope show where the colours land. On the vectorscope, the coral ring marks the screen colour. Same maths the gallery scopes use.'],
    ['Credits', 'Demo photos: “Girl in front of a green background” by PictureYouth (CC BY 2.0, Wikimedia Commons) and a portrait from Pexels. Scopes: FreeCut-style maths (MIT). Teaching material for CIFP Tartanga LHII.'],
  ],
};

function applyLang() {
  const dict = I18N[lang] || I18N.es;
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (dict[key] != null) el.textContent = dict[key];
  });
  document.querySelectorAll('.lang').forEach((b) =>
    b.classList.toggle('active', b.dataset.lang === lang));
  updateViewHint();
  updatePickLabel();
  updateExampleHint();
  if (typeof updateMatteLabel === 'function') updateMatteLabel();
  if (!document.getElementById('helpModal').hidden) renderHelp();
}
function t(key) { return (I18N[lang] || I18N.es)[key] || key; }
function updateExampleHint() {
  const el = document.getElementById('exampleHint');
  if (!el) return;
  el.textContent = demoHintKey ? t(demoHintKey) : '';
  el.hidden = !demoHintKey;
}

/* ------------------------------------------------------------------ */
/*  WebGL2                                                             */
/* ------------------------------------------------------------------ */
const canvas = document.getElementById('gl');
const gl = canvas.getContext('webgl2', { premultipliedAlpha: false, antialias: false, preserveDrawingBuffer: true });
if (!gl) {
  document.getElementById('dropHint').innerHTML =
    '<p>Tu navegador no soporta WebGL2</p>';
}

const VERT = `#version 300 es
in vec2 aPos;
out vec2 vUv;
void main() {
  vUv = vec2(aPos.x * 0.5 + 0.5, aPos.y * 0.5 + 0.5);
  gl_Position = vec4(aPos, 0.0, 1.0);
}`;

const FRAG = `#version 300 es
precision highp float;
in vec2 vUv;
out vec4 outColor;

uniform sampler2D uTex;
uniform vec3  uKey;        // color clave (lineal 0..1)
uniform float uTol;        // tolerancia (distancia croma)
uniform float uSoft;       // suavizado
uniform int   uMode;       // 0 compuesto, 1 original, 2 alpha, 3 rgba
uniform vec2  uRes;        // resolución del canvas (px)
uniform float uDespill;    // cantidad de despill 0..1
uniform int   uKeyChan;    // canal dominante del croma: 0=R 1=G 2=B
uniform sampler2D uBgTex;  // imagen de fondo
uniform int   uHasBg;      // 1 si hay fondo cargado
uniform float uWrap;       // cantidad de light wrap 0..1
uniform float uWrapRadius; // radio del light wrap en px
uniform sampler2D uMatteTex; // garbage matte (polígono rasterizado)
uniform int   uHasMatte;   // 1 si hay garbage matte
uniform int   uMatteInvert;// invertir el matte
uniform sampler2D uPlateTex; // clean plate (fondo vacío)
uniform int   uUsePlate;   // 1 = keyear por diferencia con el clean plate
uniform int   uExportAlpha;// 1 = salida con alpha real (PNG transparente)

// crominancia YCbCr (Rec.601)
vec2 chroma(vec3 c) {
  float cb = -0.168736 * c.r - 0.331264 * c.g + 0.5      * c.b;
  float cr =  0.5      * c.r - 0.418688 * c.g - 0.081312 * c.b;
  return vec2(cb, cr);
}

float keyAlpha(vec3 col, vec2 uv) {
  float d;
  if (uUsePlate == 1) {
    // clean plate: diferencia RGB con el fondo vacío (corrige luz desigual)
    d = distance(col, texture(uPlateTex, uv).rgb);
  } else {
    // chroma key: distancia de crominancia al color clave
    d = distance(chroma(col), chroma(uKey));
  }
  return smoothstep(uTol, uTol + uSoft, d);
}

// garbage matte: 1 dentro del polígono, 0 fuera (o al revés si se invierte)
float matteAt(vec2 uv) {
  if (uHasMatte == 0) return 1.0;
  float m = texture(uMatteTex, uv).r;
  return (uMatteInvert == 1) ? (1.0 - m) : m;
}

// despill: si el canal del croma supera a los otros, lo empuja hacia ellos
vec3 despill(vec3 c) {
  if (uDespill <= 0.0) return c;
  if (uKeyChan == 1) {          // verde
    float o = max(c.r, c.b);
    if (c.g > o) c.g = mix(c.g, o, uDespill);
  } else if (uKeyChan == 2) {   // azul
    float o = max(c.r, c.g);
    if (c.b > o) c.b = mix(c.b, o, uDespill);
  } else {                      // rojo
    float o = max(c.g, c.b);
    if (c.r > o) c.r = mix(c.r, o, uDespill);
  }
  return c;
}

vec3 checker(vec2 px) {
  vec2 c = floor(px / 12.0);
  float m = mod(c.x + c.y, 2.0);
  return mix(vec3(0.16, 0.17, 0.20), vec3(0.26, 0.28, 0.32), m);
}

void main() {
  vec2 uv = vUv;

  if (uMode == 3) {
    // 2x2: R | G  /  B | A  (cada cuadrante = imagen completa)
    vec2 q = fract(uv * 2.0);
    bool right = uv.x >= 0.5;
    bool top   = uv.y >= 0.5;   // vUv.y=1 arriba
    vec3 src = texture(uTex, q).rgb;
    float a  = keyAlpha(src, q) * matteAt(q);
    float v;
    if (top && !right)      v = src.r;   // arriba-izq  R
    else if (top && right)  v = src.g;   // arriba-der  G
    else if (!top && !right)v = src.b;   // abajo-izq   B
    else                    v = a;       // abajo-der   A
    outColor = vec4(vec3(v), 1.0);
    // línea separadora sutil
    vec2 d = abs(uv - 0.5);
    if (d.x < 0.0015 || d.y < 0.0015) outColor.rgb = vec3(0.0);
    return;
  }

  if (uMode == 4) {                         // vista partida: original | alpha | compuesto
    float col = uv.x * 3.0;
    vec2 luv = vec2(fract(col), uv.y);
    vec3 s = texture(uTex, luv).rgb;
    float av = keyAlpha(s, luv) * matteAt(luv);
    vec3 outc;
    if (col < 1.0)      outc = s;                                   // original
    else if (col < 2.0) outc = vec3(av);                           // alpha
    else {                                                          // compuesto
      vec3 fg = despill(s);
      vec3 bgc = (uHasBg == 1) ? texture(uBgTex, luv).rgb : checker(vUv * uRes);
      outc = mix(bgc, fg, av);
    }
    outColor = vec4(outc, 1.0);
    float dsep = min(abs(uv.x - 0.33333), abs(uv.x - 0.66667));
    if (dsep < 0.001) outColor.rgb = vec3(0.05);                   // separadores
    return;
  }

  vec4 src = texture(uTex, uv);

  if (uMode == 1) {                         // original
    outColor = vec4(src.rgb, 1.0);
    return;
  }

  float a = keyAlpha(src.rgb, uv) * matteAt(uv);

  if (uMode == 2) {                         // alpha (matte)
    outColor = vec4(vec3(a), 1.0);
    return;
  }

  // primer plano con despill
  vec3 fg = despill(src.rgb);
  // fondo: imagen cargada o ajedrezado de transparencia
  vec3 bg = (uHasBg == 1) ? texture(uBgTex, uv).rgb : checker(vUv * uRes);

  // light wrap: envuelve la luz del fondo en el borde interior del sujeto
  if (uHasBg == 1 && uWrap > 0.0) {
    const int N = 12;
    vec2 px = vec2(uWrapRadius) / uRes;
    float near = 0.0;
    vec3 bgAvg = vec3(0.0);
    for (int i = 0; i < N; i++) {
      float ph = 6.2831853 * float(i) / float(N);
      vec2 off = vec2(cos(ph), sin(ph)) * px;
      near  += 1.0 - keyAlpha(texture(uTex, uv + off).rgb, uv + off);  // cuánto fondo hay alrededor
      bgAvg += texture(uBgTex, uv + off).rgb;
    }
    near  /= float(N);
    bgAvg /= float(N);
    float mask = a * near;                     // dentro del sujeto y cerca del borde
    fg = mix(fg, bgAvg, clamp(uWrap * mask, 0.0, 1.0));
  }

  if (uExportAlpha == 1) { outColor = vec4(fg, a); return; }   // PNG transparente
  outColor = vec4(mix(bg, fg, a), 1.0);
}`;

function compile(type, source) {
  const s = gl.createShader(type);
  gl.shaderSource(s, source);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(s));
    throw new Error('shader');
  }
  return s;
}

const prog = gl.createProgram();
gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
gl.linkProgram(prog);
if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
  console.error(gl.getProgramInfoLog(prog));
}
gl.useProgram(prog);

// quad fullscreen (dos triángulos)
const vao = gl.createVertexArray();
gl.bindVertexArray(vao);
const buf = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buf);
gl.bufferData(gl.ARRAY_BUFFER,
  new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
  gl.STATIC_DRAW);
const aPos = gl.getAttribLocation(prog, 'aPos');
gl.enableVertexAttribArray(aPos);
gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

const U = {
  tex:  gl.getUniformLocation(prog, 'uTex'),
  key:  gl.getUniformLocation(prog, 'uKey'),
  tol:  gl.getUniformLocation(prog, 'uTol'),
  soft: gl.getUniformLocation(prog, 'uSoft'),
  mode: gl.getUniformLocation(prog, 'uMode'),
  res:  gl.getUniformLocation(prog, 'uRes'),
  despill: gl.getUniformLocation(prog, 'uDespill'),
  keyChan: gl.getUniformLocation(prog, 'uKeyChan'),
  bgTex: gl.getUniformLocation(prog, 'uBgTex'),
  hasBg: gl.getUniformLocation(prog, 'uHasBg'),
  wrap: gl.getUniformLocation(prog, 'uWrap'),
  wrapRadius: gl.getUniformLocation(prog, 'uWrapRadius'),
  matteTex: gl.getUniformLocation(prog, 'uMatteTex'),
  hasMatte: gl.getUniformLocation(prog, 'uHasMatte'),
  matteInvert: gl.getUniformLocation(prog, 'uMatteInvert'),
  plateTex: gl.getUniformLocation(prog, 'uPlateTex'),
  usePlate: gl.getUniformLocation(prog, 'uUsePlate'),
  exportAlpha: gl.getUniformLocation(prog, 'uExportAlpha'),
};

function makeTex(unit) {
  const tx = gl.createTexture();
  gl.activeTexture(gl.TEXTURE0 + unit);
  gl.bindTexture(gl.TEXTURE_2D, tx);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  return tx;
}
const tex = makeTex(0);      // primer plano (unidad 0)
const bgTex = makeTex(1);    // fondo (unidad 1)
const matteTex = makeTex(2); // garbage matte (unidad 2)
const plateTex = makeTex(3); // clean plate (unidad 3)
gl.activeTexture(gl.TEXTURE0);
gl.uniform1i(U.tex, 0);
gl.uniform1i(U.bgTex, 1);
gl.uniform1i(U.matteTex, 2);
gl.uniform1i(U.plateTex, 3);

/* ------------------------------------------------------------------ */
/*  Estado                                                             */
/* ------------------------------------------------------------------ */
const MAX_DIM = 2048;
const state = {
  hasImage: false,
  key: [0.0, 0.694, 0.251],   // #00b140 sRGB
  tol: 0.12,
  soft: 0.10,
  despill: 0.0,
  keyChan: 1,                 // verde por defecto
  mode: 0,
  scope: 'off',
  picking: false,
  hasBg: false,
  wrap: 0.0,
  wrapRadius: 8.0,
  webcam: false,
  webcamPaused: false,
  matte: { active: false, points: [], has: false, invert: false },
  plate: { has: false, use: false },
};
// canvas 2D auxiliar para muestrear color exacto (cuentagotas)
const srcCanvas = document.createElement('canvas');
const srcCtx = srcCanvas.getContext('2d', { willReadFrequently: true });

function render() {
  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.uniform3fv(U.key, state.key);
  gl.uniform1f(U.tol, state.tol);
  gl.uniform1f(U.soft, state.soft);
  gl.uniform1i(U.mode, state.mode);
  gl.uniform2f(U.res, canvas.width, canvas.height);
  gl.uniform1f(U.despill, state.despill);
  gl.uniform1i(U.keyChan, state.keyChan);
  gl.uniform1i(U.hasBg, state.hasBg ? 1 : 0);
  gl.uniform1f(U.wrap, state.wrap);
  gl.uniform1f(U.wrapRadius, state.wrapRadius);
  gl.uniform1i(U.hasMatte, state.matte.has ? 1 : 0);
  gl.uniform1i(U.matteInvert, state.matte.invert ? 1 : 0);
  gl.uniform1i(U.usePlate, (state.plate.has && state.plate.use) ? 1 : 0);
  gl.uniform1i(U.exportAlpha, 0);
  gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.activeTexture(gl.TEXTURE1); gl.bindTexture(gl.TEXTURE_2D, bgTex);
  gl.activeTexture(gl.TEXTURE2); gl.bindTexture(gl.TEXTURE_2D, matteTex);
  gl.activeTexture(gl.TEXTURE3); gl.bindTexture(gl.TEXTURE_2D, plateTex);
  gl.clearColor(0, 0, 0, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);
  if (state.hasImage) gl.drawArrays(gl.TRIANGLES, 0, 6);
}

// canal dominante del croma (para el despill)
function updateKeyChan() {
  const k = state.key;
  state.keyChan = (k[1] >= k[0] && k[1] >= k[2]) ? 1 : (k[2] >= k[0] ? 2 : 0);
}

// redibuja el scope activo sobre el fotograma actual
function updateScopes() {
  const sc = $('scopes');
  if (state.scope === 'off' || !state.hasImage) { sc.hidden = true; return; }
  sc.hidden = false;
  window.KeyLabScopes.draw(state.scope, srcCanvas, $('scopeCanvas'), state.key);
}

// tamaño del canvas GL: 3× ancho en vista partida, imagen normal en el resto
function applyCanvasSize() {
  const w = srcCanvas.width, h = srcCanvas.height;
  if (!w) return;
  const sw = (state.mode === 4) ? w * 3 : w;
  if (canvas.width !== sw || canvas.height !== h) { canvas.width = sw; canvas.height = h; }
}

// cambia la vista (0 compuesto, 1 original, 2 alpha, 3 rgba, 4 partida) y refleja la UI
function setView(mode) {
  state.mode = mode;
  document.querySelectorAll('.view').forEach((x) => x.classList.toggle('active', +x.dataset.mode === mode));
  $('gridLabels').hidden = mode !== 3;
  $('splitLabels').hidden = mode !== 4;
  applyCanvasSize();
  updateViewHint();
  render();
  updateNodeMap();
}

// mapa de nodos (flujo de la señal, estilo Fusion): refleja el estado y es clicable
function updateNodeMap() {
  $('dock').hidden = !state.hasImage;
  $('scopeTabs').hidden = !state.hasImage;
  if (!state.hasImage) return;
  const el = $('nodemap');
  const m = state.mode, NW = 96, NH = 38, yC = 8 + NH / 2;
  const cls = (cur, lit) => (cur ? 'cur ' : '') + (lit ? 'lit' : '');
  const outLabel = t(['view.composite', 'view.original', 'view.alpha', 'view.rgba', 'view.split'][m]);
  const nodes = [
    { x: 6,   y: 8,  label: t('nm.source'),  cls: cls(m === 1 || m === 3, true), act: 1 },
    { x: 128, y: 8,  label: t('nm.key'),     cls: cls(m === 2, true),            act: 2 },
    { x: 250, y: 8,  label: t('nm.matte'),   cls: cls(false, state.matte.has),   act: 2, off: !state.matte.has },
    { x: 372, y: 8,  label: t('nm.despill'), cls: cls(false, state.despill > 0), act: 0 },
    { x: 520, y: 8,  label: t('nm.merge'),   cls: cls(false, true),              act: 0 },
    { x: 642, y: 8,  label: outLabel,        cls: cls(m === 0 || m === 4, true), act: 0 },
    { x: 128, y: 68, label: t('nm.plate'),   cls: cls(false, state.plate.has && state.plate.use), act: 2, off: !state.plate.has },
    { x: 520, y: 68, label: t('nm.bg'),      cls: cls(false, state.hasBg),       act: 0, off: !state.hasBg },
  ];
  const link = (x1, y1, x2, y2, lit) =>
    `<line class="nm-link ${lit ? 'lit' : ''}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" marker-end="url(#nmArrow)"/>`;
  let svg = '<svg viewBox="0 0 752 116" xmlns="http://www.w3.org/2000/svg">';
  svg += '<defs><marker id="nmArrow" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#5a6472"/></marker></defs>';
  svg += link(102, yC, 128, yC);
  svg += link(224, yC, 250, yC);
  svg += link(346, yC, 372, yC);
  svg += link(468, yC, 520, yC);
  svg += link(616, yC, 642, yC);
  svg += link(176, 68, 176, 46, state.plate.has && state.plate.use);   // Clean plate -> Key
  svg += link(568, 68, 568, 46, state.hasBg);                          // Fondo -> Merge
  svg += `<text class="nm-badge ${state.hasBg && state.wrap > 0 ? '' : 'off'}" x="576" y="60">${t('nm.lw')}</text>`;
  for (const n of nodes) {
    svg += `<g class="nm-node ${n.cls} ${n.off ? 'off' : ''}" data-act="${n.act}" transform="translate(${n.x},${n.y})">` +
      `<rect width="${NW}" height="${NH}" rx="8"/>` +
      `<text x="${NW / 2}" y="${NH / 2 + 4}" text-anchor="middle">${n.label}</text></g>`;
  }
  svg += '</svg>';
  el.innerHTML = svg;
  el.querySelectorAll('.nm-node').forEach((g) =>
    g.addEventListener('click', () => setView(parseInt(g.dataset.act, 10))));
}

function setImageSource(source, w, h) {
  // encajar dentro de MAX_DIM manteniendo aspecto
  let tw = w, th = h;
  const m = Math.max(w, h);
  if (m > MAX_DIM) { const s = MAX_DIM / m; tw = Math.round(w * s); th = Math.round(h * s); }

  srcCanvas.width = tw;
  srcCanvas.height = th;
  srcCtx.drawImage(source, 0, 0, tw, th);

  applyCanvasSize();

  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, srcCanvas);

  state.hasImage = true;
  document.getElementById('dropHint').hidden = true;
  render();
  updateScopes();
  if (state.matte.points.length) updateMatteTexture();
  drawOverlay();
}

/* --- garbage matte (polígono rasterizado) y clean plate --- */
const matteCanvas = document.createElement('canvas');
const matteCtx = matteCanvas.getContext('2d');
const plateCanvas = document.createElement('canvas');
const plateCtx = plateCanvas.getContext('2d');
const overlay = document.getElementById('overlay');
const octx = overlay.getContext('2d');
const clamp01 = (v) => Math.max(0, Math.min(1, v));

function updateMatteTexture() {
  const w = srcCanvas.width, h = srcCanvas.height;
  if (!w) return;
  matteCanvas.width = w; matteCanvas.height = h;
  matteCtx.clearRect(0, 0, w, h);
  const pts = state.matte.points;
  state.matte.has = pts.length >= 3;
  if (state.matte.has) {
    matteCtx.fillStyle = '#fff';
    matteCtx.beginPath();
    matteCtx.moveTo(pts[0].x * w, pts[0].y * h);
    for (let i = 1; i < pts.length; i++) matteCtx.lineTo(pts[i].x * w, pts[i].y * h);
    matteCtx.closePath(); matteCtx.fill();
  }
  gl.activeTexture(gl.TEXTURE2);
  gl.bindTexture(gl.TEXTURE_2D, matteTex);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, matteCanvas);
  gl.activeTexture(gl.TEXTURE0);
}

function drawOverlay() {
  const w = srcCanvas.width, h = srcCanvas.height;
  if (!w) return;
  overlay.width = w; overlay.height = h;
  octx.clearRect(0, 0, w, h);
  const pts = state.matte.points;
  if (!pts.length) return;
  octx.lineWidth = Math.max(2, w / 400);
  octx.strokeStyle = '#ff7a66';
  octx.fillStyle = 'rgba(255,122,102,0.15)';
  octx.beginPath();
  octx.moveTo(pts[0].x * w, pts[0].y * h);
  for (let i = 1; i < pts.length; i++) octx.lineTo(pts[i].x * w, pts[i].y * h);
  if (pts.length >= 3) { octx.closePath(); octx.fill(); }
  octx.stroke();
  octx.fillStyle = '#ff7a66';
  const rp = Math.max(3, w / 200);
  for (const p of pts) { octx.beginPath(); octx.arc(p.x * w, p.y * h, rp, 0, Math.PI * 2); octx.fill(); }
}

function captureCleanPlate() {
  const w = srcCanvas.width, h = srcCanvas.height;
  if (!w) return;
  plateCanvas.width = w; plateCanvas.height = h;
  plateCtx.drawImage(srcCanvas, 0, 0);
  gl.activeTexture(gl.TEXTURE3);
  gl.bindTexture(gl.TEXTURE_2D, plateTex);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, plateCanvas);
  gl.activeTexture(gl.TEXTURE0);
  state.plate.has = true; state.plate.use = true;
  $('btnPlateClear').hidden = false;
  $('plateUseWrap').hidden = false;
  $('plateUse').checked = true;
  render(); updateNodeMap();
}

function loadImageFile(file) {
  teardownVideo();
  const img = new Image();
  img.onload = () => {
    setImageSource(img, img.naturalWidth, img.naturalHeight);
    setView(1);   // arranca en Original: el alumno hace el key paso a paso
    URL.revokeObjectURL(img.src);
  };
  img.src = URL.createObjectURL(file);
}

/* --- imagen de fondo para el compuesto + light wrap --- */
function loadBackgroundFile(file) {
  if (!file || !file.type.startsWith('image/')) return;
  const img = new Image();
  img.onload = () => {
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, bgTex);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
    gl.activeTexture(gl.TEXTURE0);
    state.hasBg = true;
    $('btnBgClear').hidden = false;
    render();
    updateNodeMap();
    URL.revokeObjectURL(img.src);
  };
  img.src = URL.createObjectURL(file);
}
function clearBackground() {
  state.hasBg = false;
  $('btnBgClear').hidden = true;
  render();
  updateNodeMap();
}

/* --- vídeo local: modo fotograma congelado (sin play) --- */
const video = document.createElement('video');
video.muted = true;
video.playsInline = true;
video.preload = 'auto';
// en el DOM (oculto) para que el compositor presente fotogramas -> requestVideoFrameCallback
video.style.cssText = 'position:absolute;width:1px;height:1px;opacity:0;pointer-events:none;left:-9999px';
document.body.appendChild(video);
let videoURL = null;
const media = { isVideo: false, fps: 25, fpsAuto: true, fpsDetected: null, seeking: false, pending: null };

// aplica los fps efectivos (auto = detectado ó 25) al paso del timeline y al selector
function applyFps() {
  media.fps = media.fpsAuto ? (media.fpsDetected || 25) : media.fps;
  $('timeline').step = String(1 / media.fps);
  const auto = document.querySelector('#fpsSel option[value="auto"]');
  auto.textContent = media.fpsDetected ? 'Auto (' + fpsLabel(media.fpsDetected) + ')' : 'Auto';
}

function teardownVideo() {
  media.isVideo = false;
  $('transport').hidden = true;
  $('frozenHint').hidden = true;
  if (videoURL) { URL.revokeObjectURL(videoURL); videoURL = null; }
}

function drawVideoFrame() {
  if (!video.videoWidth) return;
  setImageSource(video, video.videoWidth, video.videoHeight);
}

function fmtTime(s) {
  const m = Math.floor(s / 60);
  const sec = s - m * 60;
  return m + ':' + sec.toFixed(2).padStart(5, '0');
}

function seekTo(tSec) {
  const t = Math.max(0, Math.min(video.duration || 0, tSec));
  if (media.seeking) { media.pending = t; return; }   // coalescer mientras se arrastra
  media.seeking = true;
  video.currentTime = t;
}

video.addEventListener('seeked', () => {
  drawVideoFrame();
  $('timeline').value = String(video.currentTime);
  $('timecode').textContent = fmtTime(video.currentTime);
  media.seeking = false;
  if (media.pending != null) { const p = media.pending; media.pending = null; seekTo(p); }
});

video.addEventListener('error', () => {
  if (!media.isVideo) return;
  const dh = $('dropHint');
  dh.hidden = false;
  dh.innerHTML = '<p>' + t('media.badcodec') + '</p>';
});

// ajusta a fps estándar si está cerca; si no, deja el valor medido
function snapFps(f) {
  const common = [23.976, 24, 25, 29.97, 30, 48, 50, 59.94, 60];
  let best = f, bestd = Infinity;
  for (const c of common) { const dd = Math.abs(c - f); if (dd < bestd) { bestd = dd; best = c; } }
  return bestd <= 0.6 ? best : Math.round(f * 1000) / 1000;
}

// detecta fps reproduciendo unos frames (muted) y midiendo con requestVideoFrameCallback
function probeFps() {
  return new Promise((resolve) => {
    if (!('requestVideoFrameCallback' in HTMLVideoElement.prototype)) { resolve(null); return; }
    const samples = [];
    let done = false;
    const finish = () => {
      if (done) return; done = true;
      video.pause();
      let fps = null;
      if (samples.length >= 2) {
        const a = samples[0], b = samples[samples.length - 1];
        const df = b.f - a.f, dt = b.t - a.t;
        if (dt > 0 && df > 0) fps = df / dt;
      }
      resolve(fps ? snapFps(fps) : null);
    };
    const onFrame = (now, meta) => {
      samples.push({ t: meta.mediaTime, f: meta.presentedFrames });
      if (samples.length >= 6) { finish(); return; }
      video.requestVideoFrameCallback(onFrame);
    };
    video.requestVideoFrameCallback(onFrame);
    video.play().catch(() => finish());
    setTimeout(finish, 2500);   // seguridad
  });
}

function fpsLabel(f) { return (f % 1 ? f.toFixed(2) : String(f)) + ' fps'; }

function loadVideoFile(file) {
  teardownVideo();
  media.isVideo = true;
  videoURL = URL.createObjectURL(file);
  video.src = videoURL;
  video.addEventListener('loadeddata', async () => {
    if (!video.videoWidth) return;   // el handler de 'error' avisa
    $('timeline').min = '0';
    $('timeline').max = String(video.duration || 0);
    $('timeline').value = '0';
    $('transport').hidden = false;
    $('frozenHint').hidden = false;
    $('timecode').textContent = fmtTime(0);
    media.fpsDetected = null;
    applyFps();                     // paso inicial (auto=25 hasta detectar)
    drawVideoFrame();               // primer fotograma ya visible
    setView(1);                     // arranca en Original: el key lo hacen ellos
    media.fpsDetected = await probeFps();   // intentar detectar fps reales
    applyFps();                     // aplica lo detectado si estamos en Auto
    seekTo(0);                      // volver al primer fotograma tras el sondeo
  }, { once: true });
  video.load();
}

function loadFile(file) {
  if (!file) return;
  if (state.webcam) stopWebcam();
  if (file.type.startsWith('video/')) loadVideoFile(file);
  else if (file.type.startsWith('image/')) loadImageFile(file);
}

/* --- webcam / cámara virtual (getUserMedia): en directo, con congelar --- */
let webcamRAF = 0, webcamTick = 0;
function stopWebcamStream() {
  if (video.srcObject) { video.srcObject.getTracks().forEach((tk) => tk.stop()); video.srcObject = null; }
}
function drawWebcamFrame() {
  const w = video.videoWidth, h = video.videoHeight;
  if (!w) return;
  if (srcCanvas.width !== w || srcCanvas.height !== h) {
    srcCanvas.width = w; srcCanvas.height = h; applyCanvasSize();
  }
  srcCtx.drawImage(video, 0, 0, w, h);
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, srcCanvas);
  state.hasImage = true;
  document.getElementById('dropHint').hidden = true;
  render();
  if ((webcamTick++ % 6) === 0) updateScopes();   // scopes con menos frecuencia
}
function webcamLoop() {
  if (!state.webcam) return;
  if (!state.webcamPaused) drawWebcamFrame();
  webcamRAF = requestAnimationFrame(webcamLoop);
}
async function startWebcam() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { width: { ideal: 1280 }, height: { ideal: 720 } }, audio: false,
    });
    teardownVideo();
    stopWebcamStream();
    video.srcObject = stream;
    await video.play();
    state.webcam = true; state.webcamPaused = false;
    $('btnWebcam').classList.add('on');
    $('webcamBar').hidden = false;
    $('btnFreeze').textContent = t('webcam.freeze');
    setView(1);                 // arranca en Original (paso a paso)
    webcamLoop();
  } catch (e) {
    alert(t('webcam.error'));
  }
}
function stopWebcam() {
  state.webcam = false;
  cancelAnimationFrame(webcamRAF);
  stopWebcamStream();
  $('btnWebcam').classList.remove('on');
  $('webcamBar').hidden = true;
}
function toggleFreeze() {
  state.webcamPaused = !state.webcamPaused;
  $('btnFreeze').textContent = state.webcamPaused ? t('webcam.resume') : t('webcam.freeze');
  if (state.webcamPaused) updateScopes();
}

/* --- escena demo generada: maniquí articulado (estilo dummy) sobre croma.
       opts controla defectos del fondo para los ejemplos de "croma malo":
       { lighting:'good'|'uneven', shadow:bool, wrinkles:bool, noise:num, spill:num } --- */
function buildScene(opts = {}) {
  const cfg = Object.assign({ lighting: 'good', shadow: false, wrinkles: false, noise: 8, spill: 0.5, screen: 'green' }, opts);
  const w = 1280, h = 720;
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  const x = c.getContext('2d');
  const cx = w * 0.5;
  const blue = cfg.screen === 'blue';   // true = pantalla azul

  // ================= FONDO =================
  x.fillStyle = blue ? '#123a86' : '#0b9c3b';
  x.fillRect(0, 0, w, h);
  if (cfg.lighting === 'uneven') {
    const hs = x.createRadialGradient(w * 0.74, h * 0.34, 40, w * 0.74, h * 0.4, w * 0.7);
    hs.addColorStop(0, blue ? 'rgba(90,150,255,0.95)' : 'rgba(120,240,150,0.95)');
    hs.addColorStop(1, 'rgba(0,0,0,0)');
    x.fillStyle = hs; x.fillRect(0, 0, w, h);
    const dk = x.createLinearGradient(0, 0, w, 0);
    dk.addColorStop(0, blue ? 'rgba(0,8,30,0.8)' : 'rgba(0,25,10,0.8)');
    dk.addColorStop(0.55, 'rgba(0,0,0,0)');
    x.fillStyle = dk; x.fillRect(0, 0, w, h);
  } else {
    // "good": croma uniforme, sin fogonazos. Falloff muy leve y amplio.
    const g = x.createRadialGradient(cx, h * 0.46, h * 0.2, cx, h * 0.5, h * 1.1);
    g.addColorStop(0, blue ? 'rgba(60,120,220,0.10)' : 'rgba(55,190,105,0.10)');
    g.addColorStop(1, 'rgba(0,0,0,0)');
    x.fillStyle = g; x.fillRect(0, 0, w, h);
    const vig = x.createRadialGradient(cx, h * 0.5, h * 0.45, cx, h * 0.5, h * 0.95);
    vig.addColorStop(0, 'rgba(0,0,0,0)');
    vig.addColorStop(1, blue ? 'rgba(0,6,25,0.18)' : 'rgba(0,25,8,0.18)');
    x.fillStyle = vig; x.fillRect(0, 0, w, h);
  }
  if (cfg.wrinkles) {           // pliegues de tela mal estirada
    x.save(); x.filter = 'blur(6px)';
    for (let i = 0; i < 8; i++) {
      const yy = 80 + i * 78 + (Math.random() - 0.5) * 30;
      x.strokeStyle = i % 2 ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.16)';
      x.lineWidth = 10 + Math.random() * 10;
      x.beginPath(); x.moveTo(-20, yy);
      x.bezierCurveTo(w * 0.33, yy - 40, w * 0.66, yy + 40, w + 20, yy - 10);
      x.stroke();
    }
    x.restore();
  }

  // geometría del maniquí
  const headCy = 208, headRx = 84, headRy = 100;
  const neckY = 322, shY = 402, shX = 166, shR = 60;

  // silueta (para spill / composición)
  const body = new Path2D();
  body.moveTo(cx - 210, h);
  body.bezierCurveTo(cx - 232, 560, cx - 232, 468, cx - 202, 430);
  body.bezierCurveTo(cx - 190, 402, cx - 120, 388, cx - 66, 368);
  body.bezierCurveTo(cx - 54, 356, cx - 48, 342, cx - 46, neckY);
  body.bezierCurveTo(cx - 92, 298, cx - headRx - 6, headCy, cx, headCy - headRy - 4);
  body.bezierCurveTo(cx + headRx + 6, headCy, cx + 92, 298, cx + 46, neckY);
  body.bezierCurveTo(cx + 48, 342, cx + 54, 356, cx + 66, 368);
  body.bezierCurveTo(cx + 120, 388, cx + 190, 402, cx + 202, 430);
  body.bezierCurveTo(cx + 232, 468, cx + 232, 560, cx + 210, h);
  body.closePath();

  // sombra proyectada en el fondo (defecto)
  if (cfg.shadow) {
    x.save(); x.filter = 'blur(26px)';
    x.fillStyle = blue ? 'rgba(0,6,24,0.5)' : 'rgba(0,35,14,0.5)';
    x.translate(150, 24); x.fill(body);
    x.restore();
  }
  // sombra de contacto
  x.save(); x.filter = 'blur(20px)';
  x.fillStyle = blue ? 'rgba(0,6,24,0.4)' : 'rgba(0,40,15,0.4)';
  x.beginPath(); x.ellipse(cx, h * 0.99, 250, 38, 0, 0, Math.PI * 2); x.fill();
  x.restore();

  // gradiente "plástico" para dar volumen 3D
  const plastic = (gx, gy, r) => {
    const g = x.createRadialGradient(gx - r * 0.36, gy - r * 0.42, r * 0.1, gx, gy, r * 1.18);
    g.addColorStop(0, '#d6dbe1'); g.addColorStop(0.55, '#9aa0a8'); g.addColorStop(1, '#565c65');
    return g;
  };

  // base de la silueta (evita huecos)
  x.fillStyle = '#8990986e'.slice(0, 7); x.fill(body);

  // torso segmentado
  const torso = new Path2D();
  torso.moveTo(cx - 150, h);
  torso.bezierCurveTo(cx - 168, 560, cx - 158, 468, cx - 118, 430);
  torso.quadraticCurveTo(cx, 402, cx + 118, 430);
  torso.bezierCurveTo(cx + 158, 468, cx + 168, 560, cx + 150, h);
  torso.closePath();
  const tg = x.createLinearGradient(cx - 150, 0, cx + 150, 0);
  tg.addColorStop(0, '#6b717a'); tg.addColorStop(0.5, '#aeb4bb'); tg.addColorStop(1, '#6b717a');
  x.fillStyle = tg; x.fill(torso);
  x.save(); x.clip(torso);
  x.strokeStyle = 'rgba(40,44,50,0.55)'; x.lineWidth = 3; x.lineCap = 'round';
  x.beginPath(); x.moveTo(cx, 430); x.lineTo(cx, h); x.stroke();                       // columna
  x.beginPath(); x.moveTo(cx - 120, 496); x.quadraticCurveTo(cx, 520, cx + 120, 496); x.stroke();
  x.beginPath(); x.moveTo(cx - 128, 588); x.quadraticCurveTo(cx, 614, cx + 128, 588); x.stroke();
  x.strokeStyle = 'rgba(255,255,255,0.10)'; x.lineWidth = 2;
  x.beginPath(); x.moveTo(cx - 120, 492); x.quadraticCurveTo(cx, 516, cx + 120, 492); x.stroke();
  x.restore();

  // hombros (rótulas)
  [-1, 1].forEach((s) => {
    x.fillStyle = plastic(cx + s * shX, shY, shR);
    x.beginPath(); x.ellipse(cx + s * shX, shY, shR, shR, 0, 0, Math.PI * 2); x.fill();
    // oclusión hombro-torso
    x.save(); x.filter = 'blur(6px)'; x.fillStyle = 'rgba(20,22,26,0.4)';
    x.beginPath(); x.ellipse(cx + s * 96, 430, 34, 24, 0, 0, Math.PI * 2); x.fill(); x.restore();
  });

  // cuello (rótula)
  x.fillStyle = plastic(cx, neckY, 40);
  x.beginPath(); x.ellipse(cx, neckY, 40, 44, 0, 0, Math.PI * 2); x.fill();

  // cabeza
  x.fillStyle = plastic(cx, headCy, headRy);
  x.beginPath(); x.ellipse(cx, headCy, headRx, headRy, 0, 0, Math.PI * 2); x.fill();
  // oclusión cuello-cabeza
  x.save(); x.filter = 'blur(7px)'; x.fillStyle = 'rgba(20,22,26,0.35)';
  x.beginPath(); x.ellipse(cx, headCy + headRy - 8, 46, 20, 0, 0, Math.PI * 2); x.fill(); x.restore();

  // rasgos de maniquí: cuencas, cresta nasal, líneas de panel
  x.fillStyle = 'rgba(40,44,52,0.85)';
  x.beginPath(); x.ellipse(cx - 30, headCy - 4, 15, 10, 0.2, 0, Math.PI * 2); x.fill();
  x.beginPath(); x.ellipse(cx + 30, headCy - 4, 15, 10, -0.2, 0, Math.PI * 2); x.fill();
  x.strokeStyle = 'rgba(255,255,255,0.16)'; x.lineWidth = 3; x.lineCap = 'round';
  x.beginPath(); x.moveTo(cx, headCy - 18); x.lineTo(cx, headCy + 34); x.stroke();     // cresta nasal
  x.strokeStyle = 'rgba(40,44,52,0.4)'; x.lineWidth = 2;
  x.beginPath(); x.moveTo(cx - headRx * 0.7, headCy - headRy * 0.55); x.quadraticCurveTo(cx, headCy - headRy * 0.72, cx + headRx * 0.7, headCy - headRy * 0.55); x.stroke(); // panel frente
  x.beginPath(); x.arc(cx, headCy + 52, 20, 0.15 * Math.PI, 0.85 * Math.PI); x.stroke(); // mentón

  // ================= SPILL (defecto/lección despill) =================
  if (cfg.spill > 0) {
    x.save(); x.clip(body);
    const sc = blue ? '90,150,255' : '60,200,90';
    const sp = x.createLinearGradient(cx - 230, 0, cx + 230, 0);
    sp.addColorStop(0.00, 'rgba(' + sc + ',' + (0.6 * cfg.spill) + ')');
    sp.addColorStop(0.22, 'rgba(' + sc + ',0)');
    sp.addColorStop(0.78, 'rgba(' + sc + ',0)');
    sp.addColorStop(1.00, 'rgba(' + sc + ',' + (0.6 * cfg.spill) + ')');
    x.globalCompositeOperation = 'lighter';
    x.fillStyle = sp; x.fill(body);
    if (cfg.spill > 0.7) { x.fillStyle = 'rgba(' + sc + ',' + (0.28 * cfg.spill) + ')'; x.fill(body); }
    x.restore();
  }

  // ================= RUIDO (más en el canal del croma opuesto) =================
  const id = x.getImageData(0, 0, w, h);
  const d = id.data, n = cfg.noise;
  for (let i = 0; i < d.length; i += 4) {
    d[i]     += (Math.random() - 0.5) * (n * 0.4);
    d[i + 1] += (Math.random() - 0.5) * (blue ? n * 0.4 : n * 0.5);
    d[i + 2] += (Math.random() - 0.5) * (blue ? n * 4.0 : n * 0.5);   // en verde, el azul es el ruidoso
  }
  x.putImageData(id, 0, 0);
  return c;
}
/* Demos basadas en fotos REALES de croma (ver créditos en README):
   - demo.jpg: modelo sobre croma verde (CC BY 2.0, PictureYouth).
   - demo-blue.jpg: modelo sobre croma; el fondo se recolorea a azul en la app.
   Si una foto no carga, se usa el maniquí procedimental como fallback. */
const photoCache = {};
function loadPhoto(src, cb) {
  if (photoCache[src]) { cb(photoCache[src]); return; }
  const img = new Image();
  img.onload = () => { photoCache[src] = img; cb(img); };
  img.onerror = () => cb(null);
  img.src = src;
}

// aplica defectos de croma malo sobre la foto real (opts como en buildScene)
function applyDefects(x, w, h, cfg) {
  if (cfg.lighting === 'uneven') {           // un lado infraexpuesto
    const gr = x.createLinearGradient(0, 0, w, 0);
    gr.addColorStop(0, 'rgba(0,15,6,0.7)');
    gr.addColorStop(0.55, 'rgba(0,0,0,0)');
    x.fillStyle = gr; x.fillRect(0, 0, w, h);
  }
  if (cfg.shadow) {                           // sombra dura en el fondo
    x.save(); x.filter = 'blur(24px)';
    x.fillStyle = 'rgba(0,20,8,0.6)';
    x.beginPath(); x.ellipse(w * 0.24, h * 0.52, w * 0.16, h * 0.34, 0.2, 0, Math.PI * 2); x.fill();
    x.restore();
  }
  if (cfg.spill > 0.7) {                      // tinte verde general (mucho rebote)
    x.fillStyle = 'rgba(60,200,90,0.16)'; x.fillRect(0, 0, w, h);
  }
  // pasada de píxeles: recolor a azul y/o ruido
  const toBlue = cfg.screen === 'blue';
  const n = cfg.noise || 0;
  if (toBlue || n > 4) {
    const id = x.getImageData(0, 0, w, h), d = id.data;
    for (let i = 0; i < d.length; i += 4) {
      const r = d[i], g = d[i + 1], b = d[i + 2];
      if (toBlue && (g - Math.max(r, b)) > 6) {   // "verdor" -> fondo verde (claro u oscuro) a azul
        const lum = 0.5 * g + 0.25 * r + 0.25 * b;
        d[i] = lum * 0.30; d[i + 1] = lum * 0.42; d[i + 2] = Math.min(255, 70 + lum * 0.75);
      }
      if (n > 4) {
        d[i]     += (Math.random() - 0.5) * (n * 0.4);
        d[i + 1] += (Math.random() - 0.5) * (n * 0.5);
        d[i + 2] += (Math.random() - 0.5) * (toBlue ? n * 0.5 : n * 4.0);
      }
    }
    x.putImageData(id, 0, 0);
  }
}

// cfg = { src, opts?, hint? }
function loadScene(cfg) {
  teardownVideo();
  if (state.webcam) stopWebcam();
  const opts = cfg.opts || {};
  loadPhoto(cfg.src, (img) => {
    let c;
    if (img && img.naturalWidth) {
      c = document.createElement('canvas');
      c.width = img.naturalWidth; c.height = img.naturalHeight;
      const x = c.getContext('2d');
      x.drawImage(img, 0, 0);
      applyDefects(x, c.width, c.height, Object.assign({ noise: 0, spill: 0, screen: 'green' }, opts));
    } else {
      c = buildScene(opts);   // fallback maniquí procedimental
    }
    setImageSource(c, c.width, c.height);
    demoHintKey = cfg.hint || null;
    updateExampleHint();
    // color clave del croma (esquina superior derecha = fondo), SIN aplicar:
    // arranca en Original para que lo hagan paso a paso.
    pickAt(Math.round(c.width * 0.94), Math.round(c.height * 0.05));
    setView(1);
  });
}
function loadDemo() { loadScene({ src: 'demo.jpg' }); }

/* ------------------------------------------------------------------ */
/*  Cuentagotas                                                        */
/* ------------------------------------------------------------------ */
// El shader trabaja en sRGB directo (la textura no se linealiza), así que
// usamos el color tal cual 0..1 para coherencia con la muestra de textura.
function pickAt(ix, iy) {
  ix = Math.max(0, Math.min(srcCanvas.width - 1, ix | 0));
  iy = Math.max(0, Math.min(srcCanvas.height - 1, iy | 0));
  const p = srcCtx.getImageData(ix, iy, 1, 1).data;
  state.key = [p[0] / 255, p[1] / 255, p[2] / 255];
  const hex = '#' + [p[0], p[1], p[2]].map((n) => n.toString(16).padStart(2, '0')).join('');
  document.getElementById('keySwatch').style.background = hex;
  document.getElementById('keyColor').value = hex;
  updateKeyChan();
  render();
  updateScopes();
}

/* ------------------------------------------------------------------ */
/*  UI                                                                 */
/* ------------------------------------------------------------------ */
const $ = (id) => document.getElementById(id);

$('btnLoad').addEventListener('click', () => $('fileInput').click());
$('fileInput').addEventListener('change', (e) => { loadFile(e.target.files[0]); });
$('btnDemo').addEventListener('click', loadDemo);
$('btnWebcam').addEventListener('click', () => { state.webcam ? stopWebcam() : startWebcam(); });
$('btnFreeze').addEventListener('click', toggleFreeze);

// ejemplos de croma: chica sobre verde / chico sobre azul
const EXAMPLES = {
  green: { src: 'demo.jpg', hint: 'ex.hint.green' },
  blue:  { src: 'demo-blue.jpg', opts: { screen: 'blue' }, hint: 'ex.hint.blue' },
};
document.querySelectorAll('.ex').forEach((b) => {
  b.addEventListener('click', () => {
    document.querySelectorAll('.ex').forEach((x) => x.classList.remove('active'));
    b.classList.add('active');
    loadScene(EXAMPLES[b.dataset.ex]);
  });
});

// reset total: vuelve al estado inicial
function resetAll() {
  if (state.webcam) stopWebcam();
  teardownVideo();
  state.hasImage = false; state.hasBg = false;
  state.key = [0.0, 0.694, 0.251];
  state.tol = 0.12; state.soft = 0.10; state.despill = 0.0; state.keyChan = 1;
  state.wrap = 0.0; state.wrapRadius = 8.0;
  state.mode = 0; state.scope = 'off'; state.picking = false;
  demoHintKey = null;
  $('tolerance').value = '0.12'; $('tolOut').textContent = '0.120';
  $('softness').value = '0.10'; $('softOut').textContent = '0.100';
  $('despill').value = '0'; $('despillOut').textContent = '0.00';
  $('wrap').value = '0'; $('wrapOut').textContent = '0.00';
  $('wrapRadius').value = '8'; $('wrapRadiusOut').textContent = '8';
  $('keyColor').value = '#00b140'; $('keySwatch').style.background = '#00b140';
  $('btnPick').classList.remove('on'); $('canvasWrap').classList.remove('picking');
  // garbage matte + clean plate
  state.matte = { active: false, points: [], has: false, invert: false };
  state.plate = { has: false, use: false };
  $('btnMatteInvert').classList.remove('on');
  $('btnPlateClear').hidden = true; $('plateUseWrap').hidden = true;
  updateMatteLabel();
  updateMatteTexture(); drawOverlay();
  document.querySelectorAll('.view').forEach((x) => x.classList.toggle('active', x.dataset.mode === '0'));
  document.querySelectorAll('.scope').forEach((x) => x.classList.toggle('active', x.dataset.scope === 'off'));
  document.querySelectorAll('.ex').forEach((x) => x.classList.remove('active'));
  ['gridLabels', 'splitLabels', 'transport', 'frozenHint', 'webcamBar', 'scopes', 'scopeTabs', 'dock', 'btnBgClear'].forEach((id) => { $(id).hidden = true; });
  $('dropHint').hidden = false;
  updateKeyChan(); updateViewHint(); updatePickLabel(); updateExampleHint();
  canvas.width = 300; canvas.height = 150;
  render();
}
$('btnReset').addEventListener('click', resetAll);

// panel de ayuda
function renderHelp() {
  const secs = HELP[lang] || HELP.es;
  $('helpBody').innerHTML = secs.map((s) => `<h3>${s[0]}</h3><p>${s[1]}</p>`).join('');
}
function openHelp() { renderHelp(); $('helpModal').hidden = false; }
function closeHelp() { $('helpModal').hidden = true; }
$('btnHelp').addEventListener('click', openHelp);
$('helpClose').addEventListener('click', closeHelp);
$('helpBackdrop').addEventListener('click', closeHelp);
window.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeHelp(); });

// guardar PNG del fotograma (la vista actual; compuesto sin fondo = transparente)
function savePNG() {
  if (!state.hasImage) return;
  const transparent = (state.mode === 0 && !state.hasBg);
  render();                                    // frame actual
  gl.uniform1i(U.exportAlpha, transparent ? 1 : 0);
  gl.drawArrays(gl.TRIANGLES, 0, 6);           // redibuja con la salida de exportación
  const url = canvas.toDataURL('image/png');   // captura síncrona
  gl.uniform1i(U.exportAlpha, 0);
  render();                                    // restaura la vista
  const names = ['compuesto', 'original', 'alpha', 'canales'];
  const a = document.createElement('a');
  a.href = url; a.download = 'keylab-' + names[state.mode] + '.png';
  document.body.appendChild(a); a.click(); a.remove();
}
$('btnPng').addEventListener('click', savePNG);

// timeline (scrub) + fotograma ±1
$('timeline').addEventListener('input', (e) => seekTo(parseFloat(e.target.value)));
$('framePrev').addEventListener('click', () => seekTo(video.currentTime - 1 / media.fps));
$('frameNext').addEventListener('click', () => seekTo(video.currentTime + 1 / media.fps));
$('fpsSel').addEventListener('change', (e) => {
  if (e.target.value === 'auto') { media.fpsAuto = true; }
  else { media.fpsAuto = false; media.fps = parseFloat(e.target.value); }
  applyFps();
});

// drag & drop sobre el escenario
const stage = $('stage');
['dragenter', 'dragover'].forEach((ev) =>
  stage.addEventListener(ev, (e) => { e.preventDefault(); stage.classList.add('dragover'); }));
['dragleave', 'drop'].forEach((ev) =>
  stage.addEventListener(ev, (e) => { e.preventDefault(); stage.classList.remove('dragover'); }));
stage.addEventListener('drop', (e) => { loadFile(e.dataTransfer.files[0]); });

// cuentagotas
const wrap = $('canvasWrap');
$('btnPick').addEventListener('click', () => {
  state.picking = !state.picking;
  $('btnPick').classList.toggle('on', state.picking);
  wrap.classList.toggle('picking', state.picking);
  updatePickLabel();
});
// cuentagotas (click); el garbage matte usa eventos de puntero (abajo)
canvas.addEventListener('click', (e) => {
  if (!state.hasImage || state.matte.active || !state.picking) return;
  const r = canvas.getBoundingClientRect();
  pickAt(clamp01((e.clientX - r.left) / r.width) * canvas.width,
         clamp01((e.clientY - r.top) / r.height) * canvas.height);
  setView(0);   // salta a Compuesto para ver el resultado del key
});

// garbage matte: clic para añadir vértice, arrastrar para recolocar
let matteDrag = -1;
function matteCoords(e) {
  const r = canvas.getBoundingClientRect();
  return { nx: clamp01((e.clientX - r.left) / r.width), ny: clamp01((e.clientY - r.top) / r.height), rw: r.width, rh: r.height };
}
function matteNearVertex(nx, ny, rw, rh) {
  const thr = 18;
  for (let i = 0; i < state.matte.points.length; i++) {
    const p = state.matte.points[i];
    const dx = (p.x - nx) * rw, dy = (p.y - ny) * rh;
    if (dx * dx + dy * dy < thr * thr) return i;
  }
  return -1;
}
canvas.addEventListener('pointerdown', (e) => {
  if (!state.matte.active || !state.hasImage) return;
  e.preventDefault();
  const { nx, ny, rw, rh } = matteCoords(e);
  const idx = matteNearVertex(nx, ny, rw, rh);
  if (idx >= 0) {
    matteDrag = idx;                             // recolocar vértice existente
  } else {
    state.matte.points.push({ x: nx, y: ny });   // añadir nuevo
    matteDrag = state.matte.points.length - 1;
  }
  updateMatteTexture(); drawOverlay(); render(); updateNodeMap();
});
window.addEventListener('pointermove', (e) => {
  if (matteDrag < 0) return;
  const { nx, ny } = matteCoords(e);
  state.matte.points[matteDrag] = { x: nx, y: ny };
  updateMatteTexture(); drawOverlay(); render();
});
window.addEventListener('pointerup', () => { matteDrag = -1; });
function updatePickLabel() {
  $('btnPick').textContent = state.picking ? t('pick.on') : t('key.pick');
}

// color manual
$('keyColor').addEventListener('input', (e) => {
  const hex = e.target.value;
  state.key = [
    parseInt(hex.slice(1, 3), 16) / 255,
    parseInt(hex.slice(3, 5), 16) / 255,
    parseInt(hex.slice(5, 7), 16) / 255,
  ];
  $('keySwatch').style.background = hex;
  updateKeyChan();
  render();
  updateScopes();
});

// fondo + light wrap
$('btnBg').addEventListener('click', () => $('bgInput').click());
$('bgInput').addEventListener('change', (e) => { loadBackgroundFile(e.target.files[0]); });
$('btnBgClear').addEventListener('click', clearBackground);

// garbage matte
function updateMatteLabel() {
  const b = $('btnMatte');
  b.classList.toggle('on', state.matte.active);
  b.textContent = state.matte.active ? t('matte.finish') : t('matte.draw');
}
$('btnMatte').addEventListener('click', () => {
  state.matte.active = !state.matte.active;
  updateMatteLabel();
  if (state.matte.active && state.picking) {   // sale del cuentagotas
    state.picking = false; $('btnPick').classList.remove('on'); updatePickLabel();
  }
  wrap.classList.toggle('picking', state.matte.active || state.picking);
});
$('btnMatteClear').addEventListener('click', () => {
  state.matte.points = []; state.matte.has = false;
  updateMatteTexture(); drawOverlay(); render(); updateNodeMap();
});
$('btnMatteInvert').addEventListener('click', () => {
  state.matte.invert = !state.matte.invert;
  $('btnMatteInvert').classList.toggle('on', state.matte.invert);
  render();
});
// clean plate
$('btnPlate').addEventListener('click', captureCleanPlate);
$('btnPlateClear').addEventListener('click', () => {
  state.plate.has = false; state.plate.use = false;
  $('btnPlateClear').hidden = true; $('plateUseWrap').hidden = true;
  render(); updateNodeMap();
});
$('plateUse').addEventListener('change', (e) => {
  state.plate.use = e.target.checked; render(); updateNodeMap();
});
$('wrap').addEventListener('input', (e) => {
  state.wrap = parseFloat(e.target.value);
  $('wrapOut').textContent = state.wrap.toFixed(2);
  render();
  updateNodeMap();
});
$('wrapRadius').addEventListener('input', (e) => {
  state.wrapRadius = parseFloat(e.target.value);
  $('wrapRadiusOut').textContent = String(state.wrapRadius | 0);
  render();
});

// sliders
$('despill').addEventListener('input', (e) => {
  state.despill = parseFloat(e.target.value);
  $('despillOut').textContent = state.despill.toFixed(2);
  render();
  updateNodeMap();
});
$('tolerance').addEventListener('input', (e) => {
  state.tol = parseFloat(e.target.value);
  $('tolOut').textContent = state.tol.toFixed(3);
  render();
});
$('softness').addEventListener('input', (e) => {
  state.soft = parseFloat(e.target.value);
  $('softOut').textContent = state.soft.toFixed(3);
  render();
});

// vistas
document.querySelectorAll('.view').forEach((b) => {
  b.addEventListener('click', () => setView(parseInt(b.dataset.mode, 10)));
});
function updateViewHint() {
  const keys = ['view.hint.composite', 'view.hint.original', 'view.hint.alpha', 'view.hint.rgba', 'view.hint.split'];
  $('viewHint').textContent = t(keys[state.mode]);
}

// scopes
document.querySelectorAll('.scope').forEach((b) => {
  b.addEventListener('click', () => {
    state.scope = (state.scope === b.dataset.scope) ? 'off' : b.dataset.scope;   // toggle
    document.querySelectorAll('.scope').forEach((x) => x.classList.toggle('active', x.dataset.scope === state.scope));
    updateScopes();
  });
});

// idiomas
document.querySelectorAll('.lang').forEach((b) => {
  b.addEventListener('click', () => {
    lang = b.dataset.lang;
    localStorage.setItem('keylab.lang', lang);
    applyLang();
  });
});

/* ------------------------------------------------------------------ */
/*  Arranque                                                           */
/* ------------------------------------------------------------------ */
applyLang();
updateKeyChan();
render();

// registro del service worker (offline)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}));
}
