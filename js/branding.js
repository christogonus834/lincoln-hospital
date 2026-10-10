// public/js/branding.js
// Loads the hospital logo (if one is set) and swaps it into the header and
// footer brand slots. Falls back silently to the inline SVG mark otherwise.

async function loadBranding() {
  try {
    const data = await api.get('/api/hospital/branding');
    applyLogo('brandLogoSlot', data.logo);
    applyLogo('brandLogoSlotFooter', data.logo);
  } catch (e) {
    // Leave the default SVG glyph in place.
  }
}

function applyLogo(elementId, url) {
  const slot = document.getElementById(elementId);
  if (!slot || !url) return;
  const img = document.createElement('img');
  img.src = url;
  img.alt = 'Sterling Specialist Hospital logo';
  slot.innerHTML = '';
  slot.appendChild(img);
}
