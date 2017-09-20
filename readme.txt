# Crie um repositorio no github e envie seu projeto de frontend
# Criar um droplet no digital ocean e acessar a partir de ssh
# ssh root@<ip do droplet>
# Senha no seu email
# Ele irá pedir para trocar de senha
# Dentro do droplet, siga as seguintes instruções
apt-get update
apt-get install python3 python3-dev virtualenv mongodb nginx gcc nodejs-legacy npm
git clone https://github.com/gperinazzo/senc_todo_app
cd senc_todo_app
virtualenv -p python3 env
source env/bin/activate
pip install -r requirements.txt
mv todo.service /etc/systemd/system/
systemctl enable todo.service
systemctl start todo.service
mv nginx.conf /etc/nginx/conf.d/
systemctl restart nginx.service