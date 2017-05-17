var router = require('express').Router(),
    jwt = require('jwt-simple'),
    createToken = require('./createToken'),
    moment = require('moment'),
    cors = require('cors'),
    secret = require('../config/tokenSecret').secret;

//connect to database
var collection; 


var MongoClient = require('mongodb').MongoClient;
MongoClient.connect("mongodb://localhost:27017/gato", function(err, db) {
  if(!err) {
    console.log("MongoDb Connect");
    collection = db.collection('tickets');
  }
});

router.post('/login', cors(), function(req, res){
    "use strict";
});

/**
 * Http method: GET
 * URI: /TICKETS
 * obtiene todos los tickets
 */
router.get('/tickets', cors(), function (req, res) {
    "use strict";
    collection.find().toArray(function(err, items) {
        var resultado;
        
        if (!err){
            resultado = {
                status: 200,
                result: items
            }
        }
        else{
            resultado = {
                status: 500,
                result: err
            }
        }
        res.set('Content-Type', 'application/json').send(JSON.stringify(resultado));
    });
});

router.post('/ticket', cors(), function(req, res){
    "use strict";

    collection.findOne({id: parseInt(req.body.id)},function (err,item){
        console.log(item);
        var resultado;
        if(!err){
            resultado = {status: 200, result: item}
        }
        else{
            resultado = {
                status: 500,
                result: err
            }
        }
        res.set('Content-Type', 'application/json').send(JSON.stringify(resultado));     
    });
});

router.post('/ticketUpdate', cors(), function(req, res){
        "use strict";
    collection.update({id: parseInt(req.body.id)},
    {
        $set:{titulo: req.body.titulo,
        estado : req.body.estado
        }
    },
    {w:1},
    function(err,result){
        var resultado;
        if(!err){
            resultado = {status: 200, result: result}
        }
        else{
            resultado = {
                status: 500,
                result: err
            }
        }
        res.set('Content-Type', 'application/json').send(JSON.stringify(resultado));    
    }
    
    )

});

router.post('/ticketRemove', cors(), function(req, res){
    "use strict";
        collection.remove({id: parseInt(req.body.id)},
        {w:1},
    function(err,result){
        var resultado;
        if(!err){
            resultado = {status: 200, result: result}
        }
        else{
            resultado = {
                status: 500,
                result: err
            }
        }
        res.set('Content-Type', 'application/json').send(JSON.stringify(resultado));    
    }
    
    )
});

module.exports = router;
