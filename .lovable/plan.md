
Objetivo: desbloquear el deploy en Cloudflare eliminando la causa real (desincronización entre `package.json` y `package-lock.json`) y dejando una configuración de build estable.

1) Diagnóstico confirmado
- El error ocurre antes del build: Cloudflare falla en `Installing project dependencies: npm clean-install --progress=false` (equivale a `npm ci`).
- `npm ci` exige sincronía exacta entre `package.json` y `package-lock.json`.
- En este repo, `package.json` sí declara `framer-motion` (`^12.37.0`) pero `package-lock.json` no tiene `framer-motion`, `motion-dom` ni `motion-utils`.
- Por eso aparece exactamente: `Missing: framer-motion@12.38.0 ...`.

Do I know what the issue is?
- Sí: no es el comando `build`, es lockfile desactualizado respecto a dependencias.

2) Plan de corrección en código (mínimo riesgo, directo)
- Archivo: `package.json`
  - Quitar `framer-motion` de `dependencies` (actualmente no se usa en el código fuente).
- Archivo: `package-lock.json`
  - No tocarlo manualmente (ya está alineado con un árbol sin `framer-motion`).
- Resultado esperado:
  - `npm clean-install` deja de fallar por “Missing framer-motion”.

3) Ajuste recomendado en Cloudflare (para evitar confusión)
- Framework preset: `None` (válido para Vite estático si no detecta preset).
- Build command: `npm run build` (sin `npm install` aquí).
- Build output directory: `dist`.
- Variables:
  - Mantener `NODE_VERSION=20` (o 22).
  - Mantener `.npmrc` con `legacy-peer-deps=true` para tolerar peer conflict de `lovable-tagger` con Vite 8.
  - Opcional: `NPM_CONFIG_LEGACY_PEER_DEPS=true` como refuerzo.

4) Verificación de éxito (logs esperados)
- Debe desaparecer:
  - `npm ci can only install packages when package.json and package-lock.json are in sync`
  - `Missing: framer-motion ...`
- Debe aparecer:
  - instalación completa de dependencias
  - ejecución de `vite build`
  - publicación de artefactos en `dist`.

5) Plan de contingencia (solo si aún falla instalación)
- Activar en Cloudflare: `SKIP_DEPENDENCY_INSTALL=true`.
- Cambiar build command a: `npm install --legacy-peer-deps && npm run build`.
- Esto fuerza a saltar el `npm clean-install` automático y usar instalación personalizada.
