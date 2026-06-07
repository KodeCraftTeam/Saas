/**
 * middleware.ts
 *
 * Middleware global de Next.js para resolución de tenant y guards de autenticación.
 *
 * Responsabilidades:
 * 1. Extraer tenant del subdominio (ej: "joe.tubarberapp.com" → slug "joe")
 * 2. Verificación de rutas protegidas: redirigir a /login si no hay sesión en rutas del dashboard
 * 3. Pasar rutas públicas sin verificar: páginas de marketing, reserva, autenticación
 * 4. Agregar slug del tenant a los headers de solicitud para uso posterior
 *
 * Rutas protegidas: /appointments/*, /clients/*, /barbers/*, /services/*, /settings/*
 * Rutas de autenticación (redirigir si ya inició sesión): /login, /register
 * Rutas públicas: /, /pricing, /book/*
 *
 * Implementación:
 * - Leer sesión de cookie httpOnly
 * - Parsear subdominio del header Host
 * - Lógica de redirección según estado de autenticación y tipo de ruta
 */
