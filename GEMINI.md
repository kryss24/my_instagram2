# Plan d'Action pour le Projet Clone d'Instagram

Ce document décrit les étapes de haut niveau pour la création d'un clone d'Instagram en utilisant ReactJS et AWS Amplify.

## Phase 1 : Initialisation du Projet et Authentification de Base

L'objectif de cette phase est de mettre en place l'environnement de développement, de configurer l'authentification des utilisateurs et de créer les écrans de base pour l'inscription et la connexion.

1.  **Initialiser l'application React** :
    *   Utiliser `npx create-react-app my_instagram` pour créer la structure de base du projet.
    *   Nettoyer les fichiers par défaut pour commencer avec un projet propre.

2.  **Mettre en place AWS Amplify** :
    *   Installer le CLI Amplify (`npm install -g @aws-amplify/cli`).
    *   Configurer le CLI avec vos identifiants AWS (`amplify configure`).
    *   Initialiser Amplify dans le projet React (`amplify init`).

3.  **Configurer le service d'authentification** :
    *   Ajouter le service d'authentification (`amplify add auth`) en utilisant Amazon Cognito.
    *   Configurer la connexion avec `Email` et `Password`.
    *   Ajouter `preferred_username`, `phone_number`, et `gender` comme attributs utilisateur standards ou personnalisés.

4.  **Créer les composants d'interface utilisateur (UI) pour l'authentification** :
    *   Développer les composants `SignUp.js` et `Login.js`.
    *   Créer les formulaires avec les champs requis (email, nom d'utilisateur, mot de passe, etc.).
    *   Implémenter la logique pour interagir avec le service d'authentification d'Amplify.
    *   Mettre en place une fonction pour "Changer le mot de passe".

5.  **Mettre en place le routage de base** :
    *   Utiliser `react-router-dom` pour gérer la navigation.
    *   Créer des routes pour l'accueil (`/`), la connexion (`/login`), l'inscription (`/signup`) et une page de profil protégée.

## Phase 2 : API GraphQL et Profils Utilisateurs

Cette phase se concentre sur la création de l'API backend pour gérer les données et sur la construction des pages de profil utilisateur.

1.  **Définir le schéma de l'API GraphQL** :
    *   Ajouter le service API (`amplify add api`) en utilisant AWS AppSync.
    *   Définir les modèles de données principaux dans `schema.graphql` : `User`, `Post`, `Comment`, `Like`.

2.  **Implémenter la page de profil** :
    *   Créer un composant `Profile.js` pour afficher les informations de l'utilisateur.
    *   Créer un composant `EditProfile.js` pour permettre aux utilisateurs de modifier leur profil (bio, liens, avatar).
    *   Intégrer le stockage Amplify (`amplify add storage`) avec Amazon S3 pour le téléchargement des avatars.

## Phase 3 : Fonctionnalités Sociales de Base

Ici, nous implémenterons les fonctionnalités fondamentales d'un réseau social : la création de publications et le système de suivi (follow).

1.  **Implémenter la création de publications** :
    *   Créer un composant `CreatePost.js` pour télécharger des images/vidéos et ajouter des légendes.
    *   Utiliser le service de stockage S3 configuré pour gérer les fichiers multimédias.
    *   Ajouter les mutations GraphQL nécessaires pour créer et sauvegarder les publications dans la base de données.

2.  **Construire le fil d'actualité (Feed)** :
    *   Créer un composant `Feed.js`.
    *   Écrire une requête GraphQL pour récupérer les publications des utilisateurs suivis.
    *   Afficher les publications par ordre chronologique inversé.

3.  **Mettre en place le système de suivi (Follow/Unfollow)** :
    *   Mettre à jour le schéma GraphQL pour modéliser la relation entre les utilisateurs.
    *   Ajouter des boutons "Suivre"/"Ne plus suivre" sur les profils utilisateurs.
    *   Implémenter la logique pour mettre à jour la relation de suivi via des mutations GraphQL.

## Phase 4 : Fonctionnalités Avancées et Finitions

Cette phase ajoute les fonctionnalités plus complexes qui enrichissent l'expérience utilisateur.

1.  **Interactions avec les publications** :
    *   Implémenter les "J'aime" (Likes), les commentaires et les partages.
    *   Mettre en place les favoris (Bookmarks).

2.  **Explorer et Rechercher** :
    *   Créer une page `Explore.js` pour découvrir de nouveaux contenus et utilisateurs.
    *   Implémenter une barre de recherche pour trouver des utilisateurs, des hashtags et des groupes.

3.  **Messagerie instantanée** :
    *   Définir les modèles `Conversation` et `Message` dans le schéma GraphQL.
    *   Utiliser les abonnements GraphQL (Subscriptions) pour la messagerie en temps réel.
    *   Construire l'interface de la messagerie.

4.  **Notifications** :
    *   Créer un modèle `Notification` dans le schéma.
    *   Utiliser des déclencheurs (triggers) AWS Lambda ou des abonnements pour générer des notifications (nouveaux "j'aime", commentaires, abonnés).
    *   Afficher les notifications dans l'interface utilisateur.

## Phase 5 : Déploiement et Finalisation

La dernière étape consiste à déployer l'application et à finaliser les derniers détails du projet.

1.  **Déployer sur AWS** :
    *   Utiliser la commande `amplify publish` pour déployer le backend et héberger l'application React sur Amplify Hosting.

2.  **Créer les fichiers finaux** :
    *   Rédiger le fichier `README.md` pour décrire le projet, ses fonctionnalités et comment l'exécuter localement.
    *   Créer un fichier `.gitignore` pour exclure `node_modules/` et d'autres fichiers non nécessaires.
    *   Une fois l'application déployée, inscrire l'URL finale dans `my_instagram_url.txt`.
