const templateType = document.getElementById('templateType');
const topText = document.getElementById('topText');
const headline = document.getElementById('headline');
const details = document.getElementById('details');
const bottomText = document.getElementById('bottomText');
const mapUpload = document.getElementById('mapUpload');
const mapUrl = document.getElementById('mapUrl');
const mapFit = document.getElementById('mapFit');
const previewScale = document.getElementById('previewScale');
const previewShell = document.getElementById('previewShell');
const previewScaler = document.getElementById('previewScaler');
const mapZoom = document.getElementById('mapZoom');
const mapPanX = document.getElementById('mapPanX');
const mapPanY = document.getElementById('mapPanY');
const resetMapPositionBtn = document.getElementById('resetMapPositionBtn');
let currentMapDataUrl = '';
let currentMapUrl = '';


const topColor = document.getElementById('topColor');
const accentColor = document.getElementById('accentColor');
const bottomColor = document.getElementById('bottomColor');
const highlightColor = document.getElementById('highlightColor');
const infoColor = document.getElementById('infoColor');
const frameColor = document.getElementById('frameColor');
const accentStripColor = document.getElementById('accentStripColor');

const graphic = document.getElementById('graphic');
const previewTop = document.getElementById('previewTop');
const previewHeadline = document.getElementById('previewHeadline');
const previewDetails = document.getElementById('previewDetails');
const previewBottom = document.getElementById('previewBottom');
const mapImage = document.getElementById('mapImage');
const mapPlaceholder = document.getElementById('mapPlaceholder');

const defaults = {
  severe: { top: 'SEVERE WEATHER ALERT', headline: 'STRONG STORMS POSSIBLE TONIGHT', details: 'Large hail, damaging winds, and heavy rainfall may impact parts of the region.', bottom: 'STAY WEATHER AWARE', colors: ['#b30000', '#ffd43b', '#ffd43b', '#ffd43b', '#111111', '#050505', '#b30000'] },
  flood: { top: 'FLOODING RISK', headline: 'HEAVY RAINFALL POSSIBLE', details: 'Repeated rounds of rain may cause street flooding and poor drainage issues.', bottom: 'TURN AROUND, DON’T DROWN', colors: ['#0b4ea2', '#64d2ff', '#64d2ff', '#64d2ff', '#101820', '#050505', '#0b4ea2'] },
  heat: { top: 'HEAT ALERT', headline: 'DANGEROUS HEAT EXPECTED', details: 'Limit outdoor activity, hydrate often, and check on pets and elderly neighbors.', bottom: 'HEAT SAFETY MATTERS', colors: ['#c74600', '#ffe066', '#ffe066', '#ffe066', '#17110a', '#050505', '#c74600'] },
  radar: { top: 'RADAR UPDATE', headline: 'STORMS MOVING THROUGH THE AREA', details: 'Heavy rain and gusty winds are possible as this activity moves across the region.', bottom: 'CHECK RADAR BEFORE TRAVEL', colors: ['#3c096c', '#f72585', '#f72585', '#f72585', '#100818', '#050505', '#3c096c'] },
  windAdvisory: { top: 'STRONG WIND ADVISORY', headline: 'STRONG WINDS POSSIBLE', details: 'Secure loose outdoor items and use caution while driving high-profile vehicles.', bottom: 'USE CAUTION OUTDOORS', colors: ['#7a4b00', '#ffcc33', '#ffcc33', '#ffcc33', '#111111', '#050505', '#7a4b00'] },
  windWarning: { top: 'STRONG WIND WARNING', headline: 'DAMAGING WINDS POSSIBLE', details: 'Strong winds may cause tree damage, power outages, and dangerous travel conditions.', bottom: 'TAKE WIND WARNINGS SERIOUSLY', colors: ['#b30000', '#ffcc33', '#ffcc33', '#ffcc33', '#111111', '#050505', '#b30000'] },
  windWatch: { top: 'STRONG WIND WATCH', headline: 'WIND THREAT BEING MONITORED', details: 'Conditions may become favorable for strong winds. Stay updated for later alerts.', bottom: 'STAY WEATHER AWARE', colors: ['#8a2be2', '#ffcc33', '#ffcc33', '#ffcc33', '#111111', '#050505', '#8a2be2'] },
  thunderstormAdvisory: { top: 'THUNDERSTORM ADVISORY', headline: 'THUNDERSTORMS POSSIBLE', details: 'Lightning, brief heavy rain, and gusty winds may affect parts of the area.', bottom: 'WHEN THUNDER ROARS, GO INDOORS', colors: ['#7a4b00', '#ffd43b', '#ffd43b', '#ffd43b', '#111111', '#050505', '#7a4b00'] },
  thunderstormWarning: { top: 'THUNDERSTORM WARNING', headline: 'SEVERE STORMS POSSIBLE', details: 'Damaging winds, large hail, frequent lightning, and heavy rain may occur.', bottom: 'SEEK SHELTER IF WARNED', colors: ['#b30000', '#ffd43b', '#ffd43b', '#ffd43b', '#111111', '#050505', '#b30000'] },
  thunderstormWatch: { top: 'THUNDERSTORM WATCH', headline: 'STORMS BEING MONITORED', details: 'The atmosphere may support strong to severe storms. Stay alert for warnings.', bottom: 'STAY WEATHER AWARE', colors: ['#d97706', '#ffd43b', '#ffd43b', '#ffd43b', '#111111', '#050505', '#d97706'] },
  hailAdvisory: { top: 'HAIL ADVISORY', headline: 'HAIL POSSIBLE', details: 'Small hail may occur with stronger storms. Protect vehicles and outdoor items.', bottom: 'WATCH FOR RAPID CHANGES', colors: ['#334155', '#a7f3d0', '#a7f3d0', '#a7f3d0', '#111111', '#050505', '#334155'] },
  hailWarning: { top: 'HAIL WARNING', headline: 'LARGE HAIL POSSIBLE', details: 'Large hail may damage vehicles, roofs, windows, and outdoor property.', bottom: 'MOVE VEHICLES UNDER COVER', colors: ['#b30000', '#a7f3d0', '#a7f3d0', '#a7f3d0', '#111111', '#050505', '#b30000'] },
  hailWatch: { top: 'HAIL WATCH', headline: 'HAIL THREAT BEING MONITORED', details: 'Conditions may support hail-producing storms. Check back for updates.', bottom: 'STAY WEATHER AWARE', colors: ['#5b21b6', '#a7f3d0', '#a7f3d0', '#a7f3d0', '#111111', '#050505', '#5b21b6'] },
  weatherAdvisory: { top: 'WEATHER ADVISORY', headline: 'WEATHER MAY IMPACT TRAVEL', details: 'Use caution and stay updated as conditions may change across the area.', bottom: 'CHECK CONDITIONS BEFORE TRAVEL', colors: ['#7a4b00', '#ffd43b', '#ffd43b', '#ffd43b', '#111111', '#050505', '#7a4b00'] },
  weatherWarning: { top: 'WEATHER WARNING', headline: 'HAZARDOUS WEATHER EXPECTED', details: 'Hazardous weather may impact the area. Take action if warnings are issued.', bottom: 'STAY ALERT AND TAKE ACTION', colors: ['#b30000', '#ffd43b', '#ffd43b', '#ffd43b', '#111111', '#050505', '#b30000'] },
  weatherWatch: { top: 'WEATHER WATCH', headline: 'WEATHER THREAT BEING MONITORED', details: 'Conditions may become hazardous. Monitor updates and be ready to act.', bottom: 'STAY WEATHER AWARE', colors: ['#d97706', '#ffd43b', '#ffd43b', '#ffd43b', '#111111', '#050505', '#d97706'] },
  currentConditions: { top: 'CURRENT CONDITIONS', headline: 'RBRTW AREA SNAPSHOT', details: 'Live NWS data for 78253 will be placed inside the map frame.', bottom: 'UPDATED FROM WEATHER.GOV', colors: ['#062e66', '#64d2ff', '#64d2ff', '#64d2ff', '#101820', '#050505', '#0b4ea2'] },
  custom: { top: 'WEATHER UPDATE', headline: 'CUSTOM WEATHER GRAPHIC', details: 'Enter your own text and choose a map or screenshot.', bottom: 'RBRTW WEATHER', colors: ['#1f2937', '#ffd43b', '#ffd43b', '#ffd43b', '#111111', '#050505', '#1f2937'] }
};


// -----------------------------
// CURRENT CONDITIONS TEMPLATE - 78253
// Pulls live NWS data and places it in the map frame as an editable/movable text panel.
// -----------------------------
const CURRENT_CONDITIONS_78253 = {
  label: 'SAN ANTONIO / 78253',
  lat: 29.46899,
  lon: -98.78885
};

let currentConditionsBox = null;
let lastCurrentConditionsText = '';
let isLoadingCurrentConditions = false;

function weatherApiHeaders() {
  // Browser fetch cannot manually set User-Agent. Accept is enough for JSON-LD from api.weather.gov.
  return { Accept: 'application/geo+json, application/json' };
}

async function fetchWeatherJson(url) {
  const response = await fetch(url, { headers: weatherApiHeaders() });
  if (!response.ok) throw new Error(`Weather.gov request failed: ${response.status}`);
  return response.json();
}

function apiValue(item) {
  if (!item || item.value === null || item.value === undefined || Number.isNaN(item.value)) return null;
  return item.value;
}

function cToF(value) {
  if (value === null || value === undefined || Number.isNaN(Number(value))) return null;
  return Math.round((Number(value) * 9) / 5 + 32);
}

function msToMph(value) {
  if (value === null || value === undefined || Number.isNaN(Number(value))) return null;
  return Math.round(Number(value) * 2.23694);
}

function metersToMiles(value) {
  if (value === null || value === undefined || Number.isNaN(Number(value))) return null;
  return Math.round(Number(value) * 0.000621371);
}

function firstGridValue(series) {
  if (!series || !Array.isArray(series.values) || !series.values.length) return null;
  return series.values[0].value ?? null;
}

function degreesToCompass(degrees) {
  if (degrees === null || degrees === undefined || Number.isNaN(Number(degrees))) return null;
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  return directions[Math.round(Number(degrees) / 22.5) % 16];
}

function firstNumberFromText(value) {
  const match = String(value || '').match(/\d+/);
  return match ? Number(match[0]) : null;
}

function displayValue(value, suffix = '', fallback = 'N/A') {
  if (value === null || value === undefined || value === '' || Number.isNaN(value)) return fallback;
  return `${value}${suffix}`;
}

function formatWeatherTime(value) {
  if (!value) return new Date().toLocaleString();
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return new Date().toLocaleString();
  return date.toLocaleString();
}

function buildCurrentConditionsText(data) {
  const alerts = data.alerts.length ? data.alerts.join(' / ') : 'No active NWS alerts';
  return [
    'RBRTW CURRENT CONDITIONS',
    data.location,
    data.condition,
    '',
    `TEMP: ${displayValue(data.temperature, '°F')}`,
    `HEAT INDEX: ${displayValue(data.heatIndex, '°F')}`,
    `DEW POINT: ${displayValue(data.dewPoint, '°F')}`,
    `HUMIDITY: ${displayValue(data.humidity, '%')}`,
    '',
    `WIND: ${displayValue(data.windDirection, '')} ${displayValue(data.windSpeed, ' MPH')}`,
    `GUSTS: ${displayValue(data.windGust, ' MPH')}`,
    `RAIN CHANCE: ${displayValue(data.rainChance, '%')}`,
    `SKY COVER: ${displayValue(data.skyCover, '%')}`,
    `VISIBILITY: ${displayValue(data.visibility, ' MI')}`,
    '',
    `ALERTS: ${alerts}`,
    '',
    `UPDATED: ${data.updated}`
  ].join('\n');
}

function setCurrentConditionsLoadingBox(message = 'Loading live NWS data for 78253...') {
  lastCurrentConditionsText = `RBRTW CURRENT CONDITIONS\nSAN ANTONIO / 78253\n\n${message}`;
  placeCurrentConditionsBox(lastCurrentConditionsText);
}

function placeCurrentConditionsBox(text) {
  if (!objectLayer) return;

  mapImage.removeAttribute('src');
  mapImage.style.display = 'none';
  mapPlaceholder.style.display = 'none';
  currentMapDataUrl = '';
  currentMapUrl = '';
  if (mapUrl) mapUrl.value = '';

  if (!currentConditionsBox || !objectLayer.contains(currentConditionsBox)) {
    currentConditionsBox = document.createElement('div');
    currentConditionsBox.className = 'text-box-object current-conditions-box';
    currentConditionsBox.contentEditable = 'true';
    currentConditionsBox.spellcheck = false;
    currentConditionsBox.style.left = '70px';
    currentConditionsBox.style.top = '48px';
    currentConditionsBox.style.width = '900px';
    currentConditionsBox.style.height = '500px';
    currentConditionsBox.style.color = '#ffffff';
    currentConditionsBox.style.backgroundColor = '#07182f';
    currentConditionsBox.style.borderColor = '#64d2ff';
    currentConditionsBox.style.borderWidth = '6px';
    currentConditionsBox.style.fontSize = '20px';
    currentConditionsBox.style.textAlign = 'left';
    currentConditionsBox.style.fontWeight = '900';
    currentConditionsBox.style.fontStyle = 'normal';
    currentConditionsBox.style.textDecoration = 'none';
    objectLayer.appendChild(currentConditionsBox);
    makeDraggableResizable(currentConditionsBox);
    currentConditionsBox.addEventListener('focus', () => selectTextBox(currentConditionsBox));
    currentConditionsBox.addEventListener('click', () => selectTextBox(currentConditionsBox));
    currentConditionsBox.addEventListener('input', () => {
      lastCurrentConditionsText = currentConditionsBox.innerText;
      if (selectedTextBox === currentConditionsBox && textBoxText) textBoxText.value = currentConditionsBox.innerText;
    });
  }

  currentConditionsBox.innerText = text;
  selectTextBox(currentConditionsBox);
}

async function loadCurrentConditions78253() {
  if (isLoadingCurrentConditions) return;
  isLoadingCurrentConditions = true;
  setCurrentConditionsLoadingBox();

  try {
    const { lat, lon, label } = CURRENT_CONDITIONS_78253;
    const point = await fetchWeatherJson(`https://api.weather.gov/points/${lat},${lon}`);
    const props = point.properties || {};
    const hourlyUrl = props.forecastHourly;
    const gridUrl = props.forecastGridData;
    const stationsUrl = props.observationStations;
    const alertsUrl = `https://api.weather.gov/alerts/active?point=${lat},${lon}`;

    const [hourly, grid, stations, alerts] = await Promise.all([
      hourlyUrl ? fetchWeatherJson(hourlyUrl) : Promise.resolve(null),
      gridUrl ? fetchWeatherJson(gridUrl) : Promise.resolve(null),
      stationsUrl ? fetchWeatherJson(stationsUrl) : Promise.resolve(null),
      fetchWeatherJson(alertsUrl)
    ]);

    const firstStationUrl = stations?.features?.[0]?.id;
    let observation = null;
    if (firstStationUrl) {
      try { observation = await fetchWeatherJson(`${firstStationUrl}/observations/latest`); }
      catch (error) { console.warn('Latest observation unavailable:', error); }
    }

    const obs = observation?.properties || {};
    const period = hourly?.properties?.periods?.[0] || {};
    const gridProps = grid?.properties || {};
    const alertNames = (alerts?.features || []).map(feature => feature?.properties?.event).filter(Boolean);

    const data = {
      location: label,
      condition: obs.textDescription || period.shortForecast || 'Current conditions unavailable',
      temperature: cToF(apiValue(obs.temperature)) ?? period.temperature ?? cToF(firstGridValue(gridProps.temperature)),
      heatIndex: cToF(apiValue(obs.heatIndex)) ?? cToF(firstGridValue(gridProps.apparentTemperature)),
      dewPoint: cToF(apiValue(obs.dewpoint)) ?? cToF(firstGridValue(gridProps.dewpoint)),
      humidity: Math.round(apiValue(obs.relativeHumidity) ?? firstGridValue(gridProps.relativeHumidity) ?? NaN),
      windDirection: degreesToCompass(apiValue(obs.windDirection)) || period.windDirection || 'N/A',
      windSpeed: msToMph(apiValue(obs.windSpeed)) ?? firstNumberFromText(period.windSpeed),
      windGust: msToMph(apiValue(obs.windGust)) ?? firstNumberFromText(period.windGust),
      rainChance: period.probabilityOfPrecipitation?.value ?? firstGridValue(gridProps.probabilityOfPrecipitation),
      skyCover: Math.round(firstGridValue(gridProps.skyCover) ?? NaN),
      visibility: metersToMiles(apiValue(obs.visibility)),
      alerts: alertNames,
      updated: formatWeatherTime(obs.timestamp || period.startTime || new Date().toISOString())
    };

    lastCurrentConditionsText = buildCurrentConditionsText(data);
    placeCurrentConditionsBox(lastCurrentConditionsText);
  } catch (error) {
    console.error(error);
    placeCurrentConditionsBox(`RBRTW CURRENT CONDITIONS\nSAN ANTONIO / 78253\n\nCould not load live Weather.gov data.\n${error.message || error}`);
  } finally {
    isLoadingCurrentConditions = false;
  }
}

function clearCurrentConditionsBox() {
  if (currentConditionsBox && objectLayer?.contains(currentConditionsBox)) currentConditionsBox.remove();
  currentConditionsBox = null;
}

function setColors(colors) {
  [topColor.value, accentColor.value, bottomColor.value, highlightColor.value, infoColor.value, frameColor.value] = colors;
  if (accentStripColor) accentStripColor.value = colors[6] || colors[0] || topColor.value;
}

function applyColors() {
  graphic.style.setProperty('--top-color', topColor.value);
  graphic.style.setProperty('--accent-color', accentColor.value);
  graphic.style.setProperty('--bottom-color', bottomColor.value);
  graphic.style.setProperty('--highlight-color', highlightColor.value);
  graphic.style.setProperty('--info-color', infoColor.value);
  graphic.style.setProperty('--frame-color', frameColor.value);
  if (accentStripColor) graphic.style.setProperty('--accent-strip-color', accentStripColor.value);
}

function applyPreset(type) {
  const item = defaults[type] || defaults.custom;
  topText.value = item.top;
  headline.value = item.headline;
  details.value = item.details;
  bottomText.value = item.bottom;
  setColors(item.colors);
  applyPreview();

  if (type === 'currentConditions') {
    loadCurrentConditions78253();
  } else {
    clearCurrentConditionsBox();
    if (!currentMapDataUrl && !currentMapUrl && !mapImage.getAttribute('src')) {
      mapPlaceholder.style.display = 'flex';
    }
  }
}

function updatePreviewScale() {
  const scale = Number(previewScale?.value || 0.5);
  if (!previewShell || !previewScaler) return;
  previewShell.style.width = `${1080 * scale}px`;
  previewShell.style.height = `${1080 * scale}px`;
  previewScaler.style.transform = `scale(${scale})`;
}

function applyMapFit() {
  const fit = mapFit.value || 'contain';
  mapImage.style.objectFit = fit;
}

function applyMapTransform() {
  const zoom = Number(mapZoom?.value || 100) / 100;
  const panX = Number(mapPanX?.value || 0);
  const panY = Number(mapPanY?.value || 0);
  mapImage.style.setProperty('--map-zoom', zoom);
  mapImage.style.setProperty('--map-pan-x', `${panX}%`);
  mapImage.style.setProperty('--map-pan-y', `${panY}%`);
}

function resetMapPosition() {
  if (mapZoom) mapZoom.value = 100;
  if (mapPanX) mapPanX.value = 0;
  if (mapPanY) mapPanY.value = 0;
  applyMapTransform();
}

function showMap(src) {
  if (!src) return;

  // Reset first so Safari/Chrome reliably reload the newly uploaded image.
  mapImage.removeAttribute('src');
  mapImage.style.display = 'block';
  mapImage.style.visibility = 'visible';
  mapImage.style.opacity = '1';
  mapPlaceholder.style.display = 'none';
  applyMapFit();
  applyMapTransform();

  requestAnimationFrame(() => {
    mapImage.src = src;
  });
}

function fileToScaledDataUrl(file, maxSize = 2200) {
  return new Promise((resolve, reject) => {
    const objectUrl = URL.createObjectURL(file);
    const img = new Image();

    img.onload = () => {
      try {
        const scale = Math.min(1, maxSize / Math.max(img.naturalWidth, img.naturalHeight));
        const width = Math.max(1, Math.round(img.naturalWidth * scale));
        const height = Math.max(1, Math.round(img.naturalHeight * scale));

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        URL.revokeObjectURL(objectUrl);
        resolve(canvas.toDataURL('image/png'));
      } catch (error) {
        URL.revokeObjectURL(objectUrl);
        reject(error);
      }
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error('The uploaded map image could not be loaded.'));
    };

    img.src = objectUrl;
  });
}

function applyPreview() {
  const type = templateType.value;
  graphic.className = `graphic ${type}`;
  previewTop.textContent = topText.value || 'WEATHER ALERT';
  previewHeadline.textContent = headline.value || 'WEATHER UPDATE';
  previewDetails.textContent = details.value || 'Details will appear here.';
  previewBottom.textContent = bottomText.value || 'STAY WEATHER AWARE';
  applyColors();
  applyMapFit();
  applyMapTransform();

  if (type === 'currentConditions') {
    if (lastCurrentConditionsText) placeCurrentConditionsBox(lastCurrentConditionsText);
    return;
  }

  const pastedUrl = mapUrl.value.trim();
  if (pastedUrl && pastedUrl !== currentMapUrl) {
    currentMapUrl = pastedUrl;
    currentMapDataUrl = '';
    showMap(pastedUrl);
  } else if (currentMapDataUrl) {
    showMap(currentMapDataUrl);
  } else if (currentMapUrl) {
    showMap(currentMapUrl);
  }
}

templateType.addEventListener('change', () => applyPreset(templateType.value));
document.getElementById('applyBtn').addEventListener('click', applyPreview);
[topColor, accentColor, bottomColor, highlightColor, infoColor, frameColor, accentStripColor].filter(Boolean).forEach(input => {
  input.addEventListener('input', applyPreview);
});
[topText, headline, details, bottomText].forEach(input => {
  input.addEventListener('input', applyPreview);
});

mapUpload.addEventListener('change', async () => {
  const file = mapUpload.files[0];
  if (!file) return;

  try {
    // Convert uploads into a browser-safe embedded PNG data URL.
    // This fixes the issue where the preview/export can lose a local uploaded file.
    currentMapDataUrl = await fileToScaledDataUrl(file);
    currentMapUrl = '';
    mapUrl.value = '';
    showMap(currentMapDataUrl);
    await waitForImage(mapImage);
  } catch (error) {
    alert('Map image could not be loaded. Try a PNG or JPG screenshot.');
    console.error(error);
  }
});

mapUrl.addEventListener('change', applyPreview);
mapFit.addEventListener('change', applyPreview);
[mapZoom, mapPanX, mapPanY].forEach(input => input?.addEventListener('input', applyMapTransform));
resetMapPositionBtn?.addEventListener('click', resetMapPosition);
previewScale.addEventListener('change', updatePreviewScale);

function waitForImage(img) {
  return new Promise(resolve => {
    if (!img || !img.src) return resolve();
    if (img.complete && img.naturalWidth > 0) return resolve();
    img.onload = () => resolve();
    img.onerror = () => resolve();
  });
}

async function waitForGraphicImages() {
  const images = [...graphic.querySelectorAll('img')];
  await Promise.all(images.map(async img => {
    await waitForImage(img);
    if (img.decode) {
      try { await img.decode(); } catch (e) {}
    }
  }));
  await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
}


function loadImageForCanvas(src) {
  return new Promise((resolve, reject) => {
    if (!src) return resolve(null);
    const img = new Image();
    // Only set crossOrigin for normal URLs. Do NOT set it for data/blob URLs.
    if (!src.startsWith('data:') && !src.startsWith('blob:')) img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Image failed to load for canvas export.'));
    img.src = src;
  });
}

function drawContainedImage(ctx, img, x, y, w, h, fit, zoom = 1, panX = 0, panY = 0) {
  if (!img) return;
  const iw = img.naturalWidth || img.width;
  const ih = img.naturalHeight || img.height;
  if (!iw || !ih) return;

  if (fit === 'fill') {
    const zw = w * zoom;
    const zh = h * zoom;
    ctx.save();
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.clip();
    ctx.drawImage(
      img,
      x + (w - zw) / 2 + (panX / 100) * (w / 2),
      y + (h - zh) / 2 + (panY / 100) * (h / 2),
      zw,
      zh
    );
    ctx.restore();
    return;
  }

  const scale = fit === 'cover'
    ? Math.max(w / iw, h / ih)
    : Math.min(w / iw, h / ih);

  const dw = iw * scale * zoom;
  const dh = ih * scale * zoom;
  const dx = x + (w - dw) / 2 + (panX / 100) * (w / 2);
  const dy = y + (h - dh) / 2 + (panY / 100) * (h / 2);

  ctx.save();
  ctx.beginPath();
  ctx.rect(x, y, w, h);
  ctx.clip();
  ctx.drawImage(img, dx, dy, dw, dh);
  ctx.restore();
}
function wrapCanvasText(ctx, text, x, y, maxWidth, lineHeight, maxLines = 4) {
  const words = String(text || '').split(/\s+/).filter(Boolean);
  const lines = [];
  let line = '';
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line);
      line = word;
      if (lines.length >= maxLines - 1) break;
    } else {
      line = test;
    }
  }
  if (line && lines.length < maxLines) lines.push(line);
  lines.forEach((ln, i) => ctx.fillText(ln, x, y + i * lineHeight));
  return lines.length;
}

function fitCanvasFont(ctx, text, maxWidth, startingSize, fontWeight = 900, family = 'Arial') {
  let size = startingSize;
  do {
    ctx.font = `${fontWeight} ${size}px ${family}`;
    if (ctx.measureText(text).width <= maxWidth) return size;
    size -= 2;
  } while (size >= 24);
  return size;
}

function drawCanvasArrow(ctx, x1, y1, x2, y2, color, thickness, type, atStart) {
  if (type === 'none') return;
  const angle = Math.atan2(y2 - y1, x2 - x1) + (atStart ? Math.PI : 0);
  const x = atStart ? x1 : x2;
  const y = atStart ? y1 : y2;
  const len = Math.max(24, thickness * 4.5);
  const spread = Math.PI / 7;
  const ax1 = x - len * Math.cos(angle - spread);
  const ay1 = y - len * Math.sin(angle - spread);
  const ax2 = x - len * Math.cos(angle + spread);
  const ay2 = y - len * Math.sin(angle + spread);
  ctx.save();
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = Math.max(3, thickness * 0.55);
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.beginPath();
  ctx.moveTo(ax1, ay1);
  ctx.lineTo(x, y);
  ctx.lineTo(ax2, ay2);
  if (type === 'closed') {
    ctx.closePath();
    ctx.fill();
  } else {
    ctx.stroke();
  }
  ctx.restore();
}


function getTopBannerGradient(ctx, type) {
  const gradient = ctx.createLinearGradient(16, 16, 1064, 16);
  const palettes = {
    severe: ['#7a0000', '#b30000', '#ff6f14'],
    thunderstormWarning: ['#7a0000', '#b30000', '#ff6f14'],
    weatherWarning: ['#7a0000', '#b30000', '#ff6f14'],
    windWarning: ['#7a0000', '#b30000', '#ff6f14'],
    hailWarning: ['#7a0000', '#b30000', '#ff6f14'],

    flood: ['#062e66', '#0b4ea2', '#64d2ff'],
    currentConditions: ['#062e66', '#0b4ea2', '#64d2ff'],
    heat: ['#8f2600', '#c74600', '#ffe066'],
    radar: ['#220047', '#3c096c', '#f72585'],

    windAdvisory: ['#4f2f00', '#7a4b00', '#ffcc33'],
    thunderstormAdvisory: ['#4f2f00', '#7a4b00', '#ffcc33'],
    weatherAdvisory: ['#4f2f00', '#7a4b00', '#ffcc33'],

    windWatch: ['#351062', '#5b21b6', '#a78bfa'],
    hailWatch: ['#351062', '#5b21b6', '#a78bfa'],

    thunderstormWatch: ['#7c3c00', '#d97706', '#ffd43b'],
    weatherWatch: ['#7c3c00', '#d97706', '#ffd43b'],

    hailAdvisory: ['#172033', '#334155', '#a7f3d0'],
    custom: ['#111827', '#1f2937', '#ffd43b']
  };
  const colors = palettes[type] || [topColor.value, topColor.value, accentColor.value];
  gradient.addColorStop(0, colors[0]);
  gradient.addColorStop(0.55, colors[1]);
  gradient.addColorStop(1, colors[2]);
  return gradient;
}

async function exportGraphicWithCanvas() {
  applyPreview();
  await waitForGraphicImages();

  const canvas = document.createElement('canvas');
  canvas.width = 1080;
  canvas.height = 1080;
  const ctx = canvas.getContext('2d');

  const top = topColor.value;
  const accent = accentColor.value;
  const bottom = bottomColor.value;
  const info = infoColor.value;
  const frame = frameColor.value;
  const highlight = highlightColor.value;
  const stripColor = accentStripColor?.value || topColor.value;

  // Main frame/background.
  ctx.fillStyle = frame;
  ctx.fillRect(0, 0, 1080, 1080);

  // Top banner.
  ctx.fillStyle = getTopBannerGradient(ctx, templateType.value);
  ctx.fillRect(16, 16, 1048, 128);
  ctx.fillStyle = accent;
  ctx.fillRect(16, 136, 1048, 8);
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.shadowColor = 'rgba(0,0,0,.58)';
  ctx.shadowOffsetX = 3;
  ctx.shadowOffsetY = 3;
  ctx.shadowBlur = 0;
  ctx.fillStyle = '#ffffff';
  fitCanvasFont(ctx, (topText.value || 'WEATHER ALERT').toUpperCase(), 980, 66, 1000);
  ctx.fillText((topText.value || 'WEATHER ALERT').toUpperCase(), 540, 80);
  ctx.shadowColor = 'transparent';

  // Map frame.
  const mapX = 20;
  const mapY = 144;
  const mapW = 1040;
  const mapH = 590;
  ctx.fillStyle = '#000000';
  ctx.fillRect(mapX, mapY, mapW, mapH);

  const src = currentMapDataUrl || currentMapUrl || mapImage.getAttribute('src') || '';
  if (templateType.value === 'currentConditions') {
    const bg = ctx.createLinearGradient(mapX, mapY, mapX + mapW, mapY + mapH);
    bg.addColorStop(0, '#06162b');
    bg.addColorStop(0.55, '#0b2c55');
    bg.addColorStop(1, '#020814');
    ctx.fillStyle = bg;
    ctx.fillRect(mapX, mapY, mapW, mapH);
  } else {
    try {
      const img = await loadImageForCanvas(src);
      drawContainedImage(ctx, img, mapX, mapY, mapW, mapH, mapFit.value || 'contain', Number(mapZoom?.value || 100) / 100, Number(mapPanX?.value || 0), Number(mapPanY?.value || 0));
    } catch (e) {
      // Keep the frame visible if a pasted URL blocks canvas export.
      ctx.fillStyle = '#111722';
      ctx.fillRect(mapX, mapY, mapW, mapH);
      ctx.fillStyle = '#8992a3';
      ctx.font = '900 34px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('MAP COULD NOT BE EXPORTED', 540, mapY + mapH / 2);
    }
  }

  // Draggable SVG line.
  if (activeLine) {
    const color = lineColor.value;
    const thickness = Number(lineThickness.value || 8);
    const x1 = mapX + activeLine.x1;
    const y1 = mapY + activeLine.y1;
    const x2 = mapX + activeLine.x2;
    const y2 = mapY + activeLine.y2;
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = thickness;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.restore();
    drawCanvasArrow(ctx, x1, y1, x2, y2, color, thickness, lineStartArrow.value, true);
    drawCanvasArrow(ctx, x1, y1, x2, y2, color, thickness, lineEndArrow.value, false);
  }

  // Circles and PNG overlays.
  const objectChildren = [...objectLayer.children];
  for (const el of objectChildren) {
    const x = mapX + el.offsetLeft;
    const y = mapY + el.offsetTop;
    const w = el.offsetWidth;
    const h = el.offsetHeight;
    if (el.classList.contains('circle-object')) {
      const stroke = parseFloat(el.style.borderWidth || circleThickness.value || 8);
      ctx.save();
      ctx.strokeStyle = el.style.borderColor || circleColor.value;
      ctx.lineWidth = stroke;
      ctx.beginPath();
      ctx.ellipse(x + w / 2, y + h / 2, Math.max(1, (w - stroke) / 2), Math.max(1, (h - stroke) / 2), 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }
    if (el.classList.contains('overlay-object')) {
      const overlayImg = el.querySelector('img');
      if (overlayImg && overlayImg.src) {
        try {
          const oi = await loadImageForCanvas(overlayImg.src);
          drawContainedImage(ctx, oi, x, y, w, h || w, 'contain');
        } catch (e) {}
      }
    }
  }


  // Draggable text boxes and generated color keys.
  for (const el of objectChildren) {
    const x = mapX + el.offsetLeft;
    const y = mapY + el.offsetTop;
    const w = el.offsetWidth;
    const h = el.offsetHeight;
    if (el.classList.contains('text-box-object')) {
      drawCanvasTextBox(ctx, el, x, y, w, h);
    }
    if (el.classList.contains('color-key-object')) {
      drawCanvasColorKey(ctx, el, x, y, w, h);
    }
  }

  // Brand badge.
  if (templateType.value !== 'currentConditions') {
    ctx.fillStyle = 'rgba(0,0,0,.82)';
    ctx.fillRect(885, 162, 158, 64);
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 3;
    ctx.strokeRect(885, 162, 158, 64);
    ctx.fillStyle = '#ffffff';
    ctx.font = '1000 34px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('RBRTW', 964, 194);
  }

  // Info panel.
  ctx.fillStyle = info;
  ctx.fillRect(16, 734, 1048, 290);
  ctx.fillStyle = accent;
  ctx.fillRect(16, 734, 1048, 8);
  ctx.fillStyle = stripColor;
  ctx.fillRect(54, 776, 20, 206);

  const headlineText = (headline.value || 'WEATHER UPDATE').toUpperCase();
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.shadowColor = 'rgba(0,0,0,.65)';
  ctx.shadowOffsetX = 4;
  ctx.shadowOffsetY = 4;
  ctx.shadowBlur = 0;
  ctx.font = '1000 60px Arial';
  const words = headlineText.split(/\s+/);
  const hLines = [];
  let hLine = '';
  for (const word of words) {
    const test = hLine ? `${hLine} ${word}` : word;
    if (ctx.measureText(test).width > 880 && hLine) {
      hLines.push(hLine);
      hLine = word;
    } else hLine = test;
  }
  if (hLine) hLines.push(hLine);
  hLines.slice(0, 2).forEach((ln, i) => {
    ctx.fillStyle = i === 1 ? highlight : '#ffffff';
    ctx.fillText(ln, 94, 775 + i * 62);
  });
  ctx.shadowColor = 'transparent';

  ctx.fillStyle = '#ffffff';
  ctx.font = '850 29px Arial';
  wrapCanvasText(ctx, details.value || 'Details will appear here.', 94, 913, 880, 34, 3);

  // Bottom banner.
  ctx.fillStyle = bottom;
  ctx.fillRect(16, 1024, 1048, 40);
  ctx.fillStyle = templateType.value === 'radar' ? '#ffffff' : '#111111';
  ctx.font = '1000 24px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText((bottomText.value || 'STAY WEATHER AWARE').toUpperCase(), 540, 1044);

  return canvas.toDataURL('image/png');
}

document.getElementById('downloadBtn').addEventListener('click', async () => {
  try {
    graphic.classList.add('is-exporting');
    const dataUrl = await exportGraphicWithCanvas();
    graphic.classList.remove('is-exporting');

    const link = document.createElement('a');
    link.download = `rbrtw-weather-graphic-${Date.now()}.png`;
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    link.remove();

    // iPhone/iPad Safari sometimes ignores automatic downloads.
    // Opening the PNG still lets you long-press/save it.
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    if (isIOS) {
      setTimeout(() => {
        const win = window.open();
        if (win) win.document.write(`<img src="${dataUrl}" style="width:100%;height:auto;display:block;">`);
      }, 300);
    }
  } catch (error) {
    graphic.classList.remove('is-exporting');
    alert('Download failed. Try a smaller PNG/JPG map screenshot, then download again.');
    console.error(error);
  }
});


updatePreviewScale();
applyMapTransform();
applyPreview();

// -----------------------------
// EXTRA MAP TOOLS
// Draggable SVG line, circle, and PNG overlay tools.
// -----------------------------
const mapFrame = document.getElementById('mapFrame');
const lineLayer = document.getElementById('lineLayer');
const objectLayer = document.getElementById('objectLayer');

const addLineBtn = document.getElementById('addLineBtn');
const clearLineBtn = document.getElementById('clearLineBtn');
const lineColor = document.getElementById('lineColor');
const lineThickness = document.getElementById('lineThickness');
const lineStartArrow = document.getElementById('lineStartArrow');
const lineEndArrow = document.getElementById('lineEndArrow');

const addCircleBtn = document.getElementById('addCircleBtn');
const clearCircleBtn = document.getElementById('clearCircleBtn');
const circleColor = document.getElementById('circleColor');
const circleThickness = document.getElementById('circleThickness');

const overlayUpload = document.getElementById('overlayUpload');
const overlayLibrary = document.getElementById('overlayLibrary');
const addSavedOverlayBtn = document.getElementById('addSavedOverlayBtn');
const clearOverlaysBtn = document.getElementById('clearOverlaysBtn');

const addTextBoxBtn = document.getElementById('addTextBoxBtn');
const clearTextBoxesBtn = document.getElementById('clearTextBoxesBtn');
const textBoxText = document.getElementById('textBoxText');
const textBoxTextColor = document.getElementById('textBoxTextColor');
const textBoxFillColor = document.getElementById('textBoxFillColor');
const textBoxBorderColor = document.getElementById('textBoxBorderColor');
const textBoxBorderThickness = document.getElementById('textBoxBorderThickness');
const textBoxFontSize = document.getElementById('textBoxFontSize');
const textAlignLeftBtn = document.getElementById('textAlignLeftBtn');
const textAlignCenterBtn = document.getElementById('textAlignCenterBtn');
const textAlignRightBtn = document.getElementById('textAlignRightBtn');
const textBoldBtn = document.getElementById('textBoldBtn');
const textItalicBtn = document.getElementById('textItalicBtn');
const textUnderlineBtn = document.getElementById('textUnderlineBtn');
const textBulletsBtn = document.getElementById('textBulletsBtn');

const colorKeyType = document.getElementById('colorKeyType');
const colorKeyPlacement = document.getElementById('colorKeyPlacement');
const addColorKeyBtn = document.getElementById('addColorKeyBtn');
const clearColorKeyBtn = document.getElementById('clearColorKeyBtn');
const keyMoveX = document.getElementById('keyMoveX');
const keyMoveY = document.getElementById('keyMoveY');
const keyScale = document.getElementById('keyScale');


// Add saved PNGs here after placing them in assets/overlays.
// Example: { label: 'Low Pressure', src: 'assets/overlays/low-pressure.png' }
const savedOverlays = [
  // { label: 'Low Pressure', src: 'assets/overlays/low-pressure.png' },
  // { label: 'Hail Icon', src: 'assets/overlays/hail.png' }
];

savedOverlays.forEach(item => {
  const option = document.createElement('option');
  option.value = item.src;
  option.textContent = item.label;
  overlayLibrary.appendChild(option);
});

let activeLine = null;
let dragTarget = null;
let dragMode = null;
let startPointer = null;
let startBox = null;

function svgPointFromEvent(event) {
  const rect = lineLayer.getBoundingClientRect();
  return {
    x: Math.max(0, Math.min(1040, ((event.clientX - rect.left) / rect.width) * 1040)),
    y: Math.max(0, Math.min(590, ((event.clientY - rect.top) / rect.height) * 590))
  };
}

function arrowMarker(id, type, color, size, orient) {
  if (type === 'none') return '';
  const strokeWidth = Math.max(2, size / 3);
  if (type === 'open') {
    return `<marker id="${id}" markerWidth="16" markerHeight="16" refX="13" refY="8" orient="${orient}" markerUnits="strokeWidth"><path d="M 3 2 L 13 8 L 3 14" fill="none" stroke="${color}" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round" /></marker>`;
  }
  return `<marker id="${id}" markerWidth="16" markerHeight="16" refX="13" refY="8" orient="${orient}" markerUnits="strokeWidth"><path d="M 3 2 L 13 8 L 3 14 Z" fill="${color}" stroke="${color}" stroke-width="1" /></marker>`;
}

function drawLine() {
  if (!activeLine) return;
  const color = lineColor.value;
  const thickness = Number(lineThickness.value || 8);
  const startType = lineStartArrow.value;
  const endType = lineEndArrow.value;
  const startMarker = startType !== 'none' ? 'url(#arrowStart)' : '';
  const endMarker = endType !== 'none' ? 'url(#arrowEnd)' : '';

  lineLayer.innerHTML = `
    <defs>
      ${arrowMarker('arrowStart', startType, color, thickness, 'auto-start-reverse')}
      ${arrowMarker('arrowEnd', endType, color, thickness, 'auto')}
    </defs>
    <line class="line-hit" x1="${activeLine.x1}" y1="${activeLine.y1}" x2="${activeLine.x2}" y2="${activeLine.y2}" stroke="transparent" stroke-width="${Math.max(thickness + 28, 36)}" />
    <line x1="${activeLine.x1}" y1="${activeLine.y1}" x2="${activeLine.x2}" y2="${activeLine.y2}" stroke="${color}" stroke-width="${thickness}" stroke-linecap="round" marker-start="${startMarker}" marker-end="${endMarker}" />
    <circle class="line-handle" data-point="start" cx="${activeLine.x1}" cy="${activeLine.y1}" r="14" fill="#fff" stroke="#111" stroke-width="4" />
    <circle class="line-handle" data-point="end" cx="${activeLine.x2}" cy="${activeLine.y2}" r="14" fill="#fff" stroke="#111" stroke-width="4" />
  `;
}

function addLine() {
  activeLine = { x1: 180, y1: 295, x2: 860, y2: 295 };
  drawLine();
}

function clearLine() {
  activeLine = null;
  lineLayer.innerHTML = '';
}

lineLayer.addEventListener('pointerdown', event => {
  if (!activeLine) return;
  const point = svgPointFromEvent(event);
  if (event.target.classList.contains('line-handle')) {
    dragMode = event.target.dataset.point === 'start' ? 'lineStart' : 'lineEnd';
  } else if (event.target.classList.contains('line-hit')) {
    dragMode = 'lineMove';
    startPointer = point;
    startBox = { ...activeLine };
  } else {
    return;
  }
  event.preventDefault();
  lineLayer.setPointerCapture(event.pointerId);
});

lineLayer.addEventListener('pointermove', event => {
  if (!dragMode || !activeLine) return;
  const point = svgPointFromEvent(event);
  if (dragMode === 'lineStart') {
    activeLine.x1 = point.x;
    activeLine.y1 = point.y;
  } else if (dragMode === 'lineEnd') {
    activeLine.x2 = point.x;
    activeLine.y2 = point.y;
  } else if (dragMode === 'lineMove') {
    const dx = point.x - startPointer.x;
    const dy = point.y - startPointer.y;
    activeLine.x1 = startBox.x1 + dx;
    activeLine.y1 = startBox.y1 + dy;
    activeLine.x2 = startBox.x2 + dx;
    activeLine.y2 = startBox.y2 + dy;
  }
  drawLine();
});

lineLayer.addEventListener('pointerup', () => { dragMode = null; });
lineLayer.addEventListener('pointercancel', () => { dragMode = null; });

[lineColor, lineThickness, lineStartArrow, lineEndArrow].forEach(input => input.addEventListener('input', drawLine));
addLineBtn.addEventListener('click', addLine);
clearLineBtn.addEventListener('click', clearLine);

function makeDraggableResizable(el, options = {}) {
  const handle = document.createElement('div');
  handle.className = 'resize-handle';
  el.appendChild(handle);

  el.addEventListener('pointerdown', event => {
    if (event.target === handle) return;
    dragTarget = el;
    dragMode = 'objectMove';
    startPointer = { x: event.clientX, y: event.clientY };
    startBox = { left: el.offsetLeft, top: el.offsetTop, width: el.offsetWidth, height: el.offsetHeight };
    el.setPointerCapture(event.pointerId);
  });

  handle.addEventListener('pointerdown', event => {
    event.stopPropagation();
    dragTarget = el;
    dragMode = 'objectResize';
    startPointer = { x: event.clientX, y: event.clientY };
    startBox = { left: el.offsetLeft, top: el.offsetTop, width: el.offsetWidth, height: el.offsetHeight };
    handle.setPointerCapture(event.pointerId);
  });

  el.addEventListener('pointermove', objectPointerMove);
  handle.addEventListener('pointermove', objectPointerMove);
  el.addEventListener('pointerup', stopObjectDrag);
  handle.addEventListener('pointerup', stopObjectDrag);
  el.addEventListener('pointercancel', stopObjectDrag);
  handle.addEventListener('pointercancel', stopObjectDrag);
}

function objectPointerMove(event) {
  if (!dragTarget || !dragMode || !startPointer || !startBox) return;
  const dx = event.clientX - startPointer.x;
  const dy = event.clientY - startPointer.y;
  if (dragMode === 'objectMove') {
    dragTarget.style.left = `${startBox.left + dx}px`;
    dragTarget.style.top = `${startBox.top + dy}px`;
  }
  if (dragMode === 'objectResize') {
    const newWidth = Math.max(28, startBox.width + dx);
    dragTarget.style.width = `${newWidth}px`;
    if (dragTarget.classList.contains('circle-object')) {
      dragTarget.style.height = `${newWidth}px`;
    } else if (startBox.width > 0 && startBox.height > 0) {
      dragTarget.style.height = `${Math.max(28, startBox.height * (newWidth / startBox.width))}px`;
    }
  }
}

function stopObjectDrag() {
  dragTarget = null;
  dragMode = null;
  startPointer = null;
  startBox = null;
}

function addCircle() {
  const circle = document.createElement('div');
  circle.className = 'circle-object';
  circle.style.borderColor = circleColor.value;
  circle.style.borderWidth = `${circleThickness.value}px`;
  objectLayer.appendChild(circle);
  makeDraggableResizable(circle);
}

function clearCircles() {
  objectLayer.querySelectorAll('.circle-object').forEach(el => el.remove());
}

function updateCircles() {
  objectLayer.querySelectorAll('.circle-object').forEach(circle => {
    circle.style.borderColor = circleColor.value;
    circle.style.borderWidth = `${circleThickness.value}px`;
  });
}

addCircleBtn.addEventListener('click', addCircle);
clearCircleBtn.addEventListener('click', clearCircles);
[circleColor, circleThickness].forEach(input => input.addEventListener('input', updateCircles));

function addOverlay(src) {
  const wrap = document.createElement('div');
  wrap.className = 'overlay-object';
  const img = document.createElement('img');
  img.src = src;
  img.alt = 'Weather overlay';
  img.style.width = '100%';
  img.style.height = '100%';
  img.style.objectFit = 'contain';
  img.draggable = false;
  wrap.appendChild(img);
  objectLayer.appendChild(wrap);
  makeDraggableResizable(wrap);
}

overlayUpload.addEventListener('change', () => {
  [...overlayUpload.files].forEach(file => {
    const reader = new FileReader();
    reader.onload = event => addOverlay(event.target.result);
    reader.readAsDataURL(file);
  });
  overlayUpload.value = '';
});

addSavedOverlayBtn.addEventListener('click', () => {
  if (!overlayLibrary.value) return;
  addOverlay(overlayLibrary.value);
});

clearOverlaysBtn.addEventListener('click', () => {
  objectLayer.querySelectorAll('.overlay-object').forEach(el => el.remove());
});


// -----------------------------
// TEXT BOX AND COLOR KEY TOOLS
// -----------------------------
const colorKeyLibrary = {
  radar: {
    title: 'Radar dBZ',
    items: [
      ['#04e9e7', '5'], ['#019ff4', '10'], ['#0300f4', '20'], ['#02fd02', '30'],
      ['#01c501', '35'], ['#008e00', '40'], ['#fdf802', '45'], ['#e5bc00', '50'],
      ['#fd9500', '55'], ['#fd0000', '60'], ['#d40000', '65'], ['#bc0000', '70'],
      ['#f800fd', '75+']
    ]
  },
  qpf: {
    title: 'QPF Inches',
    items: [
      ['#d9d9d9', '0.01'], ['#b6f2ff', '0.10'], ['#6ee7ff', '0.25'], ['#28a8ff', '0.50'],
      ['#0366d6', '1.0'], ['#00c853', '1.5'], ['#aeea00', '2.0'], ['#fff176', '3.0'],
      ['#ff9800', '4.0'], ['#f44336', '5.0'], ['#b71c1c', '7.0'], ['#9c27b0', '10+']
    ]
  },
  rainTotals: {
    title: 'Rain Totals in',
    items: [
      ['#f5f5f5', '0.01'], ['#c8e6c9', '0.10'], ['#66bb6a', '0.25'], ['#00c853', '0.50'],
      ['#00bcd4', '1.0'], ['#2196f3', '1.5'], ['#3f51b5', '2.0'], ['#7e57c2', '3.0'],
      ['#ab47bc', '4.0'], ['#e53935', '5.0'], ['#b71c1c', '7.0'], ['#ff00ff', '10+']
    ]
  },
  velocity: {
    title: 'Velocity MPH',
    items: [
      ['#ffd9d9', '200'], ['#ffe4a6', '190'], ['#ffcc7a', '180'], ['#ff9b55', '170'],
      ['#ff6b38', '160'], ['#f22a1f', '150'], ['#cf0000', '140'], ['#a60000', '130'],
      ['#780000', '120'], ['#4d0000', '110'], ['#7a6666', '100'], ['#b9b9b9', '90'],
      ['#b000ff', '80'], ['#00f0ff', '70'], ['#bffcff', '60'], ['#ffffff', '50'],
      ['#d8ffd8', '40'], ['#00ff28', '30'], ['#00d020', '20'], ['#008c12', '10'],
      ['#6f6f6f', '0'],
      ['#006900', '-10'], ['#008c12', '-20'], ['#00b020', '-30'], ['#00ff28', '-40'],
      ['#d8ffd8', '-50'], ['#bffcff', '-60'], ['#00f0ff', '-70'], ['#b000ff', '-80'],
      ['#4d0080', '-90'], ['#2b006b', '-100'], ['#5a005e', '-110'], ['#97005b', '-120'],
      ['#d60080', '-130'], ['#ff4fb3', '-140'], ['#ffc0e0', '-150'], ['#ffe5f2', '-160'],
      ['#ffffff', '-170'], ['#f2f2f2', '-180'], ['#e5e5e5', '-190'], ['#ffffff', '-200']
    ]
  },
  vil: {
    title: 'VIL kg/m²',
    items: [
      ['#e8f5e9', '5'], ['#a5d6a7', '10'], ['#66bb6a', '15'], ['#26a69a', '20'],
      ['#29b6f6', '25'], ['#1e88e5', '30'], ['#3949ab', '35'], ['#7e57c2', '40'],
      ['#ab47bc', '45'], ['#ec407a', '50'], ['#ff7043', '55'], ['#d50000', '60+']
    ]
  },
  heatIndex: {
    title: 'Heat Index °F',
    items: [
      ['#fff59d', '90'], ['#ffeb3b', '95'], ['#ffc107', '100'], ['#ff9800', '105'],
      ['#ff5722', '110'], ['#f44336', '115'], ['#b71c1c', '120+']
    ]
  },
  wind: {
    title: 'Wind MPH',
    items: [
      ['#dbeafe', '15'], ['#93c5fd', '25'], ['#3b82f6', '35'], ['#22c55e', '45'],
      ['#facc15', '55'], ['#f97316', '65'], ['#ef4444', '75'], ['#a21caf', '90+']
    ]
  },
  spc: {
    title: 'SPC Risk',
    items: [
      ['#8b4513', 'TSTM'], ['#59ff00', 'MRGL'], ['#ffff00', 'SLGT'], ['#ff9900', 'ENH'],
      ['#ff0000', 'MDT'], ['#ff00ff', 'HIGH']
    ]
  },
  spcSeverity: {
    title: 'SPC Index',
    items: [
      ['#8b4513', '0 TSTM'], ['#59ff00', '1 MRGL'], ['#ffff00', '2 SLGT'],
      ['#ff9900', '3 ENH'], ['#ff0000', '4 MDT'], ['#ff00ff', '5 HIGH']
    ]
  },
  winter: {
    title: 'Winter',
    items: [
      ['#b3e5fc', 'Light'], ['#4fc3f7', 'Moderate'], ['#0288d1', 'Heavy'], ['#7e57c2', 'Ice'],
      ['#ec407a', 'Blizzard']
    ]
  },
  fire: {
    title: 'Fire Weather',
    items: [
      ['#ffe082', 'Elevated'], ['#ffb300', 'Near Critical'], ['#f4511e', 'Critical'], ['#b71c1c', 'Extreme']
    ]
  }
};

let selectedTextBox = null;

function addTextBox() {
  const box = document.createElement('div');
  box.className = 'text-box-object';
  box.contentEditable = 'true';
  box.spellcheck = false;
  box.innerText = textBoxText?.value || 'NOAA HRRR V4\nPRECIPITATION AMOUNT IN INCHES\nBETWEEN NOW AND WEDNESDAY';
  box.style.color = textBoxTextColor?.value || '#ffffff';
  box.style.backgroundColor = textBoxFillColor?.value || '#003cff';
  box.style.borderColor = textBoxBorderColor?.value || '#ff0000';
  box.style.borderWidth = `${textBoxBorderThickness?.value || 6}px`;
  box.style.fontSize = `${textBoxFontSize?.value || 28}px`;
  box.style.textAlign = 'center';
  box.style.fontWeight = '700';
  box.style.fontStyle = 'normal';
  box.style.textDecoration = 'none';
  objectLayer.appendChild(box);
  makeDraggableResizable(box);
  selectTextBox(box);
  box.addEventListener('focus', () => selectTextBox(box));
  box.addEventListener('click', () => selectTextBox(box));
  box.addEventListener('input', () => {
    if (selectedTextBox === box && textBoxText) textBoxText.value = box.innerText;
  });
}

function selectTextBox(box) {
  objectLayer.querySelectorAll('.text-box-object').forEach(el => el.classList.remove('is-selected'));
  selectedTextBox = box;
  if (!box) return;
  box.classList.add('is-selected');
  if (textBoxText) textBoxText.value = box.innerText;
  if (textBoxTextColor) textBoxTextColor.value = rgbToHex(box.style.color || '#ffffff');
  if (textBoxFillColor) textBoxFillColor.value = rgbToHex(box.style.backgroundColor || '#003cff');
  if (textBoxBorderColor) textBoxBorderColor.value = rgbToHex(box.style.borderColor || '#ff0000');
  if (textBoxBorderThickness) textBoxBorderThickness.value = parseInt(box.style.borderWidth || '6', 10) || 6;
  if (textBoxFontSize) textBoxFontSize.value = parseInt(box.style.fontSize || '28', 10) || 28;
}

function rgbToHex(value) {
  if (!value) return '#ffffff';
  if (value.startsWith('#')) return value;
  const match = value.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
  if (!match) return '#ffffff';
  return '#' + [match[1], match[2], match[3]].map(n => Number(n).toString(16).padStart(2, '0')).join('');
}

function updateSelectedTextBox() {
  const box = selectedTextBox;
  if (!box) return;
  if (document.activeElement !== box && textBoxText) box.innerText = textBoxText.value;
  box.style.color = textBoxTextColor.value;
  box.style.backgroundColor = textBoxFillColor.value;
  box.style.borderColor = textBoxBorderColor.value;
  box.style.borderWidth = `${textBoxBorderThickness.value}px`;
  box.style.fontSize = `${textBoxFontSize.value}px`;
}

function setTextAlign(value) {
  if (!selectedTextBox) return;
  selectedTextBox.style.textAlign = value;
}
function toggleTextStyle(prop, normalValue, activeValue) {
  if (!selectedTextBox) return;
  selectedTextBox.style[prop] = selectedTextBox.style[prop] === activeValue ? normalValue : activeValue;
}
function toggleBullets() {
  if (!selectedTextBox) return;
  const lines = selectedTextBox.innerText.split('\n');
  const hasBullets = lines.every(line => !line.trim() || line.trim().startsWith('•'));
  selectedTextBox.innerText = lines.map(line => {
    const trimmed = line.trim();
    if (!trimmed) return '';
    return hasBullets ? trimmed.replace(/^•\s*/, '') : `• ${trimmed.replace(/^•\s*/, '')}`;
  }).join('\n');
  if (textBoxText) textBoxText.value = selectedTextBox.innerText;
}

addTextBoxBtn?.addEventListener('click', addTextBox);
clearTextBoxesBtn?.addEventListener('click', () => {
  objectLayer.querySelectorAll('.text-box-object').forEach(el => el.remove());
  selectedTextBox = null;
});
[textBoxText, textBoxTextColor, textBoxFillColor, textBoxBorderColor, textBoxBorderThickness, textBoxFontSize].forEach(input => input?.addEventListener('input', updateSelectedTextBox));
textAlignLeftBtn?.addEventListener('click', () => setTextAlign('left'));
textAlignCenterBtn?.addEventListener('click', () => setTextAlign('center'));
textAlignRightBtn?.addEventListener('click', () => setTextAlign('right'));
textBoldBtn?.addEventListener('click', () => toggleTextStyle('fontWeight', '400', '900'));
textItalicBtn?.addEventListener('click', () => toggleTextStyle('fontStyle', 'normal', 'italic'));
textUnderlineBtn?.addEventListener('click', () => toggleTextStyle('textDecoration', 'none', 'underline'));
textBulletsBtn?.addEventListener('click', toggleBullets);

function addOrUpdateColorKey() {
  const type = colorKeyType?.value || 'none';
  clearColorKey();
  if (type === 'none' || !colorKeyLibrary[type]) return;
  const key = buildColorKeyElement(type, colorKeyPlacement?.value || 'right');
  objectLayer.appendChild(key);
  makeDraggableResizable(key);
  syncKeySlidersFromElement(key);
  applyKeySliders();
}

function clearColorKey() {
  objectLayer.querySelectorAll('.color-key-object').forEach(el => el.remove());
}

function buildColorKeyElement(type, placement) {
  const data = colorKeyLibrary[type];
  const key = document.createElement('div');
  key.className = 'color-key-object';
  key.dataset.keyType = type;
  key.dataset.placement = placement;
  key.innerHTML = `<div class="color-key-title">${data.title}</div><div class="key-items"></div>`;
  const items = key.querySelector('.key-items');
  data.items.forEach(([color, label]) => {
    const row = document.createElement('div');
    row.className = 'key-row';
    row.innerHTML = `<span class="key-swatch" style="background:${color}"></span><span>${label}</span>`;
    items.appendChild(row);
  });
  placeColorKey(key, placement);
  return key;
}

function placeColorKey(key, placement) {
  key.classList.toggle('horizontal-key', placement === 'bottom');
  if (placement === 'left') {
    key.style.left = '18px'; key.style.top = '70px'; key.style.width = '102px'; key.style.height = '430px';
  } else if (placement === 'right') {
    key.style.left = '920px'; key.style.top = '70px'; key.style.width = '102px'; key.style.height = '430px';
  } else if (placement === 'bottom') {
    key.style.left = '210px'; key.style.top = '500px'; key.style.width = '620px'; key.style.height = '72px';
  } else if (placement === 'topLeft') {
    key.style.left = '18px'; key.style.top = '18px'; key.style.width = '118px'; key.style.height = '350px';
  } else {
    key.style.left = '900px'; key.style.top = '18px'; key.style.width = '118px'; key.style.height = '350px';
  }
}


function getActiveColorKey() {
  return objectLayer?.querySelector('.color-key-object') || null;
}

function syncKeySlidersFromElement(key) {
  if (!key) return;
  key.dataset.baseWidth = String(key.offsetWidth || parseFloat(key.style.width) || 102);
  key.dataset.baseHeight = String(key.offsetHeight || parseFloat(key.style.height) || 430);
  if (keyMoveX) keyMoveX.value = String(Math.round(key.offsetLeft || parseFloat(key.style.left) || 0));
  if (keyMoveY) keyMoveY.value = String(Math.round(key.offsetTop || parseFloat(key.style.top) || 0));
  if (keyScale) keyScale.value = '100';
}

function applyKeySliders() {
  const key = getActiveColorKey();
  if (!key) return;
  const x = Number(keyMoveX?.value ?? key.offsetLeft ?? 0);
  const y = Number(keyMoveY?.value ?? key.offsetTop ?? 0);
  const scale = Number(keyScale?.value || 100) / 100;
  const baseW = Number(key.dataset.baseWidth || key.offsetWidth || 102);
  const baseH = Number(key.dataset.baseHeight || key.offsetHeight || 430);
  key.style.left = `${x}px`;
  key.style.top = `${y}px`;
  key.style.width = `${Math.max(28, baseW * scale)}px`;
  key.style.height = `${Math.max(28, baseH * scale)}px`;
}

[keyMoveX, keyMoveY, keyScale].forEach(input => input?.addEventListener('input', applyKeySliders));
addColorKeyBtn?.addEventListener('click', addOrUpdateColorKey);
clearColorKeyBtn?.addEventListener('click', clearColorKey);
colorKeyPlacement?.addEventListener('change', () => {
  const key = objectLayer.querySelector('.color-key-object');
  if (key) {
    placeColorKey(key, colorKeyPlacement.value);
    syncKeySlidersFromElement(key);
  }
});
colorKeyType?.addEventListener('change', addOrUpdateColorKey);

const loadCurrentConditionsBtn = document.getElementById('loadCurrentConditionsBtn');
const clearCurrentConditionsBtn = document.getElementById('clearCurrentConditionsBtn');

loadCurrentConditionsBtn?.addEventListener('click', () => {
  templateType.value = 'currentConditions';
  applyPreset('currentConditions');
});

clearCurrentConditionsBtn?.addEventListener('click', () => {
  clearCurrentConditionsBox();
  lastCurrentConditionsText = '';
  if (templateType.value === 'currentConditions') {
    mapPlaceholder.style.display = 'flex';
  }
});

function drawCanvasTextBox(ctx, el, x, y, w, h) {
  const styles = getComputedStyle(el);
  const border = parseFloat(styles.borderWidth || '0') || 0;
  ctx.save();
  ctx.fillStyle = styles.backgroundColor || '#003cff';
  ctx.fillRect(x, y, w, h);
  if (border > 0) {
    ctx.strokeStyle = styles.borderColor || '#ff0000';
    ctx.lineWidth = border;
    ctx.strokeRect(x + border / 2, y + border / 2, w - border, h - border);
  }
  const fontSize = parseFloat(styles.fontSize || '28') || 28;
  const weight = styles.fontWeight || '700';
  const italic = styles.fontStyle === 'italic' ? 'italic ' : '';
  ctx.font = `${italic}${weight} ${fontSize}px Arial`;
  ctx.fillStyle = styles.color || '#ffffff';
  ctx.textBaseline = 'top';
  ctx.textAlign = styles.textAlign || 'center';
  const pad = Math.max(10, border + 8);
  const lines = el.innerText.split('\n');
  const lineHeight = fontSize * 1.15;
  let yy = y + pad;
  const maxWidth = w - pad * 2;
  lines.forEach(rawLine => {
    const wrapped = wrapTextToLines(ctx, rawLine, maxWidth);
    wrapped.forEach(line => {
      let tx = x + w / 2;
      if (ctx.textAlign === 'left') tx = x + pad;
      if (ctx.textAlign === 'right') tx = x + w - pad;
      ctx.fillText(line, tx, yy);
      if ((styles.textDecorationLine || styles.textDecoration || '').includes('underline')) {
        const metrics = ctx.measureText(line);
        let ux = tx;
        if (ctx.textAlign === 'center') ux = tx - metrics.width / 2;
        if (ctx.textAlign === 'right') ux = tx - metrics.width;
        ctx.fillRect(ux, yy + fontSize + 2, metrics.width, Math.max(2, fontSize / 15));
      }
      yy += lineHeight;
    });
  });
  ctx.restore();
}

function wrapTextToLines(ctx, text, maxWidth) {
  const words = String(text || '').split(/\s+/).filter(Boolean);
  if (!words.length) return [''];
  const lines = [];
  let line = '';
  words.forEach(word => {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = test;
    }
  });
  if (line) lines.push(line);
  return lines;
}

function drawCanvasColorKey(ctx, el, x, y, w, h) {
  const type = el.dataset.keyType;
  const data = colorKeyLibrary[type];
  if (!data) return;
  const horizontal = el.classList.contains('horizontal-key');
  ctx.save();
  ctx.fillStyle = 'rgba(0,0,0,.72)';
  ctx.fillRect(x, y, w, h);
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 2;
  ctx.strokeRect(x + 1, y + 1, w - 2, h - 2);
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  ctx.font = '900 13px Arial';
  ctx.fillText(data.title.toUpperCase(), x + w / 2, y + 6);
  if (horizontal) {
    const top = y + 29;
    const itemW = (w - 16) / data.items.length;
    data.items.forEach(([color, label], i) => {
      const sx = x + 8 + i * itemW;
      ctx.fillStyle = color;
      ctx.fillRect(sx, top, itemW, 20);
      ctx.strokeStyle = 'rgba(255,255,255,.55)';
      ctx.lineWidth = 1;
      ctx.strokeRect(sx, top, itemW, 20);
      ctx.fillStyle = '#ffffff';
      ctx.font = '800 10px Arial';
      ctx.fillText(label, sx + itemW / 2, top + 25);
    });
  } else {
    const rowH = Math.max(14, (h - 34) / data.items.length);
    data.items.forEach(([color, label], i) => {
      const yy = y + 28 + i * rowH;
      ctx.fillStyle = color;
      ctx.fillRect(x + 8, yy, 22, Math.min(14, rowH - 2));
      ctx.strokeStyle = 'rgba(255,255,255,.55)';
      ctx.lineWidth = 1;
      ctx.strokeRect(x + 8, yy, 22, Math.min(14, rowH - 2));
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'left';
      ctx.font = '800 12px Arial';
      ctx.fillText(label, x + 36, yy - 1);
    });
  }
  ctx.restore();
}
