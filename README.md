# Velo Trip Matching Service

Este é o microsserviço responsável pelo gerenciamento do ciclo de vida das corridas (trip matching) da plataforma. Ele é construído utilizando [NestJS](https://nestjs.com/) e Prisma como ORM.

## Funcionalidades Implementadas

O serviço gerencia as mudanças de estado de uma corrida (Trip), desde a solicitação inicial pelo passageiro até sua conclusão pelo motorista. Os estados possíveis são:
`SEARCHING` -> `MATCHED` -> `ARRIVED` -> `IN_PROGRESS` -> `COMPLETED` (ou `CANCELLED`).

### Rotas da API (`/api/v1/match`)

#### Passageiro (Requer Role: `PASSENGER`)
* **`POST /request`**: Solicita uma nova corrida. O status inicial será `SEARCHING`. (Recebe `CreateTripDto`)
* **`DELETE /cancel/:trip_id`**: Cancela uma corrida caso ela ainda esteja nos estados `SEARCHING` ou `MATCHED`.

#### Motorista (Requer Role: `DRIVER`)
* **`GET /available-trips?lat=x&lng=y`**: Lista corridas disponíveis (status `SEARCHING`).
* **`POST /accept`**: Aceita uma corrida. Altera o status de `SEARCHING` para `MATCHED` e vincula o motorista à corrida. (Recebe `trip_id`)
* **`POST /decline`**: Declina/recusa uma corrida proposta.
* **`PATCH /trip/:trip_id/arrive`**: Informa que o motorista chegou ao local de embarque. Altera o status de `MATCHED` para `ARRIVED`.
* **`POST /start`**: Inicia a viagem. Altera o status de `MATCHED` (ou `ARRIVED`) para `IN_PROGRESS`. (Recebe `TripActionDto` com `tripId`)
* **`POST /complete`**: Finaliza a viagem. Altera o status de `IN_PROGRESS` para `COMPLETED`. Também contém o gatilho (stub) para integração de eventos de faturamento/notificação pós-corrida. (Recebe `TripActionDto` com `tripId`)

#### Geral / Status
* **`GET /status/:trip_id`**: Retorna o status e os dados atuais de uma corrida específica.

## Autenticação e Autorização

Todas as rotas sob `/api/v1/match` são protegidas por:
- `JwtAuthGuard`: Exige um token JWT válido para identificar o usuário.
- `RolesGuard`: Restringe o acesso aos endpoints baseando-se no papel do usuário (`PASSENGER` ou `DRIVER`), usando o decorador `@Roles()`.

Além das roles, o serviço implementa validações de IDOR (Insecure Direct Object Reference) garantindo que:
- Um passageiro só possa interagir com suas próprias corridas.
- Um motorista só consiga iniciar/finalizar/atualizar as viagens com as quais ele mesmo foi pareado.

## Como rodar o projeto

```bash
# Instalar dependências
$ npm install

# Executar em modo de desenvolvimento
$ npm run start:dev

# Executar em produção
$ npm run start:prod
```
