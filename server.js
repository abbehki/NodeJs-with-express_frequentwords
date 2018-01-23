var express=require('express');
var app=express();
var bodyParse=require('body-parser');
var mongoose=require('mongoose');
var Bear= require('./app/models/bear');


mongoose.connect('mongodb://localhost:27017/beardb'); // connect to our database
//data from POST
app.use(bodyParse.urlencoded({extended:true}));
app.use(bodyParse.json());


var port=process.env.PORT||8080;

var router=express.Router();

router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
})

router.get('/',function(req,res){
    res.json({message:"yolo!! bitch"});
});

// router.route('/bears')
router.route('/bears/:bear_id')
    .post(function(req,res){
        var bear=new Bear();
        bear.name=req.body.name;
        bear.save(function(err,result){
            if(err){
                res.send(err);
            }
            if(result){
                console.log(result);
                res.json({ message: 'created collection!!' });   
            }  
        })
    })

    // .get(function(req,res){
    //     Bear.find(function(err,bears){
    //         if(err){
    //             res.send(err);
    //         }
    //         res.json(bears);
    //     })
    // })

    .get(function(req,res){
        Bear.findById(req.params.bear_id,function(err,bear){
            if(err){
                res.send(err)
            }
            res.json(bear)
        })
    })

app.use('/api',router);


app.listen(port);
console.log(port);