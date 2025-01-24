const express = require('express');
const path = require('path');
const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

let utilisateurs = []; // On utilise un tableau vide, mais normalement on utiliserait une base de données

// Route GET - Récupérer tous les utilisateurs
app.get('/api/utilisateurs', (req, res) => {
    res.json(utilisateurs);
});

// Route POST - Ajouter un utilisateur
app.post('/api/utilisateurs', (req, res) => {
    const utilisateur = req.body;
    utilisateur.id = utilisateurs.length + 1;
    utilisateurs.push(utilisateur);
    res.status(201).json(utilisateur);
});

// Route PUT - Modifier un utilisateur
app.put('/api/utilisateurs', (req, res) => {
    const utilisateur = req.body;
    console.log(utilisateur);
    utilisateurs[utilisateur.id - 1].nom = utilisateur.nom;
    utilisateurs[utilisateur.id - 1].prenom = utilisateur.prenom;
    res.status(200).json(utilisateur);
});

// Route DELETE - Supprimer un utilisateur
app.delete('/api/utilisateurs/:id', (req, res) => {
    const id = parseInt(req.params.id);
    utilisateurs = utilisateurs.filter(u => u.id !== id);
    res.status(204).send();
});


// Lancer le serveur
app.listen(3000, () => {
    console.log('Serveur démarré sur http://localhost:3000');
});
