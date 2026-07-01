/**
 * features/super-admin/api.ts
 *
 * Funciones de integración con el backend para la plataforma de Super Administrador.
 */

export interface Business {
  id: string;
  name: string;
  phone: string;
  email: string;
  type: 'BARBER' | 'BEAUTY_SALON' | 'HYBRID' | 'SPA' | 'OTHER';
  status: 'ACTIVE' | 'INACTIVE' | 'PENDING_ONBOARDING';
  address: string;
  cityId: string;
  cityName?: string;
  createdAt: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  lastName: string;
  role: string;
  status: string;
  createdAt: string;
  businessId?: string | null;
  businessName?: string | null;
}

export interface PlatformStats {
  activeBusinesses: number;
  registeredUsers: number;
  platformRevenue: number;
  activeBusinessesDelta?: string;
  registeredUsersDelta?: string;
}

export interface City {
  id: string;
  name: string;
}

const BACKEND_URL = "http://localhost:3001/api";

/** Backend shape de GET /bussiness/list — nombres denormalizados, sin cityId ni createdAt. */
interface BussinessReadModel {
  id: string;
  name: string;
  BussinessType: Business["type"];
  city: string;
  address: string;
  phone: string;
  email: string;
  bussinessStatus: Business["status"];
}

/** Backend shape de GET /users/list */
interface UserReadModel {
  id: string;
  name: string;
  lastName: string;
  email: string;
  role: string;
  createdAt: string;
  bussinessName: string | null;
  status: string;
}

/** Backend shape de GET /dashboard */
interface GetDashboardDto {
  activeBusinesses: number;
  registeredCustomers: number;
  recentlyAddedBusinesses: { total: number; data: unknown[] };
  recentlyAddedCustomers: { total: number; data: unknown[] };
}

function mapBusiness(b: BussinessReadModel): Business {
  return {
    id: b.id,
    name: b.name,
    phone: b.phone,
    email: b.email,
    type: b.BussinessType,
    status: b.bussinessStatus,
    address: b.address,
    cityId: "", // el read-model de listado no expone el id, solo el nombre resuelto
    cityName: b.city,
    createdAt: "", // no expuesto por /bussiness/list todavía
  };
}

function mapUser(u: UserReadModel): User {
  return {
    id: u.id,
    email: u.email,
    name: u.name,
    lastName: u.lastName,
    role: u.role,
    status: u.status,
    createdAt: u.createdAt,
    businessId: null, // /users/list solo expone el nombre del negocio, no el id
    businessName: u.bussinessName,
  };
}

// ── GET CITIES ──
export async function getCities(): Promise<City[]> {
  try {
    const res = await fetch(`${BACKEND_URL}/location/cities`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    if (!res.ok) throw new Error("Error fetching cities");
    return await res.json();
  } catch (error) {
    console.warn("[SuperAdmin API] Fallback to mock cities due to backend error:", error);
    return [
      { id: "bogota-uuid", name: "Bogotá" },
      { id: "medellin-uuid", name: "Medellín" },
      { id: "cali-uuid", name: "Cali" },
      { id: "barranquilla-uuid", name: "Barranquilla" },
    ];
  }
}

// ── GET STATS ──
export async function getPlatformStats(): Promise<PlatformStats> {
  const res = await fetch(`${BACKEND_URL}/dashboard`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
  if (!res.ok) throw new Error("Error fetching platform stats");
  const dto: GetDashboardDto = await res.json();

  return {
    activeBusinesses: dto.activeBusinesses,
    registeredUsers: dto.registeredCustomers,
    platformRevenue: 0, // no hay modelo de facturación en backend todavía
    activeBusinessesDelta: dto.recentlyAddedBusinesses.total > 0 ? `+${dto.recentlyAddedBusinesses.total}` : undefined,
    registeredUsersDelta: dto.recentlyAddedCustomers.total > 0 ? `+${dto.recentlyAddedCustomers.total}` : undefined,
  };
}

// ── GET BUSINESSES ──
export async function getBusinesses(): Promise<Business[]> {
  const res = await fetch(`${BACKEND_URL}/bussiness/list?limit=100`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
  if (!res.ok) throw new Error("Error fetching businesses");
  const json = await res.json();
  return (json.data as BussinessReadModel[]).map(mapBusiness);
}

// ── GET USERS ──
export async function getUsers(): Promise<User[]> {
  const res = await fetch(`${BACKEND_URL}/users/list?limit=100`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
  if (!res.ok) throw new Error("Error fetching users");
  const json = await res.json();
  return (json.data as UserReadModel[]).map(mapUser);
}

// ── CREATE BUSINESS ──
export async function createBusiness(data: {
  name: string;
  phone: string;
  email: string;
  type: string;
  cityId: string;
  address: string;
}): Promise<{ id: string }> {
  const res = await fetch(`${BACKEND_URL}/bussiness/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Error al crear el negocio");
  }
  return await res.json();
}

// ── CREATE USER ──
export async function createUser(data: {
  email: string;
  name: string;
  lastName: string;
  role: string;
}): Promise<{ userId: string }> {
  const res = await fetch(`${BACKEND_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Error al crear el usuario");
  }
  return await res.json();
}
