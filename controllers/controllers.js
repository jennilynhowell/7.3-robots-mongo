module.exports = {
  home: function(req, res){
    let context = {};
    const col = req.db.collection('robotscol_jh');
    let results = col.find({}).toArray((error, results)=>{
      context.model = results;
      res.render('index', context);
    });
  },

  looking: function(req, res){
    let context = {};
    const col = req.db.collection('robotscol_jh');
    let results = col.find({'company': null}).toArray((error, results)=>{
      context.model = results;
      res.render('looking', context);
    });
  },

  hired: function(req, res){
    let context = {};
    const col = req.db.collection('robotscol_jh');
    let results = col.find({'company': {$ne: null}}).toArray((error, results)=>{
      context.model = results;
      res.render('hired', context);
    });
  },

  robotProfile: function(req, res){
    let robot = req.params.id;
    robot = parseInt(robot);
    let context = {};
    const col = req.db.collection('robotscol_jh');
    let results = col.find({'id': robot}).toArray((error, results)=>{
      context.model = results;
      res.render('profile', context);
    });
  },
}
