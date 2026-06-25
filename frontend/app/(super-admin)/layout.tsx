"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Building2, Users, BarChart3, LogOut } from "lucide-react";
import { logout } from "@/features/auth/actions/logout-action";

const navItems = [
  { href: "/super-admin",           label: "Dashboard", icon: LayoutDashboard },
  { href: "/super-admin/negocios",  label: "Negocios",  icon: Building2 },
  { href: "/super-admin/usuarios",  label: "Usuarios",  icon: Users },
  { href: "/super-admin/analitica", label: "Analítica", icon: BarChart3 },
];

export default function SuperAdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-pure-white text-ink font-sohne select-none antialiased">
      {/* ── Sidebar (Steep Style) ── */}
      <aside className="sticky top-0 flex h-screen w-[240px] flex-shrink-0 flex-col bg-fog p-4">
        
        {/* Logo Section */}
        <div className="flex h-16 items-center px-4 mb-4">
          <Link href="/super-admin" className="font-signifier text-[22px] font-normal tracking-tight text-ink">
            Plataforma
          </Link>
        </div>

        {/* Navigation items */}
        <nav className="flex-1 space-y-1.5 px-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group flex items-center gap-3 px-3.5 py-2.5 text-[15px] font-[450] tracking-[-0.009em] transition-all duration-200 ${
                  isActive
                    ? "bg-pure-white text-ink shadow-subtle rounded-[12px] font-[480]"
                    : "text-ash hover:bg-pure-white/60 hover:text-ink rounded-[12px]"
                }`}
              >
                <item.icon className={`h-[16px] w-[16px] stroke-[1.75px] transition-colors duration-200 ${
                  isActive ? "text-ink" : "text-graphite group-hover:text-ink"
                }`} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Panel (User chip & logout) */}
        <div className="space-y-3 px-2 pb-2">
          <div className="rounded-[24px] bg-pure-white p-4 shadow-subtle border border-dove/10">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-apricot-wash text-[11px] font-medium text-rust">
                SA
              </span>
              <div className="min-w-0">
                <p className="text-[13px] font-[480] text-ink leading-tight">Super Admin</p>
                <p className="text-[11px] text-graphite leading-tight truncate">kodeCraft@gmail.com</p>
              </div>
            </div>
          </div>

          <form action={logout}>
            <button
              type="submit"
              className="group flex w-full items-center gap-3 rounded-[12px] px-3.5 py-2.5 text-[14px] font-[450] text-ash hover:bg-pure-white/60 hover:text-ink transition-colors duration-150"
            >
              <LogOut className="h-[16px] w-[16px] text-graphite group-hover:text-ink transition-colors duration-150" />
              Cerrar sesión
            </button>
          </form>
        </div>
      </aside>

      {/* ── Main Canvas (Pure White or Fog depending on page content) ── */}
      <main className="flex-1 overflow-auto bg-pure-white">
        {children}
      </main>
    </div>
  );
}
