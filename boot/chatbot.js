
class Chatbot {
  constructor() {
    try {
      console.log('Chatbot: Constructor starting...');
      
      this.isOpen = false;
      this.isTyping = false;
      this.lastTopic = null;
      this.fallbackMode = false;
      this.capabilities = this.detectCapabilities();
      
      // Inicialización con fallback robusto
      this.initializeWithFallback();
      
      console.log('Chatbot: Constructor completed successfully!');
    } catch (error) {
      console.error('Chatbot: Constructor failed:', error);
      this.initializeEmergencyMode();
    }
  }
  
  // Detectar capacidades del sistema
  detectCapabilities() {
    return {
      hasLocalStorage: this.testLocalStorage(),
      hasSessionStorage: this.testSessionStorage(),
      hasNetwork: navigator.onLine,
      isMobile: this.isMobileDevice(),
      supportsIntersection: 'IntersectionObserver' in window,
      supportsServiceWorker: 'serviceWorker' in navigator
    };
  }
  
  // Probar localStorage
  testLocalStorage() {
    try {
      const test = '__test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }
  
  // Probar sessionStorage
  testSessionStorage() {
    try {
      const test = '__test__';
      sessionStorage.setItem(test, test);
      sessionStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }
  
  // Detectar dispositivo móvil
  isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
           (window.innerWidth <= 800 && 'ontouchstart' in window);
  }
  
  // Inicialización con fallback
  initializeWithFallback() {
    try {
      // Intentar inicialización completa
      this.knowledgeBase = window.knowledgeBase || this.getDefaultKnowledgeBase();
      this.troubleshootingSystem = window.troubleshootingSystem || this.getDefaultTroubleshootingSystem();
      this.diagnosticSystem = window.diagnosticSystem || {};
      
      // Inicializar sistemas de aprendizaje y conocimiento externo
      this.learningSystem = window.LearningSystem ? new LearningSystem() : this.createMockLearningSystem();
      this.externalKnowledge = window.ExternalKnowledgeSystem ? new ExternalKnowledgeSystem() : this.createMockExternalKnowledge();
      
      // Respuestas dinámicas basadas en knowledge base
      this.responses = this.generateDynamicResponses();
      
      // Configurar sistema de aprendizaje
      this.setupLearningSystem();
      
      console.log('Chatbot: Full initialization successful');
      this.init();
      
    } catch (error) {
      console.warn('Chatbot: Full initialization failed, using fallback mode:', error);
      this.fallbackMode = true;
      this.initializeFallbackMode();
    }
  }
  
  // Modo fallback básico
  initializeFallbackMode() {
    this.knowledgeBase = this.getDefaultKnowledgeBase();
    this.troubleshootingSystem = this.getDefaultTroubleshootingSystem();
    this.learningSystem = this.createMockLearningSystem();
    this.externalKnowledge = this.createMockExternalKnowledge();
    this.responses = this.getFallbackResponses();
    this.init();
    console.log('Chatbot: Fallback mode initialized');
  }
  
  // Modo de emergencia
  initializeEmergencyMode() {
    this.fallbackMode = true;
    this.responses = this.getEmergencyResponses();
    this.knowledgeBase = this.getMinimalKnowledgeBase();
    
    // Intentar inicializar UI básica
    try {
      this.init();
    } catch (e) {
      console.error('Chatbot: Emergency mode failed:', e);
      // Mostrar mensaje simple al usuario
      this.showEmergencyMessage();
    }
  }
  
  // Base de conocimiento por defecto
  getDefaultKnowledgeBase() {
    return {
      productos: {
        combustibles: {
          gasolina_regular: {
            nombre: "Gasolina Regular",
            precio: "$145.00 CUP por litro",
            disponibilidad: "Siempre disponible"
          }
        },
        glp: {
          cilindro_10kg: {
            nombre: "Cilindro 10kg",
            precio: "$15.50 CUP",
            entrega: "A domicilio"
          }
        }
      },
      horarios: {
        estacion_principal: "24 horas",
        oficinas: "Lunes a Viernes 8:00 AM - 6:00 PM"
      },
      contacto: {
        telefono: "+53 123 456 789",
        direccion: "Las Tunas, Cuba"
      }
    };
  }
  
  // Sistema de troubleshooting por defecto
  getDefaultTroubleshootingSystem() {
    return {
      problemas_comunes: {
        no_llega_gas: {
          solucion: "Verifique la válvula y contacte soporte técnico",
          urgencia: "media"
        }
      }
    };
  }
  
  // Mock de LearningSystem para fallback
  createMockLearningSystem() {
    return {
      recordConversation: (userMessage, botResponse, category) => {},
      getLearnedResponse: (message, category) => null,
      recordFeedback: (userMessage, botResponse, feedback, category) => {},
      getLearningStats: () => ({ totalConversations: 0, learnedResponses: 0 }),
      detectEmergency: (message) => ({ detected: false, type: null }),
      getEmergencyResponse: (type) => null
    };
  }
  
  // Mock de ExternalKnowledgeSystem para fallback
  createMockExternalKnowledge() {
    return {
      getWeatherInfo: () => ({ temperature: 25, condition: 'Soleado', location: 'Las Tunas' }),
      getNews: () => [],
      getRegulations: () => [],
      getEmergencyServices: () => ({ firefighters: '105', ambulance: '104', police: '106' })
    };
  }
  
  // Respuestas de fallback
  getFallbackResponses() {
    return {
      productos: "Ofrecemos combustibles, GLP y lubricantes. ¿Qué le interesa?",
      horarios: "Nuestra estación principal está abierta 24 horas.",
      contacto: "Contáctenos al +53 123 456 789",
      default: "Soy un asistente de CUPET Las Tunas. ¿En qué puedo ayudarle?"
    };
  }
  
  // Respuestas de emergencia
  getEmergencyResponses() {
    return {
      default: "Sistema en modo de emergencia. Por favor contacte directamente a CUPET Las Tunas al teléfono principal.",
      contacto: "Llame al +53 123 456 789 para asistencia inmediata.",
      emergencia: "Para emergencias, llame al servicio técnico de CUPET."
    };
  }
  
  // Mostrar mensaje de emergencia
  showEmergencyMessage() {
    const message = document.createElement('div');
    message.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #ff6b6b;
      color: white;
      padding: 15px;
      border-radius: 8px;
      z-index: 9999;
      max-width: 300px;
    `;
    message.innerHTML = `
      <strong>Sistema en modo de emergencia</strong><br>
      Contacte directamente a CUPET Las Tunas
    `;
    document.body.appendChild(message);
    
    setTimeout(() => {
      if (message.parentNode) {
        message.parentNode.removeChild(message);
      }
    }, 10000);
  }
  
  // Generar respuestas dinámicas desde la base de conocimientos
  generateDynamicResponses() {
    const kb = this.knowledgeBase;
    
    return {
      // Productos - Basado en knowledge base
      productos: this.formatProductosResponse(kb.productos),
      
      // Horarios - Basado en knowledge base
      horarios: this.formatHorariosResponse(kb.horarios),
      
      // Comprar - Basado en knowledge base
      comprar: this.formatComprarResponse(kb.procesos),
      
      // Ubicación - Basado en knowledge base
      ubicacion: this.formatUbicacionResponse(kb.contacto),
      
      // Precios - Basado en knowledge base
      precios: this.formatPreciosResponse(kb.precios),
      
      // GLP - Basado en knowledge base
      glp: this.formatGLPResponse(kb.productos.glp),
      
      // Contacto - Basado en knowledge base
      contacto: this.formatContactoResponse(kb.contacto),
      
      // Servicios - Basado en knowledge base
      servicios: this.formatServiciosResponse(kb.servicios),
      
      // Transferencias - Basado en knowledge base
      transferencias: this.formatTransferenciasResponse(kb.procesos.transferencias),
      
      // Dudas frecuentes - Basado en knowledge base
      dudas: this.formatDudasResponse(kb.dudas_frecuentes),
      
      // Problemas comunes - Basado en troubleshooting system
      problemas: this.formatProblemasResponse(this.troubleshootingSystem),
      
      // Pagos y facturas
      pagos: this.formatPagosResponse(kb.procesos.pagos_facturas),
      
      // Saldo y recargas
      saldo: this.formatSaldoResponse(kb.procesos.recargas_saldo),
      
      // Seguridad de cuenta
      seguridad: this.formatSeguridadResponse(kb.seguridad_cuenta),
      
      // Información financiera
      finanzas: this.formatFinanzasResponse(kb.informacion_financiera),
      
      // Soporte técnico
      soporte: this.formatSoporteResponse(kb.soporte_tecnico),
      
      // Información corporativa
      empresa: this.formatEmpresaResponse(kb.informacion_corporativa),
      
      // Preguntas técnicas
      tecnico: this.formatTecnicoResponse(kb.preguntas_tecnicas),
      
      // Preguntas complejas
      complejo: this.formatComplejoResponse(kb.preguntas_complejas),
      
      // Default response mejorado
      default: this.formatDefaultResponse()
    };
  }
  
  // Formateadores de respuesta para cada categoría
  formatProductosResponse(productos) {
    if (!productos) return ["Información de productos no disponible temporalmente"];
    
    const response = ["🏭 **Nuestros Productos y Servicios:", ""];
    
    // Combustibles
    if (productos.combustibles) {
      response.push("⛽ **Combustibles:");
      Object.entries(productos.combustibles).forEach(([key, product]) => {
        response.push(`• ${product.nombre} - ${product.usos}`);
        response.push(`  Especificaciones: ${product.especificaciones}`);
        response.push(`  Beneficios: ${product.beneficios}`);
      });
      response.push("");
    }
    
    // GLP
    if (productos.glp) {
      response.push("🔥 **GLP (Gas Licuado de Petróleo):");
      Object.entries(productos.glp).forEach(([key, product]) => {
        response.push(`• ${product.nombre} - ${product.uso}`);
        response.push(`  Capacidad: ${key}, Precio: ${product.precio}`);
        response.push(`  Entrega: ${product.entrega}`);
      });
      response.push("");
    }
    
    // Lubricantes
    if (productos.lubricantes) {
      response.push("🛢️ **Lubricantes:");
      Object.entries(productos.lubricantes).forEach(([key, product]) => {
        response.push(`• ${product.nombre} - ${product.uso}`);
        response.push(`  Especificaciones: ${product.especificaciones}`);
        response.push(`  Presentación: ${product.presentacion}`);
        response.push(`  Precio: ${product.precio}`);
      });
    }
    
    return response;
  }
  
  formatHorariosResponse(horarios) {
    if (!horarios) return ["Información de horarios no disponible temporalmente"];
    
    const response = ["🕐 **Horarios de Atención:", ""];
    
    Object.entries(horarios).forEach(([key, horario]) => {
      if (typeof horario === 'object' && horario.lunes_viernes) {
        response.push(`📅 **${this.formatKeyName(key)}:**`);
        response.push(`• Lunes a Viernes: ${horario.lunes_viernes}`);
        if (horario.sabados) response.push(`• Sábados: ${horario.sabados}`);
        if (horario.domingos) response.push(`• Domingos: ${horario.domingos}`);
        if (horario.servicios) {
          response.push(`• Servicios: ${horario.servicios.join(', ')}`);
        }
        response.push("");
      }
    });
    
    return response;
  }
  
  formatComprarResponse(procesos) {
    if (!procesos) return ["Información de compra no disponible temporalmente"];
    
    const response = ["🛒 **Cómo Comprar Nuestros Productos:", ""];
    
    Object.entries(procesos).forEach(([key, proceso]) => {
      if (typeof proceso === 'object' && proceso.pasos) {
        response.push(`💻 **${this.formatKeyName(key)}:**`);
        proceso.pasos.forEach(paso => {
          response.push(paso);
        });
        response.push("");
      }
    });
    
    return response;
  }
  
  formatUbicacionResponse(contacto) {
    if (!contacto || !contacto.principal) return ["Información de ubicación no disponible temporalmente"];
    
    const principal = contacto.principal;
    const response = [
      "📍 **Nuestra Ubicación:**",
      "",
      "🏭 **Estación Principal:",
      `• ${principal.direccion}`,
      `• Teléfono: ${principal.telefono}`,
      `• WhatsApp: ${principal.whatsapp}`,
      `• Email: ${principal.email}`,
      "",
      "🗺️ **Cómo Llegar:**",
      "• Desde el centro: 10 minutos en auto",
      "• Ruta de ómnibus: Línea 3, parada 'CUPET'",
      "• Estacionamiento gratuito disponible",
      "",
      "🏢 **Oficina Central:**",
      "• Mismo edificio, 2do piso",
      `• Horario: ${principal.horario}`
    ];
    
    return response;
  }
  
  formatPreciosResponse(precios) {
    if (!precios) return ["Información de precios no disponible temporalmente"];
    
    const response = ["💰 **Información de Precios:", ""];
    
    // Combustibles
    if (precios.combustibles) {
      response.push("⛽ **Combustibles (precios por litro):**");
      Object.entries(precios.combustibles).forEach(([key, precio]) => {
        response.push(`• ${this.formatKeyName(key)}: ${precio}`);
      });
      response.push("");
    }
    
    // GLP
    if (precios.glp) {
      response.push("🔥 **GLP (precios por cilindro):**");
      Object.entries(precios.glp).forEach(([key, precio]) => {
        response.push(`• ${this.formatKeyName(key)}: ${precio}`);
      });
      response.push("");
    }
    
    // Descuentos
    if (precios.descuentos) {
      response.push("💎 **Beneficios y Descuentos:**");
      Object.entries(precios.descuentos).forEach(([key, descuento]) => {
        response.push(`• ${this.formatKeyName(key)}: ${descuento}`);
      });
      response.push("");
    }
    
    response.push('Los valores mostrados proceden de la información local del prototipo; pueden no coincidir con precios vigentes y no se actualizan en tiempo real.');
    return response;
  }
  
  formatGLPResponse(glp) {
    if (!glp) return ["Información de GLP no disponible temporalmente"];
    
    const response = ["🔥 **Servicio de GLP Detallado:", ""];
    
    response.push("📦 **Tipos de Cilindros Disponibles:");
    Object.entries(glp).forEach(([key, cilindro]) => {
      response.push(`• **${cilindro.nombre}**: ${cilindro.uso}`);
      response.push(`  Dimensiones: ${cilindro.dimensiones}`);
      response.push(`  Presión: ${cilindro.presion_trabajo}`);
      response.push(`  Certificación: ${cilindro.certificacion}`);
      response.push(`  Entrega: ${cilindro.entrega}`);
    });
    
    response.push("", "✅ **Características de Calidad:**");
    response.push("• Certificado por el Ministerio de Energía");
    response.push("• Peso garantizado ± 2%");
    response.push("• Válvulas de seguridad internacionales");
    response.push("• Pruebas de presión trimestrales");
    
    return response;
  }
  
  formatContactoResponse(contacto) {
    if (!contacto) return ["Información de contacto no disponible temporalmente"];
    
    const response = ["📞 **Información de Contacto Completa:", ""];
    
    if (contacto.principal) {
      response.push("🏢 **Contacto General:");
      response.push(`• Teléfono: ${contacto.principal.telefono}`);
      response.push(`• WhatsApp: ${contacto.principal.whatsapp}`);
      response.push(`• Email: ${contacto.principal.email}`);
      response.push(`• Web: ${contacto.principal.email?.replace('info@', 'www.') || 'www.cupetlasunas.cu'}`);
      response.push("");
    }
    
    if (contacto.departamentos) {
      response.push("📧 **Departamentos Específicos:");
      Object.entries(contacto.departamentos).forEach(([key, depto]) => {
        response.push(`• ${this.formatKeyName(key)}: ${depto.telefono}`);
        response.push(`  Email: ${depto.email}`);
        response.push(`  Horario: ${depto.horario}`);
      });
      response.push("");
    }
    
    return response;
  }
  
  formatServiciosResponse(servicios) {
    if (!servicios) return ["Información de servicios no disponible temporalmente"];
    
    const response = ["🛠️ **Nuestros Servicios Completo:", ""];
    
    Object.entries(servicios).forEach(([key, servicio]) => {
      if (typeof servicio === 'object' && servicio.descripcion) {
        response.push(`**${this.formatKeyName(key)}:**`);
        response.push(servicio.descripcion);
        
        if (servicio.servicios && Array.isArray(servicio.servicios)) {
          servicio.servicios.forEach(s => response.push(`• ${s}`));
        }
        
        if (servicio.cobertura) response.push(`• Cobertura: ${servicio.cobertura}`);
        if (servicio.flota) response.push(`• Flota: ${servicio.flota}`);
        if (servicio.garantia) response.push(`• Garantía: ${servicio.garantia}`);
        
        response.push("");
      }
    });
    
    return response;
  }
  
  formatProblemasResponse(troubleshooting) {
    if (!troubleshooting || !troubleshooting.glp) {
      return ["Sistema de ayuda técnica no disponible temporalmente"];
    }
    
    const response = [
      "🔧 **Ayuda con Problemas Comunes:**",
      "",
      "Puedo ayudarte con problemas como:",
      "",
      "🔥 **GLP:**",
      "• Fugas de gas (EMERGENCIA)",
      "• Llama baja o amarilla",
      "• Dificultad para encender",
      "• Olor a gas constante",
      "",
      "⛽ **Combustibles:**",
      "• Vehículo no arranca después de cargar",
      "• Consumo excesivo de combustible",
      "• Contaminación de combustible",
      "",
      "🛢️ **Lubricantes:**",
      "• Consumo excesivo de aceite",
      "• Aceite se oscurece rápido",
      "• Baja presión de aceite",
      "",
      "💡 **Describe tu problema y te daré la solución paso a paso",
      "🚨 **Para emergencias llama al 105 o (53) 31-xxxxxx**"
    ];
    
    return response;
  }
  
  formatDefaultResponse() {
    return [
      "🤖 **¡Hola! Soy tu asistente virtual de CUPET Las Tunas**",
      "",
      "Puedo ayudarte con:",
      "",
      "📦 **Productos:**",
      "• Combustibles (gasolina, diésel, keroseno)",
      "• GLP (cilindros de 10, 20 y 43 kg)",
      "• Lubricantes y aceites",
      "",
      "🕐 **Horarios y Atención:**",
      "• Horarios de la estación",
      "• Servicio de emergencia 24/7",
      "• Entregas a domicilio",
      "",
      "💰 **Compras y Precios:**",
      "• Cómo realizar pedidos",
      "• Información de precios",
      "• Descuentos disponibles",
      "",
      "📍 **Ubicación y Contacto:**",
      "• Dirección exacta",
      "• Teléfonos y emails",
      "• Redes sociales",
      "",
      "🔧 **Ayuda Técnica:**",
      "• Problemas con GLP",
      "• Issues con combustibles",
      "• Mantenimiento y reparaciones",
      "",
      "💡 **Escribe alguna palabra clave como:**",
      "• 'productos', 'precios', 'horarios'",
      "• 'comprar', 'ubicación', 'contacto'",
      "• 'glp', 'lubricantes', 'servicios'",
      "• 'problema', 'ayuda', 'fuga', 'no arranca'",
      "",
      "📞 **¿Necesitas ayuda inmediata?**",
      "• Llama al (53) 31-xxxxxx",
      "• WhatsApp: +53 5xxxxxxx",
      "• Emergencias: 24/7"
    ];
  }
  
  // Configurar sistema de aprendizaje
  setupLearningSystem() {
    // Sobrescribir el método addMessage para registrar conversaciones
    this.originalAddMessage = this.addMessage;
    this.addMessage = (message, sender) => {
      // Llamar al método original
      this.originalAddMessage(message, sender);
      
      // Registrar para aprendizaje
      if (sender === 'user') {
        this.currentConversation = {
          userMessage: message,
          timestamp: new Date().toISOString()
        };
      } else if (sender === 'bot' && this.currentConversation) {
        // Registrar la conversación completa
        const category = this.detectCategory(this.currentConversation.userMessage);
        this.learningSystem.recordConversation(
          this.currentConversation.userMessage,
          message,
          category
        );
        
        this.currentConversation = null;
      }
    };
  }
  
  // Detectar categoría del mensaje
  detectCategory(message) {
    const lowerMessage = message.toLowerCase();
    
    if (this.learningSystem.detectEmergency(lowerMessage).detected) {
      return 'emergency';
    }
    
    if (lowerMessage.includes('producto') || lowerMessage.includes('combustible') || lowerMessage.includes('gasolina')) {
      return 'productos';
    }
    
    if (lowerMessage.includes('glp') || lowerMessage.includes('gas') || lowerMessage.includes('cilindro')) {
      return 'glp';
    }
    
    if (lowerMessage.includes('precio') || lowerMessage.includes('costo') || lowerMessage.includes('tarifa')) {
      return 'precios';
    }
    
    if (lowerMessage.includes('horario') || lowerMessage.includes('hora') || lowerMessage.includes('abierto')) {
      return 'horarios';
    }
    
    if (lowerMessage.includes('transferencia') || lowerMessage.includes('transferir') || lowerMessage.includes('enviar dinero')) {
      return 'transferencias';
    }
    
    if (lowerMessage.includes('duda') || lowerMessage.includes('pregunta') || lowerMessage.includes('cómo')) {
      return 'dudas';
    }
    
    if (lowerMessage.includes('pago') || lowerMessage.includes('factura') || lowerMessage.includes('abonar')) {
      return 'pagos';
    }
    
    if (lowerMessage.includes('saldo') || lowerMessage.includes('recargar') || lowerMessage.includes('balance')) {
      return 'saldo';
    }
    
    if (lowerMessage.includes('contacto') || lowerMessage.includes('teléfono') || lowerMessage.includes('llamar')) {
      return 'contacto';
    }
    
    if (lowerMessage.includes('servicio') || lowerMessage.includes('mantenimiento') || lowerMessage.includes('técnico')) {
      return 'servicios';
    }
    
    if (lowerMessage.includes('comprar') || lowerMessage.includes('pedido') || lowerMessage.includes('venta')) {
      return 'compras';
    }
    
    if (lowerMessage.includes('problema') || lowerMessage.includes('fuga') || lowerMessage.includes('no funciona')) {
      return 'problemas';
    }
    
    return 'general';
  }
  
  // Obtener respuesta aprendida
  getLearnedResponse(message) {
    const category = this.detectCategory(message);
    return this.learningSystem.getLearnedResponse(message, category);
  }
  
  // Agregar método para retroalimentación
  recordFeedback(feedback, message = null, response = null) {
    const userMessage = message || this.lastUserMessage;
    const botResponse = response || this.lastBotResponse;
    const category = this.detectCategory(userMessage);
    
    this.learningSystem.recordFeedback(userMessage, botResponse, feedback, category);
  }
  
  // Agregar método para obtener estadísticas de aprendizaje
  getLearningStats() {
    return this.learningSystem.getLearningStats();
  }
  
  // Función auxiliar para formatear nombres de claves
  formatKeyName(key) {
    return key.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  }
  
  // Formateador de respuesta para transferencias
  formatTransferenciasResponse(transferencias) {
    if (!transferencias) return ["Información de transferencias no disponible temporalmente"];
    
    const response = ["💸 **Transferencias CUPET:", ""];
    
    // Pasos del proceso
    if (transferencias.pasos) {
      response.push("📋 **Pasos para realizar transferencia:");
      transferencias.pasos.forEach(paso => {
        response.push(`  ${paso}`);
      });
      response.push("");
    }
    
    // Límites
    if (transferencias.límites) {
      response.push("📊 **Límites de transferencia:");
      Object.entries(transferencias.límites).forEach(([key, limite]) => {
        response.push(`  • ${this.formatKeyName(key)}: ${limite}`);
      });
      response.push("");
    }
    
    // Comisiones
    if (transferencias.comisiones) {
      response.push("💰 **Comisiones:");
      Object.entries(transferencias.comisiones).forEach(([key, comision]) => {
        response.push(`  • ${this.formatKeyName(key)}: ${comision}`);
      });
      response.push("");
    }
    
    // Tiempos
    if (transferencias.tiempo_procesamiento) {
      response.push("⏱️ **Tiempos de procesamiento:");
      Object.entries(transferencias.tiempo_procesamiento).forEach(([key, tiempo]) => {
        response.push(`  • ${this.formatKeyName(key)}: ${tiempo}`);
      });
    }
    
    return response;
  }
  
  // Formateador de respuesta para dudas frecuentes
  formatDudasResponse(dudas) {
    if (!dudas) return ["Información de dudas no disponible temporalmente"];
    
    const response = ["❓ **Dudas Frecuentes de Clientes:", ""];
    
    Object.entries(dudas).forEach(([key, duda]) => {
      response.push(`**${duda.pregunta}**`);
      response.push(duda.respuesta);
      response.push("");
    });
    
    response.push("💡 **¿Necesita ayuda con algo específico? Pregunte sobre:**");
    response.push("• Transferencias, Saldo, Facturas, Recargas, Bloqueos");
    
    return response;
  }
  
  // Formateador de respuesta para pagos
  formatPagosResponse(pagos) {
    if (!pagos) return ["Información de pagos no disponible temporalmente"];
    
    const response = ["💳 **Pagos de Facturas CUPET:", ""];
    
    // Métodos de pago
    if (pagos.metodos_pago) {
      response.push("💳 **Métodos de pago disponibles:");
      pagos.metodos_pago.forEach(metodo => {
        response.push(`  • ${metodo}`);
      });
      response.push("");
    }
    
    // Pasos para pago online
    if (pagos.pasos_pago_online) {
      response.push("📋 **Pasos para pagar online:");
      pagos.pasos_pago_online.forEach(paso => {
        response.push(`  ${paso}`);
      });
      response.push("");
    }
    
    // Descuentos
    if (pagos.descuentos_pronto_pago) {
      response.push("🎁 **Descuentos por pronto pago:");
      Object.entries(pagos.descuentos_pronto_pago).forEach(([key, descuento]) => {
        response.push(`  • ${this.formatKeyName(key)}: ${descuento}`);
      });
    }
    
    return response;
  }
  
  // Formateador de respuesta para saldo y recargas
  formatSaldoResponse(saldo) {
    if (!saldo) return ["Información de saldo no disponible temporalmente"];
    
    const response = ["💰 **Saldo y Recargas CUPET:", ""];
    
    // Métodos de recarga
    if (saldo.metodos) {
      response.push("🔄 **Métodos para recargar saldo:");
      saldo.metodos.forEach(metodo => {
        response.push(`  • ${metodo}`);
      });
      response.push("");
    }
    
    // Montos
    if (saldo.montos_recarga) {
      response.push("💵 **Montos de recarga:");
      response.push(`  • Mínimo: ${saldo.montos_recarga.minimo}`);
      response.push(`  • Máximo: ${saldo.montos_recarga.maximo}`);
      response.push(`  • Sugeridos: ${saldo.montos_recarga.montos_sugeridos.join(', ')} CUP`);
      response.push("");
    }
    
    // Promociones
    if (saldo.promociones) {
      response.push("🎁 **Promociones vigentes:");
      Object.entries(saldo.promociones).forEach(([key, promo]) => {
        response.push(`  • ${this.formatKeyName(key)}: ${promo}`);
      });
    }
    
    return response;
  }
  
  // Formateador de respuesta para seguridad de cuenta
  formatSeguridadResponse(seguridad) {
    if (!seguridad) return ["Información de seguridad no disponible temporalmente"];
    
    const response = ["🔒 **Seguridad de tu Cuenta CUPET:", ""];
    
    if (seguridad.contraseñas) {
      response.push("🔐 **Requisitos de contraseña:");
      seguridad.contraseñas.requisitos.forEach(req => {
        response.push(`  • ${req}`);
      });
      response.push("");
      
      response.push("💡 **Consejos de seguridad:");
      seguridad.contraseñas.consejos.forEach(consejo => {
        response.push(`  • ${consejo}`);
      });
      response.push("");
    }
    
    if (seguridad.autenticacion_dos_factores) {
      response.push("📱 **Autenticación de dos factores:");
      response.push(`  ${seguridad.autenticacion_dos_factores.descripcion}`);
      seguridad.autenticacion_dos_factores.metodos.forEach(metodo => {
        response.push(`  • ${metodo}`);
      });
      response.push("");
    }
    
    return response;
  }
  
  // Formateador de respuesta para información financiera
  formatFinanzasResponse(finanzas) {
    if (!finanzas) return ["Información financiera no disponible temporalmente"];
    
    const response = ["💰 **Información Financiera:", ""];
    
    if (finanzas.facturacion) {
      response.push("📄 **Tipos de factura:");
      finanzas.facturacion.tipos_factura.forEach(tipo => {
        response.push(`  • ${tipo}`);
      });
      response.push("");
    }
    
    if (finanzas.creditos_financiamiento) {
      response.push("🏦 **Tipos de crédito disponibles:");
      finanzas.creditos_financiamiento.tipos_credito.forEach(credito => {
        response.push(`  • ${credito}`);
      });
      response.push("");
      
      response.push("📊 **Tasas de interés:");
      Object.entries(finanzas.creditos_financiamiento.tasas_interes).forEach(([tipo, tasa]) => {
        response.push(`  • ${this.formatKeyName(tipo)}: ${tasa}`);
      });
      response.push("");
    }
    
    return response;
  }
  
  // Formateador de respuesta para soporte técnico
  formatSoporteResponse(soporte) {
    if (!soporte) return ["Información de soporte no disponible temporalmente"];
    
    const response = ["🛠️ **Soporte Técnico CUPET:", ""];
    
    if (soporte.canales_atencion) {
      response.push("📞 **Canales de atención:");
      soporte.canales_atencion.forEach(canal => {
        response.push(`  • ${canal}`);
      });
      response.push("");
    }
    
    if (soporte.horarios_atencion) {
      response.push("🕐 **Horarios de atención:");
      Object.entries(soporte.horarios_atencion).forEach(([canal, horario]) => {
        response.push(`  • ${this.formatKeyName(canal)}: ${horario}`);
      });
      response.push("");
    }
    
    if (soporte.tiempos_respuesta) {
      response.push("⏱️ **Tiempos de respuesta:");
      Object.entries(soporte.tiempos_respuesta).forEach(([nivel, tiempo]) => {
        response.push(`  • ${this.formatKeyName(nivel)}: ${tiempo}`);
      });
    }
    
    return response;
  }
  
  // Formateador de respuesta para información corporativa
  formatEmpresaResponse(empresa) {
    if (!empresa) return ["Información corporativa no disponible temporalmente"];
    
    const response = ["🏢 **Sobre CUPET Las Tunas:", ""];
    
    if (empresa.empresa) {
      response.push("📊 **Datos de la empresa:");
      Object.entries(empresa.empresa).forEach(([dato, valor]) => {
        response.push(`  • ${this.formatKeyName(dato)}: ${valor}`);
      });
      response.push("");
    }
    
    if (empresa.mision) {
      response.push("🎯 **Misión:");
      response.push(`  ${empresa.mision}`);
      response.push("");
    }
    
    if (empresa.vision) {
      response.push("👁️ **Visión:");
      response.push(`  ${empresa.vision}`);
      response.push("");
    }
    
    if (empresa.valores) {
      response.push("💎 **Valores:");
      empresa.valores.forEach(valor => {
        response.push(`  • ${valor}`);
      });
    }
    
    return response;
  }
  
  // Formateador de respuesta para preguntas técnicas
  formatTecnicoResponse(tecnico) {
    if (!tecnico) return ["Información técnica no disponible temporalmente"];
    
    const response = ["⚙️ **Información Técnica:", ""];
    
    if (tecnico.especificaciones_tecnicas) {
      Object.entries(tecnico.especificaciones_tecnicas).forEach(([categoria, specs]) => {
        response.push(`🔬 **${this.formatKeyName(categoria)}:**`);
        Object.entries(specs).forEach(([propiedad, valor]) => {
          response.push(`  • ${this.formatKeyName(propiedad)}: ${valor}`);
        });
        response.push("");
      });
    }
    
    if (tecnico.procedimientos_calidad) {
      response.push("✅ **Procedimientos de calidad:");
      Object.entries(tecnico.procedimientos_calidad).forEach(([proceso, pasos]) => {
        response.push(`  **${this.formatKeyName(proceso)}:**`);
        pasos.forEach(paso => {
          response.push(`    • ${paso}`);
        });
      });
    }
    
    return response;
  }
  
  // Formateador de respuesta para preguntas complejas
  formatComplejoResponse(complejo) {
    if (!complejo) return ["Información compleja no disponible temporalmente"];
    
    const response = ["🧠 **Respuestas Detalladas:", ""];
    
    if (complejo.comparaciones_productos) {
      Object.entries(complejo.comparaciones_productos).forEach(([comparacion, datos]) => {
        response.push(`📊 **${this.formatKeyName(comparacion)}:**`);
        Object.entries(datos).forEach(([aspecto, valor]) => {
          response.push(`  • ${this.formatKeyName(aspecto)}: ${valor}`);
        });
        response.push("");
      });
    }
    
    if (complejo.calculadoras) {
      response.push("🧮 **Calculadoras útiles:");
      Object.entries(complejo.calculadoras).forEach(([calc, datos]) => {
        response.push(`  **${this.formatKeyName(calc)}:**`);
        response.push(`  • Fórmula: ${datos.formula}`);
        response.push(`  • Ejemplo: ${datos.ejemplo}`);
        response.push("");
      });
    }
    
    if (complejo.escenarios) {
      response.push("🎯 **Guías paso a paso:");
      Object.entries(complejo.escenarios).forEach(([escenario, pasos]) => {
        response.push(`  **${this.formatKeyName(escenario)}:**`);
        pasos.forEach(paso => {
          response.push(`    ${paso}`);
        });
        response.push("");
      });
    }
    
    return response;
  }
  
  init() {
    // Verificar que todos los elementos necesarios existan
    const requiredElements = [
      'chatbotToggle', 'chatbotWindow', 'chatbotClose', 
      'chatbotInput', 'chatbotSend', 'chatbotMessages', 'quickReplies'
    ];
    
    const missingElements = requiredElements.filter(id => !document.getElementById(id));
    
    if (missingElements.length > 0) {
      console.error('Chatbot: Missing elements:', missingElements);
      return;
    }
    
    this.chatbotToggle = document.getElementById('chatbotToggle');
    this.chatbotWindow = document.getElementById('chatbotWindow');
    this.chatbotClose = document.getElementById('chatbotClose');
    this.chatbotInput = document.getElementById('chatbotInput');
    this.chatbotSend = document.getElementById('chatbotSend');
    this.chatbotMessages = document.getElementById('chatbotMessages');
    this.quickReplies = document.getElementById('quickReplies');
    
    console.log('Chatbot: All elements found, initializing...');
    this.bindEvents();
  }
  
  bindEvents() {
    // Toggle chat window
    this.chatbotToggle.addEventListener('click', () => this.toggleChat());
    this.chatbotClose.addEventListener('click', () => this.toggleChat());
    
    // Send message
    this.chatbotSend.addEventListener('click', () => this.sendMessage());
    this.chatbotInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.sendMessage();
    });
    
    // Quick replies
    this.quickReplies.addEventListener('click', (e) => {
      const button = e.target.closest('.chatbot-quick-reply');
      if (!button || !this.quickReplies.contains(button)) return;
      const message = button.getAttribute('data-message');
      if (message) {
        this.chatbotInput.value = message;
        this.sendMessage();
      }
    });
    
    // Close chat when clicking outside
    document.addEventListener('click', (e) => {
      if (this.isOpen && !this.chatbotToggle.contains(e.target) && !this.chatbotWindow.contains(e.target)) {
        this.toggleChat();
      }
    });
  }
  
  toggleChat() {
    this.isOpen = !this.isOpen;
    this.chatbotWindow.classList.toggle('active', this.isOpen);
    
    if (this.isOpen) {
      this.chatbotInput.focus();
      // Change icon to minimize
      this.chatbotToggle.innerHTML = '<i class="fas fa-minus"></i>';
    } else {
      // Change icon back to chat
      this.chatbotToggle.innerHTML = '<i class="fas fa-comments"></i>';
    }
  }
  
  sendMessage() {
    const message = this.chatbotInput.value.trim();
    if (!message || this.isTyping) return;
    
    // Add user message
    this.addMessage(message, 'user');
    this.chatbotInput.value = '';
    
    // Show typing indicator
    this.showTyping();
    
    // Simulate bot response delay
    setTimeout(() => {
      this.hideTyping();
      const response = this.generateResponse(message);
      this.addMessage(response, 'bot');
    }, 250 + Math.random() * 200);
  }
  
  addMessage(message, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `chatbot-message ${sender}`;
    
    if (Array.isArray(message)) {
      message.forEach((line, index) => {
        if (index > 0) messageDiv.appendChild(document.createElement('br'));
        const span = document.createElement('span');
        span.innerHTML = this.processFormatting(String(line ?? ''));
        messageDiv.appendChild(span);
      });
    } else {
      messageDiv.innerHTML = this.processFormatting(String(message ?? ''));
    }
    
    this.chatbotMessages.appendChild(messageDiv);
    
    // Scroll solo hasta mostrar la primera palabra de la respuesta
    if (sender === 'bot') {
      this.scrollToBottom();
    }
  }
  
  processFormatting(text) {
    // Verificar que text sea un string válido
    if (!text || typeof text !== 'string') {
      return text || '';
    }
    
    // Escapar HTML antes de aplicar el formato permitido para evitar inyección de código.
    let processedText = text.replace(/[&<>"']/g, (character) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    })[character]);

    // Negrita sencilla: **texto** -> <strong>texto</strong>
    processedText = processedText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Convert bullet points starting with • to proper list items
    processedText = processedText.replace(/^• (.+)$/gm, '• $1');
    
    // Convert numbered lists: 1. text -> <span class="numbered">1. text</span>
    processedText = processedText.replace(/^\d+\. (.+)$/gm, '<span class="numbered">$&</span>');
    
    // Convert emojis to keep them as they are
    processedText = processedText;
    
    return processedText;
  }
  
  showTyping() {
    this.isTyping = true;
    const typingDiv = document.createElement('div');
    typingDiv.className = 'chatbot-typing';
    typingDiv.id = 'typingIndicator';
    typingDiv.innerHTML = `
      <div class="chatbot-typing-dot"></div>
      <div class="chatbot-typing-dot"></div>
      <div class="chatbot-typing-dot"></div>
    `;
    this.chatbotMessages.appendChild(typingDiv);
    
    // NO hacer scroll automático - el usuario controla cuándo bajar
    // this.scrollToBottom(); // Comentado para desactivar scroll automático
  }
  
  hideTyping() {
    this.isTyping = false;
    const typingIndicator = document.getElementById('typingIndicator');
    if (typingIndicator) {
      typingIndicator.remove();
    }
  }
  
  generateResponse(message) {
    const original = String(message || '').trim();
    const lowerMessage = original.toLocaleLowerCase('es');
    const normalized = lowerMessage.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/^[¿¡\s]+|[?!.\s]+$/g, '');

    // Conversación cotidiana: se atiende antes de buscar palabras clave.
    if (/^(hola|hol[aá]|buenos dias|buenas tardes|buenas noches|buenas|hey|que tal|saludos)[!?.\s]*$/i.test(normalized)) {
      return '¡Hola! 😊 Qué gusto saludarte. Soy el asistente virtual de CUPET Comercialización Las Tunas. ¿Qué necesitas consultar hoy?';
    }
    if (/^(gracias|muchas gracias|mil gracias|te lo agradezco|genial|perfecto)[!?.\s]*$/i.test(normalized)) {
      return '¡De nada! Me alegra haberte ayudado. Si te surge otra duda sobre nuestros productos o servicios, aquí estoy.';
    }
    if (/^(adios|hasta luego|nos vemos|chao|bye|que tengas buen dia)[!?.\s]*$/i.test(normalized)) {
      return '¡Hasta luego! Gracias por visitar CUPET Comercialización Las Tunas. Que tengas un excelente día. 👋';
    }
    if (/^(quien eres|que eres|como te llamas|eres una persona)[?!.\s]*$/i.test(normalized)) {
      return 'Soy el asistente virtual de CUPET Comercialización Las Tunas. No soy una persona, pero puedo orientarte sobre combustibles, GLP, lubricantes, pedidos y distribución.';
    }
    if (/^(como estas|que haces|estas ahi|me puedes ayudar)[?!.\s]*$/i.test(normalized)) {
      return '¡Estoy aquí y listo para ayudarte! 😊 Cuéntame qué necesitas y buscamos la información juntos.';
    }

    // No atribuir a CUPET servicios bancarios que no forman parte de esta web.
    if (/transferencia|transferir dinero|consultar saldo|recargar saldo|credito bancario|tarjeta bancaria/.test(normalized)) {
      return 'En esta página no se gestionan transferencias bancarias, saldos ni créditos. Puedo ayudarte con la información de combustibles, GLP, lubricantes, pedidos y distribución. ¿Cuál de esos temas te interesa?';
    }

    // Las emergencias tienen prioridad sobre las respuestas generales.
    const emergency = this.learningSystem?.detectEmergency?.(original);
    if (emergency?.detected) {
      return this.learningSystem.getEmergencyResponse(emergency.type) || 'Si existe una fuga de gas, aléjate del lugar, evita encender interruptores o llamas y contacta inmediatamente con los servicios de emergencia.';
    }

    const learnedResponse = this.getLearnedResponse(normalized);
    if (learnedResponse) return learnedResponse;

    if (this.isProblemaServicio(normalized)) return this.handleProblemaServicio(normalized);
    if (this.isProblemaTecnico(normalized)) return this.handleProblemaTecnico(normalized);

    const keywords = this.extractKeywords(normalized);
    let category = this.detectCategoryFromKeywords(keywords);

    // Comprende seguimientos breves como «¿y cuánto cuesta?» o «¿cómo lo pido?».
    if (!category && this.lastTopic && /^(y |tambien|también|ese|esa|eso|ese mismo|me interesa|cuanto|cuánto|como|cómo|donde|dónde|cual|cuál)/i.test(normalized)) {
      category = this.lastTopic;
    }

    if (category) this.lastTopic = category;

    switch (category) {
      case 'productos': return this.responses.productos;
      case 'horarios': return this.responses.horarios;
      case 'compras': return this.responses.comprar;
      case 'ubicacion': return this.responses.ubicacion;
      case 'precios': return this.responses.precios;
      case 'glp': return this.responses.glp;
      case 'contacto': return this.responses.contacto;
      case 'servicios': return this.responses.servicios;
      case 'problemas': return this.handleProblemaTecnico(normalized);
      default:
        return this.searchInAllKnowledgeBases(keywords) || 'No estoy seguro de haber entendido tu pregunta. ¿Podrías explicármela de otra manera? También puedes preguntarme por combustibles, GLP, lubricantes, pedidos o entregas.';
    }
  }

  // Búsqueda en todas las bases de conocimiento
  searchInAllKnowledgeBases(keywords) {
    // 1. Buscar en troubleshooting para problemas técnicos
    const troubleshootingResult = this.searchInTroubleshooting(keywords);
    if (troubleshootingResult) {
      return troubleshootingResult;
    }
    
    // 2. Buscar información externa (versión síncrona para evitar [object Promise])
    for (const keyword of keywords) {
      if (keyword.includes('clima') || keyword.includes('tiempo') || keyword.includes('temperatura')) {
        return [
          '🌤️ **Información del Clima:**',
          '• Ubicación: Las Tunas, Cuba',
          '• Temperatura: 28-32°C (promedio)',
          '• Condición: Mayormente soleado',
          '• Humedad: 70-80%',
          '• Viento: 10-15 km/h',
          '',
          '📋 **Recomendaciones:**',
          '• Condiciones favorables para operaciones',
          '• Mantener hidratación del personal',
          '• Revisar equipos sensibles al calor'
        ];
      }
      if (keyword.includes('noticias') || keyword.includes('novedades') || keyword.includes('actualidad')) {
        return [
          '📰 **Noticias Relevantes:**',
          '',
          '**CUPET Las Tunas - Servicios Continuos**',
          '• Mantenemos todos nuestros servicios operativos',
          '• Stock de combustibles garantizado',
          '• Atención al cliente 24/7',
          '',
          '**Información Importante:**',
          '• Para noticias actualizadas, visite nuestras redes sociales',
          '• Facebook: facebook.com/CupetLasTunas',
          '• Teléfono: (53) 31-xxxxxx'
        ];
      }
      if (keyword.includes('emergencia') || keyword.includes('urgencia') || keyword.includes('hospital')) {
        return [
          '🚨 **Información de Emergencia:**',
          '',
          '📞 **Contactos de Emergencia:**',
          '• Bomberos: 105',
          '• Ambulancia: 104',
          '• Policía: 106',
          '• Defensa Civil: 107',
          '',
          '🏥 **Hospitales en Las Tunas:**',
          '• Hospital Provincial Dr. Ernesto Guevara',
          '  Teléfono: (53) 31-xxxxxx',
          '  Dirección: Carretera Central, Las Tunas',
          '',
          '⛽ **Emergencia CUPET:**',
          '• (53) 31-xxxxxx (24/7)',
          '• Disponible para fugas de gas, accidentes, etc.'
        ];
      }
      if (keyword.includes('norma') || keyword.includes('regulación') || keyword.includes('seguridad')) {
        return [
          '📋 **Normas y Regulaciones:**',
          '',
          '🔥 **Normativas GLP:**',
          '• NC 191:2018 - Combustibles',
          '• NC 447:2018 - Equipos GLP',
          '• Normas internacionales de seguridad',
          '',
          '🏭 **Certificaciones:**',
          '• Ministerio de Energía',
          '• UNE 419',
          '• ISO 9001 en procesos',
          '',
          '🛡️ **Procedimientos de Emergencia:**',
          '• Cortar suministro inmediatamente',
          '• Evacuar área 50 metros',
          '• Llamar a emergencias 105',
          '• No usar fuego ni electricidad'
        ];
      }
    }
    
    // 3. Buscar en knowledgeBase principal
    return this.searchInKnowledgeBase(keywords);
  }
  
  // Buscar información específica en troubleshooting
  searchInTroubleshooting(keywords) {
    const troubleshooting = this.troubleshootingSystem;
    
    // Buscar problemas de GLP
    if (keywords.some(k => k.includes('glp') || k.includes('gas') || k.includes('cilindro'))) {
      if (keywords.some(k => k.includes('fuga') || k.includes('escape') || k.includes('olor'))) {
        return this.formatTroubleshootingResponse(troubleshooting.glp.fuga_gas, 'glp');
      }
      if (keywords.some(k => k.includes('llama') || k.includes('baja') || k.includes('amarilla'))) {
        return this.formatTroubleshootingResponse(troubleshooting.glp.llama_baja, 'glp');
      }
      if (keywords.some(k => k.includes('enciende') || k.includes('encender') || k.includes('chispa'))) {
        return this.formatTroubleshootingResponse(troubleshooting.glp.encendido_difficil, 'glp');
      }
    }
    
    // Buscar problemas de combustibles
    if (keywords.some(k => k.includes('combustible') || k.includes('arranca') || k.includes('motor'))) {
      if (keywords.some(k => k.includes('contamin') || k.includes('agua') || k.includes('sucio'))) {
        return this.formatTroubleshootingResponse(troubleshooting.combustibles.contaminacion, 'combustibles');
      }
      if (keywords.some(k => k.includes('consume') || k.includes('gasta') || k.includes('excesivo'))) {
        return this.formatTroubleshootingResponse(troubleshooting.combustibles.consumo_excesivo, 'combustibles');
      }
    }
    
    // Buscar problemas de lubricantes
    if (keywords.some(k => k.includes('aceite') || k.includes('lubricante'))) {
      if (keywords.some(k => k.includes('consume') || k.includes('bajo') || k.includes('gasta'))) {
        return this.formatTroubleshootingResponse(troubleshooting.lubricantes.consumo_aceite, 'lubricantes');
      }
      if (keywords.some(k => k.includes('negro') || k.includes('oscurece') || k.includes('rapido'))) {
        return this.formatTroubleshootingResponse(troubleshooting.lubricantes.aceite_negro, 'lubricantes');
      }
    }
    
    return null;
  }
  
  // Formatear respuesta de troubleshooting
  formatTroubleshootingResponse(problem, category) {
    if (!problem) return null;
    
    const response = [
      `🔧 **${problem.titulo}**`,
      ``,
      `⚠️ **Nivel de urgencia: ${problem.nivel_urgencia}**`,
      ``,
      `🔍 **Síntomas:**`
    ];
    
    if (problem.sintomas) {
      problem.sintomas.forEach(sintoma => response.push(`• ${sintoma}`));
    }
    
    response.push(``, `💡 **Solución:**`);
    
    if (problem.accion_inmediata) {
      response.push(`**Acciones inmediatas:**`);
      problem.accion_inmediata.forEach(paso => {
        response.push(`${paso.paso}. ${paso.accion}: ${paso.descripcion}`);
      });
    }
    
    if (problem.soluciones) {
      problem.soluciones.forEach(solucion => {
        if (typeof solucion === 'object' && solucion.problema) {
          response.push(`**Para ${solucion.problema}:**`);
          solucion.solucion.forEach(s => response.push(`• ${s}`));
        } else {
          response.push(`• ${solucion}`);
        }
      });
    }
    
    response.push(``, `📞 **Contacto de emergencia:**`);
    response.push(`• Bomberos: 105`);
    response.push(`• CUPET Las Tunas: (53) 31-xxxxxx`);
    
    return response;
  }
  
  // Extraer palabras clave del mensaje
  extractKeywords(message) {
    const stopWords = ['el', 'la', 'de', 'que', 'y', 'en', 'un', 'para', 'con', 'por', 'las', 'los', 'del', 'se', 'lo', 'como', 'es', 'son', 'están', 'hay', 'tienen', 'puedo', 'puedes', 'quiero', 'necesito'];
    return message.toLowerCase()
      .split(/\s+/)
      .filter(word => word.length > 2 && !stopWords.includes(word));
  }
  
  // Detectar categoría basada en palabras clave
  detectCategoryFromKeywords(keywords) {
    const categoryMap = {
      productos: ['producto', 'venden', 'combustible', 'gasolina', 'diesel', 'diésel', 'keroseno', 'aceite', 'lubricante', 'venta'],
      horarios: ['horario', 'hora', 'abierto', 'cerrado', 'atención', 'atencion', 'funciona', 'trabaja'],
      compras: ['comprar', 'compra', 'adquirir', 'pedir', 'pedido', 'online', 'venta', 'obtener'],
      ubicacion: ['ubicación', 'direccion', 'dónde', 'donde', 'llegar', 'mapa', 'local', 'estación', 'estacion'],
      precios: ['precio', 'costo', 'valor', 'tarifa', 'descuento', 'oferta', 'barato', 'caro', 'cuánto', 'cuanto'],
      glp: ['glp', 'gas', 'cilindro', 'recarga', 'botella', 'gas licuado', 'garrafa'],
      contacto: ['contacto', 'teléfono', 'telefono', 'llamar', 'email', 'correo', 'whatsapp', 'redes'],
      servicios: ['servicio', 'servicios', 'entrega', 'distribución', 'distribucion', 'técnico', 'mantenimiento', 'asistencia'],
      problemas: ['problema', 'fuga', 'no funciona', 'no arranca', 'no enciende', 'llama', 'humo', 'ruido', 'gotea', 'avería', 'averia']
    };
    
    for (const [category, categoryKeywords] of Object.entries(categoryMap)) {
      if (keywords.some(keyword => categoryKeywords.some(catKeyword => keyword.includes(catKeyword)))) {
        return category;
      }
    }
    
    return null;
  }
  
  // Búsqueda específica en la base de conocimientos
  searchInKnowledgeBase(keywords) {
    // Buscar información específica basada en las palabras clave
    for (const keyword of keywords) {
      // Productos específicos
      if (keyword.includes('gasolina')) {
        return this.getSpecificProductInfo('gasolina');
      }
      if (keyword.includes('diesel') || keyword.includes('diésel')) {
        return this.getSpecificProductInfo('diesel');
      }
      if (keyword.includes('keroseno')) {
        return this.getSpecificProductInfo('keroseno');
      }
      if (keyword.includes('aceite') || keyword.includes('lubricante')) {
        return this.getSpecificProductInfo('lubricantes');
      }
      
      // Cilindros GLP específicos
      if (keyword.includes('10kg') || keyword.includes('10')) {
        return this.getSpecificGLPInfo('cilindro_10kg');
      }
      if (keyword.includes('20kg') || keyword.includes('20')) {
        return this.getSpecificGLPInfo('cilindro_20kg');
      }
      if (keyword.includes('43kg') || keyword.includes('43')) {
        return this.getSpecificGLPInfo('cilindro_43kg');
      }
    }
    
    // Si no encuentra nada específico, devuelve respuesta por defecto
    return this.responses.default;
  }
  
  // Obtener información específica de productos
  getSpecificProductInfo(productType) {
    const productos = this.knowledgeBase.productos;
    
    if (productos.combustibles && productos.combustibles[productType]) {
      const product = productos.combustibles[productType];
      const response = [`⛽ **${product.nombre}:**`];
      
      // Agregar todos los campos disponibles del producto
      if (product.usos) response.push(`• Usos: ${product.usos}`);
      if (product.octanaje) response.push(`• Octanaje: ${product.octanaje}`);
      if (product.tipos && Array.isArray(product.tipos)) response.push(`• Tipos: ${product.tipos.join(', ')}`);
      if (product.especificaciones) response.push(`• Especificaciones: ${product.especificaciones}`);
      if (product.almacenamiento) response.push(`• Almacenamiento: ${product.almacenamiento}`);
      if (product.beneficios) response.push(`• Beneficios: ${product.beneficios}`);
      if (product.precio_referencia) response.push(`• Precio referencia: ${product.precio_referencia}`);
      if (product.disponibilidad) response.push(`• Disponibilidad: ${product.disponibilidad}`);
      
      response.push('', '¿Necesitas información sobre precios o cómo comprar?');
      return response;
    }
    
    if (productos.lubricantes) {
      const lubricante = Object.values(productos.lubricantes).find(l => 
        l.nombre.toLowerCase().includes(productType.toLowerCase()) ||
        l.uso.toLowerCase().includes(productType.toLowerCase())
      );
      if (lubricante) {
        const response = [`🛢️ **${lubricante.nombre}:**`];
        
        // Agregar todos los campos disponibles del lubricante
        if (lubricante.uso) response.push(`• Uso: ${lubricante.uso}`);
        if (lubricante.tipo) response.push(`• Tipo: ${lubricante.tipo}`);
        if (lubricante.especificaciones) response.push(`• Especificaciones: ${lubricante.especificaciones}`);
        if (lubricante.presentacion) response.push(`• Presentación: ${lubricante.presentacion}`);
        if (lubricante.beneficios) response.push(`• Beneficios: ${lubricante.beneficios}`);
        if (lubricante.cambio_recomendado) response.push(`• Cambio recomendado: ${lubricante.cambio_recomendado}`);
        if (lubricante.precio) response.push(`• Precio: ${lubricante.precio}`);
        
        response.push('', '¿Te interesa saber más sobre su aplicación o precios?');
        return response;
      }
    }
    
    return this.responses.productos;
  }
  
  // Obtener información específica de GLP
  getSpecificGLPInfo(cilindroType) {
    const glp = this.knowledgeBase.productos.glp;
    
    if (glp[cilindroType]) {
      const cilindro = glp[cilindroType];
      const response = [`🔥 **${cilindro.nombre}:**`];
      
      // Agregar todos los campos disponibles del cilindro
      if (cilindro.uso) response.push(`• Uso: ${cilindro.uso}`);
      if (cilindro.dimensiones) response.push(`• Dimensiones: ${cilindro.dimensiones}`);
      if (cilindro.peso_vacio) response.push(`• Peso vacío: ${cilindro.peso_vacio}`);
      if (cilindro.presion_trabajo) response.push(`• Presión de trabajo: ${cilindro.presion_trabajo}`);
      if (cilindro.certificacion) response.push(`• Certificación: ${cilindro.certificacion}`);
      if (cilindro.vida_util) response.push(`• Vida útil: ${cilindro.vida_util}`);
      if (cilindro.precio) response.push(`• Precio: ${cilindro.precio}`);
      if (cilindro.entrega) response.push(`• Tiempo de entrega: ${cilindro.entrega}`);
      if (cilindro.seguridad) response.push(`• Seguridad: ${cilindro.seguridad}`);
      
      response.push('', '¿Deseas información sobre cómo solicitarlo o precios actualizados?');
      return response;
    }
    
    return this.responses.glp;
  }
  
  // Detectar si es un problema técnico
  isProblemaTecnico(message) {
    const problemasKeywords = [
      'tengo una fuga', 'hay una fuga', 'huele a gas', 'se escapa el gas',
      'no arranca', 'no enciende', 'no funciona', 'está dañado', 'esta danado',
      'se rompió', 'se rompio', 'hace ruido', 'sale humo', 'se recalienta',
      'pierde combustible', 'pierde aceite', 'gotea', 'avería', 'averia',
      'presenta una falla', 'tiene una falla', 'está fallando', 'esta fallando'
    ];
    return problemasKeywords.some(keyword => message.includes(keyword));
  }
  isProblemaServicio(message) {
    const servicioKeywords = [
      'pago', 'pagar', 'método de pago', 'metodo de pago',
      'comprar', 'compra', 'pedido', 'solicitar', 'registrarse', 'registro',
      'crear cuenta', 'iniciar sesión', 'iniciar sesion', 'entrega', 'recibir',
      'envío', 'envio', 'distribución', 'distribucion', 'factura', 'comprobante',
      'recibo', 'documentación', 'documentacion', 'formulario', 'trámite', 'tramite',
      'contactar', 'comunicarse', 'soporte', 'asistencia'
    ];
    return servicioKeywords.some(keyword => message.includes(keyword));
  }
  // Manejar problemas de servicio al cliente
  handleProblemaServicio(message) {
    const lowerMessage = message.toLowerCase();
    
    // Problemas de pago
    if (lowerMessage.includes('pago') || lowerMessage.includes('pagar')) {
      return this.getPaymentHelp(lowerMessage);
    }
    
    // Problemas de compra/pedido
    if (lowerMessage.includes('compra') || lowerMessage.includes('pedido') || lowerMessage.includes('solicitar')) {
      return this.getPurchaseHelp(lowerMessage);
    }
    
    // Problemas de registro/cuenta
    if (lowerMessage.includes('registr') || lowerMessage.includes('cuenta') || lowerMessage.includes('sesión')) {
      return this.getAccountHelp(lowerMessage);
    }
    
    // Problemas de entrega
    if (lowerMessage.includes('entrega') || lowerMessage.includes('recibir') || lowerMessage.includes('envío')) {
      return this.getDeliveryHelp(lowerMessage);
    }
    
    // Problemas de documentación
    if (lowerMessage.includes('factura') || lowerMessage.includes('comprobante') || lowerMessage.includes('documento')) {
      return this.getDocumentationHelp(lowerMessage);
    }
    
    // Ayuda general
    return this.getGeneralServiceHelp(lowerMessage);
  }
  
  // Ayuda con pagos
  getPaymentHelp() {
    return [
      '💳 **Sobre el pago**',
      '',
      'La página de pago de este proyecto permite recorrer un proceso de demostración. Puedes revisar el resumen del pedido y ver las opciones que aparecen en pantalla.',
      '',
      'Importante: el prototipo no está conectado a una pasarela bancaria y no realiza cobros reales. No introduzcas números de tarjetas reales ni datos financieros sensibles.',
      '',
      'Si quieres, puedo explicarte cómo llegar al resumen de tu pedido.'
    ];
  }
  getPurchaseHelp() {
    return [
      '🛒 **Cómo recorrer un pedido en la web**',
      '',
      '1. Inicia sesión o crea una cuenta de demostración.',
      '2. Entra en el panel del cliente.',
      '3. Abre el catálogo de combustibles, GLP o lubricantes.',
      '4. Selecciona los productos y las cantidades disponibles en la interfaz.',
      '5. Revisa el carrito y continúa al resumen de pago.',
      '6. Completa el flujo de demostración para ver la confirmación.',
      '',
      'Ten en cuenta que los pedidos se guardan localmente en el navegador: no se envían a CUPET ni se procesan como compras reales.'
    ];
  }
  getAccountHelp() {
    return [
      '👤 **Acceso y registro**',
      '',
      'Desde la portada puedes entrar en «Iniciar sesión» o «Registrarse». Después de completar el formulario de demostración, la web permite acceder al panel del cliente.',
      '',
      'La autenticación de este prototipo se simula en el navegador; no existe validación de identidad en un servidor ni recuperación real de contraseñas. Utiliza únicamente datos de prueba.'
    ];
  }
  getDeliveryHelp() {
    return [
      '🚚 **Solicitud de distribución**',
      '',
      'La web incluye una sección de distribución donde puedes completar los datos de una solicitud de entrega de demostración. Revisa cuidadosamente los campos y la información antes de continuar.',
      '',
      'El prototipo no consulta rutas, disponibilidad de vehículos ni estados logísticos reales. La solicitud no se transmite a un sistema operativo de CUPET.'
    ];
  }
  getDocumentationHelp() {
    return [
      '📄 **Sobre comprobantes y documentos**',
      '',
      'La plataforma de demostración muestra un resumen y una confirmación del pedido, pero no emite facturas fiscales ni comprobantes oficiales.',
      '',
      'Si necesitas un documento válido para una operación real, debes confirmarlo directamente con los canales oficiales de CUPET.'
    ];
  }
  getGeneralServiceHelp(message) {
    return [
      '🤝 **Ayuda General - Servicio al Cliente:**',
      '',
      '🔹 **¿Cómo podemos ayudarte?**',
      '',
      '**Productos y Servicios:**',
      '• Consultas de combustibles y precios',
      '• Información de GLP y cilindros',
      '• Asesoramiento de lubricantes',
      '',
      '**Compras y Pedidos:**',
      '• Ayuda para realizar compras',
      '• Seguimiento de pedidos',
      '• Cambios y cancelaciones',
      '',
      '**Soporte Técnico:**',
      '• Problemas con equipos',
      '• Emergencias y fugas',
      '• Mantenimiento y reparaciones',
      '',
      '**Documentación:**',
      '• Facturas y comprobantes',
      '• Requisitos y trámites',
      '• Certificaciones',
      '',
      '🔹 **Canales de Atención:**',
      '📞 **Teléfono:** (53) 31-xxxxxx',
      '📱 **WhatsApp:** +53 5xxxxxxx',
      '📧 **Email:** info@cupetlastunas.cu',
      '🌐 **Web:** www.cupetlasunas.cu',
      '📍 **Presencial:** Carretera Central km 585, Las Tunas',
      '',
      '🔹 **Horarios de Atención:**',
      `• Estación: ${this.knowledgeBase.horarios.estacion_principal.lunes_viernes}`,
      `• Administración: ${this.knowledgeBase.horarios.oficina_administrativa.lunes_viernes}`,
      `• Soporte técnico: ${this.knowledgeBase.horarios.servicio_tecnico.lunes_viernes}`,
      '',
      '🔹 **Emergencias 24/7:**',
      '• Teléfono: (53) 31-xxxxxx',
      '• Disponible para fugas, accidentes, urgencias',
      '',
      '💡 **Especifica tu necesidad para recibir ayuda personalizada:**',
      '• "Ayuda con pago"',
      '• "Problema con pedido"',
      '• "Información de productos"',
      '• "Soporte técnico"'
    ];
  }
  
  // Manejar problemas técnicos con diagnóstico
  handleProblemaTecnico(message) {
    const sintomas = this.extractSintomas(message);
    let categoria = null;
    
    // Determinar categoría del problema
    if (message.includes('glp') || message.includes('gas') || message.includes('cilindro') || 
        message.includes('fuga') || message.includes('llama')) {
      categoria = 'glp';
    } else if (message.includes('combustible') || message.includes('arranca') || message.includes('motor')) {
      categoria = 'combustibles';
    } else if (message.includes('aceite') || message.includes('lubricante')) {
      categoria = 'lubricantes';
    }
    
    // Intentar diagnóstico si hay sistema disponible
    if (this.diagnosticSystem.diagnosticar && categoria) {
      const diagnosticos = this.diagnosticSystem.diagnosticar(sintomas, categoria);
      
      if (diagnosticos.length > 0) {
        return this.formatDiagnosticResponse(diagnosticos[0], categoria);
      }
    }
    
    // Si no hay diagnóstico específico, dar respuesta general de problemas
    return this.responses.problemas;
  }
  
  // Extraer síntomas del mensaje
  extractSintomas(message) {
    const sintomasMap = {
      'olor a gas': ['olor', 'gas', 'huele'],
      'fuga': ['fuga', 'escapa', 'gotea', 'pierde'],
      'no enciende': ['no enciende', 'no prende', 'no funciona'],
      'llama baja': ['llama baja', 'llama pequeña', 'amarilla'],
      'no arranca': ['no arranca', 'no prende', 'muerto'],
      'consumo alto': ['consume mucho', 'gasta mucho', 'consumo alto'],
      'humo': ['humo', 'echa humo', 'sale humo'],
      'ruido': ['ruido', 'hace ruido', 'ruidoso'],
      'recalentamiento': ['caliente', 'recalienta', 'temperatura alta']
    };
    
    const sintomas = [];
    Object.entries(sintomasMap).forEach(([sintoma, keywords]) => {
      if (keywords.some(keyword => message.includes(keyword))) {
        sintomas.push(sintoma);
      }
    });
    
    return sintomas;
  }
  
  // Formatear respuesta de diagnóstico
  formatDiagnosticResponse(diagnostico, categoria) {
    const response = [
      `🔧 **Diagnóstico: ${diagnostico.titulo}**`,
      ``,
      `⚠️ **Nivel de urgencia: ${diagnostico.nivel_urgencia}**`,
      ``,
      `🔍 **Síntomas detectados:**`,
      ...diagnostico.coincidencias.map(s => `• ${s}`),
      ``,
      `💡 **Solución recomendada:**`
    ];
    
    if (diagnostico.soluciones && Array.isArray(diagnostico.soluciones)) {
      diagnostico.soluciones.forEach((solucion, index) => {
        if (typeof solucion === 'object' && solucion.paso) {
          response.push(`${solucion.paso}. ${solucion.accion}: ${solucion.descripcion}`);
        } else {
          response.push(`${index + 1}. ${solucion}`);
        }
      });
    }
    
    response.push(``, `📞 **Para ayuda técnica llama a:**`);
    response.push(`• Soporte: (53) 31-xxxxxx ext. 102`);
    response.push(`• Emergencias: 105 o (53) 31-xxxxxx`);
    
    if (diagnostico.nivel_urgencia === 'ALTO') {
      response.push(``, `🚨 **¡EMERGENGIA! Sigue estos pasos AHORA:**`);
      response.push(`1. Cierra el suministro inmediatamente`);
      response.push(`2. Ventila el área`);
      response.push(`3. Llama al 105`);
      response.push(`4. Evacúa si es necesario`);
    }
    
    return response;
  }
  
  scrollToBottom() {
    // Usar setTimeout para asegurar que el scroll se ejecute después de renderizar
    setTimeout(() => {
      if (this.chatbotMessages) {
        this.chatbotMessages.scrollTop = this.chatbotMessages.scrollHeight;
        
        // Scroll suave para mejor experiencia
        this.chatbotMessages.scrollTo({
          top: this.chatbotMessages.scrollHeight,
          behavior: 'smooth'
        });
      }
    }, 100);
  }
  
  // Scroll solo hasta mostrar la primera palabra de la respuesta
  scrollToFirstWord() {
    setTimeout(() => {
      if (this.chatbotMessages) {
        // Obtener el último mensaje (la respuesta del bot)
        const messages = this.chatbotMessages.querySelectorAll('.chatbot-message.bot');
        const lastMessage = messages[messages.length - 1];
        
        if (lastMessage) {
          // Calcular posición actual del scroll
          const currentScroll = this.chatbotMessages.scrollTop;
          const messageTop = lastMessage.offsetTop;
          
          // Scroll solo una pequeña distancia para mostrar la primera palabra
          const targetScroll = messageTop - 50; // 50px arriba del mensaje para mostrar solo el inicio
          
          this.chatbotMessages.scrollTo({
            top: Math.max(currentScroll + 50, targetScroll),
            behavior: 'smooth'
          });
        }
      }
    }, 100);
  }
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  try {
    console.log('Chatbot: DOM loaded, initializing...');
    
    // Verificar que las dependencias estén cargadas
    if (!window.knowledgeBase) {
      console.error('Chatbot: knowledgeBase not loaded');
      return;
    }
    
    if (!window.troubleshootingSystem) {
      console.error('Chatbot: troubleshootingSystem not loaded');
      return;
    }
    
    if (!window.LearningSystem) {
      console.error('Chatbot: LearningSystem not loaded');
      return;
    }
    
    if (!window.ExternalKnowledgeSystem) {
      console.error('Chatbot: ExternalKnowledgeSystem not loaded');
      return;
    }
    
    console.log('Chatbot: All dependencies loaded, creating instance...');
    window.chatbot = new Chatbot();
    console.log('Chatbot: Initialization complete!');
  } catch (error) {
    console.error('Chatbot: Initialization failed:', error);
  }
});
