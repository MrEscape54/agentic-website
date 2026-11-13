import { expect, test } from "@playwright/test";
import en from "../messages/en.json";
import es from "../messages/es.json";
import pt from "../messages/pt.json";

const languages = {
  en: { prefix: "", tag: "en", headline: "From conversation", platform: "One platform.", enterprise: "Governed by your enterprise.", menu: "Open navigation", next: "Next step", approve: "Approve", review: "Human approval required", done: "Business task completed.", messages: en },
  es: { prefix: "/es", tag: "es-419", headline: "De la conversación", platform: "Una plataforma.", enterprise: "Gobernado por tu empresa.", menu: "Abrir navegación", next: "Siguiente paso", approve: "Aprobar", review: "Requiere aprobación humana", done: "Tarea de negocio completada.", messages: es },
  pt: { prefix: "/pt", tag: "pt-BR", headline: "Da conversa", platform: "Uma plataforma.", enterprise: "Governado pela sua empresa.", menu: "Abrir navegação", next: "Próxima etapa", approve: "Aprovar", review: "Aprovação humana necessária", done: "Tarefa de negócio concluída.", messages: pt },
};

test("translation catalogs have matching keys and no empty copy", () => {
  for (const messages of [es, pt]) {
    expect(Object.keys(messages.copy).sort()).toEqual(Object.keys(en.copy).sort());
    expect(Object.values(messages.copy).every(value => value.trim().length > 0)).toBe(true);
  }
});

test("sitemap contains all nine pages and language alternatives", async ({ request }) => {
  const response = await request.get("/sitemap.xml");
  expect(response.status()).toBe(200);
  const xml = await response.text();
  expect(xml.match(/<loc>/g)).toHaveLength(9);
  for (const tag of ["en", "es-419", "pt-BR", "x-default"]) expect(xml).toContain(`hreflang="${tag}"`);
  expect(xml).toContain("/es/platform");
  expect(xml).toContain("/pt/enterprise");
});

for (const [locale, language] of Object.entries(languages)) {
  for (const route of ["", "/platform", "/enterprise"]) {
    test(`${locale}${route || "/"}: localized HTML, metadata and links`, async ({ page }) => {
      await page.emulateMedia({ reducedMotion: "reduce" });
      const errors: string[] = [];
      page.on("pageerror", error => errors.push(error.message));
      const response = await page.goto(`${language.prefix}${route}` || "/");
      expect(response?.status()).toBe(200);
      await expect(page.locator("html")).toHaveAttribute("lang", language.tag);
      await expect(page.locator("h1")).toContainText(route === "/platform" ? language.platform : route === "/enterprise" ? language.enterprise : language.headline);
      const meta = route === "/platform" ? language.messages.metadata.platform : route === "/enterprise" ? language.messages.metadata.enterprise : language.messages.metadata.home;
      await expect(page).toHaveTitle(meta.title);
      await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", meta.description);
      const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
      expect(new URL(canonical!).pathname).toBe(`${language.prefix}${route}` || "/");
      for (const tag of ["en", "es-419", "pt-BR", "x-default"]) await expect(page.locator(`link[rel="alternate"][hreflang="${tag}"]`)).toHaveCount(1);
      const internal = await page.locator('a[href^="/"]:not(.language-switcher a)').evaluateAll(links => links.map(link => link.getAttribute("href")));
      for (const href of internal) {
        if (locale !== "en") expect(href).toMatch(new RegExp(`^/${locale}(?:/|$|[?#])`));
        else expect(href).not.toMatch(/^\/(en|es|pt)(?:\/|$)/);
      }
      if (locale !== "en") {
        const english = Object.entries(en.copy).filter(([id, source]) => source !== (language.messages.copy as Record<string, string>)[id]).map(([, source]) => source);
        const untranslated = await page.locator("body").evaluate((body, candidates) => {
          const walker = document.createTreeWalker(body, NodeFilter.SHOW_TEXT);
          const matches = new Set<string>();
          while (walker.nextNode()) {
            const node = walker.currentNode;
            if (node.parentElement?.closest("script, style")) continue;
            const text = node.textContent?.trim().replace(/\s+/g, " ") || "";
            if (candidates.includes(text)) matches.add(text);
          }
          return [...matches];
        }, english);
        expect(untranslated).toEqual([]);
      }
      expect(errors).toEqual([]);
    });
  }
}

for (const locale of ["es", "pt"] as const) {
  const language = languages[locale];
  test(`${locale}: system activation and all three execution cases retain their identifiers`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(`/${locale}`);
    const flow = page.locator("#execution-demo");
    for (const [index, outcome] of (locale === "es" ? ["Plan actualizado", "Reemplazo de tarjeta iniciado", "Entrega reprogramada"] : ["Plano atualizado", "Substituição do cartão iniciada", "Entrega reagendada"]).entries()) {
      await flow.locator(".case-selector button").nth(index).click();
      await flow.locator(".step-list button").nth(2).click();
      await expect(flow.locator(".system-active")).toContainText(locale === "es" ? "Identidad" : "Identidade");
      await expect(flow.locator(".detail-payload code")).toHaveText(index === 0 ? "{CUSTOMER_ID}" : index === 1 ? "{CARD}" : "{ORDER}");
      await flow.locator(".step-list button").nth(3).click();
      await expect(flow.locator(".skill-tags code").first()).toHaveText(index === 0 ? "customer.identify" : index === 1 ? "card.validate" : "order.retrieve");
      await flow.locator(".step-list button").last().click();
      await flow.getByRole("button", {name: language.next, exact: true}).click();
      await expect(flow.getByRole("heading", {name: outcome, exact: true})).toBeVisible();
    }
    await page.goto(`/${locale}/platform`);
    const platform = page.locator(".platform-execution");
    await platform.getByRole("button", {name: language.review, exact: true}).click();
    for (let index = 0; index < 4; index++) await platform.getByRole("button", {name: language.next, exact: true}).click();
    const continuation = platform.getByRole("button", { name: locale === "es" ? "Continuar ejecución" : "Continuar execução", exact: true });
    await expect(continuation).toBeDisabled();
    await platform.getByRole("button", {name: language.approve, exact: true}).click();
    await continuation.click();
    await platform.getByRole("button", {name: language.next, exact: true}).click();
    await expect(platform.getByRole("status")).toContainText(language.done);
  });

  for (const width of [320, 390, 1024, 1440]) test(`${locale}: no overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({width, height: 960});
    await page.emulateMedia({reducedMotion: "reduce"});
    for (const route of ["", "/platform", "/enterprise"]) {
      await page.goto(`/${locale}${route}`);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      if (width < 961) await page.getByRole("button", { name: language.menu }).click();
      await expect(page.locator(".language-switcher")).toBeVisible();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    }
    await page.screenshot({path: `test-results/i18n-${locale}-${width}.png`, fullPage: true});
  });
}

test("switching languages preserves page, query and anchor; explicit English beats cookie and browser preference", async ({ page }) => {
  await page.goto("/es/platform?source=demo#execution");
  // Anchor navigation can hide the scroll-aware header; keyboard focus reveals it.
  await page.getByRole("link", { name: "Português", exact: true }).focus();
  await page.getByRole("link", { name: "Português", exact: true }).click();
  await expect(page).toHaveURL(/\/pt\/platform\?source=demo#execution$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "pt-BR");
  await page.getByRole("link", { name: "English", exact: true }).focus();
  await page.getByRole("link", { name: "English", exact: true }).click();
  await expect(page).toHaveURL(/\/platform\?source=demo#execution$/);
  await page.context().addCookies([{name: "LORENZA_LOCALE", value: "pt", url: "http://127.0.0.1:3000"}]);
  await page.setExtraHTTPHeaders({"Accept-Language": "es-AR,es;q=0.9"});
  await page.goto("/enterprise");
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await page.goto("/fr/platform");
  await expect(page.locator("h1")).toHaveText("404");
});
