// Sistema de Aprendizaje y Mejora Continua para el Chatbot de CUPET
// Permite que el bot aprenda de las conversaciones y mejore sus respuestas

class LearningSystem {
  constructor() {
    this.conversationHistory = this.loadFromStorage('conversationHistory') || [];
    this.learnedResponses = this.loadFromStorage('learnedResponses') || {};
    this.userFeedback = this.loadFromStorage('userFeedback') || {};
    this.emergencyProtocols = this.loadFromStorage('emergencyProtocols') || this.getDefaultEmergencyProtocols();
    this.externalKnowledge = this.loadFromStorage('externalKnowledge') || {};
    
    this.init();
  }
  
  init() {
    // Configurar sistema de aprendizaje
    this.setupLearningMechanisms();
    this.updateEmergencyProtocols();
    this.syncExternalKnowledge();
  }
  
  // Sistema de almacenamiento local mejorado
  loadFromStorage(key) {
    if (!this.hasLocalStorage()) {
      console.warn(`localStorage not available for ${key}`);
      return null;
    }
    
    try {
      const data = localStorage.getItem(`cupet_${key}`);
      if (!data) return null;
      
      // Verificar tamaño máximo (5MB por dominio)
      const dataSize = new Blob([data]).size;
      if (dataSize > 1024 * 1024) { // 1MB máximo por item
        console.warn(`Data size for ${key} exceeds 1MB, clearing...`);
        localStorage.removeItem(`cupet_${key}`);
        return null;
      }
      
      const parsed = JSON.parse(data);
      
      // Validar estructura de datos
      if (!this.validateStorageData(parsed, key)) {
        console.warn(`Invalid data structure for ${key}, clearing...`);
        localStorage.removeItem(`cupet_${key}`);
        return null;
      }
      
      return parsed;
      
    } catch (error) {
      if (error.name === 'QuotaExceededError') {
        console.warn(`Storage quota exceeded for ${key}, cleaning old data...`);
        this.cleanupStorage();
        return null;
      } else if (error instanceof SyntaxError) {
        console.warn(`Invalid JSON for ${key}, clearing...`);
        localStorage.removeItem(`cupet_${key}`);
        return null;
      } else {
        console.warn(`Error loading ${key} from storage:`, error);
        return null;
      }
    }
  }
  
  // Verificar disponibilidad de localStorage
  hasLocalStorage() {
    try {
      const test = '__storage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }
  
  // Validar estructura de datos
  validateStorageData(data, key) {
    if (!data || typeof data !== 'object') return false;
    
    // Validaciones específicas por tipo de dato
    switch (key) {
      case 'conversationHistory':
        return Array.isArray(data) && data.every(item => 
          item.timestamp && item.userMessage && item.botResponse
        );
      case 'learnedResponses':
        return typeof data === 'object' && !Array.isArray(data);
      case 'userFeedback':
        return typeof data === 'object' && !Array.isArray(data);
      default:
        return true;
    }
  }
  
  // Limpiar almacenamiento antiguo
  cleanupStorage() {
    const keys = Object.keys(localStorage);
    const cupetKeys = keys.filter(key => key.startsWith('cupet_'));
    
    // Ordenar por tamaño y eliminar los más grandes primero
    cupetKeys.sort((a, b) => {
      const sizeA = new Blob([localStorage.getItem(a) || '']).size;
      const sizeB = new Blob([localStorage.getItem(b) || '']).size;
      return sizeB - sizeA;
    });
    
    // Eliminar hasta el 50% de los datos
    const toRemove = Math.ceil(cupetKeys.length * 0.5);
    for (let i = 0; i < toRemove; i++) {
      localStorage.removeItem(cupetKeys[i]);
    }
    
    console.log(`Cleaned up ${toRemove} storage items`);
  }
  
  saveToStorage(key, data) {
    if (!this.hasLocalStorage()) {
      console.warn(`localStorage not available for ${key}`);
      return false;
    }
    
    try {
      // Validar datos antes de guardar
      if (!this.validateStorageData(data, key)) {
        console.warn(`Invalid data structure for ${key}, not saving`);
        return false;
      }
      
      const serialized = JSON.stringify(data);
      const dataSize = new Blob([serialized]).size;
      
      // Verificar tamaño (máximo 1MB por item)
      if (dataSize > 1024 * 1024) {
        console.warn(`Data size for ${key} exceeds 1MB, not saving`);
        return false;
      }
      
      localStorage.setItem(`cupet_${key}`, serialized);
      return true;
      
    } catch (error) {
      if (error.name === 'QuotaExceededError') {
        console.warn(`Storage quota exceeded for ${key}, cleaning up...`);
        this.cleanupStorage();
        // Reintentar una vez
        try {
          localStorage.setItem(`cupet_${key}`, JSON.stringify(data));
          return true;
        } catch (retryError) {
          console.error(`Still cannot save ${key} after cleanup`, retryError);
          return false;
        }
      } else {
        console.warn(`Error saving ${key} to storage:`, error);
        return false;
      }
    }
  }
  
  // Registrar conversación para aprendizaje
  recordConversation(userMessage, botResponse, category, userSatisfaction = null) {
    const conversation = {
      timestamp: new Date().toISOString(),
      userMessage: userMessage.toLowerCase(),
      botResponse: botResponse,
      category: category,
      userSatisfaction: userSatisfaction,
      sessionId: this.generateSessionId()
    };
    
    this.conversationHistory.push(conversation);
    
    // Mantener solo las últimas 1000 conversaciones para no sobrecargar
    if (this.conversationHistory.length > 1000) {
      this.conversationHistory = this.conversationHistory.slice(-1000);
    }
    
    this.saveToStorage('conversationHistory', this.conversationHistory);
    
    // Procesar aprendizaje de esta conversación
    this.processLearning(conversation);
  }
  
  // Procesar aprendizaje de la conversación
  processLearning(conversation) {
    const { userMessage, botResponse, category, userSatisfaction } = conversation;
    
    // Si el usuario está satisfecho, reforzar esta respuesta
    if (userSatisfaction === 'satisfied') {
      this.reinforceResponse(userMessage, botResponse, category);
    }
    
    // Si el usuario no está satisfecho, marcar para mejora
    if (userSatisfaction === 'unsatisfied') {
      this.markForImprovement(userMessage, botResponse, category);
    }
    
    // Detectar patrones y nuevas preguntas
    this.detectPatterns(userMessage, category);
  }
  
  // Reforzar respuestas exitosas
  reinforceResponse(userMessage, botResponse, category) {
    const key = this.generateLearningKey(userMessage, category);
    
    if (!this.learnedResponses[key]) {
      this.learnedResponses[key] = {
        patterns: [],
        responses: [],
        successCount: 0,
        totalCount: 0
      };
    }
    
    const learning = this.learnedResponses[key];
    learning.patterns.push(userMessage);
    learning.responses.push(botResponse);
    learning.successCount++;
    learning.totalCount++;
    
    // Mantener solo las últimas 5 respuestas exitosas
    if (learning.responses.length > 5) {
      learning.responses = learning.responses.slice(-5);
    }
    
    this.saveToStorage('learnedResponses', this.learnedResponses);
  }
  
  // Marcar para mejora
  markForImprovement(userMessage, botResponse, category) {
    const key = this.generateLearningKey(userMessage, category);
    
    if (!this.learnedResponses[key]) {
      this.learnedResponses[key] = {
        patterns: [],
        responses: [],
        successCount: 0,
        totalCount: 0
      };
    }
    
    this.learnedResponses[key].totalCount++;
    this.saveToStorage('learnedResponses', this.learnedResponses);
  }
  
  // Detectar patrones en las preguntas
  detectPatterns(userMessage, category) {
    // Extraer palabras clave y entidades
    const entities = this.extractEntities(userMessage);
    const keywords = this.extractKeywords(userMessage);
    
    // Buscar patrones similares
    const similarPatterns = this.findSimilarPatterns(userMessage, category);
    
    // Si es un nuevo patrón, agregarlo para aprendizaje futuro
    if (similarPatterns.length === 0) {
      this.addNewPattern(userMessage, entities, keywords, category);
    }
  }
  
  // Extraer entidades (números, fechas, lugares)
  extractEntities(message) {
    const entities = {
      numbers: message.match(/\b\d+\b/g) || [],
      dates: message.match(/\b\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}\b/g) || [],
      phones: message.match(/\b\d{3,4}[-\s]?\d{3,4}[-\s]?\d{4}\b/g) || [],
      emails: message.match(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g) || [],
      locations: this.extractLocations(message),
      products: this.extractProducts(message)
    };
    
    return entities;
  }
  
  // Extraer palabras clave
  extractKeywords(message) {
    const stopWords = ['el', 'la', 'de', 'que', 'y', 'en', 'un', 'para', 'con', 'por', 'las', 'los', 'del', 'se', 'las', 'lo', 'como'];
    const words = message.toLowerCase().split(/\s+/);
    
    return words.filter(word => 
      word.length > 2 && 
      !stopWords.includes(word) &&
      !/^\d+$/.test(word)
    );
  }
  
  // Extraer ubicaciones
  extractLocations(message) {
    const locations = ['las tunas', 'cupet', 'carretera central', 'hospital provincial', 'centro'];
    const found = [];
    
    locations.forEach(location => {
      if (message.toLowerCase().includes(location)) {
        found.push(location);
      }
    });
    
    return found;
  }
  
  // Extraer productos
  extractProducts(message) {
    const products = ['gasolina', 'diesel', 'glp', 'aceite', 'lubricante', 'keroseno', 'cilindro'];
    const found = [];
    
    products.forEach(product => {
      if (message.toLowerCase().includes(product)) {
        found.push(product);
      }
    });
    
    return found;
  }
  
  // Encontrar patrones similares
  findSimilarPatterns(message, category) {
    const similar = [];
    const threshold = 0.7; // Umbral de similitud
    
    this.conversationHistory.forEach(conv => {
      if (conv.category === category) {
        const similarity = this.calculateSimilarity(message, conv.userMessage);
        if (similarity >= threshold) {
          similar.push({
            message: conv.userMessage,
            response: conv.botResponse,
            similarity: similarity
          });
        }
      }
    });
    
    return similar.sort((a, b) => b.similarity - a.similarity);
  }
  
  // Calcular similitud entre mensajes
  calculateSimilarity(msg1, msg2) {
    const words1 = this.extractKeywords(msg1);
    const words2 = this.extractKeywords(msg2);
    
    const intersection = words1.filter(word => words2.includes(word));
    const union = [...new Set([...words1, ...words2])];
    
    return union.length > 0 ? intersection.length / union.length : 0;
  }
  
  // Agregar nuevo patrón
  addNewPattern(message, entities, keywords, category) {
    const pattern = {
      message: message,
      entities: entities,
      keywords: keywords,
      category: category,
      timestamp: new Date().toISOString(),
      count: 1
    };
    
    // Guardar para análisis futuro
    if (!this.externalKnowledge.newPatterns) {
      this.externalKnowledge.newPatterns = [];
    }
    
    this.externalKnowledge.newPatterns.push(pattern);
    this.saveToStorage('externalKnowledge', this.externalKnowledge);
  }
  
  // Generar clave de aprendizaje
  generateLearningKey(message, category) {
    const keywords = this.extractKeywords(message).slice(0, 3);
    return `${category}_${keywords.join('_')}`;
  }
  
  // Generar ID de sesión
  generateSessionId() {
    return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }
  
  // Obtener respuesta aprendida
  getLearnedResponse(message, category) {
    const key = this.generateLearningKey(message, category);
    const learning = this.learnedResponses[key];
    
    if (learning && learning.responses.length > 0) {
      // Seleccionar la respuesta con mayor éxito
      const successRate = learning.successCount / learning.totalCount;
      
      if (successRate >= 0.7) { // 70% de éxito o más
        // Retornar la respuesta más reciente exitosa
        return learning.responses[learning.responses.length - 1];
      }
    }
    
    return null;
  }
  
  // Sistema de retroalimentación
  recordFeedback(message, response, feedback, category) {
    const feedbackData = {
      timestamp: new Date().toISOString(),
      message: message,
      response: response,
      feedback: feedback, // 'positive', 'negative', 'neutral'
      category: category,
      sessionId: this.generateSessionId()
    };
    
    if (!this.userFeedback[category]) {
      this.userFeedback[category] = [];
    }
    
    this.userFeedback[category].push(feedbackData);
    
    // Mantener solo los últimos 100 feedbacks por categoría
    if (this.userFeedback[category].length > 100) {
      this.userFeedback[category] = this.userFeedback[category].slice(-100);
    }
    
    this.saveToStorage('userFeedback', this.userFeedback);
    
    // Procesar feedback para aprendizaje
    this.processFeedback(feedbackData);
  }
  
  // Procesar retroalimentación
  processFeedback(feedbackData) {
    const { message, response, feedback, category } = feedbackData;
    
    if (feedback === 'positive') {
      this.reinforceResponse(message, response, category);
    } else if (feedback === 'negative') {
      this.markForImprovement(message, response, category);
    }
  }
  
  // Obtener protocolos de emergencia por defecto
  getDefaultEmergencyProtocols() {
    return {
      gas_leak: {
        priority: 'critical',
        steps: [
          '1. CERRAR inmediatamente la válvula del cilindro',
          '2. ABRIR ventanas y puertas para ventilación',
          '3. EVITAR cualquier fuente de chispa (luces, interruptores, teléfonos)',
          '4. EVACUAR el área inmediatamente',
          '5. LLAMAR al 105 (Bomberos) desde lugar seguro',
          '6. LLAMAR a CUPET emergencia: (53) 31-xxxxxx'
        ],
        warnings: [
          'NO enciendas luces',
          'NO uses interruptores eléctricos',
          'NO fumes ni uses llamas',
          'NO uses teléfono dentro del área'
        ],
        contacts: {
          emergency: '105',
          cupet: '(53) 31-xxxxxx',
          ambulance: '104'
        },
        lastUpdated: new Date().toISOString()
      },
      
      fire: {
        priority: 'critical',
        steps: [
          '1. ACTIVAR alarma de incendio si está disponible',
          '2. LLAMAR al 105 inmediatamente',
          '3. EVACUAR personal y clientes',
          '4. USAR extintor si el fuego es pequeño y controlable',
          '5. CERRAR suministro de combustible si es seguro',
          '6. ESPERar a los bomberos en punto de reunión'
        ],
        warnings: [
          'NO intentes apagar fuegos grandes',
          'NO uses agua en fuegos de combustible',
          'NO bloquear salidas de emergencia'
        ],
        contacts: {
          emergency: '105',
          cupet: '(53) 31-xxxxxx'
        }
      },
      
      medical_emergency: {
        priority: 'high',
        steps: [
          '1. EVALUAR la situación y nivel de conciencia',
          '2. LLAMAR al 104 (Ambulancia) si es necesario',
          '3. APLICAR primeros auxilios básicos si estás capacitado',
          '4. MANTENER a la persona calmada y cómoda',
          '5. NO mover si hay sospecha de lesión espinal'
        ],
        warnings: [
          'NO administres medicamentos sin prescripción',
          'NO intentes mover a personas con lesiones graves'
        ],
        contacts: {
          ambulance: '104',
          emergency: '105'
        }
      },
      
      accident: {
        priority: 'high',
        steps: [
          '1. ASEGURAR la zona para evitar más accidentes',
          '2. LLAMAR al 105 si hay heridos',
          '3. LLAMAR al 106 (Policía)',
          '4. DOCUMENTAR con fotos si es seguro',
          '5. NO mover vehículos si hay heridos',
          '6. ESPERAR a las autoridades'
        ],
        warnings: [
          'NO discutas sobre culpabilidad',
          'NO abandones el lugar'
        ],
        contacts: {
          police: '106',
          emergency: '105',
          cupet: '(53) 31-xxxxxx'
        }
      }
    };
  }
  
  // Actualizar protocolos de emergencia con información real
  updateEmergencyProtocols() {
    // Aquí se podrían actualizar los protocolos con información real
    // Por ahora, mantener los protocolos por defecto
    
    // Agregar información específica de CUPET Las Tunas
    this.emergencyProtocols.cupet_specific = {
      location: 'Carretera Central km 585, Las Tunas',
      coordinates: '20.9617° N, 76.7520° O',
      nearest_hospital: 'Hospital Provincial Dr. Ernesto Guevara',
      hospital_phone: '(53) 31-xxxxxx',
      fire_station: 'Estación de Bomberos Las Tunas',
      police_station: 'Policía Nacional Revolucionaria Las Tunas'
    };
    
    this.saveToStorage('emergencyProtocols', this.emergencyProtocols);
  }
  
  // Sincronizar conocimiento externo
  syncExternalKnowledge() {
    // Aquí se podría implementar sincronización con APIs externas
    // Por ahora, agregar conocimiento básico de seguridad
    
    this.externalKnowledge.safety_tips = {
      glp_safety: [
        'Mantener los cilindros en posición vertical',
        'No exponer los cilindros al sol directo',
        'Revisar conexiones mensualmente con agua y jabón',
        'No sobrecargar los cilindros más allá de su capacidad',
        'Mantener distancia de fuentes de calor (mínimo 2 metros)',
        'Usar solo mangueras y reguladores certificados'
      ],
      
      fuel_safety: [
        'No fumar cerca de áreas de carga',
        'Apagar el motor del vehículo durante la carga',
        'Usar contenedores certificados para transporte',
        'No llenar el tanque al 100% en días calurosos',
        'Mantener extintores de polvo químico cerca',
        'Evitar derrames y limpiar inmediatamente si ocurren'
      ],
      
      general_safety: [
        'Conocer la ubicación de extintores y salidas de emergencia',
        'Mantener las áreas de paso despejadas',
        'Reportar cualquier condición insegura inmediatamente',
        'Participar en simulacros de emergencia',
        'Mantener números de emergencia a la mano'
      ]
    };
    
    this.saveToStorage('externalKnowledge', this.externalKnowledge);
  }
  
  // Obtener protocolo de emergencia específico
  getEmergencyProtocol(emergencyType) {
    const protocol = this.emergencyProtocols[emergencyType];
    
    if (!protocol) {
      // Si no se encuentra el protocolo específico, devolver protocolo general
      return {
        priority: 'high',
        steps: [
          '1. MANTENER la calma',
          '2. EVALUAR la situación',
          '3. LLAMAR al número de emergencia apropiado',
          '4. SEGUIR las instrucciones del operador',
          '5. ESPERAR ayuda profesional'
        ],
        contacts: {
          emergency: '105',
          cupet: '(53) 31-xxxxxx'
        }
      };
    }
    
    return protocol;
  }
  
  // Detectar emergencia en el mensaje
  detectEmergency(message) {
    const emergencyKeywords = {
      gas_leak: ['fuga', 'escape', 'olor a gas', 'gas huele', 'gotea gas', 'pierde gas'],
      fire: ['fuego', 'incendio', 'quema', 'ardiendo', 'llamas', 'chispas'],
      medical: ['ataque', 'dolor de pecho', 'desmayo', 'herido', 'sangra', 'accidente', 'lesión'],
      accident: ['choque', 'colisión', 'accidente', 'volcó', 'atropelló', 'impacto']
    };
    
    const lowerMessage = message.toLowerCase();
    
    for (const [type, keywords] of Object.entries(emergencyKeywords)) {
      if (keywords.some(keyword => lowerMessage.includes(keyword))) {
        return {
          type: type,
          priority: this.emergencyProtocols[type]?.priority || 'high',
          detected: true
        };
      }
    }
    
    return { detected: false };
  }
  
  // Obtener respuesta de emergencia
  getEmergencyResponse(emergencyType) {
    const protocol = this.getEmergencyProtocol(emergencyType);
    
    const response = [
      `🚨 **EMERGENCIA DETECTADA: ${this.formatEmergencyType(emergencyType)}**`,
      '',
      `⚠️ **Prioridad: ${protocol.priority.toUpperCase()}**`,
      '',
      '🔥 **Acciones INMEDIATAS:**',
      ...protocol.steps,
      ''
    ];
    
    if (protocol.warnings) {
      response.push('⛔ **ADVERTENCIAS IMPORTANTES:**');
      response.push(...protocol.warnings);
      response.push('');
    }
    
    response.push('📞 **Contactos de Emergencia:**');
    
    if (protocol.contacts) {
      Object.entries(protocol.contacts).forEach(([service, number]) => {
        const serviceName = this.formatServiceName(service);
        response.push(`• ${serviceName}: ${number}`);
      });
    }
    
    response.push('');
    response.push('📍 **Información de Ubicación:**');
    response.push(`• CUPET Las Tunas: ${this.emergencyProtocols.cupet_specific?.location || 'Carretera Central km 585'}`);
    response.push(`• Hospital más cercano: ${this.emergencyProtocols.cupet_specific?.nearest_hospital || 'Hospital Provincial'}`);
    
    return response;
  }
  
  // Formatear tipo de emergencia
  formatEmergencyType(type) {
    const types = {
      gas_leak: 'FUGA DE GAS',
      fire: 'INCENDIO',
      medical_emergency: 'EMERGENCIA MÉDICA',
      accident: 'ACCIDENTE'
    };
    
    return types[type] || 'EMERGENCIA';
  }
  
  // Formatear nombre de servicio
  formatServiceName(service) {
    const services = {
      emergency: 'Bomberos (105)',
      cupet: 'CUPET Emergencia',
      ambulance: 'Ambulancia (104)',
      police: 'Policía (106)'
    };
    
    return services[service] || service;
  }
  
  // Obtener estadísticas de aprendizaje
  getLearningStats() {
    const stats = {
      totalConversations: this.conversationHistory.length,
      learnedResponses: Object.keys(this.learnedResponses).length,
      averageSuccessRate: this.calculateAverageSuccessRate(),
      mostAskedCategories: this.getMostAskedCategories(),
      emergencyProtocols: Object.keys(this.emergencyProtocols).length,
      lastUpdate: new Date().toISOString()
    };
    
    return stats;
  }
  
  // Calcular tasa de éxito promedio
  calculateAverageSuccessRate() {
    const responses = Object.values(this.learnedResponses);
    
    if (responses.length === 0) return 0;
    
    const totalSuccess = responses.reduce((sum, resp) => {
      return sum + (resp.totalCount > 0 ? resp.successCount / resp.totalCount : 0);
    }, 0);
    
    return (totalSuccess / responses.length * 100).toFixed(2);
  }
  
  // Obtener categorías más preguntadas
  getMostAskedCategories() {
    const categoryCount = {};
    
    this.conversationHistory.forEach(conv => {
      categoryCount[conv.category] = (categoryCount[conv.category] || 0) + 1;
    });
    
    return Object.entries(categoryCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([category, count]) => ({ category, count }));
  }
  
  // Configurar mecanismos de aprendizaje
  setupLearningMechanisms() {
    // Configurar intervalos para sincronización automática
    setInterval(() => {
      this.syncExternalKnowledge();
    }, 24 * 60 * 60 * 1000); // Cada 24 horas
    
    // Configurar limpieza de datos antiguos
    setInterval(() => {
      this.cleanupOldData();
    }, 7 * 24 * 60 * 60 * 1000); // Cada 7 días
  }
  
  // Limpiar datos antiguos
  cleanupOldData() {
    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    
    // Limpiar conversaciones antiguas
    this.conversationHistory = this.conversationHistory.filter(conv => 
      new Date(conv.timestamp) > oneWeekAgo
    );
    
    // Limpiar feedback antiguo
    Object.keys(this.userFeedback).forEach(category => {
      this.userFeedback[category] = this.userFeedback[category].filter(feedback =>
        new Date(feedback.timestamp) > oneWeekAgo
      );
    });
    
    this.saveToStorage('conversationHistory', this.conversationHistory);
    this.saveToStorage('userFeedback', this.userFeedback);
  }
}

// Exportar el sistema de aprendizaje
if (typeof module !== 'undefined' && module.exports) {
  module.exports = LearningSystem;
} else {
  window.LearningSystem = LearningSystem;
}
