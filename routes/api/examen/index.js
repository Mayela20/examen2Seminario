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

  
  router.post('/new', function(req, res)
  {
    if (req.user.roles.findIndex((o)=>{return o=="administrador"}) == -1) 
    {
      return res.status(401).json({"error":"Sin privilegio"});
    }

    var newman = Object.assign(
       {},
       req.body,
       { 
         "nombre":req.body.nombre,
         "autor":req.body.autor,
         "paisorgen":req.body.paisorigen,
       }
     );

     conModel.saveNewmanga(newCon, (err, rslt)=>{
        if(err){
          res.status(500).json(err);
        }else{
          res.status(200).json(rslt);
        }
      });// saveNewProduct
   }); // post /new
  
   router.put('/update/:conid',
   function(req, res)
   {
     var conIdToModify = req.params.conid;
     var nombreAct= req.body.nombre;
     var autorAct = req.body.autor;
     conModel.updatemanga(
       {nombre:nombreAct, autor:autorAct}, conIdToModify,
       (err, rsult)=>{
         if(err){
           res.status(500).json(err);
         }else{
           res.status(200).json(rsult);
         }
       }
       ); //updateProduct
   }

   
  router.delete(
    '/delete/:conid',
    function( req, res) {

      var id = req.params.conid || '';
      if(id===' ')
      {
        return  res.status(404).json({"error": "Identificador no válido"});
      }
      conModel.deletemangas(id, (err, rslt)=>{
        if(err)
        {
          return res.status(500).json({"error":"Ocurrió un error, intente de nuevo."});
        }
        return res.status(200).json({"msg":"Deleted ok"});
        
      }); //delete product
    }
  );// delete
    return router;
}

module.exports = initmangasApi;