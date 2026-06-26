# API Contract — Business

Base URL: `api/bussiness`

Auth: todos los endpoints requieren `cookie` con token JWT

---


## GET `/bussiness/list`

Lista negocios con filtros y paginacion.

### Request

**Headers**

| Key      | Value         |
| -------- | ------------- |
| `cookie` | `<jwt_token>` |
|          |               |

**Query Params**

|Param|Tipo|Requerido|Default|Descripcion|
|---|---|---|---|---|
|`search`|string|No|`''`|Buscar por nombre, email, ciudad|
|`page`|number|No|`1`|Pagina actual|
|`limit`|number|No|`10`|Items por pagina|

**Ejemplo:** `GET /bussiness/list?search=barber&page=1&limit=10`

### Response `200`

```json
{
  "total": 50,
  "page": 1,
  "limit": 10,
  "totalPages": 5,
  "data": [
    {
      "id": "uuid",
      "name": "string",
      "BussinessType": "BARBER | BEAUTY_SALON | HYBRID | SPA | OTHER",
      "city": "string",
      "address": "string",
      "phone": "string",
      "email": "string",
      "bussinessStatus": "ACTIVE | INACTIVE | PENDING_ONBOARDING"
    }
  ]
}
```

|Campo|Tipo|Descripcion|
|---|---|---|
|`total`|number|Total registros con filtros|
|`page`|number|Pagina actual|
|`limit`|number|Items por pagina|
|`totalPages`|number|`ceil(total / limit)`|
|`data[].id`|string (UUID)|ID negocio|
|`data[].name`|string|Nombre|
|`data[].BussinessType`|enum|Tipo|
|`data[].city`|string|Nombre ciudad|
|`data[].address`|string|Direccion|
|`data[].phone`|string|Telefono|
|`data[].email`|string|Email|
|`data[].bussinessStatus`|enum|`ACTIVE` / `INACTIVE` / `PENDING_ONBOARDING`|

### Errores

|Status|Descripcion|
|---|---|
|`401`|Token invalido o expirado|
|`403`|No es SUPER_ADMIN|