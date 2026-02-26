# QA Gate Baseline

## Validacion de entorno
- Leer .env.local y .env.example.
- Prohibido hardcodear secrets.

## Validacion i18n
- Cobertura obligatoria en s y n para texto nuevo/modificado.

## Criterios NO-GO
- Errores en lint, 	ype-check o uild.
- I18N_MISSING_KEYS distinto de none.
- ENV_MISMATCH distinto de none.