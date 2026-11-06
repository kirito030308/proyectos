// Base de Conocimientos para el Chatbot de CUPET Las Tunas
// Contiene información detallada sobre productos, servicios y problemas comunes

const knowledgeBase = {
  // INFORMACIÓN DE PRODUCTOS
  productos: {
    combustibles: {
      gasolina_regular: {
        nombre: "Gasolina Regular",
        octanaje: "87 octanos",
        usos: "Vehículos livianos, motocicletas, equipos pequeños",
        especificaciones: "Cumple con norma NC 191:2018",
        almacenamiento: "Tanques subterráneos certificados",
        beneficios: "Económica, ideal para uso diario",
        precio_referencia: "$145.00 CUP por litro",
        disponibilidad: "Siempre disponible en estación principal"
      },
      gasolina_especial: {
        nombre: "Gasolina Especial",
        octanaje: "93 octanos",
        usos: "Vehículos de alto rendimiento, motocicletas deportivas",
        especificaciones: "Cumple con norma NC 191:2018",
        almacenamiento: "Tanques subterráneos certificados",
        beneficios: "Mejor rendimiento, menor desgaste del motor",
        precio_referencia: "$165.00 CUP por litro",
        disponibilidad: "Disponible en estación principal y sucursales"
      },
      diesel: {
        nombre: "Diésel",
        tipos: ["Estándar", "Premium"],
        usos: "Vehículos pesados, maquinaria agrícola, generadores",
        especificaciones: "Cumple con norma NC 192:2018",
        almacenamiento: "Tanques subterráneos certificados",
        beneficios: "Alta eficiencia energética, bajo consumo",
        precio_referencia: "Estándar: $125.00 CUP/L, Premium: $145.00 CUP/L",
        disponibilidad: "Siempre disponible"
      },
      keroseno: {
        nombre: "Keroseno",
        tipos: ["Aviación", "Industrial"],
        usos: "Aeronaves, calefacción, limpieza industrial",
        especificaciones: "Cumple con normas internacionales",
        almacenamiento: "Tanques especiales con ventilación",
        beneficios: "Alto poder calorífico, combustión limpia",
        precio_referencia: "$135.00 CUP por litro",
        disponibilidad: "Bajo pedido especial"
      }
    },
    
    glp: {
      cilindro_10kg: {
        nombre: "Cilindro 10kg",
        uso: "Doméstico (cocina, agua caliente)",
        dimensiones: "Altura: 50cm, Diámetro: 30cm",
        peso_vacio: "7.5kg",
        presion_trabajo: "7 bar",
        certificacion: "Ministerio de Energía",
        vida_util: "15 años con mantenimiento",
        precio: "$1,850.00 CUP",
        entrega: "24-48 horas",
        seguridad: "Válvula de seguridad, manómetro"
      },
      cilindro_20kg: {
        nombre: "Cilindro 20kg",
        uso: "Comercial (restaurantes, pequeños negocios)",
        dimensiones: "Altura: 80cm, Diámetro: 30cm",
        peso_vacio: "15kg",
        presion_trabajo: "7 bar",
        certificacion: "Ministerio de Energía",
        vida_util: "15 años con mantenimiento",
        precio: "$3,500.00 CUP",
        entrega: "24-48 horas",
        seguridad: "Válvula de seguridad, manómetro, base antivuelco"
      },
      cilindro_43kg: {
        nombre: "Cilindro 43kg",
        uso: "Industrial (grandes consumos, procesos)",
        dimensiones: "Altura: 120cm, Diámetro: 37cm",
        peso_vacio: "32kg",
        presion_trabajo: "7 bar",
        certificacion: "Ministerio de Energía",
        vida_util: "20 años con mantenimiento",
        precio: "$7,200.00 CUP",
        entrega: "48-72 horas",
        seguridad: "Válvula de seguridad, manómetro, base antivuelco, collarín de protección"
      }
    },
    
    lubricantes: {
      motor_10w40: {
        nombre: "Aceite 10W-40",
        tipo: "Sintético semi-sintético",
        uso: "Motos de gasolina, diésel ligero",
        especificaciones: "API SN/CF, ACEA A3/B4",
        presentacion: "1L, 4L, 20L, 200L",
        beneficios: "Protección contra desgaste, limpieza del motor",
        cambio_recomendado: "Cada 5,000 km o 3 meses",
        precio: "1L: $450.00 CUP, 4L: $1,650.00 CUP"
      },
      motor_15w40: {
        nombre: "Aceite 15W-40",
        tipo: "Mineral",
        uso: "Diésel pesado, maquinaria agrícola",
        especificaciones: "API CF-4, ACEA B2",
        presentacion: "1L, 4L, 20L, 200L",
        beneficios: "Alta viscosidad, protección extrema",
        cambio_recomendado: "Cada 3,000 km o 2 meses",
        precio: "1L: $380.00 CUP, 4L: $1,380.00 CUP"
      },
      transmision: {
        nombre: "Aceite Transmisión",
        tipo: "ATF y manual",
        uso: "Cajas de velocidad automáticas y manuales",
        especificaciones: "DEXRON III, API GL-4",
        presentacion: "1L, 4L, 20L",
        beneficios: "Cambio suave, protección de engranajes",
        cambio_recomendado: "Cada 20,000 km o 1 año",
        precio: "1L: $520.00 CUP"
      }
    }
  },

  // SERVICIOS COMPLETOS
  servicios: {
    venta_combustibles: {
      descripcion: "Venta de combustibles al detal y por mayor",
      metodos_pago: ["Efectivo", "Tarjeta", "Transferencia", "Crédito"],
      horario: "Lunes a Domingo 6:00 AM - 10:00 PM",
      emergencia: "24/7 para casos urgentes",
      delivery: "Disponible para pedidos > 100L",
      facturacion: "Factura inmediata con sello fiscal",
      descuentos: "5% clientes frecuentes, 10% empresas"
    },
    
    distribucion_glp: {
      descripcion: "Venta y distribución de GLP",
      servicios: [
        "Venta de cilindros nuevos",
        "Recarga de cilindros existentes",
        "Intercambio de cilindros vacíos",
        "Alquiler temporal de equipos",
        "Instalación domiciliaria",
        "Mantenimiento preventivo"
      ],
      cobertura: "Provincia de Las Tunas y municipios cercanos",
      flota: "Camiones certificados, personal capacitado",
      seguridad: "Certificación de transporte de mercancías peligrosas",
      garantia: "Garantía de peso y calidad",
      response_time: "24-48 horas para entrega programada"
    },
    
    lubricantes: {
      descripcion: "Venta de lubricantes y productos relacionados",
      marcas: ["CUPET", "Internacionales certificadas"],
      asesoramiento: "Selección del producto adecuado",
      aplicacion: "Servicio de cambio de aceite",
      almacenamiento: "Condiciones controladas de temperatura",
      certificacion: "ISO 9001 en procesos",
      delivery: "Entrega a domicilio para pedidos > 20L"
    },
    
    servicios_tecnicos: {
      mantenimiento: {
        descripcion: "Mantenimiento de equipos y sistemas",
        tipos: ["Preventivo", "Correctivo", "Predictivo"],
        frecuencia: "Mensual, trimestral, semestral",
        certificacion: "Técnicos certificados",
        garantia: "Garantía de 3 meses en reparaciones",
        precio: "Según complejidad, cotización gratuita"
      },
      
      instalacion: {
        descripcion: "Instalación de sistemas GLP y combustible",
        tipos: ["Domiciliaria", "Comercial", "Industrial"],
        permisos: "Gestión de permisos municipales",
        inspeccion: "Inspección final y certificación",
        tiempo_instalacion: "1-3 días según complejidad",
        garantia: "Garantía de 1 año en instalación"
      },
      
      capacitacion: {
        descripcion: "Capacitación técnica y de seguridad",
        cursos: [
          "Manejo seguro de GLP",
          "Mantenimiento básico de equipos",
          "Respuesta a emergencias",
          "Normativas de seguridad"
        ],
        duracion: "4-8 horas por curso",
        certificado: "Certificado de competencia",
        frecuencia: "Mensual o bajo demanda"
      }
    }
  },

  // PROBLEMAS COMUNES Y SOLUCIONES
  problemas_comunes: {
    glp: {
      fugas: {
        sintomas: ["Olor a gas", "Sonido de silbido", "Burómetros bajos"],
        causas: ["Conexiones flojas", "Válvulas defectuosas", "Daño en cilindro"],
        solucion_inmediata: [
          "Cerrar válvula principal",
          "Abrir ventanas y puertas",
          "No usar fuego ni electricidad",
          "Evacuar área si es fuerte",
          "Llamar a emergencia: 105"
        ],
        solucion_tecnica: [
          "Revisar conexiones con agua y jabón",
          "Apretar conexiones con llave adecuada",
          "Reemplazar juntas y sellos",
          "Cambiar válvula si es necesario",
          "Solicitar mantenimiento técnico"
        ],
        prevencion: [
          "Revisión mensual de conexiones",
          "No sobrecargar cilindros",
          "Almacenamiento en lugar ventilado",
          "Evitar golpes y caídas"
        ]
      },
      
      llama_baja: {
        sintomas: ["Llama pequeña o amarilla", "Cocción lenta", "Ruido en quemador"],
        causas: ["Bajo nivel de gas", "Obstrucción en quemador", "Regulador defectuoso"],
        solucion: [
          "Verificar nivel de gas",
          "Limpiar orificios del quemador",
          "Ajustar regulador de presión",
          "Revisar mangueras por obstrucciones",
          "Solicitar revisión técnica si persiste"
        ]
      },
      
      encendido_difficil: {
        sintomas: ["Dificultad para encender", "Chispa débil", "No enciende"],
        causas: ["Pila descargada", "Electrodo sucio", "Regulador bloqueado"],
        solucion: [
          "Cambiar pila del encendedor",
          "Limpiar electrodos con alcohol",
          "Verificar conexión de mangueras",
          "Desbloquear regulador",
          "Probar con otro cilindro"
        ]
      }
    },
    
    combustibles: {
      contaminacion: {
        sintomas: ["Motor falla", "Pérdida de potencia", "Humo anormal"],
        causas: ["Agua en combustible", "Sedimentos", "Combustible adulterado"],
        solucion: [
          "No usar el vehículo",
          "Drenar tanque de combustible",
          "Limpiar filtros de combustible",
          "Revisar inyectores",
          "Llenar con combustible de calidad"
        ],
        prevencion: [
          "Comprar en estaciones certificadas",
          "No llenar durante descarga de camión",
          "Usar aditivos limpiadores",
          "Mantenimiento regular de filtros"
        ]
      },
      
      consumo_excesivo: {
        sintomas: ["Mayor consumo habitual", "Bajo rendimiento", "Olor fuerte a combustible"],
        causas: ["Fuga en sistema", "Filtros sucios", "Inyectores defectuosos"],
        solucion: [
          "Revisar por fugas visibles",
          "Cambiar filtros de aire y combustible",
          "Limpiar inyectores",
          "Revisar sistema de escape",
          "Ajustar carburador/inyección"
        ]
      }
    },
    
    lubricantes: {
      consumo_excesivo: {
        sintomas: ["Bajo nivel de aceite frecuente", "Humo azul", "Motor rugoso"],
        causas: ["Fugas", "Anillos desgastados", "Retenes defectuosos"],
        solucion: [
          "Identificar y reparar fugas",
          "Revisar compresión del motor",
          "Cambiar retenes y juntas",
          "Usar aceite de viscosidad adecuada",
          "Mantenimiento preventivo regular"
        ]
      },
      
      aceite_negro_rapido: {
        sintomas: ["Aceite se oscurece pronto", "Motor con ruidos", "Baja lubricación"],
        causas: ["Filtro sucio", "Calentamiento excesivo", "Aceite inadecuado"],
        solucion: [
          "Cambiar filtro de aceite",
          "Revisar sistema de enfriamiento",
          "Usar aceite recomendado",
          "Evitar sobrecalentamiento",
          "Intervalos de cambio adecuados"
        ]
      }
    }
  },

  // INFORMACIÓN DE CONTACTO Y UBICACIÓN
  contacto: {
    principal: {
      direccion: "Carretera Central km 585, Las Tunas",
      telefono: "(53) 31-51885523",
      whatsapp: "+53 51885523",
      email: "info@cupetlastunas.cu",
      horario: "Lunes a Domingo 6:00 AM - 10:00 PM",
      emergencia: "(53) 31-51885523 (24/7)"
    },
    
    departamentos: {
      ventas: {
        telefono: "(53) 31-51885523 ext. 101",
        email: "ventas@cupet.cu",
        horario: "Lunes a Viernes 8:00 AM - 5:00 PM",
        responsable: "Departamento de Ventas"
      },
      
      soporte_tecnico: {
        telefono: "(53) 31-51885523 ext. 102",
        email: "soporte@cupet.cu",
        horario: "Lunes a Sábado 7:00 AM - 6:00 PM",
        responsable: "Servicio Técnico"
      },
      
      glp: {
        telefono: "(53) 31-51885523 ext. 123",
        email: "glp@cupet.cu",
        horario: "Lunes a Sábado 7:00 AM - 6:00 PM",
        responsable: "Especialista GLP"
      },
      
      empresas: {
        telefono: "(53) 31-51885523 ext. 104",
        email: "empresas@cupet.cu",
        horario: "Lunes a Viernes 8:00 AM - 5:00 PM",
        responsable: "Ventas Corporativas"
      }
    },
    
    redes_sociales: {
      facebook: "facebook.com/CupetLasTunas",
      twitter: "twitter.com/CupetLT",
      instagram: "instagram.com/cupetlastunas",
      youtube: "youtube.com/cupetlasunas"
    }
  },

  // HORARIOS DETALLADOS
  horarios: {
    estacion_principal: {
      lunes_viernes: "6:00 AM - 10:00 PM",
      sabados: "6:00 AM - 8:00 PM",
      domingos: "7:00 AM - 6:00 PM",
      servicios: ["Combustibles", "GLP", "Lubricantes", "Atención general"]
    },
    
    oficina_administrativa: {
      lunes_viernes: "8:00 AM - 5:00 PM",
      sabados: "8:00 AM - 12:00 PM",
      domingos: "Cerrado",
      servicios: ["Administración", "Ventas corporativas", "Facturación"]
    },
    
    servicio_tecnico: {
      lunes_viernes: "7:00 AM - 6:00 PM",
      sabados: "7:00 AM - 4:00 PM",
      domingos: "Emergencias solo",
      servicios: ["Mantenimiento", "Instalación", "Reparaciones"]
    },
    
    entregas_domicilio: {
      lunes_viernes: "7:00 AM - 6:00 PM",
      sabados: "7:00 AM - 4:00 PM",
      domingos: "Programadas solo",
      servicios: ["Entrega GLP", "Entrega combustible", "Instalación"]
    },
    
    emergencia: {
      disponibilidad: "24/7",
      telefono: "(53) 31-51885523",
      casos: ["Fugas de gas", "Accidentes", "Emergencias vehiculares"],
      response_time: "30 minutos máximo"
    }
  },

  // PRECIOS Y PROMOCIONES
  precios: {
    combustibles: {
      gasolina_regular: "$145.00 CUP/litro",
      gasolina_especial: "$165.00 CUP/litro",
      diesel_estandar: "$125.00 CUP/litro",
      diesel_premium: "$145.00 CUP/litro",
      keroseno: "$135.00 CUP/litro"
    },
    
    glp: {
      cilindro_10kg: "$1,850.00 CUP",
      cilindro_20kg: "$3,500.00 CUP",
      cilindro_43kg: "$7,200.00 CUP",
      recarga_10kg: "$1,650.00 CUP",
      recarga_20kg: "$3,200.00 CUP",
      recarga_43kg: "$6,800.00 CUP"
    },
    
    lubricantes: {
      aceite_10w40_1l: "$450.00 CUP",
      aceite_10w40_4l: "$1,650.00 CUP",
      aceite_15w40_1l: "$380.00 CUP",
      aceite_15w40_4l: "$1,380.00 CUP",
      transmision_1l: "$520.00 CUP"
    },
    
    descuentos: {
      clientes_frecuentes: "5% en todos los productos",
      empresas: "10% en combustibles y lubricantes",
      pedidos_mayores: "15% en compras > 1000L",
      cooperativas: "12% en todos los productos",
      contratos_mensuales: "8% adicional"
    },
    
    financiamiento: {
      plazos: ["3 meses", "6 meses", "12 meses"],
      interes: "0% para clientes corporativos",
      requisitos: ["Cartera de identificación", "Comprobante de ingresos", "Referencias"],
      minimo: "$1000 CUP"
    }
  },

  // PROCESOS Y PROCEDIMIENTOS
  procesos: {
    transferencias: {
      descripcion: "Proceso para realizar transferencias entre cuentas CUPET",
      pasos: [
        "1. Iniciar sesión en su cuenta de cliente",
        "2. Ir a la sección 'Transferencias'",
        "3. Ingresar número de cuenta del destinatario",
        "4. Especificar monto a transferir",
        "5. Seleccionar concepto (ej: pago de combustible)",
        "6. Confirmar con contraseña o PIN",
        "7. Recibir comprobante de transferencia",
        "8. Guardar comprobante para futuras referencias"
      ],
      limites: {
        minimo: "50.00 CUP",
        maximo_diario: "5,000.00 CUP",
        maximo_mensual: "20,000.00 CUP"
      },
      comisiones: {
        transferencia_propia: "Gratis",
        transferencia_terceros: "1.5% del monto",
        transferencia_urgente: "3.0% del monto"
      },
      tiempo_procesamiento: {
        estandar: "5-10 minutos",
        urgente: "1-2 minutos",
        programada: "En la fecha y hora programadas"
      }
    },
    
    pagos_facturas: {
      descripcion: "Cómo pagar facturas de servicios CUPET",
      metodos_pago: [
        "Transferencia bancaria",
        "Tarjeta de crédito/débito",
        "Pago móvil (Transfermóvil)",
        "Pago en efectivo en oficinas",
        "Deducción automática de nómina"
      ],
      pasos_pago_online: [
        "1. Ingresar a 'Mis Facturas'",
        "2. Seleccionar factura a pagar",
        "3. Verificar monto y fecha de vencimiento",
        "4. Elegir método de pago",
        "5. Completar datos de pago",
        "6. Confirmar transacción",
        "7. Recibir comprobante digital"
      ],
      descuentos_pronto_pago: {
        antes_vencimiento: "5%",
        mismo_dia_vencimiento: "2%",
        despues_vencimiento: "Recargo de 10%"
      }
    },
    
    recargas_saldo: {
      descripcion: "Opciones para recargar saldo de cliente",
      metodos: [
        "Oficinas CUPET (efectivo/tarjeta)",
        "Banca en línea",
        "Aplicación móvil CUPET",
        "Puntos de recarga autorizados",
        "Transferencia desde otra cuenta"
      ],
      montos_recarga: {
        minimo: "100.00 CUP",
        maximo: "10,000.00 CUP",
        montos_sugeridos: ["100", "200", "500", "1000", "2000"]
      },
      promociones: {
        recarga_500: "Bono de 25 CUP",
        recarga_1000: "Bono de 60 CUP",
        recarga_2000: "Bono de 150 CUP"
      }
    },
    dudas_frecuentes: {
      transferencias: {
        pregunta: "¿Cómo realizo una transferencia?",
        respuesta: "Para realizar transferencias: 1) Inicie sesión en su cuenta, 2) Vaya a Transferencias, 3) Ingrese cuenta destino y monto, 4) Confirme con su PIN. El mínimo es 50 CUP y el máximo diario 5,000 CUP."
      },
      
      saldo_disponible: {
        pregunta: "¿Cómo sé mi saldo disponible?",
        respuesta: "Puede consultar su saldo: 1) En la app móvil CUPET, 2) En el portal web www.cupetlasunas.cu, 3) En nuestras oficinas, 4) Llamando al centro de atención. El saldo se actualiza en tiempo real."
      },
      
      facturas_vencidas: {
        pregunta: "¿Qué hago si mi factura está vencida?",
        respuesta: "Si su factura está vencida: 1) Pague lo antes posible para evitar recargos, 2) Hay un recargo del 10% por pago tardío, 3) Puede solicitar un plan de pagos si tiene dificultades, 4) Contacte a atención al cliente para negociaciones."
      },
      
      bloqueo_cuenta: {
        pregunta: "¿Por qué está bloqueada mi cuenta?",
        respuesta: "Su cuenta puede bloquearse por: 1) Múltiples intentos fallidos de contraseña, 2) Actividad sospechosa, 3) No pagar facturas por más de 60 días. Para desbloquear: Contacte al 123-4567 o visite nuestras oficinas con identificación."
      },
      
      recarga_no_aplicada: {
        pregunta: "Hice una recarga y no aparece",
        respuesta: "Si su recarga no aparece: 1) Espere 5-10 minutos, 2) Verifique el comprobante, 3) Revise si ingresó el número correcto, 4) Si no aparece, llame al centro de atención con su comprobante. Las recargas suelen aplicarse en máximo 15 minutos."
      },
      
      cambio_metodo_pago: {
        pregunta: "¿Puedo cambiar mi método de pago?",
        respuesta: "Sí, puede cambiar su método de pago: 1) Ingrese a 'Configuración', 2) Vaya a 'Métodos de pago', 3) Agregue nuevo método, 4) Elimine el anterior. Los cambios toman 24 horas en procesarse por seguridad."
      }
    },
    
    problemas_comunes: {
      transferencia_fallida: {
        sintomas: ["La transferencia no se completa", "Error en el proceso", "Saldo no se descuenta"],
        causas: ["Saldo insuficiente", "Datos incorrectos del destinatario", "Problemas de conexión", "Límite diario excedido"],
        soluciones: [
          "Verifique saldo disponible",
          "Confirme número de cuenta destino",
          "Revise límites diarios/mensuales",
          "Intente nuevamente en 5 minutos",
          "Contacte soporte si persiste"
        ]
      },
      
      pago_rechazado: {
        sintomas: ["Pago rechazado", "Tarjeta no procesada", "Error de pago"],
        causas: ["Fondos insuficientes", "Tarjeta vencida", "Límite excedido", "Datos incorrectos"],
        soluciones: [
          "Verifique fondos y límite de tarjeta",
          "Confirme fecha de vencimiento",
          "Revise CVV y datos de tarjeta",
          "Intente con otro método de pago",
          "Contacte a su banco"
        ]
      },
      
      acceso_denegado: {
        sintomas: ["No puede iniciar sesión", "Contraseña incorrecta", "Cuenta bloqueada"],
        causas: ["Contraseña olvidada", "Cuenta bloqueada por seguridad", "Mantenimiento del sistema"],
        soluciones: [
          "Use 'Olvidé mi contraseña'",
          "Espere 15 minutos e intente nuevamente",
          "Verifique mayúsculas y caracteres especiales",
          "Contacte soporte si persiste el problema"
        ]
      }
    },
    
    compra_online: {
      pasos: [
        "1. Registrarse en www.cupetlasunas.cu",
        "2. Verificar correo electrónico",
        "3. Completar perfil de usuario",
        "4. Seleccionar productos y cantidades",
        "5. Elegir método de entrega",
        "6. Seleccionar forma de pago",
        "7. Confirmar pedido",
        "8. Recibir confirmación por email",
        "9. Esperar entrega según programación",
        "10. Recibir producto y facturar"
      ],
      tiempo_procesamiento: "2-4 horas",
      metodos_pago: ["Tarjeta", "Transferencia", "Pago en entrega"],
      seguimiento: "Online y por WhatsApp"
    },
    
    compra_telefonica: {
      pasos: [
        "1. Llamar al (53) 31-51885523",
        "2. Identificarse con nombre y CI",
        "3. Especificar productos y cantidades",
        "4. Proporcionar dirección de entrega",
        "5. Confirmar método de pago",
        "6. Recibir número de pedido",
        "7. Esperar confirmación",
        "8. Recibir entrega programada"
      ],
      tiempo_procesamiento: "30 minutos - 2 horas",
      horario_atencion: "7:00 AM - 8:00 PM",
      seguimiento: "Por teléfono y WhatsApp"
    },
    
    compra_presencial: {
      pasos: [
        "1. Presentarse en estación",
        "2. Identificarse con CI o carnet",
        "3. Especificar productos requeridos",
        "4. Pagar en caja",
        "5. Recibir factura y comprobante",
        "6. Retirar productos o solicitar entrega"
      ],
      tiempo_espera: "5-15 minutos",
      metodos_pago: ["Efectivo", "Tarjeta", "Transferencia"],
      requisitos: ["Identificación válida", "Contenedores adecuados para GLP"]
    }
  },
  
  seguridad_cuenta: {
    contraseñas: {
      requisitos: [
        "Mínimo 8 caracteres",
        "Al menos una mayúscula",
        "Al menos una minúscula",
        "Al menos un número",
        "Al menos un carácter especial (!@#$%&*)"
      ],
      consejos: [
        "No use fechas de nacimiento",
        "No use nombres de familiares",
        "No use palabras comunes",
        "Cambie cada 3 meses",
        "No comparta con nadie"
      ],
      recuperacion: [
        "1. Haga clic en 'Olvidé mi contraseña'",
        "2. Ingrese su email registrado",
        "3. Revise su correo para el enlace de recuperación",
        "4. Cree una nueva contraseña segura",
        "5. Confirme la nueva contraseña",
        "6. Inicie sesión con la nueva contraseña"
      ]
    },
    autenticacion_dos_factores: {
      descripcion: "Seguridad adicional para proteger su cuenta",
      metodos: [
        "SMS al celular registrado",
        "App de autenticación",
        "Email de verificación",
        "Pregunta de seguridad"
      ],
      activacion: "Opcional pero altamente recomendada"
    },
    alertas_seguridad: {
      tipos: [
        "Inicio de sesión desde dispositivo nuevo",
        "Cambio de contraseña",
        "Transferencia de monto elevado",
        "Intentos fallidos múltiples",
        "Cambio de datos personales"
      ],
      configuracion: "Configurable en 'Seguridad' del perfil"
    }
  },
  
  informacion_financiera: {
    facturacion: {
      tipos_factura: [
        "Factura electrónica",
        "Factura impresa",
        "Factura proforma",
        "Nota de crédito",
        "Nota de débito"
      ],
      informacion_factura: {
        numero: "Único y consecutivo",
        fecha: "Fecha de emisión",
        vencimiento: "Fecha límite de pago",
        items: "Detalle de productos/servicios",
        subtotal: "Suma antes de impuestos",
        impuestos: "IVA aplicable",
        total: "Monto final a pagar"
      },
      reembolso_factura: [
        "1. Contactar servicio al cliente",
        "2. Proporcionar número de factura",
        "3. Explicar motivo del reembolso",
        "4. Esperar aprobación (48-72 horas)",
        "5. Recibir reembolso en método original"
      ],
      disputas_factura: [
        "1. Revisar factura detalladamente",
        "2. Documentar discrepancias",
        "3. Presentar reclamo por escrito",
        "4. Incluir evidencia",
        "5. Seguir proceso de resolución"
      ]
    },
    creditos_financiamiento: {
      tipos_credito: [
        "Crédito rotativo",
        "Crédito de consumo",
        "Crédito corporativo",
        "Línea de crédito",
        "Financiamiento de equipos"
      ],
      requisitos_aprobacion: [
        "Historial crediticio favorable",
        "Ingresos estables",
        "Capacidad de pago demostrada",
        "Garantías (según monto)",
        "Documentación completa"
      ],
      tasas_interes: {
        clientes_nuevos: "8-12% anual",
        clientes_frecuentes: "5-8% anual",
        clientes_corporativos: "3-6% anual",
        promociones: "0% por períodos limitados"
      },
      plazos_pago: [
        "3 meses - Interés bajo",
        "6 meses - Interés medio",
        "12 meses - Interés estándar",
        "24 meses - Para montos mayores",
        "36 meses - Solo corporativos"
      ]
    },
    impuestos: {
      iva: "11% sobre productos y servicios",
      impuesto_especial: "Aplicable a combustibles",
      exenciones: [
        "Exportaciones",
        "Zonas francas",
        "Diplomáticos (con documentación)"
      ],
      declaraciones: "Anuales para clientes corporativos"
    }
  },
  
  soporte_tecnico: {
    canales_atencion: [
      "Teléfono: +53 123 456 789 (24/7)",
      "Email: soporte@cupetlasunas.cu",
      "Chat en vivo en web",
      "WhatsApp: +53 123 456 789",
      "Oficinas presenciales"
    ],
    horarios_atencion: {
      telefonico: "24 horas, 7 días",
      email: "Respuesta en 24 horas",
      chat_vivo: "Lunes a viernes 8am-6pm",
      oficinas: "Lunes a viernes 8am-5pm"
    },
    niveles_soporte: {
      nivel_1: "Atención básica, resolución inmediata",
      nivel_2: "Soporte técnico especializado",
      nivel_3: "Ingeniería y desarrollo",
      nivel_4: "Gerencia de servicio"
    },
    tiempos_respuesta: {
      urgente: "15 minutos",
      alta: "1 hora",
      media: "4 horas",
      baja: "24 horas",
      baja_prioridad: "48 horas"
    },
    escalacion: [
      "Si no se resuelve en tiempo establecido",
      "Si requiere especialización",
      "A solicitud del cliente",
      "Por impacto en operaciones"
    ]
  },
  
  informacion_corporativa: {
    empresa: {
      fundacion: "1992",
      empleados: "500+",
      estaciones: "25 en Las Tunas",
      clientes: "30,000+",
      certificaciones: ["ISO 9001", "ISO 14001", "OHSAS 18001"]
    },
    mision: "Garantizar el suministro de energía a Cuba con calidad, seguridad y sostenibilidad",
    vision: "Ser líderes en distribución de energía en el Caribe",
    valores: [
      "Compromiso con la calidad",
      "Seguridad en todas las operaciones",
      "Sostenibilidad ambiental",
      "Excelencia en el servicio",
      "Integridad empresarial"
    ],
    proyectos: [
      "Expansión de red de estaciones",
      "Implementación de energías renovables",
      "Modernización de sistemas de pago",
      "Programa de eficiencia energética"
    ]
  },
  
  preguntas_tecnicas: {
    especificaciones_tecnicas: {
      combustibles: {
        densidad: "0.72-0.78 g/cm³",
        punto_inflamacion: "-40°C a -20°C",
        contenido_azufre: "<10 ppm",
        indice_octanaje: "87-92",
        poder_calorifico: "44-46 MJ/kg"
      },
      glp: {
        composicion: "Propano 60%, Butano 40%",
        presion_operacion: "15-20 bar",
        pureza: ">99%",
        punto_inflamacion: "-104°C",
        poder_calorifico: "46 MJ/kg"
      },
      lubricantes: {
        viscosidad: "Variable según tipo",
        indice_viscosidad: ">90",
        punto_congelacion: "-30°C a -15°C",
        estabilidad_oxidativa: "Alta"
      }
    },
    procedimientos_calidad: {
      control_calidad: [
        "Muestreo diario",
        "Análisis en laboratorio",
        "Verificación de especificaciones",
        "Certificación de cumplimiento"
      ],
      almacenamiento: [
        "Tanques certificados",
        "Control de temperatura",
        "Sistema de filtrado",
        "Prevención de contaminación"
      ],
      transporte: [
        "Vehículos especializados",
        "Tanques certificados",
        "Documentación de transporte",
        "Seguimiento GPS"
      ]
    }
  },
  
  preguntas_complejas: {
    comparaciones_productos: {
      gasolina_regular_vs_especial: {
        diferencia_principal: "Índice de octanaje (87 vs 92)",
        rendimiento: "Especial mejora eficiencia 5-10%",
        costo: "Regular 15-20% más económica",
        recomendacion: "Especial para autos modernos"
      },
      diesel_vs_gasolina: {
        eficiencia: "Diesel 30-40% más eficiente",
        mantenimiento: "Diesel requiere menos mantenimiento",
        costo: "Diesel generalmente más económico",
        uso: "Diesel para vehículos pesados"
      }
    },
    calculadoras: {
      consumo_combustible: {
        formula: "(km recorridos / consumo por 100km) * precio litro",
        ejemplo: "Si recorre 500km con consumo 10L/100km y gasolina a 145 CUP: (500/10)*145 = 7,250 CUP"
      },
      ahorro_descuento: {
        formula: "Monto * (Porcentaje descuento / 100)",
        ejemplo: "Factura de 1,000 CUP con 5% descuento: 1,000 * 0.05 = 50 CUP de ahorro"
      }
    },
    escenarios: {
      emergencia_sin_combustible: [
        "1. Llamar al servicio de emergencia",
        "2. Proporcionar ubicación exacta",
        "3. Especificar tipo de combustible",
        "4. Esperar entrega urgente (30-60 min)",
        "5. Tener listo método de pago"
      ],
      problema_pago_online: [
        "1. Verificar conexión a internet",
        "2. Intentar con otro navegador",
        "3. Verificar fondos disponibles",
        "4. Usar método de pago alternativo",
        "5. Contactar soporte si persiste"
      ],
      pedido_no_llego: [
        "1. Verificar tiempo estimado de entrega",
        "2. Revisar confirmación del pedido",
        "3. Llamar al número de seguimiento",
        "4. Solicitar reprogramación si necesario",
        "5. Reportar si pasa el tiempo límite"
      ]
    }
  }
};

// Exportar la base de conocimientos para uso en el chatbot
if (typeof module !== 'undefined' && module.exports) {
  module.exports = knowledgeBase;
} else {
  window.knowledgeBase = knowledgeBase;
}
