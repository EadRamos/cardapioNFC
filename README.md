comandos:
    backend:
        npx sequelize-cli migrations:generate --name create-<name> // cria uma migração
        npx sequelize-cli db:migrate // executa as migrações
        npx sequelize-cli db:migrate:undo:all // desfazer migrações
        npx sequelize-cli db:seed:all // executa os seeds
    frontend:
        npm run dev
        npm run build