# menu-overlay-clarity-redesign-spec-v1

Feature ID: ANCLORA-MENU-002

## Problema
El menu actual usa una estructura de tarjetas con alta densidad visual y mezcla de prioridades, reduciendo claridad en navegacion.

## Objetivo
Implementar un overlay de menu limpio, de fondo claro, con jerarquia de navegacion por niveles (principal y submenu), sin cards y manteniendo identidad visual premium.

## Alcance
- Rediseño del overlay de menu en `Navbar`.
- Nueva IA de menu por grupos y subopciones.
- Ajuste de estilos en `index.css`.
- Ajuste de textos i18n para nuevas etiquetas de menu en `es`, `en`, `de` y `fr`.

## Fuera de alcance
- Cambios de backend.
- Cambios de arquitectura de rutas.

## Criterios de aceptacion
1. El overlay abre/cierra con el boton menu y tecla `Escape`.
2. Vista principal del menu muestra grupos claros y flecha de avance.
3. Seleccionar un grupo abre un submenu con accion de volver.
4. No se usan cards para opciones de menu.
5. Links a secciones y portal agente mantienen comportamiento.
6. El diseno es usable en desktop y mobile.
7. El acabado visual mantiene caracter premium (espaciado, contraste, tipografia y transiciones sobrias).
8. No hay claves i18n faltantes en idiomas soportados.
