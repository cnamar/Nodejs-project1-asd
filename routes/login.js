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
 var dat=new Date();
 var s=dat.getDate()+"-"+dat.getMonth()+"-"+dat.getFullYear();
 res.render('portals/login',{theatres,values2,s});
 }
 );

});
router.post('/:id1/:id2/:id3',function(req,res,next){
var idd1=req.params.id1;
var idd2=req.params.id2;
var idd3=req.params.id3;
var query="DELETE FROM Show_timings WHERE (Theatre_id="+idd1+" && Screen_id="+idd2+" && Time='"+idd3+"')";
Promise.all([
queryWrapper(query)
  ]).then(
    function([values]){
      res.redirect("/login?id="+idd1);
    }
  );
});
router.post('/logout',function(req,res,next){
res.redirect("/");
});
module.exports = router;
