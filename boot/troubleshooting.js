// Sistema de Resolución de Problemas Comunes para CUPET Las Tunas
// Guías paso a paso para ayudar a los usuarios con problemas frecuentes

const troubleshootingSystem = {
  // PROBLEMAS DE GLP - SOLUCIONES DETALLADAS
  glp: {
    // FUGAS DE GAS
    fuga_gas: {
      titulo: "Fuga de Gas - Emergencia",
      nivel_urgencia: "ALTO",
      sintomas: [
        "Olor fuerte a gas",
        "Sonido de silbido constante",
        "Manómetro bajando rápidamente",
        "Mareos o dolor de cabeza"
      ],
      accion_inmediata: [
        {
          paso: 1,
          accion: "CERRAR SUMINISTRO",
          descripcion: "Cierra la válvula principal del cilindro girando en sentido horario hasta tope",
          tiempo: "5 segundos"
        },
        {
          paso: 2,
          accion: "VENTILAR",
          descripcion: "Abre todas las ventanas y puertas para crear corriente de aire",
          tiempo: "10 segundos"
        },
        {
          paso: 3,
          accion: "EVITAR CHISPAS",
          descripcion: "No enciendas luces, no uses interruptores, no fumes, no uses teléfono",
          tiempo: "Inmediato"
        },
        {
          paso: 4,
          accion: "EVACUAR",
          descripcion: "Sal del área si el olor es muy fuerte. Lleva a todos contigo",
          tiempo: "30 segundos"
        },
        {
          paso: 5,
          accion: "LLAMAR EMERGENCIA",
          descripcion: "Desde un lugar seguro, llama al 105 (Bomberos) o (53) 31-xxxxxx",
          tiempo: "Inmediato"
        }
      ],
      solucion_tecnica: [
        {
          paso: 1,
          accion: "REVISIÓN VISUAL",
          descripcion: "Busca conexiones flojas, mangueras dañadas o grietas en el cilindro",
          herramientas: "Linterna, guantes"
        },
        {
          paso: 2,
          accion: "PRUEBA DE JABÓN",
          descripcion: "Aplica agua con jabón en conexiones. Burbujas indican fuga",
          materiales: "Agua, jabón líquido, cepillo"
        },
        {
          paso: 3,
          accion: "APRETAR CONEXIONES",
          descripcion: "Usa llave adecuada para apretar conexiones flojas (sin exceder)",
          herramientas: "Llave de tubo o ajustable"
        },
        {
          paso: 4,
          accion: "REEMPLAZAR PARTES",
          descripcion: "Cambia juntas, sellos o mangueras dañadas",
          materiales: "Repuestos originales"
        }
      ],
      prevencion: [
        "Revisión mensual de conexiones",
        "No sobrecargar el cilindro",
        "Almacenar en lugar ventilado",
        "Evitar golpes y caídas",
        "Usar solo repuestos certificados"
      ]
    },

    // LLAMA BAJA O COLOR ANORMAL
    llama_baja: {
      titulo: "Llama Baja o Amarilla",
      nivel_urgencia: "MEDIO",
      sintomas: [
        "Llama pequeña o amarilla",
        "Cocción muy lenta de alimentos",
        "Ruido en el quemador",
        "Olor a gas sin quemar"
      ],
      causas_posibles: [
        "Bajo nivel de gas en cilindro",
        "Obstrucción en boquillas del quemador",
        "Regulador de presión defectuoso",
        "Manguera doblada o bloqueada",
        "Altitud o presión atmosférica"
      ],
      soluciones: [
        {
          problema: "Bajo nivel de gas",
          solucion: [
            "Verificar indicador de nivel",
            "Cambiar cilindro si está vacío",
            "Pedir recarga inmediata"
          ]
        },
        {
          problema: "Obstrucción en quemador",
          solucion: [
            "Apagar gas completamente",
            "Usar alambre fino para limpiar boquillas",
            "Soplar para remover partículas",
            "Verificar que todas las boquillas tengan salida"
          ]
        },
        {
          problema: "Regulador defectuoso",
          solucion: [
            "Verificar que el regulador no esté bloqueado",
            "Girar perilla de ajuste lentamente",
            "Probar con otro regulador si es posible",
            "Reemplazar si no funciona"
          ]
        },
        {
          problema: "Manguera bloqueada",
          solucion: [
            "Verificar que la manguera no esté doblada",
            "Desconectar y soplar para verificar flujo",
            "Reemplazar si está obstruida"
          ]
        }
      ]
    },

    // DIFICULTAD PARA ENCENDER
    encendido_difficil: {
      titulo: "Dificultad para Encender",
      nivel_urgencia: "BAJO",
      sintomas: [
        "No genera chispa",
        "Chispa débil o intermitente",
        "El gas sale pero no enciende",
        "Tarda mucho en encender"
      ],
      causas_posibles: [
        "Pila del encendedor descargada",
        "Electrodos sucios o desalineados",
        "Regulador bloqueado por seguridad",
        "Manguera con aire",
        "Baja presión de gas"
      ],
      soluciones: [
        {
          problema: "Pila descargada",
          solucion: [
            "Abrir compartimento de pila",
            "Retirar pila antigua",
            "Limpiar contactos con algodón seco",
            "Colocar pila nueva del tipo correcto",
            "Probar encendido"
          ]
        },
        {
          problema: "Electrodos sucios",
          solucion: [
            "Apagar gas completamente",
            "Limpiar electrodos con alcohol y algodón",
            "Verificar distancia correcta (3-5mm)",
            "Ajustar si es necesario",
            "Probar encendido"
          ]
        },
        {
          problema: "Regulador bloqueado",
          solucion: [
            "Cerrar válvula del cilindro",
            "Esperar 30 segundos",
            "Abrir lentamente válvula del cilindro",
            "Presinar botón de seguridad del regulador",
            "Intentar encender nuevamente"
          ]
        }
      ]
    }
  },

  // PROBLEMAS DE COMBUSTIBLES
  combustibles: {
    // VEHÍCULO NO ARRANCA DESPUÉS DE CARGAR
    no_arranca: {
      titulo: "Vehículo No Arranca Después de Cargar Combustible",
      nivel_urgencia: "MEDIO",
      sintomas: [
        "Motor no arranca",
        "Motor arranca pero se apaga",
        "Tiene golpeteos o fallas",
        "Humo anormal por escape"
      ],
      causas_posibles: [
        "Combustible contaminado con agua",
        "Combustible de mala calidad",
        "Filtro de combustible obstruido",
        "Bomba de combustible dañada",
        "Inyectores tapados"
      ],
      soluciones: [
        {
          paso: 1,
          accion: "NO INTENTAR ARRANCAR",
          descripcion: "No sigas intentando arrancar el vehículo para evitar daños mayores",
          importancia: "CRÍTICO"
        },
        {
          paso: 2,
          accion: "VERIFICAR COMBUSTIBLE",
          descripcion: "Revisa si hay agua en el tanque (el combustible se ve turbio)",
          metodo: "Usa un recipiente transparente para tomar muestra"
        },
        {
          paso: 3,
          accion: "DRENAR TANQUE",
          descripcion: "Si hay contaminación, drena completamente el tanque",
          herramientas: "Llave de drenaje, recipientes adecuados"
        },
        {
          paso: 4,
          accion: "LIMPIAR FILTROS",
          descripcion: "Cambia o limpia el filtro de combustible",
          herramientas: "Filtro nuevo, herramientas básicas"
        },
        {
          paso: 5,
          accion: "LLENAR CON COMBUSTIBLE DE CALIDAD",
          descripcion: "Usa combustible de una estación confiable",
          recomendacion: "CUPET Las Tunas - combustible certificado"
        },
        {
          paso: 6,
          accion: "REVISAR SISTEMA",
          descripcion: "Si el problema persiste, lleva a taller mecánico",
          urgencia: "Si no arranca después de estos pasos"
        }
      ],
      prevencion: [
        "Cargar combustible solo en estaciones certificadas",
        "Evitar cargar cuando camión cisterna está descargando",
        "Usar aditivos limpiadores regularmente",
        "Mantenimiento preventivo del sistema de combustible"
      ]
    },

    // CONSUMO EXCESIVO DE COMBUSTIBLE
    consumo_excesivo: {
      titulo: "Consumo Excesivo de Combustible",
      nivel_urgencia: "BAJO",
      sintomas: [
        "El vehículo consume más combustible de lo normal",
        "Bajo rendimiento por litro",
        "Olor fuerte a combustible",
        "Humo negro o azul por escape"
      ],
      causas_posibles: [
        "Fuga en el sistema de combustible",
        "Filtro de aire muy sucio",
        "Inyectores defectuosos o sucios",
        "Presión de llantas incorrecta",
        "Conducir a altas revoluciones"
      ],
      soluciones: [
        {
          problema: "Fuga de combustible",
          solucion: [
            "Revisar visualmente líneas de combustible",
            "Buscar manchas de combustible debajo del vehículo",
            "Revisar conexión del tanque y filtro",
            "Llevar a taller si se detecta fuga"
          ]
        },
        {
          problema: "Filtro de aire sucio",
          solucion: [
            "Revisar filtro de aire",
            "Limpiar o reemplazar según sea necesario",
            "Verificar cada 10,000 km"
          ]
        },
        {
          problema: "Inyectores problemáticos",
          solucion: [
            "Usar aditivo limpiador de inyectores",
            "Llevar a limpieza profesional si persiste",
            "Reemplazar inyectores dañados"
          ]
        },
        {
          problema: "Mantenimiento general",
          solucion: [
            "Verificar presión de llantas",
            "Revisar alineación y balanceo",
            "Conducir de manera eficiente",
            "Mantenimiento regular del motor"
          ]
        }
      ]
    }
  },

  // PROBLEMAS DE LUBRICANTES
  lubricantes: {
    // CONSUMO EXCESIVO DE ACEITE
    consumo_aceite: {
      titulo: "Consumo Excesivo de Aceite",
      nivel_urgencia: "MEDIO",
      sintomas: [
        "Nivel de aceite baja rápidamente",
        "Humo azul por el escape",
        "Motor funciona rugoso",
        "Baja presión de aceite"
      ],
      causas_posibles: [
        "Fugas de aceite",
        "Anillos del motor desgastados",
        "Retenes de válvulas defectuosos",
        "Junta de culata dañada",
        "Aceite de viscosidad incorrecta"
      ],
      soluciones: [
        {
          paso: 1,
          accion: "VERIFICAR NIVEL",
          descripcion: "Revisa el nivel de aceite con el motor frío",
          metodo: "Usa la varilla medidora"
        },
        {
          paso: 2,
          accion: "BUSCAR FUGAS",
          descripcion: "Inspecciona motor en busca de fugas visibles",
          areas_revisar: "Debajo del motor, alrededor del filtro, junta de tapa"
        },
        {
          paso: 3,
          accion: "VERIFICAR COLOR",
          descripcion: "Revisa el color y consistencia del aceite",
          indicadores: "Negro y espeso = necesita cambio, lechoso = agua en aceite"
        },
        {
          paso: 4,
          accion: "REPARAR FUGAS",
          descripcion: "Repara fugas menores inmediatamente",
          herramientas: "Llaves, juntas nuevas"
        },
        {
          paso: 5,
          accion: "USAR ACEITE ADECUADO",
          descripcion: "Verifica que estés usando el aceite correcto",
          recomendacion: "Sigue especificaciones del fabricante"
        },
        {
          paso: 6,
          accion: "VISITAR TALLER",
          descripcion: "Si el consumo es muy alto, lleva a taller",
          urgencia: "Si baja más de 1L cada 1000 km"
        }
      ]
    },

    // ACEITE SE OSCURECE RÁPIDO
    aceite_negro: {
      titulo: "Aceite Se Oscurece Rápidamente",
      nivel_urgencia: "BAJO",
      sintomas: [
        "Aceite negro después de pocos días",
        "Motor con ruidos extraños",
        "Baja lubricación efectiva",
        "Desgaste prematuro del motor"
      ],
      causas_posibles: [
        "Filtro de aceite sucio",
        "Motor sobrecalentado",
        "Aceite de baja calidad",
        "Acumulación de carbón",
        "Intervalos de cambio incorrectos"
      ],
      soluciones: [
        {
          problema: "Filtro sucio",
          solucion: [
            "Cambiar filtro de aceite inmediatamente",
            "Usar filtro de calidad",
            "Cambiar cada 2 cambios de aceite"
          ]
        },
        {
          problema: "Sobrecalentamiento",
          solucion: [
            "Verificar sistema de enfriamiento",
            "Revisar termostato y radiador",
            "Evitar sobrecargar el motor"
          ]
        },
        {
          problema: "Calidad del aceite",
          solucion: [
            "Usar aceite de marca reconocida",
            "Verificar especificaciones API/ACEA",
            "Comprar en distribuidores autorizados"
          ]
        },
        {
          problema: "Intervalos incorrectos",
          solucion: [
            "Seguir recomendaciones del fabricante",
            "Cambiar según condiciones de uso",
            "No extender intervalos innecesariamente"
          ]
        }
      ]
    }
  },

  // PROBLEMAS GENERALES Y MANTENIMIENTO
  general: {
    // EQUIPO NO FUNCIONA
    equipo_no_funciona: {
      titulo: "Equipo o Sistema No Funciona",
      nivel_urgencia: "MEDIO",
      pasos_generales: [
        {
          paso: 1,
          accion: "VERIFICAR SUMINISTRO",
          descripcion: "Asegúrate de que hay suministro de energía/combustible",
          checks: ["Electricidad", "Gas", "Combustible", "Agua"]
        },
        {
          paso: 2,
          accion: "REVISAR CONEXIONES",
          descripcion: "Verifica que todas las conexiones estén firmes",
          areas: ["Eléctricas", "De gas", "Hidráulicas", "Mecánicas"]
        },
        {
          paso: 3,
          accion: "CONSULTAR MANUAL",
          descripcion: "Revisa el manual del equipo para soluciones específicas",
          secciones: ["Solución de problemas", "Mantenimiento", "Códigos de error"]
        },
        {
          paso: 4,
          accion: "REINICIAR SISTEMA",
          descripcion: "Apaga y espera 30 segundos, luego enciende nuevamente",
         适用: "Sistemas electrónicos, bombas, calentadores"
        },
        {
          paso: 5,
          accion: "CONTACTAR SOPORTE",
          descripcion: "Si no resuelve, llama a soporte técnico",
          contacto: "(53) 31-xxxxxx ext. 102"
        }
      ]
    },

    // MANTENIMIENTO PREVENTIVO
    mantenimiento_preventivo: {
      titulo: "Guía de Mantenimiento Preventivo",
      frecuencia: {
        diario: [
          "Verificar nivel de aceite en vehículos",
          "Revisar presión de llantas",
          "Inspeccionar visualmente equipos",
          "Limpiar área de trabajo"
        ],
        semanal: [
          "Limpiar filtros de aire",
          "Verificar niveles de fluidos",
          "Revisar conexiones de gas",
          "Probar sistemas de seguridad"
        ],
        mensual: [
          "Cambiar filtros de combustible",
          "Revisar sistema de escape",
          "Calibrar equipos de medición",
          "Inspeccionar mangueras y conexiones"
        ],
        trimestral: [
          "Servicio completo de equipos",
          "Revisión de sistemas eléctricos",
          "Mantenimiento de bombas",
          "Actualización de registros"
        ],
        semestral: [
          "Revisión general del sistema",
          "Cambio de lubricantes mayores",
          "Inspección de tanques y recipientes",
          "Capacitación del personal"
        ],
        anual: [
          "Certificación completa de equipos",
          "Revisión estructural de instalaciones",
          "Actualización de permisos",
          "Auditoría de seguridad"
        ]
      }
    }
  },

  // CONTACTO DE EMERGENCIA Y SOPORTE
  contacto: {
    emergencia: {
      telefono: "105 (Bomberos)",
      cupet_emergencia: "(53) 31-xxxxxx",
      medico: "104",
      policia: "106"
    },
    soporte_tecnico: {
      horario: "Lunes a Sábado 7:00 AM - 6:00 PM",
      telefono: "(53) 31-xxxxxx ext. 102",
      whatsapp: "+53 5xxxxxxx",
      email: "soporte@cupet.cu",
      response_time: "30 minutos durante horario laboral"
    },
    especialistas: {
      glp: "(53) 31-xxxxxx ext. 123",
      combustibles: "(53) 31-xxxxxx ext. 101",
      lubricantes: "(53) 31-xxxxxx ext. 104",
      mantenimiento: "(53) 31-xxxxxx ext. 105"
    }
  }
};

// Sistema de diagnóstico automático
const diagnosticSystem = {
  // Función para diagnosticar problemas basados en síntomas
  diagnosticar: function(sintomas, categoria) {
    const resultados = [];
    
    if (categoria && troubleshootingSystem[categoria]) {
      const categoria_problemas = troubleshootingSystem[categoria];
      
      for (const [problema_key, problema_data] of Object.entries(categoria_problemas)) {
        if (problema_data.sintomas) {
          const coincidencias = sintomas.filter(sintoma => 
            problema_data.sintomas.some(sintoma_problema => 
              sintoma_problema.toLowerCase().includes(sintoma.toLowerCase()) ||
              sintoma.toLowerCase().includes(sintoma_problema.toLowerCase())
            )
          );
          
          if (coincidencias.length > 0) {
            resultados.push({
              problema: problema_key,
              titulo: problema_data.titulo,
              coincidencias: coincidencias,
              nivel_urgencia: problema_data.nivel_urgencia || 'MEDIO',
              soluciones: problema_data.soluciones || problema_data.accion_inmediata
            });
          }
        }
      }
    }
    
    // Ordenar por nivel de urgencia y número de coincidencias
    return resultados.sort((a, b) => {
      const urgencia_order = { 'ALTO': 3, 'MEDIO': 2, 'BAJO': 1 };
      if (urgencia_order[a.nivel_urgencia] !== urgencia_order[b.nivel_urgencia]) {
        return urgencia_order[b.nivel_urgencia] - urgencia_order[a.nivel_urgencia];
      }
      return b.coincidencias.length - a.coincidencias.length;
    });
  },
  
  // Función para obtener guía paso a paso
  obtenerGuia: function(problema, categoria) {
    if (categoria && troubleshootingSystem[categoria] && 
        troubleshootingSystem[categoria][problema]) {
      return troubleshootingSystem[categoria][problema];
    }
    return null;
  },
  
  // Función para obtener contacto de emergencia
  getEmergenciaContact: function() {
    return troubleshootingSystem.contacto.emergencia;
  },
  
  // Función para obtener soporte técnico
  getSoporteTecnico: function() {
    return troubleshootingSystem.contacto.soporte_tecnico;
  }
};

// Exportar el sistema de troubleshooting
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { troubleshootingSystem, diagnosticSystem };
} else {
  window.troubleshootingSystem = troubleshootingSystem;
  window.diagnosticSystem = diagnosticSystem;
}
