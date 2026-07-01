## GET `/auth/google`

Base URL: `api/auth`

Auth: no requerida

Redirige al flujo de autenticación de Google OAuth 2.0.

### Request

No requiere headers ni body.

### Response `302`

Redirección a `https://accounts.google.com/o/oauth2/v2/auth` con parámetros:

| Param | Descripcion |
|---|---|
| `client_id` | Google Client ID (env var `GOOGLE_CLIENT_ID`) |
| `redirect_uri` | URI de callback (env var `GOOGLE_REDIRECT_URI`) |
| `scope` | `openid email profile` |
| `response_type` | `code` |

### Errores

|Status|Descripcion|
|---|---|
|`400`|Google OAuth no configurado (faltan env vars `GOOGLE_CLIENT_ID` o `GOOGLE_REDIRECT_URI`)|
