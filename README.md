# Conector Customizado "Random" para n8n

Este projeto contém um conector (**custom node**) para a plataforma de
automação **n8n**, que utiliza a API do Random.org para gerar um número
aleatório dentro de um intervalo definido.

O conector **Random** possui uma única operação que aceita dois inputs,
**"Min"** e **"Max"**, para gerar o número.\
A execução utiliza obrigatoriamente a API do Random.org para garantir um
número verdadeiramente aleatório.

------------------------------------------------------------------------

## 🚀 Tecnologias Utilizadas

-   Node.js + TypeScript\
-   Docker e Docker Compose\
-   n8n (versão **1.85.4**)\
-   PostgreSQL

------------------------------------------------------------------------

## 🔧 Pré-requisitos

Antes de começar, garanta que você tem os seguintes softwares
instalados:

-   **Docker Desktop**: A ferramenta para criar e gerenciar os
    contêineres.\
-   **Para usuários de Windows**: É necessário ter o **WSL 2**
    (Subsistema do Windows para Linux) ativado. A instalação do Docker
    Desktop geralmente cuida dessa configuração.

------------------------------------------------------------------------

## ⚙️ Como Rodar o Projeto

Siga os passos abaixo para iniciar o ambiente **n8n** com o conector
customizado.

### 1. Clone o Repositório

Primeiro, clone este repositório para a sua máquina local.

``` bash
git clone [URL_DO_SEU_REPOSITORIO_GIT]
cd n8n-random-number-conector
```

### 2. Construa e Inicie os Contêineres

Este projeto utiliza um **Dockerfile** para construir uma imagem
personalizada do **n8n** que já inclui as dependências necessárias (como
o axios).\
O comando abaixo irá construir a imagem e iniciar os serviços do **n8n**
e do banco de dados.

Execute o seguinte comando na raiz do projeto:

``` bash
docker compose up --build -d
```

-   `--build`: Força a construção da imagem a partir do Dockerfile.\
-   `-d`: Roda os contêineres em segundo plano (**detached mode**).

⚠️ O primeiro início pode demorar um pouco mais enquanto o Docker baixa
as imagens e constrói o ambiente.

### 3. Acesse o n8n

Após a conclusão do comando, o ambiente estará no ar.

Abra seu navegador e acesse: <http://localhost:5678>

------------------------------------------------------------------------

## 🧪 Como Testar o Conector

1.  Na interface do **n8n**, clique para criar um **novo workflow**
    (*New workflow*).\
2.  Clique no ícone **+** para adicionar um novo nó.\
3.  Na barra de busca que aparecer, pesquise por **"Random"**.\
4.  Selecione seu conector customizado.\
5.  No painel de configurações do nó, defina os valores de **"Mínimo"**
    e **"Máximo"**.\
6.  Clique no botão **Execute Node** (ícone de play ▶️) para testar.

------------------------------------------------------------------------

📌 Agora seu conector customizado "Random" está pronto para uso dentro
do n8n!
