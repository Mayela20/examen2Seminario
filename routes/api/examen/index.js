var express = require('express');
var router = express.Router();

function initmangasApi(db)
{
  var fileModel = require('../filemodel');
  var manCollection = fileModel.getmangas();

  var manModel = require('./mangas.model')(db);

  router.get('/', function (req, res) {
    res.json({
      "entity": "mangas",
      "version": "0.0.1"
    });
  }); //get

  router.get('/all', function(req, res){
    conModel.getAllmangas((err, mangas)=>{
      if(err){
        res.status(404).json([]);
      } else {
        res.status(200).json(mangas);
      }
    });// end getAllProducts
  }); // get /all