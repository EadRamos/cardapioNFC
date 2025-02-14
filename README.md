**Apresentação**

O projeto está dividido no serviço backend, disponibilizando uma API com mesmo domínio porém acrescentado o prefixo api, e o frontend o qual consome dados fornecidos nos endpoints da API. A decisão de fazer a apliação com serviços separados veio da necessidade de consumir os mesmos dados em outras verções da apliação (aplicativo mobile).

**Tecnologias

Backend:
    - node.js
    - express
    - sequelize
    - jwt
    - bcryptjs
    - pg (postgres)
    - sequelize-cli (dependência de desenvolvimento)
    - dotenv
Frontend:
    - axios
    - vue-router
    - pinia
    - vue
    - vite

Para iniciar a aplicação é necessário configurar um banco de dados local ou utilizar um banco de dados de testes, especificando os campos necessários no .env igualmente o arquivo .envEx.

**Princípais pastas e arquivos

Back:
    - src/config
        - db.js (arquivo de exportação de variáveis do BD referêntes a devellopment e production)
        - router.js (gerenciamento de rotas para o express)
        - sequelize.js (instância do sequelize conectada ao BD)
    - src/services
        - LoginService.js (classe com métodos para gerenciamento de token para login)
    - src
        - App.js (arquivo principal do backend)
Front:
    - src/router
        - router.js (arquivos de roteamento do vue-router)
    - src/services
        - api.js (arquivo de configuração do axios para consumo da api)
    - src
        - main.ja (arquivo principal de inicialização do vue)

**Comandos usuais

backend (dentro da pasta back):
    - `npm install // instalar as dependências`
    - `npm run start // inicializa em modo produção`
    - `npm run startdev // inicializa em modo desenvolvimmento`
    - `npm run deploy // executa o deploy da apliacação rodando as migration e iniciando`
    - `npx sequelize-cli migration:generate --name create-<name> // cria uma migração`
    - `npx sequelize-cli db:migrate // executa as migrações`
    - `npx sequelize-cli db:migrate:undo:all // desfazer migrações`
    - `npx sequelize-cli db:seed:all // executa os seeds`
frontend (dentro da pasta front):
    - `npm run dev // inicialliza em modo desenvolvimento`
    - `npm run build // inicializa em modo produção`
