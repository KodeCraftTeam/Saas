## GET `/location/cities`

Base URL: `api/location`

Auth: no requerida

Retorna lista de todas las ciudades disponibles, ordenadas alfabéticamente.

### Request

No requiere headers ni body.

### Response `200`

```json
[
  {
    "id": "uuid",
    "name": "string"
  }
]
```

|Campo|Tipo|Descripcion|
|---|---|---|
|`id`|string (UUID)|ID de la ciudad|
|`name`|string|Nombre de la ciudad|

### Errores

|Status|Descripcion|
|---|---|
|`500`|Error interno del servidor|
