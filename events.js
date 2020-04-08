const express = require('express');

function createRouter(db) {
  const router = express.Router();
  const owner = '';

  // the routes are defined here

  router.get("/", (req, res, next) => {
    res.json({"message":"Ok"})
    });

    router.get("/consultauser/:id", (req, res, next) => {
      var sql = "select * from user where id >?"
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

      router.get("/insertcli/:id/:apaterno/:amaterno/:nombre/:direccion/:fecha/:estado/:ciudad/:tipo/:calibres", (req, res, next) => {
    
        var sql = "INSERT INTO  clientes VALUES(?,?,?,?,?,?,?,?,?,?)";
          var params ="";
        console.log(sql);
        
        db.all(sql,[req.params.id,
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


            router.get("/altacalibre/:desc/:calibre/:status", (req, res, next) => {
              var sql = "INSERT INTO calibres (descripcion,medida,status) VALUES(?,?,?)"
              
              db.all(sql, [req.params.desc,req.params.calibre,req.params.status], (err, row) => {
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

  
  return router;
}

module.exports = createRouter;