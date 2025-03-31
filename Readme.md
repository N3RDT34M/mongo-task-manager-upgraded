# Mongo Task Manager

## Description
Mongo Task Manager est une application web de gestion de tâches développée avec Node.js, Express et MongoDB. Elle permet de créer, suivre et gérer des tâches avec leurs sous-tâches, commentaires et historique de modifications.

## Technologies utilisées
- Node.js
- Express.js
- MongoDB avec Mongoose
- Express Handlebars (templating)
- Bootstrap 5.3.3
- Axios (pour les requêtes HTTP)

## Structure du projet
```
mongo-task-manager/
├── controllers/     # Logique métier
├── models/         # Schémas Mongoose
├── routers/        # Routes API
├── views/          # Templates Handlebars
├── static/         # Fichiers statiques
├── docs/           # Documentation
├── index.js        # Point d'entrée de l'application
└── package.json    # Configuration du projet
```

## Installation

1. Cloner le repository :
```bash
git clone https://github.com/AntoineChabanel/mongo-task-manager.git
```

2. Installer les dépendances :
```bash
npm install
```

3. Démarrer MongoDB localement

4. Lancer l'application :
```bash
npm run dev
```

L'application sera accessible à l'adresse : http://localhost:3000

## Fonctionnalités

### Gestion des tâches
- Création de tâches avec :
  - Titre et description
  - Date d'échéance
  - Statut (à faire, en cours, terminée, annulée)
  - Priorité (basse, moyenne, haute, critique)
  - Informations sur l'auteur

### Sous-tâches
Chaque tâche peut contenir des sous-tâches avec :
- Titre
- Statut
- Date d'échéance

### Système de commentaires
- Ajout de commentaires sur les tâches
- Informations sur l'auteur du commentaire
- Horodatage automatique

### Historique des modifications
Suivi des modifications avec :
- Champ modifié
- Ancienne valeur
- Nouvelle valeur
- Date de modification

## API Endpoints

### Tâches
- `GET /API/tasks` : Récupérer toutes les tâches
- `GET /API/tasks/:id` : Récupérer une tâche spécifique
- `POST /API/tasks` : Créer une nouvelle tâche
- `PUT /API/tasks/:id` : Mettre à jour une tâche
- `DELETE /API/tasks/:id` : Supprimer une tâche

## Interface utilisateur
- Dashboard principal affichant la liste des tâches
- Vue détaillée pour chaque tâche
- Interface responsive grâce à Bootstrap

## Auteur
Antoine Chabanel