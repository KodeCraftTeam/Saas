import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Middleware global: resuelve tenant del subdominio y protege rutas del dashboard.
 *
 * - Subdominio (ej: "joe.tubarberapp.com") → slug "joe" en header x-tenant-slug
 * - Rutas protegidas (/dashboard, /appointments, etc.) → redirigir a /login si no hay sesión
 * - Rutas públicas (/, /pricing, /book/*, /login, /register) → pasar sin verificar
 */

const protectedRoutes = [
  "/dashboard",
  "/appointments",
  "/clients",
  "/barbers",
  "/services",
  "/settings",
];

const authRoutes = ["/login", "/register"];

function getTenantSlug(host: string): string | null {
  const parts = host.split(".");
  // e.g. "joe.tubarberapp.com" → ["joe", "tubarberapp", "com"]
  if (parts.length >= 3) {
    return parts[0];
  }
  return null;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const host = request.headers.get("host") ?? "";
  const tenantSlug = getTenantSlug(host);

  // Clone headers and add tenant info
  const requestHeaders = new Headers(request.headers);
  if (tenantSlug) {
    requestHeaders.set("x-tenant-slug", tenantSlug);
  }

  // Check if route is protected
  const isProtected = protectedRoutes.some((route) => pathname.startsWith(route));
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  // TODO: replace with real session check (cookie or token)
  const hasSession = request.cookies.has("session");

  if (isProtected && !hasSession) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isAuthRoute && hasSession) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}

export const config = {
  matcher: [
    /*
     * Match all paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     * - public folder assets
     */
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
