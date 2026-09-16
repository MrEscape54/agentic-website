# Relevamiento integral — Home v1

## Conclusión

Sí conviene un refactoring, concentrado en CSS, modelo de ejecuciones, controladores de interacción y pruebas. La identidad visual y la arquitectura aprobada se pueden conservar. No encontré una razón técnica para rehacer el sitio, cambiar de stack o incorporar una librería de animación/estado.

La homepage funciona en las resoluciones revisadas. El riesgo principal es el costo de mantenerla: varias decisiones finales están expresadas como excepciones sobre reglas anteriores. Esto explica por qué cambios pequeños pueden tener efectos inesperados en otros tamaños.

## Alcance y evidencia

- Revisión del código de la homepage, componentes no montados, datos, configuración, estilos y tests.
- Ejecución de `lint`, `typecheck`, `build` y la suite Playwright: **32 tests aprobados**.
- Inspección adicional del build de producción servido localmente en `127.0.0.1:3001`.
- Resoluciones: 1920×1080, 1440×900, 1366×768, 1280×720, 1024×768, 768×1024, 390×844 y 320×740.
- Verificación de scroll, responsive, contenido, selección, apertura/cierre, foco, referencias ARIA y anchors.
- Capturas de producción en escritorio y móvil; mediciones en [metrics.json](metrics.json).
- No modifiqué la implementación. El cambio previo de `globals.css` para el estado del Hero se conserva.

**Límites:** revisión en Chrome de escritorio con tamaños de viewport emulados. No equivale a probar Safari/iOS, Firefox, dispositivos físicos, lectores de pantalla o el dominio desplegado. No es una auditoría de seguridad ni una certificación de accesibilidad. Los recursos medidos son locales; no se presentan como Core Web Vitals de usuarios reales.

## 1. Diagnóstico visual

| Sección | Evaluación | Acción sugerida |
|---|---|---|
| Navbar | Marca, CTA y distribución consistentes. Solutions, Industries y Resources permanecen pendientes, sin anchors rotos. | Mantener el comportamiento autorizado; centralizar sus destinos en código. |
| Hero | La promesa y el demo tienen buena relación visual en escritorio. En 1440×900 y 1920×1080 completan el primer viewport. | Conservar composición y secuencia. Priorizar legibilidad de la UI en móvil. |
| Intelligence, put to work | Funciona como puente corto, con diferencia clara respecto de las escenas de producto. Aproximadamente 198px de alto en 1440px. | No necesita compactación adicional. |
| Enterprise | El cierre tiene protagonismo, separación y tono adecuado. Los tres controles se leen como conjunto. | Mantener jerarquía. Su altura es deliberada; no reducirla como efecto secundario del refactor. |
| Intelligent Handoff | Menor complejidad que Platform at Work; conserva la lectura solicitud/triage/resolución/especialista. | Revisar tamaño de L1/L2/L3 en móvil. |
| Platform at Work | Los controles ya se entienden como interactivos. Orchestration Engine y descripción están separados. | Conservar UX; revisar claridad del texto contextual de cada nodo y robustecer semántica de tabs. |
| Capabilities | El momento horizontal funciona en todos los escritorios objetivo, incluidos 1280×720 y 1366×768. | Extraer y proteger su lógica. Agregar pruebas de texto ampliado. |
| Integrations | Pausa visual compacta, con iconos secundarios al título. Fondo navy e iconos claros correctos. | Congelar dirección. No requiere otra visualización. |
| CTA y footer | Cierre fuerte y simple. El mensaje temporal de reserva aparece después de abrir el control. | Mantener el placeholder; tratar el sistema comercial como trabajo independiente. |

### Hallazgo visual prioritario: textos del demo demasiado pequeños

En 390px medí:

- etiquetas de etapas: **6,5px**;
- estado IN PROGRESS/RESOLVED: **6px**;
- selector de escenarios: **8px**, controles de 30px de alto;
- botones de reproducción: **9px**, controles de 36px de alto;
- etiquetas de sistemas: **7px**.

No hay desborde general, pero caber no equivale a ser legible. El demo comunica visualmente el proceso; leer los detalles exige más esfuerzo del deseable. La revisión debería aumentar legibilidad y superficie táctil donde sea posible, manteniendo las seis etapas y permitiendo el alto natural. No propongo reducir más la tipografía para forzar el primer viewport.

Referencias: [Hero móvil](hero-390.png), [Hero escritorio](hero-1440.png), [globals.css](../../src/app/globals.css:175).

### Densidad y ritmo: observación, no bug

A 1440×900, Enterprise mide aproximadamente 1273px y Platform at Work 1660px. Capabilities ocupa 3269px de recorrido total; parte de esa altura es la distancia que impulsa el scroll horizontal, no espacio vacío.

En 390×844, Enterprise mide 1548px, Platform at Work 1640px y Capabilities 2137px. La página es extensa en móvil, pero conserva contenido y no atrapa el scroll. Esto merece observación en futuras pruebas con usuarios; no justifica reordenar o eliminar secciones aprobadas durante un refactor.

Referencias: [Enterprise](enterprise-1440.png), [Platform at Work móvil](work-390.png).

## 2. Hallazgos de código priorizados

Prioridad alta significa beneficio/riesgo de mantenimiento importante, no caída del sitio.

### A1 — CSS acumulado y dependiente del orden de carga — alta

Hay tres hojas globales: `globals.css` (199 líneas), `home.css` (271) y `experience.css` (361), aproximadamente **61KB de fuente en total**. Muchas reglas están comprimidas en una sola línea; el número de líneas subestima la complejidad.

Ejemplos concretos:

- `.work-layout` se declara como grid en `home.css` y después cambia de composición en `experience.css`.
- `.work-panel` acumula padding y min-height en reglas base, media queries y overrides con `#platform-at-work`.
- El Hero conserva una altura mínima de 700px y una regla antigua para pantallas grandes, aunque su comportamiento final se redefine después con `100svh`.
- `.light-section` tiene fondo navy: el nombre dejó de expresar su función.
- `.node-explore-mark` tiene reglas enfrentadas de `display: inline` e `inline-flex`; la de mayor especificidad puede ganar aunque aparezca antes.
- Existen selectores antiguos como `.capability-layout`, `.section-index` y `.solution-grid`. Solutions actualmente usa `.solution-rows`, cuyos estilos específicos se retiraron: el componente conservado no debe considerarse listo para montar sin revisión.

**Refactor recomendado:** estilos por componente/feature, preferentemente CSS Modules; reservar el CSS global para reset, fuentes, tokens y utilidades compartidas. Primero trasladar valores efectivos sin cambiar el resultado visual. Unificar después colores de superficie, bordes, espaciados y breakpoints mediante tokens semánticos.

No hace falta migrar todo a clases Tailwind. El objetivo es tener una fuente clara de estilos, no cambiar de sintaxis por sí mismo.

Referencias: [home.css](../../src/app/home.css:65), [experience.css](../../src/app/experience.css:254), [globals.css](../../src/app/globals.css:49).

### A2 — Las capturas no son pruebas de regresión visual — alta

La suite cubre interacciones, tamaños, ausencia de overflow y geometría de algunos elementos. Sin embargo, las llamadas a `screenshot()` generan archivos; no comparan contra una referencia aprobada. No hay assertions `toHaveScreenshot`.

Por eso una alteración de jerarquía, espaciado, contraste o alineación puede pasar la suite. Además, la configuración ejecuta Chrome contra `next dev`, con posibilidad de reutilizar un servidor existente. No valida sistemáticamente el build de producción ni otros motores.

**Refactor recomendado:** fixtures deterministas para pausar animaciones/cargar fuentes; capturas de referencia por sección y estado; un job sobre producción. Empezar por Hero, panel de detalle, Capabilities al inicio/medio/final y móvil. Agregar WebKit/Firefox de forma gradual según disponibilidad.

Referencias: [playwright.config.ts](../../playwright.config.ts:5), [capabilities-scroll.spec.ts](../../tests/capabilities-scroll.spec.ts:12).

### A3 — Modelo de ejecución acoplado a índices — media/alta

El significado de las etapas depende de posiciones:

- Hero: `step === 2` significa protección y `step === 3` skills.
- FlowExplorer: `example.steps[3]` significa orquestación.
- System Logs: `index === 4` significa acción.

Hoy funciona porque todos los ejemplos respetan el mismo orden. Un cambio futuro de contenido puede producir una UI incorrecta sin error de TypeScript.

**Refactor recomendado:** identificadores de etapa (`understand`, `know`, `protect`, `orchestrate`, `act`, `observe`), tipos discriminados para payload y duraciones declarativas. Extraer `useExecutionPlayback` o un reducer pequeño para play/pause/replay/avance, conservando los tiempos y comportamiento aprobados. No hace falta una librería de máquinas de estado.

Referencias: [ExecutionFlow.tsx](../../src/components/hero/ExecutionFlow.tsx:59), [FlowExplorer.tsx](../../src/components/home/FlowExplorer.tsx:24), [PlatformAtWork.tsx](../../src/components/home/PlatformAtWork.tsx:26).

### A4 — Capabilities mezcla presentación, medición y scroll — media

El componente consulta su propio DOM mediante selectores, presupone que todos los elementos existen, cambia estilos imperativamente y calcula geometría dentro del mismo efecto. `measure()` alterna escrituras de layout y lecturas de tamaño, y se invoca desde resize y ResizeObserver.

Esto no demuestra por sí solo un problema de FPS. Sí vuelve delicado modificar cards, fuentes, markup o breakpoints. Los listeners están correctamente limpiados y el scroll usa requestAnimationFrame: esa base debe conservarse.

**Refactor recomendado:** extraer un hook especializado con refs explícitas, cálculo puro de progreso, medición agrupada por frame y contrato claro para breakpoint/reduced motion. Mantener transform para la animación y evitar estado React por cada scroll. Agregar casos de carga de fuentes, resize durante el pin, restauración de scroll y contenido ampliado.

**Prueba de estrés adicional:** al ampliar por CSS los textos de las cards, el stage usa `top` negativo para preservar la lectura de las cards; a mitad de recorrido el encabezado queda fuera de pantalla. Es un compromiso del diseño actual, no un fallo reproducido en los tamaños normales. No equivale a una prueba completa de zoom real del navegador.

Referencias: [Capabilities.tsx](../../src/components/home/Capabilities.tsx:40), [captura de texto ampliado](capabilities-large-text.png).

### A5 — Referencias ARIA a tabs inexistentes — media, comprobado

En el estado inicial, los tabs Details y System Logs tienen `aria-controls="work-panel-1"` y `work-panel-2`, pero solo existe `work-panel-0`. El ID del panel cambia con el tab activo.

La navegación por teclado funciona, pero las relaciones semánticas de los tabs inactivos no están completas.

**Corrección propuesta:** paneles estables con IDs únicos y `hidden` para los inactivos, o una implementación consistente de panel compartido. Usar `useId` si el componente debe ser reutilizable. Agregar assertions sobre todas las referencias ARIA.

Referencia: [PlatformAtWork.tsx](../../src/components/home/PlatformAtWork.tsx:17).

### A6 — Contenido de detalle y presentación mezclados — media

`FlowExplorer.node()` fabrica botones, manipula foco y recibe textos definidos inline. Varios agentes comparten explicaciones genéricas; todas las skills reutilizan la descripción de la etapa completa. La identidad depende de títulos visibles y de comparaciones como `agent === "Knowledge Agent"`.

**Refactor recomendado:** datos tipados por nodo/escenario, con IDs estables y contenido aprobado separado de la UI. Extraer solamente `ExplorableNode` y `ExecutionDetailPanel`, evitando fragmentar cada línea en otro componente. Si falta contenido específico, mantener explicación breve; no completar con claims inventados.

El cierre devolvió correctamente el foco a Action Engine en la prueba móvil. No reporto un bug de foco confirmado.

Referencia: [FlowExplorer.tsx](../../src/components/home/FlowExplorer.tsx:14).

### A7 — Trabajo de animación innecesario y anuncios automáticos — media, para medir

- Hero sigue avanzando mediante timers aunque el usuario haya bajado a otra sección; no tiene control por visibilidad.
- El panel usa `aria-live="polite"` con contenido que se actualiza automáticamente. Conviene revisar la experiencia real con lector de pantalla y separar reproducción visual de anuncios provocados por una acción del usuario.
- ScrollEffects calcula y escribe `--scene-progress`, pero actualmente no encontré consumidores visuales de esa variable. `--scene-shift` sí se utiliza.
- Hay dos mecanismos independientes de scroll/resize, uno global y otro en Capabilities. No necesariamente deben fusionarse; sí delimitarse y evitar trabajo fuera de sus zonas de interés.

**Propuesta:** pausar/reanudar automáticamente solo por visibilidad sin sobrescribir una pausa manual; eliminar cálculos sin consumidor; medir antes de optimizar más. No observé un problema general de rendimiento que justifique nueva infraestructura.

Referencias: [ExecutionFlow.tsx](../../src/components/hero/ExecutionFlow.tsx:33), [ScrollEffects.tsx](../../src/components/ui/ScrollEffects.tsx:41).

### A8 — Documentación desactualizada — alta para continuidad del proyecto

README todavía describe:

- reserva a `info@example.com`;
- Financial Services como escenario inicial;
- Capabilities como disclosures;
- Industries montado en la homepage;
- integraciones radiales;
- orden inicial anterior.

El código actual hace otra cosa. AGENTS.md también contiene decisiones históricas superadas por instrucciones posteriores. Esto aumenta el riesgo de que el siguiente desarrollo restaure comportamientos descartados.

**Propuesta:** documentar el estado efectivo de Home v1, el orden congelado, placeholders intencionales, decisiones sustituidas y cómo validar cambios. No modificar documentación estratégica silenciosamente: distinguir claramente reglas vigentes e historial.

Referencia: [README.md](../../README.md:23).

### A9 — Estructura preparada solo parcialmente para nuevas páginas — media

Nav y footer duplican destinos. Hay componentes y datos de secciones retiradas, algunos útiles para páginas futuras y otros históricos. Muchos componentes concentran todo el JSX en una línea extensa. Esto dificulta revisar diffs y localizar responsables de una decisión visual.

**Propuesta:** configuración única de navegación con `href`/estado pendiente explícitos; formateo consistente; carpetas por feature; separar datos actuales de material pendiente. Mantener Solutions/Industries, pero marcarlos como material para adaptar, no como componentes validados para producción.

La metadata actual incluye título y descripción. Cuando se prepare publicación comercial, completar canonical, social previews y sitemap/robots según el dominio confirmado. Es preparación de lanzamiento, no un bug visual actual ni parte obligatoria del refactor.

## 3. Lo que ya está bien y conviene preservar

- Componentes separados por secciones y contenido de escenarios compartido entre Hero y Platform at Work.
- Sitio estático con interacciones locales, sin backend innecesario.
- Tipografía local, SVG livianos y sin nuevas dependencias de animación.
- Autoplay con pausa/replay y comportamiento específico para reduced motion.
- Escenarios y tabs operables por teclado; focos visibles.
- Fallback estático de Capabilities en móvil/reduced motion.
- Sin anchors rotos, errores JS capturados o overflow horizontal global en los ocho tamaños.
- Mensaje comercial provisional oculto hasta interactuar, tal como fue aprobado.
- 32 pruebas existentes útiles; el objetivo es complementarlas, no descartarlas.

### Recursos de producción observados

En una carga local: cinco recursos de script, aproximadamente **136KB codificados / 467KB decodificados**; una hoja CSS de **12,5KB / 59,8KB**; dos fuentes por **75,6KB**. Son valores de Resource Timing de esa carga, no un análisis exhaustivo del bundle ni una medición de red móvil.

Esto orienta la decisión: el beneficio principal del refactor es mantenibilidad y prevención de regresiones. No hay evidencia aquí de que la homepage necesite una reescritura por peso.

## 4. Plan de refactoring recomendado

| Orden | Entrega | Alcance | Condición de aceptación |
|---|---|---|---|
| 1 | Red de seguridad y documentación | Estado Home v1, fixtures de interacción, baselines visuales, prueba de producción, checks ARIA. | Orden/contenido congelados; baselines revisadas; suite verde. |
| 2 | Consolidación CSS por sección | Empezar por Hero y Platform at Work; luego Capabilities. Extraer tokens reales y eliminar reglas sustituidas. | Sin diferencias visuales no autorizadas en los siete tamaños objetivo. |
| 3 | Modelo y controladores | IDs de etapas/nodos, hook de reproducción, hook de scroll, panel contextual y tabs estables. | Misma secuencia, pausas, replay, escenarios, foco, progreso y release. |
| 4 | Componentes compartidos y material futuro | Navegación, estilos base, separar componentes históricos/futuros, README. | Sin destinos rotos; ninguna sección removida reaparece. |
| 5 | Mejoras visuales puntuales | Legibilidad móvil y superficies táctiles; casos de texto ampliado. | Revisión visual explícita: este paso sí cambia la presentación. |

### Límites para que el refactor no se convierta en otro rediseño

- Una sección o responsabilidad por PR; separar formateo, traslado y cambios funcionales.
- Conservar copy, orden, palette, fuentes, iconografía y comportamiento aprobado.
- No introducir Redux, otra librería de animación, backend ni un design system genérico para resolver esta homepage.
- No borrar contenido futuro solo porque no está importado hoy.
- No mezclar booking real, nuevas páginas o naming del producto con esta tarea.
- El refactor de CSS necesita validación visual, aunque no toque JSX.

## Recomendación concreta

Comenzaría por **baselines visuales + actualización de documentación**, seguido de **consolidación de CSS del Hero y Platform at Work**. Es el punto con mejor relación entre beneficio y riesgo. Después abordaría el modelo de ejecución y el controlador de Capabilities con esa protección ya instalada.

El sitio puede conservar exactamente la identidad y arquitectura actuales mientras se reduce significativamente su fragilidad interna.
