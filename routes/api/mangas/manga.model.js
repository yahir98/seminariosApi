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


    return mangaModel;
}
module.exports = mangasModel;