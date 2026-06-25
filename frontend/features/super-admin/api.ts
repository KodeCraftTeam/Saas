/**
 * features/super-admin/api.ts
 * 
 * Funciones de integración con el backend para la plataforma de Super Administrador.
 * Si las rutas no están implementadas en el backend, devuelven datos mockeados y registran un aviso en consola.
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

// ── GET CITIES ──
export async function getCities(): Promise<City[]> {
  try {
    const res = await fetch(`${BACKEND_URL}/location/cities`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
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
  try {
    const res = await fetch(`${BACKEND_URL}/super-admin/stats`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) throw new Error("Error fetching stats");
    return await res.json();
  } catch (error) {
    console.warn("[SuperAdmin API] Fallback to mock stats (endpoint GET /api/super-admin/stats not found):", error);
    return {
      activeBusinesses: 2,
      registeredUsers: 1,
      platformRevenue: 0,
      activeBusinessesDelta: "+2",
      registeredUsersDelta: "+1",
    };
  }
}

// ── GET BUSINESSES ──
export async function getBusinesses(): Promise<Business[]> {
  try {
    const res = await fetch(`${BACKEND_URL}/super-admin/businesses`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) throw new Error("Error fetching businesses");
    return await res.json();
  } catch (error) {
    console.warn("[SuperAdmin API] Fallback to mock businesses (endpoint GET /api/super-admin/businesses not found):", error);
    return [
      {
        id: "f7f01c34",
        name: "KodeCraft Barberia",
        phone: "+57 312 456 7890",
        email: "contacto@barberia.com",
        type: "BARBER",
        status: "ACTIVE",
        address: "Calle 85 #11-34",
        cityId: "bogota-uuid",
        cityName: "Bogotá",
        createdAt: "2026-06-24T14:30:00Z",
      },
      {
        id: "262ab4f2",
        name: "KodeCraft Spa Medellín",
        phone: "+57 300 987 6543",
        email: "medellin@spa.com",
        type: "SPA",
        status: "ACTIVE",
        address: "Carrera 43A #5A-20",
        cityId: "medellin-uuid",
        cityName: "Medellín",
        createdAt: "2026-06-24T14:32:00Z",
      },
    ];
  }
}

// ── GET USERS ──
export async function getUsers(): Promise<User[]> {
  try {
    const res = await fetch(`${BACKEND_URL}/super-admin/users`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) throw new Error("Error fetching users");
    return await res.json();
  } catch (error) {
    console.warn("[SuperAdmin API] Fallback to mock users (endpoint GET /api/super-admin/users not found):", error);
    return [
      {
        id: "usr-01",
        email: "kodeCraft@gmail.com",
        name: "Super",
        lastName: "Admin",
        role: "SUPER_ADMIN",
        status: "ACTIVE",
        createdAt: "2026-06-23T09:00:00Z",
        businessId: null,
        businessName: null,
      },
      {
        id: "usr-02",
        email: "david@owner.com",
        name: "David",
        lastName: "Owner",
        role: "OWNER",
        status: "ACTIVE",
        createdAt: "2026-06-24T14:30:00Z",
        businessId: "f7f01c34",
        businessName: "KodeCraft Barberia",
      },
    ];
  }
}

// ── CREATE BUSINESS ──
export async function createBusiness(data: {
  name: string;
  phone: string;
  email: string;
  type: string;
  cityId: string;
  address: string;
}): Promise<any> {
  const res = await fetch(`${BACKEND_URL}/bussiness/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
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
  businessId?: string;
}): Promise<any> {
  const res = await fetch(`${BACKEND_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Error al crear el usuario");
  }
  return await res.json();
}
