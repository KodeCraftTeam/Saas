"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Building2, Users, BarChart3, CreditCard, LogOut, Settings, X, Camera, Lock, ChevronLeft, ChevronRight } from "lucide-react";
import { logout } from "@/features/auth/actions/logout-action";
import { useToast } from "@/shared/components/ui/Toast";

const navItems = [
  { href: "/super-admin",              label: "Dashboard",      icon: LayoutDashboard },
  { href: "/super-admin/negocios",      label: "Negocios",       icon: Building2 },
  { href: "/super-admin/usuarios",      label: "Usuarios",       icon: Users },
  { href: "/super-admin/analitica",     label: "Analítica",      icon: BarChart3 },
  { href: "/super-admin/suscripciones", label: "Suscripciones",  icon: CreditCard },
];

export default function SuperAdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const { toast } = useToast();

  const notifyComingSoon = () => {
    toast({
      title: "Próximamente",
      description: "Guardar cambios de cuenta requiere un endpoint de backend que aún no existe.",
      variant: "info",
    });
  };

  return (
    <div className="flex min-h-screen bg-pure-white text-ink font-sohne select-none antialiased">
      {/* ── Sidebar (Steep Style) ── */}
      <aside
        className={`sticky top-0 flex h-screen flex-shrink-0 flex-col bg-fog p-4 transition-all duration-200 ${
          collapsed ? "w-[76px]" : "w-[240px]"
        }`}
      >

        {/* Logo Section */}
        <div className={`flex h-16 items-center mb-4 ${collapsed ? "justify-center px-0" : "justify-between px-4"}`}>
          {!collapsed && (
            <Link href="/super-admin" className="font-signifier text-[22px] font-normal tracking-tight text-ink">
              Plataforma
            </Link>
          )}
          <button
            onClick={() => setCollapsed((v) => !v)}
            title={collapsed ? "Expandir menú" : "Colapsar menú"}
            className="flex h-7 w-7 items-center justify-center rounded-full border border-dove/20 bg-pure-white text-graphite hover:text-ink hover:border-graphite transition-colors flex-shrink-0"
          >
            {collapsed ? <ChevronRight className="h-3.5 w-3.5" /> : <ChevronLeft className="h-3.5 w-3.5" />}
          </button>
        </div>

        {/* Navigation items */}
        <nav className="flex-1 space-y-1.5 px-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                title={collapsed ? item.label : undefined}
                className={`group flex items-center gap-3 py-2.5 text-[15px] font-[450] tracking-[-0.009em] transition-all duration-200 ${
                  collapsed ? "justify-center px-0" : "px-3.5"
                } ${
                  isActive
                    ? "bg-pure-white text-ink shadow-subtle rounded-[12px] font-[480]"
                    : "text-ash hover:bg-pure-white/60 hover:text-ink rounded-[12px]"
                }`}
              >
                <item.icon className={`h-[16px] w-[16px] flex-shrink-0 stroke-[1.75px] transition-colors duration-200 ${
                  isActive ? "text-ink" : "text-graphite group-hover:text-ink"
                }`} />
                {!collapsed && item.label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Panel (User chip & logout) */}
        <div className="space-y-3 px-2 pb-2">
          <button
            onClick={() => setIsAccountOpen(true)}
            title={collapsed ? "Mi cuenta" : undefined}
            className={`w-full rounded-[24px] bg-pure-white shadow-subtle border border-dove/10 hover:border-dove/30 transition-colors group ${
              collapsed ? "p-2 flex justify-center" : "p-4 text-left"
            }`}
          >
            <div className={`flex items-center ${collapsed ? "" : "gap-3"}`}>
              <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-apricot-wash text-[11px] font-medium text-rust">
                SA
              </span>
              {!collapsed && (
                <>
                  <div className="min-w-0 flex-1">
                    <p className="text-[13px] font-[480] text-ink leading-tight">Super Admin</p>
                    <p className="text-[11px] text-graphite leading-tight truncate">kodeCraft@gmail.com</p>
                  </div>
                  <Settings className="h-[14px] w-[14px] text-dove group-hover:text-graphite transition-colors flex-shrink-0" />
                </>
              )}
            </div>
          </button>

          <form action={logout}>
            <button
              type="submit"
              title={collapsed ? "Cerrar sesión" : undefined}
              className={`group flex w-full items-center rounded-[12px] py-2.5 text-[14px] font-[450] text-ash hover:bg-pure-white/60 hover:text-ink transition-colors duration-150 ${
                collapsed ? "justify-center px-0" : "gap-3 px-3.5"
              }`}
            >
              <LogOut className="h-[16px] w-[16px] flex-shrink-0 text-graphite group-hover:text-ink transition-colors duration-150" />
              {!collapsed && "Cerrar sesión"}
            </button>
          </form>
        </div>
      </aside>

      {/* ── Main Canvas (Pure White or Fog depending on page content) ── */}
      <main className="flex-1 overflow-auto bg-pure-white">
        {children}
      </main>

      {/* ── Drawer: Mi cuenta ── */}
      {isAccountOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-end bg-ink/40 backdrop-blur-xs transition-opacity duration-300"
          onClick={() => setIsAccountOpen(false)}
        >
          <div
            className="h-full w-full max-w-md bg-pure-white p-8 shadow-subtle flex flex-col justify-between animate-slide-in-right"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex items-center justify-between border-b border-dove/10 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-ink" />
                  <h3 className="text-lg font-bold text-ink">Mi cuenta</h3>
                </div>
                <button
                  onClick={() => setIsAccountOpen(false)}
                  className="rounded-full p-1.5 hover:bg-fog transition-colors"
                >
                  <X className="h-5 w-5 text-ash" />
                </button>
              </div>

              {/* Avatar */}
              <div className="flex items-center gap-4 mb-6">
                <div className="relative">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-apricot-wash text-lg font-medium text-rust">
                    SA
                  </span>
                  <button
                    onClick={notifyComingSoon}
                    className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-ink text-pure-white hover:bg-ink/90 transition-colors"
                  >
                    <Camera className="h-3 w-3" />
                  </button>
                </div>
                <div>
                  <p className="text-sm font-[480] text-ink">Foto de perfil</p>
                  <p className="text-xs text-graphite">JPG o PNG, máx. 2MB</p>
                </div>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); notifyComingSoon(); }} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-graphite uppercase tracking-wider mb-1.5">Nombre</label>
                    <input
                      type="text"
                      defaultValue="Super"
                      className="w-full rounded-inputs border border-dove/30 px-3.5 py-2 text-sm focus:border-ink focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-graphite uppercase tracking-wider mb-1.5">Apellido</label>
                    <input
                      type="text"
                      defaultValue="Admin"
                      className="w-full rounded-inputs border border-dove/30 px-3.5 py-2 text-sm focus:border-ink focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-graphite uppercase tracking-wider mb-1.5">Email</label>
                  <input
                    type="email"
                    defaultValue="kodeCraft@gmail.com"
                    disabled
                    className="w-full rounded-inputs border border-dove/20 bg-fog/50 px-3.5 py-2 text-sm text-graphite cursor-not-allowed"
                  />
                </div>

                <div className="border-t border-dove/10 pt-4 mt-2">
                  <div className="flex items-center gap-2 mb-3">
                    <Lock className="h-3.5 w-3.5 text-graphite" />
                    <p className="text-[11px] font-bold text-graphite uppercase tracking-wider">Cambiar contraseña</p>
                  </div>
                  <div className="space-y-3">
                    <input
                      type="password"
                      placeholder="Contraseña actual"
                      className="w-full rounded-inputs border border-dove/30 px-3.5 py-2 text-sm focus:border-ink focus:outline-none transition-colors"
                    />
                    <input
                      type="password"
                      placeholder="Nueva contraseña"
                      className="w-full rounded-inputs border border-dove/30 px-3.5 py-2 text-sm focus:border-ink focus:outline-none transition-colors"
                    />
                    <input
                      type="password"
                      placeholder="Confirmar nueva contraseña"
                      className="w-full rounded-inputs border border-dove/30 px-3.5 py-2 text-sm focus:border-ink focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              </form>
            </div>

            <div className="border-t border-dove/10 pt-4 mt-6 flex items-center justify-end gap-4">
              <button
                type="button"
                onClick={() => setIsAccountOpen(false)}
                className="text-[15px] font-[450] text-ink hover:text-graphite transition-colors bg-transparent border-0"
              >
                Cancelar
              </button>
              <button
                onClick={notifyComingSoon}
                className="rounded-full bg-ink px-5 py-2 text-[15px] font-[450] text-pure-white hover:bg-ink/90 transition-colors"
              >
                Guardar cambios
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
