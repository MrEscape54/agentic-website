# Idiomas del sitio

El sitio comparte componentes, estilos y lógica entre inglés, español latinoamericano y portugués de Brasil. `next-intl` proporciona los catálogos y el contexto de idioma tanto en servidor como en cliente.

| Página | Inglés | Español | Portugués |
| --- | --- | --- | --- |
| Home | `/` | `/es` | `/pt` |
| Platform | `/platform` | `/es/platform` | `/pt/platform` |
| Enterprise | `/enterprise` | `/es/enterprise` | `/pt/enterprise` |

Las páginas viven en `src/app/[locale]`. Las URLs inglesas originales se conservan mediante rewrites relativos de Next.js. Esto evita depender de rewrites absolutos del middleware, que produjeron redirecciones circulares en el servidor local con esta versión de Next.js. Si se agrega una página, incluir su ruta inglesa en `next.config.ts` y en el sitemap.

La URL es siempre la autoridad del idioma. No se redirige una URL explícita según cookies o idioma del navegador. El selector EN / ES / PT conserva la página, los parámetros de consulta y el ancla; en móvil aparece dentro del menú. La cookie `LORENZA_LOCALE` registra la selección sin cambiar la resolución de URLs.

## Edición de textos

- `messages/en.json`, `messages/es.json` y `messages/pt.json` contienen los textos. `metadata` agrupa los títulos y las descripciones por página; `ui` contiene textos compartidos del layout.
- `copy` usa claves estables calculadas con `messageKey` en `src/i18n/key.ts`. El catálogo inglés permite reconocer qué texto corresponde a cada clave. La misma clave contiene la traducción en los otros dos archivos.
- Los componentes usan `const t = useText()` y `t("English source copy")`. El texto inglés sirve como referencia de búsqueda; el contenido localizado se resuelve antes de renderizar, sin modificar el DOM después de hidratar.
- Para agregar o cambiar un texto, actualizar su referencia inglesa y los tres catálogos. `npm run i18n:check` informa textos literales faltantes con la clave que debe incorporarse. No reutilizar la clave de una frase inglesa que cambió.
- Para datos dinámicos, aplicar `t(item.label)` al mostrarlos. Registrar en los catálogos todas las etiquetas y estados posibles: el chequeo estático de literales no puede inferir todos los valores dinámicos.
- Mantener sin traducción los IDs, claves de sistemas, nombres de skills como `plan.change`, tokens como `{CUSTOMER_ID}`, valores de estado y condiciones de comparación. Las traducciones se aplican únicamente a sus representaciones visibles. Los nombres oficiales de módulos y las marcas se conservan cuando corresponde.
- El idioma inglés mantiene el copy aprobado. Las traducciones preservan el significado, la estructura, los límites de las afirmaciones y las aclaraciones de cumplimiento; no agregan capacidades ni certificaciones.

## SEO y dominio

`lang` usa `en`, `es-419` y `pt-BR`. Cada página genera título, descripción, canonical, Open Graph y alternativos `hreflang`, incluido `x-default`. `/sitemap.xml` incluye las nueve URLs con sus alternativas.

Configurar `NEXT_PUBLIC_SITE_URL` con el origen HTTPS definitivo antes del build de producción. Sin esa variable se usa `VERCEL_PROJECT_PRODUCTION_URL` en Vercel y `http://localhost:3000` en desarrollo. No publicar el valor local del archivo de ejemplo como dominio de producción.

## Verificación

```sh
npm run i18n:check
npm run typecheck
npm run build
npm test -- tests/i18n.spec.ts tests/hero.spec.ts tests/platform.spec.ts tests/enterprise.spec.ts tests/site-navigation.spec.ts tests/omnichannel.spec.ts tests/navbar-scroll.spec.ts
```

Las pruebas de internacionalización revisan las tres páginas en cada idioma, metadatos, enlaces, fragmentos ingleses no traducidos, escenarios de ejecución, IDs y tokens, aprobación humana, selector con query y ancla, rutas desconocidas y desbordes a 320, 390, 1024 y 1440 px. Las pruebas existentes cubren el playback inglés y la navegación original. La validación de navegador se realiza en Chrome local; Safari/iOS requiere una revisión aparte.
