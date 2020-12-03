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
});
router.post('/searchresult',function(req,res,next){
  
   var query="SELECT * FROM Show_timings NATURAL JOIN Movies NATURAL JOIN Theatres NATURAL JOIN Screens";
   Promise.all(
     [queryWrapper(query)
    ]).then(function([values]){
       var j=0;
       var movie=[];
       for(var i=0;i<values.length;i++)
       {
         if(values[i].Movie_Name.toLowerCase()===req.body.searchname.toLowerCase())
         {
          movie.push(values[i]);
         }
       }
       var dat=new Date();
       var s=dat.getDate()+"-"+dat.getMonth()+"-"+dat.getFullYear();
       console.log(movie);
       if(movie.length!=0)
       {
        res.render('frames/movieframes/movieframes',{movie,s});
       }
       else
       {
        res.render('frames/searcherror');
       }
    });
  

});
router.post('/login',function(req,res,next){
  
});
 
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
 

 





module.exports = router;
