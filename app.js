/* KeyLab — núcleo WebGL2: chroma key + 4 canales R/G/B/A + alpha.
   Todo local, sin backend. Material docente CIFP Tartanga LHII. */

'use strict';

/* ------------------------------------------------------------------ */
/*  i18n                                                               */
/* ------------------------------------------------------------------ */
const I18N = {
  es: {
    subtitle: 'Laboratorio de croma',
    'src.title': 'Fuente',
    'src.load': 'Cargar imagen o vídeo…',
    'src.demo': 'Demo',
    'src.hint': 'Arrastra una imagen o vídeo aquí. Todo es local: nada se sube a internet.',
    'media.frozen': 'Modo fotograma congelado: mueve el timeline y elige el cuadro. No se reproduce en continuo.',
    'media.badcodec': 'No se puede decodificar este vídeo en el navegador (¿ProRes o HEVC?). Prueba con MP4 (H.264) o WebM.',
    'key.despill': 'Despill',
    'key.despill.hint': 'Despill: quita el tinte del croma que se cuela en los bordes del sujeto.',
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
    'src.title': 'Iturria',
    'src.load': 'Kargatu irudia edo bideoa…',
    'src.demo': 'Demo',
    'src.hint': 'Arrastatu irudi edo bideo bat hona. Dena lokala da: ezer ez da internetera igotzen.',
    'media.frozen': 'Fotograma izoztuaren modua: mugitu denbora-lerroa eta aukeratu markoa. Ez da jarraian erreproduzitzen.',
    'media.badcodec': 'Bideo hau ezin da nabigatzailean deskodetu (ProRes edo HEVC?). Saiatu MP4 (H.264) edo WebM formatuarekin.',
    'key.despill': 'Despill',
    'key.despill.hint': 'Despill: subjektuaren ertzetan sartzen den kroma-tindua kentzen du.',
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
    'src.title': 'Source',
    'src.load': 'Load image or video…',
    'src.demo': 'Demo',
    'src.hint': 'Drop an image or video here. Everything is local: nothing is uploaded.',
    'media.frozen': 'Frozen-frame mode: move the timeline and pick the frame. It does not play back.',
    'media.badcodec': 'This video can’t be decoded in the browser (ProRes or HEVC?). Try MP4 (H.264) or WebM.',
    'key.despill': 'Despill',
    'key.despill.hint': 'Despill: removes the chroma tint that spills onto the subject’s edges.',
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
}
function t(key) { return (I18N[lang] || I18N.es)[key] || key; }

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

  // compuesto sobre ajedrezado (con despill en el primer plano)
  vec3 bg = checker(vUv * uRes);
  vec3 fg = despill(src.rgb);
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
};

const tex = gl.createTexture();
gl.bindTexture(gl.TEXTURE_2D, tex);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
gl.uniform1i(U.tex, 0);

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
  if (file.type.startsWith('video/')) loadVideoFile(file);
  else if (file.type.startsWith('image/')) loadImageFile(file);
}

/* --- imagen demo generada: croma verde realista (iluminación desigual,
       pelo con mechones, algo de spill verde y ruido mayor en azul) --- */
function buildDemo() {
  const w = 1280, h = 720;
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  const x = c.getContext('2d');
  const cx = w * 0.5;

  // --- fondo verde: base + hotspot de luz + viñeta (iluminación desigual) ---
  x.fillStyle = '#0b9c3b';
  x.fillRect(0, 0, w, h);
  let g = x.createRadialGradient(w * 0.40, h * 0.40, 50, w * 0.5, h * 0.55, w * 0.75);
  g.addColorStop(0, 'rgba(70,220,120,0.85)');
  g.addColorStop(1, 'rgba(0,120,55,0)');
  x.fillStyle = g; x.fillRect(0, 0, w, h);
  let vig = x.createRadialGradient(cx, h * 0.5, h * 0.32, cx, h * 0.55, h * 0.9);
  vig.addColorStop(0, 'rgba(0,0,0,0)');
  vig.addColorStop(1, 'rgba(0,25,8,0.55)');
  x.fillStyle = vig; x.fillRect(0, 0, w, h);

  // --- silueta del sujeto (cabeza + cuello + hombros) como Path2D reutilizable ---
  const headCy = h * 0.42, headRx = 105, headRy = 132;
  const body = new Path2D();
  body.moveTo(cx - 300, h);
  body.quadraticCurveTo(cx - 250, h * 0.66, cx - 95, h * 0.60);   // hombro izq
  body.quadraticCurveTo(cx - 70, h * 0.55, cx - 60, h * 0.50);    // cuello izq
  body.lineTo(cx + 60, h * 0.50);
  body.quadraticCurveTo(cx + 70, h * 0.55, cx + 95, h * 0.60);    // cuello/hombro der
  body.quadraticCurveTo(cx + 250, h * 0.66, cx + 300, h);
  body.closePath();

  // sombra de contacto suave sobre el "suelo"
  x.save();
  x.filter = 'blur(18px)';
  x.fillStyle = 'rgba(0,40,15,0.35)';
  x.beginPath(); x.ellipse(cx, h * 0.98, 260, 40, 0, 0, Math.PI * 2); x.fill();
  x.restore();

  // camiseta (con sombreado)
  let shirt = x.createLinearGradient(0, h * 0.5, 0, h);
  shirt.addColorStop(0, '#3a6f9c');
  shirt.addColorStop(1, '#22405c');
  x.fillStyle = shirt; x.fill(body);

  // cuello
  x.fillStyle = '#b07a58';
  x.fillRect(cx - 42, h * 0.40, 84, h * 0.14);

  // pelo (masa por detrás, borde irregular)
  x.fillStyle = '#241a15';
  x.beginPath();
  x.ellipse(cx, headCy - 18, headRx + 20, headRy + 6, 0, 0, Math.PI * 2);
  x.fill();

  // cabeza con sombreado de piel
  let skin = x.createRadialGradient(cx - 34, headCy - 34, 20, cx, headCy, headRy);
  skin.addColorStop(0, '#e0ad86');
  skin.addColorStop(1, '#b3805e');
  x.fillStyle = skin;
  x.beginPath(); x.ellipse(cx, headCy, headRx, headRy, 0, 0, Math.PI * 2); x.fill();

  // rasgos mínimos (para que parezca sujeto, no una mancha)
  x.fillStyle = 'rgba(60,40,30,0.55)';
  x.beginPath(); x.ellipse(cx - 42, headCy - 12, 10, 6, 0, 0, Math.PI * 2); x.fill();
  x.beginPath(); x.ellipse(cx + 42, headCy - 12, 10, 6, 0, 0, Math.PI * 2); x.fill();
  x.strokeStyle = 'rgba(120,70,55,0.5)'; x.lineWidth = 4;
  x.beginPath(); x.moveTo(cx - 18, headCy + 44); x.quadraticCurveTo(cx, headCy + 54, cx + 18, headCy + 44); x.stroke();

  // flequillo/pelo por delante (parte superior de la cabeza)
  x.fillStyle = '#2b201a';
  x.beginPath();
  x.moveTo(cx - headRx, headCy - 6);
  x.quadraticCurveTo(cx - headRx * 0.5, headCy - headRy * 1.05, cx, headCy - headRy * 0.86);
  x.quadraticCurveTo(cx + headRx * 0.5, headCy - headRy * 1.05, cx + headRx, headCy - 6);
  x.quadraticCurveTo(cx, headCy - headRy * 0.55, cx - headRx, headCy - 6);
  x.closePath(); x.fill();

  // mechones sueltos (el reto clásico del alpha): pelillos finos hacia el fondo
  x.strokeStyle = 'rgba(30,22,17,0.8)';
  x.lineWidth = 1.4;
  for (let i = 0; i < 60; i++) {
    const ang = Math.PI + (i / 59) * Math.PI;              // semicírculo superior
    const ox = cx + Math.cos(ang) * (headRx + 8);
    const oy = headCy - 22 + Math.sin(ang) * (headRy - 10);
    const len = 14 + Math.random() * 34;
    const drift = (Math.random() - 0.5) * 26;
    x.globalAlpha = 0.5 + Math.random() * 0.4;
    x.beginPath();
    x.moveTo(ox, oy);
    x.quadraticCurveTo(ox + drift * 0.5, oy - len * 0.6, ox + drift, oy - len);
    x.stroke();
  }
  x.globalAlpha = 1;

  // --- spill verde en los bordes del sujeto (para practicar despill) ---
  x.save();
  x.clip(body);
  let spill = x.createLinearGradient(cx - 300, 0, cx + 300, 0);
  spill.addColorStop(0.00, 'rgba(60,200,90,0.55)');
  spill.addColorStop(0.18, 'rgba(60,200,90,0)');
  spill.addColorStop(0.82, 'rgba(60,200,90,0)');
  spill.addColorStop(1.00, 'rgba(60,200,90,0.55)');
  x.globalCompositeOperation = 'lighter';
  x.fillStyle = spill; x.fill(body);
  x.restore();
  // rim verde tenue alrededor de la cabeza
  x.save();
  x.globalCompositeOperation = 'lighter';
  x.strokeStyle = 'rgba(70,210,110,0.35)'; x.lineWidth = 6;
  x.beginPath(); x.ellipse(cx, headCy, headRx, headRy, 0, 0, Math.PI * 2); x.stroke();
  x.restore();

  // --- ruido: más fuerte en AZUL (lección G vs B) ---
  const id = x.getImageData(0, 0, w, h);
  const d = id.data;
  for (let i = 0; i < d.length; i += 4) {
    d[i]     += (Math.random() - 0.5) * 7;    // R poco
    d[i + 1] += (Math.random() - 0.5) * 7;    // G poco
    d[i + 2] += (Math.random() - 0.5) * 32;   // B mucho ruido
  }
  x.putImageData(id, 0, 0);

  return c;
}
function loadDemo() {
  teardownVideo();
  const c = buildDemo();
  setImageSource(c, c.width, c.height);
  // deja preparado un color clave del verde BIEN iluminado (no la viñeta oscura),
  // pero SIN aplicar el key: arranca en Original para que lo hagan paso a paso.
  pickAt(Math.round(c.width * 0.24), Math.round(c.height * 0.28));
  setView(1);
}

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

// sliders
$('despill').addEventListener('input', (e) => {
  state.despill = parseFloat(e.target.value);
  $('despillOut').textContent = state.despill.toFixed(2);
  render();
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
