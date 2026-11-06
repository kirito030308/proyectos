// JavaScript para Cupet Comercialización Las Tunas

document.addEventListener('DOMContentLoaded', () => {
  
  // ----- Menú hamburguesa -----
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.querySelector('nav');
  
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
      hamburger.setAttribute('aria-expanded', !isExpanded);
      navMenu.classList.toggle('active');
      
      // Prevenir scroll del body cuando el menú está abierto
      if (!isExpanded) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });
    
    // Cerrar menú al hacer clic fuera (mejorado para móvil)
    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
    
    // Cerrar menú al hacer scroll (mejora para móvil)
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop > lastScrollTop && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    }, { passive: true });
    
    // Soporte para gestos táctiles
    let touchStartX = 0;
    let touchEndX = 0;
    
    document.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    document.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
      const swipeThreshold = 50;
      const diff = touchStartX - touchEndX;
      
      // Swipe desde la izquierda abre el menú
      if (touchStartX < 50 && diff < -swipeThreshold) {
        navMenu.classList.add('active');
        hamburger.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
      }
      // Swipe hacia la derecha cierra el menú
      else if (navMenu.classList.contains('active') && diff > swipeThreshold) {
        navMenu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    }
  }
  
  // ----- Búsqueda -----
  const searchInput = document.getElementById('searchInput');
  const searchBtn = document.getElementById('searchBtn');
  const searchAlert = document.getElementById('searchAlert');
  
  if (searchInput && searchBtn) {
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') performSearch();
    });
  }
  
  function performSearch() {
    const query = searchInput.value.trim().toLowerCase();
    if (!query) return;
    
    // Mostrar alerta de búsqueda
    if (searchAlert) {
      searchAlert.textContent = `Buscando: "${query}"...`;
      searchAlert.classList.add('show');
      setTimeout(() => {
        searchAlert.classList.remove('show');
      }, 3000);
    }
    
    // Simular búsqueda
    const searchResults = {
      'glp': 'Sección de GLP encontrada',
      'precios': 'Precios actualizados',
      'estaciones': 'Estaciones de servicio disponibles',
      'contacto': 'Información de contacto',
      'servicios': 'Nuestros servicios'
    };
    
    for (const [key, result] of Object.entries(searchResults)) {
      if (query.includes(key)) {
        showToast(result, 'success');
        return;
      }
    }
    
    showToast('No se encontraron resultados. Intenta con "GLP", "precios" o "estaciones"', 'error');
  }
  
  // ----- Pestañas de área de cliente -----
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');
  
  tabBtns.forEach(btn => {
    // Soporte para touch events
    btn.addEventListener('touchstart', (e) => {
      e.preventDefault();
      handleTabClick(btn);
    }, { passive: false });
    
    btn.addEventListener('click', () => {
      handleTabClick(btn);
    });
  });
  
  function handleTabClick(btn) {
    const targetTab = btn.getAttribute('data-tab');
    
    // Remover clase activa de todos
    tabBtns.forEach(b => b.classList.remove('active'));
    tabPanes.forEach(p => p.classList.remove('active'));
    
    // Agregar clase activa al seleccionado
    btn.classList.add('active');
    const targetPane = document.getElementById(`${targetTab}-tab`);
    if (targetPane) {
      targetPane.classList.add('active');
    }
    
    // Feedback táctil
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }
  }
  
  // ----- Modal de servicios -----
  function showServiceModal(serviceType) {
    const modal = document.getElementById('serviceModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    const modalAction = document.getElementById('modalAction');
    
    const serviceData = {
      'glp': {
        title: 'GLP (Gas Licuado)',
        content: `
          <div style="margin-bottom: 1rem;">
            <img src="images/servicio-glp.jpg" alt="GLP" style="width: 100%; border-radius: 8px; margin-bottom: 1rem;">
          </div>
          <h4>Tipos de cilindros disponibles:</h4>
          <ul style="margin: 1rem 0; padding-left: 1.5rem;">
            <li>Cilindro 10kg - $15.50 CUP</li>
            <li>Cilindro 20kg - $28.00 CUP</li>
            <li>Cilindro 45kg - $63.00 CUP</li>
          </ul>
          <h4>Servicios:</h4>
          <ul style="margin: 1rem 0; padding-left: 1.5rem;">
            <li>Recarga a domicilio</li>
            <li>Intercambio de cilindros vacíos</li>
            <li>Instalación y mantenimiento</li>
          </ul>
        `,
        action: 'Solicitar GLP'
      },
      'combustibles': {
        title: 'Combustibles Líquidos',
        content: `
          <div style="margin-bottom: 1rem;">
            <img src="images/combustibles-liquidos.jpg" alt="Combustibles" style="width: 100%; border-radius: 8px; margin-bottom: 1rem;">
          </div>
          <h4>Precios actualizados hoy:</h4>
          <ul style="margin: 1rem 0; padding-left: 1.5rem;">
            <li>Gasolina Regular - $1.20/L</li>
            <li>Gasolina Especial - $1.45/L</li>
            <li>Diésel - $0.95/L</li>
            <li>Keroseno - $0.85/L</li>
          </ul>
          <h4>Servicios:</h4>
          <ul style="margin: 1rem 0; padding-left: 1.5rem;">
            <li>Venta a estaciones de servicio</li>
            <li>Venta a flotas empresariales</li>
            <li>Entrega a domicilio</li>
          </ul>
        `,
        action: 'Ver estaciones'
      },
      'autoservicio': {
        title: 'Autoservicio 24h',
        content: `
          <div style="margin-bottom: 1rem;">
            <img src="images/distribucion-camiones.jpg" alt="Autoservicio" style="width: 100%; border-radius: 8px; margin-bottom: 1rem;">
          </div>
          <h4>Estaciones disponibles:</h4>
          <ul style="margin: 1rem 0; padding-left: 1.5rem;">
            <li>Estación Central - 24h</li>
            <li>Estación Norte - 24h</li>
            <li>Estación Sur - 24h</li>
            <li>Estación Este - 24h</li>
          </ul>
          <h4>Métodos de pago:</h4>
          <ul style="margin: 1rem 0; padding-left: 1.5rem;">
            <li>Tarjeta de crédito/débito</li>
            <li>Código QR</li>
            <li>Efectivo (en horario comercial)</li>
          </ul>
        `,
        action: 'Buscar estación'
      },
      'lubricantes': {
        title: 'Lubricantes',
        content: `
          <div style="margin-bottom: 1rem;">
            <img src="images/Lubricantes.jpg" alt="Lubricantes" style="width: 100%; border-radius: 8px; margin-bottom: 1rem;">
          </div>
          <h4>Tipos de lubricantes:</h4>
          <ul style="margin: 1rem 0; padding-left: 1.5rem;">
            <li>Aceite para motor 10W-40 - $8.50/L</li>
            <li>Aceite para motor 15W-40 - $7.80/L</li>
            <li>Aceite de transmisión - $12.00/L</li>
            <li>Grasa industrial - $15.00/kg</li>
          </ul>
          <h4>Marcas disponibles:</h4>
          <ul style="margin: 1rem 0; padding-left: 1.5rem;">
            <li>Cupet Lubricantes</li>
            <li>Repsol</li>
            <li>Shell</li>
            <li>Mobil</li>
          </ul>
        `,
        action: 'Ver productos'
      }
    };
    
    const service = serviceData[serviceType];
    if (service) {
      modalTitle.textContent = service.title;
      modalBody.innerHTML = service.content;
      modalAction.textContent = service.action;
      modal.classList.add('show');
    }
  }
  
  function closeServiceModal() {
    const modal = document.getElementById('serviceModal');
    if (modal) {
      modal.classList.remove('show');
    }
  }
  
  // Cerrar modal con ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeServiceModal();
    }
  });
  
  // ----- Cerrar modal haciendo clic fuera -----
  document.addEventListener('click', (e) => {
    const modal = document.getElementById('serviceModal');
    if (modal && modal.classList.contains('show') && !modal.querySelector('.modal-content').contains(e.target)) {
      closeServiceModal();
    }
  });
  
  // Soporte para cerrar modal con gesture swipe down
  let touchStartY = 0;
  let touchEndY = 0;
  
  document.addEventListener('touchstart', (e) => {
    const modal = document.getElementById('serviceModal');
    if (modal && modal.classList.contains('show')) {
      touchStartY = e.changedTouches[0].screenY;
    }
  }, { passive: true });
  
  document.addEventListener('touchend', (e) => {
    const modal = document.getElementById('serviceModal');
    if (modal && modal.classList.contains('show')) {
      touchEndY = e.changedTouches[0].screenY;
      const swipeThreshold = 100;
      const diff = touchEndY - touchStartY;
      
      // Swipe hacia abajo cierra el modal
      if (diff > swipeThreshold) {
        closeServiceModal();
      }
    }
  }, { passive: true });
  
  // ----- Pasos de pago interactivos -----
  function showPaymentStep(stepNumber) {
    const stepMessages = {
      1: 'Paso 1: Selecciona tu método de pago preferido',
      2: 'Paso 2: Ingresa tus datos de facturación',
      3: 'Paso 3: Verifica el monto a pagar',
      4: 'Paso 4: Confirma el pago y guarda tu comprobante'
    };
    
    showToast(stepMessages[stepNumber], 'success');
    
    // Resaltar paso actual
    const steps = document.querySelectorAll('.step');
    steps.forEach((step, index) => {
      if (index === stepNumber - 1) {
        step.style.borderColor = 'var(--primary-red)';
        step.style.background = 'var(--primary-green)';
        step.style.color = 'white';
      } else {
        step.style.borderColor = 'transparent';
        step.style.background = 'white';
        step.style.color = 'var(--primary-green)';
      }
    });
  }
  
  // ----- Toast notifications -----
  function showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    if (toast) {
      toast.textContent = message;
      toast.className = `toast ${type}`;
      toast.classList.add('show');
      
      setTimeout(() => {
        toast.classList.remove('show');
      }, 3000);
    }
  }
  
  // ----- Navegación por teclado -----
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      document.body.classList.add('keyboard-nav');
    }
  });
  
  document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
  });
  
  // ----- Agregar estilos para navegación por teclado -----
  const style = document.createElement('style');
  style.textContent = `
    .keyboard-nav *:focus {
      outline: 2px solid var(--primary-green);
      outline-offset: 2px;
    }
  `;
  document.head.appendChild(style);
  
  // ----- Función global para servicios -----
  window.showServiceModal = showServiceModal;
  window.closeServiceModal = closeServiceModal;
  window.showPaymentStep = showPaymentStep;
  window.showToast = showToast;
  
  // ----- Optimizaciones para dispositivos móviles -----
  
  // Detectar dispositivo móvil
  function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
           (window.innerWidth <= 800 && 'ontouchstart' in window);
  }
  
  // Optimizar animaciones para móviles
  if (isMobile()) {
    // Reducir animaciones para mejor rendimiento
    const style = document.createElement('style');
    style.textContent = `
      @media (max-width: 800px) {
        .particles {
          display: none;
        }
        
        .service-card, .gallery-item {
          animation: none !important;
          opacity: 1 !important;
        }
        
        .animate-float, .animate-pulse {
          animation: none !important;
        }
      }
    `;
    document.head.appendChild(style);
  }
  
  // Mejorar el rendimiento del scroll
  let ticking = false;
  function updateOnScroll() {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        // Lógica de scroll aquí si es necesaria
        ticking = false;
      });
      ticking = true;
    }
  }
  
  window.addEventListener('scroll', updateOnScroll, { passive: true });
  
  // Prevenir zoom en inputs en iOS
  const inputs = document.querySelectorAll('input, select, textarea');
  inputs.forEach(input => {
    input.addEventListener('touchstart', () => {
      input.style.fontSize = '16px';
    });
  });
  
  // Optimizar imágenes para móviles
  function optimizeImages() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      // Añadir loading="lazy" a todas las imágenes
      if (!img.hasAttribute('loading')) {
        img.setAttribute('loading', 'lazy');
      }
      
      // Optimizar para móviles
      if (window.innerWidth <= 800) {
        img.style.maxWidth = '100%';
        img.style.height = 'auto';
      }
    });
  }
  
  optimizeImages();
  
  // Ajustar viewport para mejor visualización en móviles
  function adjustViewport() {
    if (isMobile()) {
      const viewport = document.querySelector('meta[name="viewport"]');
      if (viewport) {
        viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
      }
    }
  }
  
  adjustViewport();
  
  // ----- Animaciones de entrada -----
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (!isMobile()) {
          entry.target.style.animation = 'slideUp 0.6s ease forwards';
        } else {
          entry.target.style.opacity = '1';
        }
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observar elementos para animación
  document.querySelectorAll('.service-card, .gallery-item').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
  });
  
});
