## POST `/users`

Base URL: `api/users`

Auth: todos los endpoints requieren `cookie` con token JWT

Crea un nuevo usuario. Contraseña generada automáticamente. Usuario queda en estado `ACTIVE`.

### Request

**Headers**
| Key | Value |
|-----|-------|
| `cookie` | `<jwt_token>` |
| `Content-Type` | `application/json` |

**Body**
```json
{
  "name": "string",
  "lastName": "string",
  "email": "string",
  "role": "SUPER_ADMIN | BUSSINESS_MANAGER | EMPLOYEE | CUSTOMER"
}
```

|Campo|Tipo|Requerido|Descripcion|
|---|---|---|---|
|`name`|string|Si|Nombre del usuario|
|`lastName`|string|Si|Apellido del usuario|
|`email`|string|Si|Email válido (único en el sistema)|
|`role`|enum|Si|Rol asignado al usuario|

**Valores de `role`:** `SUPER_ADMIN` `BUSSINESS_MANAGER` `EMPLOYEE` `CUSTOMER`

### Response `201`

```json
"uuid"
```

Retorna el ID del usuario creado como string.

### Errores

|Status|Descripcion|
|---|---|
|`400`|Email ya existe / Validacion fallida|
|`401`|Token invalido o expirado|
|`403`|No es SUPER_ADMIN|
