var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;

function initmanga(db){
    var mangasColl = db.collection('mangas');
  router.get('/', (req, res, next)=>{
    mangasColl.find().toArray((err, mangas)=>{
      if(err){
        console.log(err);
        return res.status(404).json({"error":"Error al extraer mangas de la base de datos"});
      }
      return res.status(200).json(mangas);
    });
  }); // get all
  router.get('/:id', (req, res, next)=>{
    var id = new ObjectID(req.params.id);
    mangasColl.findOne({"_id": id} , (err, doc)=>{
      if(err){
        console.log(err);
        return res.status(404).json({"error":"No se Puede Obtener mangas Intente de Nuevo"});
      }
      return res.status(200).json(doc);
    });//findOne
  }); // /:id

  router.post('/', (req, res, next)=>{
    var newIncidente = Object.assign(
      {},
      {
        "Nombre":"",
        "Autor":"",
        "PaisOrigen":"",
        "NumeroTomos": 0,
        "Estado": [Ongoing | Completed | Hiatsu |Dicontinued],
        "KeyWords": [Arreglo de palabras],
        "Categorias":[Arreglo de categorías]
      },
      req.body
    );
    mangasColl.insertOne(newmanga, (err, rslt)=>{
      if(err){
        console.log(err);
        return res.status(404).json({"error":"No se pudo agregar nuevo manga"});
      }
      if(rslt.ops.length===0){
        console.log(rslt);
        return res.status(404).json({ "error": "No se pudo agregar nuevo manga" });
      }
      return res.status(200).json(rslt.ops[0]);
    });
  });//post

  router.put('/asign/:id', (req, res, next)=>{
    var query = {"_id":new ObjectID(req.params.id)};
    var update = {"$inc":{"usuarioAsignado":"abre", "estado":"Asignado", "fechaAsignacion": new Date().getTime()}};

    mangasColl.updateOne(query, update, (err, rslt)=>{
      if (err) {
        console.log(err);
        return res.status(404).json({ "error": "No se pudo modificar manga" });
      }
      
      return res.status(200).json(rslt);
    })
  }); // put asign

  router.put('/close/:id', (req, res, next)=>{
    var query = {"_id":new ObjectID(req.params.id)};
    var update = {"$inc":{"usuarioAsignado":"cierre", "estado":"Cerrado", "fechaHoraCerrado": new Date().getTime()}};

    incidentesColl.updateOne(query, update, (err, rslt)=>{
      if (err) {
        console.log(err);
        return res.status(404).json({ "error": "No se pudo modificar incidente" });
      }
      
      return res.status(200).json(rslt);
    })
  }); // put close

  router.delete('/:id', (req, res, next) => {
    var query = { "_id": new ObjectID(req.params.id) };
    mangasColl.removeOne(query, (err, rslt) => {
      if (err) {
        console.log(err);
        return res.status(404).json({ "error": "No se pudo eliminar manga" });
      }

      return res.status(200).json(rslt);
    })
  }); // delete

  return router;

}

module.exports = initmanga