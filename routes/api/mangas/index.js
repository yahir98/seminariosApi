var express = require('express');
var router = express.Router();

function initmangaApi(db)
{
  

  var mgModel = require('./manga.model')(db);

  router.get('/', function (req, res) {
    res.json({
      "entity": "manga",
      "version": "0.0.1"
    });
  }); //get

  router.get('/all', function(req, res){
    mgModel.getAllmgmanga((err, manga)=>{
      if(err){
        res.status(404).json([]);
      } else {
        res.status(200).json(manga);
      }
    });// end getAllProducts
  }); // get /all


  router.post('/new', function(req, res)
  {
    if (req.user.roles.findIndex((o)=>{return o=="administrador"}) == -1) 
    {
      return res.status(401).json({"error":"Sin privilegio"});
    }

    var newmg = Object.assign(
       {},
       req.body,
       { 
         "codigo":req.body.codigo,
         "Nombre":req.body.nombre,
         "Autor":req.body.Autor,
         "NumeroTomos": req.body.NumeroTomos,
         "KeyWords": req.body.KeyWords,
         "Categorias":req.body.Categorias,
         //"createdBy": req.user
       }
     );
    mgModel.saveNewmanga(newmg, (err, rslt)=>{
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
   var mgIdToModify = req.params.conid;
   var nombreAct= req.body.nombre;
   var AutortAct = req.body.Autor;
   mgModel.updatemanga(
     {nombre:nombreAct, Autor:apartamentAct}, mgIdToModify,
     (err, rsult)=>{
       if(err){
         res.status(500).json(err);
       }else{
         res.status(200).json(rsult);
       }
     }
     ); //updateProduct
 }
)


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
);
    return router;
}

module.exports = initmangaApi;