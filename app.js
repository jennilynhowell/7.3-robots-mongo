const express = require('express');
const mustacheExpress = require('mustache-express');
const data = require('./data.js');
const app = express();

app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');

app.use('/public', express.static('public'));

app.get('/', function(req, res){
  res.render('index', data)
});

app.get('/:id', function(req, res) {
  var user = {};
  for (let i = 0; i < data.users.length; i++) {
    user = data.users[i];

    if (user.id == req.params.id) {
      break;
    }
  };
  res.render('profile', user)
});

app.listen(3000, function(){
  console.log('Listening...');
});
