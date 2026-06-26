## POST `/auth/login`

Base URL: `api/auth`

Auth: no requerida

Autentica al usuario con email y password. Establece cookie JWT en la respuesta.

### Request

**Headers**
| Key | Value |
|-----|-------|
| `Content-Type` | `application/json` |

**Body**
```json
{
  "email": "string",
  "password": "string"
}
```

|Campo|Tipo|Requerido|Descripcion|
|---|---|---|---|
|`email`|string|Si|Email del usuario|
|`password`|string|Si|Contraseña del usuario|

### Response `200`

Cookie `token` establecida (httpOnly, sameSite: lax, expira en 7 días).

```json
{
  "name": "string",
  "lastName": "string",
  "role": "SUPER_ADMIN | BUSSINESS_MANAGER | EMPLOYEE | CUSTOMER"
}
```

|Campo|Tipo|Descripcion|
|---|---|---|
|`name`|string|Nombre del usuario|
|`lastName`|string|Apellido del usuario|
|`role`|enum|Rol del usuario autenticado|

**Valores de `role`:** `SUPER_ADMIN` `BUSSINESS_MANAGER` `EMPLOYEE` `CUSTOMER`

### Errores

|Status|Descripcion|
|---|---|
|`400`|Validacion fallida|
|`401`|Credenciales incorrectas|
