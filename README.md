# Atelier — MVP de gestión para peluquería

Aplicación SPA construida con Vite, React 18, TypeScript, Tailwind CSS, Framer Motion, React Router, Lucide React y date-fns. No requiere backend ni cuenta de usuario.

## Requisitos
- Node.js 20 (recomendado; compatible con Node.js 18.18+)
- npm o Bun

## Desarrollo local
```bash
npm install
npm run dev
```

Con Bun:
```bash
bun install
bun run dev
```

## Compilar y previsualizar
```bash
npm run build
npm run preview
```

El resultado de producción se genera en `dist/`.

## Deploy en Cloudflare Pages desde GitHub
1. Subí el contenido de esta carpeta a la raíz de un repositorio GitHub.
2. En Cloudflare Dashboard, entrá a **Workers & Pages → Create application → Pages → Connect to Git** y conectá el repositorio.
3. Configurá:
   - **Production branch:** `main`
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Root directory:** dejar vacío si `package.json` está en la raíz del repositorio.
4. Guardá y desplegá. Cada push a `main` iniciará un nuevo deploy; los cambios en otras ramas pueden generar previews.

Los archivos `public/_headers` y `public/robots.txt` se copian a `dist/`. Cloudflare Pages sirve `index.html` como fallback de la SPA para las rutas del cliente.

## Archivos de despliegue y seguridad
- `.gitignore`: excluye dependencias, builds, logs, archivos locales y variables de entorno.
- `.nvmrc`: recomienda Node 20.
- `public/_headers`: define cabeceras defensivas y una Content Security Policy básica.
- `public/robots.txt`: permite rastreo público de las rutas.
- `public/favicon.svg`: favicon vectorial de Atelier.
- `index.html`: idioma, descripción SEO, Open Graph, Twitter Card, favicon y color de tema.

La política CSP es intencionalmente restrictiva. Si en el futuro se agregan imágenes, analítica, APIs o scripts de terceros, revisá y ajustá `connect-src`, `img-src`, `script-src` o las directivas correspondientes en `public/_headers` antes de desplegar.

## Funcionalidades
- Dashboard con turnos del día, cartera de clientes y regresos estimados.
- Alta, búsqueda, detalle y edición de clientes.
- Registro de servicios con fecha estimada de regreso calculada en semanas.
- Tipos de servicio editables e intervalos predeterminados.
- Agenda con filtros, estados y acción para completar turno; al completar se crea un registro en el historial.
- Persistencia local por clave `atelier.*` en LocalStorage.
- Tema claro/oscuro persistente.
- Acceso a WhatsApp mediante `wa.me`, sin SDK ni token.

## Datos y privacidad
Los datos de clientes y turnos permanecen en el navegador y dispositivo donde se usa la aplicación. No hay backend ni sincronización en la nube. Borrar los datos del sitio puede eliminar la información; antes de usarla en un salón real, agregá exportación/importación de respaldos y revisá los requisitos de privacidad aplicables.

No guardes secretos en variables `VITE_*`: esas variables se incorporan al código público del frontend. Este MVP no implementa autenticación ni control de acceso; no debe tratarse como un sistema privado multiusuario.
