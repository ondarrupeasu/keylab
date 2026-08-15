/* KeyLab — scopes 2D calculados sobre el fotograma actual.
   Histograma · Waveform (luma) · RGB Parade · Vectorscopio.
   Matemática estándar de scopes (misma idea que los scopes WGSL de FreeCut, MIT).
   Se calcula en JS sobre la imagen ya decodificada (modo fotograma congelado:
   un solo fotograma, así que no hay problema de rendimiento). */

(function (global) {
  'use strict';

  const TARGET_SAMPLES = 160000;   // submuestreo para 4K
  const W = 720, H = 240;          // resolución lógica del lienzo de scopes

  const luma = (r, g, b) => 0.2126 * r + 0.7152 * g + 0.0722 * b;

  function stepFor(w, h) {
    return Math.max(1, Math.round(Math.sqrt((w * h) / TARGET_SAMPLES)));
  }

  // vuelca buffers de intensidad (Float32) tintados a un ImageData
  function paint(ctx, w, h, bufs, colors) {
    let max = 0;
    for (const b of bufs) for (let i = 0; i < b.length; i++) if (b[i] > max) max = b[i];
    if (max <= 0) max = 1;
    const img = ctx.createImageData(w, h);
    const d = img.data;
    for (let i = 0; i < w * h; i++) {
      let r = 0, g = 0, bl = 0;
      for (let k = 0; k < bufs.length; k++) {
        const v = Math.pow(Math.min(1, bufs[k][i] / max), 0.45); // gamma para levantar densidades bajas
        r += v * colors[k][0]; g += v * colors[k][1]; bl += v * colors[k][2];
      }
      const o = i * 4;
      d[o] = Math.min(255, r); d[o + 1] = Math.min(255, g); d[o + 2] = Math.min(255, bl); d[o + 3] = 255;
    }
    ctx.putImageData(img, 0, 0);
  }

  function clearBg(ctx, w, h) {
    ctx.fillStyle = '#0c0e12';
    ctx.fillRect(0, 0, w, h);
  }

  /* -------- Histograma -------- */
  function histogram(ctx, img, w, h) {
    const d = img.data, step = stepFor(img.width, img.height);
    const R = new Float32Array(256), G = new Float32Array(256), B = new Float32Array(256);
    for (let p = 0; p < d.length; p += 4 * step) {
      R[d[p]]++; G[d[p + 1]]++; B[d[p + 2]]++;
    }
    let max = 0;
    for (let i = 0; i < 256; i++) max = Math.max(max, R[i], G[i], B[i]);
    if (max <= 0) max = 1;
    clearBg(ctx, w, h);
    // rejilla
    ctx.strokeStyle = 'rgba(255,255,255,.08)'; ctx.lineWidth = 1;
    for (let i = 1; i < 4; i++) { const x = (i / 4) * w; ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); }
    const chans = [[R, '255,80,80'], [G, '80,220,120'], [B, '90,150,255']];
    ctx.globalCompositeOperation = 'lighter';
    for (const [buf, col] of chans) {
      ctx.beginPath();
      ctx.moveTo(0, h);
      for (let i = 0; i < 256; i++) {
        const x = (i / 255) * w;
        const y = h - (buf[i] / max) * (h - 4);
        ctx.lineTo(x, y);
      }
      ctx.lineTo(w, h); ctx.closePath();
      ctx.fillStyle = 'rgba(' + col + ',.5)'; ctx.fill();
    }
    ctx.globalCompositeOperation = 'source-over';
  }

  /* -------- Waveform (luma) -------- */
  function waveform(ctx, img, w, h) {
    const d = img.data, iw = img.width, ih = img.height, step = stepFor(iw, ih);
    const buf = new Float32Array(w * h);
    for (let y = 0; y < ih; y += step) {
      for (let x = 0; x < iw; x += step) {
        const p = (y * iw + x) * 4;
        const L = luma(d[p], d[p + 1], d[p + 2]) / 255;
        const sx = Math.min(w - 1, (x / iw) * w) | 0;
        const sy = Math.min(h - 1, h - 1 - L * (h - 1)) | 0;
        buf[sy * w + sx] += 1;
      }
    }
    clearBg(ctx, w, h);
    paintOver(ctx, w, h, [buf], [[180, 230, 200]]);
    graticuleRows(ctx, w, h);
  }

  /* -------- RGB Parade -------- */
  function parade(ctx, img, w, h) {
    const d = img.data, iw = img.width, ih = img.height, step = stepFor(iw, ih);
    const tw = Math.floor(w / 3);
    const R = new Float32Array(w * h), G = new Float32Array(w * h), B = new Float32Array(w * h);
    for (let y = 0; y < ih; y += step) {
      for (let x = 0; x < iw; x += step) {
        const p = (y * iw + x) * 4;
        const colX = (x / iw) * tw;
        plot(R, w, h, colX, d[p], 0);
        plot(G, w, h, colX + tw, d[p + 1], 0);
        plot(B, w, h, colX + 2 * tw, d[p + 2], 0);
      }
    }
    clearBg(ctx, w, h);
    paintOver(ctx, w, h, [R, G, B], [[255, 80, 80], [80, 220, 120], [90, 150, 255]]);
    graticuleRows(ctx, w, h);
    ctx.strokeStyle = 'rgba(255,255,255,.12)';
    ctx.beginPath(); ctx.moveTo(tw, 0); ctx.lineTo(tw, h); ctx.moveTo(2 * tw, 0); ctx.lineTo(2 * tw, h); ctx.stroke();
  }
  function plot(buf, w, h, x, val255, _) {
    const sx = Math.min(w - 1, Math.max(0, x)) | 0;
    const sy = Math.min(h - 1, h - 1 - (val255 / 255) * (h - 1)) | 0;
    buf[sy * w + sx] += 1;
  }

  /* -------- Vectorscopio (Cb/Cr) -------- */
  function vectorscope(ctx, img, w, h, key) {
    const d = img.data, iw = img.width, ih = img.height, step = stepFor(iw, ih);
    clearBg(ctx, w, h);
    const size = h, cx = w / 2, cy = h / 2, R = (size / 2) - 8;
    const buf = new Float32Array(w * h);
    const SCALE = R / 0.5; // Cb/Cr en ~[-0.5,0.5]
    for (let y = 0; y < ih; y += step) {
      for (let x = 0; x < iw; x += step) {
        const p = (y * iw + x) * 4;
        const r = d[p] / 255, g = d[p + 1] / 255, b = d[p + 2] / 255;
        const cb = -0.168736 * r - 0.331264 * g + 0.5 * b;
        const cr = 0.5 * r - 0.418688 * g - 0.081312 * b;
        const sx = (cx + cb * SCALE) | 0;
        const sy = (cy - cr * SCALE) | 0;
        if (sx >= 0 && sx < w && sy >= 0 && sy < h) buf[sy * w + sx] += 1;
      }
    }
    paintOver(ctx, w, h, [buf], [[200, 210, 230]]);
    // graticula: círculo y ejes
    ctx.strokeStyle = 'rgba(255,255,255,.14)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx - R, cy); ctx.lineTo(cx + R, cy);
    ctx.moveTo(cx, cy - R); ctx.lineTo(cx, cy + R); ctx.stroke();
    // marcador del color clave
    if (key) {
      const cb = -0.168736 * key[0] - 0.331264 * key[1] + 0.5 * key[2];
      const cr = 0.5 * key[0] - 0.418688 * key[1] - 0.081312 * key[2];
      const kx = cx + cb * SCALE, ky = cy - cr * SCALE;
      ctx.strokeStyle = '#ff7a66'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(kx, ky, 7, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(kx, ky); ctx.stroke();
    }
  }

  // pinta buffers en modo aditivo sobre el fondo ya dibujado
  function paintOver(ctx, w, h, bufs, colors) {
    const tmp = document.createElement('canvas'); tmp.width = w; tmp.height = h;
    const tctx = tmp.getContext('2d');
    paint(tctx, w, h, bufs, colors);
    ctx.globalCompositeOperation = 'lighter';
    ctx.drawImage(tmp, 0, 0);
    ctx.globalCompositeOperation = 'source-over';
  }

  function graticuleRows(ctx, w, h) {
    ctx.strokeStyle = 'rgba(255,255,255,.08)'; ctx.lineWidth = 1;
    for (let i = 1; i < 4; i++) { const y = (i / 4) * h; ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }
  }

  /* -------- API -------- */
  const Scopes = {
    W, H,
    draw(type, srcCanvas, scopeCanvas, key) {
      if (!srcCanvas.width) return;
      scopeCanvas.width = W; scopeCanvas.height = H;
      const ctx = scopeCanvas.getContext('2d');
      const img = srcCanvas.getContext('2d', { willReadFrequently: true })
        .getImageData(0, 0, srcCanvas.width, srcCanvas.height);
      if (type === 'histogram') histogram(ctx, img, W, H);
      else if (type === 'waveform') waveform(ctx, img, W, H);
      else if (type === 'parade') parade(ctx, img, W, H);
      else if (type === 'vectorscope') vectorscope(ctx, img, W, H, key);
    },
  };

  global.KeyLabScopes = Scopes;
})(window);
