# Proyecto Hotel Andino - Sistema de Administración de Reservas

## Descripción del Caso

El hotel Andino funciona en Mendoza desde hace 30 años, se mantiene ocupado prácticamente todo el año y en temporada de invierno queda sin disponibilidad en el mes de Julio. Para poder alojarse en este hotel hay que hacer reservas con anticipación y respetar la política del hotel de abonar un adelanto equivalente al **25% de la tarifa** (precio de la habitación * cantidad de días de estadía).

### Proceso Actual de Reservas

1. **Consulta:** Un cliente consulta sobre sus necesidades de alojamiento al empleado del hotel
2. **Verificación:** El empleado verifica la disponibilidad de habitaciones y las comunica al cliente junto con el precio
3. **Confirmación:** Cuando el cliente confirma la reserva, el empleado registra los datos personales de las personas que se van a alojar
4. **Adelanto:** El empleado informa el número de reserva y el importe del adelanto (25% de la tarifa)
5. **Pago:** El cliente puede pagar en pesos argentinos o dólares
6. **Registro:** El empleado registra la fecha de pago y genera un recibo
7. **Política de cancelación:** Si el cliente cancela, no se reintegra el dinero del adelanto
8. **Vencimiento:** Si el cliente no informa el pago en 24 horas, la reserva será cancelada
9. **Check-in:** Cuando el cliente ingresa al hotel, la reserva se convierte en estadía

**Reportes requeridos:** La gerencia necesita informes semanales de Reservas Emitidas y Reservas Concretadas.

---

## Equipo Scrum

### Product Owner (PO)
- **Responsable:** [Nombre del PO]
- **Responsabilidades:**
  - Definir y priorizar el Product Backlog
  - Actuar como stakeholder principal representando a la gerencia del hotel
  - Validar que los prototipos y funcionalidades cumplan con los requerimientos
  - Tomar decisiones sobre el alcance y funcionalidades
  - Hacer observaciones durante las Daily Scrum para asegurar ajuste a requerimientos
  - Disponibilidad para resolver dudas del equipo

### Scrum Master
- **Responsable:** [Nombre del Scrum Master]
- **Responsabilidades:**
  - Facilitar todas las ceremonias de Scrum
  - Armar y mantener el tablero Kanban (Para hacer, En proceso, Para revisión, Listo)
  - Eliminar impedimentos del equipo
  - Tomar nota de los avances en las Daily Scrum
  - Solucionar dificultades que tuvo el equipo para trabajar
  - Promover las prácticas ágiles
  - Proteger al equipo de interrupciones externas

### Development Team
- Desarrolladores (responsables de prototipar/desarrollar las funcionalidades)
- Cada integrante elige tareas del Sprint Backlog
- Responsables de estimar tiempos de cada tarea
- Participan activamente en las Daily Scrum

---

## ACTIVIDAD 1 - Proceso de Elicitación

## 1. Reglas del Negocio

### Reglas de Validación
1. **RN-V01:** El adelanto de una reserva debe ser exactamente el 25% de la tarifa total (precio habitación × cantidad de días)
2. **RN-V02:** Los datos personales de todas las personas que se alojarán son obligatorios para confirmar una reserva
3. **RN-V03:** El pago puede realizarse únicamente en pesos argentinos o dólares estadounidenses
4. **RN-V04:** Una reserva debe tener asociado un número único de identificación

### Reglas de Proceso
5. **RN-P01:** La verificación de disponibilidad debe realizarse ANTES de informar precios al cliente
6. **RN-P02:** El registro de datos personales solo se realiza DESPUÉS de que el cliente confirme que realizará la reserva
7. **RN-P03:** El recibo de pago se genera inmediatamente después de registrar la fecha de pago
8. **RN-P04:** El recibo se entrega físicamente al cliente cuando ingresa al hotel
9. **RN-P05:** Una reserva se convierte automáticamente en estadía al momento del check-in del cliente
10. **RN-P06:** Los informes de Reservas Emitidas y Reservas Concretadas deben prepararse semanalmente

### Reglas de **Restricción**
11. **RN-R01:** No se puede confirmar una reserva sin verificar disponibilidad previa
12. **RN-R02:** El hotel no permite alojamiento sin reserva previa (excepto casos especiales)
13. **RN-R03:** No se puede registrar un pago sin una reserva válida existente
14. **RN-R04:** Una reserva cancelada NO puede ser reactivada (debe crearse una nueva)

### Reglas de Terminación
15. **RN-T01:** Si el cliente no informa el pago del adelanto en 24 horas, la reserva será cancelada automáticamente
16. **RN-T02:** Una vez cancelada una reserva, el dinero del adelanto NO se reintegra bajo ninguna circunstancia
17. **RN-T03:** El proceso de reserva finaliza exitosamente cuando se registra el pago y se genera el recibo

### Reglas de Cálculo
18. **RN-C01:** Tarifa Total = Precio de la Habitación × Cantidad de Días de Estadía
19. **RN-C02:** Adelanto = Tarifa Total × 0.25 (25%)

### Reglas de Disponibilidad
20. **RN-D01:** En temporada de invierno (julio) el hotel alcanza ocupación del 100%
21. **RN-D02:** El hotel mantiene alta ocupación durante todo el año

---

## 2. Documento de Visión

### 2.1 Introducción

#### Propósito
Este documento define la visión del Sistema de Administración de Reservas para el Hotel Andino, que permitirá automatizar e integrar las acciones e información relacionadas con la gestión de reservas, pagos, estadías y reportes gerenciales.

#### Alcance
El sistema cubrirá todo el ciclo de vida de una reserva: desde la consulta inicial de disponibilidad hasta la conversión en estadía, incluyendo la gestión de pagos, cancelaciones y generación de reportes.

### 2.2 Posicionamiento

#### Oportunidad de Negocio
El Hotel Andino, con 30 años de trayectoria y alta ocupación anual, requiere un sistema que:
- Automatice el proceso manual de reservas
- Reduzca errores humanos en la gestión de disponibilidad
- Agilice el control de pagos y adelantos
- Facilite la generación de reportes gerenciales
- Mejore la experiencia del cliente

#### Declaración del Problema
| **El problema de** | Gestión manual de reservas, control de pagos y generación de reportes |
|--------------------|------------------------------------------------------------------------|
| **Afecta a** | Empleados del hotel, gerencia y clientes |
| **Cuyo impacto es** | Pérdida de tiempo, posibles errores en disponibilidad, dificultad en seguimiento de pagos, reportes tardíos |
| **Una solución exitosa sería** | Un sistema automatizado que integre reservas, pagos y reportes en tiempo real |

### 2.3 Descripción de Stakeholders y Usuarios

#### Resumen de Stakeholders
1. **Gerencia del Hotel**
   - Necesita reportes semanales precisos
   - Requiere visibilidad de ocupación y reservas
   - Interesado en optimización de ingresos

2. **Empleados del Hotel (Recepción)**
   - Usuarios principales del sistema
   - Necesitan agilidad en consultas y registro
   - Requieren interfaz intuitiva y rápida

3. **Clientes/Huéspedes**
   - Beneficiarios indirectos del sistema
   - Esperan servicio eficiente
   - Necesitan confirmación clara de reservas

4. **Departamento de Contabilidad**
   - Requiere información de pagos
   - Necesita conciliación de adelantos
   - Maneja múltiples monedas (pesos/dólares)

### 2.4 Visión del Producto

**Para** el Hotel Andino  
**Que** necesita automatizar su proceso de reservas  
**El** Sistema de Administración de Reservas  
**Es un** sistema de gestión hotelera  
**Que** permite verificar disponibilidad, registrar reservas, controlar pagos y generar reportes  
**A diferencia de** la gestión manual actual  
**Nuestro producto** integra toda la información, reduce errores y proporciona datos en tiempo real

### 2.5 Características del Producto

| Prioridad | Característica | Beneficio |
|-----------|---------------|-----------|
| Alta | Consulta de disponibilidad en tiempo real | Evita doble reserva y ofrece información precisa al cliente |
| Alta | Registro de reservas con datos del cliente | Centraliza información y genera número de reserva único |
| Alta | Control de pagos y adelantos | Garantiza cumplimiento de política del 25% |
| Alta | Cancelación automática a las 24hs | Libera habitaciones no pagadas automáticamente |
| Media | Gestión de múltiples monedas | Facilita pago en pesos o dólares |
| Media | Generación automática de recibos | Agiliza proceso y reduce errores |
| Media | Reportes semanales automatizados | Ahorra tiempo a gerencia y empleados |
| Baja | Conversión automática de reserva a estadía | Simplifica check-in |

### 2.6 Restricciones

1. **Técnicas:**
   - Debe integrarse con sistema actual del hotel (si existe)
   - Debe soportar múltiples usuarios concurrentes
   - Debe mantener histórico de reservas

2. **Operativas:**
   - Tiempo de respuesta menor a 3 segundos para consultas
   - Disponibilidad 24/7 para consultas web (futura fase)
   - Personal requiere capacitación mínima (interfaz intuitiva)

3. **Normativas:**
   - Cumplimiento de ley de protección de datos personales
   - Regulaciones fiscales para facturación

---

## 3. Stakeholders Involucrados

### Stakeholders Primarios

1. **Gerente General del Hotel**
   - **Interés:** Visibilidad del negocio, optimización de ocupación, control financiero
   - **Nivel de influencia:** Alto
   - **Participación:** Definición de reportes y métricas clave

2. **Empleados de Recepción**
   - **Interés:** Herramienta ágil y fácil de usar para gestión diaria
   - **Nivel de influencia:** Medio-Alto
   - **Participación:** Usuarios principales, feedback constante

3. **Clientes/Huéspedes**
   - **Interés:** Proceso de reserva simple y confirmación clara
   - **Nivel de influencia:** Medio
   - **Participación:** Validación de experiencia de usuario

### Stakeholders Secundarios

4. **Departamento de Contabilidad/Finanzas**
   - **Interés:** Registro preciso de pagos y adelantos
   - **Nivel de influencia:** Medio
   - **Participación:** Definición de reportes financieros

5. **Personal de Limpieza/Housekeeping**
   - **Interés:** Información sobre check-outs y habitaciones a preparar
   - **Nivel de influencia:** Bajo
   - **Participación:** Posible integración futura

6. **Equipo de IT/Soporte Técnico**
   - **Interés:** Mantenibilidad y estabilidad del sistema
   - **Nivel de influencia:** Medio
   - **Participación:** Implementación y soporte

---

## 4. Encuestas a los 3 Principales Stakeholders

### Encuesta para Gerente General del Hotel

**Objetivo:** Conocer las necesidades gerenciales y expectativas de reportes

1. **¿Qué información específica necesita ver en los reportes semanales de Reservas Emitidas y Reservas Concretadas?**
   - ¿Desea ver comparativas con períodos anteriores?
   - ¿Necesita desglose por tipo de habitación?
   - ¿Requiere información sobre ingresos por adelantos?

2. **¿Qué indicadores clave (KPIs) le ayudarían a tomar mejores decisiones sobre la gestión del hotel?**
   - ¿Tasa de cancelación?
   - ¿Tiempo promedio entre reserva y check-in?
   - ¿Porcentaje de ocupación por temporada?

3. **¿Existen períodos del año donde necesita mayor control o información específica? (además de julio que ya está al 100%)**
   - ¿Hay otras temporadas altas?
   - ¿Períodos donde hay más cancelaciones?

4. **¿Qué funcionalidades adicionales le gustaría que el sistema ofreciera a mediano plazo?**
   - ¿Gestión de servicios adicionales (spa, ski, traslados)?
   - ¿Programa de fidelización?
   - ¿Proyecciones de ocupación?

5. **¿Cuál sería el impacto más importante que espera del nuevo sistema en la operación del hotel?**
   - ¿Reducción de errores?
   - ¿Aumento de reservas?
   - ¿Mejor control financiero?

---

### Encuesta para Empleados de Recepción

**Objetivo:** Entender el flujo de trabajo actual y necesidades operativas

1. **¿Cuáles son las dificultades más frecuentes que enfrenta en el proceso actual de reservas?**
   - ¿Demoras en verificar disponibilidad?
   - ¿Errores en cálculos de adelantos?
   - ¿Seguimiento de pagos?

2. **¿Cuánto tiempo en promedio le toma atender una consulta y confirmar una reserva completa?**
   - Desde la consulta inicial hasta el registro del pago
   - ¿Qué parte del proceso consume más tiempo?

3. **¿Qué información sobre los clientes considera más importante registrar y consultar rápidamente?**
   - ¿Historial de estadías previas?
   - ¿Preferencias especiales?
   - ¿Información de contacto actualizada?

4. **¿Cómo maneja actualmente el seguimiento de las reservas que están pendientes de pago (antes de las 24 horas)?**
   - ¿Sistema de recordatorios?
   - ¿Contacto manual con clientes?
   - ¿Hay muchas cancelaciones por falta de pago?

5. **¿Qué características le gustaría que tenga el nuevo sistema para hacer su trabajo más eficiente?**
   - ¿Alertas automáticas?
   - ¿Acceso rápido a información?
   - ¿Integración con email/WhatsApp?

---

### Encuesta para Clientes/Huéspedes

**Objetivo:** Conocer la experiencia del cliente y expectativas del servicio

1. **¿Cómo prefiere realizar la consulta y reserva de una habitación?**
   - ¿Por teléfono?
   - ¿Presencialmente?
   - ¿Le gustaría poder hacerlo por internet?

2. **¿Qué información considera más importante conocer antes de confirmar su reserva?**
   - ¿Descripción detallada de habitaciones?
   - ¿Fotos actualizadas?
   - ¿Servicios incluidos?
   - ¿Política de cancelación clara?

3. **¿Cómo prefiere realizar el pago del adelanto del 25%?**
   - ¿Transferencia bancaria?
   - ¿Tarjeta de crédito?
   - ¿Efectivo presencial?
   - ¿Otros métodos digitales (MercadoPago, PayPal)?

4. **¿Le gustaría recibir algún tipo de confirmación o recordatorio sobre su reserva?**
   - ¿Email?
   - ¿SMS/WhatsApp?
   - ¿Cuántos días antes del check-in?

5. **¿Qué servicios adicionales le interesaría poder contratar anticipadamente al hacer su reserva?**
   - ¿Alquiler de equipos de ski?
   - ¿Traslados desde/hacia el aeropuerto?
   - ¿Spa o masajes?
   - ¿Excursiones turísticas?

---

## 5. Instrumentos Adicionales para Obtención de Información

### Instrumento 1: Observación Directa (Job Shadowing)

**Descripción:**  
Observar durante una jornada completa el trabajo de los empleados de recepción, documentando:
- Tiempo empleado en cada actividad
- Herramientas utilizadas (teléfono, registros en papel, Excel, etc.)
- Frecuencia de consultas y reservas
- Interrupciones y problemas que surgen
- Comunicación con otros departamentos

**Objetivo:**
- Identificar cuellos de botella en el proceso
- Detectar necesidades no expresadas en entrevistas
- Validar información recabada en encuestas
- Entender contexto real de trabajo

**Duración sugerida:** 2-3 días completos (incluyendo diferentes días de la semana y si es posible, temporada alta y baja)

---

### Instrumento 2: Análisis de Documentación Existente

**Descripción:**  
Revisar y analizar toda la documentación actual del proceso de reservas:

**Documentos a analizar:**
- Planillas o registros de reservas actuales (últimos 6 meses)
- Formatos de recibos utilizados
- Reportes semanales enviados a gerencia
- Políticas escritas del hotel
- Tarifario de habitaciones
- Estadísticas de ocupación histórica
- Registros de cancelaciones y motivos
- Reclamos o incidencias registradas

**Objetivo:**
- Cuantificar volumen de operaciones
- Identificar patrones (temporadas, tipos de habitaciones más solicitadas)
- Detectar problemas recurrentes
- Obtener datos históricos para estimaciones
- Identificar todos los campos de información que actualmente se registran

**Análisis estadístico:**
- Promedio de reservas mensuales
- Tasa de conversión (consultas → reservas confirmadas)
- Tasa de cancelación
- Tiempo promedio entre reserva y check-in
- Distribución de pagos (pesos vs dólares)

---

### Instrumento 3 (Opcional): Workshop con Stakeholders

**Descripción:**  
Reunión facilitada de 2-3 horas con representantes de todos los stakeholders clave

**Actividades:**
- Mapeo del proceso actual (As-Is) en conjunto
- Identificación de pain points
- Lluvia de ideas sobre proceso ideal (To-Be)
- Priorización de funcionalidades mediante técnicas como MoSCoW o Dot Voting
- Definición colaborativa de criterios de éxito

**Beneficios:**
- Alinear expectativas de todos los involucrados
- Resolver conflictos de requerimientos tempranamente
- Generar consenso sobre prioridades
- Fomentar apropiación del proyecto por parte de stakeholders

---

## Historias de Usuario (de Clase 4)

### Historia de Usuario #1: Potencial Pasajero

**Como** potencial huésped del Hotel Andino  
**Quiero** poder consultar la disponibilidad de habitaciones y conocer si hay descuentos por cantidad de días o modificación de las fechas de la estadía  
**Para** poder planificar mi estancia y aprovechar las mejores ofertas

**Además quiero** tener la opción de contratar anticipadamente otros servicios, como alquiler de equipos de ski y traslados  
**Para** asegurarme de que tengo todo lo necesario para disfrutar de mi estancia sin preocupaciones

#### Criterios de Aceptación:
- **CA-1.1:** El sistema debe mostrar la disponibilidad de habitaciones para un rango de fechas específico en menos de 3 segundos
- **CA-1.2:** Se debe visualizar el precio base de cada tipo de habitación disponible
- **CA-1.3:** Si existen descuentos por cantidad de días, deben mostrarse automáticamente al calcular el precio
- **CA-1.4:** El cliente debe poder modificar las fechas y ver cómo cambia el precio en tiempo real
- **CA-1.5:** Debe existir una sección donde se puedan visualizar y contratar servicios adicionales (ski, traslados)
- **CA-1.6:** Los servicios adicionales deben poder agregarse antes de confirmar la reserva
- **CA-1.7:** El precio total debe incluir habitación + servicios adicionales + impuestos

---

### Historia de Usuario #2: Empleado del Hotel

**Como** empleado de recepción del Hotel Andino  
**Quiero** poder registrar las reservas de los clientes y gestionar los pagos  
**Para** garantizar que las habitaciones estén correctamente reservadas y asignadas

**Además quiero** poder organizar los francos en función de los días de descanso del resto de mis compañeros y la cantidad de empleados estimada según la ocupación del hotel  
**Para** asegurar que hay suficiente personal disponible para atender a los pasajeros

#### Criterios de Aceptación:
- **CA-2.1:** El sistema debe permitir crear una nueva reserva ingresando datos del cliente y fechas de estadía
- **CA-2.2:** Al crear la reserva, el sistema debe calcular automáticamente el adelanto del 25%
- **CA-2.3:** Debe generarse un número único de reserva automáticamente
- **CA-2.4:** El sistema debe permitir registrar el pago del adelanto (en pesos o dólares) y la fecha de pago
- **CA-2.5:** Al registrar el pago, debe generarse automáticamente un recibo imprimible
- **CA-2.6:** El sistema debe mostrar alertas de reservas pendientes de pago (próximas a cumplir 24 horas)
- **CA-2.7:** El sistema debe cancelar automáticamente reservas sin pago después de 24 horas
- **CA-2.8:** Debe existir un módulo de gestión de personal que muestre ocupación estimada
- **CA-2.9:** Los empleados deben poder solicitar francos considerando la ocupación del hotel
- **CA-2.10:** El sistema debe alertar si hay insuficiente personal para una fecha con alta ocupación

---

## ACTIVIDAD CLASE 11: Prototipado + SCRUM

## Product Backlog

El Product Owner define el listado completo de funcionalidades requeridas para el sistema, considerando:
- Requerimientos identificados en Actividad 1
- Casos de Uso definidos en Clase 5
- Historias de Usuario #1 y #2

### Product Backlog Priorizado

| ID | Funcionalidad | Prioridad | Estimación | Épica |
|----|---------------|-----------|------------|-------|
| PB-01 | Consulta de disponibilidad de habitaciones por rango de fechas | ALTA | 10 min | Reservas |
| PB-02 | Visualización de catálogo de habitaciones con precios | ALTA | 10 min | Reservas |
| PB-03 | Registro de nueva reserva con datos del cliente | ALTA | 15 min | Reservas |
| PB-04 | Cálculo automático del adelanto (25% de tarifa total) | ALTA | 5 min | Pagos |
| PB-05 | Registro de pago (pesos/dólares) y fecha de pago | ALTA | 10 min | Pagos |
| PB-06 | Generación automática de número de reserva | ALTA | 5 min | Reservas |
| PB-07 | Generación e impresión de recibo de pago | ALTA | 10 min | Pagos |
| PB-08 | Cancelación automática de reservas sin pago (24hs) | ALTA | 10 min | Reservas |
| PB-09 | Alertas de reservas pendientes de pago | MEDIA | 5 min | Notificaciones |
| PB-10 | Proceso de check-in (conversión reserva → estadía) | MEDIA | 10 min | Operaciones |
| PB-11 | Cancelación manual de reserva (sin reintegro) | MEDIA | 10 min | Reservas |
| PB-12 | Reporte semanal de Reservas Emitidas | MEDIA | 10 min | Reportes |
| PB-13 | Reporte semanal de Reservas Concretadas | MEDIA | 10 min | Reportes |
| PB-14 | Gestión de servicios adicionales (ski, traslados) | BAJA | 15 min | Servicios |
| PB-15 | Consulta de descuentos por cantidad de días | BAJA | 10 min | Promociones |
| PB-16 | Historial de reservas por cliente | BAJA | 10 min | Clientes |
| PB-17 | Gestión de francos del personal | BAJA | 15 min | RRHH |
| PB-18 | Dashboard de ocupación del hotel | BAJA | 10 min | Reportes |

**Total Product Backlog:** 180 minutos de estimación

---

## Planificación de Sprints

### Estructura del Simulacro Scrum

**Duración de cada Sprint:** 10 minutos  
**Duración de cada "día" de trabajo:** 5 minutos  
**Total de "días" por Sprint:** 2 iteraciones  
**Tablero Kanban:** 4 columnas (Para hacer | En proceso | Para revisión | Listo)

---

## SPRINT 1: Funcionalidades Core de Reservas

### Sprint Planning (10 minutos)

**Objetivo del Sprint:**  
Desarrollar las funcionalidades básicas que permitan consultar disponibilidad y crear una reserva con su número único.

**Participantes:**
- Product Owner: Define prioridades
- Scrum Master: Facilita la reunión
- Development Team: Estima esfuerzo y se compromete

### Sprint Backlog - Sprint 1

| ID | Tarea | Asignado a | Estimación | Dependencias |
|----|-------|------------|------------|--------------|
| PB-01 | Consulta de disponibilidad de habitaciones por rango de fechas | Dev 1 | 10 min | - |
| PB-02 | Visualización de catálogo de habitaciones con precios | Dev 2 | 10 min | - |
| PB-03 | Registro de nueva reserva con datos del cliente | Dev 1 | 15 min | PB-01, PB-02 |
| PB-06 | Generación automática de número de reserva | Dev 3 | 5 min | - |

**Total Sprint 1:** 40 minutos → **Ajustado a 10 minutos reales** (velocidad del equipo)

**Tablero Kanban Inicial:**

```
┌─────────────┬────────────┬──────────────┬────────┐
│ Para hacer  │ En proceso │ Para revisión│  Listo │
├─────────────┼────────────┼──────────────┼────────┤
│ PB-01 (10') │            │              │        │
│ PB-02 (10') │            │              │        │
│ PB-03 (15') │            │              │        │
│ PB-06 (5')  │            │              │        │
└─────────────┴────────────┴──────────────┴────────┘
```

---

### Día 1 - Sprint 1 (5 minutos de trabajo)

**Daily Scrum (1 minuto):**
- **¿Qué hice ayer?** - Nada (primer día)
- **¿Qué voy a hacer hoy?** 
  - Dev 1: Empezar PB-01 (Consulta disponibilidad)
  - Dev 2: Empezar PB-02 (Catálogo habitaciones)
  - Dev 3: Empezar PB-06 (Número de reserva)
- **¿Qué impedimentos tengo?** - Ninguno

**Prototipado (5 min):** Cada desarrollador trabaja en su tarea asignada

**Estado del Tablero al final del Día 1:**
```
┌─────────────┬────────────┬──────────────┬────────┐
│ Para hacer  │ En proceso │ Para revisión│  Listo │
├─────────────┼────────────┼──────────────┼────────┤
│ PB-03 (15') │ PB-01 (5') │              │        │
│             │ PB-02 (5') │              │        │
│             │ PB-06 (2') │              │        │
└─────────────┴────────────┴──────────────┴────────┘
```

---

### Día 2 - Sprint 1 (5 minutos de trabajo)

**Daily Scrum (1 minuto):**
- **¿Qué hice ayer?** 
  - Dev 1: Avance 50% en consulta de disponibilidad
  - Dev 2: Avance 50% en catálogo de habitaciones
  - Dev 3: Avance 60% en generación de número de reserva
- **¿Qué voy a hacer hoy?**
  - Dev 1: Completar PB-01 y empezar PB-03
  - Dev 2: Completar PB-02 y ayudar con PB-03
  - Dev 3: Completar PB-06 y ayudar con PB-03
- **¿Qué impedimentos tengo?** 
  - Dev 2: Necesita definir formato exacto de visualización (PO aclara)

**Prototipado (5 min):** Completar tareas y trabajo en equipo en PB-03

**Validación del PO:** Revisa prototipos completados (incluido en el tiempo)
- ✅ PB-01 Aprobado
- ✅ PB-02 Aprobado  
- ✅ PB-06 Aprobado
- ✅ PB-03 Completado al 60%

**Estado del Tablero al final del Día 2:**
```
┌─────────────┬────────────┬──────────────┬───────────┐
│ Para hacer  │ En proceso │ Para revisión│   Listo   │
├─────────────┼────────────┼──────────────┼───────────┤
│             │ PB-03 (6') │              │ PB-01 ✓   │
│             │            │              │ PB-02 ✓   │
│             │            │              │ PB-06 ✓   │
└─────────────┴────────────┴──────────────┴───────────┘
```

**Nota:** PB-03 quedará parcialmente completo debido al tiempo limitado del sprint.

---

### Sprint Review - Sprint 1 (Momento de demo)

**Participantes:** Todo el equipo + PO + stakeholders

**Incremento del Producto:**
El equipo presenta los prototipos en papel:
1. ✅ Pantalla de consulta de disponibilidad (PB-01)
2. ✅ Catálogo visual de habitaciones con precios (PB-02)
3. ⚠️ Formulario de registro de reserva (PB-03) - 60% completo
4. ✅ Sistema de generación automática de número de reserva (PB-06)

**Feedback del PO:**
- Se validó que el flujo es correcto
- PB-03 deberá completarse en el próximo sprint
- Sugerencia: agregar campo de observaciones en PB-03 (tomar para próximo sprint)

**Métricas:**
- **Comprometido:** 40 story points (min)
- **Completado:** 25 story points (min) - PB-01 (10) + PB-02 (10) + PB-06 (5)
- **Velocity:** 25 puntos
- **PB-03 pasa al backlog del Sprint 2**

---

### Sprint Retrospective - Sprint 1

**¿Qué salió bien?**
- Buena comunicación en las Daily Scrum
- Completamos las tareas más críticas (PB-01, PB-02, PB-06)
- Pair programming sería útil para tareas complejas

**¿Qué podemos mejorar?**
- Subestimamos la complejidad de PB-03
- Necesitamos priorizar mejor las tareas dentro del sprint
- Definir mejor los formatos al inicio (para evitar aclaraciones durante el sprint)

**Acciones de mejora para Sprint 2:**
- [ ] Ser más conservadores con las estimaciones
- [ ] Completar PB-03 como primera prioridad
- [ ] Tener reunión de refinamiento antes del Sprint Planning
- [ ] Aplicar pair programming en tareas complejas

**Aprendizajes:**
- Con sprints de 10 minutos, es mejor comprometerse a menos tareas
- La velocity real del equipo es de aproximadamente 25 puntos por sprint de 10 min

---

## SPRINT 2: Gestión de Pagos y Adelantos

### Sprint Planning (10 minutos)

**Objetivo del Sprint:**  
Completar el registro de reservas (PB-03 pendiente) e implementar el módulo completo de pagos, incluyendo registro de adelanto y generación de recibos.

### Sprint Backlog - Sprint 2

| ID | Tarea | Asignado a | Estimación | Dependencias |
|----|-------|------------|------------|--------------|
| PB-03 | Completar registro de reserva (pendiente) | Dev 1 + Dev 2 | 9 min | - |
| PB-04 | Cálculo automático del adelanto (25%) | Dev 3 | 5 min | PB-03 |
| PB-05 | Registro de pago con fecha y moneda | Dev 1 | 10 min | PB-04 |
| PB-07 | Generación e impresión de recibo | Dev 2 | 10 min | PB-05 |

**Total Sprint 2:** 34 minutos → **Ajustado a 10 minutos reales**  
**Enfoque:** Priorizar PB-03, PB-04 y avanzar lo más posible en PB-05

---

### Ejecución Sprint 2 (Resumen)

**Día 1 (5 min):**
- Daily Scrum: Planificación y asignación
- Trabajo: Completar PB-03 (prioridad máxima), iniciar PB-04
- Resultado: PB-03 ✓ completado, PB-04 al 80%

**Día 2 (5 min):**
- Daily Scrum: Reporte de avances
- Trabajo: Completar PB-04, iniciar PB-05 en equipo
- Resultado: PB-04 ✓ completado, PB-05 al 50%

**Estado Final Sprint 2:**
```
┌─────────────┬────────────┬──────────────┬───────────┐
│ Para hacer  │ En proceso │ Para revisión│   Listo   │
├─────────────┼────────────┼──────────────┼───────────┤
│ PB-07 (10') │ PB-05 (5') │              │ PB-03 ✓   │
│             │            │              │ PB-04 ✓   │
└─────────────┴────────────┴──────────────┴───────────┘
```

**Sprint Review:**
- ✅ PB-03: Formulario de registro de reserva completo
- ✅ PB-04: Cálculo automático del 25% de adelanto
- ⚠️ PB-05: Registro de pago al 50% (pasa al Sprint 3)
- ❌ PB-07: No iniciado (pasa al Sprint 3)

**Velocity Sprint 2:** 14 puntos completados (PB-03: 9 + PB-04: 5)

---

## SPRINT 3: Completar Pagos y Reportes

### Sprint Planning

**Objetivo del Sprint:**  
Completar el módulo de pagos (PB-05 y PB-07 pendientes) y agregar funcionalidades de control automático.

### Sprint Backlog - Sprint 3

| ID | Tarea | Estimación |
|----|-------|------------|
| PB-05 | Completar registro de pago | 5 min |
| PB-07 | Generación e impresión de recibo | 10 min |
| PB-08 | Cancelación automática 24hs | 10 min |
| PB-09 | Alertas de pagos pendientes | 5 min |

**Total Sprint 3:** 30 minutos → **Ajustado a 10 minutos reales**  
**Enfoque:** Completar PB-05, PB-07 como prioridad

**Ejecución (Resumen):**
- Día 1: Completar PB-05, avanzar PB-07
- Día 2: Completar PB-07, intentar iniciar PB-08

**Velocity Sprint 3:** ~15-20 puntos estimados

---

## SPRINT 4: Operaciones y Reportes

### Sprint Planning

**Objetivo del Sprint:**  
Agregar funcionalidades operativas clave: check-in, cancelaciones y reportes gerenciales.

### Sprint Backlog - Sprint 4

| ID | Tarea | Estimación |
|----|-------|------------|
| PB-10 | Proceso de check-in | 10 min |
| PB-11 | Cancelación manual sin reintegro | 10 min |
| PB-12 | Reporte de Reservas Emitidas | 10 min |

**Total Sprint 4:** 30 minutos → **Ajustado a 10 minutos reales**  
**Enfoque:** Prototipar las pantallas clave de operación diaria

**Ejecución (Resumen):**
- Día 1: Trabajar en PB-10 (check-in)
- Día 2: Completar PB-10, avanzar PB-11 o PB-12

**Velocity Sprint 4:** ~10-15 puntos estimados

**Nota:** Las funcionalidades restantes (PB-08, PB-09, PB-13-PB-18) quedarán en el Product Backlog para futuros sprints.

---

## Definición de Done (DoD)

Una funcionalidad está "Done" cuando:
- ✅ El prototipo en papel está completo y legible
- ✅ Incluye todos los campos/elementos necesarios según criterios de aceptación
- ✅ Ha sido revisado por al menos otro miembro del equipo
- ✅ El Product Owner lo ha validado
- ✅ Está documentado (título, descripción, flujo)
- ✅ Se movió a la columna "Listo" del tablero Kanban

---

## Definición de Ready (DoR)

Una historia está lista para el Sprint cuando:
- ✅ Tiene criterios de aceptación claros
- ✅ Ha sido estimada por el equipo
- ✅ Las dependencias están identificadas
- ✅ El equipo la comprende completamente
- ✅ Es lo suficientemente pequeña para completarse en el sprint

---

## Ceremonias SCRUM - Resumen

### Sprint Planning (10 minutos)
- PO presenta prioridades del Product Backlog
- Equipo selecciona ítems para el Sprint Backlog
- Equipo estima esfuerzo
- Se define objetivo del Sprint

### Daily Scrum (1 minuto cada día)
- 3 preguntas clave:
  1. ¿Qué hice ayer?
  2. ¿Qué voy a hacer hoy?
  3. ¿Qué impedimentos tengo?
- Scrum Master toma nota y actualiza tablero
- PO hace observaciones si es necesario

### Sprint Review (Al final del Sprint)
- Demostración del incremento
- Feedback del PO y stakeholders
- Actualización del Product Backlog si es necesario

### Sprint Retrospective (Al final del Sprint)
- ¿Qué salió bien?
- ¿Qué podemos mejorar?
- Acciones concretas de mejora

---

## Métricas del Proyecto

### Burndown Chart
Seguimiento diario del trabajo pendiente vs trabajo completado en el sprint.

### Velocity del Proyecto
- Sprint 1: 25 puntos completados
- Sprint 2: 14 puntos completados  
- Sprint 3: 15-20 puntos estimados
- Sprint 4: 10-15 puntos estimados
- **Velocity promedio:** ~18 puntos por sprint de 10 minutos

### Observaciones
Con sprints de 10 minutos (2 días de trabajo):
- La capacidad real del equipo es menor que la estimación inicial
- Es importante priorizar pocas tareas críticas por sprint
- Las tareas complejas (>10 min) deben dividirse o llevarse entre sprints
- La velocity se estabiliza después del Sprint 1

### Tablero Kanban
Estado visual del trabajo en cada momento:
- **Para hacer:** Backlog del Sprint
- **En proceso:** Trabajo activo (WIP limit: 3 tareas simultáneas)
- **Para revisión:** Esperando validación del PO
- **Listo:** Cumple Definition of Done

---

## Resultados Esperados

Al finalizar los 4 Sprints (40 minutos de simulacro), el equipo habrá prototipado en papel:

### Funcionalidades Completas (Esperadas):
1. ✅ Sistema de consulta de disponibilidad (PB-01)
2. ✅ Catálogo de habitaciones con precios (PB-02)
3. ✅ Registro completo de reservas (PB-03)
4. ✅ Generación automática de número de reserva (PB-06)
5. ✅ Cálculo automático del adelanto 25% (PB-04)
6. ✅ Registro de pagos (PB-05)
7. ✅ Generación de recibos (PB-07)
8. ⚠️ Proceso de check-in (PB-10) - depende del tiempo

### Funcionalidades Parciales o en Backlog:
- PB-08: Cancelación automática 24hs
- PB-09: Alertas de pagos pendientes
- PB-11: Cancelación manual
- PB-12: Reporte de Reservas Emitidas
- PB-13: Reporte de Reservas Concretadas
- PB-14 a PB-18: Funcionalidades complementarias

### Artefactos Generados:
- Product Backlog completo y priorizado (18 ítems)
- 4 Sprint Backlogs documentados
- Prototipos en papel de las pantallas principales
- Tablero Kanban con estado final
- Documentación de retrospectivas
- Métricas de velocity reales del equipo

### Aprendizajes del Equipo:
- Experiencia práctica con Scrum en tiempo limitado
- Comprensión de roles (PO, SM, Dev Team)
- Práctica de ceremonias ágiles (Planning, Daily, Review, Retro)
- Importancia de estimación realista
- Priorización efectiva con recursos limitados
- Gestión de tareas incompletas entre sprints
- Cálculo de velocity real vs estimada

---

## Próximos Pasos (Post-Simulacro)

1. **Digitalizar los prototipos en papel** usando herramientas como Figma o Balsamiq
2. **Refinar el Product Backlog** con historias de usuario más detalladas para las funcionalidades no completadas
3. **Analizar la velocity real** del equipo y ajustar planificación futura
4. **Completar funcionalidades pendientes** en sprints adicionales si se continúa el proyecto
5. **Planificar sprints reales** (2-3 semanas cada uno) si se lleva a desarrollo
6. **Iterar y mejorar** basándose en feedback continuo

### Lecciones Aprendidas del Simulacro

**Sobre Estimación:**
- Las estimaciones iniciales fueron optimistas
- Con sprints cortos, es mejor comprometerse a menos tareas
- Tareas complejas (>10 min) necesitan dividirse

**Sobre Priorización:**
- Esencial completar dependencias primero
- Mejor entregar pocas funcionalidades completas que muchas incompletas
- El PO debe ser firme en la priorización

**Sobre el Trabajo en Equipo:**
- Pair programming ayuda en tareas complejas
- Las Daily Scrum son cruciales para sincronización
- La comunicación constante evita bloqueos

---

## Anexos

### A. Plantilla de Daily Scrum

```
DAILY SCRUM - Sprint X - Día Y
Fecha: ___________
Duración: 1 minuto

Dev 1:
- Ayer: _____________________
- Hoy: ______________________
- Impedimentos: _____________

Dev 2:
- Ayer: _____________________
- Hoy: ______________________
- Impedimentos: _____________

Dev 3:
- Ayer: _____________________
- Hoy: ______________________
- Impedimentos: _____________

Acciones del Scrum Master:
_____________________________
```

### B. Plantilla de Retrospectiva

```
SPRINT RETROSPECTIVE - Sprint X
Fecha: ___________

✅ ¿Qué salió bien?
1. _____________________
2. _____________________
3. _____________________

⚠️ ¿Qué podemos mejorar?
1. _____________________
2. _____________________
3. _____________________

🎯 Acciones para el próximo Sprint:
1. _____________________
2. _____________________
3. _____________________

Responsables: ___________
```

### C. Glosario de Términos

- **Product Backlog:** Lista priorizada de todas las funcionalidades deseadas
- **Sprint Backlog:** Subconjunto del Product Backlog seleccionado para un Sprint
- **Increment:** Funcionalidad completa y potencialmente entregable al final del Sprint
- **Velocity:** Cantidad de trabajo que el equipo puede completar en un Sprint
- **Story Points:** Unidad de medida del esfuerzo (en este caso, minutos)
- **WIP (Work In Progress):** Trabajo actualmente en progreso
- **DoD (Definition of Done):** Criterios que definen cuándo algo está completo
- **DoR (Definition of Ready):** Criterios para que una historia entre en un Sprint

---

**Documento elaborado para:** Sistemas de Información II - Clase 11  
**Institución:** Facultad de Ingeniería y Ciencias Exactas  
**Tema:** Caso práctico Hotel Andino - Prototipado + SCRUM  
**Fecha:** Octubre 8, 2025  
**Versión:** 2.0 (Actualizada con contenido del PDF)
