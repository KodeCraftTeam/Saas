## GET `/auth/google/callback`

Base URL: `api/auth`

Auth: no requerida (callback de Google)

Procesa el código de autorización de Google, genera JWT y establece cookie de sesión. Redirige al dashboard del frontend.

### Request

**Query Params**
| Param | Tipo | Requerido | Descripcion |
|---|---|---|---|
| `code` | string | Si | Código de autorización recibido de Google |

**Ejemplo:** `GET /auth/google/callback?code=4/0AX4XfWi...`

### Response `302`

Redirección a `http://localhost:3000/dashboard`.

Cookie establecida en la respuesta:

| Cookie | Descripcion |
|---|---|
| `token` | JWT firmado, `httpOnly`, `sameSite: lax`, expira en 7 días |

### Errores

|Status|Descripcion|
|---|---|
|`400`|Código de autorización inválido o expirado|
|`401`|No se pudo autenticar con Google|
