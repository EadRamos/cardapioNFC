** Atualização e instalação das ferramantas básicas

Atualizar o sistema
- `sudo apt update && sudo apt upgrade -y`

Dependências utilizadas
- `sudo apt install -y git curl gnupg2`

Tente a versão lts pela url abaixo:
- `curl -sL https://deb.nodesource.com/setup_lts.x | sudo -E bash -`
- `sudo apt install -y nodejs`

Banco de dados
- `sudo apt install -y default-mysql-server && mysql_secure_installation`
- Digite usuário e senha (root, root)
- `sudo mysql -u root -p -e "CREATE DATABASE <nome-do-banco>"`
- `sudo mysql -u root -p -e "CREATE USER '<nome-user>'@'localhost' IDENTIFIED BY '<senha>';"`
- `sudo mysql -u root -p -e "GRANT ALL PRIVILEGES ON <nome-do-banco>.* TO '<nome-user>'@'localhost';"`
- `sudo mysql -u root -p -e "FLUSH PRIVILEGES;"`

Caso precise entra no serviço do mysql
- `sudo mysql -u root -p`

se ocorrer um erro de bind-address
- `sudo nano /etc/mysql/my.cnf`
- comente a linha bind-address

Ative inicialização automatica
- `sudo systemctl enable mysql`

** Clonar repositório
- `git clone <repositorio-git>`
- `cd cardapioNFC/back`
- `npm install --production`
- `npx sequelize-cli db:migrate`
- `npx sequelize-cli db:seeder:all`
- `cd ../front`
- `npm install --production`
- `rm -rf /var/www/frontend/*`
- `rm -rf dist/*`
- `npm run build`
- `cp -r dist/* /var/www/frontend/`

** Pm2 para gerênciar serviços
- `sudo npm install -g pm2`

no diretorio do backend
- `sudo nano ecosystem.config.js`
- ```
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env.prod') });

module.exports = {
  apps: [{
    name: "backend",
    script: "npm",
    args: "run start",
    env: {
      // Carrega variáveis de arquivo externo
      ...process.env
    }
  }]
};
```
- `pm2 start ecosystem.config.js`
- `pm2 save` salva os processos
- `pm2 startup` inicialização automatica

- `pm2 list` veja os serviços rodando

** Nginx para proxy reverso
- `sudo apt install -y nginx`
criar arquivo de configuração desse app
- `sudo nano /etc/nginx/sites-available/<nome-do-app>`
- ```
    server {
        listen 80; # porta do servidor
        server_name <ip ou dns>;

        # frontend
        location / {
            root /cardapioNFC/front/dist; # caminho absoluto
            index index.html; # arquivo principal
            try_files $uri $uri/ /index.html =404; # app vue sempre index
            # Headers importantes para SPAs
            add_header Cache-Control "no-cache, no-store, must-revalidate";
            expires 0;
        }

        #backend
        location /api/ {
            proxy_pass http://localhost:8001/api; # /api tira o prefixo
            proxy_set-header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        }
    }
```
ative a configuração no nginx
- `sudo ln -s /etc/nginx/sites-available/<nome-do-app> /etc/nginx/sites-enable`
teste a configuração
- `sudo nginx -t`
- `sudo systemctl restart nginx`

** Talvez seja necessario
configurar firewall
- `sudo apt install ufw -y`
- `sudo ufw allow OpenSSh`
- `sudo ufw allow 'Nginx Full'`
- `sudo ufw enable`

** Verificação de logs
- `pm2 logs`
- `journalctl -u nginx -f`

**Possivel deploy scripts
- ```
#!/bin/bash
git pull origin main
cd back && npm install && pm2 restart backend
cd ../front && npm install && npm run build
```