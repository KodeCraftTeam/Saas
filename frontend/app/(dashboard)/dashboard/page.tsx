import { Calendar, Users, DollarSign } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Dashboard</h1>
        <p className="text-sm text-neutral-600">Resumen de tu barberia</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="flex items-center gap-4 rounded-xl border border-neutral-200 p-5">
          <Calendar className="h-8 w-8 text-neutral-500" />
          <div>
            <p className="text-2xl font-bold text-neutral-900">0</p>
            <p className="text-sm text-neutral-600">Citas hoy</p>
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-xl border border-neutral-200 p-5">
          <Users className="h-8 w-8 text-neutral-500" />
          <div>
            <p className="text-2xl font-bold text-neutral-900">0</p>
            <p className="text-sm text-neutral-600">Clientes</p>
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-xl border border-neutral-200 p-5">
          <DollarSign className="h-8 w-8 text-neutral-500" />
          <div>
            <p className="text-2xl font-bold text-neutral-900">$0</p>
            <p className="text-sm text-neutral-600">Ingresos del mes</p>
          </div>
        </div>
      </div>
    </div>
  );
}
