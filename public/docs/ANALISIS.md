# ANALISIS - Menu Overlay

Fecha: 2026-02-26

## Contexto

Se analiza el menu overlay actual de Anclora Private Estates frente a la referencia visual indicada:
- https://www.rangerover.com/es-es/index.html

## Diagnóstico del estado previo

Problemas detectados en el menu anterior:
- Exceso de densidad visual por uso de cards en el overlay.
- Mezcla de prioridades (navegación principal y accesos privados con igual peso visual).
- Lectura menos directa en móvil por bloques complejos.

## Patrones observados en la referencia

Patrones relevantes del comportamiento de la referencia:
- Superficie limpia y clara para el panel de menu.
- Lista principal directa con opciones de alto nivel.
- Flecha de avance para opciones con subnivel.
- Vista de subnivel con botón de vuelta y jerarquía clara.
- Tipografía en mayúsculas, espaciado amplio y contraste sobrio.

## Decisión de diseño aplicada

Se adopta un menú jerárquico de dos niveles:
- Nivel 1: grupos principales.
- Nivel 2: opciones del grupo seleccionado con acción de volver.

Criterios aplicados:
- Mantener estilo premium.
- Eliminar cards del menu.
- Mantener acciones existentes (scroll a secciones, portal agente, modal de portales en preparación).
- Cobertura i18n completa (`es`, `en`, `de`, `fr`).
