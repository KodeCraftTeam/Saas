import Link from "next/link";
import { cookies } from "next/headers";

interface DecodedToken {
  sub: string;
  name: string;
  lastName: string;
  role: string;
}

function decodeToken(token: string): DecodedToken | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = Buffer.from(base64, "base64").toString("utf-8");
    return JSON.parse(jsonPayload) as DecodedToken;
  } catch {
    return null;
  }
}

export default async function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const user = token ? decodeToken(token) : null;

  return (
    <div className="flex min-h-screen flex-col">
      {/* Top Navigation Bar — Steep style */}
      <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-dove/40 bg-pure-white px-6">
        <Link
          href="/"
          className="font-[family-name:var(--font-signifier)] text-xl font-normal tracking-tight text-ink"
        >
          TubarberApp
        </Link>
        <nav className="flex items-center gap-8">
          <Link
            href="/pricing"
            className="text-[15px] font-[450] text-ink transition-colors hover:text-graphite"
          >
            Precios
          </Link>
          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <Link
                  href={user.role === "SUPER_ADMIN" ? "/super-admin" : "/dashboard"}
                  className="rounded-full bg-ink px-5 py-2 text-[15px] font-[450] text-pure-white transition-colors hover:bg-ink/90"
                >
                  {user.role === "SUPER_ADMIN" ? "Panel Super Admin" : "Ir al Panel"}
                </Link>
                <div className="flex items-center gap-2 rounded-full bg-neutral-50 px-3 py-1.5 border border-neutral-200" title={`${user.name} ${user.lastName}`}>
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#fbe1d1] text-[10px] font-semibold text-[#5d2a1a]">
                    {user.name.charAt(0).toUpperCase()}{user.lastName ? user.lastName.charAt(0).toUpperCase() : ""}
                  </span>
                  <span className="text-[13px] font-medium text-neutral-700 max-w-[100px] truncate">
                    {user.name}
                  </span>
                </div>
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-[15px] font-[450] text-ink transition-colors hover:text-graphite"
                >
                  Iniciar sesion
                </Link>
                <Link
                  href="/register"
                  className="rounded-full bg-ink px-5 py-2 text-[15px] font-[450] text-pure-white transition-colors hover:bg-ink/90"
                >
                  Comenzar
                </Link>
              </>
            )}
          </div>
        </nav>
      </header>

      {/* Content */}
      <main className="w-full flex-1">
        {children}
      </main>
    </div>
  );
}
