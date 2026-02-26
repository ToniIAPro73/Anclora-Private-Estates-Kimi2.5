# Anclora Private Estates

Frontend premium para Anclora Private Estates, construido con React + TypeScript + Vite.

## Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- i18next (`es`, `en`, `de`, `fr`)
- GSAP/ScrollTrigger

## Estado actual

- Navegación principal y secciones premium de landing operativas.
- Menú overlay rediseñado con enfoque limpio y jerárquico (sin cards), manteniendo la identidad visual premium.
- Documentación SDD inicial y de features en `sdd/`.

## SDD y gobernanza

- Núcleo SDD: `sdd/core/`
- Features SDD: `sdd/features/`
- Reglas de agentes: `.agent/rules/`
- Skills de features: `.agent/skills/features/`
- Prompts de orquestación: `.antigravity/prompts/features/`

Feature activa más reciente:
- `ANCLORA-MENU-002` (`menu-overlay-clarity-redesign`)

## Validación

Comandos de validación habilitados:

```bash
npm run lint
npm run test
```

## Documentación de análisis y mejora

- `public/docs/ANALISIS.md`
- `public/docs/PLAN_MEJORA.md`
