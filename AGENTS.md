# AGENTS.md

## Reglas operativas de comandos

- No ejecutar comandos de build (por ejemplo `npm run build`) ni otros comandos no solicitados.
- Solo ejecutar `npm run lint` y `npm run test` cuando sea necesario validar cambios.
- Cualquier comando distinto de `npm run lint` o `npm run test` requiere autorización explícita del usuario en ese turno.

## Situación actual del proyecto

- Frontend: React + TypeScript + Vite.
- Estilo: identidad `Premium` obligatoria en cualquier feature visual.
- Idiomas activos: `es`, `en`, `de`, `fr` (i18n obligatorio en nuevos textos de UI).
- Marco de entrega: SDD con artefactos en `sdd/`, reglas en `.agent/rules`, skills en `.agent/skills` y prompts en `.antigravity/prompts`.

## Estado funcional relevante

- Header y navegación principal operativos.
- Overlay de menú rediseñado con estructura jerárquica limpia (sin cards), alineado con referencia visual premium.
- Feature SDD activa para esta mejora:
  - `ANCLORA-MENU-002` / `menu-overlay-clarity-redesign`.
