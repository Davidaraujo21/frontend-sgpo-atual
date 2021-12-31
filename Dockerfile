#Importa a imagem do node 
FROM node:14.17-alpine

#Cria o diretório de trabalho
WORKDIR /app

#Cópia o package.json para dentro do diretório de trabalho do container
COPY package.json  .

#Instala as dependências do package.json
RUN npm install

#Cópia todos os arquivos do diretório raiz da aplicação para o container 
COPY . .

#Inicializa a aplicação
CMD ["npm", "start"]