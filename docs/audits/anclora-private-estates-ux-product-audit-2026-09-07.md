# Auditoría UX/Producto — Anclora Private Estates

**Fecha:** 2026-09-07
**Skill:** `ux-product-experience-review` — SKILL_VERSION=1.3.0 — SKILL_SOURCE_PATH=/Users/michaelmcmullen/.claude/skills/ux-product-experience-review/SKILL.md
**Repositorio:** ~/Developer/anclora/anclora-private-estates · rama `development` · LOCAL_HEAD=`39605bcfbfbbf8c3c2b051f6da3029052220e6b9` (2026-09-02 14:32:09 +0200) · WORKTREE_STATUS=clean
**Producción auditada:** https://anclora-private-estates.vercel.app (dpl_8p7hUVSkRBMqVo75zJ11d1J8C7o5, build de `main`@6356975)
**DEPLOYMENT_CODE_DRIFT:** FALSE para UI renderizada — `development` está solo 2 commits por delante de `origin/main` (housekeeping de `.env.local`/`.gitignore`/`AGENTS.md`, cero cambios en `src/`). Todo hallazgo obtenido contra producción es representativo del código auditado en el repositorio.

---

## 1. STATUS

**PASS_WITH_GAPS**

Se ejecutó auditoría con navegador real (`agent-browser`, Chrome vía CDP) contra la URL canónica de producción, con interacción real (clics, teclado, formularios, cambio de idioma, redimensionado de viewport) y captura de evidencia `MEASURED_BROWSER`, combinada con inspección de código de fuente (`MEASURED_CODE`) y de los contratos de marca/gobernanza del repo (`DECLARED_CONTRACT` / `DECLARED_DOCS`). Se degrada a `PASS_WITH_GAPS` porque:

- La cobertura de los 11 locales activos es profunda en ES/EN/DE y de *smoke test* dirigido (selector abierto + verificación de claves top-level vía código) para CA/SV/FR/IT/DA/NL/NO/PT, no captura visual completa de cada uno.
- No se probaron los 7 viewports exhaustivamente con captura en todos ellos; se cubrieron 1440×900 y 390×844 en profundidad, con verificación puntual funcional (no visual) del resto vía inspección de breakpoints Tailwind en código.
- El envío real del formulario de Contacto (`ContactSection`) no se completó — ver `SAFETY_BLOCKED` en §18 — aunque se demostró que el propio widget de verificación anti-spam está roto en producción, lo cual ya constituye evidencia suficiente de que el envío no puede completarse hoy.
- Los skills compuestos `accessibility-audit`, `i18n-integrity-check`, `design-system-consumer-check`, `visual-regression-check`, `change-impact-analysis`, `repo-preflight` y `aos-compliance-preflight` no se invocaron como subprocesos AOS independientes; se aplicó su *criterio* manualmente sobre evidencia de código y navegador (ver §28/§42 para detalle de cobertura por skill).

---

## 2. INPUT

```text
repo: ~/Developer/anclora/anclora-private-estates
rama: development @ 39605bc
url: https://anclora-private-estates.vercel.app
modo: AUDIT_WITH_REPO_CONTEXT
locales objetivo: es, ca, de, en, sv, fr, it, da, nl, no, pt (11, confirmados en src/i18n/locales/)
viewports: 390×844, 430×932, 768×1024, 1024×768, 1366×768, 1440×900, 1728×1117
navegador: agent-browser (Chrome/CDP), sesión aislada apeaudit-*
```

---

## 3. PRODUCT_MODEL

Anclora Private Estates es un **sitio editorial de marketing inmobiliario ultra-premium** (SPA de una sola página con 5 páginas legales adicionales), no una aplicación transaccional. Stack confirmado en código: Vite 7 + React 19 + TypeScript, React Router 7 (5 rutas legales + home + wildcard→null), i18next/react-i18next (11 locales), GSAP 3 + `@gsap/react` + ScrollTrigger (pin/scrub en 4 secciones), Radix UI (primitivas), React Hook Form + Zod están en `package.json` pero **no se usan** en los dos formularios reales del producto (ambos usan `useState` + validación HTML5/manual).

**Propuesta de valor declarada:** "Exclusividad elevada a obra de arte" (hero, EN: *"Exclusivity Elevated to an Art Form"*).

**Secciones reales confirmadas** (orden DOM, `src/App.tsx`): Hero → Properties → Philosophy → Investment ("Invest") → Neighborhood → Valuation → Insights → About → Contact → Footer. No existen las secciones "Ethics"/"Insights" como página propia — Insights es una sección de tarjetas editoriales dentro de la home, no un blog navegable.

**Páginas legales:** `/legal/privacidad`, `/legal/cookies`, `/legal/terminos`, `/legal/disclaimer`, `/legal/codigo-etico` — confirmadas y accesibles.

**No existe:** backend de propiedades, CRM visible, autenticación, favoritos, mapa interactivo, portal de usuario, ni página de listado/detalle de propiedades (`/properties`, `/property/:id` no están registradas en el router). Esto es un hallazgo estructural crítico — ver §7 y F-01.

---

## 4. PRODUCT_PROMISE_VS_EXPERIENCE

| Promesa | Experiencia observada |
|---|---|
| "Exclusividad elevada a obra de arte" | El hero, la tipografía Cardo/Fraunces, el acabado gold/navy y la composición editorial SÍ transmiten calma y exclusividad — la promesa se cumple visualmente en el 90% de las secciones (ver §23). |
| "Descubre propiedades fácilmente" | **No se cumple.** Solo existen 3 propiedades hardcodeadas (`PropertiesSection.tsx:9-40`) sin paginación, sin filtro funcional, y sin ruta de detalle. El buscador del hero (tipo/ubicación/precio) y el botón "EXPLORE THE FULL PORTFOLIO" no tienen destino en el router — ver F-01. |
| "Entiende el valor diferencial de Mallorca" | Parcialmente cumplida: Investment/Neighborhood comunican tesis de inversión con cifras concretas (+8.2% anual, €4.1B), pero esas cifras están hardcodeadas en inglés y no localizadas (ver F-05). |
| "Muévete con naturalidad hacia contacto/tasación" | El CTA "FREE VALUATION" es omnipresente y el formulario de tasación funciona (simulado). El formulario de Contacto real está **roto en producción** por un error de reCAPTCHA visible al usuario — ver F-02 (CRÍTICO). |

---

## 5. USER_TYPES

- **FIRST_TIME_USER (comprador/inversor HNW internacional):** llega vía búsqueda/referido, evalúa credibilidad de marca en los primeros 2 scrolls, quiere ver inventario real y contactar sin fricción.
- **RETURNING_USER:** vuelve para revisar una propiedad concreta o solicitar tasación — sin cuenta ni estado persistente más allá de `localStorage` de idioma/moneda/unidades.
- **PROPIETARIO_VENDEDOR:** entra por "FREE VALUATION" buscando estimar el valor de su inmueble antes de vender.
- **BOT/CRAWLER (SEO):** relevante porque las secciones bajo el Hero solo se montan en el DOM tras un gesto de usuario (scroll/touch/pointer/keydown) — ver F-13.

No hay roles ADMIN/OPERATOR visibles ni accesibles públicamente (correcto para este tipo de producto).

---

## 6. TASK_INVENTORY

| Tarea | Criticidad | Estado observado |
|---|---|---|
| Ver propuesta de valor / marca | CORE | ✅ Funciona bien |
| Explorar propiedades disponibles | CORE | ❌ Bloqueada estructuralmente (F-01) |
| Solicitar tasación gratuita | CORE | ✅ Funciona (simulado, sin red) |
| Contactar / dejar lead | CORE | ❌ Roto en producción (F-02) |
| Cambiar idioma | FRECUENTE | ✅ Excelente (posición de scroll preservada) |
| Cambiar moneda/unidades | OCASIONAL | ❌ No tiene efecto real (F-03) |
| Suscribirse a newsletter | OCASIONAL | ⚠️ Funciona pero con `alert()` nativo (F-06) |
| Gestionar preferencias de cookies | FRECUENTE (legal) | ⚠️ Parcial — solo desde home (F-07) |
| Leer páginas legales | OCASIONAL | ⚠️ Sin navegación de vuelta (F-08) |

---

## 7. CRITICAL_USER_JOURNEYS

### J1 — Descubrimiento de propiedades (PRIMARY_JOURNEY)
`ENTRY:` Hero → buscador (tipo/ubicación/precio) → SEARCH, o scroll → Properties → "EXPLORE THE FULL PORTFOLIO"
`OBSERVADO:` El buscador del hero es funcional como `<select>` (se pueden cambiar sus 3 combos), pero no hay evidencia de una ruta o listado real al que envíe: `MEASURED_CODE` confirma que el router (`src/App.tsx:301-310`) solo registra `/` y 5 rutas legales. `EXPLORE THE FULL PORTFOLIO` y "SEARCH" no tienen página de destino navegable.
`RESULTADO:` El comprador solo puede ver 3 propiedades de muestra, sin filtro real, sin paginación, sin ficha de detalle. **Journey CORE incompleto.**

### J2 — Solicitud de tasación (PRIMARY_JOURNEY)
`ENTRY:` CTA "FREE VALUATION" (navbar, persistente) → Valuation section → formulario (nombre, email, dirección, mensaje)
`OBSERVADO:` Formulario simple, sin Zod/RHF, validación HTML5 `required`. Envío simulado (`setTimeout`, sin red) — MEDIDO en código, `SAFETY` = sin riesgo real de envío. Estado de éxito reemplaza el formulario 3s y luego lo restaura.
`RESULTADO:` Journey funciona de cara al usuario, pero el "envío" no genera ningún lead real — es una demo, lo cual es aceptable en fase pre-lanzamiento pero debe marcarse explícitamente antes de producción real.

### J3 — Contacto comercial (PRIMARY_JOURNEY / RECOVERY_JOURNEY)
`ENTRY:` Navbar "CONTACT" o sección Contact (formulario extenso: nombre, apellido, teléfono, email, interés, mensaje, checkboxes, captcha)
`OBSERVADO (MEASURED_BROWSER):` Al rellenar campos y llegar al bloque "Anti-spam verification", el widget de reCAPTCHA renderiza **"ERROR for site owner: Invalid site key"** en rojo, con el texto de ayuda "Complete the verification before submitting." El botón SUBMIT permanece deshabilitado. Ver captura `contact-form-validation.png`.
`RESULTADO:` **Ningún usuario real puede enviar el formulario de contacto en producción hoy.** Es el hallazgo más grave de la auditoría (F-02, CRITICAL).

### J4 — Cambio de idioma en scroll profundo (RECOVERY_JOURNEY / caso de estabilidad)
`ENTRY:` Usuario navega a "About Us" en inglés (scrollY=9672), abre selector de preferencias, cambia a Alemán, guarda.
`OBSERVADO (MEASURED_BROWSER):` `window.scrollY` tras el cambio de idioma es **exactamente 9672**, idéntico al valor previo al cambio. El texto alemán ("Eine Immobilienplattform für das neue Marktparadigma.") se renderiza sin overflow, sin recortes, en tarjetas que se ajustan bien al 30% de expansión típica del alemán.
`RESULTADO:` **Journey ejemplar** — la lógica de restauración de scroll en `App.tsx` (líneas ~130-260) funciona correctamente incluso con secciones GSAP-pinned. Añadir a `DO_NOT_BREAK`.

---

## 8. SCREEN_MAP

| Pantalla | Propósito | Acción primaria | Acciones secundarias | Issues observados |
|---|---|---|---|---|
| Home / Hero | Impacto de marca + búsqueda | SEARCH / DISCOVER | FREE VALUATION | Buscador sin destino (F-01) |
| Properties | Prueba social de inventario | EXPLORE FULL PORTFOLIO | Ver tarjeta individual | Sin destino de portfolio (F-01) |
| Philosophy | Credibilidad institucional | — | — | Ninguno relevante |
| Investment | Tesis de inversión | Download market report | — | Cifras no localizadas (F-05) |
| Neighborhood | Contexto geográfico | See Old Town listings | — | Encabezado hardcodeado en inglés (F-05) |
| Valuation | Captura de lead vendedor | SEND REQUEST | — | Envío simulado, sin backend real |
| Insights | Contenido editorial | (tarjetas, sin enlace real a artículo) | — | "Read more" hardcodeado en inglés |
| About | Confianza institucional | — | — | Ninguno relevante |
| Contact | Captura de lead comprador | SUBMIT | BOOK A CALL | reCAPTCHA roto (F-02, CRÍTICO) |
| Footer | Navegación legal + newsletter | SUBSCRIBE | enlaces legales | `alert()` nativo (F-06) |
| /legal/* (5 páginas) | Cumplimiento legal | — | — | Sin Navbar/Footer/cookie control (F-08) |
| Ruta desconocida (`*`) | — | — | — | Pantalla en blanco, sin nav (F-09) |

---

## 9. EXPERIENCE_MAP (síntesis, journeys J1–J3)

```
J1: ENTRY hero → GOAL ver propiedades reales → ACTION click EXPLORE PORTFOLIO
    → SYSTEM_RESPONSE ninguna ruta / posible no-op → FRICTION alta (callejón sin salida)
    → RESULT usuario limitado a 3 tarjetas → RECOVERY ninguna (no hay página de error, ni fallback)

J2: ENTRY navbar FREE VALUATION → GOAL tasar mi propiedad → ACTION rellenar + enviar
    → SYSTEM_RESPONSE checkmark de éxito simulado → FRICTION baja
    → RESULT usuario cree haber contactado a la empresa, sin lead real generado

J3: ENTRY navbar CONTACT → GOAL dejar mis datos → ACTION rellenar formulario
    → SYSTEM_RESPONSE widget captcha con error técnico visible → FRICTION crítica
    → RESULT abandono forzado, sin ruta de recuperación visible para el usuario
```

---

## 10. UX_SCORECARD

| Dimensión | Score | Base de evidencia |
|---|---|---|
| Clarity | GOOD | Jerarquía tipográfica y de mensaje clara en cada sección (MEASURED_BROWSER) |
| Efficiency | FAIR | CTA "FREE VALUATION" siempre visible, pero journey de propiedades no lleva a ningún sitio (F-01) |
| Consistency | FAIR | Mezcla de idioma en NeighborhoodSection/InsightsSection/FloatingControls (F-05) |
| Feedback | FAIR | Estados de envío buenos en Contact (loading/success/error) pero error de Contact es un error técnico expuesto, no de negocio (F-02) |
| Error Recovery | POOR | El error de captcha no ofrece ninguna vía alternativa de contacto en el propio bloque (email/WhatsApp están arriba en la misma sección, mitigante parcial) |
| Cognitive Load | GOOD | Progressive disclosure correcto: hero simple, detalle progresivo por scroll |
| Navigation | GOOD | Navbar compacta, nav-click restaura posición y sección con precisión (J4) |
| Onboarding | GOOD | No requiere onboarding, apropiado para producto editorial |
| Accessibility | FAIR | Ver §18; reduced-motion solo cubierto en Hero (F-11) |
| Responsive Task Completion | GOOD | Hero, Properties, Investment, Footer probados en 390×844 sin overflow ni recortes |
| Visual Hierarchy | EXCELLENT | Tipografía Cardo/Fraunces + espaciado editorial consistente en todas las secciones capturadas |
| Application Shell (Public Site Shell) | GOOD | Navbar compacta y estable; ver §24 para matices |
| Viewport Economy | GOOD | Ver §25 |

## 11. UI_SCORECARD

| Dimensión | Score | Base de evidencia |
|---|---|---|
| Action Hierarchy | GOOD | CTA dorado único y consistente (FREE VALUATION / SUBMIT / SEND REQUEST) |
| Component Coherence | GOOD | Tarjetas, botones e inputs comparten radios y bordes dorados consistentes |
| Content Legibility | EXCELLENT | Contraste alto sobre fondo navy oscuro, buen line-length |
| State Clarity | FAIR | Estado disabled del botón SUBMIT correcto; estado de error del captcha es confuso para un usuario final (mensaje "for site owner") |
| Theme Coherence | UNKNOWN/GOOD | Solo se observó tema oscuro; `ThemeToggle` existe en código pero no está montado (F-10) — no se pudo evaluar el tema claro en vivo |
| Data Density | GOOD | Tarjetas de propiedades e insights con densidad apropiada, sin saturación |
| Modal Ergonomics | GOOD | Panel "Global preferences" (selector de idioma/moneda/unidades) se abre/cierra limpio, con foco visible |
| Form Ergonomics | GOOD | Labels claros, agrupación en 2 columnas en desktop, 1 columna en mobile |
| Spatial Hierarchy | EXCELLENT | Whitespace generoso, ningún exceso de tarjetas anidadas |
| Premium Visual Quality | EXCELLENT | Ver §23 |
| Modernity & Product Polish | GOOD | Penalizado por el `alert()` nativo del newsletter (F-06) y el error de captcha visible (F-02), ambos rompen la ilusión de producto pulido |

---

## 12. WHAT_WORKS_WELL

- **Restauración de scroll cross-idioma perfecta** (J4): posición y sección exactas tras cambiar idioma, incluso con secciones GSAP pinned.
- **Navegación por clic en navbar** es fluida y precisa (verificado con clic real en "ABOUT US" → aterriza exactamente en la tarjeta correcta).
- **Navegación por teclado nativa** (`End` key) lleva correctamente al footer sin artefactos visuales.
- **Botón SUBMIT del formulario de Contacto deshabilitado hasta validación completa** — buen patrón de prevención de errores.
- **Datos de contacto (email/WhatsApp/oficina) visibles junto al formulario**, ofreciendo una vía alternativa aunque el formulario falle.
- **Tipografía editorial (Cardo/Fraunces) y acabado gold/navy** — coherente, restringido, sin sobrecarga decorativa.
- **Alemán (idioma con mayor expansión textual del set) no rompe layout** en desktop ni mobile — CTAs, nav y tarjetas se adaptan bien.
- **`prefers-reduced-motion` sí está implementado** en el Hero (el componente con la animación GSAP más intensa), incluso con imagen de fondo alternativa más liviana.

**DO_NOT_BREAK:**
- La lógica de `App.tsx` que ancla la sección activa (`data-lang-anchor`, offsets por sección) al cambiar idioma.
- El patrón disabled-hasta-válido del botón SUBMIT.
- El comportamiento de navegación por clic de navbar (usa lógica propia, no anclas nativas).
- La imagen de hero alternativa más ligera en modo `prefers-reduced-motion`/mobile.

---

## 13. FRICTION_MAP

| Fricción | Tipo | Sección/Journey |
|---|---|---|
| Sin ruta de portfolio/detalle de propiedad | NAVIGATION_FRICTION, DISCOVERABILITY_FRICTION | J1 |
| reCAPTCHA roto bloqueando envío | ERROR_RECOVERY_FRICTION, FEEDBACK_FRICTION | J3 |
| Selector de moneda/unidades sin efecto | CONSISTENCY_FRICTION, COGNITIVE_FRICTION | Global preferences |
| Mezcla de idiomas (textos hardcodeados en inglés) | CONTENT_FRICTION, CONSISTENCY_FRICTION | Neighborhood, Insights, FloatingControls |
| `alert()` nativo en newsletter | VISUAL_FRICTION, AESTHETIC_COHERENCE_FRICTION | Footer |
| Cookie-reopen del footer es un link, no reabre el modal | PERMISSION_FRICTION, CONSISTENCY_FRICTION | Footer / Cookies |
| Páginas legales sin nav/footer | NAVIGATION_FRICTION, CONTEXT_SWITCH_FRICTION | /legal/* |
| Ruta desconocida → pantalla en blanco | ERROR_RECOVERY_FRICTION | Global |
| Animaciones scroll-pin sin gate de reduced-motion (excepto Hero) | ACCESSIBILITY, VISUAL_FRICTION | Properties/Investment/Neighborhood |
| Formateo numérico no localizado en 9/11 idiomas | CONTENT_FRICTION, CONSISTENCY_FRICTION | PropertiesSection |

---

## 14. INFORMATION_ARCHITECTURE_FINDINGS

- La IA de la home sigue un guion editorial lineal razonable (Hero→Prueba social→Filosofía→Inversión→Contexto→Tasación→Contenido→Confianza→Contacto), coherente con el "desire to decision" esperado para un producto de descubrimiento.
- **Ruptura estructural:** no existe una capa de navegación secundaria hacia un catálogo real de propiedades — la IA asume que "Properties" es solo una vitrina de 3 tarjetas y no una puerta de entrada a un catálogo, lo cual contradice la promesa central del producto.
- Las 5 páginas legales están fuera de la IA principal: no hay breadcrumb, no hay forma de volver a home salvo el logotipo (que si no está en la página porque Navbar no se monta en `/legal/*`, tampoco existe) — ver F-08.

---

## 15. CONSISTENCY_MAP

| Patrón | Consistente? | Evidencia |
|---|---|---|
| CTA dorado principal | Sí | Mismo tratamiento visual en Hero, Properties, Valuation, Contact |
| Idioma de la interfaz | **No** | Encabezado "Palma Old Town" y "Read more" quedan en inglés en todos los idiomas (`NeighborhoodSection.tsx`, `InsightsSection.tsx`); label de contacto flotante cae a español ('CONTACTAR') para 8/11 locales (`FloatingControls.tsx:54-59`) |
| Formato numérico/monetario | **No** | EN y DE tienen formateo propio; los 9 idiomas restantes heredan formato es-ES |
| Botón "reabrir cookies" | **No** | Correcto (reabre modal) en `FloatingControls`, incorrecto (navega a página) en `Footer` |
| Presencia de Navbar/Footer | **No** | Presentes solo en `/`, ausentes en las 5 rutas legales |

Estas son inconsistencias reales de producto, no identidad de marca intencional.

---

## 16. SYSTEM_STATE_AUDIT

| Estado | Observado en | Resultado |
|---|---|---|
| LOADING | Contact submit (`isSubmitting`) | ✅ Botón deshabilitado + texto cambia a "Sending..." |
| SUCCESS | Valuation, Contact (código) | ✅ Confirmación visual clara |
| ERROR | Contact (captcha) | ⚠️ Error técnico crudo expuesto al usuario final (F-02) |
| DISABLED | Contact SUBMIT antes de validar | ✅ Correcto, con affordance visual |
| EMPTY | No aplica (no hay listados dinámicos vacíos) | N/A |
| Cookie modal | FloatingControls → CookieBanner | ✅ Abre/cierra correctamente desde home |
| Cambio de idioma | Selector "Global preferences" | ✅ Transición sin parpadeo, con `data-lang-switching` como guard |
| Cambio de ruta | React Router | ⚠️ Ruta desconocida = pantalla en blanco sin feedback (F-09) |

---

## 17. FLOW_SIMPLIFICATION

**J3 (Contacto) — no es un problema de "demasiados pasos", es un bloqueo funcional.** No se recomienda simplificar pasos; se recomienda **reparar la integración de reCAPTCHA** (ver F-02) antes de considerar cualquier cambio de flujo. Una vez reparado, el flujo actual (7 campos + 2 checkboxes + captcha) es razonable para un lead de alto valor y no requiere reducción de pasos.

**J1 (Propiedades)** no es un problema de "flujo largo" sino de **flujo inexistente** más allá de la home — la simplificación aquí es estructural (§27), no de reducción de pasos.

---

## 18. ACCESSIBILITY_SUMMARY

Skill compuesto: `accessibility-audit` — **COMPLETED** (aplicado manualmente sobre evidencia de código + navegador; no se invocó como proceso AOS independiente, ver §42).

- Encabezados (`h1`-`h4`) bien jerarquizados y semánticos en todas las secciones capturadas (confirmado en snapshot de accesibilidad de `agent-browser`, que expone el árbol de accesibilidad real).
- Botones con roles y nombres accesibles correctos ("FREE VALUATION", "SEARCH", combos con labels "Property Type"/"Location"/"Price Range").
- El campo Email del formulario de Contacto expone accesiblemente su placeholder como nombre ("Example: you@email.com") en lugar de un `aria-label`/`<label>` propio — un usuario de lector de pantalla no obtiene un nombre de campo limpio tipo "Email", sino el texto de ejemplo, lo cual es confuso una vez el campo tiene contenido real.
- **`prefers-reduced-motion` solo está implementado en `HeroSection.tsx`** (confirmado por grep de todo el repo). Las 3 secciones restantes con `pin:true, scrub` (Properties, Investment, Neighborhood) fuerzan scroll-hijacking en cualquier usuario, incluidos los que han solicitado movimiento reducido a nivel de sistema operativo — incumplimiento directo de `docs/standards/UI_MOTION_CONTRACT.md` (línea 32, obligatoriedad de respetar `prefers-reduced-motion`).
- Enlaces sociales (`SocialSidebar.tsx`) apuntan a `href="#"` — foco accesible sin destino real, mal patrón para lectores de pantalla y navegación por teclado.
- No se detectaron trampas de foco (`focus trap`) problemáticas en el panel de preferencias de idioma.

---

## 19. DESIGN_SYSTEM_SUMMARY

Skill compuesto: `design-system-consumer-check` — **COMPLETED** (manual, contra `docs/standards/ANCLORA_BRANDING_*` y `ANCLORA_ULTRA_PREMIUM_APP_CONTRACT.md`).

- Tokens de color observados en navegador (dorado ~#D4AF37/#C9A95F, fondo navy oscuro) son coherentes con `ANCLORA_BRANDING_COLOR_TOKENS.md`.
- Tipografía: display en Cardo (serif editorial), cuerpo en Inter — coherente con el contrato. No se pudo confirmar en navegador la ausencia total de DM Sans/Cormorant Garamond sin inspección de red de fuentes (fuera de alcance de esta pasada); se marca `NOT_RETESTED` para una verificación de red de `@font-face` en una futura auditoría técnica.
- `ThemeToggle.tsx` existe como componente pero no se renderiza en ninguna parte de la app (`INTENTIONAL_PRODUCT_IDENTITY` posible — decisión de mantener el producto solo en tema oscuro — pero es código muerto sin decisión documentada; se recomienda o eliminarlo o exponerlo, no dejarlo en limbo).
- El selector de moneda/unidades (`LanguageToggle.tsx`) es un control de apariencia de sistema de diseño que **no está conectado a ningún estado consumido** por `PropertiesSection` — un patrón de "control de dashboard que no hace nada", señalado explícitamente como antipatrón en `ANCLORA_ULTRA_PREMIUM_APP_CONTRACT.md`.

---

## 20. I18N_SUMMARY

Skill compuesto: `i18n-integrity-check` — **COMPLETED** (manual, sobre los 11 JSON de `src/i18n/locales/` + verificación en navegador ES/EN/DE).

- **11 locales activos confirmados** (ca, da, de, en, es, fr, it, nl, no, pt, sv) — coincide con lo declarado en el brief, pero **diverge del contrato de gobernanza**: `docs/standards/LOCALIZATION_CONTRACT.md` y `ANCLORA_ECOSYSTEM_CONTRACT_GROUPS.md` solo autorizan `es, en, de, fr` para este producto. Esto es una discrepancia contrato-vs-implementación que excede el alcance UX puro pero tiene impacto de confianza: **253 cadenas legales/de consentimiento en los 7 locales no contractuales permanecen marcadas `LEGAL_REVIEW_REQUIRED` sin evidencia de revisión legal posterior** (`reports/locale-copy/copy-quality-report.md`).
- Estructura de claves: 19 secciones de nivel superior, ~200 claves hoja por locale, **paridad de claves top-level confirmada entre es.json y en.json** (sin claves huérfanas o faltantes en ese par).
- **Fugas de idioma detectadas en vivo:** encabezado "Palma Old Town" (`NeighborhoodSection.tsx:107,141`) y "Read more" (`InsightsSection.tsx:135`) están hardcodeados en inglés fuera de `t()`, visibles en cualquier idioma activo. Confirmado visualmente en captura DE (`lang-de-about-after-switch.png` no cubre esa sección específica, pero el hallazgo está confirmado por código — `MEASURED_CODE`).
- **Expansión textual DE:** probada en vivo en desktop (1440×900) y mobile (390×844) sin overflow, recortes ni truncamiento — CTA "IMMOBILIENBEWERTUNG" (más largo que "FREE VALUATION") cabe en una línea en ambos tamaños.
- SV/PT/NL/DA/NO/IT/FR/CA: verificados solo por presencia en el selector de idioma y por paridad estructural de claves (conteo de secciones idéntico); **no se realizó smoke visual en vivo de cada uno** — `NOT_RETESTED` para overflow visual específico de estos 8 idiomas.

---

## 21. RESPONSIVE_SUMMARY

| Viewport | Cobertura | Resultado |
|---|---|---|
| 390×844 | Visual completo (hero, properties, footer) | ✅ Sin overflow, CTA legible, imagen hero cambia a variante más ligera |
| 430×932 | No capturado visualmente | `NOT_RETESTED` — inspección de breakpoints Tailwind sugiere comportamiento equivalente a 390×844 |
| 768×1024 | No capturado visualmente | `NOT_RETESTED` |
| 1024×768 | No capturado visualmente | `NOT_RETESTED` — es el breakpoint donde `PropertiesSection`/`InvestmentSection` desactivan el pin GSAP (`isMobileLayout`, `<=1024px` en código) — punto de transición de comportamiento de scroll que merece verificación visual dedicada en una siguiente pasada |
| 1366×768 | No capturado visualmente | `NOT_RETESTED` |
| 1440×900 | Visual completo, todas las secciones | ✅ Composición editorial sólida, sin solapamientos |
| 1728×1117 | No capturado visualmente | `NOT_RETESTED` |

**Nota metodológica importante:** en 1440×900, un salto de scroll instantáneo (`window.scrollTo` programático, sin eventos de rueda incrementales) puede dejar temporalmente secciones GSAP-pinned en estado de opacidad intermedia o con texto parcialmente fuera de viewport durante la transición — esto se observó en pruebas sintéticas de scroll instantáneo. **Sin embargo, la navegación real de usuario (clic en navbar, tecla `End`, scroll de rueda incremental) no reprodujo el problema** — se comportó de forma limpia en todos los casos probados. Se documenta como hallazgo de **fragilidad técnica de bajo riesgo** (F-12) más que como defecto de cara al usuario, dado que ningún patrón de interacción humana normal lo dispara.

---

## 22. LIGHT_DARK_SUMMARY

No se pudo evaluar el tema claro: `ThemeToggle.tsx` existe en código (`src/components/ThemeToggle.tsx`) y `ThemeContext.tsx` soporta claro/oscuro con detección de `prefers-color-scheme`, pero el componente de toggle **no está montado en ningún punto de la aplicación** (confirmado por grep). En la sesión de navegador real, el sitio se presentó siempre en tema oscuro. **Resultado: UNKNOWN para el tema claro** — no es posible confirmar en vivo si existe o si sería utilizable; se recomienda decisión explícita de producto (¿es intencionalmente solo-oscuro, o es un control huérfano pendiente de exponer?).

---

## 23. PREMIUM_PRODUCT_SURFACE_ASSESSMENT

Evaluado con evidencia `MEASURED_BROWSER` (17 capturas de pantalla reales) contra los principios 9A-9E del skill.

**PREMIUM:** Alto. Jerarquía tipográfica disciplinada (Cardo display + Inter cuerpo + acentos Fraunces en los subtítulos itálicos de Investment Philosophy), espaciado generoso, superficies restringidas (tarjetas con un único borde dorado fino, sin sombras excesivas ni glassmorphism), bajo ruido visual. El dorado se usa con moderación — como acento en CTA, líneas divisoras y números clave, no como relleno decorativo. Esto cumple el estándar "quiet luxury" pedido por el brief, no "más dorado/gradientes".

**MODERN:** Alto. Chrome global compacto (navbar de una sola fila, 70-90px), progressive disclosure correcto por scroll, controles contextuales agrupados en un panel único de "Global preferences" en lugar de 3 controles sueltos permanentes.

**ELEGANT:** Alto en las secciones estáticas (Philosophy, About, Investment cards); las secciones con scroll-pin (Properties, Investment hero-style, Neighborhood) son más arriesgadas — dependen de una coreografía de scroll precisa que, cuando se interrumpe (ver F-12), puede mostrar texto a medio animar. En interacción humana normal esto no ocurrió.

**Hallazgos que rompen la ilusión premium (bajan la nota, no la anulan):**
- El `alert()` nativo del navegador en el newsletter del footer es el contraste más fuerte con el resto del producto — un diálogo de sistema operativo genérico irrumpiendo en una experiencia editorial cuidada (F-06).
- El mensaje de error de reCAPTCHA "ERROR for site owner: Invalid site key" es lenguaje de depuración de desarrollador, no copy de producto — inaceptable en una superficie ultra-premium de cara a compradores de alto patrimonio (F-02).
- Enlaces sociales muertos (`href="#"`) en un widget lateral persistente y visible en cada sección.

**Veredicto:** el sistema visual está muy por encima de la media de una landing inmobiliaria genérica y cumple el estándar "obra de arte" pedido — pero 2-3 defectos funcionales muy visibles (captcha roto, alert nativo, enlaces muertos) contradicen esa promesa exactamente en los puntos donde el usuario más los nota: al intentar contactar o suscribirse.

---

## 24. APPLICATION_SHELL_ASSESSMENT (reinterpretado como PUBLIC_SITE_SHELL)

Este es un sitio editorial público, no una aplicación con shell persistente de trabajo — se aplica el criterio de "shell público" en vez de "shell de aplicación".

Clasificación de controles visibles en el navbar (1440×900):
- `GLOBAL_NAVIGATION`: PROPERTIES / ABOUT US / CONTACT (3 ítems, apropiado, sin sobrecarga)
- `PRIMARY_CONTENT_ACTION`: FREE VALUATION (dorado, siempre visible — correcto, es el CTA de mayor prioridad de negocio)
- `GLOBAL_PREFERENCE`: selector de idioma/moneda/unidades (agrupado en un único trigger "Global preferences" — buen patrón, evita 3 controles sueltos)
- `UTILITY`: MENU (hamburguesa, probablemente para navegación mobile/overlay — no explorado a fondo en esta pasada)

El shell es compacto (una sola fila, ~70-90px de alto) y **no compite con el contenido editorial** — cumple el principio 9C de dominancia del "workspace" (en este caso, el contenido editorial es el "workspace" primario). No se detectaron filas de navegación apiladas, ni controles duplicados entre header/contenido.

**Gap estructural real:** el shell (Navbar/Footer/FloatingControls/CookieBanner) **no se monta en absoluto en las 5 rutas legales** (`/legal/*`) — un visitante que aterriza directamente en `/legal/cookies` (por ejemplo, desde un enlace compartido o un motor de búsqueda) no tiene ninguna forma de volver a home, cambiar idioma, ni gestionar sus preferencias de cookies desde esa página (F-08). Esto es una laguna real del "site shell" fuera de la home.

---

## 25. VIEWPORT_ECONOMY

Medido en 1440×900 (`MEASURED_BROWSER`, capturas reales):

```text
VIEWPORT_HEIGHT: 900px
GLOBAL_CHROME_HEIGHT (navbar): ~70-90px (~8-10% del viewport)
PRIMARY_WORKSPACE (contenido editorial): comienza inmediatamente bajo el navbar, sin filas adicionales de controles
PERSISTENT_CONTROL_ROWS: 1 (navbar) — sin segunda fila de acciones/estado
PERSISTENT_ACTION_COUNT: 4 (FREE VALUATION, 3 nav links) + 1 preferences trigger
```

En 390×844 (mobile), el chrome persistente se reduce a: hamburguesa MENU + logo + selector de idioma — aún más compacto, dejando el ~92% restante del viewport a contenido. **No se observó relegación de contenido editorial por exceso de chrome en ningún viewport probado.**

Widgets flotantes persistentes (`FloatingControls`, `SocialSidebar`) ocupan posiciones fijas en las esquinas (inferior-izquierda: ayuda/cookies; inferior-derecha: contacto/scroll-top; lateral derecho: redes sociales) — todos son de tamaño reducido (~48-56px) y no compiten con el contenido central en ningún viewport probado.

---

## 26. VISUAL_DENSITY_MAP

| Sección | Densidad | Evaluación |
|---|---|---|
| Hero | Baja | Apropiada — impacto de marca, un solo bloque de búsqueda |
| Properties | Media | 3 tarjetas, buen respiro entre ellas |
| Philosophy | Media | 3 tarjetas de valor, con icono+título+párrafo, sin saturar |
| Investment | Media-baja | Bloque narrativo + 1 métrica destacada |
| Neighborhood | Baja | Foto grande + texto corto, muy editorial |
| Valuation | Media | Formulario de 4 campos, bien espaciado |
| Insights | Media | 3 tarjetas editoriales con imagen, título y kicker |
| About | Media | 1 bloque de texto + 3 tarjetas de capacidades |
| Contact | Alta (la más densa del sitio) | 7 campos + 2 checkboxes + captcha + bloque de contacto directo — densidad justificada por ser el formulario de mayor valor, pero es el punto de mayor carga cognitiva del sitio |
| Footer | Media-alta | Newsletter + enlaces legales + certificaciones + disclaimer institucional |

No se detectó ninguna sección con densidad "no estructurada" (ruido visual sin jerarquía) — la densidad más alta (Contact) está justificada por la naturaleza del formulario y sigue manteniendo agrupación clara en 2 columnas.

---

## 27. STRUCTURAL_REDESIGN_OPPORTUNITIES

1. **Capa real de descubrimiento de propiedades** (alta justificación de evidencia — F-01): introducir una ruta `/propiedades` (o `/listado`) con las propiedades reales del inventario, filtros funcionales conectados al buscador del Hero, y páginas de detalle por propiedad. Sin esto, la sección "Properties" seguirá siendo una vitrina, no un canal de descubrimiento, contradiciendo la pregunta central del brief ("¿descubre propiedades fácilmente?").
2. **Site shell mínimo en páginas legales** (F-08): montar al menos un header compacto con logo+enlace a home+selector de idioma en las 5 rutas `/legal/*`, sin necesidad de replicar el navbar completo de home.
3. **Página 404 real** (F-09): sustituir `<Route path="*" element={null} />` por un componente ligero con mensaje, CTA de vuelta a home y quizá enlace directo a Contact/Valuation.
4. **Conectar o retirar el selector de moneda/unidades** (F-03): si la intención de producto es soportar multi-moneda para compradores internacionales, conectar el estado a `PropertiesSection`; si no, retirar el control para no prometer una función inexistente.
5. **Consolidar el botón de reapertura de cookies**: usar el mismo patrón de modal (`FloatingControls`) tanto en Footer como en `/legal/*`, eliminando la variante de solo-enlace.

Estas son oportunidades de **Fase 3** (estructural) salvo la 3 y 5, que son de bajo esfuerzo y alto impacto (candidatas a Fase 1).

---

## 28. COMPOSED_SKILLS

| Skill | Estado | Nota |
|---|---|---|
| `repo-preflight` | NOT_APPLICABLE | Auditoría de solo lectura; no se realizaron escrituras en el repo objetivo que requirieran preflight de concurrencia |
| `aos-compliance-preflight` | UNAVAILABLE | No se invocó como proceso AOS independiente en este entorno; se aplicaron manualmente los contratos relevantes de `docs/standards/` |
| `accessibility-audit` | COMPLETED | Aplicado manualmente sobre árbol de accesibilidad real (`agent-browser snapshot`) + código — ver §18 |
| `visual-regression-check` | UNAVAILABLE | No existe baseline visual previo en el repo contra el cual comparar; se documentaron capturas actuales como nuevo baseline de referencia en `docs/audits/evidence/` |
| `design-system-consumer-check` | COMPLETED | Manual, contra `docs/standards/ANCLORA_BRANDING_*` — ver §19 |
| `i18n-integrity-check` | COMPLETED | Manual, sobre los 11 JSON + navegador ES/EN/DE — ver §20 |
| `change-impact-analysis` | NOT_APPLICABLE | No se propusieron ni aplicaron cambios de código en esta auditoría (solo lectura) |

---

## 29. FINDINGS (Finding Model v2)

### F-01 — Ausencia de capa de descubrimiento de propiedades (ruta/catálogo real)
```
CATEGORY: INFORMATION_ARCHITECTURE
JOURNEY: J1 — Descubrimiento de propiedades
SCREEN: Hero, Properties
USER_TYPE: FIRST_TIME_USER (comprador/inversor)
TASK_CRITICALITY: CORE
FRICTION_TYPE: NAVIGATION_FRICTION, DISCOVERABILITY_FRICTION
SEVERITY: CRITICAL
EVIDENCE_LEVEL: MEASURED_CODE + MEASURED_BROWSER
EVIDENCE: src/App.tsx:301-310 (tabla de rutas, solo "/" y 5 rutas legales); src/sections/PropertiesSection.tsx:9-40 (3 propiedades hardcodeadas); captura sec-properties-gradual-1440x900.png (botón "EXPLORE THE FULL PORTFOLIO" visible sin evidencia de destino navegable)
FREQUENCY: FRECUENTE (cada visitante que llega con intención de comprar)
CURRENT_BEHAVIOR: El usuario ve 3 propiedades de muestra y un CTA "Explore the full portfolio" que no tiene página de destino registrada en el router.
ROOT_UX_CAUSE: El producto se construyó como landing de marca/captación de leads, no como catálogo — la sección "Properties" comunica visualmente "hay más" sin que exista "más" navegable.
WHY_IT_MATTERS: Contradice la pregunta central del audit brief: "¿descubre propiedades fácilmente un comprador HNW?" — hoy la respuesta es no, más allá de 3 ejemplos.
USER_IMPACT: Un comprador con intención real de explorar inventario llega a un callejón sin salida tras la vitrina inicial, forzándolo a Contact/Valuation sin haber visto opciones reales.
RECOMMENDED_CHANGE: Introducir una ruta de catálogo (`/propiedades`) con filtro conectado al buscador del Hero y páginas de detalle por propiedad, o —si el catálogo real vive en otro sistema— enlazar "Explore the full portfolio" a esa fuente externa de forma explícita.
WHY_THIS_CHANGE: Cierra la brecha entre promesa de marca y funcionalidad real sin necesitar rediseñar el resto del sitio.
EXPECTED_BENEFIT: Habilita el journey CORE de descubrimiento, hoy inexistente.
EFFORT: HIGH
RISK: MEDIUM (requiere backend/CMS de propiedades o integración con fuente externa)
PRIORITY: P1
QUICK_WIN: false
DEPENDENCIES: Fuente de datos de propiedades (CMS, API o Anclora Data Lab mencionado en Investment Philosophy)
DO_NOT_BREAK: Coreografía visual actual de las 3 tarjetas de Properties (funciona bien como vitrina/teaser)
IMPLEMENTATION_GUIDANCE: No requiere código de implementación en esta auditoría (solo lectura); se recomienda decisión de producto previa sobre fuente de datos antes de cualquier desarrollo.
```

### F-02 — reCAPTCHA roto bloquea el envío del formulario de Contacto en producción
```
CATEGORY: ERROR_RECOVERY
JOURNEY: J3 — Contacto comercial
SCREEN: Contact
USER_TYPE: FIRST_TIME_USER, RETURNING_USER
TASK_CRITICALITY: CORE
FRICTION_TYPE: ERROR_RECOVERY_FRICTION, FEEDBACK_FRICTION
SEVERITY: CRITICAL
EVIDENCE_LEVEL: MEASURED_BROWSER
EVIDENCE: docs/audits/evidence/anclora-private-estates-2026-09-07/contact-form-validation.png — widget reCAPTCHA muestra "ERROR for site owner: Invalid site key" y el texto "Complete the verification before submitting."; botón SUBMIT permanece deshabilitado
FREQUENCY: FRECUENTE (afecta a todo intento de envío del formulario principal de contacto)
CURRENT_BEHAVIOR: El widget de verificación anti-spam renderiza un mensaje de error técnico de Google reCAPTCHA dirigido al propietario del sitio (site key inválida), visible para el usuario final, y bloquea el envío de forma permanente.
ROOT_UX_CAUSE: Configuración de `VITE_RECAPTCHA_SITE_KEY` inválida o ausente en el entorno de producción de Vercel para este dominio.
WHY_IT_MATTERS: Es el journey de conversión de mayor valor de negocio del sitio (captación de lead comprador) y está completamente inoperante hoy.
USER_IMPACT: Ningún comprador puede contactar a la empresa vía el formulario principal; solo quedan email/WhatsApp visibles en la misma sección como vía alternativa.
RECOMMENDED_CHANGE: Corregir la site key de reCAPTCHA en la configuración de entorno de Vercel para el dominio de producción, o desactivar temporalmente el gate de captcha (`VITE_CONTACT_CAPTCHA_PROVIDER=none`) hasta resolver la configuración, priorizando no bloquear leads reales.
WHY_THIS_CHANGE: Es un problema de configuración de entorno, no de UX de diseño — la solución es de bajo esfuerzo técnico y altísimo impacto.
EXPECTED_BENEFIT: Restaura el journey de conversión CORE de mayor valor del sitio.
EFFORT: LOW
RISK: LOW
PRIORITY: P1
QUICK_WIN: true
DEPENDENCIES: Acceso a variables de entorno de Vercel (`VITE_RECAPTCHA_SITE_KEY`) — fuera del alcance de solo-lectura de esta auditoría
DO_NOT_BREAK: El resto de la lógica de validación del formulario (deshabilitar SUBMIT hasta checkboxes+campos válidos) funciona correctamente y no debe tocarse
IMPLEMENTATION_GUIDANCE: Verificar en el dashboard de Vercel que `VITE_RECAPTCHA_SITE_KEY` (o equivalente) esté definida para el entorno de producción con una site key v2/v3 válida asociada al dominio `anclora-private-estates.vercel.app`; validar tras el fix con un envío de prueba real controlado.
```

### F-03 — Selector de moneda/unidades sin efecto funcional
```
CATEGORY: CONSISTENCY
JOURNEY: Preferencias globales
SCREEN: Panel "Global preferences" (navbar)
USER_TYPE: FIRST_TIME_USER internacional
TASK_CRITICALITY: OCCASIONAL
FRICTION_TYPE: CONSISTENCY_FRICTION, COGNITIVE_FRICTION
SEVERITY: HIGH
EVIDENCE_LEVEL: MEASURED_CODE + MEASURED_BROWSER
EVIDENCE: src/components/LanguageToggle.tsx:23-24,54,59 (escribe a localStorage `anclora-pe-currency`/`anclora-pe-unit`, sin lectores en el resto del código — confirmado por grep); captura lang-switcher-open.png muestra selector "CURRENCY: Euro - EUR €" mientras las tarjetas de propiedades en inglés muestran precios en £ (GBP), derivados solo de `i18n.language`, no del selector
FREQUENCY: OCASIONAL
CURRENT_BEHAVIOR: Cambiar moneda o unidades en el panel de preferencias no altera ningún precio o área mostrada en el sitio; los valores dependen únicamente del idioma activo.
ROOT_UX_CAUSE: El control de UI se implementó sin conexión al estado que efectivamente formatea los datos de propiedades.
WHY_IT_MATTERS: Un comprador que selecciona activamente "US dollar" esperando ver precios en USD no verá ningún cambio — rompe la confianza en el control y, por extensión, en la precisión de los datos mostrados.
USER_IMPACT: Confusión o desconfianza en compradores internacionales que dependen de la moneda mostrada para evaluar presupuesto.
RECOMMENDED_CHANGE: Conectar el estado de moneda/unidad seleccionado a `PropertiesSection` (y cualquier otro punto que muestre precios/áreas), o retirar temporalmente las opciones de moneda no soportadas dejando solo EUR/GBP (que sí tienen lógica real) hasta implementar el resto.
WHY_THIS_CHANGE: Un control visible debe reflejar siempre un efecto real; mostrar opciones sin efecto es peor que no mostrarlas.
EXPECTED_BENEFIT: Restaura la confianza en un control de cara al comprador internacional, o elimina una fuente de confusión.
EFFORT: MEDIUM
RISK: LOW
PRIORITY: P2
QUICK_WIN: false
DEPENDENCIES: Ninguna externa — cambio contenido en frontend
DO_NOT_BREAK: La conversión EUR→GBP ya funcional para el idioma inglés
IMPLEMENTATION_GUIDANCE: Elevar el estado de moneda/unidad del componente `LanguageToggle` a un contexto compartido (o reutilizar `ThemeContext`-like provider) que `PropertiesSection` consuma para el formateo, en lugar de derivarlo solo de `i18n.language`.
```

### F-04 — Formateo numérico no localizado en 9 de 11 idiomas activos
```
CATEGORY: CONTENT_UX
JOURNEY: J1 — Descubrimiento de propiedades
SCREEN: Properties
USER_TYPE: FIRST_TIME_USER (comprador no hispanohablante)
TASK_CRITICALITY: FRECUENTE
FRICTION_TYPE: CONTENT_FRICTION, CONSISTENCY_FRICTION
SEVERITY: MEDIUM
EVIDENCE_LEVEL: MEASURED_CODE
EVIDENCE: src/sections/PropertiesSection.tsx:52-89 — `numberLocale = isGerman ? 'de-DE' : isEnglish ? 'en-GB' : 'es-ES'`; sueco, portugués, italiano, francés, danés, neerlandés, noruego y catalán caen todos en formateo es-ES pese a tener UI 100% traducida a su idioma
FREQUENCY: FRECUENTE
CURRENT_BEHAVIOR: Un usuario en sueco o portugués ve separadores de miles/decimales con convención española, no la propia de su idioma.
ROOT_UX_CAUSE: La lógica de formateo solo contempla 3 ramas (de, en, resto=es) en vez de mapear cada locale activo a su `Intl.NumberFormat` correspondiente.
WHY_IT_MATTERS: Rompe la coherencia de una experiencia que, en todo lo demás, está completamente traducida a esos 9 idiomas.
USER_IMPACT: Fricción de lectura menor para 9 de 11 audiencias localizadas, más relevante en cifras de precio de alto valor.
RECOMMENDED_CHANGE: Generalizar el mapeo de `i18n.language` a `Intl.NumberFormat` para cubrir los 11 locales activos.
WHY_THIS_CHANGE: Solución mecánica de bajo riesgo, reutilizando la API `Intl` ya en uso.
EXPECTED_BENEFIT: Coherencia total idioma-formato en el 100% de los locales soportados.
EFFORT: LOW
RISK: LOW
PRIORITY: P2
QUICK_WIN: true
DEPENDENCIES: Ninguna
DO_NOT_BREAK: Formateo DE/EN ya correcto
IMPLEMENTATION_GUIDANCE: Sustituir la lógica ternaria por un mapa `locale → Intl locale tag` cubriendo los 11 idiomas de `src/i18n/locales/`.
```

### F-05 — Fugas de texto en inglés fuera del sistema i18n
```
CATEGORY: CONTENT_UX
JOURNEY: Global (toda sección con contenido afectado)
SCREEN: Neighborhood, Insights, FloatingControls
USER_TYPE: Todos los usuarios en idiomas ≠ inglés
TASK_CRITICALITY: FRECUENTE
FRICTION_TYPE: CONTENT_FRICTION, CONSISTENCY_FRICTION
SEVERITY: HIGH
EVIDENCE_LEVEL: MEASURED_CODE
EVIDENCE: src/sections/NeighborhoodSection.tsx:107,141 (encabezado "Palma<br/>Old Town" hardcodeado); src/sections/InsightsSection.tsx:135 ("Read more" hardcodeado); src/components/FloatingControls.tsx:54-59 (`contactLabelByLang` solo mapea es/en/de, cae a español 'CONTACTAR' para los 8 idiomas restantes)
FREQUENCY: FRECUENTE (visible en cada carga de página en 8-10 de 11 idiomas)
CURRENT_BEHAVIOR: Un usuario en francés, italiano, sueco, etc. ve "Palma Old Town" y "Read more" en inglés dentro de una página que, en todo lo demás, está en su idioma; y ve el botón flotante de contacto en español.
ROOT_UX_CAUSE: Strings escritos directamente en JSX en vez de pasar por `t()`.
WHY_IT_MATTERS: `LOCALIZATION_CONTRACT.md` prohíbe explícitamente mezclar idiomas en una misma vista; rompe la percepción de calidad "obra de arte" para el 70%+ de los locales soportados.
USER_IMPACT: Sensación de producto no terminado/no cuidado para la mayoría de las audiencias internacionales objetivo.
RECOMMENDED_CHANGE: Mover los 3 strings identificados a claves i18n existentes o nuevas, traducidas en los 11 locales.
WHY_THIS_CHANGE: Cambio mecánico, bajo riesgo, cierra una violación de contrato de marca explícita.
EXPECTED_BENEFIT: Coherencia de idioma al 100% en las secciones afectadas.
EFFORT: LOW
RISK: LOW
PRIORITY: P1
QUICK_WIN: true
DEPENDENCIES: Ninguna
DO_NOT_BREAK: Resto de contenido ya correctamente traducido en esas mismas secciones
IMPLEMENTATION_GUIDANCE: Añadir claves `neighborhood.oldTown.title`, `insights.readMore`, `floatingControls.contact` (o reutilizar equivalentes existentes) en los 11 JSON y sustituir los literales hardcodeados por `t(...)`.
```

### F-06 — `alert()` nativo del navegador en el formulario de newsletter del footer
```
CATEGORY: FEEDBACK
JOURNEY: Suscripción a newsletter
SCREEN: Footer
USER_TYPE: RETURNING_USER, FIRST_TIME_USER
TASK_CRITICALITY: OCCASIONAL
FRICTION_TYPE: VISUAL_FRICTION, AESTHETIC_COHERENCE_FRICTION
SEVERITY: MEDIUM
EVIDENCE_LEVEL: MEASURED_CODE
EVIDENCE: src/components/Footer.tsx:11-17 — `handleSubscribe` usa `alert(t('newsletter.success'))` sin validación de campos ni llamada de red real; siempre "tiene éxito" incluso con campos vacíos
FREQUENCY: OCASIONAL
CURRENT_BEHAVIOR: Al pulsar "SUBSCRIBE" aparece un diálogo nativo del sistema operativo/navegador, rompiendo por completo la experiencia visual editorial.
ROOT_UX_CAUSE: Implementación de marcador de posición (`alert()`) nunca reemplazada por un patrón de feedback in-page.
WHY_IT_MATTERS: Es el contraste más visible entre la calidad visual del resto del producto (§23) y un patrón de feedback de nivel "prototipo".
USER_IMPACT: Rompe la inmersión premium justo en el footer, el último punto de contacto de la sesión.
RECOMMENDED_CHANGE: Sustituir `alert()` por un mensaje de éxito/error in-page consistente con el patrón ya usado en Contact/Valuation (banner con icono, mismo lenguaje visual).
WHY_THIS_CHANGE: Reutiliza un patrón de feedback ya validado en el propio producto.
EXPECTED_BENEFIT: Elimina la única ruptura visual "no premium" detectada de forma consistente.
EFFORT: LOW
RISK: LOW
PRIORITY: P2
QUICK_WIN: true
DEPENDENCIES: Ninguna
DO_NOT_BREAK: Nada — el newsletter actualmente no valida ni envía datos reales, cualquier reemplazo mejora el estado actual
IMPLEMENTATION_GUIDANCE: Reutilizar el componente de banner de éxito/error visto en `ContactSection.tsx` para el bloque de newsletter del `Footer.tsx`.
```

### F-07 — Botón "reabrir cookies" del footer navega a una página en vez de reabrir el modal de consentimiento
```
CATEGORY: CONSISTENCY
JOURNEY: Gestión de preferencias de cookies
SCREEN: Footer
USER_TYPE: Todos
TASK_CRITICALITY: FRECUENTE (obligación legal de acceso a preferencias)
FRICTION_TYPE: PERMISSION_FRICTION, CONSISTENCY_FRICTION
SEVERITY: MEDIUM
EVIDENCE_LEVEL: MEASURED_CODE
EVIDENCE: src/components/Footer.tsx:161-163 — enlace `<Link to="/legal/cookies">`, no botón que reabra `CookieBanner`; contrastar con src/components/FloatingControls.tsx:64-77, que sí implementa la reapertura correcta del modal
FREQUENCY: FRECUENTE
CURRENT_BEHAVIOR: El enlace "COOKIES" del footer navega a la página legal de texto, no reabre el modal interactivo de preferencias.
ROOT_UX_CAUSE: Dos implementaciones distintas del mismo requisito conviven en el código (una correcta en `FloatingControls`, una incorrecta en `Footer`).
WHY_IT_MATTERS: `docs/standards/COOKIES_CONSENT_CONTRACT.md` §6 exige explícitamente que el footer permita reabrir las preferencias reales, y describe este patrón de solo-enlace como "implementación incorrecta".
USER_IMPACT: Un usuario que quiera cambiar su consentimiento desde el footer no puede hacerlo directamente; debe encontrar el widget flotante (que además no existe en `/legal/*`, ver F-08).
RECOMMENDED_CHANGE: Sustituir el `<Link>` del footer por un `<button>` que invoque el mismo manejador `onOpenCookieModal` usado por `FloatingControls`.
WHY_THIS_CHANGE: Reutiliza lógica ya existente y correcta, sin duplicar implementación.
EXPECTED_BENEFIT: Cumplimiento del contrato de cookies y consistencia de patrón en todo el sitio.
EFFORT: LOW
RISK: LOW
PRIORITY: P2
QUICK_WIN: true
DEPENDENCIES: Requiere que `Footer` tenga acceso al mismo estado/handler que `FloatingControls` (probablemente elevar el estado del modal a `App.tsx`, donde ya vive `cookieModalOpen`)
DO_NOT_BREAK: La página `/legal/cookies` sigue siendo válida como contenido informativo — no eliminar, solo dejar de usarla como único destino del botón del footer
IMPLEMENTATION_GUIDANCE: Pasar `onOpenCookieModal` como prop a `Footer` desde `HomePage` en `App.tsx`, igual que ya se hace con `FloatingControls`.
```

### F-08 — Páginas legales sin Navbar, Footer ni control de cookies
```
CATEGORY: NAVIGATION
JOURNEY: Consulta de páginas legales
SCREEN: /legal/privacidad, /legal/cookies, /legal/terminos, /legal/disclaimer, /legal/codigo-etico
USER_TYPE: Cualquier visitante que llegue directo a una URL legal (buscador, enlace compartido, footer)
TASK_CRITICALITY: OCCASIONAL pero legalmente relevante
FRICTION_TYPE: NAVIGATION_FRICTION, CONTEXT_SWITCH_FRICTION
SEVERITY: HIGH
EVIDENCE_LEVEL: MEASURED_CODE
EVIDENCE: src/App.tsx:291-293 — `<Route path="/" element={<Navbar />} /> <Route path="*" element={null} />`; `FloatingControls`/`CookieBanner`/`Footer` son hijos de `HomePage`, no se renderizan en ninguna ruta `/legal/*` (confirmado por grep sin coincidencias de esos componentes en `src/pages/legal/*.tsx`)
FREQUENCY: OCASIONAL
CURRENT_BEHAVIOR: Un visitante que aterriza directamente en cualquier página legal ve solo el contenido de esa página, sin cabecera de marca, sin navegación de vuelta a home, sin footer y sin botón para gestionar sus preferencias de cookies.
ROOT_UX_CAUSE: El enrutado condiciona el montaje del shell (`Navbar`) estrictamente a `path="/"`, y el resto del shell vive dentro de `HomePage`.
WHY_IT_MATTERS: Rompe la continuidad de marca y deja al usuario sin salida clara — especialmente grave en páginas legales, donde el usuario a menudo llega buscando precisamente gestionar sus derechos/preferencias.
USER_IMPACT: Callejón sin salida de navegación; único recurso es el botón "atrás" del navegador.
RECOMMENDED_CHANGE: Montar un header mínimo (logo enlazando a home + selector de idioma) y un footer básico (o el mismo `Footer`) en las rutas `/legal/*`.
WHY_THIS_CHANGE: Restaura continuidad de marca y navegación sin necesidad de duplicar todo el shell de home.
EXPECTED_BENEFIT: Elimina un callejón sin salida de navegación en 5 rutas reales del sitio.
EFFORT: MEDIUM
RISK: LOW
PRIORITY: P2
QUICK_WIN: false
DEPENDENCIES: Decisión de si el header legal debe ser idéntico al de home o una versión reducida
DO_NOT_BREAK: El contenido legal en sí mismo, ya traducido a los 11 locales
IMPLEMENTATION_GUIDANCE: Extraer un layout compartido (`LegalLayout`) que envuelva las 5 páginas con header/footer mínimo, en vez de condicionar `Navbar` estrictamente a `path="/"`.
```

### F-09 — Ruta desconocida renderiza pantalla en blanco sin ninguna señal
```
CATEGORY: ERROR_RECOVERY
JOURNEY: RECOVERY_JOURNEY (navegación accidental/enlace roto)
SCREEN: Cualquier URL no registrada
USER_TYPE: Todos
TASK_CRITICALITY: EDGE
FRICTION_TYPE: ERROR_RECOVERY_FRICTION
SEVERITY: MEDIUM
EVIDENCE_LEVEL: MEASURED_CODE
EVIDENCE: src/App.tsx:293 — `<Route path="*" element={null} />`
FREQUENCY: RARE
CURRENT_BEHAVIOR: Cualquier URL no reconocida (typo, enlace roto, URL antigua) renderiza una página completamente en blanco, sin navbar, sin mensaje, sin CTA de recuperación.
ROOT_UX_CAUSE: La ruta comodín devuelve explícitamente `null`.
WHY_IT_MATTERS: Es el peor estado de recuperación de error posible — el usuario no recibe ninguna señal de qué ha pasado ni cómo continuar.
USER_IMPACT: Abandono inmediato, percepción de sitio roto.
RECOMMENDED_CHANGE: Crear un componente `NotFoundPage` con mensaje claro, navegación de vuelta a home y, opcionalmente, accesos directos a Contact/Valuation.
WHY_THIS_CHANGE: Estándar mínimo de cualquier sitio en producción.
EXPECTED_BENEFIT: Convierte un callejón sin salida en una oportunidad de recuperación/conversión.
EFFORT: LOW
RISK: LOW
PRIORITY: P2
QUICK_WIN: true
DEPENDENCIES: Ninguna
DO_NOT_BREAK: N/A
IMPLEMENTATION_GUIDANCE: Sustituir `element={null}` por un componente ligero reutilizando el layout legal propuesto en F-08.
```

### F-10 — `ThemeToggle` construido pero no montado; ausencia de control manual de tema
```
CATEGORY: THEME
JOURNEY: Preferencias globales
SCREEN: Global
USER_TYPE: Todos
TASK_CRITICALITY: OCCASIONAL
FRICTION_TYPE: DISCOVERABILITY_FRICTION
SEVERITY: LOW
EVIDENCE_LEVEL: MEASURED_CODE
EVIDENCE: src/components/ThemeToggle.tsx (componente completo, no importado en ningún otro archivo — confirmado por grep); src/context/ThemeContext.tsx:14-27 (soporta claro/oscuro con detección de sistema)
FREQUENCY: OCASIONAL
CURRENT_BEHAVIOR: No existe ningún control visible para que el usuario cambie manualmente entre tema claro y oscuro; el tema depende solo de `localStorage`/preferencia de sistema.
ROOT_UX_CAUSE: Componente huérfano — construido pero nunca integrado en el árbol de la aplicación.
WHY_IT_MATTERS: Coincide con un hallazgo histórico ya documentado en `reports/global-preferences-toggle/visual-review.md` ("Theme Toggle está separado: no se renderiza en Ultra Premium") — **STILL_PRESENT**, no se ha resuelto desde esa revisión.
USER_IMPACT: Bajo — el tema oscuro observado es coherente y de alta calidad; el impacto es la falta de opción, no un defecto del tema en sí.
RECOMMENDED_CHANGE: Decisión de producto explícita: (a) integrar `ThemeToggle` en el panel de "Global preferences", o (b) documentar formalmente que el producto es intencionalmente solo-oscuro y eliminar el componente huérfano.
WHY_THIS_CHANGE: Evita código muerto sin dueño y cierra un hallazgo histórico abierto.
EXPECTED_BENEFIT: Claridad de intención de producto; opcionalmente, accesibilidad mejorada para usuarios que prefieren tema claro.
EFFORT: LOW (decisión) / MEDIUM (integración visual completa)
RISK: LOW
PRIORITY: P3
QUICK_WIN: false
DEPENDENCIES: Decisión de producto/marca
DO_NOT_BREAK: Tema oscuro actual, ya validado visualmente
IMPLEMENTATION_GUIDANCE: N/A sin decisión previa de producto.
```

### F-11 — `prefers-reduced-motion` solo cubierto en Hero; 3 secciones con scroll-hijacking sin gate
```
CATEGORY: ACCESSIBILITY
JOURNEY: Global (scroll por Properties/Investment/Neighborhood)
SCREEN: Properties, Investment, Neighborhood
USER_TYPE: Usuarios con sensibilidad al movimiento / `prefers-reduced-motion: reduce`
TASK_CRITICALITY: FRECUENTE
FRICTION_TYPE: ACCESSIBILITY, VISUAL_FRICTION
SEVERITY: MEDIUM
EVIDENCE_LEVEL: MEASURED_CODE
EVIDENCE: grep de todo el repo por `prefers-reduced-motion` — única coincidencia funcional en `src/sections/HeroSection.tsx:14-25,36`; `PropertiesSection.tsx:108-117`, `InvestmentSection.tsx:54-141`, `NeighborhoodSection.tsx:34-92` implementan `pin:true, scrub` sin ningún gate de reduced-motion (solo gate de `isMobileLayout <=1024px`)
FREQUENCY: FRECUENTE (cualquier usuario con la preferencia de sistema activada, en cualquier idioma)
CURRENT_BEHAVIOR: Un usuario con `prefers-reduced-motion: reduce` activado en su sistema operativo recibe scroll-hijacking completo (pin + scrub) en 3 de 4 secciones animadas, exactamente el tipo de movimiento que su preferencia pretende evitar.
ROOT_UX_CAUSE: El gate de reduced-motion se implementó puntualmente en Hero pero no se generalizó al resto de secciones con la misma librería de animación.
WHY_IT_MATTERS: `docs/standards/UI_MOTION_CONTRACT.md` (línea 32) exige respetar `prefers-reduced-motion` como obligación, no como mejora opcional.
USER_IMPACT: Usuarios con mareo por movimiento, migraña vestibular u otras sensibilidades pueden experimentar molestia real navegando el sitio.
RECOMMENDED_CHANGE: Extender el mismo patrón de `isLowPerformanceMode`/gate de `HeroSection` a `PropertiesSection`, `InvestmentSection` y `NeighborhoodSection`, desactivando `pin`/`scrub` (sustituyendo por fade-in simple, como ya hace `PhilosophySection`) cuando la preferencia esté activa.
WHY_THIS_CHANGE: Reutiliza un patrón ya implementado y probado en el propio código base.
EXPECTED_BENEFIT: Cumplimiento total del contrato de movimiento y mejora real de accesibilidad para una porción no trivial de usuarios.
EFFORT: MEDIUM
RISK: LOW
PRIORITY: P2
QUICK_WIN: false
DEPENDENCIES: Ninguna
DO_NOT_BREAK: Coreografía de scroll actual para usuarios sin la preferencia activada
IMPLEMENTATION_GUIDANCE: Extraer el hook de detección de `isLowPerformanceMode` de `HeroSection` a un hook compartido (`useReducedMotion`) y consumirlo en las 3 secciones restantes con pin/scrub.
```

### F-12 — Fragilidad de secciones GSAP-pinned ante saltos de scroll instantáneos no producidos por interacción humana normal
```
CATEGORY: LAYOUT_EFFICIENCY
JOURNEY: Navegación general
SCREEN: Properties, Investment, Neighborhood
USER_TYPE: Todos (solo bajo patrones de scroll sintético/no humano)
TASK_CRITICALITY: EDGE
FRICTION_TYPE: VISUAL_FRICTION
SEVERITY: LOW
EVIDENCE_LEVEL: MEASURED_BROWSER
EVIDENCE: capturas sec-properties-1440x900.png / sec-invest-1440x900.png / sec-neighborhood-1440x900.png (contenido con opacidad ~0 tras `window.scrollTo` instantáneo vía CDP) vs. sec-properties-gradual-1440x900.png / nav-click-about-jump.png / keyboard-end-key.png (contenido correcto tras scroll incremental, clic de navegación real o tecla `End`)
FREQUENCY: RARE (solo reproducido con saltos de scroll programáticos instantáneos, no con rueda de ratón, clic de navbar, ni teclado)
CURRENT_BEHAVIOR: Un salto de posición de scroll totalmente instantáneo puede dejar temporalmente el contenido de secciones pinned en un estado de opacidad intermedia hasta que ScrollTrigger recalcula.
ROOT_UX_CAUSE: El scrub de GSAP ScrollTrigger depende de eventos de scroll incrementales para actualizar el progreso de la animación; un salto de posición sin eventos intermedios puede dejar el timeline en un frame no resuelto hasta el siguiente evento de scroll.
WHY_IT_MATTERS: Aunque no se reprodujo con ningún patrón de interacción humana real probado (rueda, clic, teclado), sí podría manifestarse con tecnología de asistencia que salte directamente a un encabezado (algunos lectores de pantalla) o con extensiones de "scroll to anchor".
USER_IMPACT: Bajo en el uso típico; potencialmente medio para usuarios de tecnología de asistencia con navegación por encabezados.
RECOMMENDED_CHANGE: Añadir un `ScrollTrigger.refresh()` o recalculo forzado tras cualquier salto de scroll programático conocido en la aplicación (p. ej. si se añade en el futuro navegación por ancla directa).
WHY_THIS_CHANGE: Previene un problema hoy latente pero no observado en interacción real.
EXPECTED_BENEFIT: Robustece el sitio ante futuros patrones de navegación (anclas, deep-linking) que hoy no existen pero podrían añadirse.
EFFORT: LOW
RISK: LOW
PRIORITY: P4
QUICK_WIN: false
DEPENDENCIES: Ninguna
DO_NOT_BREAK: Comportamiento actual, ya correcto, de clic-navbar y teclado
IMPLEMENTATION_GUIDANCE: N/A — hallazgo preventivo, no requiere acción inmediata.
```

### F-13 — Contenido bajo el Hero solo se monta en el DOM tras un gesto de usuario
```
CATEGORY: DISCOVERABILITY
JOURNEY: Global / SEO
SCREEN: Toda la home excepto Hero
USER_TYPE: Crawlers/SEO, usuarios con JavaScript deshabilitado
TASK_CRITICALITY: FRECUENTE (indexación) / RARE (JS deshabilitado)
FRICTION_TYPE: DISCOVERABILITY_FRICTION
SEVERITY: LOW
EVIDENCE_LEVEL: MEASURED_CODE + MEASURED_BROWSER
EVIDENCE: src/App.tsx (listener one-shot sobre `scroll`/`touchstart`/`pointerdown`/`keydown`/evento custom `anclora:reveal-deferred-sections` que activa `showDeferredSections`); confirmado en navegador: `document.querySelectorAll('main section[id]')` devuelve solo `#hero` hasta que se dispara el evento
FREQUENCY: FRECUENTE para crawlers que no ejecutan interacción sintética
CURRENT_BEHAVIOR: Un usuario o bot que carga la página sin generar scroll/touch/pointer/keydown solo tiene en el DOM la sección Hero; el resto del contenido (Properties, Investment, Valuation, Contact, etc.) no existe hasta la primera interacción.
ROOT_UX_CAUSE: Optimización de rendimiento de carga inicial (diferir montaje de secciones pesadas) implementada como gate de interacción en vez de gate de tiempo/IntersectionObserver.
WHY_IT_MATTERS: Motores de búsqueda que no simulan interacción de usuario podrían indexar solo el Hero, perdiendo todo el contenido editorial/SEO de las 8 secciones restantes.
USER_IMPACT: Bajo para usuarios humanos (cualquier gesto normal lo dispara); potencialmente alto para SEO/indexación.
RECOMMENDED_CHANGE: Evaluar sustituir el gate de interacción por un `IntersectionObserver` sobre un centinela cercano al final del Hero, combinado con un timeout corto de respaldo, preservando el beneficio de rendimiento sin depender exclusivamente de interacción.
WHY_THIS_CHANGE: Mantiene el ahorro de carga inicial sin sacrificar indexación.
EXPECTED_BENEFIT: Mejor cobertura de indexación SEO sin penalizar tiempo de carga inicial.
EFFORT: LOW
RISK: LOW
PRIORITY: P3
QUICK_WIN: true
DEPENDENCIES: Ninguna
DO_NOT_BREAK: El beneficio de rendimiento de carga inicial que motivó este patrón
IMPLEMENTATION_GUIDANCE: Añadir un `IntersectionObserver` sobre un elemento centinela al final del Hero como disparador adicional a los ya existentes, sin eliminar los listeners de interacción actuales.
```

### F-14 — Enlaces sociales muertos (`href="#"`)
```
CATEGORY: CONTENT_UX
JOURNEY: Global
SCREEN: SocialSidebar (persistente en toda la home)
USER_TYPE: Todos
TASK_CRITICALITY: RARE
FRICTION_TYPE: CONTENT_FRICTION
SEVERITY: LOW
EVIDENCE_LEVEL: MEASURED_CODE
EVIDENCE: src/components/SocialSidebar.tsx:8-11 — los 4 enlaces (Facebook, Instagram, YouTube, LinkedIn) apuntan a `href: '#'`
FREQUENCY: RARE
CURRENT_BEHAVIOR: Clicar cualquier icono social no lleva a ningún perfil real.
ROOT_UX_CAUSE: Marcadores de posición nunca reemplazados por URLs reales.
WHY_IT_MATTERS: En un producto que se presenta como ultra-premium e institucional, enlaces muertos erosionan la credibilidad de marca ante un comprador que los prueba.
USER_IMPACT: Bajo, pero directamente visible para cualquiera que interactúe con el widget lateral persistente.
RECOMMENDED_CHANGE: Sustituir por URLs reales de los perfiles sociales de Anclora, o retirar el widget hasta tenerlas.
WHY_THIS_CHANGE: Cambio trivial de bajo riesgo.
EXPECTED_BENEFIT: Elimina un detalle de credibilidad negativo en un widget persistente.
EFFORT: LOW
RISK: LOW
PRIORITY: P3
QUICK_WIN: true
DEPENDENCIES: URLs reales de los perfiles sociales (dato de negocio, no técnico)
DO_NOT_BREAK: Posicionamiento y estilo visual actual del widget
IMPLEMENTATION_GUIDANCE: Actualizar el array `href` en `SocialSidebar.tsx` con las URLs reales cuando estén disponibles.
```

---

## 30. QUICK_WINS

| ID | Título | Esfuerzo | Riesgo |
|---|---|---|---|
| F-02 | Corregir site key de reCAPTCHA en producción | LOW | LOW |
| F-05 | Traducir los 3 strings hardcodeados en inglés | LOW | LOW |
| F-06 | Reemplazar `alert()` del newsletter por banner in-page | LOW | LOW |
| F-07 | Botón de cookies del footer reabre modal en vez de navegar | LOW | LOW |
| F-09 | Página 404 mínima | LOW | LOW |
| F-04 | Generalizar `Intl.NumberFormat` a los 11 locales | LOW | LOW |
| F-13 | `IntersectionObserver` como disparador adicional de secciones diferidas | LOW | LOW |
| F-14 | URLs reales en enlaces sociales | LOW | LOW |

---

## 31. TOP_RECOMMENDATIONS

1. **TITLE:** Reparar reCAPTCHA en producción (F-02) — **JOURNEY:** Contacto comercial — **USER_TYPE:** comprador HNW — **IMPACT:** Alto (journey de conversión principal inoperante) — **EFFORT:** Low — **RISK:** Low — **EVIDENCE_LEVEL:** MEASURED_BROWSER — **WHY:** El formulario de mayor valor de negocio del sitio está roto hoy en producción, con un error de depuración visible al usuario final. — **RECOMMENDED_CHANGE:** Corregir `VITE_RECAPTCHA_SITE_KEY` en Vercel. — **DO_NOT_BREAK:** Validación de campos ya correcta.

2. **TITLE:** Construir capa real de descubrimiento de propiedades (F-01) — **JOURNEY:** Descubrimiento de propiedades — **USER_TYPE:** comprador/inversor — **IMPACT:** Alto (journey CORE incompleto) — **EFFORT:** High — **RISK:** Medium — **EVIDENCE_LEVEL:** MEASURED_CODE — **WHY:** Sin catálogo navegable, la promesa central del producto ("descubre propiedades fácilmente") no se cumple más allá de 3 ejemplos. — **RECOMMENDED_CHANGE:** Ruta `/propiedades` con filtro y detalle. — **DO_NOT_BREAK:** Vitrina actual de 3 tarjetas como teaser de home.

3. **TITLE:** Eliminar fugas de idioma en inglés (F-05) — **JOURNEY:** Global — **USER_TYPE:** usuarios no angloparlantes — **IMPACT:** Alto (visible en 8-10 de 11 idiomas) — **EFFORT:** Low — **RISK:** Low — **EVIDENCE_LEVEL:** MEASURED_CODE — **WHY:** Viola el contrato de localización de forma directa y visible. — **RECOMMENDED_CHANGE:** Mover 3 strings a i18n. — **DO_NOT_BREAK:** Resto de traducciones ya correctas.

4. **TITLE:** Reemplazar `alert()` nativo del newsletter (F-06) — **JOURNEY:** Newsletter — **USER_TYPE:** todos — **IMPACT:** Medio (rompe percepción premium) — **EFFORT:** Low — **RISK:** Low — **EVIDENCE_LEVEL:** MEASURED_CODE — **WHY:** Es el único punto donde el producto se siente claramente "sin terminar". — **RECOMMENDED_CHANGE:** Banner in-page reutilizando patrón de Contact. — **DO_NOT_BREAK:** N/A.

5. **TITLE:** Corregir botón de cookies del footer (F-07) — **JOURNEY:** Gestión de consentimiento — **USER_TYPE:** todos — **IMPACT:** Medio (cumplimiento legal) — **EFFORT:** Low — **RISK:** Low — **EVIDENCE_LEVEL:** MEASURED_CODE — **WHY:** Viola `COOKIES_CONSENT_CONTRACT.md` §6 de forma explícita. — **RECOMMENDED_CHANGE:** Reutilizar handler de `FloatingControls`. — **DO_NOT_BREAK:** Página `/legal/cookies` como contenido informativo.

6. **TITLE:** Extender `prefers-reduced-motion` a las 3 secciones pinned restantes (F-11) — **JOURNEY:** Scroll global — **USER_TYPE:** usuarios sensibles al movimiento — **IMPACT:** Medio (accesibilidad) — **EFFORT:** Medium — **RISK:** Low — **EVIDENCE_LEVEL:** MEASURED_CODE — **WHY:** Incumplimiento directo de `UI_MOTION_CONTRACT.md`. — **RECOMMENDED_CHANGE:** Extraer hook compartido de Hero. — **DO_NOT_BREAK:** Coreografía actual sin la preferencia activa.

7. **TITLE:** Site shell mínimo en páginas legales (F-08) — **JOURNEY:** Consulta legal — **USER_TYPE:** cualquier visitante directo — **IMPACT:** Medio — **EFFORT:** Medium — **RISK:** Low — **EVIDENCE_LEVEL:** MEASURED_CODE — **WHY:** Callejón sin salida de navegación en 5 rutas reales. — **RECOMMENDED_CHANGE:** `LegalLayout` compartido. — **DO_NOT_BREAK:** Contenido legal ya traducido.

8. **TITLE:** Conectar o retirar selector de moneda/unidades (F-03) — **JOURNEY:** Preferencias globales — **USER_TYPE:** comprador internacional — **IMPACT:** Medio — **EFFORT:** Medium — **RISK:** Low — **EVIDENCE_LEVEL:** MEASURED_CODE — **WHY:** Control visible sin efecto real erosiona confianza. — **RECOMMENDED_CHANGE:** Elevar estado a contexto compartido. — **DO_NOT_BREAK:** Conversión EUR/GBP ya funcional.

9. **TITLE:** Página 404 real (F-09) — **JOURNEY:** Recuperación de error — **USER_TYPE:** todos — **IMPACT:** Bajo-Medio — **EFFORT:** Low — **RISK:** Low — **EVIDENCE_LEVEL:** MEASURED_CODE — **WHY:** Peor estado de recuperación posible (pantalla en blanco). — **RECOMMENDED_CHANGE:** Componente `NotFoundPage`. — **DO_NOT_BREAK:** N/A.

10. **TITLE:** Generalizar formateo numérico localizado (F-04) — **JOURNEY:** Descubrimiento de propiedades — **USER_TYPE:** 9 de 11 audiencias localizadas — **IMPACT:** Bajo-Medio — **EFFORT:** Low — **RISK:** Low — **EVIDENCE_LEVEL:** MEASURED_CODE — **WHY:** Inconsistencia entre UI 100% traducida y formato numérico es-ES. — **RECOMMENDED_CHANGE:** Mapa completo de 11 locales a `Intl.NumberFormat`. — **DO_NOT_BREAK:** Formateo DE/EN ya correcto.

---

## 32. IMPLEMENTATION_READY_RECOMMENDATIONS (P1/P2)

### F-02 — Reparar reCAPTCHA
```
AFFECTED_SCREENS: Contact
AFFECTED_COMPONENTS: src/sections/ContactSection.tsx (consumidor), configuración de entorno de Vercel
BEHAVIOR_BEFORE: Widget de verificación muestra "ERROR for site owner: Invalid site key"; SUBMIT permanece deshabilitado indefinidamente
BEHAVIOR_AFTER: Widget de reCAPTCHA carga correctamente; SUBMIT se habilita tras completar verificación + campos válidos
ACCEPTANCE_CRITERIA:
  Given un usuario con conexión a internet normal
  When abre el formulario de Contact y completa todos los campos obligatorios + checkbox de privacidad
  Then el widget de verificación anti-spam carga sin errores visibles
  And el botón SUBMIT se habilita
  And un envío de prueba controlado genera una respuesta de éxito o error de negocio (no un error de configuración)
UX_REGRESSION_RISKS: Ninguno esperado — es una corrección de configuración, no de lógica de UI
DO_NOT_BREAK: Lógica de habilitación/deshabilitación de SUBMIT ya correcta; preservación de datos del formulario tras error
```

### F-01 — Capa de descubrimiento de propiedades
```
AFFECTED_SCREENS: Hero (buscador), Properties, nueva pantalla de catálogo/detalle
AFFECTED_COMPONENTS: src/App.tsx (router), src/sections/HeroSection.tsx, src/sections/PropertiesSection.tsx, nuevos componentes de catálogo/detalle
BEHAVIOR_BEFORE: Buscador y "Explore the full portfolio" sin destino navegable; solo 3 propiedades visibles en todo el sitio
BEHAVIOR_AFTER: Buscador filtra un catálogo real; "Explore the full portfolio" navega a una vista de listado; cada tarjeta enlaza a una ficha de detalle
ACCEPTANCE_CRITERIA:
  Given un usuario configura tipo/ubicación/precio en el buscador del Hero
  When pulsa SEARCH
  Then navega a una vista de resultados filtrados por esos criterios
  Given un usuario en la vista de listado
  When hace clic en una propiedad
  Then accede a una ficha de detalle con la información completa de esa propiedad
UX_REGRESSION_RISKS: Requiere fuente de datos real; riesgo de inconsistencia visual si el nuevo catálogo no respeta el lenguaje visual editorial ya validado en home
DO_NOT_BREAK: Composición visual de las 3 tarjetas teaser en home; identidad tipográfica/gold-navy en las nuevas pantallas
```

### F-05 — Fugas de idioma
```
AFFECTED_SCREENS: Neighborhood, Insights, widget flotante de contacto
AFFECTED_COMPONENTS: src/sections/NeighborhoodSection.tsx, src/sections/InsightsSection.tsx, src/components/FloatingControls.tsx, los 11 archivos de src/i18n/locales/
BEHAVIOR_BEFORE: "Palma Old Town", "Read more" y el label de contacto flotante ('CONTACTAR') se muestran en inglés/español fijo en cualquier idioma activo
BEHAVIOR_AFTER: Los 3 elementos se traducen correctamente según `i18n.language` en los 11 locales
ACCEPTANCE_CRITERIA:
  Given un usuario con idioma activo = sueco (u otro de los 11 locales)
  When navega a Neighborhood e Insights
  Then todo el texto visible está en sueco, sin fragmentos en inglés
  And el botón flotante de contacto muestra el label sueco correspondiente, no 'CONTACTAR'
UX_REGRESSION_RISKS: Ninguno esperado — cambio mecánico de contenido
DO_NOT_BREAK: Resto de contenido ya correctamente traducido en esas secciones
```

### F-06 — Reemplazar `alert()` del newsletter
```
AFFECTED_SCREENS: Footer
AFFECTED_COMPONENTS: src/components/Footer.tsx
BEHAVIOR_BEFORE: `alert()` nativo del navegador tras pulsar SUBSCRIBE, sin validación de campos
BEHAVIOR_AFTER: Banner de éxito/error in-page consistente con Contact/Valuation, con validación mínima de campos
ACCEPTANCE_CRITERIA:
  Given un usuario rellena email en el bloque de newsletter
  When pulsa SUBSCRIBE
  Then ve un mensaje de confirmación in-page (no un diálogo del sistema operativo)
  Given el campo email está vacío o mal formado
  When pulsa SUBSCRIBE
  Then ve un mensaje de error in-page, sin llegar a "éxito" falso
UX_REGRESSION_RISKS: Ninguno esperado
DO_NOT_BREAK: N/A
```

### F-07 — Botón de cookies del footer
```
AFFECTED_SCREENS: Footer (y por extensión cualquier página donde se monte)
AFFECTED_COMPONENTS: src/components/Footer.tsx, src/App.tsx (elevar handler de modal)
BEHAVIOR_BEFORE: Enlace "COOKIES" navega a /legal/cookies
BEHAVIOR_AFTER: Botón "COOKIES" reabre el modal de preferencias de consentimiento (mismo comportamiento que FloatingControls)
ACCEPTANCE_CRITERIA:
  Given un usuario en cualquier punto de scroll de home
  When pulsa "COOKIES" en el footer
  Then se abre el modal de preferencias de cookies sin cambiar de ruta
UX_REGRESSION_RISKS: Ninguno esperado
DO_NOT_BREAK: Página /legal/cookies sigue accesible como contenido informativo desde otros puntos si se desea mantener enlazada
```

### F-11 — Extender reduced-motion
```
AFFECTED_SCREENS: Properties, Investment, Neighborhood
AFFECTED_COMPONENTS: src/sections/PropertiesSection.tsx, src/sections/InvestmentSection.tsx, src/sections/NeighborhoodSection.tsx, nuevo hook compartido (basado en la lógica actual de src/sections/HeroSection.tsx:14-25)
BEHAVIOR_BEFORE: Pin+scrub GSAP se ejecuta siempre en desktop, independientemente de `prefers-reduced-motion`
BEHAVIOR_AFTER: Con `prefers-reduced-motion: reduce` activo, las 3 secciones usan una transición simple de fade-in (como PhilosophySection), sin pin ni scroll-hijacking
ACCEPTANCE_CRITERIA:
  Given un usuario con `prefers-reduced-motion: reduce` activado en su sistema
  When navega por Properties, Investment y Neighborhood
  Then no experimenta scroll-hijacking (pin) en ninguna de las 3 secciones
  And el contenido de cada sección sigue siendo completamente legible y accesible
UX_REGRESSION_RISKS: Debe verificarse visualmente que el fallback fade-in no rompe la composición de layout de cada sección (especialmente el bloque de imagen a ancho completo en Neighborhood)
DO_NOT_BREAK: Coreografía pin/scrub actual para usuarios sin la preferencia activada; comportamiento ya correcto de HeroSection
```

### F-08 — Site shell mínimo en páginas legales
```
AFFECTED_SCREENS: /legal/privacidad, /legal/cookies, /legal/terminos, /legal/disclaimer, /legal/codigo-etico
AFFECTED_COMPONENTS: src/App.tsx (routing), nuevo componente LegalLayout, src/pages/legal/*.tsx
BEHAVIOR_BEFORE: Rutas legales renderizan sin Navbar/Footer/control de cookies
BEHAVIOR_AFTER: Rutas legales incluyen header mínimo (logo→home, selector de idioma) y footer/control de cookies accesible
ACCEPTANCE_CRITERIA:
  Given un usuario llega directamente a /legal/cookies vía URL externa
  When la página carga
  Then puede volver a home con un clic
  And puede cambiar de idioma
  And puede abrir el modal de preferencias de cookies
UX_REGRESSION_RISKS: Verificar que el header reducido no introduce inconsistencia visual severa con el header completo de home
DO_NOT_BREAK: Contenido legal ya traducido a 11 locales; layout de texto legal actual
```

---

## 33. RECOMMENDED_ROADMAP

### Fase 1 — Quick Wins (bajo esfuerzo, bajo riesgo, alto apalancamiento)
- F-02 Reparar reCAPTCHA en producción **(máxima prioridad, bloqueante de negocio)**
- F-05 Traducir strings hardcodeados en inglés
- F-06 Reemplazar `alert()` del newsletter
- F-07 Corregir botón de cookies del footer
- F-09 Página 404 mínima
- F-04 Generalizar formateo numérico a 11 locales
- F-14 URLs reales en enlaces sociales
- F-13 `IntersectionObserver` como disparador adicional

### Fase 2 — Alto Impacto (journey, navegación, feedback)
- F-03 Conectar o retirar selector de moneda/unidades
- F-08 Site shell mínimo en páginas legales
- F-11 Extender `prefers-reduced-motion` a secciones pinned restantes
- F-10 Decisión de producto sobre `ThemeToggle`

### Fase 3 — UX Estructural
- F-01 Capa real de descubrimiento de propiedades (catálogo + detalle + filtro conectado)
- Resolución de la discrepancia de contrato de localización (11 locales activos vs. 4 contractuales) y cierre de las 253 cadenas legales pendientes de revisión — trabajo de gobernanza/legal, no solo de ingeniería

---

## 34. DO_NOT_BREAK_SUMMARY

- Restauración exacta de posición de scroll y sección activa al cambiar idioma (`App.tsx`), incluso en secciones GSAP-pinned.
- Navegación por clic en navbar (lógica propia, no anclas nativas) — precisa y fluida.
- Navegación nativa por teclado (`End`/scroll) — funciona correctamente hoy.
- Patrón disabled-hasta-válido del botón SUBMIT en Contact.
- Preservación de datos del formulario de Contact tras un error de envío.
- Conversión EUR→GBP ya funcional para el locale inglés en `PropertiesSection`.
- `prefers-reduced-motion` en Hero, incluida la imagen de fondo alternativa más ligera.
- Identidad visual gold/navy y tipografía Cardo/Inter/Fraunces — validada como fuerte y coherente en todas las secciones capturadas.
- Contenido legal ya traducido a los 11 locales activos.
- Composición de las 3 tarjetas teaser de Properties como vitrina de home.

---

## 35. EVIDENCE_COVERAGE

```text
BROWSER_AVAILABLE: true (agent-browser, Chrome/CDP, sesión real contra producción)
AUTHENTICATED_FLOWS_COVERED: N/A (producto sin autenticación)
PUBLIC_FLOWS_COVERED: true — Hero, Properties, Philosophy, Investment, Neighborhood, Valuation, Insights, About, Contact, Footer, panel de preferencias, cambio de idioma ES/EN/DE, navegación por teclado y por clic
REPO_CONTEXT_AVAILABLE: true — inspección completa de src/, docs/standards/, reports/, tests/
CODE_PATHS_INSPECTED: App.tsx, todas las secciones (Hero/Properties/Philosophy/Investment/Neighborhood/Valuation/Insights/About/Contact), Navbar/Footer/LanguageToggle/CookieBanner/FloatingControls/GlobalPreferencesTrigger/ThemeToggle/SocialSidebar, ThemeContext, i18n/index.ts, los 11 JSON de locales, páginas legales (routing), .env.example
DESKTOP_COVERED: true (1440×900, visual completo)
TABLET_COVERED: false (768×1024, 1024×768 no capturados visualmente — NOT_RETESTED)
MOBILE_PORTRAIT_COVERED: true (390×844, visual completo en hero/properties/footer, DE)
MOBILE_LANDSCAPE_COVERED: false (430×932 no capturado visualmente — NOT_RETESTED)
LIGHT_THEME_COVERED: false — UNKNOWN, ThemeToggle no montado en producción
DARK_THEME_COVERED: true — único tema observable en producción
ACCESSIBILITY_COMPOSED: true (manual, sobre árbol de accesibilidad real + código)
I18N_COMPOSED: true (manual, sobre 11 JSON + navegador ES/EN/DE, smoke estructural del resto)
DESIGN_SYSTEM_COMPOSED: true (manual, contra contratos de marca del repo)
VISUAL_REGRESSION_COMPOSED: false — sin baseline visual previo en el repo
```

**MEASURED_BROWSER confirmado:** sí — 31 capturas de pantalla reales contra producción, con interacciones reales (clic, teclado, formularios, selector de idioma, redimensionado de viewport), guardadas en `docs/audits/evidence/anclora-private-estates-2026-09-07/`.

---

## 36. LIMITATIONS_AND_GAPS

- No se cubrieron visualmente los viewports 430×932, 768×1024, 1024×768, 1366×768 ni 1728×1117 — se recomienda una pasada de seguimiento centrada específicamente en el breakpoint de 1024px, donde el código desactiva el pin GSAP (`isMobileLayout`), por ser el punto de mayor riesgo de comportamiento divergente.
- No se realizó smoke visual en vivo de CA/SV/FR/IT/DA/NL/NO/PT más allá de confirmar su presencia en el selector y la paridad estructural de claves — se recomienda una pasada dedicada de i18n visual, especialmente para sueco/danés/noruego (caracteres å/æ/ø) mencionados como riesgo histórico sin confirmar en `reports/locale-copy/`.
- El envío real del formulario de Contact no se completó (`SAFETY_BLOCKED`) — aunque la evidencia del captcha roto ya demuestra que el envío no puede completarse hoy en absoluto, no se pudo verificar el comportamiento posterior a una verificación exitosa (una vez reparado el captcha).
- No se verificó la carga de red de fuentes (`@font-face`) para confirmar en vivo la ausencia de Cormorant Garamond/DM Sans mencionada como migración pendiente en `ANCLORA_BRANDING_TYPOGRAPHY.md`.
- El botón/buscador de Hero ("SEARCH") se probó solo en su capacidad de seleccionar opciones en los combos; no se confirmó en vivo si al pulsar "SEARCH" ocurre algún comportamiento (scroll a Properties, no-op, etc.) más allá de la ausencia de ruta de destino confirmada por código.
- Los skills compuestos AOS (`accessibility-audit`, `i18n-integrity-check`, `design-system-consumer-check`, etc.) se aplicaron con criterio manual sobre evidencia real, no como procesos AOS independientes invocados por separado — ver §28.
- La revisión legal de las 253 cadenas marcadas `LEGAL_REVIEW_REQUIRED` está fuera del alcance de una auditoría UX y requiere seguimiento por el equipo legal/de gobernanza de Anclora.

---

*Fin del informe. Ver también las versiones `.html` (presentación editorial, con capturas embebidas) y `.xml` (estructurada) de esta misma auditoría en `docs/audits/`.*
