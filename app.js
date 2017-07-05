const express = require('express');
const mustacheExpress = require('mustache-express');
const data = require('./data.js');
const MongoClient = require('mongodb').MongoClient;
const app = express();


app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');

app.use('/public', express.static('public'));

app.use(function(req, res, next) {
  MongoClient.connect('mongodb://localhost:27017/robotsdb_jh', (error, db)=>{
    req.db = db;
    next();
  })
});

app.get('/', function(req, res){
  let context = {};
  const col = req.db.collection('robotscol_jh');
  let results = col.find({}).toArray((error, results)=>{
    context.model = results;
    res.render('index', context);
  });
});

app.get('/:id', function(req, res) {
  let robot = req.params.id;
  robot = parseInt(robot);
  let context = {};
  const col = req.db.collection('robotscol_jh');
  let results = col.find({'id': robot}).toArray((error, results)=>{
    context.model = results;
    res.render('profile', context)
  })
});

app.get('/looking', function(req, res) {
  let context = {};
  const col = req.db.collection('robotscol_jh');
  let results = col.find({'company': null}).toArray((error, results)=>{
    console.log(results);
    context.model = results;
    res.render('looking', context)
  });
});

app.get('/hired', function(req, res) {
  let context = {};
  const col = req.db.collection('robotscol_jh');
  let results = col.find({'company': {$ne: null}}).toArray((error, results)=>{
    console.log(results);
    context.model = results;
    res.render('hired', context)
  });
});

app.listen(3000);
