# MDD 
  
## Front

1. Go inside front folder:
   
   ```bash
   cd front

2. Install dependencies:

   ```bash
   npm install

3. Launch Front-end:

   ```bash
   ng s

### SQL

## Configuration MySQL

1. Créer un nouveau schéma `orion` dans votre instance MySQL. Vous pouvez utiliser un outil comme [MySQL Workbench](https://www.mysql.com/products/workbench/) ou exécuter la commande SQL suivante :

   ```sql
   CREATE SCHEMA IF NOT EXISTS orion DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

### Back 

1. Argument de démarrage

   ```bash
   -Dpassword= your password
   -Dusername= your username
   -Dtoken= your token
