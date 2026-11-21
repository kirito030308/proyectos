/* Mejoras transversales de accesibilidad y experiencia de uso CUPET. */
(() => {
  'use strict';
  const ready = callback => document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', callback, { once: true })
    : callback();

  ready(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Carga diferida de imágenes no prioritarias para mejorar el tiempo inicial.
    document.querySelectorAll('img').forEach((img, index) => {
      if (img.closest('.hero, .hero-image') || img.hasAttribute('fetchpriority')) { img.loading = 'eager'; }
      else if (index > 0 && !img.hasAttribute('loading')) img.loading = 'lazy';
      if (!img.hasAttribute('decoding')) img.decoding = 'async';
      if (!img.hasAttribute('alt')) img.alt = '';
    });

    // Los enlaces externos abiertos en otra pestaña no deben heredar acceso a window.opener.
    document.querySelectorAll('a[target="_blank"]').forEach(link => {
      const rel = new Set((link.getAttribute('rel') || '').split(/\s+/).filter(Boolean));
      rel.add('noopener');
      rel.add('noreferrer');
      link.setAttribute('rel', [...rel].join(' '));
    });

    // Añade una región accesible para avisos no intrusivos si la página no tiene una.
    if (!document.getElementById('site-live-region')) {
      const live = document.createElement('div');
      live.id = 'site-live-region';
      live.className = 'visually-hidden';
      live.setAttribute('aria-live', 'polite');
      live.setAttribute('aria-atomic', 'true');
      document.body.appendChild(live);
    }

    // Mantiene el año del pie de página actualizado sin modificar el contenido restante.
    document.querySelectorAll('footer p').forEach(paragraph => {
      if (/©|&copy;|derechos reservados/i.test(paragraph.textContent)) {
        paragraph.innerHTML = paragraph.innerHTML.replace(/(©|&copy;)\s*20\d{2}/i, `$1 ${new Date().getFullYear()}`);
      }
    });

    if (reducedMotion) document.documentElement.classList.add('reduce-motion');
  });
})();
