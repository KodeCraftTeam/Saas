# 🏗️ Barber SaaS — Arquitectura del Frontend

## Resumen

Arquitectura del frontend para una aplicación SaaS de Barbería dirigida a barberías y salones pequeños/medianos. Construida con el patrón **Screaming Architecture (Basada en Características)**.

**Stack Tecnológico:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Zod · React Hook Form

---

## Patrón de Arquitectura: Screaming Architecture

La estructura de carpetas "grita" el dominio. Cuando abres `features/`, ves `appointments/`, `clients/`, `barbers/`, `services/`. Cada característica es autocontenida.

### ¿Por qué este patrón?
- **Compatibilidad nativa con Next.js App Router** — Server Actions colocados en features
- **Co-ubicación de características** — todo sobre citas vive en un solo lugar
- **Amigable para equipos pequeños** — no hay taxonomía de capas que memorizar
- **Escala naturalmente** — subdivide características internamente a medida que crecen

---

## Estructura de Directorios

```
frontend/
├── middleware.ts              # Resolución de tenant + guards de autenticación
├── ARCHITECTURE.md            # Este archivo
│
├── app/                       # Next.js App Router (rutas y layouts)
│   ├── (marketing)/           # Páginas públicas (sin autenticación)
│   ├── (auth)/                # Login, registro (redirigir si inició sesión)
│   ├── (dashboard)/           # Área protegida (sidebar + header)
│   └── book/[tenant]/         # Reserva pública por slug
│
├── features/                  # Módulos de lógica de negocio
│   ├── tenant/                # Multi-tenancy
│   ├── auth/                  # Autenticación y autorización
│   ├── appointments/          # Programación de citas
│   ├── clients/               # Gestión de clientes
│   ├── barbers/               # Gestión de barberos/estilistas
│   ├── services/              # Catálogo de servicios
│   ├── dashboard/             # Inicio del dashboard
│   └── settings/              # Configuración de la barbería
│
└── shared/                    # Capa reutilizable e independiente del framework
    ├── components/            # Primitivas de UI, layout, feedback
    ├── hooks/                 # Hooks genéricos de React
    ├── lib/                   # Utilidades (cliente API, fechas, formato)
    ├── types/                 # Tipos comunes de TypeScript
    └── config/                # Constantes, rutas
```

---

## Reglas de Importación (CRÍTICO)

Estas reglas previenen dependencias espagueti:

```
app/        → can import from features/ and shared/
features/   → can import from shared/ and other features/*/types.ts (type-only)
shared/     → cannot import from features/ or app/
```

**Aplicar con ESLint `no-restricted-imports` o revisión manual.**

---

## Estructura del Módulo de Características

Cada característica sigue la misma estructura interna:

```
features/<feature>/
├── components/    # Componentes React (UI para esta característica)
├── hooks/         # Hooks personalizados (obtención de datos, estado)
├── actions/       # Server Actions (Next.js 'use server')
├── types.ts       # Interfaces y tipos de TypeScript
├── constants.ts   # Constantes específicas de la característica (opcional)
├── utils.ts       # Utilidades específicas de la característica (opcional)
└── index.ts       # Exportación barrel (opcional)
```

### ¿Qué va dónde?

| Ubicación | Qué pertenece aquí |
|---|---|
| `components/` | Componentes React que renderizan UI para esta característica |
| `hooks/` | Hooks personalizados que gestionan estado, obtienen datos o encapsulan lógica |
| `actions/` | Server Actions marcados con `'use server'` para mutaciones de datos |
| `types.ts` | Interfaces, enums y definiciones de tipos de TypeScript |
| `constants.ts` | Valores estáticos: etiquetas de estado, colores, configuraciones por defecto |
| `utils.ts` | Funciones puras: formateadores, validadores, calculadoras |

---

## Reglas de la Capa Compartida

### `shared/components/ui/`
Primitivas del sistema de diseño: Button, Input, Modal, Card, Badge, Avatar, Table, Spinner, EmptyState, Toast, DropdownMenu, Select.

**Regla:** Estos componentes deben ser GENÉRICOS. Sin lógica de negocio. Sin props específicas de características.

### `shared/components/layout/`
Componentes de layout: Sidebar, Header, PageContainer, PageHeader.

**Regla:** Estos componen el shell de la página. Reciben configuración a través de props, no del estado de características.

### `shared/components/feedback/`
Feedback al usuario: LoadingSpinner, ErrorBoundary, ErrorFallback.

### `shared/hooks/`
Hooks genéricos: useDebounce, useMediaQuery, useConfirm, useLocalStorage, useClickOutside, useCopyToClipboard, usePagination.

**Regla:** Sin lógica específica de características. Estos hooks trabajan con primitivas (strings, booleanos, elementos DOM).

### `shared/lib/`
Utilidades principales:
- `api-client.ts` — Wrapper de fetch tipado con headers de autenticación
- `cn.ts` — Fusión de classNames (clsx + tailwind-merge)
- `date-utils.ts` — Formateo de fechas con date-fns
- `format.ts` — Formateo de teléfono, moneda, nombre

### `shared/types/`
Tipos comunes: ApiResponse, PaginatedResponse, ApiError, ID, Timestamp, Role, etc.

### `shared/config/`
Constantes de toda la aplicación y definiciones de rutas.

---

## Estrategia de Multi-Tenancy

1. **Basado en subdominio:** `joe.tubarberapp.com` → el slug del tenant es "joe"
2. **Middleware** extrae el tenant del subdominio
3. **TenantProvider** (React Context) pone los datos del tenant disponibles para todos los componentes
4. **Llamadas API** incluyen el contexto del tenant en los headers

---

## Estrategia de Autenticación

1. **JWT almacenado en cookies httpOnly** (no en localStorage)
2. **Sesión vía Server Actions** — `getSession()` lee la cookie del lado del servidor
3. **Acceso basado en roles:** owner, barber, client, super_admin
4. **Componente RoleGuard** renderiza condicionalmente según el rol
5. **Middleware** redirige usuarios no autenticados de rutas protegidas

---

## Dependencias Clave

| Paquete | Propósito |
|---|---|
| `react-hook-form` | Gestión de estado de formularios |
| `@hookform/resolvers` | Integración de Zod para formularios |
| `zod` | Validación de esquemas |
| `date-fns` | Manipulación de fechas |
| `clsx` + `tailwind-merge` | Utilidades de classNames |
| `lucide-react` | Librería de iconos |

---

## Convenciones

### Nomenclatura de Archivos
- **Componentes:** PascalCase (`AppointmentCard.tsx`)
- **Hooks:** camelCase con prefijo `use-` (`use-appointments.ts`)
- **Tipos:** camelCase (`appointment.ts`)
- **Utilidades:** camelCase (`date-utils.ts`)
- **Constantes:** camelCase (`constants.ts`)

### Patrones de Componentes
- Usar `forwardRef` para componentes que necesitan reenvío de refs
- Exportar exports nombrados, no exports por defecto (excepto páginas)
- Interfaz de props nombrada `<Component>Props`
- Usar `cn()` para fusión condicional de classNames

### Server Actions
- Siempre comenzar con `'use server'`
- Validar entrada con esquemas de Zod
- Retornar respuestas tipadas
- Manejar errores elegantemente

### Estilos
- Clases de utilidad de Tailwind CSS v4
- Tokens de diseño vía variables CSS en globals.css
- Sin estilos en línea
- Usar `cn()` para clases condicionales
