# 🎓 Sistema de Gerenciamento de Cursos

**Desenvolvido por:** Bruno Ruthes Pinheiro de Oliveira  
**Data:** Outubro de 2025

---

## 📘 Sobre o Projeto

Este é um sistema web para **gerenciamento de cursos**, desenvolvido com o padrão **MVC (Model-View-Controller)** utilizando **Node.js**, **Express** e **SQLite**.

O projeto foi criado como **atividade acadêmica**, com o objetivo de demonstrar na prática os conceitos de **arquitetura de software** e **desenvolvimento web**.

---

## ⚙️ Funcionalidades

O sistema permite cadastrar cursos com as seguintes informações:

- **Nome do curso:** obrigatório (3–120 caracteres)  
- **Descrição:** opcional  
- **Preço (R$):** obrigatório, valor ≥ 0  
- **Carga horária (h):** obrigatória, mínimo 1 hora  
- **Categoria:** obrigatória (Programação, Banco de Dados, Redes, UX/UI ou Outros)  
- **Status:** ativo/inativo (padrão: ativo)

Também é possível **visualizar** todos os cursos e **desativar** quando necessário.

---

## 🧩 Tecnologias Utilizadas

- **Node.js** – Ambiente de execução JavaScript  
- **Express** – Framework web para Node.js  
- **SQLite** – Banco de dados relacional leve  
- **HTML5** – Estrutura das páginas  
- **CSS3** – Estilização da interface  
- **JavaScript** – Interatividade no frontend  

---

## 🏗️ Arquitetura MVC

O projeto segue o padrão **MVC**, dividindo responsabilidades em:

- **Model:** Entidade `Curso` e regras de validação  
- **Repository:** Acesso ao banco SQLite  
- **Service:** Lógica de negócio  
- **Controller:** Requisições HTTP e integração  
- **View:** Páginas HTML com CSS responsivo  

---

## 📁 Estrutura de Pastas

```bash
mvcbruno/
├── controller/          # Controladores HTTP
├── service/             # Regras de negócio
├── repository/          # Acesso ao banco de dados
├── domain/              # Modelos e entidades
├── views/               # Páginas HTML
├── public/css/          # Arquivos de estilo
├── database/            # Banco SQLite
└── server.js            # Servidor principal
