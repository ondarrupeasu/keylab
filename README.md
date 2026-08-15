# KeyLab

Web-laboratorio interactivo para **entender el chroma key** (croma verde/azul). Material docente de
**CIFP Tartanga LHII** (Realización A/V). PWA estática, sin backend: **nada se sube a internet**.

En vivo: https://keylab.cinemafilmak.com

## Idea

Es una herramienta **para ENTENDER, no para producir**. El croma "de verdad" se hace en After Effects / Fusion.
Por eso no exporta vídeo. El alumno carga una imagen (o, más adelante, un fotograma de un vídeo local) y ve el
key aplicado en tiempo real, con las vistas pedagógicas clave.

## Estado

**Fase 1 — núcleo (hecho):**
- Chroma key en shader WebGL2 (crominancia YCbCr), tolerancia y suavizado.
- Cuentagotas para elegir el color clave.
- ⭐ Vista de los **4 canales R/G/B/A a la vez** (en gris).
- ⭐ Vista **ALPHA** (matte) destacada.
- Imagen **demo generada** (fondo verde desigual + ruido mayor en el azul) para la lección G vs B.
- PWA instalable + offline (service worker). Trilingüe **es / eu / en**.

**Siguientes fases (previstas):** despill · imagen de fondo + light wrap · garbage matte · scopes (FreeCut) ·
cargador de vídeo local + scrub (modo fotograma congelado) · comparar verde vs azul.

## Ejecutar en local

Sirve la carpeta con cualquier servidor estático, p.ej.:

```bash
python3 -m http.server 8000
```

y abre http://localhost:8000

## Créditos

- Imagen de demo verde (`demo.jpg`): *"Girl in front of a green background"* por **PictureYouth**,
  [CC BY 2.0](https://creativecommons.org/licenses/by/2.0) — vía
  [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Girl_in_front_of_a_green_background.jpg).
- Imagen de demo azul (`demo-blue.jpg`): retrato sobre croma de **Pexels**
  ([Pexels License](https://www.pexels.com/license/), uso libre) —
  [foto 36904563](https://www.pexels.com/photo/36904563/). El fondo se recolorea a azul en la app.

## Licencia

MIT. Los scopes que se reutilicen de [FreeCut](https://github.com/) son MIT — se conservará su aviso.
