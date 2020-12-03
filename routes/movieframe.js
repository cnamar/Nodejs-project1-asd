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
    var query="SELECT * FROM Show_timings NATURAL JOIN Movies NATURAL JOIN Theatres NATURAL JOIN Screens";
    Promise.all([
        queryWrapper(query)
    ]).then(function([values]){
        var j=0;
        var movie=[];

        for(var i=0;i<values.length;i++)
        {

            if(values[i].Movie_id==req.params.id){
                movie.push(values[i]);
               

            }
         

        }

        var dat=new Date();
        var s=dat.getDate()+"-"+dat.getMonth()+"-"+dat.getFullYear();
        
        res.render('frames/movieframes/movieframes',{movie,s});

        

    });
});

module.exports=router;