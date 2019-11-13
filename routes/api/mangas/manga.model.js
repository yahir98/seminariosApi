var ObjectId = require('mongodb').ObjectId;

function mangasModel(db)
{
    let mangaModel = {};
    var mangaCollection = db.collection("manga");

    mangaModel.getAllmgmanga = (handler)=>
    {
      mangaCollection.find({}).toArray(
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
                  "Autor": updateFields.Autor,  
                  "dateModified":new Date().getTime()
              }
     };
       mangasCollection.updateOne(
       condominioFilter,
       updateObject,
        (err, rslt)=>{
        if(err){
          console.log(err);
          return handler(err, null);
        }
        return handler(null, rslt);
      }
    );
  };

  mangaModel.deletemangas = (id, handler)=>
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
    return mangaModel;
}
module.exports = mangasModel;