Sistema de Gerenciamento de Cursos

Desenvolvido por: Bruno Ruthes Pinheiro de Oliveira
Data: Outubro de 2025

📘 Sobre o Projeto

Este é um sistema web para gerenciamento de cursos, desenvolvido com o padrão MVC (Model-View-Controller) utilizando Node.js, Express e SQLite.

O projeto foi criado como atividade acadêmica, com o objetivo de demonstrar na prática os conceitos de arquitetura de software e desenvolvimento web.

⚙️ Funcionalidades

O sistema permite cadastrar cursos com os seguintes dados:

Nome do curso — obrigatório, entre 3 e 120 caracteres

Descrição — opcional

Preço (R$) — obrigatório, valor ≥ 0

Carga horária (h) — obrigatória, mínimo 1 hora

Categoria — obrigatória (Programação, Banco de Dados, Redes, UX/UI ou Outros)

Status — ativo/inativo (padrão: ativo)

Também é possível visualizar todos os cursos em uma lista e desativar cursos quando necessário.

🧩 Tecnologias Utilizadas

Node.js – Ambiente de execução JavaScript

Express – Framework web para Node.js

SQLite – Banco de dados relacional leve

HTML5 – Estrutura das páginas

CSS3 – Estilização da interface

JavaScript – Interatividade no frontend

🏗️ Arquitetura MVC

O projeto segue o padrão MVC, dividindo as responsabilidades em três camadas:

Model (Modelo)

Entidade Curso com regras de validação

Repositório responsável pelo acesso ao banco SQLite

View (Visão)

Páginas HTML para cadastro e listagem

Estilos modernos e responsivos em CSS

Controller (Controlador)

Gerencia as requisições HTTP

Conecta as Views com os Services

Service (Serviço)

Contém a lógica de negócio

Intermedia Controller e Repository

📁 Estrutura de Pastas
mvcbruno/
├── controller/          # Controladores HTTP
├── service/             # Regras de negócio
├── repository/          # Acesso ao banco de dados
├── domain/              # Modelos e entidades
├── views/               # Páginas HTML
├── public/css/          # Arquivos de estilo
├── database/            # Banco SQLite
└── server.js            # Servidor principal

🚀 Como Executar

Instale as dependências:

npm install


Inicie o servidor:

npm start


Acesse no navegador:

http://localhost:3000

🗄️ Modelo de Dados

Tabela: curso

Campo	Tipo	Descrição
id	Inteiro	Identificador único (PK)
nome	Texto	Até 120 caracteres
descricao	Texto	Opcional
preco	Decimal	Duas casas decimais
carga_horaria	Inteiro	Mínimo 1
categoria	Texto	Até 60 caracteres
ativo	Boolean	Verdadeiro/Falso
criado_em	Data	Data de criação
atualizado_em	Data	Última atualização
🌐 Rotas da Aplicação
Páginas HTML

GET /cursos → Lista de cursos

GET /cursos/novo → Formulário de cadastro

API JSON

GET /api/cursos → Retorna todos os cursos

GET /api/cursos/:id → Retorna um curso específico

POST /cursos → Cadastra novo curso

DELETE /api/cursos/:id → Desativa curso

✅ Validações Implementadas

Nome: obrigatório, 3–120 caracteres
Preço: obrigatório, ≥ 0
Carga horária: obrigatória, mínimo 1 hora
Categoria: obrigatória, deve ser uma das opções válidas

As validações são aplicadas tanto no frontend quanto no backend.

💻 Interface do Usuário

Paleta de cores em tons de roxo e azul

Campos de formulário bem definidos

Mensagens de erro claras

Tabela organizada para listagem

Layout responsivo e moderno

Animações suaves para melhor experiência

🧠 Conceitos Aplicados

Padrão MVC

Repository Pattern

Camada de Serviço (Service Layer)

REST API

Validação em múltiplas camadas

Persistência com banco relacional

Design responsivo

🎯 Objetivos de Aprendizado

Entender e aplicar o padrão MVC

Criar uma aplicação web completa do zero

Implementar validações corretas

Integrar backend e banco de dados

Desenvolver uma interface moderna e funcional

Adotar boas práticas de desenvolvimento

📝 Observações

O banco de dados é criado automaticamente ao iniciar o servidor

Os dados permanecem salvos após reiniciar

O sistema utiliza sessões para mensagens de feedback

Todas as operações são validadas antes da persistência

📚 Projeto acadêmico desenvolvido por
Bruno Ruthes Pinheiro de Oliveira – Outubro de 2025