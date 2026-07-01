## POST `/bussiness/create`


Base URL: `api/bussiness`

Auth: todos los endpoints requieren `cookie` con token JWT

Crea un nuevo negocio.

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
  "phone": "string",
  "email": "string",
  "type": "BARBER | BEAUTY_SALON | HYBRID | SPA | OTHER",
  "cityId": "string (UUID)",
  "address": "string"
}
````

|Campo|Tipo|Requerido|Descripcion|
|---|---|---|---|
|`name`|string|Si|Nombre del negocio|
|`phone`|string|Si|Telefono|
|`email`|string|Si|Email valido|
|`type`|enum|Si|Tipo de negocio|
|`cityId`|string (UUID)|Si|ID de la ciudad|
|`address`|string|No|Direccion|

**Valores de `type`:** `BARBER` `BEAUTY_SALON` `HYBRID` `SPA` `OTHER`

### Response `201`

```json
{
  "id": "uuid"
}
```

### Errores

|Status|Descripcion|
|---|---|
|`400`|Validacion fallida|
|`401`|Token invalido o expirado|
|`403`|No es SUPER_ADMIN|

