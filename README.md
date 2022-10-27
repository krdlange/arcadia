# Arcadia

A platform for gamers to view game information and to keep track of their gaming activities. 

## API you'll need

rawg.io: https://rawg.io/apidocs

## Installation

* Run npm install in project directory. This will install server-related dependencies such as express.

* cd client and run npm install. This will install client dependencies (React).

## Database Prep

* Access the MySQL interface in your terminal by running mysql -u root -p
* Create a new database called facebook: create database game_collection
* Add a .env file to the project folder of this repository containing the MySQL authentication information for MySQL user. For example:

```
  DB_HOST=localhost
  DB_USER=root
  DB_NAME=game_collection
  DB_PASS=YOURPASSWORD
```

Run npm run migrate in the project folder of this repository, in a new terminal window. This will create a table called 'game_collection' in your database.

In your MySQL console, you can run use game_collection; and then describe game_collection; to see the structure of the game_collection table.

## Development
Run npm start in project directory to start the Express server on port 5000
In another terminal, do cd client and run npm start to start the client in development mode with hot reloading in port 3000.