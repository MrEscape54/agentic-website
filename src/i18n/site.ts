export function siteOrigin(): URL {
  const configured = process.env.NEXT_PUBLIC_SITE_URL;
  if (configured) return new URL(configured);
  const productionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  return new URL(productionHost ? `https://${productionHost}` : "http://localhost:3000");
}
