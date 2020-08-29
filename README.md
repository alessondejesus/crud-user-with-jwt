
## API REST Node com JWT

### v1.0.x

##### v1.0.4 beta

- Melhorias no app.js
- Criação de arquivo auxiliar server.js
- Acesse clicando no link abaixo:
**[Clique Aqui para Acessar a API](https://rest-user-api-asn9006.herokuapp.com/ "Clique Aqui para Acessar a API")**
------------
**MÉTODOS**
**Válidações**
**Base URL:** `https://rest-user-api-asn9006.herokuapp.com/user`
**name** deve ter de 4 a 20 caracteres
**email** deve ser válido como email
**password** deve ter de 4 a 20 caracteres e não deve conter espaços
**token** token deve ser do tipo **Bearer Token**

------------

**GET**
- Obtêm os dados do usuário e um **TOKEN** com expiração de 1 dia
Envie os paramêtros via **BODY**:
```json
{
email: 'emailexample@example.com',
password: 'passwordExample'
}
```
------------

**POST**
- Cria um usuário e obtêm **TOKEN** com expiração de 1 dia
Envie os paramêtros via **BODY**:
```json
{
name: 'name Example',
email: 'emailexample@example.com',
password: 'passwordExample'
}
```

------------

**DELETE**
- Exclui um usuário
Envie os paramêtros via **HEADER**:
```
{
token: 't0k3n.3xamp13.'
}
```
------------

**PATH**
- Em breve...