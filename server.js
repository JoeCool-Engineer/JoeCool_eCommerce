const express = require('express');
const routes = require('./routes');
// import sequelize connection
// const session = require('express-session');
// import SequelizeStore constructor
// const SequelizeStore = require('connect-session-sequelize')(session.Store);
//import connection to the database
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// sync sequelize models to the database, then turn on the server
sequelize.sync({ force: false }).then(function (){
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
  });  
});
