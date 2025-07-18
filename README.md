# ATVV-WB

Este projeto possui duas aplicações separadas

---

## Pré-requisitos

Antes de começar, verifique se você tem as seguintes ferramentas instaladas:

- [Node.js](https://nodejs.org/) (versão recomendada: **20.x**)
- [MySQL](https://dev.mysql.com/downloads/mysql/) (versão recomendada: **8.0.37**)
- [Git](https://git-scm.com/)

---

## 🚀 Como rodar o projeto

### 1. Clone o repositório

```bash
git clone https://github.com/GabrielViellCastilho/ATVV-WB.git
```

### 2. Preparar o Backend

Abra um terminal e siga os passos:

```bash
cd back
npm install
```

> ⚠️ Configure o arquivo `.env`
 na pasta `back` com a variável `DATABASE_URL` apontando para seu banco de dados MySQL.
 
  Crie um arquivo `.env` na pasta `back` com pelo menos:

```env
DATABASE_URL="mysql://usuario:senha@localhost:3306/nome_do_banco"
```

Depois, execute as migrations e seed para criar as tabelas e popular dados iniciais:

```bash
npx prisma migrate deploy
npx prisma generate
npm run seed
```

Inicie o backend:

```bash
npm run dev
```

O servidor estará rodando em `http://localhost:3069` (ajuste conforme configuração).

---

### 3. Preparar o Frontend

Abra outro terminal para rodar o frontend:

```bash
cd front
npm install
npm start
```

O frontend estará disponível em `http://localhost:3000` (ou a porta configurada).

---

## ⚙️ Configurações importantes

- **Portas:**  
  O backend usa a porta `3069` por padrão, e o frontend `3000`.  
  Ajuste nos arquivos de configuração se necessário.

---

## 📌 Dicas

- Sempre rode o backend antes do frontend para evitar erros de conexão.  
- Use terminais separados para backend e frontend.  
---
