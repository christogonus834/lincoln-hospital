// public/js/hero-slider.js
// Rotating hero photos. Pauses on hover/focus and via a visible button, and
// starts paused for visitors who prefer reduced motion.

function initHeroSlider(slides) {
  const bg = document.getElementById('heroSlides');
  const section = document.getElementById('heroSection');
  if (!bg || !section || !slides.length) return;

  bg.innerHTML = slides.map((s, i) => `
    <img class="sh-slide ${i === 0 ? 'on' : ''}" src="${esc(s.image_url)}" alt=""
         style="object-position:center ${Number(s.focus_y) || 50}%" ${i === 0 ? '' : 'loading="lazy"'} />
  `).join('');
  section.querySelector('.sh-hero__ctrl')?.remove();
  if (slides.length < 2) return;

  const imgs = Array.from(bg.querySelectorAll('.sh-slide'));
  let index = 0;
  let paused = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  let hovering = false;

  const ctrl = document.createElement('div');
  ctrl.className = 'sh-hero__ctrl';
  ctrl.innerHTML = `
    <button type="button" data-hero="prev" aria-label="Previous photo">&#8249;</button>
    <div class="sh-hero__dots">${slides.map((s, i) => `<button type="button" class="sh-dot ${i === 0 ? 'on' : ''}" data-hero="go" data-i="${i}" aria-label="Show photo ${i + 1}"></button>`).join('')}</div>
    <button type="button" data-hero="next" aria-label="Next photo">&#8250;</button>
    <button type="button" data-hero="pause"></button>
  `;
  section.appendChild(ctrl);
  const dots = Array.from(ctrl.querySelectorAll('.sh-dot'));
  const pauseBtn = ctrl.querySelector('[data-hero="pause"]');

  function paintPause() {
    pauseBtn.innerHTML = paused ? '&#9654;' : '&#10074;&#10074;';
    pauseBtn.setAttribute('aria-label', paused ? 'Play slideshow' : 'Pause slideshow');
  }
  function go(i) {
    index = (i + imgs.length) % imgs.length;
    imgs.forEach((el, k) => el.classList.toggle('on', k === index));
    dots.forEach((el, k) => el.classList.toggle('on', k === index));
  }

  ctrl.addEventListener('click', (e) => {
    const b = e.target.closest('[data-hero]');
    if (!b) return;
    if (b.dataset.hero === 'prev') go(index - 1);
    else if (b.dataset.hero === 'next') go(index + 1);
    else if (b.dataset.hero === 'go') go(Number(b.dataset.i));
    else if (b.dataset.hero === 'pause') { paused = !paused; paintPause(); }
  });
  section.addEventListener('mouseenter', () => { hovering = true; });
  section.addEventListener('mouseleave', () => { hovering = false; });
  ctrl.addEventListener('focusin', () => { hovering = true; });
  ctrl.addEventListener('focusout', () => { hovering = false; });

  paintPause();
  setInterval(() => {
    if (paused || hovering || document.hidden) return;
    go(index + 1);
  }, 6000);
}
