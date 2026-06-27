## GET `/users/list`

Base URL: `api/users`

Auth: todos los endpoints requieren `cookie` con token JWT (rol `SUPER_ADMIN`)

Lista los usuarios con paginacion y busqueda opcional por nombre, email o rol.

### Request

**Headers**
| Key | Value |
|-----|-------|
| `cookie` | `<jwt_token>` |

**Query Params**
|Param|Tipo|Requerido|Default|Descripcion|
|---|---|---|---|---|
|`search`|string|No|-|Filtra por `name`, `email` o `role` (case-insensitive)|
|`page`|number|No|`1`|Numero de pagina|
|`limit`|number|No|`10`|Cantidad de registros por pagina|

**Ejemplo:** `GET /users/list?search=david&page=1&limit=10`

### Response `200`

```json
{
  "total": 1,
  "page": 1,
  "limit": 10,
  "totalPages": 1,
  "data": [
    {
      "id": "uuid",
      "name": "string",
      "lastName": "string",
      "email": "string",
      "role": "SUPER_ADMIN | BUSSINESS_MANAGER | EMPLOYEE | CUSTOMER",
      "createdAt": "2026-06-23T14:30:00.000Z",
      "bussinessName": "string | null",
      "status": "ACTIVE | INACTIVE"
    }
  ]
}
```

|Campo|Tipo|Descripcion|
|---|---|---|
|`total`|number|Total de usuarios que cumplen el filtro|
|`page`|number|Pagina actual|
|`limit`|number|Registros por pagina|
|`totalPages`|number|Total de paginas|
|`data`|array|Lista de usuarios|
|`data[].id`|string (UUID)|ID del usuario|
|`data[].name`|string|Nombre|
|`data[].lastName`|string|Apellido|
|`data[].email`|string|Email|
|`data[].role`|enum|Rol del usuario|
|`data[].createdAt`|string (ISO 8601)|Fecha de creacion en UTC|
|`data[].bussinessName`|string \| null|Nombre del negocio asociado, `null` si no tiene|
|`data[].status`|enum|Estado del usuario|

**Valores de `role`:** `SUPER_ADMIN` `BUSSINESS_MANAGER` `EMPLOYEE` `CUSTOMER`

**Valores de `status`:** `ACTIVE` `INACTIVE`

### Errores

|Status|Descripcion|
|---|---|
|`401`|Token invalido o expirado|
|`403`|No es SUPER_ADMIN|
