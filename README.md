# Arcadia

A web application that helps gamers find & discover new games, save them to their personal collection, and track their progress and ratings within the app.

## Setup

### Dependencies

Arcadia is built using React.js, Express.js Node.js, MySQL, Rawg.io API and Bootstrap.

### Front-end:

* Run`npm install` in project directory. This will install server-related dependencies such as express.
* `cd client` and run `npm install`. This will install client dependencies (React).

### Database:

* Access the MySQL interface in your terminal by running `mysql -u root -p`
* Create a new database called arcadia
* Add a .env file to the project folder of this repository containing the MySQL authentication information for MySQL user. For example:

```
  DB_HOST=localhost
  DB_USER=root
  DB_NAME=arcadia
  DB_PASS=YOURPASSWORD
```

Run `npm run migrate` in the project folder of this repository, in a new terminal window. This will create a table called 'arcadia' in your database.

In your MySQL console, you can run `use arcadia`; and then `describe arcadia`; to see the structure of the game_collection & users table.

### API you'll need

rawg.io: https://rawg.io/apidocs

* Create a .env file on the client folder and store your API key in this file. Use variable REACT_APP_API_KEY (ex: REACT_APP_API_KEY=12311141341).
* Add .env to your gitignore file in the client folder.

### Development
Run `npm start` in project directory to start the Express server on port 5000
In another terminal, do `cd client` and `run npm start` to start the client in development mode with hot reloading in port 3000.