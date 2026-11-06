// Sistema de Conocimiento Externo para el Chatbot de CUPET
// Integra información de fuentes externas y APIs para respuestas más completas

class ExternalKnowledgeSystem {
  constructor() {
    this.externalSources = {
      weather: {
        enabled: true,
        apiKey: null, // Se necesitaría API key real
        baseUrl: 'https://api.openweathermap.org/data/2.5',
        location: 'Las Tunas, CU'
      },
      
      news: {
        enabled: true,
        sources: [
          'https://www.granma.cu',
          'https://www.juventudrebelde.cu',
          'https://www.trabajadores.cu'
        ],
        keywords: ['cupet', 'combustible', 'energía', 'las tunas', 'glp']
      },
      
      regulations: {
        enabled: true,
        sources: [
          'Ministerio de Energía y Minas',
          'UNE (Unión Nacional Eléctrica)',
          'Normas NC de calidad'
        ]
      },
      
      emergency: {
        enabled: true,
        services: {
          firefighters: '105',
          ambulance: '104',
          police: '106',
          civil_defense: '107'
        },
        hospitals: [
          {
            name: 'Hospital Provincial Dr. Ernesto Guevara',
            phone: '(53) 31-xxxxxx',
            address: 'Las Tunas',
            emergency: true
          },
          {
            name: 'Hospital Pediatrico',
            phone: '(53) 31-xxxxxx',
            address: 'Las Tunas',
            emergency: false
          }
        ]
      }
    };
    
    this.cache = this.loadCache();
    this.init();
  }
  
  init() {
    this.setupCacheSystem();
    this.updateExternalData();
  }
  
  // Sistema de caché
  loadCache() {
    try {
      return JSON.parse(localStorage.getItem('cupet_external_cache') || '{}');
    } catch (error) {
      console.warn('Error loading cache:', error);
      return {};
    }
  }
  
  saveCache() {
    try {
      localStorage.setItem('cupet_external_cache', JSON.stringify(this.cache));
    } catch (error) {
      console.warn('Error saving cache:', error);
    }
  }
  
  setupCacheSystem() {
    // Limpiar caché antiguo cada 24 horas
    const lastCleanup = this.cache.lastCleanup || 0;
    const now = Date.now();
    
    if (now - lastCleanup > 24 * 60 * 60 * 1000) {
      this.cleanupCache();
      this.cache.lastCleanup = now;
      this.saveCache();
    }
  }
  
  cleanupCache() {
    const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000;
    
    Object.keys(this.cache).forEach(key => {
      if (this.cache[key].timestamp && this.cache[key].timestamp < oneDayAgo) {
        delete this.cache[key];
      }
    });
  }
  
  // Actualizar datos externos
  async updateExternalData() {
    try {
      // Actualizar información del clima
      if (this.externalSources.weather.enabled) {
        await this.updateWeatherData();
      }
      
      // Actualizar noticias relevantes
      if (this.externalSources.news.enabled) {
        await this.updateNewsData();
      }
      
      // Actualizar información de emergencia
      if (this.externalSources.emergency.enabled) {
        await this.updateEmergencyData();
      }
      
    } catch (error) {
      console.warn('Error updating external data:', error);
    }
  }
  
  // Actualizar datos del clima
  async updateWeatherData() {
    const cacheKey = 'weather_data';
    const now = Date.now();
    
    // Si los datos son recientes (menos de 1 hora), usar caché
    if (this.cache[cacheKey] && (now - this.cache[cacheKey].timestamp) < 60 * 60 * 1000) {
      return this.cache[cacheKey].data;
    }
    
    try {
      // Simular datos del clima para Las Tunas
      // En producción, se usaría una API real
      const weatherData = {
        location: 'Las Tunas, Cuba',
        temperature: this.getRandomTemperature(),
        condition: this.getRandomWeatherCondition(),
        humidity: Math.floor(Math.random() * 30) + 60,
        windSpeed: Math.floor(Math.random() * 20) + 5,
        visibility: Math.floor(Math.random() * 5) + 5,
        pressure: Math.floor(Math.random() * 20) + 1000,
        timestamp: now,
        recommendations: this.getWeatherRecommendations()
      };
      
      this.cache[cacheKey] = {
        data: weatherData,
        timestamp: now
      };
      
      this.saveCache();
      return weatherData;
      
    } catch (error) {
      console.warn('Error updating weather data:', error);
      return null;
    }
  }
  
  getRandomTemperature() {
    return Math.floor(Math.random() * 15) + 25; // 25-40°C típico de Cuba
  }
  
  getRandomWeatherCondition() {
    const conditions = ['Soleado', 'Parcialmente nublado', 'Nublado', 'Lluvia ligera', 'Tormenta'];
    return conditions[Math.floor(Math.random() * conditions.length)];
  }
  
  getWeatherRecommendations() {
    const recommendations = [];
    
    // Recomendaciones basadas en condiciones
    if (Math.random() > 0.7) {
      recommendations.push('⚠️ Condiciones climáticas adversas - Precaución en operaciones externas');
    }
    
    if (Math.random() > 0.8) {
      recommendations.push('🌧️ Lluvia esperada - Proteger equipos y combustibles');
    }
    
    recommendations.push('🌡️ Temperatura alta - Mantener hidratación del personal');
    recommendations.push('💨 Revisar anclajes de equipos exteriores');
    
    return recommendations;
  }
  
  // Actualizar noticias
  async updateNewsData() {
    const cacheKey = 'news_data';
    const now = Date.now();
    
    if (this.cache[cacheKey] && (now - this.cache[cacheKey].timestamp) < 6 * 60 * 60 * 1000) {
      return this.cache[cacheKey].data;
    }
    
    try {
      // Simular noticias relevantes
      const newsData = {
        items: [
          {
            title: 'CUPET Las Tunas mantiene estable suministro de combustibles',
            summary: 'La estación de servicio garantiza disponibilidad de todos los productos',
            date: new Date().toISOString(),
            source: 'Granma',
            relevance: 'high'
          },
          {
            title: 'Nuevas medidas de seguridad en distribución de GLP',
            summary: 'Implementados protocolos actualizados para mayor seguridad ciudadana',
            date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
            source: 'Juventud Rebelde',
            relevance: 'medium'
          },
          {
            title: 'Programa de mantenimiento preventivo en estaciones de servicio',
            summary: 'CUPET anuncia inversiones en modernización de instalaciones',
            date: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
            source: 'Trabajadores',
            relevance: 'medium'
          }
        ],
        timestamp: now
      };
      
      this.cache[cacheKey] = {
        data: newsData,
        timestamp: now
      };
      
      this.saveCache();
      return newsData;
      
    } catch (error) {
      console.warn('Error updating news data:', error);
      return null;
    }
  }
  
  // Actualizar datos de emergencia
  async updateEmergencyData() {
    const cacheKey = 'emergency_data';
    const now = Date.now();
    
    if (this.cache[cacheKey] && (now - this.cache[cacheKey].timestamp) < 12 * 60 * 60 * 1000) {
      return this.cache[cacheKey].data;
    }
    
    try {
      const emergencyData = {
        services: this.externalSources.emergency.services,
        hospitals: this.externalSources.emergency.hospitals,
        shelters: [
          {
            name: 'Centro de Evacuación Municipal',
            address: 'Las Tunas, Centro',
            capacity: 500,
            phone: '(53) 31-xxxxxx'
          }
        ],
        protocols: this.getEmergencyProtocols(),
        timestamp: now
      };
      
      this.cache[cacheKey] = {
        data: emergencyData,
        timestamp: now
      };
      
      this.saveCache();
      return emergencyData;
      
    } catch (error) {
      console.warn('Error updating emergency data:', error);
      return null;
    }
  }
  
  getEmergencyProtocols() {
    return {
      hurricane: [
        '1. Almacenar cilindros GLP en lugar seguro y elevado',
        '2. Tener extintores y equipos de emergencia listos',
        '3. Mantener comunicación con autoridades locales',
        '4. Tener plan de evacuación del personal'
      ],
      fire: [
        '1. Conocer ubicación de extintores y salidas',
        '2. Practicar rutas de evacuación mensualmente',
        '3. Mantener equipos de protección personal',
        '4. Tener números de emergencia visibles'
      ],
      spill: [
        '1. Contener derrame con materiales absorbentes',
        '2. Evitar que llegue a drenajes o cuerpos de agua',
        '3. Usar equipo de protección personal',
        '4. Reportar a autoridades ambientales'
      ]
    };
  }
  
  // Obtener información del clima
  async getWeatherInfo() {
    const weatherData = await this.updateWeatherData();
    
    if (!weatherData) {
      return ['Información del clima no disponible temporalmente'];
    }
    
    return [
      `🌤️ **Clima en ${weatherData.location}:**`,
      `• Temperatura: ${weatherData.temperature}°C`,
      `• Condición: ${weatherData.condition}`,
      `• Humedad: ${weatherData.humidity}%`,
      `• Viento: ${weatherData.windSpeed} km/h`,
      `• Visibilidad: ${weatherData.visibility} km`,
      '',
      '📋 **Recomendaciones:**',
      ...weatherData.recommendations
    ];
  }
  
  // Obtener noticias relevantes
  async getRelevantNews() {
    const newsData = await this.updateNewsData();
    
    if (!newsData || !newsData.items) {
      return ['No hay noticias relevantes disponibles'];
    }
    
    const response = ['📰 **Noticias Relevantes:**', ''];
    
    newsData.items.forEach(news => {
      const date = new Date(news.date).toLocaleDateString('es-CU');
      response.push(`**${news.title}**`);
      response.push(`• ${news.summary}`);
      response.push(`• Fuente: ${news.source} - ${date}`);
      response.push('');
    });
    
    return response;
  }
  
  // Obtener información de emergencia
  async getEmergencyInfo(emergencyType = 'general') {
    const emergencyData = await this.updateEmergencyData();
    
    if (!emergencyData) {
      return ['Información de emergencia no disponible'];
    }
    
    const response = [
      '🚨 **Información de Emergencia - Las Tunas:**',
      '',
      '📞 **Servicios de Emergencia:**'
    ];
    
    Object.entries(emergencyData.services).forEach(([service, number]) => {
      const serviceName = this.formatEmergencyService(service);
      response.push(`• ${serviceName}: ${number}`);
    });
    
    response.push('');
    response.push('🏥 **Hospitales Cercanos:**');
    
    emergencyData.hospitals.forEach(hospital => {
      response.push(`• ${hospital.name}: ${hospital.phone}`);
      if (hospital.emergency) {
        response.push(`  ✅ Emergencias 24/7`);
      }
    });
    
    if (emergencyType !== 'general' && emergencyData.protocols[emergencyType]) {
      response.push('');
      response.push(`📋 **Protocolo para ${this.formatEmergencyType(emergencyType)}:**`);
      response.push(...emergencyData.protocols[emergencyType]);
    }
    
    return response;
  }
  
  formatEmergencyService(service) {
    const services = {
      firefighters: 'Bomberos',
      ambulance: 'Ambulancia',
      police: 'Policía',
      civil_defense: 'Defensa Civil'
    };
    
    return services[service] || service;
  }
  
  formatEmergencyType(type) {
    const types = {
      hurricane: 'Huracán',
      fire: 'Incendio',
      spill: 'Derrame'
    };
    
    return types[type] || type;
  }
  
  // Buscar información externa
  async searchExternalInfo(query) {
    const lowerQuery = query.toLowerCase();
    
    // Búsqueda de clima
    if (lowerQuery.includes('clima') || lowerQuery.includes('tiempo') || lowerQuery.includes('temperatura')) {
      return await this.getWeatherInfo();
    }
    
    // Búsqueda de noticias
    if (lowerQuery.includes('noticias') || lowerQuery.includes('novedades') || lowerQuery.includes('actualidad')) {
      return await this.getRelevantNews();
    }
    
    // Búsqueda de emergencia
    if (lowerQuery.includes('emergencia') || lowerQuery.includes('urgencia') || lowerQuery.includes('hospital')) {
      return await this.getEmergencyInfo();
    }
    
    // Búsqueda de regulaciones
    if (lowerQuery.includes('norma') || lowerQuery.includes('regulación') || lowerQuery.includes('seguridad')) {
      return this.getRegulationsInfo();
    }
    
    return null;
  }
  
  // Obtener información de regulaciones
  getRegulationsInfo() {
    return [
      '📋 **Normativas y Regulaciones Aplicables:**',
      '',
      '⛽ **Combustibles:**',
      '• NC 192:2018 - Productos derivados del petróleo',
      '• Normas de almacenamiento y transporte',
      '• Regulaciones de calidad y especificaciones',
      '',
      '🔥 **GLP:**',
      '• NC 191:2018 - Gas licuado de petróleo',
      '• NC 447:2018 - Cilindros para GLP',
      '• Normas de seguridad industrial',
      '',
      '🛡️ **Seguridad:**',
      '• Normas OSHA para estaciones de servicio',
      '• Protocolos de emergencia',
      '• Certificaciones de calidad ISO 9001',
      '',
      '📞 **Para más información:**',
      '• Ministerio de Energía y Minas',
      '• UNE (Unión Nacional Eléctrica)',
      '• Delegación provincial de Las Tunas'
    ];
  }
  
  // Obtener consejos de seguridad basados en condiciones externas
  async getSafetyRecommendations() {
    const weatherData = await this.updateWeatherData();
    const recommendations = [
      '🛡️ **Consejos de Seguridad Actualizados:**',
      '',
      '⛽ **Operaciones con Combustibles:**',
      '• Verificar condiciones climáticas antes de operaciones externas',
      '• Mantener distancia mínima de seguridad durante tormentas',
      '• Usar equipo de protección personal adecuado',
      '',
      '🔥 **Manejo de GLP:**',
      '• Inspeccionar conexiones regularmente',
      '• Mantener ventilación adecuada en áreas de almacenamiento',
      '• Tener extintores tipo ABC cercanos',
      '',
      '🌤️ **Condiciones Climáticas:**'
    ];
    
    if (weatherData) {
      if (weatherData.temperature > 35) {
        recommendations.push('• Alta temperatura: Programar operaciones en horas más frescas');
        recommendations.push('• Mantener hidratación constante del personal');
      }
      
      if (weatherData.condition.includes('lluvia') || weatherData.condition.includes('tormenta')) {
        recommendations.push('• Lluvia/Tormenta: Suspender operaciones externas');
        recommendations.push('• Proteger equipos y materiales de la lluvia');
        recommendations.push('• Verificar drenaje de áreas de almacenamiento');
      }
    }
    
    recommendations.push('');
    recommendations.push('📞 **En caso de emergencia:**');
    recommendations.push('• Bomberos: 105');
    recommendations.push('• CUPET Emergencia: (53) 31-xxxxxx');
    
    return recommendations;
  }
  
  // Obtener información de contacto actualizada
  getContactInfo() {
    return [
      '📞 **Información de Contacto Actualizada:**',
      '',
      '🏭 **CUPET Las Tunas:**',
      '• Dirección: Carretera Central km 585',
      '• Teléfono: (53) 31-xxxxxx',
      '• WhatsApp: +53 5xxxxxxx',
      '• Email: info@cupetlastunas.cu',
      '• Web: www.cupetlasunas.cu',
      '',
      '🕐 **Horarios de Atención:**',
      '• Lunes a Viernes: 6:00 AM - 10:00 PM',
      '• Sábados: 6:00 AM - 8:00 PM',
      '• Domingos: 7:00 AM - 6:00 PM',
      '• Emergencias: 24/7',
      '',
      '📧 **Departamentos:**',
      '• Ventas: ventas@cupet.cu',
      '• Soporte Técnico: soporte@cupet.cu',
      '• GLP: glp@cupet.cu',
      '• Empresas: empresas@cupet.cu',
      '',
      '📱 **Redes Sociales:**',
      '• Facebook: @CupetLasTunas',
      '• Twitter: @CupetLT',
      '• Instagram: @cupetlastunas'
    ];
  }
  
  // Obtener información de precios actualizada
  async getPricingInfo() {
    // Simular precios actualizados
    const pricingData = {
      combustibles: {
        'gasolina_regular': '$1.25 CUP/litro',
        'gasolina_especial': '$1.45 CUP/litro',
        'diesel_estandar': '$1.15 CUP/litro',
        'diesel_premium': '$1.35 CUP/litro'
      },
      glp: {
        'cilindro_10kg': '$3.50 CUP',
        'cilindro_20kg': '$6.80 CUP',
        'cilindro_43kg': '$14.20 CUP'
      },
      lubricantes: {
        'aceite_10w40_1l': '$2.80 CUP',
        'aceite_10w40_4l': '$10.50 CUP',
        'aceite_15w40_1l': '$2.60 CUP',
        'aceite_15w40_4l': '$9.80 CUP'
      },
      lastUpdated: new Date().toISOString()
    };
    
    const response = [
      '💰 **Información de Precios Actualizada:**',
      `*Última actualización: ${new Date().toLocaleDateString('es-CU')}*`,
      '',
      '⛽ **Combustibles (por litro):**'
    ];
    
    Object.entries(pricingData.combustibles).forEach(([key, price]) => {
      const name = this.formatProductName(key);
      response.push(`• ${name}: ${price}`);
    });
    
    response.push('', '🔥 **GLP (por cilindro):**');
    Object.entries(pricingData.glp).forEach(([key, price]) => {
      const name = this.formatProductName(key);
      response.push(`• ${name}: ${price}`);
    });
    
    response.push('', '🛢️ **Lubricantes:**');
    Object.entries(pricingData.lubricantes).forEach(([key, price]) => {
      const name = this.formatProductName(key);
      response.push(`• ${name}: ${price}`);
    });
    
    response.push('', '💎 **Descuentos Disponibles:**');
    response.push('• 5% clientes frecuentes');
    response.push('• 10% empresas y cooperativas');
    response.push('• 15% pedidos mayores a 1000L');
    
    return response;
  }
  
  formatProductName(key) {
    const names = {
      'gasolina_regular': 'Gasolina Regular',
      'gasolina_especial': 'Gasolina Especial',
      'diesel_estandar': 'Diésel Estándar',
      'diesel_premium': 'Diésel Premium',
      'cilindro_10kg': 'Cilindro 10kg',
      'cilindro_20kg': 'Cilindro 20kg',
      'cilindro_43kg': 'Cilindro 43kg',
      'aceite_10w40_1l': 'Aceite 10W-40 (1L)',
      'aceite_10w40_4l': 'Aceite 10W-40 (4L)',
      'aceite_15w40_1l': 'Aceite 15W-40 (1L)',
      'aceite_15w40_4l': 'Aceite 15W-40 (4L)'
    };
    
    return names[key] || key;
  }
}

// Exportar el sistema de conocimiento externo
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ExternalKnowledgeSystem;
} else {
  window.ExternalKnowledgeSystem = ExternalKnowledgeSystem;
}
