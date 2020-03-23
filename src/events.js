const express = require('express');

function createRouter(db) {
  const router = express.Router();
  const owner = '';

  // the routes are defined here
  router.get('/clientes/:data', (req, res, next) => {
    db.query(
      `INSERT INTO clientes VALUES (${req.params.data})'`,
      [],
      (error) => {
        if (error) {
          console.error(error);
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json({status: 'ok'});
        }
      }
    );
  });

  router.get('/calibre', (req, res, next) => {
    db.query(
      'Select *from calibres',
      [owner, 10*(req.params.page || 0)],
      (error,results) => {
        if (error) {
          console.error(error);
          res.status(500).json({status: 'error'});
          console.log('hola');
        } else {
          res.status(200).json(results);
          console.log('hola');
        }
      }
    );
  });


  router.get('/consulta', function (req, res, next) {
    db.query(
      'SELECT  *FROM clientes',
      [owner, 10*(req.params.page || 0)],
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json(results);
        }
      }
    );
  });

  router.put('/event/:id', function (req, res, next) {
    db.query(
      'UPDATE events SET name=?, description=?, date=? WHERE id=? AND owner=?',
      [req.body.name, req.body.description, new Date(req.body.date), req.params.id, owner],
      (error) => {
        if (error) {
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json({status: 'ok'});
        }
      }
    );
  });

  return router;
}

module.exports = createRouter;