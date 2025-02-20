# Démo sendgrid api

Éxemple d'utilisation d'un service de mailing pour un site web.

- Page contact
- Validation d'une adresse Email

L'application a un frontend fait avec Vite

## Installation des dépendances

```bash
cd ./backend
npm install
cd ../backend
npm install
cd ..
```

## Variables d'environnement

```bash
cd ./backend
touch .env
cd ..
```
```
PORT = 3000
JWT_SECRET = JWT_SECRET
MONGO_URI = <Lien vers bdd mongo atlas ou locale>

SENDGRID_SEND = <Email du sender>
SENDGRID_CONTACT = <Email pour recevoir les messages>
SENDGRID_API_KEY = <Clé api sendgrid>

CORS_ORIGIN = http://localhost:5173
```

## Démarage

Backend

```bash
cd ./backend
npm run dev
cd ..
```

Frontend

```bash
cd ./frontend
npm run dev
cd ..
```