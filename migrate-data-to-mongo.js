const data = require('./data.js');
const users = data.users;
const MongoClient = require('mongodb').MongoClient;


MongoClient.connect('mongodb://localhost:27017/robotsdb_jh', (error, db)=>{
  const col = db.collection('robotscol_jh');
  users.forEach(function(user){
    col.insert(user, {});
  })
});
