"use client";

import { useEffect, useState } from "react";
import { getBusinesses, createBusiness, getCities, Business, City } from "@/features/super-admin/api";
import { useToast } from "@/shared/components/ui/Toast";
import { Building2, Plus, Search, RefreshCw, X, MapPin, Phone, Mail, CheckCircle2, Clock } from "lucide-react";

export default function BusinessesPage() {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form states
  const [formName, setFormName] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formType, setFormType] = useState("BARBER");
  const [formCityId, setFormCityId] = useState("");
  const [formAddress, setFormAddress] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
  const [formSubmitting, setFormSubmitting] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const [bList, cList] = await Promise.all([getBusinesses(), getCities()]);
      setBusinesses(bList);
      setCities(cList);
      if (cList.length > 0) setFormCityId(cList[0].id);
    } catch (e) {
      console.error("Error loading businesses:", e);
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
      if (!formName || !formPhone || !formEmail || !formCityId || !formAddress) {
        throw new Error("Todos los campos obligatorios deben ser completados.");
      }

      await createBusiness({
        name: formName,
        phone: formPhone,
        email: formEmail,
        type: formType,
        cityId: formCityId,
        address: formAddress,
      });

      toast({
        title: "Negocio registrado",
        description: `El negocio "${formName}" ha sido creado con éxito.`,
        variant: "success",
      });

      // Reset form & reload
      setFormName("");
      setFormPhone("");
      setFormEmail("");
      setFormType("BARBER");
      setFormAddress("");
      setIsModalOpen(false);
      await loadData();
    } catch (err: any) {
      setFormError(err.message || "Error al registrar el negocio");
    } finally {
      setFormSubmitting(false);
    }
  };

  const filteredBusinesses = businesses.filter((b) => {
    const query = searchQuery.toLowerCase();
    return (
      b.name.toLowerCase().includes(query) ||
      b.email.toLowerCase().includes(query) ||
      (b.cityName && b.cityName.toLowerCase().includes(query))
    );
  });

  const totalActive = businesses.filter((b) => b.status === "ACTIVE").length;
  const totalPending = businesses.filter((b) => b.status === "PENDING_ONBOARDING").length;
  const cityCounts = businesses.reduce<Record<string, number>>((acc, b) => {
    const city = b.cityName || "Sin ciudad";
    acc[city] = (acc[city] || 0) + 1;
    return acc;
  }, {});
  const topCityEntry = Object.entries(cityCounts).sort((a, b) => b[1] - a[1])[0];

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-pure-white text-ink font-sohne select-none antialiased">
      {/* ── Top Bar ── */}
      <header className="flex h-16 flex-shrink-0 items-center justify-between border-b border-dove/25 bg-pure-white px-8">
        <div className="flex items-center gap-2 text-[13px] font-[450] text-graphite tracking-[-0.009em]">
          <span>Plataforma</span>
          <span className="text-dove">/</span>
          <span className="font-[480] text-ink">Negocios</span>
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
            Registrar Negocio
          </button>
        </div>
      </header>

      {/* ── Main Content Area ── */}
      <div className="flex-1 overflow-auto px-8 py-8 space-y-6 w-full">
        <div>
          <h1 className="font-signifier text-[44px] font-normal leading-tight tracking-[-0.015em] text-ink">
            Gestión de Negocios
          </h1>
          <p className="mt-1.5 text-[15px] text-ash font-[430]">
            Administra y monitorea todas las barberías, spas y centros de estética registrados en la plataforma.
          </p>
        </div>

        {/* ── Stat strip ── */}
        <div className="grid grid-cols-3 gap-4">
          <div className="rounded-cards bg-pure-white border border-dove/20 p-5 shadow-subtle flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold text-graphite uppercase tracking-wider">Negocios activos</p>
              <p className="mt-2 text-2xl font-bold text-ink font-signifier">{totalActive}</p>
            </div>
            <CheckCircle2 className="h-8 w-8 text-rust/30" />
          </div>

          <div className="rounded-cards bg-apricot-wash p-5 flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold text-rust uppercase tracking-wider">Pendientes de aprobación</p>
              <p className="mt-2 text-2xl font-bold text-rust font-signifier">{totalPending}</p>
            </div>
            <Clock className="h-8 w-8 text-rust/40" />
          </div>

          <div className="rounded-cards bg-pure-white border border-dove/20 p-5 shadow-subtle flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold text-graphite uppercase tracking-wider">Ciudad con más negocios</p>
              <p className="mt-2 text-2xl font-bold text-ink font-signifier">{topCityEntry ? topCityEntry[0] : "—"}</p>
            </div>
            <MapPin className="h-8 w-8 text-rust/30" />
          </div>
        </div>

        {/* ── Toolbar ── */}
        <div className="flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-2.5 h-4.5 w-4.5 text-graphite" />
            <input
              type="text"
              placeholder="Buscar por nombre, email o ciudad..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-inputs border border-dove/30 bg-pure-white pl-10 pr-4 py-2 text-[14px] placeholder-graphite focus:border-ink focus:outline-none transition-all shadow-xs"
            />
          </div>
          <span className="text-xs font-bold text-graphite rounded-full bg-fog border border-dove/20 px-3 py-1">
            {filteredBusinesses.length} negocios
          </span>
        </div>

        {/* ── List/Table Card ── */}
        <div className="rounded-cards bg-pure-white border border-dove/20 shadow-subtle overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-dove/10 bg-fog/50">
                  <th className="px-6 py-4 text-xs font-bold text-graphite uppercase tracking-wider">Negocio</th>
                  <th className="px-6 py-4 text-xs font-bold text-graphite uppercase tracking-wider">Tipo</th>
                  <th className="px-6 py-4 text-xs font-bold text-graphite uppercase tracking-wider">Ubicación / Dirección</th>
                  <th className="px-6 py-4 text-xs font-bold text-graphite uppercase tracking-wider">Contacto</th>
                  <th className="px-6 py-4 text-xs font-bold text-graphite uppercase tracking-wider">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dove/10">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-sm text-graphite">Cargando negocios...</td>
                  </tr>
                ) : filteredBusinesses.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-sm text-graphite">No se encontraron negocios.</td>
                  </tr>
                ) : (
                  filteredBusinesses.map((b) => (
                    <tr key={b.id} className="hover:bg-fog/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-apricot-wash text-xs font-medium text-rust">
                            {b.name.charAt(0).toUpperCase()}
                          </span>
                          <div>
                            <p className="text-sm font-[480] text-ink">{b.name}</p>
                            <p className="text-[11px] text-graphite">ID: {b.id.slice(0, 8)}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex rounded-lg bg-fog border border-dove/15 px-2 py-0.5 text-xs font-medium text-ash capitalize">
                          {b.type.toLowerCase().replace("_", " ")}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-0.5 text-sm text-ash font-[430]">
                          <p className="font-[480] text-ink">{b.cityName || "Bogotá"}</p>
                          <p className="text-xs text-graphite flex items-center gap-1">
                            <MapPin className="h-3 w-3" /> {b.address}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-0.5 text-xs text-ash font-[430]">
                          <p className="flex items-center gap-1 font-medium"><Phone className="h-3.5 w-3.5 text-graphite" /> {b.phone}</p>
                          <p className="flex items-center gap-1 text-graphite"><Mail className="h-3.5 w-3.5" /> {b.email}</p>
                        </div>
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
        <div 
          className="fixed inset-0 z-50 flex items-center justify-end bg-ink/40 backdrop-blur-xs transition-opacity duration-300"
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            className="h-full w-full max-w-md bg-pure-white p-8 shadow-subtle flex flex-col justify-between animate-slide-in-right"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex items-center justify-between border-b border-dove/10 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-ink" />
                  <h3 className="text-lg font-bold text-ink">Registrar Negocio</h3>
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
                <div>
                  <label className="block text-[11px] font-bold text-graphite uppercase tracking-wider mb-1.5">Nombre Comercial</label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="Ej. Barbería El Elegante"
                    className="w-full rounded-inputs border border-dove/30 px-3.5 py-2 text-sm focus:border-ink focus:outline-none transition-colors"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-graphite uppercase tracking-wider mb-1.5">Teléfono</label>
                    <input
                      type="text"
                      required
                      value={formPhone}
                      onChange={(e) => setFormPhone(e.target.value)}
                      placeholder="Ej. +5731234567"
                      className="w-full rounded-inputs border border-dove/30 px-3.5 py-2 text-sm focus:border-ink focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-graphite uppercase tracking-wider mb-1.5">Tipo de Negocio</label>
                    <select
                      value={formType}
                      onChange={(e) => setFormType(e.target.value)}
                      className="w-full rounded-inputs border border-dove/30 px-3.5 py-2 text-sm focus:border-ink focus:outline-none transition-colors bg-pure-white"
                    >
                      <option value="BARBER">Barbería</option>
                      <option value="BEAUTY_SALON">Salón de Belleza</option>
                      <option value="SPA">Spa</option>
                      <option value="HYBRID">Híbrido</option>
                      <option value="OTHER">Otro</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-graphite uppercase tracking-wider mb-1.5">Email de Contacto</label>
                  <input
                    type="email"
                    required
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    placeholder="Ej. admin@negocio.com"
                    className="w-full rounded-inputs border border-dove/30 px-3.5 py-2 text-sm focus:border-ink focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-graphite uppercase tracking-wider mb-1.5">Ciudad</label>
                  <select
                    value={formCityId}
                    required
                    onChange={(e) => setFormCityId(e.target.value)}
                    className="w-full rounded-inputs border border-dove/30 px-3.5 py-2 text-sm focus:border-ink focus:outline-none transition-colors bg-pure-white"
                  >
                    {cities.map((city) => (
                      <option key={city.id} value={city.id}>
                        {city.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-graphite uppercase tracking-wider mb-1.5">Dirección física</label>
                  <input
                    type="text"
                    required
                    value={formAddress}
                    onChange={(e) => setFormAddress(e.target.value)}
                    placeholder="Ej. Calle 10 # 5-20"
                    className="w-full rounded-inputs border border-dove/30 px-3.5 py-2 text-sm focus:border-ink focus:outline-none transition-colors"
                  />
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
                    Registrando...
                  </>
                ) : (
                  "Registrar Negocio"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
