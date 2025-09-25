# Usa a imagem oficial do n8n como base
FROM n8nio/n8n:1.85.4

# Copia os arquivos de dependência primeiro para aproveitar o cache do Docker
WORKDIR /data
COPY package.json package-lock.json ./

# Instala todas as dependências 
RUN npm install

# Copia o resto do código-fonte (a pasta 'nodes')
COPY ./nodes ./nodes

# Copia o arquivo de configuração do TypeScript
COPY tsconfig.json .

# COMPILA o código TypeScript para JavaScript
RUN npm run build

# Remove as dependências de desenvolvimento para deixar a imagem final menor
RUN npm prune --production

# Copia os arquivos JAVASCRIPT compilados para a pasta de customização do n8n
RUN cp -r /data/dist/* /home/node/.n8n/custom/