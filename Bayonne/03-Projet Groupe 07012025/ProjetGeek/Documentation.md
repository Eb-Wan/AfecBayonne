# GeekProject

Un site de vente en ligne pour les fans de culture geek, il permet la vente ou le don d’objets geek (jeux vidéo, consoles, figurines, vêtements, …).

Lien versel : https://projet-geek.vercel.app/

Lien GitHub : https://github.com/MilasO1/ProjetGeek

### Table des matières

1. Description
2. Technologies utilisées
3. Installation et configuration
4. Utilisation
5. Arborescence du projet
6. Documentation API
7. Rapport
8. Contribution

## 1° Description

## 2° Technologies utilisées

Le projet a été construit avec les technologies suivantes :

- **Frontend** : React.js
- **Backend** : Node.js -> Express, bcrypt
- **Base de données** : MongoDB -> Mongoose
- **Authentification** : JWT (JSON Web Token)
- **Test** : Postman
- **Repository** : GitHub
- **Gestion** : Trello

## 3° Installation et configuration

On a besoin au préalable de Node, MongoDB, Postman, GitHub et d’un éditeur de code.
Puis on installe à l’aide du terminal ( avec la commande : npm i “dependencies”) les dépendances suivante:

```
"dependencies": {
"bcrypt": "^5.1.1",
"cloudinary": "^2.5.1",
"cors": "^2.8.5",
"dotenv": "^16.4.7",
"express": "^4.21.2",
"fs": "^0.0.1-security",
"jsonwebtoken": "^9.0.2",
"mongoose": "^8.9.3",
"multer": "^1.4.5-lts.1",
"nodemon": "^3.1.9"
}
```

Ensuite, on va configurer les variables d’environnement en créant un fichier .env dans la racine avec les variables suivantes :

```
MONGO_URI = lien de la base de donnée
PORT = port du serveur local
JWT_SECRET = la clé du token
CLOUD_NAME = nom de cloudinary
API_KEY= clé de cloudinary
API_SECRET= mdp de cloudinary
```

Pour lancer le serveur, nous faisons la commande dans le terminal :

` npm start`

## 4° Utilisation

Fonctionnalités principales de notre projet:

- **Inscription** et **connection** pour acheter ou vendre/donner.
- **Création** et **suppression** d'une annonce.
- **Ajouter** et **retirer** du panier.
- **Passer** une commande.

Fonctionnalités secondaires de notre projet:

- **Rechercher** une annonce par catégorie.
- **Consulter** l'historique d'une commande.

## 5° Arborescence du projet

**Carte Mentale** du projet : https://mm.tt/app/map/3572362517?t=hh6hFX2Qa1

```
project/
├── src/
│   ├── config/
│   │   └── database.js         # Configuration de la connexion MongoDB
│   │
│   ├── controllers/
│   │   ├── authController.js   # Gestion des utilisateurs

│   │   ├── cartController.js   # Gestion du panier│   │   ├── adController.js     # Gestion des annonces
│   │   └── orderController.js  # Gestion des commandes
│   │
│   ├── models/
│   │   ├── User.js             # Modèle utilisateur
│   │   ├── Ad.js               # Modèle annonce
│   │   ├── Cart.js             # Modèle panier
│   │   └── Order.js            # Modèle commande
│   │
│   ├── routes/
│   │   ├── authRoutes.js       # Routes pour les utilisateurs
│   │   ├── adRoutes.js         # Routes pour les annonces
│   │   ├── cartRoutes.js       # Routes pour les paniers
│   │   └── orderRoutes.js      # Routes pour les commandes
│   │
│   ├── middlewares/
│   │   ├── authMiddleware.js   # Middleware d'authentification
│   │   └── errorHandler.js     # Gestion des erreurs globales
│   │
│   ├── utils/
│   │   ├── validateInput.js    # Validation des données d'entrée
│   │   └── jwtUtils.js         # Génération et vérification des tokens JWT
│   │
│   ├── app.js                  # Configuration principale de l'application
│   └── server.js               # Point d'entrée du serveur
│
├── tests/
│   ├── auth.test.js            # Tests pour l'authentification
│   ├── ad.test.js              # Tests pour les annonces
│   └── cart.test.js            # Tests pour le panier
│
├── public/                     # Dossier pour les fichiers statiques (si besoin)
│
├── .env                        # Variables d'environnement
├── .gitignore                  # Fichiers à ignorer par Git
├── package.json                # Dépendances et scripts du projet
└── README.md                   # Documentation du projet
```

## 6° Documentation API

Voici une liste des routes disponibles :

### **Gestion des Utilisateurs**

- GET /api/users/ : Récupère la liste des utilisateurs.

**Exemple de réponse sur Postman :**

```
json

[
    {
        "_id": "678fb76855ee46bedf30aef2",
        "name": "ayoub",
        "email": "ayoub@gmail.com",
        "password": "$2b$10$lrKE6KprfVpL9gOjLtdw7.mfkOubK.Sd2Q.SGVZ/zSEDi2lbnY7pK",
        "createdAt": "2025-01-21T15:04:08.216Z",
        "updatedAt": "2025-01-21T15:04:08.216Z",
        "__v": 0
    },
    {
        "_id": "678fbb4f9f43181898a5374a",
        "name": "victor",
        "email": "victor@gmail.com",
        "password": "$2b$10$bqVa73uOFIE5t9jw9w8bSufUA03HnxDlkgx.JHbYaDzcpF7Qy9HI.",
        "createdAt": "2025-01-21T15:20:47.420Z",
        "updatedAt": "2025-01-21T15:20:47.420Z",
        "__v": 0
    }
]
```

- POST /api/users/create : Inscription (email, mot de passe crypté, nom)
- POST /api/users/login : Connection avec JWT (authentification).
- POST /api/users/logout : Déconnection
- DELETE /api/users/remove/:id : Supprimer un utilisateur.

### **Gestion des Annonces**

- GET /api/ads/ : Récupère la liste des annonces.

**Exemple de réponse sur Postman :**

```
json

[
    {
        "_id": "67923973d2b9228cec2fc688",
        "categorie": "jeux",
        "title": "ps5",
        "description": "c'est une console",
        "type": "vente",
        "price": 500,
        "public_id": "images/yo8dvcbf6pjrasqqg7il",
        "urlImage": "https://res.cloudinary.com/dpifmxt7i/image/upload/v1737636213/images/yo8dvcbf6pjrasqqg7il.png",
        "__v": 0
    }
]
```

- POST /api/ads/ : Créer une annonce.
- POST /api/ads/:id : Afficher les détails d’une annonce.
- DELETE /api/ads/:id : Supprimer une annonce.

### **Gestion du Panier**

- POST /api/cart/ : ajouter dans le panier
- GET /api/cart/:userId : récuperer le panier d'un utilisateur
- GET /api/cart/ : récuperer tout les paniers
- DELETE /api/cart/:itemId : supprimer un artcile du panier

### **Gestion des Commandes**

- POST /api/orders/:cartId : Finaliser une commande
- GET /api/orders/: userId : Lister les commandes d’un utilisateur.
- DELETE /api/orders/:cartId : Supprimer une commande

### **Gestion des Dons**

## 7° Rapport

### Jour 1 - 07/01/2025

**Rôles** :

- Xan: Chef de Projet
- Ewan: Documentaire
- Victor: Développeur
- Souka: Chef de Projet
- Ayoub: Documentaire

**Actions** :

Installation et configuration de l'environnement.

Création du répo Github : https://github.com/MilasO1/ProjetGeek

Création du Trello : https://trello.com/invite/b/677d06c8065922a4cb1815e4/ATTI2b7a99a6e6777fd04a6c5f1cc9352795BC0E7523/projet-geek

`npm init -y` pour initialiser le projet

Voir le _3° Installation et configuration_ pour plus de détails.

### Jour 2 - 08/01/2025

**Rôles** :

- Xan: Documentaire
- Ewan: Développeur
- Victor: Chef de Projet
- Souka: Documentaire
- Ayoub: Développeur

**Actions** :

On **configure une connexion à une base de données** MongoDB à l'aide du module “mongodb”et on met en place une application Express pour gérer potentiellement des requêtes.

Création des schémas (models):

- **User** pour gérer les informations des utilisateurs,
- **Ad** pour représenter les annonces avec leurs détails (titre, description, type, prix, utilisateur associé).
- **Cart** et **Order** organisent respectivement les articles ajoutés au panier et les commandes passées, incluant leur statut.

On créer une route qui à la fonction **createUser** pour créer un utilisateur dans notre base de données.

Ainsi qu'une route avec **createAd** pour créer une annonce.

On a testé les 2 routes sur Postman pour voir si tout est bon.

### Jour 3 - 09/01/2025

**Rôles** :

- Xan: Développeur
- Ewan: Chef de Projet
- Victor: Documentaire
- Souka: Développeur
- Ayoub: Chef de Projet

**Actions** :

On a testé **Kaloraat** qui est une API prête à l'emploi avec système de connexion et d'enregistrement qui inclut la fonction de mot de passe oublié et de réinitialisation du mot de passe et qui permet de structurer les dossier incluant les routes et les contrôleurs.

Les commandes pour mettre en place Kaloraat :

`npm i -g kaloraat`

`kaloraat-make-model user`

`kaloraat-make-model`

`write your model name: Article`

`kaloraat-make-route`

`write your model name: User`

Puis, mise à jour des dépendences.

Ensuite, pour notre projet, on a créé les controllers d'utilisateur pour récupérer, supprimer, se connecter et se déconnecter.

On les utilise ensuite dans notre userRoutes.js :

```
// controllers
const { createUser, getAllUsers, removeUser, login, logout} = "../controllers/user";


router.post("/create", createUser);
router.delete("/remove", removeUser);
router.get('/', getAllUsers);
router.get('/login', login)
router.post('/logout', logout)


module.exports = router;
```

### Jour 4 - 14/01/2025

**Rôles** :

- Xan: Chef de Projet
- Ewan: Documentaire
- Victor: Développeur
- Souka: Chef de Projet
- Ayoub: Documentaire

**Actions** :

On reprend le code. Les tâches d’aujourd’hui sont de: finir le routage pour l’utilisateur, créer le schéma des annonces avec ses routes, et essayer de déployer sur Render.

On commence par la definition du schema des annonces:

```
// Définition du schéma
const adSchema = mongoose.adSchema(
    {
        categorie: {type: String, enum: ["jeux","manga","autres"], required: true},
        title: {type: String, required: true},
        description: { type: String, required: true},
        type: { type: String, enum: ["vente", "don"], required: true},
        price: { type: Number, default:0, required: true},
    }
);
```

On a testé le deleteUser, le getUser, le addUser et login/logout sur Postman.

On a bien appliqué bcrypt afin de sécuriser et hasher les mots de passe de l’utilisateur.

On a également créer les routes pour les annonces et tester sur Postman.

**Erreurs** :

On a corrigé des erreurs pour les routes de l’utilisateur: /api/users etait dupliqué dans le code, ça a crée des conflits.
On a eu un erreur 404 lors du test POSTMAN: l’erreur venait de la configuration des chemins de routes…certaines routes avait comme chemin “/api/route” d’autre juste “/route”
Ce qui à crée des conflits au niveau de la recherche de Postman

Une erreur à été rencontré lors du test POSTMAN avec /api/ads/:id, resolue en changeant findOne par findById.

### Jour 5 - 15/01/2025

**Rôles** :

- Xan: Documentaire
- Ewan: Développeur
- Victor: Chef de Projet
- Souka: Documentaire
- Ayoub: Développeur

**Actions** :

Installation de React.

Création des pages :

- Home
- Login
- Sign In

Installation et configuration :

- Render
- Tailwind CSS
- Bulma

### Jour 6 - 16/01/2025

**Rôles** :

- Xan: Développeur
- Ewan: Chef de Projet
- Victor: Documentaire
- Souka: Développeur
- Ayoub: Chef de Projet

**Actions** :

Nous avons commencé par fusionner les travaux réalisés par les deux développeurs hier.
Aujourd’hui, nous avons travaillé sur la liaison entre le back-end et le front-end.

Les mises à jour effectuées incluent :

- La mise à jour du modèle des annonces.
- La modification des routes liées aux annonces.
- Le début de l’implémentation de l’authentification.
- L’ajout d’un header et d’un footer avec Bulma.

**Erreurs** :

Une erreur liée à l’authentification avec MongoDB.
Nous avons essayé d’utiliser la fonction suivante pour créer des tokens JWT :

```
const createToken = (_id) => {
return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "2d" });
};
```

Nous avions oublié d'importer jwt.

### Jour 7 - 21/01/2025

**Rôles** :

- Xan: Chef de Projet
- Ewan: Documentaire
- Victor: Développeur
- Souka: Chef de Projet
- Ayoub: Documentaire

**Actions** :

Nous avons fini l'authentification avec jwt et nous avons mis l'auth sur les routes qui en avait besoin. Et tester avec Postman.

Par exemple pour l'utilisateur:

```
router.post("/create", createUser);
router.delete("/remove/:id", auth, removeUser);
router.get("/", auth, getAllUsers);
router.post("/login", login);
router.post("/logout", auth, logout);
```

**Erreurs** :

Sur postamn, lors du test pour l'auth, nous recevions le message suivant :

```
{
    "message" : "Token manquant"
}
```

Il fallait mettre dans le headers sur Postman:

`authorization : Bearer "le token de l'utilisateur"`

### Jour 8 - 22/01/2025

**Rôles** :

- Xan: Documentaire
- Ewan: Développeur
- Victor: Chef de Projet
- Souka: Documentaire
- Ayoub: Développeur

**Actions** :

On a ajouter le crudImage pour l'annonce avec cloudinary.

On peut maintenant ajouter une image lors de la création de l'annonce.

**Erreurs** :

Sur Postman, nous n'arrivions pas à créer une annonce suite à l'ajout de l'image.

Le problème venait de la configuration de dotenv :

```
require("dotenv").config();

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
```

### Jour 9 - 23/01/2025

**Rôles** :

- Xan: Développeur
- Ewan: Chef de Projet
- Victor: Documentaire
- Souka: Développeur
- Ayoub: Chef de Projet

**Actions** :

Ajout du chemin pour delete l’image lors de la suppression de l’annonce et refonte de la documentation.

### Jour 10 - 28/01/2025

**Rôles** :

- Xan: Chef de Projet
- Ewan: Documentaire
- Victor: Développeur
- Souka: Chef de Projet
- Ayoub: Documentaire

**Actions** :

Connection du back et front nottament grâce à cors.
Début du front end : c'est à dire la page Home, login et register qu'on a connecter avec le back.

Le formulaire inscription qu'on rempli, une fois soumis, on retrouve notre utilisateur dans notre base de donnée MongoseDB.

### Jour 11 - 29/01/2025

**Rôles** :

- Xan: Documentaire
- Ewan: Développeur
- Victor: Chef de Projet
- Souka: Documentaire
- Ayoub: Développeur

**Actions** :

On a créer les pages Annonces, panier, commandes et dons.
Créer les routes et on a utiliser useLocation() pour que la navbar ne s'affiche pas sur les pages login et register.
On a afficher les annonces sur la pages home

### Jour 12 - 30/01/2025

**Rôles** :

- Xan: Développeur
- Ewan: Chef de Projet
- Victor: Documentaire
- Souka: Développeur
- Ayoub: Chef de Projet

**Actions** :

## 8° Contribution

Belahcene Victor
Balandrau Xan
El Mousaddiq Soukaina
