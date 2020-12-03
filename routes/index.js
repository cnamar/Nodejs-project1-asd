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
/* GET home page. */
router.get('/', function(req, res, next) {

var query1="SELECT * FROM Movies";
var query2="SELECT * FROM Location NATURAL JOIN Theatres";
var query3="SELECT * FROM upcoming";
Promise.all([
queryWrapper(query1),
queryWrapper(query2),
queryWrapper(query3)
]).then(
  function([values1,values2,values3]){
   res.render('index',{values1,values2,values3});
  }
);

 
/* connection.query("SELECT * FROM Movies",function(err,rows,fields){
    
      if(!err){
      values1=rows;
      
      connection.query("SELECT * FROM Location NATURAL JOIN Theatres",function(err,rows,fields){
        if(!err){
        values2=rows;
       
        res.render('index',{values1,values2});
        }
        else{
          console.log(err);
        }
      });
      }
      else{
        console.log(err);
      }
 });*/
 

 
});




module.exports = router;
