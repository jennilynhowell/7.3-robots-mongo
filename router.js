const express = require('express');
// const bodyParser = require('body-parser');
// const models = require('./models');
const controllers = require('./controllers/controllers.js');

module.exports = function(app){

  const robotRouter = express.Router();
  const profileRouter = express.Router();

  // mount these after /robots
  robotRouter.get('/', controllers.home);
  robotRouter.get('/looking', controllers.looking);
  robotRouter.get('/hired', controllers.hired);
  app.use('/robots', robotRouter);

  //mount after /profile
  profileRouter.get('/:id', controllers.robotProfile);
  app.use('/profile', profileRouter);

};
