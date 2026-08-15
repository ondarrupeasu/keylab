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
    'ex.title': 'Ejemplos de croma',
    'ex.good': 'Bueno',
    'ex.uneven': 'Iluminación desigual',
    'ex.shadow': 'Sombra en el fondo',
    'ex.noise': 'Poca luz (ruido)',
    'ex.spill': 'Mucho spill',
    'ex.blue': 'Croma azul',
    'ex.hint.good': 'Croma bien iluminado y uniforme: el key sale limpio con poco esfuerzo.',
    'ex.hint.uneven': 'Un lado del fondo está mucho más oscuro: verás que una sola tolerancia no vale para todo el fondo. (Aquí ayudará el clean plate).',
    'ex.hint.shadow': 'El sujeto proyecta sombra sobre el fondo: el borde se ensucia y cuesta separarlo.',
    'ex.hint.noise': 'Fondo con poca luz y ruidoso (sobre todo en azul): el alpha sale con "nieve" en los bordes.',
    'ex.hint.spill': 'Mucho verde rebotado en el sujeto: mira cómo el despill limpia el tinte de los bordes.',
    'ex.hint.blue': 'El mismo maniquí sobre croma azul: coge el azul con el cuentagotas. El key funciona igual; el canal ruidoso ahora es otro.',
    'src.title': 'Fuente',
    'src.load': 'Cargar imagen o vídeo…',
    'src.demo': 'Demo',
    'src.webcam': 'Webcam',
    'src.hint': 'Arrastra una imagen o vídeo aquí. Todo es local: nada se sube a internet.',
    'webcam.live': 'En directo',
    'webcam.freeze': 'Congelar',
    'webcam.resume': 'Reanudar',
    'webcam.error': 'No se pudo acceder a la cámara. Da permiso al navegador (y usa https).',
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
    'view.title': 'Vista',
    'view.composite': 'Compuesto',
    'view.original': 'Original',
    'view.alpha': 'Alpha',
    'view.rgba': 'Canales RGBA',
    'view.hint.composite': 'Croma aplicado sobre cuadros: lo transparente deja ver el ajedrezado.',
    'view.hint.original': 'La imagen tal cual, sin key.',
    'view.hint.alpha': 'El matte: blanco = sujeto, negro = fondo. Su función es decir qué se ve.',
    'view.hint.rgba': 'Los 4 canales a la vez. Fíjate: en verde el canal G sale muy claro y el B más ruidoso.',
    'drop.big': 'Carga una imagen o vídeo para empezar',
    'drop.small': 'o pulsa «Demo» para ver un croma de ejemplo',
    'foot.credits': 'CIFP Tartanga LHII · Realización A/V',
    'pick.on': 'Cuentagotas activo — pulsa en la imagen',
  },
  eu: {
    subtitle: 'Kroma laborategia',
    reset: '↺ Berrabiarazi',
    'ex.title': 'Kroma adibideak',
    'ex.good': 'Ona',
    'ex.uneven': 'Argiztapen desorekatua',
    'ex.shadow': 'Itzala atzealdean',
    'ex.noise': 'Argi gutxi (zarata)',
    'ex.spill': 'Spill handia',
    'ex.blue': 'Kroma urdina',
    'ex.hint.good': 'Ondo argiztatutako kroma uniformea: key-a garbi ateratzen da ahalegin gutxirekin.',
    'ex.hint.uneven': 'Atzealdearen alde bat askoz ilunagoa da: tolerantzia bakarrak ez du atzealde osoa balio. (Hemen clean plate-ak lagunduko du).',
    'ex.hint.shadow': 'Subjektuak itzala egiten du atzealdean: ertza zikintzen da eta zaila da bereiztea.',
    'ex.hint.noise': 'Atzealde ilun eta zaratatsua (batez ere urdinean): alpha "elurtsu" ateratzen da ertzetan.',
    'ex.hint.spill': 'Berde asko islatuta subjektuan: ikusi nola despill-ak ertzetako tindua garbitzen duen.',
    'ex.hint.blue': 'Maniki bera kroma urdinean: hartu urdina tanta-kontagailuarekin. Key-ak berdin funtzionatzen du; kanal zaratatsua orain bestea da.',
    'src.title': 'Iturria',
    'src.load': 'Kargatu irudia edo bideoa…',
    'src.demo': 'Demo',
    'src.webcam': 'Webcama',
    'src.hint': 'Arrastatu irudi edo bideo bat hona. Dena lokala da: ezer ez da internetera igotzen.',
    'webcam.live': 'Zuzenean',
    'webcam.freeze': 'Izoztu',
    'webcam.resume': 'Berrekin',
    'webcam.error': 'Ezin izan da kamera atzitu. Eman baimena nabigatzaileari (eta erabili https).',
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
    'view.title': 'Ikuspegia',
    'view.composite': 'Konposatua',
    'view.original': 'Jatorrizkoa',
    'view.alpha': 'Alpha',
    'view.rgba': 'RGBA kanalak',
    'view.hint.composite': 'Kroma laukien gainean: gardena denak lauki-taula erakusten du.',
    'view.hint.original': 'Irudia bere horretan, key-rik gabe.',
    'view.hint.alpha': 'Mattea: zuria = subjektua, beltza = atzealdea. Zer ikusten den esaten du.',
    'view.hint.rgba': '4 kanalak batera. Begiratu: berdean G kanala oso argi ateratzen da eta B zaratatsuagoa.',
    'drop.big': 'Kargatu irudi edo bideo bat hasteko',
    'drop.small': 'edo sakatu «Demo» adibide bat ikusteko',
    'foot.credits': 'CIFP Tartanga LHII · Ikus-entzunezko Errealizazioa',
    'pick.on': 'Tanta-kontagailua aktibo — sakatu irudian',
  },
  en: {
    subtitle: 'Chroma key lab',
    reset: '↺ Reset',
    'ex.title': 'Chroma examples',
    'ex.good': 'Good',
    'ex.uneven': 'Uneven lighting',
    'ex.shadow': 'Shadow on the screen',
    'ex.noise': 'Low light (noise)',
    'ex.spill': 'Heavy spill',
    'ex.blue': 'Blue screen',
    'ex.hint.good': 'Well-lit, even screen: the key comes out clean with little effort.',
    'ex.hint.uneven': 'One side of the screen is much darker: a single tolerance won’t cover the whole screen. (Clean plate helps here).',
    'ex.hint.shadow': 'The subject casts a shadow on the screen: the edge gets dirty and hard to separate.',
    'ex.hint.noise': 'Low-light, noisy screen (mostly in blue): the alpha comes out with edge “snow”.',
    'ex.hint.spill': 'Lots of bounced green on the subject: watch despill clean the edge tint.',
    'ex.hint.blue': 'Same mannequin on a blue screen: pick the blue with the eyedropper. The key works the same; the noisy channel is now a different one.',
    'src.title': 'Source',
    'src.load': 'Load image or video…',
    'src.demo': 'Demo',
    'src.webcam': 'Webcam',
    'src.hint': 'Drop an image or video here. Everything is local: nothing is uploaded.',
    'webcam.live': 'Live',
    'webcam.freeze': 'Freeze',
    'webcam.resume': 'Resume',
    'webcam.error': 'Could not access the camera. Grant the browser permission (and use https).',
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
    'view.title': 'View',
    'view.composite': 'Composite',
    'view.original': 'Original',
    'view.alpha': 'Alpha',
    'view.rgba': 'RGBA channels',
    'view.hint.composite': 'Key applied over a checkerboard: transparent areas show it through.',
    'view.hint.original': 'The image as-is, no key.',
    'view.hint.alpha': 'The matte: white = subject, black = background. It decides what shows.',
    'view.hint.rgba': 'All 4 channels at once. Note: on green, the G channel is very bright and B is noisier.',
    'drop.big': 'Load an image or video to start',
    'drop.small': 'or press “Demo” to see an example key',
    'foot.credits': 'CIFP Tartanga LHII · A/V Production',
    'pick.on': 'Eyedropper active — click on the image',
  },
};

let lang = localStorage.getItem('keylab.lang') || 'es';
let demoHintKey = null;   // clave i18n del ejemplo cargado (croma malo)

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
const gl = canvas.getContext('webgl2', { premultipliedAlpha: false, antialias: false });
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

// crominancia YCbCr (Rec.601)
vec2 chroma(vec3 c) {
  float cb = -0.168736 * c.r - 0.331264 * c.g + 0.5      * c.b;
  float cr =  0.5      * c.r - 0.418688 * c.g - 0.081312 * c.b;
  return vec2(cb, cr);
}

float keyAlpha(vec3 col) {
  float d = distance(chroma(col), chroma(uKey));
  // dentro de la tolerancia => transparente (0); fuera => opaco (1)
  return smoothstep(uTol, uTol + uSoft, d);
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
    float a  = keyAlpha(src);
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

  vec4 src = texture(uTex, uv);

  if (uMode == 1) {                         // original
    outColor = vec4(src.rgb, 1.0);
    return;
  }

  float a = keyAlpha(src.rgb);

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
      near  += 1.0 - keyAlpha(texture(uTex, uv + off).rgb);  // cuánto fondo hay alrededor
      bgAvg += texture(uBgTex, uv + off).rgb;
    }
    near  /= float(N);
    bgAvg /= float(N);
    float mask = a * near;                     // dentro del sujeto y cerca del borde
    fg = mix(fg, bgAvg, clamp(uWrap * mask, 0.0, 1.0));
  }

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
const tex = makeTex(0);     // primer plano (unidad 0)
const bgTex = makeTex(1);   // fondo (unidad 1)
gl.activeTexture(gl.TEXTURE0);
gl.uniform1i(U.tex, 0);
gl.uniform1i(U.bgTex, 1);

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
  gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.activeTexture(gl.TEXTURE1); gl.bindTexture(gl.TEXTURE_2D, bgTex);
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
  const dock = $('scopes');
  if (state.scope === 'off' || !state.hasImage) { dock.hidden = true; return; }
  dock.hidden = false;
  window.KeyLabScopes.draw(state.scope, srcCanvas, $('scopeCanvas'), state.key);
}

// cambia la vista (0 compuesto, 1 original, 2 alpha, 3 rgba) y refleja la UI
function setView(mode) {
  state.mode = mode;
  document.querySelectorAll('.view').forEach((x) => x.classList.toggle('active', +x.dataset.mode === mode));
  $('gridLabels').hidden = mode !== 3;
  updateViewHint();
  render();
  updateNodeMap();
}

// mapa de nodos (flujo de la señal, estilo Fusion): refleja el estado y es clicable
function updateNodeMap() {
  const el = $('nodemap');
  if (!state.hasImage) { el.hidden = true; return; }
  el.hidden = false;
  const m = state.mode, NW = 104, NH = 40, yC = 8 + NH / 2;
  const cls = (cur, lit) => (cur ? 'cur ' : '') + (lit ? 'lit' : '');
  const outLabel = t(['view.composite', 'view.original', 'view.alpha', 'view.rgba'][m]);
  const nodes = [
    { x: 6,   y: 8,  label: t('nm.source'),  cls: cls(m === 1 || m === 3, true), act: 1 },
    { x: 150, y: 8,  label: t('nm.key'),     cls: cls(m === 2, true),            act: 2 },
    { x: 294, y: 8,  label: t('nm.despill'), cls: cls(false, state.despill > 0), act: 0 },
    { x: 470, y: 8,  label: t('nm.merge'),   cls: cls(false, true),              act: 0 },
    { x: 614, y: 8,  label: outLabel,        cls: cls(m === 0, true),            act: 0 },
    { x: 470, y: 72, label: t('nm.bg'),      cls: cls(false, state.hasBg), act: 0, off: !state.hasBg },
  ];
  const link = (x1, y1, x2, y2, lit) =>
    `<line class="nm-link ${lit ? 'lit' : ''}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" marker-end="url(#nmArrow)"/>`;
  let svg = '<svg viewBox="0 0 724 120" xmlns="http://www.w3.org/2000/svg">';
  svg += '<defs><marker id="nmArrow" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#5a6472"/></marker></defs>';
  svg += link(110, yC, 150, yC);
  svg += link(254, yC, 294, yC);
  svg += link(398, yC, 470, yC);
  svg += link(574, yC, 614, yC);
  svg += link(522, 72, 522, 48, state.hasBg);                 // Fondo -> Merge
  svg += `<text class="nm-badge ${state.hasBg && state.wrap > 0 ? '' : 'off'}" x="530" y="63">${t('nm.lw')}</text>`;
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

  canvas.width = tw;
  canvas.height = th;

  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, srcCanvas);

  state.hasImage = true;
  document.getElementById('dropHint').hidden = true;
  render();
  updateScopes();
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
    srcCanvas.width = w; srcCanvas.height = h; canvas.width = w; canvas.height = h;
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
    const g = x.createRadialGradient(w * 0.40, h * 0.40, 50, w * 0.5, h * 0.55, w * 0.75);
    g.addColorStop(0, blue ? 'rgba(80,150,255,0.7)' : 'rgba(70,220,120,0.85)');
    g.addColorStop(1, 'rgba(0,0,0,0)');
    x.fillStyle = g; x.fillRect(0, 0, w, h);
    const vig = x.createRadialGradient(cx, h * 0.5, h * 0.32, cx, h * 0.55, h * 0.9);
    vig.addColorStop(0, 'rgba(0,0,0,0)');
    vig.addColorStop(1, blue ? 'rgba(0,6,25,0.55)' : 'rgba(0,25,8,0.55)');
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
function loadScene(opts, hintKey) {
  teardownVideo();
  if (state.webcam) stopWebcam();
  const c = buildScene(opts);
  setImageSource(c, c.width, c.height);
  demoHintKey = hintKey || null;
  updateExampleHint();
  // color clave preparado desde el croma (arriba, centro), pero SIN aplicar:
  // arranca en Original para que lo hagan paso a paso.
  pickAt(Math.round(c.width * 0.5), Math.round(c.height * 0.06));
  setView(1);
}
function loadDemo() { loadScene({}, null); }

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

// ejemplos de croma (bueno / malos)
const EXAMPLES = {
  good:   [{}, 'ex.hint.good'],
  uneven: [{ lighting: 'uneven', noise: 12 }, 'ex.hint.uneven'],
  shadow: [{ shadow: true }, 'ex.hint.shadow'],
  noise:  [{ noise: 46, spill: 0.35 }, 'ex.hint.noise'],
  spill:  [{ spill: 1.0 }, 'ex.hint.spill'],
  blue:   [{ screen: 'blue' }, 'ex.hint.blue'],
};
document.querySelectorAll('.ex').forEach((b) => {
  b.addEventListener('click', () => {
    document.querySelectorAll('.ex').forEach((x) => x.classList.remove('active'));
    b.classList.add('active');
    const [opts, hint] = EXAMPLES[b.dataset.ex];
    loadScene(opts, hint);
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
  document.querySelectorAll('.view').forEach((x) => x.classList.toggle('active', x.dataset.mode === '0'));
  document.querySelectorAll('.scope').forEach((x) => x.classList.toggle('active', x.dataset.scope === 'off'));
  document.querySelectorAll('.ex').forEach((x) => x.classList.remove('active'));
  ['gridLabels', 'transport', 'frozenHint', 'webcamBar', 'scopes', 'nodemap', 'btnBgClear'].forEach((id) => { $(id).hidden = true; });
  $('dropHint').hidden = false;
  updateKeyChan(); updateViewHint(); updatePickLabel(); updateExampleHint();
  canvas.width = 300; canvas.height = 150;
  render();
}
$('btnReset').addEventListener('click', resetAll);

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
canvas.addEventListener('click', (e) => {
  if (!state.picking || !state.hasImage) return;
  const r = canvas.getBoundingClientRect();
  const ix = (e.clientX - r.left) / r.width * canvas.width;
  const iy = (e.clientY - r.top) / r.height * canvas.height;
  pickAt(ix, iy);
  setView(0);   // salta a Compuesto para ver el resultado del key
});
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
  const keys = ['view.hint.composite', 'view.hint.original', 'view.hint.alpha', 'view.hint.rgba'];
  $('viewHint').textContent = t(keys[state.mode]);
}

// scopes
document.querySelectorAll('.scope').forEach((b) => {
  b.addEventListener('click', () => {
    document.querySelectorAll('.scope').forEach((x) => x.classList.remove('active'));
    b.classList.add('active');
    state.scope = b.dataset.scope;
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
