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
router.get('/', function(req, res, next){
    var title="amar";
    console.log(typeof req.next);

    res.render('frames/theatreframe',{title});
});
router.get('/:id', function(req, res, next){
    var query1="SELECT * FROM Show_timings NATURAL JOIN Movies NATURAL JOIN Theatres NATURAL JOIN Screens";
    var query2="SELECT * FROM Classes NATURAL JOIN Theatres NATURAL JOIN Screens";
    var query3="SELECT * FROM Theatres";
    var query4="SELECT * FROM Theatres NATURAL JOIN Location";
    Promise.all([
        queryWrapper(query1),
        queryWrapper(query2),
        queryWrapper(query3),
        queryWrapper(query4)
    ]).then(function([values1,values2,values3,values4]){
        var j=0;
        var theatre1=[];
        var theatre2=[];
        var theatre=[];
        var theatreloc=[];
        for(var i=0;i<values1.length;i++)
        {

            if(values1[i].Theatre_id==req.params.id){
                theatre1.push(values1[i]);
               

            }
         

        }
        for(var i=0;i<values2.length;i++)
        {

            if(values2[i].Theatre_id==req.params.id){
                theatre2.push(values2[i]);
               

            }
         

        }
        for(var i=0;i<values3.length;i++)
        {

            if(values3[i].Theatre_id==req.params.id){
                theatre.push(values3[i]);
               

            }
         

        }
        for(var i=0;i<values4.length;i++)
        {

            if(values4[i].Theatre_id==req.params.id){
                theatreloc.push(values4[i]);
               

            }
         

        }
        console.log(theatre2);
        var dat=new Date();
        var s=dat.getDate()+"-"+dat.getMonth()+"-"+dat.getFullYear();
        res.render('frames/theatreframes/theatreframes',{theatre,theatre1,theatre2,theatreloc,s});

        

    });
});

module.exports=router;