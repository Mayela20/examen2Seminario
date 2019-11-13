var ObjectId = require('mongodb').ObjectId;
var IndexVerified = false;

function mangasModel(db)
{
    let mangaModel = {};
    var mangasCollection = db.collection("mangas");

    
    if ( !IndexVerified) {
        mangasCollection.indexExists("codigo_1", (err, rslt)=>{
        if(!rslt){
            mangasCollection.createIndex(
            { "codigo": 1 },
            { unique: true, name:"codigo_1"},
            (err, rslt)=>{
                console.log(err);
                console.log(rslt);
            });//createIndex
        }
        }); // indexExists
    }

    mangaModel.getAllmangas = (handler)=>
    {
        mangasCollection.find({}).toArray(
          (err, docs)=>{
            if(err)
            {
              console.log(err);
              return handler(err, null);
            }
            return handler(null, docs);
          }
        );
    } // end getAllProducts

    mangaModel.saveNewmanga = (newmanga, handler)=>
    {
        mangaCollection.insertOne(newmanga, (err, result)=>
        {
          if(err)
          {
            console.log(err);
            return handler(err, null);
          }
          return handler(null, result);
        }); //insertOne
    }

    mangaModel.updatemanga = (updateFields, mangaId, handler)=>{
        let mangaFilter = {"_id": new ObjectId(mangaId)};
        let updateObject = {
          "$set": {
                    "nombre": updateFields.nombre,
                    "autor": updateFields.autor,
                    "pais origen": updateFields.paisorigen
                }
    };

    
    mangaCollection.updateOne(
        mangaFilter,
        updateObject,
        (err, rslt)=>{
          if(err){
            console.log(err);
            return handler(err, null);
          }
          return handler(null, rslt);
        }
      );
    }; // updateObject

    mangasModel.deletemangas = (id, handler)=>
    {
      var query = {"_id": new ObjectId(id)};
      mangasCollection.deleteOne(query, (err, rslt)=>{
          if(err)
          {
            console.log(err);
            return handler(err, null);
          }
          return handler(null, rslt);
      })//deleteone
    }

    return mangasModel;
}
module.exports = mangasModel;