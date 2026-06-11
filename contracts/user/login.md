## login

### request

```json
api/auth/login

{
  "email": "string",
  "password": "string"
}
```

### response

```json
{
  "token": "string",
  "name": "string",
  "lastName": "string",
  "role": Role
}
```
```ts
export enum Role {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  EMPLOYEE = 'EMPLOYEE',
  CUSTOMER = 'CUSTOMER',
}
```
