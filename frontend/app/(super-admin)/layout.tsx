import Link from "next/link";
import { LayoutDashboard, Building2, Users, BarChart3, LogOut } from "lucide-react";
import { logout } from "@/features/auth/actions/logout-action";

const navItems = [
  { href: "/super-admin",           label: "Dashboard", icon: LayoutDashboard },
  { href: "/super-admin/negocios",  label: "Negocios",  icon: Building2 },
  { href: "/super-admin/usuarios",  label: "Usuarios",  icon: Users },
  { href: "/super-admin/analitica", label: "Analítica", icon: BarChart3 },
];

export default function SuperAdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      {/* ── Sidebar ── */}
      <aside className="sticky top-0 flex h-screen w-[220px] flex-shrink-0 flex-col bg-[#f7f7f8]">

        {/* Logo */}
        <Link
          href="/super-admin"
          className="flex h-[60px] items-center px-5"
        >
          <span
            className="text-[18px] text-[#17191c] leading-[1.25] tracking-[-0.2px]"
            style={{ fontFamily: "var(--font-signifier)" }}
          >
            Plataforma
          </span>
        </Link>

        <div className="mx-4 h-px bg-[#a3a6af]/20" />

        {/* Nav */}
        <nav className="mt-4 flex-1 space-y-0.5 px-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group flex items-center gap-2.5 rounded-[10px] px-3 py-2 text-[14px] text-[#4c4c4c] transition-colors duration-150 hover:bg-white hover:text-[#17191c]"
            >
              <item.icon className="h-[16px] w-[16px] text-[#a3a6af] group-hover:text-[#17191c] transition-colors duration-150" />
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Bottom: user chip + logout */}
        <div className="p-3 space-y-1">
          <div className="rounded-[12px] bg-white px-3 py-2.5" style={{ boxShadow: "rgba(4,23,43,0.05) 0px 0px 0px 1px" }}>
            <div className="flex items-center gap-2.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#fbe1d1] text-[11px] font-[500] text-[#5d2a1a]">
                SA
              </span>
              <div className="min-w-0">
                <p className="text-[13px] font-[500] text-[#17191c] leading-tight">Super Admin</p>
                <p className="text-[11px] text-[#a3a6af] leading-tight truncate">kodeCraft@gmail.com</p>
              </div>
            </div>
          </div>

          <form action={logout}>
            <button
              type="submit"
              className="group flex w-full items-center gap-2.5 rounded-[10px] px-3 py-2 text-[14px] text-[#a3a6af] transition-colors duration-150 hover:bg-white hover:text-[#17191c]"
            >
              <LogOut className="h-[16px] w-[16px] transition-colors duration-150" />
              Cerrar sesión
            </button>
          </form>
        </div>
      </aside>

      {/* ── Main ── */}
      <main className="flex-1 overflow-auto bg-white">
        {children}
      </main>
    </div>
  );
}
