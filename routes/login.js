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
 var query1="SELECT * FROM Theatres NATURAL JOIN Show_timings NATURAL JOIN Screens  NATURAL JOIN Movies";
 var query2="SELECT * FROM Classes NATURAL JOIN Theatres NATURAL JOIN Screens";
 var query3="SELECT * FROM Theatres";
 var query4="SELECT * FROM Movies";
 var query5="SELECT * FROM Theatres JOIN Location";
 Promise.all([
   queryWrapper(query1),
   queryWrapper(query2),
   queryWrapper(query3),
   queryWrapper(query4),
   queryWrapper(query5)
 ]).then(function([values1,values2,values3,values4,values5]){
   var theatres=[];
   var theatreone=[];
   var theatreclass=[];
   var theatrescreens=[];
   var theatreloc=[];
  for(var i=0;i<values1.length;i++)
 {
  
  if(idme==values1[i].Theatre_id)
  {
    theatres.push(values1[i]);
  }
 }
 for(var i=0;i<values2.length;i++)
 {
  
  if(idme==values2[i].Theatre_id)
  {
    theatreclass.push(values2[i]);
    if(values2[i].Class_Name==="Golden")
    {
      theatrescreens.push(values2[i]);
    }
  }
 }
 for(var i=0;i<values3.length;i++)
 {
  
  if(idme==values3[i].Theatre_id)
  {
    theatreone.push(values3[i]);
  }
 }
 for(var i=0;i<values5.length;i++)
 {
  
  if(idme==values5[i].Theatre_id)
  {
    theatreloc.push(values5[i]);
  }
 }
 var dat=new Date();
 var time=['12:00:00','03:00:00','06:00:00','09:00:00'];
 var s=dat.getDate()+"-"+dat.getMonth()+"-"+dat.getFullYear();
 res.render('portals/login',{theatres,theatreclass,theatrescreens,theatreone,theatreloc,values4,time,s});
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
router.post('/insert/screen/id/:id',function(req,res,next){
var goldcost=req.body.costgolden;
var silver=req.body.costsilver;
var id=req.params.id;
if(goldcost=="")
{
  res.send('atleast golden class should be there.mention the golden class cost please');
}
else
{
  var query="SELECT * FROM  Classes";
  var querycheck="SELECT * FROM Screens";
  Promise.all([
    queryWrapper(query),
    queryWrapper(querycheck)
   ]
  ).then(function([values,valuescheck]){
    var c=0;
  for(var i=0;i<values.length;i++)
  {
    if(values[i].Theatre_id==id && values[i].Class_Name==="Golden")
    {
     c++;
    }
  }
  c++;
  console.log(valuescheck.length);
  if(valuescheck.length<c)
  { 
    var query1="INSERT INTO Screens VALUES("+c+",'Screen"+c+"')";
  }
  else
  {
    var query1="SELECT * FROM Screens";
  }
  var query2="INSERT INTO Classes VALUES('Golden',"+goldcost+","+c+","+id+")";
  if(silver=="")
  {
    Promise.all([
      queryWrapper(query1),
      queryWrapper(query2)  
    ]).then(
      function(values1,values2)
      {
        res.redirect("/login?id="+id);
      }
    );
  }
  else
  {
    var query3="INSERT INTO Classes VALUES('Silver',"+silver+","+c+","+id+")";
    Promise.all([
    queryWrapper(query1),
    queryWrapper(query2),
    queryWrapper(query3)
    ]).then(
      function(values1,values2,values3)
      {
        res.redirect("/login?id="+id);
      }
    )
  }
  }
  );
}
});
router.post('/delete/screen/:id1/:id2/:id3',function(req,res,next){
var theatre=req.params.id1;
var screen=req.params.id2;
var classname=req.params.id3;
var query="DELETE FROM Classes WHERE (Theatre_id="+theatre+" && Screen_id="+screen+" && Class_Name='"+classname+"')";

Promise.all([
  queryWrapper(query)
    ]).then(
      function([values]){
        res.redirect("/login?id="+theatre);
      }
    );
});
router.post('/insert/show/id/:id',function(req,res,next){
 var id=req.params.id;
 var screen=req.body.showscreen;
 var movienm=req.body.selectmovie;
 var show=req.body.selecttime;
 var query="SELECT * FROM Movies";
 Promise.all([
   queryWrapper(query)
 ]).then(
  function([values])
  {
    var movie;
    var screenid;
    for(var j=0;j<values.length;j++)
    {
      if(values[j].Movie_Name===movienm)
      {
        movie=values[j].Movie_id;
        break;
      }
    }
    var query1="SELECT * FROM Show_timings NATURAL JOIN Screens";
    var query2="SELECT * FROM Screens";
    Promise.all([
      queryWrapper(query1),
      queryWrapper(query2)
    ]).then(
      function([values1,values2])
      {
        var k=0;
       for(var i=0;i<values1.length;i++)
       {
        if(values1[i].Theatre_id==id && values1[i].Screen_Name===screen && values1[i].Time===show)
        {
          res.send("show already filled with another movie.Try another show or delete the current!!");
          k++;
          break;
        }
       }
       for(var i=0;i<values2.length;i++)
       {
         if(values2[i].Screen_Name===screen)
         {
          screenid=values2[i].Screen_id;
          break;
         }
       }
       if(k==0)
       {
         var query3="INSERT INTO Show_timings VALUES('"+show+"','pm',"+screenid+","+id+","+movie+")";
         Promise.all([
           queryWrapper(query3)
         ]).then(
         function([values3])
         {
          res.redirect("/login?id="+id);
         }
         );
       }
      }
    );
  }
 );


});
router.post('/logout',function(req,res,next){
res.redirect("/");
});
module.exports = router;
