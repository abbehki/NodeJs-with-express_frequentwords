var express=require('express');
var app=express();
var bodyParse=require('body-parser');
var context=require('./app/getTexttoString');
var getfrequencyof=require('./app/getFrequency');
var getTexttostring,getfrequency;
var port=process.env.PORT||8080; 

//data from POST
app.use(bodyParse.urlencoded({extended:true}));
app.use(bodyParse.json());

var router=express.Router();

router.use(function(req, res, next) {
    // do logging
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
})

router.get('/',function(req,res){
    res.json({message:"yolo!!"});
});

router.route('/:_id')
    .get(function(req,res){

        console.log(req.params._id);
        (async (url) => {
            getTexttostring=await context(url);
            if (isNaN(req.params._id) || req.params._id < 1) {                
                res.send("Input should be a natural number.");
            }else{
                getFrequencyof=getfrequencyof(getTexttostring,req.params._id);
                res.send(getFrequencyof);
            }
        })('http://terriblytinytales.com/test.txt');
    })
 
app.use('/api',router);


app.listen(port);
console.log(port);