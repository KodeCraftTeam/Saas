import Link from "next/link";
import {
  LayoutDashboard,
  Calendar,
  Users,
  Scissors,
  List,
  Settings,
} from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/appointments", label: "Citas", icon: Calendar },
  { href: "/clients", label: "Clientes", icon: Users },
  { href: "/barbers", label: "Barberos", icon: Scissors },
  { href: "/services", label: "Servicios", icon: List },
  { href: "/settings", label: "Configuracion", icon: Settings },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="sticky top-0 flex h-screen w-64 flex-col border-r border-neutral-200 bg-white">
        <div className="flex h-16 items-center border-b border-neutral-200 px-6">
          <Link href="/dashboard" className="text-xl font-bold text-neutral-900">
            TubarberApp
          </Link>
        </div>
        <nav className="flex-1 space-y-1 px-3 py-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 bg-neutral-50 p-8">{children}</main>
    </div>
  );
}
