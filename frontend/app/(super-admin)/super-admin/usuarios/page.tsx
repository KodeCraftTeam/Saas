"use client";

import { useEffect, useState } from "react";
import { getUsers, createUser, User } from "@/features/super-admin/api";
import { useToast } from "@/shared/components/ui/Toast";
import { Users, Plus, Search, RefreshCw, X, Mail, Shield, Building, Clock } from "lucide-react";

const ROLE_OPTIONS = [
  { value: "BUSSINESS_MANAGER", label: "Business Manager (dueño de negocio)" },
  { value: "EMPLOYEE", label: "Employee" },
  { value: "CUSTOMER", label: "Customer" },
  { value: "SUPER_ADMIN", label: "Super Admin" },
];

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form states
  const [formName, setFormName] = useState("");
  const [formLastName, setFormLastName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formRole, setFormRole] = useState("BUSSINESS_MANAGER");
  const [formError, setFormError] = useState<string | null>(null);
  const [formSubmitting, setFormSubmitting] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      setUsers(await getUsers());
    } catch (e) {
      console.error("Error loading users:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setFormSubmitting(true);

    try {
      if (!formName || !formLastName || !formEmail || !formRole) {
        throw new Error("Todos los campos obligatorios deben ser completados.");
      }

      await createUser({
        name: formName,
        lastName: formLastName,
        email: formEmail,
        role: formRole,
      });

      toast({
        title: "Usuario creado",
        description: `El usuario "${formName} ${formLastName}" ha sido creado con éxito.`,
        variant: "success",
      });

      // Reset form & reload
      setFormName("");
      setFormLastName("");
      setFormEmail("");
      setFormRole("BUSSINESS_MANAGER");
      setIsModalOpen(false);
      await loadData();
    } catch (err: any) {
      setFormError(err.message || "Error al registrar el usuario");
    } finally {
      setFormSubmitting(false);
    }
  };

  const filteredUsers = users.filter((u) => {
    const query = searchQuery.toLowerCase();
    const fullName = `${u.name} ${u.lastName}`.toLowerCase();
    return (
      fullName.includes(query) ||
      u.email.toLowerCase().includes(query) ||
      u.role.toLowerCase().includes(query)
    );
  });

  const superAdminCount = users.filter((u) => u.role === "SUPER_ADMIN").length;
  const lastUser = [...users].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )[0];

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-pure-white text-ink font-sohne select-none antialiased">
      {/* ── Top Bar ── */}
      <header className="flex h-16 flex-shrink-0 items-center justify-between border-b border-dove/25 bg-pure-white px-8">
        <div className="flex items-center gap-2 text-[13px] font-[450] text-graphite tracking-[-0.009em]">
          <span>Plataforma</span>
          <span className="text-dove">/</span>
          <span className="font-[480] text-ink">Usuarios</span>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={loadData}
            disabled={loading}
            className="flex items-center gap-1.5 rounded-full border border-dove/30 bg-pure-white px-4 py-1.5 text-xs font-[450] text-ash hover:text-ink hover:border-graphite transition-all disabled:opacity-50"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
            Recargar
          </button>
          {/* Filled Dark CTA */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="rounded-full bg-ink px-5 py-2 text-[15px] font-[450] text-pure-white hover:bg-ink/90 transition-colors shadow-xs"
          >
            Crear Usuario
          </button>
        </div>
      </header>

      {/* ── Main Content Area ── */}
      <div className="flex-1 overflow-auto px-8 py-8 space-y-6 w-full">
        <div>
          <h1 className="font-signifier text-[44px] font-normal leading-tight tracking-[-0.015em] text-ink">
            Gestión de Usuarios
          </h1>
          <p className="mt-1.5 text-[15px] text-ash font-[430]">
            Administra y asigna roles a los administradores de negocios, barberos y superadministradores.
          </p>
        </div>

        {/* ── Stat strip ── */}
        <div className="grid grid-cols-3 gap-4">
          <div className="rounded-cards bg-pure-white border border-dove/20 p-5 shadow-subtle flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold text-graphite uppercase tracking-wider">Total usuarios</p>
              <p className="mt-2 text-2xl font-bold text-ink font-signifier">{users.length}</p>
            </div>
            <Users className="h-8 w-8 text-rust/30" />
          </div>

          <div className="rounded-cards bg-apricot-wash p-5 flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold text-rust uppercase tracking-wider">Super Admins</p>
              <p className="mt-2 text-2xl font-bold text-rust font-signifier">
                {superAdminCount} <span className="text-sm font-medium text-rust/70">/ {users.length}</span>
              </p>
            </div>
            <Shield className="h-8 w-8 text-rust/40" />
          </div>

          <div className="rounded-cards bg-pure-white border border-dove/20 p-5 shadow-subtle flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold text-graphite uppercase tracking-wider">Último registro</p>
              <p className="mt-2 text-2xl font-bold text-ink font-signifier">
                {lastUser
                  ? new Date(lastUser.createdAt).toLocaleDateString("es-CO", { day: "numeric", month: "short" })
                  : "—"}
              </p>
            </div>
            <Clock className="h-8 w-8 text-rust/30" />
          </div>
        </div>

        {/* ── Toolbar ── */}
        <div className="flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-2.5 h-4.5 w-4.5 text-graphite" />
            <input
              type="text"
              placeholder="Buscar por nombre, email o rol..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-inputs border border-dove/30 bg-pure-white pl-10 pr-4 py-2 text-[14px] placeholder-graphite focus:border-ink focus:outline-none transition-all shadow-xs"
            />
          </div>
          <span className="text-xs font-bold text-graphite rounded-full bg-fog border border-dove/20 px-3 py-1">
            {filteredUsers.length} usuarios
          </span>
        </div>

        {/* ── List/Table Card ── */}
        <div className="rounded-cards bg-pure-white border border-dove/20 shadow-subtle overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-dove/10 bg-fog/50">
                  <th className="px-6 py-4 text-xs font-bold text-graphite uppercase tracking-wider">Usuario</th>
                  <th className="px-6 py-4 text-xs font-bold text-graphite uppercase tracking-wider">Rol</th>
                  <th className="px-6 py-4 text-xs font-bold text-graphite uppercase tracking-wider">Negocio Asignado</th>
                  <th className="px-6 py-4 text-xs font-bold text-graphite uppercase tracking-wider">Fecha Creación</th>
                  <th className="px-6 py-4 text-xs font-bold text-graphite uppercase tracking-wider">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dove/10">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-sm text-graphite">Cargando usuarios...</td>
                  </tr>
                ) : filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-sm text-graphite">No se encontraron usuarios.</td>
                  </tr>
                ) : (
                  filteredUsers.map((u) => (
                    <tr key={u.id} className="hover:bg-fog/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-sky-wash text-xs font-medium text-ink">
                            {u.name.charAt(0).toUpperCase()}
                          </span>
                          <div>
                            <p className="text-sm font-[480] text-ink">{u.name} {u.lastName}</p>
                            <p className="text-xs text-graphite flex items-center gap-1">
                              <Mail className="h-3 w-3" /> {u.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex rounded-lg px-2 py-0.5 text-xs font-medium border uppercase tracking-wider ${
                          u.role === "SUPER_ADMIN" 
                            ? "bg-apricot-wash text-rust border-rust/10" 
                            : "bg-fog text-ash border-dove/15"
                        }`}>
                          {u.role.replace("_", " ")}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {u.businessName ? (
                          <div className="flex items-center gap-1.5 text-sm text-ash font-[430]">
                            <Building className="h-3.5 w-3.5 text-graphite" />
                            {u.businessName}
                          </div>
                        ) : (
                          <span className="text-xs text-dove font-medium">—</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-xs font-semibold text-graphite">
                        {new Date(u.createdAt).toLocaleDateString("es-CO", {
                          day: "numeric", month: "short", year: "numeric"
                        })}
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-pure-white px-2.5 py-0.5 text-xs font-medium text-rust border border-dove/15">
                          <span className="relative flex h-1.5 w-1.5">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rust/30 opacity-60" />
                            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-rust" />
                          </span>
                          Activo
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ── Modal (Steep style drawer) ── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-ink/40 backdrop-blur-xs transition-opacity duration-300">
          <div className="h-full w-full max-w-md bg-pure-white p-8 shadow-subtle flex flex-col justify-between animate-slide-in-right">
            <div>
              <div className="flex items-center justify-between border-b border-dove/10 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-ink" />
                  <h3 className="text-lg font-bold text-ink">Crear Nuevo Usuario</h3>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-full p-1.5 hover:bg-fog transition-colors"
                >
                  <X className="h-5 w-5 text-ash" />
                </button>
              </div>

              {formError && (
                <div className="mb-4 rounded-xl bg-apricot-wash border border-rust/10 p-3.5 text-xs font-semibold text-rust">
                  {formError}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-graphite uppercase tracking-wider mb-1.5">Nombre</label>
                    <input
                      type="text"
                      required
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="Ej. Juan"
                      className="w-full rounded-inputs border border-dove/30 px-3.5 py-2 text-sm focus:border-ink focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-graphite uppercase tracking-wider mb-1.5">Apellido</label>
                    <input
                      type="text"
                      required
                      value={formLastName}
                      onChange={(e) => setFormLastName(e.target.value)}
                      placeholder="Ej. Pérez"
                      className="w-full rounded-inputs border border-dove/30 px-3.5 py-2 text-sm focus:border-ink focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-graphite uppercase tracking-wider mb-1.5">Email</label>
                  <input
                    type="email"
                    required
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    placeholder="Ej. juan.perez@dominio.com"
                    className="w-full rounded-inputs border border-dove/30 px-3.5 py-2 text-sm focus:border-ink focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-graphite uppercase tracking-wider mb-1.5">Rol de Acceso</label>
                  <select
                    value={formRole}
                    onChange={(e) => setFormRole(e.target.value)}
                    className="w-full rounded-inputs border border-dove/30 px-3.5 py-2 text-sm focus:border-ink focus:outline-none transition-colors bg-pure-white"
                  >
                    {ROLE_OPTIONS.map((r) => (
                      <option key={r.value} value={r.value}>{r.label}</option>
                    ))}
                  </select>
                </div>
              </form>
            </div>

            {/* Footer Buttons (Pill shaped Filled Dark CTA paired with Text Link button) */}
            <div className="border-t border-dove/10 pt-4 mt-6 flex items-center justify-end gap-4">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-[15px] font-[450] text-ink hover:text-graphite transition-colors bg-transparent border-0"
              >
                Cancelar
              </button>
              <button
                onClick={handleSubmit}
                disabled={formSubmitting}
                className="rounded-full bg-ink px-5 py-2 text-[15px] font-[450] text-pure-white hover:bg-ink/90 transition-colors flex items-center justify-center gap-1.5 disabled:opacity-50"
              >
                {formSubmitting ? (
                  <>
                    <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                    Creando...
                  </>
                ) : (
                  "Crear Usuario"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
