# 🏨 Hotel Andino - Sistema de Reservas MVP

Sistema de gestión de reservas hoteleras desarrollado con metodología SCRUM siguiendo el caso práctico de Sistemas de Información II - Clase 11.

## 🎯 Descripción del Proyecto

Este MVP (Minimum Viable Product) implementa las funcionalidades core del Hotel Andino desarrolladas a través de 4 sprints de 10 minutos cada uno, siguiendo la metodología ágil SCRUM.

## 🚀 Tecnologías Utilizadas

- **Frontend:** Next.js 15 (App Router)
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS v4
- **Componentes UI:** shadcn/ui
- **Iconos:** Lucide React
- **Gestión de Estado:** React Context API

## 🏃‍♂️ Instalación y Ejecución

### Prerrequisitos
- Node.js 18+ y npm

### Pasos

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Iniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

3. **Abrir en el navegador:**
   ```
   http://localhost:3000
   ```

## 📊 Sprints y Funcionalidades

### Sprint 1: Funcionalidades Core de Reservas (25/40 pts - 10 min)
- ✅ **PB-01:** Consulta de disponibilidad (10 pts) - `/sprint1/availability`
- ✅ **PB-02:** Catálogo de habitaciones (10 pts) - `/sprint1/catalog`
- ✅ **PB-06:** Generación de número de reserva (5 pts) - `/sprint1/reservation-number`

### Sprint 2: Gestión de Pagos (14/34 pts - 10 min)
- ✅ **PB-03:** Registro de reserva completo (9 pts) - `/sprint2/new-reservation`
- ✅ **PB-04:** Cálculo adelanto 25% (5 pts) - `/sprint2/payment-calculation`
- ✅ **PB-05:** Registro de pago (5 pts parcial) - `/sprint2/payment-register`

### Sprint 3: Comprobantes y Gestión Operativa (15/30 pts - 10 min)
- ✅ **PB-05:** Registro de pago completo (5 pts restantes)
- ✅ **PB-07:** Generación de recibos (10 pts) - `/sprint3/receipt`
- ✅ **PB-08:** Auto-cancelación 24hs (parcial) - `/sprint3/auto-cancel`

### Sprint 4: Operaciones y Finalización (10/30 pts - 10 min)
- ✅ **PB-10:** Proceso de check-in (10 pts) - `/sprint4/checkin`
- ✅ **PB-11:** Cancelación manual (5 pts parcial) - `/sprint4/cancel`
- ✅ **PB-08:** Auto-cancelación completada
- 🔲 **PB-12:** Reportes (pendiente)

### Sistema Completo
- ✅ **Vista integrada:** Navegación completa por todos los módulos - `/sistema`

**Total Implementado: 64/134 story points (48%)**

## 🔧 Reglas de Negocio Implementadas

| Código | Regla de Negocio | Estado |
|--------|------------------|--------|
| **RN-C01** | Tarifa Total = Precio × Días de estadía | ✅ Implementada |
| **RN-C02** | Adelanto = 25% de la tarifa total | ✅ Implementada |
| **RN-P01** | Check-in requiere pago completo (100%) | ✅ Implementada |
| **RN-P02** | Adelanto confirma la reserva | ✅ Implementada |
| **RN-P03** | Emisión de comprobante por cada pago | ✅ Implementada |
| **RN-R03** | Cancelaciones sin reintegro | ✅ Implementada |
| **RN-T01** | Auto-cancelación a las 24hs sin pago | ✅ Implementada |
| **RN-T02** | Estado de reserva: pendiente → confirmada → completada | ✅ Implementada |
| **RN-T03** | Cancelación definitiva e irreversible | ✅ Implementada |
| **RN-V01** | Validación de fechas de reserva | ✅ Implementada |
| **RN-V04** | Validación de fecha de check-in | ✅ Implementada |

## 📁 Estructura del Proyecto

```
hotel-andino-mvp/
├── src/
│   ├── app/
│   │   ├── sprint1/          # Funcionalidades core
│   │   │   ├── availability/
│   │   │   ├── catalog/
│   │   │   └── reservation-number/
│   │   ├── sprint2/          # Gestión de pagos
│   │   │   ├── new-reservation/
│   │   │   ├── payment-calculation/
│   │   │   └── payment-register/
│   │   ├── sprint3/          # Comprobantes
│   │   │   ├── receipt/
│   │   │   └── auto-cancel/
│   │   ├── sprint4/          # Operaciones
│   │   │   ├── checkin/
│   │   │   └── cancel/
│   │   ├── sistema/          # Vista integrada
│   │   ├── layout.tsx
│   │   └── page.tsx          # Dashboard principal
│   ├── components/
│   │   └── ui/               # Componentes shadcn/ui
│   ├── contexts/
│   │   └── ReservationContext.tsx
│   ├── lib/
│   │   ├── store.ts          # Estado global y utilidades
│   │   └── sprints-data.ts   # Datos de sprints
│   └── types/
│       └── index.ts          # Definiciones TypeScript
├── public/
├── package.json
└── README.md
```

## 🎨 Características del Sistema

### Funcionalidades Implementadas

1. **Consulta de Disponibilidad**
   - Búsqueda por rango de fechas
   - Visualización en tiempo real
   - Filtrado por tipo de habitación

2. **Gestión de Reservas**
   - Registro completo de huéspedes
   - Generación automática de número de reserva (formato: HA-YYYYMMDD-XXXX)
   - Cálculo automático de precios y adelanto
   - Estados: pendiente, confirmada, cancelada, completada

3. **Gestión de Pagos**
   - Cálculo automático del adelanto (25%)
   - Registro de pagos parciales
   - Seguimiento de saldo pendiente
   - Generación de recibos imprimibles

4. **Operaciones Hoteleras**
   - Check-in con validación de pago completo
   - Cancelación manual con advertencias
   - Auto-cancelación automática después de 24hs
   - Liberación automática de habitaciones

5. **Dashboard Interactivo**
   - Vista general de sprints y progreso
   - Estadísticas de story points
   - Navegación por funcionalidades
   - Sistema integrado completo

## 🔐 Validaciones y Seguridad

- Validación de fechas (check-in antes de check-out)
- Validación de pagos (no exceder saldo pendiente)
- Validación de estado de reservas
- Prevención de double-booking
- Confirmación de operaciones críticas (cancelaciones)

## 📝 Documentación Adicional

- **Documento principal:** `../PROYECTO_HOTEL_ANDINO.md`
  - Documento de Visión completo
  - 20 Reglas de Negocio detalladas
  - Encuestas a stakeholders
  - Instrumentos de relevamiento
  - Definición completa de sprints

- **Guía de ejecución:** `GUIA_EJECUCION.md`
  - Instrucciones detalladas de uso
  - Flujos de trabajo
  - Casos de uso

## 🎓 Contexto Académico

**Facultad de Ingeniería y Ciencias Exactas**  
*Sistemas de Información II - Clase 11*  
*Caso Práctico: Hotel Andino*  
*Metodología: SCRUM*  
*Octubre 2025*

## 📈 Estado del Proyecto

- ✅ **Sprint 1:** 100% completado (3/3 features)
- ✅ **Sprint 2:** 100% completado (3/3 features)
- ✅ **Sprint 3:** 100% completado (2/2 features principales)
- ✅ **Sprint 4:** 80% completado (2/2 features principales implementadas)
- 🔄 **Reportes:** Pendiente (Sprint 4 - PB-12)

**Total:** 10 páginas funcionales implementadas + 1 sistema integrado

## 🚀 Próximos Pasos

1. Implementar módulo de reportes (PB-12)
2. Agregar persistencia con base de datos
3. Implementar autenticación de usuarios
4. Añadir notificaciones por email
5. Dashboard de estadísticas avanzadas
6. Exportación de reportes en PDF/Excel

---

**Desarrollado con ❤️ siguiendo metodología SCRUM**
