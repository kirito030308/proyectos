// Theme Toggle Functionality
(function() {
  // Check for saved theme preference or default to light mode
  const savedTheme = localStorage.getItem('theme') || 'light';
  
  // Check for saved position or default to top-right
  const savedPosition = JSON.parse(localStorage.getItem('themeTogglePosition') || '{"right": "1rem", "top": "1rem"}');
  
  // Apply saved theme on page load
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
  }
  
  // Create theme toggle button
  function createThemeToggle() {
    const toggle = document.createElement('button');
    toggle.className = 'theme-toggle';
    toggle.innerHTML = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
    toggle.setAttribute('aria-label', 'Toggle dark mode');
    toggle.setAttribute('title', 'Cambiar tema - Arrastra para mover');
    
    // Apply saved position
    toggle.style.right = savedPosition.right || '1rem';
    toggle.style.top = savedPosition.top || '1rem';
    toggle.style.left = 'auto';
    toggle.style.bottom = 'auto';
    
    // Make button draggable
    let isDragging = false;
    let startX, startY, initialRight, initialTop;
    
    toggle.addEventListener('mousedown', startDrag);
    toggle.addEventListener('touchstart', startDrag, { passive: true });
    
    function startDrag(e) {
      // Don't drag if clicking to toggle theme
      if (e.type === 'mousedown' && e.button !== 0) return;
      
      isDragging = false;
      startX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
      startY = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY;
      
      const rect = toggle.getBoundingClientRect();
      initialRight = window.innerWidth - rect.right;
      initialTop = rect.top;
      
      document.addEventListener('mousemove', drag);
      document.addEventListener('mouseup', endDrag);
      document.addEventListener('touchmove', drag, { passive: true });
      document.addEventListener('touchend', endDrag);
      
      // Prevent default touch behavior
      if (e.type === 'touchstart') {
        // e.preventDefault();
      }
    }
    
    function drag(e) {
      if (!startX || !startY) return;
      
      isDragging = true;
      
      const currentX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
      const currentY = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;
      
      const deltaX = currentX - startX;
      const deltaY = currentY - startY;
      
      const newRight = Math.max(10, Math.min(window.innerWidth - 70, initialRight - deltaX));
      const newTop = Math.max(10, Math.min(window.innerHeight - 70, initialTop + deltaY));
      
      toggle.style.right = newRight + 'px';
      toggle.style.top = newTop + 'px';
      toggle.style.left = 'auto';
      toggle.style.bottom = 'auto';
    }
    
    function endDrag() {
      if (!isDragging) {
        // It was a click, toggle theme
        toggleTheme();
      } else {
        // Save position after drag
        const position = {
          right: toggle.style.right,
          top: toggle.style.top
        };
        localStorage.setItem('themeTogglePosition', JSON.stringify(position));
      }
      
      startX = null;
      startY = null;
      isDragging = false;
      
      document.removeEventListener('mousemove', drag);
      document.removeEventListener('mouseup', endDrag);
      document.removeEventListener('touchmove', drag);
      document.removeEventListener('touchend', endDrag);
    }
    
    function toggleTheme() {
      document.body.classList.toggle('dark-mode');
      const isDark = document.body.classList.contains('dark-mode');
      
      // Save preference to localStorage
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      
      // Update icon
      toggle.innerHTML = isDark ? '☀️' : '🌙';
      
      // Add transition effect
      document.body.style.transition = 'background 0.3s ease, color 0.3s ease';
      
      // Add bounce animation
      toggle.style.animation = 'none';
      toggle.offsetHeight; // Trigger reflow
      toggle.style.animation = 'bounce 0.5s ease';
    }
    
    document.body.appendChild(toggle);
  }
  
  // Initialize theme toggle when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createThemeToggle);
  } else {
    createThemeToggle();
  }
  
  // Listen for theme changes from other tabs
  window.addEventListener('storage', function(e) {
    if (e.key === 'theme') {
      if (e.newValue === 'dark') {
        document.body.classList.add('dark-mode');
      } else {
        document.body.classList.remove('dark-mode');
      }
      
      // Update toggle button icon
      const toggle = document.querySelector('.theme-toggle');
      if (toggle) {
        toggle.innerHTML = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
      }
    }
  });
})();
