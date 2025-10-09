# 🚀 Guía Rápida de Acceso - Hotel Andino MVP

## ✅ Estado del Sistema

**Servidor:** ✅ En ejecución  
**URL Local:** http://localhost:3000  
**Estado:** Completamente funcional  

---

## 🗺️ Mapa de Navegación

### Dashboard Principal
**Ruta:** `/`  
**Contenido:** Vista general de sprints, estadísticas y acceso a todas las funcionalidades

### Sistema Integrado
**Ruta:** `/sistema`  
**Contenido:** Vista completa con navegación por módulos (Reservas, Pagos, Operaciones, Reportes)

---

## 📍 Rutas por Funcionalidad

### Sprint 1 - Funcionalidades Core

| Funcionalidad | Ruta | Descripción |
|--------------|------|-------------|
| Consulta Disponibilidad | `/sprint1/availability` | Búsqueda de habitaciones por fechas |
| Catálogo Habitaciones | `/sprint1/catalog` | Vista completa de tipos y precios |
| Número de Reserva | `/sprint1/reservation-number` | Generador automático |

### Sprint 2 - Gestión de Pagos

| Funcionalidad | Ruta | Descripción |
|--------------|------|-------------|
| Nueva Reserva | `/sprint2/new-reservation` | Formulario completo de reserva |
| Cálculo Adelanto | `/sprint2/payment-calculation` | Calculadora del 25% |
| Registro de Pago | `/sprint2/payment-register` | Registrar adelanto/saldo |

### Sprint 3 - Comprobantes

| Funcionalidad | Ruta | Descripción |
|--------------|------|-------------|
| Generación Recibos | `/sprint3/receipt` | Recibos imprimibles |
| Auto-cancelación | `/sprint3/auto-cancel` | Monitor de timeout 24hs |

### Sprint 4 - Operaciones

| Funcionalidad | Ruta | Descripción |
|--------------|------|-------------|
| Check-In | `/sprint4/checkin` | Proceso de ingreso |
| Cancelación Manual | `/sprint4/cancel` | Cancelar reservas |

---

## 🎯 Flujo de Trabajo Recomendado

### 1. Exploración Inicial
1. Acceder al dashboard: http://localhost:3000
2. Revisar las estadísticas de los sprints
3. Explorar el sistema integrado: http://localhost:3000/sistema

### 2. Caso de Uso Completo

#### Paso 1: Consultar Disponibilidad
→ `/sprint1/availability`
- Seleccionar fechas de estadía
- Ver habitaciones disponibles

#### Paso 2: Ver Catálogo
→ `/sprint1/catalog`
- Explorar tipos de habitaciones
- Revisar precios y amenities

#### Paso 3: Crear Reserva
→ `/sprint2/new-reservation`
- Seleccionar habitación
- Ingresar fechas
- Completar datos del huésped
- Ver cálculo automático del adelanto (25%)

#### Paso 4: Calcular Adelanto
→ `/sprint2/payment-calculation`
- Ver ejemplo de cálculo del 25%
- Entender la fórmula

#### Paso 5: Registrar Pago
→ `/sprint2/payment-register`
- Seleccionar reserva
- Registrar pago del adelanto
- Ver historial de pagos

#### Paso 6: Generar Recibo
→ `/sprint3/receipt`
- Seleccionar reserva y pago
- Ver recibo completo
- Opción de imprimir

#### Paso 7: Monitorear Auto-cancelación
→ `/sprint3/auto-cancel`
- Ver reservas pendientes
- Monitorear cuenta regresiva 24hs
- Ver cancelaciones automáticas

#### Paso 8: Check-In
→ `/sprint4/checkin`
- Verificar pago completo
- Realizar check-in
- Completar proceso

---

## 🔍 Características a Probar

### Validaciones
- [ ] Intentar crear reserva con fechas inválidas
- [ ] Intentar check-in sin pago completo
- [ ] Cancelar reserva (ver advertencia de no reintegro)
- [ ] Ver auto-cancelación de reserva sin pago

### Cálculos
- [ ] Verificar cálculo del 25% de adelanto
- [ ] Comprobar tarifa total (precio × noches)
- [ ] Ver saldo pendiente después del adelanto

### Estados
- [ ] Ver cambio de estado: pendiente → confirmada
- [ ] Ver estado después de check-in: completada
- [ ] Ver estado de canceladas

### UX
- [ ] Navegación entre páginas
- [ ] Diseño responsive
- [ ] Feedback visual de acciones
- [ ] Mensajes de error/éxito

---

## 📊 Datos de Prueba

### Habitaciones Disponibles
El sistema incluye 5 habitaciones mock:
- Habitación 101: Simple ($15,000/noche)
- Habitación 201: Doble ($25,000/noche)
- Habitación 301: Suite ($45,000/noche)
- Habitación 401: Deluxe ($60,000/noche)
- Habitación 202: Doble ($25,000/noche)

### Ejemplo de Reserva
- **Habitación:** 201 (Doble)
- **Precio:** $25,000/noche
- **Noches:** 3
- **Total:** $75,000
- **Adelanto (25%):** $18,750
- **Saldo:** $56,250

---

## 🛠️ Comandos Útiles

### Desarrollo
```bash
npm run dev          # Iniciar servidor de desarrollo
npm run build        # Compilar para producción
npm run start        # Iniciar servidor de producción
npm run lint         # Verificar código
```

### Acceso
```bash
# Abrir en navegador
open http://localhost:3000

# Ver logs del servidor
# (el servidor debe estar corriendo en la terminal)
```

---

## 🐛 Troubleshooting

### El servidor no inicia
```bash
cd hotel-andino-mvp
npm install
npm run dev
```

### Puerto ocupado
Si el puerto 3000 está ocupado, Next.js sugerirá otro puerto automáticamente.

### Errores de compilación
Todos los errores de TypeScript han sido corregidos. Si aparece alguno nuevo:
```bash
npm run lint
```

---

## 📱 Acceso desde Dispositivos Móviles

Si estás en la misma red:
- **URL:** http://[TU-IP-LOCAL]:3000
- Ejemplo: http://10.100.65.25:3000

El sistema es completamente responsive.

---

## ✅ Checklist de Demostración

### Preparación
- [ ] Servidor corriendo en http://localhost:3000
- [ ] Navegador abierto
- [ ] Sin errores en consola

### Demostración Sprint 1
- [ ] Mostrar consulta de disponibilidad
- [ ] Navegar catálogo de habitaciones
- [ ] Generar número de reserva

### Demostración Sprint 2
- [ ] Crear nueva reserva completa
- [ ] Mostrar cálculo de adelanto
- [ ] Registrar pago

### Demostración Sprint 3
- [ ] Generar y mostrar recibo
- [ ] Explicar sistema de auto-cancelación

### Demostración Sprint 4
- [ ] Realizar check-in
- [ ] Mostrar cancelación manual

### Sistema Integrado
- [ ] Mostrar dashboard principal
- [ ] Navegar sistema completo
- [ ] Explicar arquitectura

---

## 🎓 Notas para Presentación

### Puntos Clave
1. ✅ Metodología SCRUM aplicada (4 sprints de 10 min)
2. ✅ 64 story points implementados (48% del backlog)
3. ✅ 11 reglas de negocio críticas implementadas
4. ✅ Stack moderno: Next.js 15 + TypeScript + Tailwind
5. ✅ Sistema completamente funcional sin backend

### Aspectos Destacados
- Sistema de auto-cancelación en tiempo real
- Validaciones completas de reglas de negocio
- UX moderna e intuitiva
- Código type-safe al 100%
- Documentación completa

### Futuras Mejoras
- Módulo de reportes
- Integración con base de datos
- Sistema de autenticación
- Notificaciones por email

---

**¡Sistema listo para demostración! 🚀**

**URL:** http://localhost:3000  
**Documentación:** Ver README.md y PROYECTO_HOTEL_ANDINO.md  
**Resumen:** Ver RESUMEN_EJECUTIVO.md
