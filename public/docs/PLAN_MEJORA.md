# PLAN_MEJORA - Menu Overlay Premium

Fecha: 2026-02-26  
Feature: ANCLORA-MENU-002 (`menu-overlay-clarity-redesign`)

## Objetivo

Llevar el menu overlay a un patrón premium, limpio y jerárquico, con una experiencia clara en desktop y móvil.

## Plan ejecutado

1. Definir IA del menú en dos niveles.
2. Reestructurar `Navbar` para soportar grupos y submenús.
3. Sustituir estilos de cards por estilo de lista limpia.
4. Mantener accesos existentes:
   - Navegación por secciones.
   - Portal de agente.
   - Modal informativo para partner/data lab.
5. Añadir claves i18n nuevas en `es`, `en`, `de`, `fr`.
6. Añadir tests automáticos de la feature.

## Entregables

- `src/components/Navbar.tsx`
- `src/components/menuOverlayConfig.ts`
- `src/index.css`
- `src/i18n/locales/es.json`
- `src/i18n/locales/en.json`
- `src/i18n/locales/de.json`
- `src/i18n/locales/fr.json`
- `tests/menu-overlay-redesign.test.js`

## Validación prevista

1. `npm run test`
2. `npm run lint`

## Siguientes mejoras sugeridas

1. Añadir animación de transición entre nivel principal y subnivel con `prefers-reduced-motion`.
2. Incorporar navegación por teclado avanzada (flechas arriba/abajo y foco inicial en primer item).
3. Añadir smoke test visual E2E cuando exista infraestructura de browser testing.
