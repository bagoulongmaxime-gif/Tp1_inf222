# INF222 - TAF1 API Blog

## Description
API backend pour la gestion d'articles de blog, réalisée pour l'UE INF222 EC1 (développement backend). Utilise Node.js, Express, SQLite, Sequelize, et Swagger.

## Installation

1. `cd "/home/maxius/tp1 inf222"`
2. `npm install`
3. `npm run dev` (ou `npm start`)

L'API est disponible sur `http://localhost:3000`.

## Endpoints

- GET `/api/articles` (optionnel : `?category=...,?author=...,?date=YYYY-MM-DD`)
- GET `/api/articles/:id`
- POST `/api/articles`
- PUT `/api/articles/:id`
- DELETE `/api/articles/:id`
- GET `/api/articles/search?query=texte`

## Swagger

La documentation Swagger est disponible sur : `http://localhost:3000/api/docs`

## Modèle Article

- title (string, non vide)
- content (text, non vide)
- author (string, non vide)
- date (date)
- category (string)
- tags (array de string, JSON)

## Exemples

### Créer un article

POST `/api/articles`

```json
{
  "title": "Premier article",
  "content": "Contenu...",
  "author": "John Doe",
  "category": "Tech",
  "tags": ["nodejs", "backend"]
}
```

### Rechercher

GET `/api/articles/search?query=backend`

## Notes
- Validation basique présente.
- Codes HTTP corrects (201, 200, 400, 404, 500).

## Rapport

- Page de garde : NOM PRÉNOM MATRICULE
- Introduction, Partie 1 (Utilisation de CleeRoute), Partie 2 (API), Partie 3 (analyse critique), Conclusion.
