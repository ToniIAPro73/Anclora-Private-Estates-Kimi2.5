# menu-overlay-clarity-redesign-spec-migration

## Migracion
- Sustituir layout del overlay basado en cards por layout de lista jerarquica.
- Reusar acciones existentes de scroll y portales.
- Introducir nuevos labels i18n para grupos, utilidades y navegacion de submenu.

## Riesgos
- Regresion en navegacion de secciones si se altera `scrollToSection`.
- Inconsistencias entre idiomas si faltan claves.

## Mitigacion
- Mantener handlers existentes de scroll y portal.
- Validar i18n en los 4 idiomas soportados.
