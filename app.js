// Marca JS activo (antes del primer pintado) para que el reveal solo oculte si el script corre
document.documentElement.classList.add('js');

document.addEventListener('DOMContentLoaded', () => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Menú móvil
  const burger = document.getElementById('burgerBtn');
  const nav = document.getElementById('navLinks');
  const setMenu = open => {
    nav.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', String(open));
  };
  burger.addEventListener('click', () => setMenu(!nav.classList.contains('open')));
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });

  // Scroll reveal
  const revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && !reduce) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting) { en.target.classList.add('is-visible'); io.unobserve(en.target); }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  // Contadores
  const counts = document.querySelectorAll('.hero-stats .count');
  const finalText = el => el.dataset.target + (el.dataset.suffix || '');
  function animateCount(el) {
    const target = parseFloat(el.dataset.target), start = performance.now();
    (function tick(now) {
      const p = Math.min((now - start) / 1400, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))) + (el.dataset.suffix || '');
      if (p < 1) requestAnimationFrame(tick); else el.textContent = finalText(el);
    })(start);
  }
  const stats = document.querySelector('.hero-stats');
  if (stats) {
    if (reduce || !('IntersectionObserver' in window)) {
      counts.forEach(el => el.textContent = finalText(el));
    } else {
      const co = new IntersectionObserver(entries => {
        entries.forEach(en => {
          if (en.isIntersecting) { counts.forEach(animateCount); co.unobserve(en.target); }
        });
      }, { threshold: 0.4 });
      co.observe(stats);
    }
  }

  // Formulario (Formspree vía fetch)
  const form = document.getElementById('contactForm');
  const btn = document.getElementById('submitBtn');
  const label = btn.querySelector('.btn-label');
  const okMsg = document.getElementById('successMsg');
  const errMsg = document.getElementById('errorMsg');
  const errText = errMsg.querySelector('span');
  const FALLBACK = 'No se pudo enviar el mensaje. Inténtalo de nuevo o escribe a contacto@cyber-ad.dev.';
  let busy = false;

  form.addEventListener('submit', async e => {
    e.preventDefault();
    if (busy) return;
    busy = true;
    okMsg.classList.remove('show'); errMsg.classList.remove('show');
    btn.disabled = true; btn.classList.add('loading'); label.textContent = '> Enviando...';
    try {
      const data = new FormData(form);
      // Honeypot: si un bot lo rellena, fingimos éxito y no enviamos nada.
      if (data.get('_gotcha')) { form.reset(); okMsg.classList.add('show'); return; }
      // No enviamos el campo a Formspree: lo trataba como spam y descartaba el mensaje.
      data.delete('_gotcha');
      const res = await fetch(form.action, {
        method: 'POST', body: data, headers: { Accept: 'application/json' }
      });
      if (res.ok) {
        form.reset(); okMsg.classList.add('show');
      } else {
        let detail = '';
        try { detail = JSON.stringify(await res.json()); } catch (_) { detail = 'respuesta no JSON'; }
        console.error('Formspree', res.status, detail); // solo para depuración
        errText.textContent = FALLBACK; errMsg.classList.add('show');
      }
    } catch (err) {
      console.error('Fallo de red', err);
      errText.textContent = FALLBACK; errMsg.classList.add('show');
    } finally {
      btn.disabled = false; btn.classList.remove('loading');
      label.textContent = '> Enviar_Solicitud()'; busy = false;
    }
  });
});