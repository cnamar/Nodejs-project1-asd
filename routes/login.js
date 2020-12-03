var express = require('express');
var router = express.Router();
var connection=require('../connection');
var app=express();
app.use('/javascripts',express.static(__dirname+'../public/javascripts'));
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.urlencoded({ extended: true }));
const queryWrapper=function(statement){
  return new Promise(function(resolve,reject){
    connection.query(statement,function(err,rows,fields){
      if(!err)
      {
        resolve(rows);
      }
      else{
        reject(err);
      }
    });
  });
};
router.get('/',function(req,res,next){
 console.log(req.query.id);
 var idme=req.query.id;
 var query1="SELECT * FROM Theatres NATURAL JOIN Show_timings NATURAL JOIN Screens NATURAL JOIN Location  NATURAL JOIN Movies";
 var query2="SELECT * FROM Classes NATURAL JOIN Theatres";
 Promise.all([
   queryWrapper(query1),
   queryWrapper(query2)
 ]).then(function([values1,values2]){
   var theatres=[];
  for(var i=0;i<values1.length;i++)
 {
  
  if(idme==values1[i].Theatre_id)
  {
    theatres.push(values1[i]);
  }
 }
 res.render('portals/login',{theatres,values2});
 }
 );

});


module.exports = router;
