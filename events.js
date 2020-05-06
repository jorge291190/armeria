const express = require('express');

function createRouter(db) {
  const router = express.Router();
  const owner = '';

  // the routes are defined here

  router.get("/", (req, res, next) => {
    res.json({"message":"Ok"})
    });
    //agregar clientes
    router.get("/insertcli/:id/:rfa/:apaterno/:amaterno/:nombre/:direccion/:fecha/:estado/:ciudad/:tipo/:calibres", (req, res, next) => {
    
        var sql = "INSERT INTO  clientes"
                  +" (codigo,rfa,apaterno,amaterno,nombre,direccion ,localidad ,estado,ciudad,tipo,calibres)"
                  +" VALUES(?,?,?,?,?,?,?,?,?,?,?)";
  
        console.log(sql);
        
        db.all(sql,[req.params.id,
                    req.params.rfa,
                    req.params.apaterno,
                    req.params.amaterno,
                    req.params.nombre,
                    req.params.direccion,
                    req.params.fecha,
                    req.params.estado,
                    req.params.ciudad,
                    req.params.tipo,
                    req.params.calibres], (err, row) => {
            if (err) {
              res.json({"error":err.message});
              return;
            }
            res.json({
                "message":"success",
                "data":row
            })
          });
  
    });
      //esquema clientes
    router.get("/pragmaclientes", (req, res, next) => {
        var sql = "pragma table_info('clientes');"
        var params = [req.params.id]
        db.all(sql, params, (err, row) => {
            if (err) {
              res.status(400).json({"error":err.message});
              return;
            }
            res.json({
                "message":"success",
                "data":row
            })
          });
  
    });
      //obtener clientes
    router.get("/selectclientes", (req, res, next) => {
          var sql = "SELECT *FROM  clientes"
          var params = [req.params.id]
          db.all(sql, params, (err, row) => {
              if (err) {
                res.status(400).json({"error":err.message});
                return;
              }
              res.json({
                  "message":"success",
                  "data":row
              })
            });
    
    });
      //obtener calibres
    router.get("/calibres", (req, res, next) => {
            var sql = "SELECT *FROM calibres"
            var params = [req.params.id]
            db.all(sql, params, (err, row) => {
                if (err) {
                  res.status(400).json({"error":err.message});
                  return;
                }
                res.json({
                    "message":"success",
                    "data":row
                })
              });
      
    });
      //agregar calibres
    router.get("/altacalibre/:desc/:calibre/:status/:idcalibre", (req, res, next) => {
              var sql = "INSERT INTO calibres (idcalibre,descripcion,medida,status) VALUES(?,?,?,?)"
              
              db.all(sql, [ req.params.idcalibre,
                            req.params.desc,
                            req.params.calibre,
                            req.params.status], (err, row) => {
                  if (err) {
                    res.json({"error":err.message});
                    return;
                  }
                  res.json({
                      "message":"success",
                      "data":"Calibre Agregado"
                  })
                });
    });

    router.get("/ultimaventa",(req,res,next)=>{
      var sql = "SELECT max(folio) as ultima from ventas";       
      db.all(sql, (err, row) => {
          if (err) {
            res.json({"error":err.message});
            return;
          }
          res.json({
              "message":"success",
              "data":row
          });
        });
    });

    router.get("/altaventa/:prefijo/:status/:cliente/:fecha/:total",(req,res,next)=>{
      var sql = "INSERT INTO ventas (prefijo,status,cliente,fecha,total) "+
                "VALUES(?,?,?,?,?)";        
      db.all(sql, (err, row) => {
          if (err) {
            res.json({"error":err.message});
            return;
          }
          res.json({
              "message":"success",
              "data":row
          });
        });
    });

    router.get("/alpartida/:idventa/:cantidad/:status/:subtotal/:total/:producto",(req,res,next)=>{
      var sql = "INSERT INTO detalleventa (idventa,cantidad,status,subtotal,total,producto) "+
      "VALUES(?,?,?,?,?,?)";       
      db.all(sql, (err, row) => {
          if (err) {
            res.json({"error":err.message});
            return;
          }
          res.json({
              "message":"success",
              "data":row
          });
        });
    });

    router.get("/getventas/:cliente/:aniomes/:calibre",(req,res,next)=>{
      var sql = `SELECT sum(cantidad) as venta FROM detalleventa 
                  where producto='${req.params.calibre}' and 
                  aniomes='${req.params.aniomes}' and 
                  cliente='${req.params.cliente}' and
                  status = 'activo'`;
      console.log(sql);       
      db.all(sql,[] ,(err, row) => {
          if (err) {
            res.json({"error":err.message});
            return;
          }
          res.json({
              "message":"success",
              "data":row
          });
        });
    });

    router.get("/altaventa/:prefijo/:status/:cliente/:fecha",(req,res,next)=>{
      var sql = `Insert into ventas (prefijo,status,cliente,fecha) values(?,?,?,?)`;       
      db.all(sql,[req.params.prefijo,req.params.status,req.params.cliente,req.params.fecha] ,(err, row) => {
          if (err) {
            res.json({"error":err.message});
            return;
          }
          res.json({
              "message":"success",
              "data":row
          });
        });
    });

    router.get("/altadetsventa/:transaccion/:idventa/:fecha/:aniomes/:cantidad/:status/:producto/:cliente",(req,res,next)=>{
      var sql = `Insert into detalleventa (transaccion,idventa,fecha,aniomes,cantidad,status,producto,cliente) values(?,?,?,?,?,?,?,?)`;       
      db.all(sql,[req.params.transaccion,
                  req.params.idventa,
                  req.params.fecha,
                  req.params.aniomes,
                  req.params.cantidad,
                  req.params.status,
                  req.params.producto,
                  req.params.cliente] ,(err, row) => {
          if (err) {
            res.json({"error":err.message});
            return;
          }
          res.json({
              "message":"success",
              "data":row
          });
        });
    });
    router.get("/gettodaslasventas",(req,res,next)=>{
      var sql = `SELECT *FROM detalleventa`;       
      db.all(sql,[req.params.aniomes,req.params.cliente,req.params.calibre] ,(err, row) => {
          if (err) {
            res.json({"error":err.message});
            return;
          }
          res.json({
              "message":"success",
              "data":row
          });
        });
    });
    router.get('/getreporte/:sql', function (req, res, next) {
      console.log(req.params.sql);
      db.all(req.params.sql ,(err, row) => {
        if (err) {
          res.json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":row
        });
      });
    });

  return router;
}

module.exports = createRouter;