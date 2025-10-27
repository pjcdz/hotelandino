# Ingeniería de Requerimientos – Requerimientos y Negocios – Ciclo de Vida de Sistemas

# Caso práctico : Hotel “Andino” – Administración de reservas.

El hotel Andino, funciona en Mendoza desde hace 30 años, se mantiene ocupado

prácticamente todo el año y en temporada de invierno queda sin disponibilidad en el mes de

Julio. Para poder alojarse en este hotel hay que hacer reservas con anticipación y respetar la

política del hotel de abonar un adelanto equivalente al 25% de la tarifa (precio de la

habitación * cantidad de días de estadía).

En la operación de reservas, un cliente consulta sobre sus necesidades de alojamiento al

empelado del hotel; quien, verifica la disponibilidad de habitaciones y las comunica al cliente

junto con el precio.

Cuando el cliente confirma que va a realizar la reserva, el empleado del hotel registra los

datos personales de las personas que se van a alojar en el hotel y le informa el número de

reserva y el importe del adelanto que debe realizar. El cliente puede cancelar la reserva, pero

en este caso no se reintegra el dinero del adelanto.

Una vez que el cliente informa que ha realizado el pago de la reserva, ésta puede ser en pesos

argentino o dólares, el empleado del hotel registra la fecha de pago y genera un recibo que

será entregado al cliente cuando éste llegue al hotel para alojarse. Si el cliente no informa el

pago del adelanto, en 24 horas la reserva será cancelada.

Cuando el cliente ingresa al hotel, la reserva se convierte en estadía.

La gerencia necesita que el empleado del hotel prepare un informe de las Reservas Emitidas

y las Reservas Concretadas, semanalmente.


# Ingeniería de Requerimientos – Requerimientos y Negocios – Ciclo de Vida de Sistemas

```
Para el desarrollo de un sistema que automatice e integre las acciones e información
descriptas, se realizará un proceso de Elicitación.
```
**Actividad 1:**

```
1- Reconocer y explicitar las Reglas del Negocio
2- Definir el documento de visión en función de los datos suministrados.
3- Reconocer los stakeholders involucrados.
4- Preparar una encuesta de 5 preguntas necesarias a realizarle a cada uno de los 3
principales stakeholders.
5- Definir al menos 2 instrumentos adicionales para la obtención de información.
```
## REGLAS DEL NEGOCIO:

Son definiciones claras y específicas que describen o restringen los aspectos del negocio, así
como las condiciones que deben cumplirse en un sistema o proceso. Estas reglas pueden
estar relacionadas con políticas, procedimientos, o fines comerciales y son fundamentales
para garantizar que un sistema se alinee con los objetivos y estrategias de una organización.

**Características de las Reglas de Negocio**

1. Claridad: Deben ser formuladas de manera que sean comprensibles para todas las partes
interesadas, evitando ambigüedades.
2. Consistencia: Las reglas deben ser coherentes entre sí y no deben entrar en conflicto con
otras reglas de negocio o requisitos.
3. Relevancia: Deben estar alineadas con los objetivos comerciales y las estrategias de la
organización.
4. Modificables: Deben poder actualizarse conforme cambien las condiciones del entorno
empresarial, las políticas de la organización o las normativas externas.
5. Medibles: Donde sea posible, las reglas de negocio deben poder evaluarse para
determinar su cumplimiento y efectividad.

**Tipos de Reglas de Negocio**

1. Reglas de Validación: Establecen ciertas condiciones que los datos o procesos deben
cumplir. Por ejemplo, "Los salarios no pueden exceder el presupuesto autorizado".
2. Reglas de Proceso: Definen cómo se deben llevar a cabo las actividades dentro de un
proceso comercial. Por ejemplo, "Los pedidos deben ser aprobados por un gerente antes de
ser enviados".
3. Reglas de Restricción: Limitan las opciones disponibles dentro de un sistema. Por ejemplo,
"Un cliente no puede tener más de tres cuentas activas".


# Ingeniería de Requerimientos – Requerimientos y Negocios – Ciclo de Vida de Sistemas

4. Reglas de Cálculo: Indican cómo se deben realizar los cálculos en el sistema. Por ejemplo,
"El impuesto sobre la venta se calculará como el 7% del total de la venta".
5. Reglas de Terminación: Establecen las condiciones bajo las cuales un proceso o actividad
debe finalizar. Por ejemplo, "El proceso de devolución se completará una vez que el cliente
reciba un reembolso".

**Actividad 2:**

Los equipos pares, adoptarán el rol de potenciales pasajeros del hotel y serán entrevistados
por los equipos impares para determinar sus requerimientos (se incluye una historia de
usuario básica como guía).

**Actividad 3:**

Los equipos impares, adoptarán el rol de empleados del hotel y serán entrevistados por los
equipos pares para determinar sus requerimientos (se incluye una historia de usuario básica
como guía).

**Actividad 4:**
Elaborar una lista de criterios de aceptación de los requerimientos relevados.

## CRITERIOS DE ACEPTACIÓN:

- Son las Condiciones que deben cumplirse para considerar la historia completa.
- Importantes para garantizar que el equipo y el cliente tengan una comprensión clara
    de lo que se espera.

Ejemplo:
_"Si el usuario hace clic en ‘Olvidé mi contraseña’, debe recibir un correo electrónico con un
enlace de restablecimiento dentro de 5 minutos."._

**Escritura de Criterios de Aceptación:**

- Utiliza un formato claro y específico.

Ejemplos:
_“Dentro de la página de restablecimiento de contraseña, el usuario debe ver un campo para
ingresar su dirección de correo electrónico.”
"El enlace de restablecimiento debe redirigir al usuario a una página donde pueda crear
una_ nueva contraseña.".


# Ingeniería de Requerimientos – Requerimientos y Negocios – Ciclo de Vida de Sistemas

**Historia de Usuario para el Potencial Pasajero**

Quiero poder consultar la disponibilidad de habitaciones en el hotel Andino y si hay
descuentos por cantidad de días o modificación de las fechas de la estadía, para poder
planificar mi estancia y aprovechar las mejores ofertas.

Además, quiero tener la opción de contratar anticipadamente otros servicios, como alquiler
de equipos de ski y traslados, para asegurarme de que tengo todo lo necesario para
disfrutar de mi estancia sin preocupaciones.

**Historia de Usuario para el Empleado del Hotel**

Quiero poder registrar las reservas de los clientes y gestionar los pagos, para garantizar que
las habitaciones estén correctamente reservadas y asignadas.

Además, quiero poder organizar los francos en función de los días de descanso del resto de
mis compañeros y la cantidad de empleados estimada según la ocupación del hotel, para
asegurar que hay suficiente personal disponible para atender a los pasajeros.

**_Hasta acá, fue el ejercicio que hicimos en la Clase 4_**


# Ingeniería de Requerimientos – Requerimientos y Negocios – Ciclo de Vida de Sistemas

```
En la Clase 5 realizamos:
```
```
 Diagrama de Entidad – Relación.
 Diagrama de Contexto.
 Diagrama de Caso de Uso.
```
Ejemplo de Diagrama de Casos de Usos

```
Hasta acá lo que hicimos en la Clase 0 5
```

# Ingeniería de Requerimientos – Requerimientos y Negocios – Ciclo de Vida de Sistemas

```
Actividad Clase 11: Prototipado + SCRUM
```
```
Para llevar adelante la tarea de Prototipado del sistema del Hotel, vamos a utilizar el marco
de trabajo Scrum, en un simulacro acelerado de trabajo.
```
```
Primer paso (5 min.)
Cada equipo definirá 1 Product Owner y 1 SCRUM Master, el resto del equipo, serán los
integrantes del Development Team.
```
```
Segundo paso (10 min.)
El Product Owner, va a definir el listado de funcionalidades que se requieren para el sistema:
el Product BackLog.
Las funciones definidas en este Product BackLog se van a prototipar en papel.
Para definir el Product BackLog, el resto de los integrantes del equipo, lo van a ayudar
actuando como stakeholders para que no se olvide de considerar ninguno de los
Requerimientos, Casos de Uso e Historias de usuario que se definieron en las primeras
partes del ejercicio.
```
```
Tercer paso (10 min.).
Presentar este Artefacto, BackLog al equipo de Desarrollo y al Scrum Master en una reunión
de Sprint Planning, en esta reunión se va a definir cuales serán las funcionalidades
prioritarias a desarrollar (prototipar) en el presente sprint, esa lista es el Sprint BackLog.
Dentro del Sprint BackLog, se deberá estimar el tiempo que se tardará en realizar cada una
de las tareas seleccionadas para el Sprint.
```
```
Cuarto paso (5 min.).
El Scrum Master, armará el tablero Kanban de 4 columnas: Para hacer, En proceso, Para
revisión y Listo, y pondrá en la primera columna, las tareas seleccionadas para el sprint con
la estimación del tiempo para hacerlo.
Cada integrante del Development Teams , elegirá una o más tareas para desarrollar en el
Sprint.
```
```
NOTA: cada Sprint de este simulacro, durará 20 min. Para simplificar, las tareas se pueden
estimar en múltiplos de 5 min.
```

# Ingeniería de Requerimientos – Requerimientos y Negocios – Ciclo de Vida de Sistemas

```
Quinto paso (5 min.)
Manos a la obra! Vamos a prototipar las funciones elegidas para el presente sprint. Cada
“día” de trabajo, serán 5 min.
```
```
Sexto paso: Daily Scrum (1 min.)
En esta reunión se responderán las 3 preguntas de SCRUM:
```
- ¿Qué hice ayer?
- ¿Qué voy a hacer hoy?
- ¿Qué dificultades tuve para avanzar?
El Scrum Master tomará nota de los avances y los volcará en el tablero y se ocupará de
solucionar las dificultades que tuvo el equipo para trabajar.
Junto con el Product Owner revisarán lo producido y éste hará observaciones para asegurar
que se ajusten a los requerimientos del caso.

```
Se repiten los pasos 5 y 6 hasta terminar el Sprint (4 iteraciones).
```

# Ingeniería de Requerimientos – Requerimientos y Negocios – Ciclo de Vida de Sistemas

# Práctica – Validación de Requerimientos.

# Consignas:

1- Leer el caso de estudio y la especificación de Caso de uso.
2- Leer los criterios de entrada y verificar si la especificación de CU cumple con los
mismos.
3- En el rol de Autor corrija los defectos identificados o agregue TBD.
4- Escriba preguntas para completar detalles ambiguos en la especificación de caso de
uso.
5- Leer los criterios de salida y verificar si la especificación de CU cumple con los mismos.

```
Caso: Auto Partes
La empresa autopartes se dedica al armado y venta de motores para autos XXX.
Actualmente hay un problema con la de reposición de stock de piezas (partes),
actualmente esta tarea se hace en forma manual en base a la experiencia del Jefe de
depósito, por ello hay veces que se piden piezas de más o menos de lo que se necesita.
La gerencia ha decidido desarrollar un sistema para “calcular la reposición automática de
partes” para el depósito de la fábrica.
```
```
El nuevo sistema tiene que generar automáticamente un pedido preliminar para el jefe
de depósito. Las cantidades a pedir estarán basadas en las cantidades de disponibles
en el depósito, el stock mínimo y máximo para cada pieza.
```
```
Se deberá permitir que el jefe de depósito modifique el pedido preliminar para: Aprobar
el pedido preliminar y generar el “Pedido definitivo”, o para que modifique las cantidades
el pedido preliminar basándose en su conocimiento del negocio. Cuando el Jefe de
depósito modifique el las cantidades del pedido preliminar tiene que quedar registrado el
día, la hora, el usuario del Jefe de depósito y el cambio realizado (esto es la cantidad a
pedir definida por el sistema y el nuevo valor ingreso por el jefe de depósito). Cuando el
jefe aprueba el pedido preliminar, solamente se debe guardar día, hora y el usuario del
jefe de depósito. Si el jefe de depósito decide modificar el Pedido preliminar, deberá
guardar los cambios primero y luego podrá aprobarlo. Una vez aprobado el pedido
definitivo, tiene que ser enviado por mail al sector de Compras. Necesitamos también
que el pedido definitivo pueda imprimirse y exportase a PDF.
```
```
La gerencia necesita que el sistema de Compras (automatizado) se mantenga por
separado y que solamente tenga una interface para consultar datos del nuevo sistema.
```
```
El nuevo sistema tiene que seguir los estándares de programación y diseño vigentes y
que se usaron en el Sistema de Compras.
```

# Ingeniería de Requerimientos – Requerimientos y Negocios – Ciclo de Vida de Sistemas

Especificación de Caso de uso: CU005 “Modificar Pedido Preliminar”

```
Nombre: CU005 Modificar Pedido Preliminar
Descripción: Permite que un jefe de depósito modifique un pedido preliminar
existente. El jefe de depósito puede:
a) Modificar las cantidades del pedido preliminar y guardarlas.
b) Aprobar el pedido preliminar y generar el “Pedido definitivo”.
Actor Principal: Reloj.
Pre condiciones: No existe el pedido Preliminar a ser modificado.
Post condiciones: Pedido Preliminar pasa a ser pedido definitivo.
Pedido Preliminar enviado por correo-e al proveedor
```
```
Flujo Básico:
```
1. El Sistema muestra la opción de búsqueda que de pedido preliminar.
2. El Jefe de depósito ingresa el número de pedido preliminar y la fecha.
3. El Sistema busca el pedido preliminar y lo encuentra.
4. El Sistema muestra la ....... ... del pedido preliminar.
5. El Sistema muestra las opciones Aprobar o Modificar el pedido preliminar.
6. El Actor selecciona la opción Aprobar pedido preliminar.
7. El Sistema registra los datos...
8. El Sistema aprueba el Pedido preliminar y genera el Pedido definitivo.
9. El Sistema envía el pedido definitivo y el envío es exitoso.
10.El Sistema muestra al usuario las opciones [Imprimir, Exportar] Pedido definitivo.
11.El Jefe de depósito selecciona la opción Imprimir.

```
Flujos Alternativos:
3.1...
6.1...TBD
9.1... TBD
```
# 11.1...TBD


# Ingeniería de Requerimientos – Requerimientos y Negocios – Ciclo de Vida de Sistemas

```
a. La especificación de casos de uso tiene las secciones obligatorias?:
Id caso de uso, Nombre CU, Descripción, Actor Principal. Pre condiciones,
Post condiciones; Flujo básico, Flujos alternativos.
```
```
b. Los números de página están impresos en el documento para facilitar
referencias a ubicaciones específicas durante la reunión de inspección.
```
```
c. Todos los issues que están abiertos están ser marcados como TBD (to be
defined).
```
```
d. El moderador no encontró más de 4 defectos mayores en una revisión de 10
minutos de una muestra representativa del documento.
```
```
Inspección Criterios de salida.
```
```
a) Todos los issues detectados durante la inspección deben quedar asentados.
```
```
b) Se verificó la gramática en el documento revisado y está ok.
```
```
c) Todos los TBDs fueron resueltos, o los procesos de resolución, fechas, y
responsables de cada TBD quedaron documentados.
```
```
d) Se creó una nueva versión del documento.
```
```
Proceso de Inspección
```
```
Actividades extras:
```
- Identificar y escribir los Requerimientos Funcionales y No funcionales.
- Realizar un Modelo de caso de uso preliminar.
- Validar la lista de requerimientos (RF y RNF) con el profesor.

Inspección Criterios de entrada:



# Técnica de validación

# prototipado


## Temas a desarrollar

###### Técnica de prototipado

###### Proceso de Validación - Repaso

###### Síntesis

###### Tipos de prototipos

###### Etapas

###### Repaso SCRUM


### Ingeniería de Requerimientos

Elicitación Análisis Especificación Validación

**Dominio**

```
Datos Modelo Mental
```
```
Requerimiento
Especificado
```
```
Corregir y cerrar diferencias
```
**Expertos Re-evaluar**

```
Requerimiento
validado
```

### Proceso de validación

```
La validación es el proceso que certifica que los requerimientosson
consistentes con las necesidades de los clientes y los usuarios.
```
```
La validación de requerimientos es una visión más general que el
concepto común de validación, debido a que su feedbakpuede
```
retornar a la elicitación, análisisy la especificación, a fin de asegurar

```
que las ideas, conceptos y características presentadas en una
especificación se identifican y explican con claridad.
```

### Proceso de validación

 Analizar si el SRS y la documentación asociada

```
describen correctamente las capacidades y
características que cumplirán las necesidades de
los stakeholders.
```
 Analizar si los requerimientos de software fueron

```
derivados correctamente de los requerimientos
de usuario, las reglas de negocio y otras fuentes.
```
**¿Cuáles son sus objetivos?**


### Proceso de validación


# Prototipado de pantallas


El prototipado de pantallas o interfaz de usuario es una
técnica de representación “aproximada” de la interfaz de
usuario del futuro sistema software.

Permite a diferentes stakeholdersrevisar y entender la
propuesta de diseño de los ingenieros de requerimientos
para resolver sus problemas de negocio, debido a que se
usa una herramienta gráfica.

#### ¿ Para qué se usa?


### Tipos de Prototipos

Los dos tipos principales de prototiposde interfaz de usuario son:

##### Tipos de prototipo

##### Desechables

##### Evolutivo


### Tipos de Prototipos

```
Una vez utilizados para la validación de los requerimientos, se mejora su
calidad y se convierten progresivamente en el producto final.
```
```
Se utilizan sólo para la validación de los requerimientos y posteriormente se
desechan.
```
- Pueden ser prototipos en papel
- Se puede usar una herramienta para generarlos

**Desechables**

**Evolutivos**


#### Herramientas para prototipado digital


### Etapas del Prototipado

**Comprender
El problema a
resolver**

```
Seleccionar los
Requerimientos a
prototipar
```
```
Bocetar las ideas Presentar el
prototipo Aprobación del Obtener
Prototipo
```
```
Documentar
ajustes en los
Requerimientos
```
```
Aplicar Feedback
```

#### Repaso SCRUM


#### Repaso SCRUM


```
Para llevar adelante la tarea de Prototipado del sistema del Hotel,
vamos a utilizar el marco de trabajo Scrum, en un simulacro acelerado
de trabajo.
```
#### ACTIVIDAD: Prototipado + SCRUM

**Casopráctico** : **Hotel“Andino”– Administracióndereservas.**


```
Se explicó la técnica de prototipado de pantallas, los tipos de prototipos,
destacando las diferencias entre estos.
```
Se explicaron las etapas del prototipado, que es un proceso iterativo.

Finalmente, se sugieren herramientas para el prototipado digital.

#### Síntesis


- WIEGERS, K.E.. Software Requirements. 3era
Edition. 2013. Washington, D.C. : Microsoft
Press. xix, 516 p. ISBN 9780735679665.
- WIEGERS, K.E.. Software requirements
practicaltechniques for gatheringand managing
requirementsthroughoutthe product
developmentcycle. 2nd Edition. Washington,
D.C. : Microsoft Press. xix, 516 p. ISBN:
9780735618794.

#### Bibliografía utilizada para este recurso



# Proceso de Validación


## Temas a desarrollar

##### ¿Cuáles son sus objetivos?

##### Revisiones informales

##### Proceso de Validación

##### ¿Cuáles sus entradas?

##### ¿Cuáles sus actividades?

##### ¿Cuáles sus salidas?

##### ¿Qué técnica puedo usar?

##### Síntesis


### Ingeniería de Requerimientos

```
Elicitación Análisis Especificación Validación
```
```
Dominio
```
```
Datos Modelo Mental
```
```
Requerimiento
Especificado
```
```
Corregir y cerrar diferencias
```
**Expertos Re-evaluar**

```
Requerimiento
validado
```

### Proceso de validación

```
La validación es el proceso que certifica que los requerimientosson
consistentes con las necesidades de los clientes y los usuarios.
```
La validación de requerimientos es una visión más general que el
concepto común de validación, debido a que su feedbakpuede
retornar a la elicitación, análisisy la especificación, a fin de asegurar
que las ideas, conceptos y características presentadas en una
especificación se identifican y explican con claridad.


### Proceso de validación

######  Definición

######  Proceso

######  Objetivo, Entrada, Actividades y Salida

```
Proceso
```
```
Entrada Salida
```

### Proceso de validación

######  Analizar si el SRS y la documentación asociada

###### describen correctamente las capacidades y

###### características que cumplirán las necesidades de

###### los stakeholders.

######  Analizar si los requerimientos de software fueron

###### derivados correctamente de los requerimientos

###### de usuario, las reglas de negocio y otras fuentes.

```
¿Cuáles son sus objetivos?
```

### Proceso de validación

```
¿Cuáles son sus entradas?
```
###### Requerimientos de Software Especificados.

```
 SRS (Software RequirementsSpecification)
```
```
 Especificaciones de Casos de Uso.
```
```
 Historias de usuarios detalladas.
```

### Proceso de validación

```
¿Cuáles son sus salidas?
```
###### Requerimientos de Software Especificados. (Validados)

```
 SRS (Software RequirementsSpecification)
```
```
 Especificaciones de Casos de Uso.
```
```
 Historias de usuarios detalladas.
```

### Proceso de validación

```
¿Cuáles son sus actividades?
```
Seleccionar técnicas de Validación.

Realizar revisionesde los requerimientos especificados con los stakeholders.

Realizar inspeccionesde los requerimientos especificados con los
stakeholders.

Definir los criterios de aceptación con los stakeholders.

Examinar si los requerimientos especificados reúnen características de
calidad: correctos, consistentes, factibles, necesarios, no ambiguos,
verificables y si fueron priorizados.

Definir los casos/escenarios de test funcionales a realizar en las etapas.
siguientes del ciclo de vida del desarrollo del sistema.


### Proceso de validación

**¿Qué
introdujo el
modelo en V?**

https://okhosting.com/blog/el-ciclo-de-
vida-del-software/


### Proceso de validación

```
¿Por qué criterios de aceptación?
```
El criterio de aceptación debería evaluar si el producto satisface los
requerimientos documentados.

Tener definidos los criterios de aceptación es una estrategia efectiva.

Cuanto antes se definen los criterios de aceptación en el proceso de
desarrollo, antes se pueden identificar defectos en los requerimientos
y en el software implementado.


### Proceso de validación

```
¿Qué técnicas puedo usar?
```
```
Revisionesinformales
```
```
Peer deskcheck
```
```
Passaround
```
```
Walkthrough
```
```
Revisiónformal
```
```
Inspection
```

# Revisiones informales


### Revisiones Informales

```
El autor, entrega el documento de
especificación a un compañero,
```
```
Este lo lee y devuelve sus observaciones
al autor.
```
**Peer deskcheck**


### Revisiones Informales

```
El autor, invita a varios compañeros a
examinar el documento de
especificación de requerimientos.
```
```
Estos lo leen y devuelven sus
observaciones al autor.
```
###### Passaround


### Revisiones Informales

```
El autor, lee el documento de
especificación de requerimientos a
sus compañeros o usuarios.
```
```
y espera comentarios u
observaciones.
```
**Walkthrough**


```
Se explicó la importancia del proceso de validación, en el marco de la
ingeniería de requerimientos.
```
```
Se explicó el proceso como una caja negra, se analizaron objetivos,
entradas, salidas, técnicas informales.
```
```
Se remarco la importancia de definir criterios de aceptación.
```
```
Se explicaron 3 técnicas informales: Nombre de la técnica, participantes y
en que consiste cada una.
```
#### Síntesis


- WIEGERS, K.E.. Software Requirements. 3era
Edition. 2013. Washington, D.C. : Microsoft
Press. xix, 516 p. ISBN 9780735679665.
- WIEGERS, K.E.. Software requirements
practicaltechniques for gatheringand managing
requirementsthroughoutthe product
developmentcycle. 2nd Edition. Washington,
D.C. : Microsoft Press. xix, 516 p. ISBN:
9780735618794.

#### Bibliografía utilizada para este recurso


# Proceso de Validación en el Desarrollo de

# Software

**¿Qué es la validación?**

La validación asegura que los requerimientos se alineen con las necesidades de los
clientes y usuarios. Se lleva a cabo simultáneamente con la elicitación, análisis y
especificación para garantizar la claridad en la identificación y explicación de ideas,
conceptos y características.

**Objetivos de la Validación:**

- Verificar si el SRS y la documentación relacionada describen correctamente las
    capacidades y características necesarias.
- Comprobar si los requerimientos de software se derivan adecuadamente de los
    requerimientos de usuario y otras fuentes.

**Entradas del Proceso de Validación:**

- Requerimientos de Software Especificados.

```
o SRS (Software Requirements Specification).
```
```
o Especificaciones de Casos de Uso.
```
```
o Historias de usuarios detalladas.
```
**Actividades de Validación:**

- Selección de técnicas de validación.
- Revisiones de requerimientos con los stakeholders.
- Inspecciones de requerimientos con los stakeholders.
- Establecimiento de criterios de aceptación con los stakeholders.
- Examen de los requerimientos para verificar su calidad: corrección,
    consistencia, factibilidad, necesidad, no ambigüedad y verificabilidad. También
    se priorizan.
- Definición de casos/escenarios de pruebas funcionales para las etapas
    posteriores del ciclo de vida del desarrollo del sistema.

**Salidas del Proceso de Validación:**

- Requerimientos de Software Validados.

```
o SRS (Software Requirements Specification).
```
```
o Especificaciones de Casos de Uso.
```

```
o Historias de usuarios detalladas.
```
**Uso de Criterios de Aceptación:** Los criterios de aceptación evalúan si el producto
cumple con los requerimientos documentados. Definirlos temprano en el proceso de
desarrollo ayuda a identificar defectos en requerimientos y en el software
implementado.

**Técnicas en el Proceso de Validación:**

**1. Revisiones Informales:**
    - **Peer Deskcheck:** Esta técnica involucra que un par de personas revisen los
       requerimientos y la documentación de manera informal. Cada revisor busca
       inconsistencias, errores o posibles mejoras. Es una técnica rápida y efectiva
       que fomenta la colaboración y la detección temprana de problemas. Puede
       realizarse en una reunión o simplemente compartiendo documentos para su
       revisión.
    - **Passaround:** En esta técnica, se distribuyen copias de la documentación de
       requerimientos entre los revisores, quienes la estudian de manera individual.
       Cada revisor anota observaciones y problemas. Luego, se reúnen para discutir
       sus hallazgos y tomar medidas para corregir los problemas identificados.
       Passaround es eficiente y permite que cada revisor analice los documentos a
       su propio ritmo.
    - **Walkthrough:** Esta técnica implica una revisión más detallada y estructurada.
       Un miembro del equipo asume el rol del autor de los requerimientos y explica el
       contenido al grupo de revisores. Durante esta presentación, los revisores
       hacen preguntas, sugieren mejoras y señalan posibles problemas. El objetivo
       es garantizar una comprensión completa y una revisión exhaustiva. El
       Walkthrough es especialmente útil para la validación de requerimientos críticos
       o complejos.
**2. Revisiones Formales:**
    - **Inspection:** Las revisiones formales son procesos estructurados y rigurosos
       que siguen una metodología específica. La Inspection es una de las técnicas
       formales más conocidas. Implica la revisión detallada de los documentos de
       requerimientos por un equipo de revisores, siguiendo un conjunto de reglas y
       procedimientos definidos. Los revisores buscan problemas específicos como
       ambigüedades, omisiones, inconsistencias y errores. Este proceso requiere
       tiempo y planificación, pero es efectivo para garantizar la calidad de los
       requerimientos. La Inspection es especialmente útil en proyectos donde los
       errores pueden tener consecuencias significativas.

**Consejos para Elegir Técnicas de Validación:**

- La elección de la técnica de validación depende del tipo de proyecto, los
    recursos disponibles y la criticidad de los requerimientos. Las revisiones
    informales son efectivas para la mayoría de los proyectos, ya que son rápidas y


```
colaborativas. Las revisiones formales, como la Inspection, son adecuadas
cuando se requiere una validación más profunda y estructurada.
```
- Es importante considerar la experiencia de los revisores. Los revisores con
    experiencia en el dominio del problema y en el proceso de validación son más
    efectivos en la detección de problemas.
- Las técnicas de validación pueden combinarse. Por ejemplo, puedes realizar
    una revisión informal inicial seguida de una revisión formal, como la Inspection,
    para garantizar una validación exhaustiva.
- La retroalimentación de los revisores debe documentarse y rastrearse. Los
    problemas identificados deben corregirse y verificar que se han resuelto de
    manera satisfactoria.

En resumen, las técnicas de validación, ya sean informales o formales, son esenciales
para garantizar que los requerimientos de software sean claros, completos y precisos.
La elección de la técnica adecuada depende de las necesidades del proyecto y la
criticidad de los requerimientos. La retroalimentación de los revisores es valiosa para
mejorar la calidad de los requerimientos y, por ende, del producto final.

**Comparación de Requerimientos y Casos de Prueba**

**Aspecto Requerimientos Casos de Prueba**

**Definición** (^) Los requerimientos son
descripciones de lo que el
sistema debe hacer o de las
cualidades que debe tener.
Representan necesidades
funcionales o no funcionales.
Los casos de prueba son
conjuntos de condiciones y
pasos que determinan cómo
se verificarán los
requerimientos. Representan
la forma en que se
comprobará que el sistema
cumple con los
requerimientos.
**Enfocados en** Se centran en "qué" debe
hacer el sistema, sin entrar en
detalles sobre cómo se
implementará.
Se centran en "cómo" se
probarán los requerimientos,
detallando las condiciones,
entradas y pasos necesarios
para verificar su
cumplimiento.
**Nivel de
Abstracción**
Suelen ser más abstractos y
de alto nivel, capturando la
visión general de lo que se
necesita.
Son más concretos y
específicos, detallando la
forma de verificar un
requerimiento en situaciones
específicas.


**Audiencia** Están dirigidos a los
stakeholders, incluyendo a los
clientes y los desarrolladores.

```
Son principalmente utilizados
por los probadores y el equipo
de calidad.
```
**Modificabilidad** (^) Pueden cambiar a lo largo del
ciclo de vida del proyecto a
medida que se comprenden
mejor las necesidades.
Los casos de prueba cambian
cuando cambian los
requerimientos o cuando se
descubren problemas en la
lógica de prueba.
**Documentación** (^) Suelen documentarse en el
Software Requirements
Specification (SRS) o en
documentos similares.
Se documentan en un plan de
pruebas o en herramientas de
gestión de pruebas.
**Resultados** No generan resultados
tangibles. Su éxito radica en
que el sistema cumpla con
ellos.
Generan resultados medibles,
indicando si el sistema pasa o
no pasa las pruebas.
**Ejemplos** (^) Ejemplo de requerimiento: "El
sistema debe permitir a los
usuarios registrarse con su
dirección de correo
electrónico".
Ejemplo de caso de prueba:
"Ingresar la dirección de
correo electrónico y la
contraseña válida del usuario.
El sistema debe mostrar un
mensaje de confirmación de
registro".
Ten en cuenta que los requerimientos y los casos de prueba son dos aspectos
esenciales en la gestión de proyectos de desarrollo de software. Los requerimientos
establecen las expectativas del cliente y del equipo de desarrollo, mientras que los
casos de prueba garantizan que estos requerimientos se cumplan de manera
adecuada. Ambos desempeñan un papel crítico en la entrega de software de alta
calidad.
A continuación, otro cuadro comparativo entre Requerimientos y Casos de Prueba,
con un enfoque en cómo ambos elementos se relacionan y en cómo la ambigüedad y
la validación pueden afectar la consistencia entre ellos:
**Aspecto Requerimientos Casos de Prueba**
Origen Los analistas escriben los
requerimientos funcionales a
partir de los requerimientos de
usuario.
Los testers escriben los
casos de prueba desde los
mismos requerimientos de
usuario.
Generación de Ambigüedades en los Ambigüedades en los


Ambigüedades requerimientos de usuarios y
diferencias en la interpretación
pueden generar
inconsistencias entre las
vistas representadas por los
requerimientos funcionales,
modelos y casos de pruebas.

```
requerimientos de usuarios y
diferencias en la
interpretación pueden
generar inconsistencias
entre las vistas
representadas por los casos
de pruebas y los
requerimientos funcionales,
modelos.
```
Validación de
Requerimientos

```
Mientras los desarrolladores
traducen los requerimientos
en interfaces de usuario y
diseños técnicos, los analistas
pueden validar los
requerimientos con los
escenarios de tests.
```
```
Mientras los desarrolladores
traducen los requerimientos
en interfaces de usuario y
diseños técnicos, los testers
pueden transformar tests
conceptuales en tests
detallados.
```
Propósito Común Ambos requieren una
comprensión clara y precisa
de los requerimientos de
usuario para evitar
ambigüedades y
discrepancias.

```
Ambos buscan garantizar
que los requerimientos se
traduzcan correctamente en
la implementación y que las
pruebas sean efectivas.
```
Este cuadro compara cómo los requerimientos y los casos de prueba se relacionan y
cómo la ambigüedad en los requerimientos de usuario puede influir en la consistencia
entre ellos. Ambos aspectos destacan la importancia de una comprensión precisa de
los requerimientos de usuario y de la validación continua durante el ciclo de desarrollo
de software.


# Ingeniería de Requerimientos – Requerimientos y Negocios – Ciclo de Vida de Sistemas

# Caso práctico : Hotel “Andino” – Administración de reservas.

El hotel Andino, funciona en Mendoza desde hace 30 años, se mantiene ocupado

prácticamente todo el año y en temporada de invierno queda sin disponibilidad en el mes de

Julio. Para poder alojarse en este hotel hay que hacer reservas con anticipación y respetar la

política del hotel de abonar un adelanto equivalente al 25% de la tarifa (precio de la

habitación * cantidad de días de estadía).

En la operación de reservas, un cliente consulta sobre sus necesidades de alojamiento al

empelado del hotel; quien, verifica la disponibilidad de habitaciones y las comunica al cliente

junto con el precio.

Cuando el cliente confirma que va a realizar la reserva, el empleado del hotel registra los

datos personales de las personas que se van a alojar en el hotel y le informa el número de

reserva y el importe del adelanto que debe realizar. El cliente puede cancelar la reserva, pero

en este caso no se reintegra el dinero del adelanto.

Una vez que el cliente informa que ha realizado el pago de la reserva, ésta puede ser en pesos

argentino o dólares, el empleado del hotel registra la fecha de pago y genera un recibo que

será entregado al cliente cuando éste llegue al hotel para alojarse. Si el cliente no informa el

pago del adelanto, en 24 horas la reserva será cancelada.

Cuando el cliente ingresa al hotel, la reserva se convierte en estadía.

La gerencia necesita que el empleado del hotel prepare un informe de las Reservas Emitidas

y las Reservas Concretadas, semanalmente.


# Ingeniería de Requerimientos – Requerimientos y Negocios – Ciclo de Vida de Sistemas

```
Para el desarrollo de un sistema que automatice e integre las acciones e información
descriptas, se realizará un proceso de Elicitación.
```
**Actividad 1:**

```
1- Reconocer y explicitar las Reglas del Negocio
2- Definir el documento de visión en función de los datos suministrados.
3- Reconocer los stakeholders involucrados.
4- Preparar una encuesta de 5 preguntas necesarias a realizarle a cada uno de los 3
principales stakeholders.
5- Definir al menos 2 instrumentos adicionales para la obtención de información.
```
## REGLAS DEL NEGOCIO:

Son definiciones claras y específicas que describen o restringen los aspectos del negocio, así
como las condiciones que deben cumplirse en un sistema o proceso. Estas reglas pueden
estar relacionadas con políticas, procedimientos, o fines comerciales y son fundamentales
para garantizar que un sistema se alinee con los objetivos y estrategias de una organización.

**Características de las Reglas de Negocio**

1. Claridad: Deben ser formuladas de manera que sean comprensibles para todas las partes
interesadas, evitando ambigüedades.
2. Consistencia: Las reglas deben ser coherentes entre sí y no deben entrar en conflicto con
otras reglas de negocio o requisitos.
3. Relevancia: Deben estar alineadas con los objetivos comerciales y las estrategias de la
organización.
4. Modificables: Deben poder actualizarse conforme cambien las condiciones del entorno
empresarial, las políticas de la organización o las normativas externas.
5. Medibles: Donde sea posible, las reglas de negocio deben poder evaluarse para
determinar su cumplimiento y efectividad.

**Tipos de Reglas de Negocio**

1. Reglas de Validación: Establecen ciertas condiciones que los datos o procesos deben
cumplir. Por ejemplo, "Los salarios no pueden exceder el presupuesto autorizado".
2. Reglas de Proceso: Definen cómo se deben llevar a cabo las actividades dentro de un
proceso comercial. Por ejemplo, "Los pedidos deben ser aprobados por un gerente antes de
ser enviados".
3. Reglas de Restricción: Limitan las opciones disponibles dentro de un sistema. Por ejemplo,
"Un cliente no puede tener más de tres cuentas activas".


# Ingeniería de Requerimientos – Requerimientos y Negocios – Ciclo de Vida de Sistemas

4. Reglas de Cálculo: Indican cómo se deben realizar los cálculos en el sistema. Por ejemplo,
"El impuesto sobre la venta se calculará como el 7% del total de la venta".
5. Reglas de Terminación: Establecen las condiciones bajo las cuales un proceso o actividad
debe finalizar. Por ejemplo, "El proceso de devolución se completará una vez que el cliente
reciba un reembolso".

**Actividad 2:**

Los equipos pares, adoptarán el rol de potenciales pasajeros del hotel y serán entrevistados
por los equipos impares para determinar sus requerimientos (se incluye una historia de
usuario básica como guía).

**Actividad 3:**

Los equipos impares, adoptarán el rol de empleados del hotel y serán entrevistados por los
equipos pares para determinar sus requerimientos (se incluye una historia de usuario básica
como guía).

**Actividad 4:**
Elaborar una lista de criterios de aceptación de los requerimientos relevados.

## CRITERIOS DE ACEPTACIÓN:

- Son las Condiciones que deben cumplirse para considerar la historia completa.
- Importantes para garantizar que el equipo y el cliente tengan una comprensión clara
    de lo que se espera.

Ejemplo:
_"Si el usuario hace clic en ‘Olvidé mi contraseña’, debe recibir un correo electrónico con un
enlace de restablecimiento dentro de 5 minutos."._

**Escritura de Criterios de Aceptación:**

- Utiliza un formato claro y específico.

Ejemplos:
_“Dentro de la página de restablecimiento de contraseña, el usuario debe ver un campo para
ingresar su dirección de correo electrónico.”
"El enlace de restablecimiento debe redirigir al usuario a una página donde pueda crear
una_ nueva contraseña.".


# Ingeniería de Requerimientos – Requerimientos y Negocios – Ciclo de Vida de Sistemas

**Historia de Usuario para el Potencial Pasajero**

Quiero poder consultar la disponibilidad de habitaciones en el hotel Andino y si hay
descuentos por cantidad de días o modificación de las fechas de la estadía, para poder
planificar mi estancia y aprovechar las mejores ofertas.

Además, quiero tener la opción de contratar anticipadamente otros servicios, como alquiler
de equipos de ski y traslados, para asegurarme de que tengo todo lo necesario para
disfrutar de mi estancia sin preocupaciones.

**Historia de Usuario para el Empleado del Hotel**

Quiero poder registrar las reservas de los clientes y gestionar los pagos, para garantizar que
las habitaciones estén correctamente reservadas y asignadas.

Además, quiero poder organizar los francos en función de los días de descanso del resto de
mis compañeros y la cantidad de empleados estimada según la ocupación del hotel, para
asegurar que hay suficiente personal disponible para atender a los pasajeros.

**_Hasta acá, fue el ejercicio que hicimos en la Clase 4_**


# Ingeniería de Requerimientos – Requerimientos y Negocios – Ciclo de Vida de Sistemas

```
En la Clase 5 realizamos:
```
```
 Diagrama de Entidad – Relación.
 Diagrama de Contexto.
 Diagrama de Caso de Uso.
```
Ejemplo de Diagrama de Casos de Usos

```
Hasta acá lo que hicimos en la Clase 05
```

# Ingeniería de Requerimientos – Requerimientos y Negocios – Ciclo de Vida de Sistemas

```
Actividad Clase 11: Prototipado + SCRUM
```
```
Para llevar adelante la tarea de Prototipado del sistema del Hotel, vamos a utilizar el marco
de trabajo Scrum, en un simulacro acelerado de trabajo.
```
```
Primer paso (5 min.)
Cada equipo definirá 1 Product Owner y 1 SCRUM Master, el resto del equipo, serán los
integrantes del Development Team.
```
```
Segundo paso (10 min.)
El Product Owner, va a definir el listado de funcionalidades que se requieren para el sistema:
el Product BackLog.
Las funciones definidas en este Product BackLog se van a prototipar en papel.
Para definir el Product BackLog, el resto de los integrantes del equipo, lo van a ayudar
actuando como stakeholders para que no se olvide de considerar ninguno de los
Requerimientos, Casos de Uso e Historias de usuario que se definieron en las primeras
partes del ejercicio.
```
```
Tercer paso (10 min.).
Presentar este Artefacto, BackLog al equipo de Desarrollo y al Scrum Master en una reunión
de Sprint Planning, en esta reunión se va a definir cuales serán las funcionalidades
prioritarias a desarrollar (prototipar) en el presente sprint, esa lista es el Sprint BackLog.
Dentro del Sprint BackLog, se deberá estimar el tiempo que se tardará en realizar cada una
de las tareas seleccionadas para el Sprint.
```
```
Cuarto paso (5 min.).
El Scrum Master, armará el tablero Kanban de 4 columnas: Para hacer, En proceso, Para
revisión y Listo, y pondrá en la primera columna, las tareas seleccionadas para el sprint con
la estimación del tiempo para hacerlo.
Cada integrante del Development Teams , elegirá una o más tareas para desarrollar en el
Sprint.
```
```
NOTA: cada Sprint de este simulacro, durará 20 min. Para simplificar, las tareas se pueden
estimar en múltiplos de 5 min.
```

# Ingeniería de Requerimientos – Requerimientos y Negocios – Ciclo de Vida de Sistemas

```
Quinto paso (5 min.)
Manos a la obra! Vamos a prototipar las funciones elegidas para el presente sprint. Cada
“día” de trabajo, serán 5 min.
```
```
Sexto paso: Daily Scrum (1 min.)
En esta reunión se responderán las 3 preguntas de SCRUM:
```
- ¿Qué hice ayer?
- ¿Qué voy a hacer hoy?
- ¿Qué dificultades tuve para avanzar?
El Scrum Master tomará nota de los avances y los volcará en el tablero y se ocupará de
solucionar las dificultades que tuvo el equipo para trabajar.
Junto con el Product Owner revisarán lo producido y éste hará observaciones para asegurar
que se ajusten a los requerimientos del caso.

```
Se repiten los pasos 5 y 6 hasta terminar el Sprint (4 iteraciones).
```

# Ingeniería de Requerimientos – Requerimientos y Negocios – Ciclo de Vida de Sistemas

```
Actividad Clase 12: Trazabilidad
```
```
Para esta última parte del ejercicio y del proceso de Ing. de Requerimientos, hacer una lista
completa de Requerimientos:
```
- Requerimientos Funcionales
- Requerimientos de Usuario/Negocio/Empresa
- Casos de Uso
- Historias de Usuario

```
Con esta información:
```
1. Completar la matriz de trazabilidad
2. Establecer las relaciones justificadas entre estos elementos
3. “Probar” cómo afecta hacia adelante y/o hacia atrás la modificación de alguno de los
    componentes de la matriz.


```
Identificación Descripción del requisito Versión Estado actual
Última fecha estado
registrado Criterios de aceptación
```
```
Nivel de
complejidad
```
```
Necesidad, oportunidades u
objetivos de negocio
Entregables (EDT) Diseño del producto Desarrollo del producto Estrategia y escenarios de pruebas Interesado
Nivel de
prioridad
```
## RF

```
El sistema debera permitir
registrar un nuevo libro.
1.0.0 Aprobado 11/09/
```
```
Dada una petición de registro de un libro nuevo cuando el
sistema halla verificado que el usuario tiene una sesión
iniciada entonces el sistema procedera a validar los datos
ingresados y realizar el registro en la base de datos.
```
```
Moderada Agilizar procedimientos. Aplicación Web.
Elaboración de casos de uso del
sistema.
```
```
Programación en base a los casos de
uso.
```
```
Se realizarán varios registros de
prueba con diferentes parámetros.
Gerente General Alta
```
## RF

```
El sistema deberá permitir
registrar más ejempares del
libro.
```
```
1.0.0 Aprobado 11/09/2024 Moderada Agilizar procedimientos. Aplicación Web. Elaboración de casos de uso del
sistema.
```
```
Programación en base a los casos de
uso.
```
```
Se realizarán varios registros de
prueba con diferentes parámetros.
Gerente General Alta
```
## RF

```
El sistema deberá permitir
visualizar los ejemplares
existentes.
```
```
1.0.0 Aprobado 11/09/
```
```
Dada una petición de visualización, cuando el usuario
tiene una sesión iniciada y el material se halla registrado
previamente, el sistema mostrará un formulario con los
datos del material y su lista de ejemplares.
```
```
Moderada Agilizar procedimientos. Aplicación Web.
Elaboración de casos de uso del
sistema.
```
```
Programación en base a los casos de
uso.
```
```
Se intentará visualizar los registros
realizados previamente.
Gerente General Alta
```
## RF

```
El sistema deberá permitir
modificar el estado de un
ejemplarl.
```
```
1.0.0 Aprobado 11/09/
```
```
Dada una petición de cambio de estado, cuando el
usuario tiene una sesión iniciada y el el preéstamo se haya
realizado exitosamente, el sistema cambiara el estado del
ejemplar a "No disponible".
```
```
Moderada Agilizar procedimientos. Aplicación Web.
Elaboración de casos de uso del
sistema.
```
```
Programación en base a los casos de
uso.
```
```
Se realizaran varias peticiones de
prestamo.
Gerente General Alta
```
## RF

```
El sistema deberá permitir
emitir reportes de enradas y
salidas de libros.
```
```
1.0.0 Aprobado 11/09/
```
```
Dada una petición de reporte cuando el usuario tenga
una sesión iniciada, enonces se descargara un archivo que
contega el reporte solicitado.
```
```
Moderada Agilizar procedimientos. Aplicación Web. Elaboración de casos de uso del
sistema.
```
```
Programación en base a los casos de
uso.
```
```
Se realizaran varias peticiones de
reportes.
Gerente General Alta
```
## RN

```
El sistema deberá mostrar
colores suaves para no cansar la
vista del usuario.
```
```
1.0.0 Aprobado 11/09/
```
```
La ventanas de la interfaz tienen un diseño que permite al
usuario trabajar adecuadamente durante largos periodos
de tiempo.
```
```
Baja. Optimizar el desempeño. Aplicación Web. Diseño de interfaz. No aplica.
```
```
Se solicitará retroalimentación de
diferentes usuarios durante el periodo
de pruebas.
```
```
Gerente de ventas Moderada
```
## RN

```
El sistema debe tener interfaces
gráficas de administración y de
operación en unambiente 100%
Web.
```
```
1.0.0 Aprobado 11/09/
La interfaz al completo puede visualizarse a través de la
ventana del navegador.
Baja.
Conservar la salud de los
trabajadores.
```
```
Propuestas de diseño
de interfaz.
Diseño de interfaz.
Selección de las herramientas para el
desarrollo.
Se realizaran pruebas de ejecución. Gerente General Alta.
```
## RN

```
Los códigos de los ejemplares
deben ser autogenerados para
reducir el error humano.
```
```
1.0.0 Aprobado 11/09/2024 La aplicación genera los códigos de los ejemplares de
manera automática sin intervención del usuario.
Baja. Optimizar el desempeño. Prototipos. Elaboración de casos de uso del
sistema.
```
```
Selección de las herramientas para el
desarrollo.
```
```
Se realizaran varios registros de
prueba.
Gerente General Alta
```
## RN

```
La respuesta de las consultas y
modificaciones debe tener un
tiempo de duración menor a 5
segundos.
```
```
1.0.0 Aprobado 11/09/2024 El tiempo de respuesta a las peticiones no supera los
cinco segundos.
Moderada. Optimizar el desempeño. Aplicación Web. Elaboración de casos de uso del
sistema.
```
```
Programación en base a los casos de
uso.
```
```
Se realizarán varias pruebas del
tiempo de ejcución.
Gerente General Moderada
```
## RN

```
El sistema deberá considerar el
patrón MVC.
1.0.0 Aprobado 11/09/
La distribución de las diferentes clases y metodos
corresponde con el patrón MVC.
Moderada. Optimizar el desempeño.
Documentación del
código fuente.
```
```
Elaboración de diagramas de
clases y diagramas de secuencia.
```
```
Programación en base a los casos de
uso.
No aplica. Gerente General Alta
```
```
RN06 El sistema deberá ser
desarrollado en PHP y Mysql.
1.0.0 Aprobado 11/09/2018 El código fuente de la aplicación estará escrito en el
lenguaje PHP y la base de datos usará el motor Mysql.
Moderada. Optimizar el desempeño. Diagrama lógico de
datos.
```
```
Diseño e implementación de la
base de datos.
```
```
Selección de las herramientas para el
desarrollo. No aplica.
Gerente General Alta
```
## RN

```
El sistema deberá proporcionar,
para los diferentes reportes
solicitados, salidas en
documento electrónicos
(xls,pdf).
```
```
1.0.0 Aprobado 11/09/2024 El sistema genera reportes en los formatos .pdf y .xls. Baja. Facilitar el uso.
Reportes de
evaluación.
```
```
Elaboración de casos de uso del
sistema.
```
```
Programación en base a los casos de
uso.
```
```
Se realizaran varias peticiones de
reportes.
Gerente General Alta
```
## RN

```
El sistema será independiente
del navegador utilizado para su
visualización.
```
```
1.0.0 Aprobado 11/09/2024 El sistema puede ejecutarse en cualquier navegador. Baja. Facilitar el uso.
Reportes de
evaluación.
No aplica.
Selección de las herramientas para el
desarrollo.
```
```
Se realizaran varias pruebas de
ejecución.
Gerente de Recursos Humanos Baja.
```
**Nombre del Proyecto: IMPLEMENTACIÓN DE UNA APLICACIÓN WEB PARA MEJORAR LA GESTIÓN DE INVENTARIO DE LA LIBRERÍA HUERTAS SRL**

# MATRIZ DE TRAZABILIDAD DE REQUISITOS


