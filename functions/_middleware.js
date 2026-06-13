const INDEXABLE_PATHS = new Set([
  "/",
  "/aplicacoes/fita-led-area-externa-fachada/",
  "/aplicacoes/fita-led-para-banheiro-espelho/",
  "/aplicacoes/fita-led-para-cozinha-armario/",
  "/aplicacoes/fita-led-para-quarto/",
  "/aplicacoes/fita-led-para-sanca-gesso/",
  "/aplicacoes/iluminacao-led-para-loja-vitrine/",
  "/blog/fita-led-cob-ou-fita-led-comum/",
  "/contato/",
  "/produtos/fita-de-led/",
  "/produtos/fita-led-cob/",
  "/produtos/fita-led-cob/fita-led-cob-24v/",
  "/produtos/fita-led-cob/fita-led-cob-3000k/",
  "/produtos/fita-led-cob/fita-led-cob-4000k/",
  "/produtos/fita-led-cob/fita-led-cob-ip65/",
  "/produtos/fita-led-cob/fita-led-cob-rgb/",
  "/produtos/fita-neon-led/",
  "/produtos/fita-neon-led/fita-led-neon-flexivel/",
  "/produtos/fita-neon-led/fita-led-neon-ip65/",
  "/produtos/fita-neon-led/fita-led-neon-rgb/",
  "/produtos/fita-neon-led/fita-neon-led-24v/",
  "/produtos/fonte-24v-para-led/",
  "/produtos/perfil-de-aluminio-para-fita-led/",
  "/produtos/perfil-linear-led/",
  "/produtos/trilho-magnetico-led/",
]);

const STATIC_FILE = /\.[a-z0-9]{2,8}$/i;

export async function onRequest(context) {
  const url = new URL(context.request.url);
  const pathname = normalizePath(url.pathname);

  if (pathname === "/404.html" || pathname === "/robots.txt" || pathname === "/sitemap.xml") {
    return context.next();
  }

  if (STATIC_FILE.test(pathname) || INDEXABLE_PATHS.has(pathname)) {
    return context.next();
  }

  const notFoundUrl = new URL("/404.html", url.origin);
  const notFoundRequest = new Request(notFoundUrl, context.request);
  const response = await context.env.ASSETS.fetch(notFoundRequest);
  const headers = new Headers(response.headers);

  headers.set("cache-control", "public, max-age=0, must-revalidate");
  headers.set("x-robots-tag", "noindex, follow");

  return new Response(response.body, {
    status: 404,
    statusText: "Not Found",
    headers,
  });
}

function normalizePath(pathname) {
  if (pathname !== "/" && pathname.endsWith("/")) {
    return pathname;
  }

  if (STATIC_FILE.test(pathname) || pathname === "/") {
    return pathname;
  }

  return `${pathname}/`;
}
