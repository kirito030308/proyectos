/* Control de tema accesible y resistente a preferencias locales dañadas. */
(() => {
  'use strict';
  const storage = {
    get(key) { try { return localStorage.getItem(key); } catch (_) { return null; } },
    set(key, value) { try { localStorage.setItem(key, value); } catch (_) { /* almacenamiento no disponible */ } }
  };

  const savedTheme = storage.get('theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme === 'dark' || (!savedTheme && prefersDark) ? 'dark' : 'light';
  document.documentElement.dataset.theme = initialTheme;
  document.body.classList.toggle('dark-mode', initialTheme === 'dark');

  function createThemeToggle() {
    if (document.querySelector('.theme-toggle')) return;
    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'theme-toggle';
    toggle.setAttribute('aria-label', initialTheme === 'dark' ? 'Activar tema claro' : 'Activar tema oscuro');
    toggle.setAttribute('title', 'Cambiar tema');
    toggle.setAttribute('aria-pressed', String(initialTheme === 'dark'));

    function render(isDark) {
      toggle.textContent = isDark ? '☀️' : '🌙';
      toggle.setAttribute('aria-label', isDark ? 'Activar tema claro' : 'Activar tema oscuro');
      toggle.setAttribute('aria-pressed', String(isDark));
      document.body.classList.toggle('dark-mode', isDark);
      document.documentElement.dataset.theme = isDark ? 'dark' : 'light';
    }

    render(initialTheme === 'dark');
    toggle.addEventListener('click', () => {
      const isDark = !document.body.classList.contains('dark-mode');
      render(isDark);
      storage.set('theme', isDark ? 'dark' : 'light');
    });
    document.body.appendChild(toggle);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', createThemeToggle, { once: true });
  else createThemeToggle();

  window.addEventListener('storage', event => {
    if (event.key === 'theme') {
      const isDark = event.newValue === 'dark';
      document.body.classList.toggle('dark-mode', isDark);
      document.documentElement.dataset.theme = isDark ? 'dark' : 'light';
      const toggle = document.querySelector('.theme-toggle');
      if (toggle) {
        toggle.textContent = isDark ? '☀️' : '🌙';
        toggle.setAttribute('aria-label', isDark ? 'Activar tema claro' : 'Activar tema oscuro');
        toggle.setAttribute('aria-pressed', String(isDark));
      }
    }
  });
})();
