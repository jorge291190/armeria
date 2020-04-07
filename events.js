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

  
  return router;
}

module.exports = createRouter;