## GET `/dashboard`

Base URL: `api/dashboard`

Auth: todos los endpoints requieren `cookie` con token JWT

Retorna métricas generales: negocios activos, clientes registrados, y los más recientes de cada uno.

### Request

**Headers**
| Key | Value |
|-----|-------|
| `cookie` | `<jwt_token>` |

### Response `200`

```json
{
  "activeBusinesses": 0,
  "registeredCustomers": 0,
  "recentlyAddedBusinesses": {
    "total": 0,
    "data": [
      {
        "name": "string",
        "city": "string",
        "bussinessType": "BARBER | BEAUTY_SALON | HYBRID | SPA | OTHER",
        "status": "ACTIVE | INACTIVE | PENDING_ONBOARDING"
      }
    ]
  },
  "recentlyAddedCustomers": {
    "total": 0,
    "data": [
      {
        "name": "string",
        "lastName": "string",
        "email": "string",
        "role": "SUPER_ADMIN | BUSSINESS_MANAGER | EMPLOYEE | CUSTOMER",
        "status": "ACTIVE | INACTIVE"
      }
    ]
  }
}
```

|Campo|Tipo|Descripcion|
|---|---|---|
|`activeBusinesses`|number|Total negocios con estado `ACTIVE`|
|`registeredCustomers`|number|Total clientes registrados|
|`recentlyAddedBusinesses.total`|number|Total negocios recientes|
|`recentlyAddedBusinesses.data[].name`|string|Nombre del negocio|
|`recentlyAddedBusinesses.data[].city`|string|Nombre de la ciudad|
|`recentlyAddedBusinesses.data[].bussinessType`|enum|Tipo de negocio|
|`recentlyAddedBusinesses.data[].status`|enum|Estado del negocio|
|`recentlyAddedCustomers.total`|number|Total clientes recientes|
|`recentlyAddedCustomers.data[].name`|string|Nombre|
|`recentlyAddedCustomers.data[].lastName`|string|Apellido|
|`recentlyAddedCustomers.data[].email`|string|Email|
|`recentlyAddedCustomers.data[].role`|enum|Rol del usuario|
|`recentlyAddedCustomers.data[].status`|enum|Estado del usuario|

**Valores de `bussinessType`:** `BARBER` `BEAUTY_SALON` `HYBRID` `SPA` `OTHER`

**Valores de `status` negocio:** `ACTIVE` `INACTIVE` `PENDING_ONBOARDING`

**Valores de `role`:** `SUPER_ADMIN` `BUSSINESS_MANAGER` `EMPLOYEE` `CUSTOMER`

**Valores de `status` usuario:** `ACTIVE` `INACTIVE`

### Errores

|Status|Descripcion|
|---|---|
|`401`|Token invalido o expirado|
|`403`|No es SUPER_ADMIN|
