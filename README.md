# RBRTW Weather Graphic Generator

Phase 1 starter: manual browser dashboard, live preview, and PNG download.

## Files
- `index.html` - dashboard and graphic preview
- `style.css` - RBRTW graphic template styling
- `app.js` - form logic and PNG download
- `netlify.toml` - Netlify static deploy config

## Use
Open `index.html` locally or deploy the folder to Netlify.

## Added map tools

This version includes:

- Draggable line with resize handles at both ends
- Adjustable line color and thickness
- Open or closed arrowheads on either end
- Draggable/resizable circle with adjustable outline color and thickness
- PNG overlay uploads for weather icons/symbols
- Optional saved PNG overlay library folder at `assets/overlays`

To add permanent saved overlays:

1. Put your PNG files in `assets/overlays`.
2. Open `app.js`.
3. Find `savedOverlays`.
4. Add entries like:

```js
{ label: 'Low Pressure', src: 'assets/overlays/low-pressure.png' }
```
