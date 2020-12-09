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

    res.render('frames/movieframe',{title});
});
router.get('/:id', function(req, res, next){
    var query1="SELECT * FROM Show_timings NATURAL JOIN Movies NATURAL JOIN Theatres NATURAL JOIN Screens";
    var query2="SELECT * FROM Movies";
    Promise.all([
        queryWrapper(query1),
        queryWrapper(query2)
    ]).then(function([values,values2]){
        var j=0;
        var movie=[];
        var moviedet=[];
        for(var i=0;i<values.length;i++)
        {

            if(values[i].Movie_id==req.params.id){
                movie.push(values[i]);
               

            }
         

        }
        for(var i=0;i<values2.length;i++)
        {

            if(values2[i].Movie_id==req.params.id){
                moviedet.push(values2[i]);
               

            }
         

        }

        var dat=new Date();
        var s=dat.getDate()+"-"+dat.getMonth()+"-"+dat.getFullYear();
        console.log("details is"+moviedet[0].Movie_Name);
        res.render('frames/movieframes/movieframes',{movie,moviedet,s});

        

    });
});

module.exports=router;