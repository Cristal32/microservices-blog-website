# Utiliser l'image officielle de Node.js comme base
FROM node:latest

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier package.json et package-lock.json dans le conteneur
COPY package*.json ./

# Installer les dépendances
RUN npm install --force

# Copier le reste du code de l'application
COPY . .

# Installer Angular CLI globalement
RUN npm install -g @angular/cli

# Exposer le port 4200 pour le serveur de développement Angular
EXPOSE 4200

# Démarrer l'application
CMD ["ng", "serve", "--host", "0.0.0.0"]