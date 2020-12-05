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
var query1="SELECT * FROM Theatres";
var query2="SELECT * FROM Movies";
Promise.all([
   queryWrapper(query1),
   queryWrapper(query2)
   ]).then(function([values1,values2]){
   res.render('portals/admin',{values1,values2});
   });
});
router.post('/theatre/:id',function(req,res,next){
 var id=req.params.id;
 var query1="DELETE FROM users WHERE Theatre_id="+id;
 var query2="DELETE FROM Show_timings WHERE Theatre_id="+id;
 var query3="DELETE FROM Location WHERE Theatre_id="+id;
 var query4="DELETE FROM Classes WHERE Theatre_id="+id;
 var query5="DELETE FROM Theatres WHERE Theatre_id="+id;

 Promise.all([
    queryWrapper(query1),
    queryWrapper(query2),
    queryWrapper(query3),
    queryWrapper(query4),
    queryWrapper(query5)
      ]).then(
        function([values1,values2,values3,values4,values5]){
          res.redirect("/admin");
        }
      );
});
router.post("/movie/:id",function(req,res,next){
var id=req.params.id;
var query1="DELETE FROM Show_timings WHERE Movie_id="+id;
var query2="DELETE FROM Movies WHERE Movie_id="+id;
Promise.all([
  queryWrapper(query1),
  queryWrapper(query2)
    ]).then(
      function([values1,values2]){
        res.redirect("/admin");
      }
    );
});
router.post("/insert/theatre",function(req,res,next){
  var id=req.body.theatreid;
  var name=req.body.theatrename;
  var mail=req.body.theatreemail;
  var contact=req.body.theatrecontact;
  var user=req.body.theatreusername;
  var pass=req.body.theatrepassword;
  if(id==""|| name=="" || mail=="" || contact=="" || user=="" || pass=="")
  {
    res.send("empty values are not allowed");
  }
  else
  {
  var query1="SELECT * FROM Theatres";
  var query2="SELECT * FROM users";
  Promise.all(
    [
     queryWrapper(query1),
     queryWrapper(query2)
    ]).then(
    function([values,values2])
    {
      var m=0;
      for(var i=0;i<values.length;i++)
      {

        if(values[i].Theatre_id==id || values[i].Theatre_Name===name || values[i].Theatre_email===mail || values[i].Contact_No===contact || values2[i].username===user)
        {
          var msg="Duplicate value found.Not possible to insert";
          m++;
          res.send(msg);
          break;
        }
      }
      if(m==0)
      {
        var query3="INSERT INTO Theatres VALUES("+id+",'"+name+"','"+mail+"','"+contact+"')";
        var query4="INSERT INTO users VALUES('"+user+"','"+pass+"',"+id+")";
        Promise.all([
          queryWrapper(query3),
          queryWrapper(query4)
        ]).then(
          function([values1,values3])
          {
            res.redirect('/admin');
          }
        );
      }
    }
    );
  }
});
router.post('/insert/movie',function(req,res,next){
var id=req.body.movieid;
var name=req.body.moviename;
var director=req.body.directorname;
var producer=req.body.producername;
var distributor=req.body.distributorname;
var lang=req.body.language;
var cast=req.body.moviecast;
console.log(cast);
if(id==="" || name==="" || director==="" || producer==="" || distributor==="" || lang==="")
{
  res.send("empty values are not allowed");
}
else{
  var query1="SELECT * FROM Movies";
  Promise.all(
    [
      queryWrapper(query1)
    ]).then(
     function([values1])
     {
       var m=0;
       for(var i=0;i<values1.length;i++)
       {
         if(values1[i].Movie_id==id)
         {
          res.send("Not able to insert.Id should be unique");
          m++;
          break;
         }
       }
       if(m==0)
       {
         var query2="INSERT INTO Movies VALUES("+id+",'"+name+"','"+director+"','"+producer+"','"+distributor+"','"+lang+"','"+cast+"')";
         Promise.all(
           [
            queryWrapper(query2)
           ]).then(
            function([values2])
            {
              res.redirect('/admin');
            }
           );
       }
     }
    );
}
});

module.exports = router;