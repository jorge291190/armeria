const express = require('express');

function createRouter(db) {
  const router = express.Router();
  const owner = '';

  // the routes are defined here
  router.get('/insertcli/:id', (req, res, next) => {
    db.query(
      req.params.id,
      [req.params.id],
      (error) => {
        if (error) {
            console.error(error);
          res.status(500).json({status:'error'});
        } else {
          res.status(200).json({status: 'ok'});
        }
      }
    );
  });

  router.get('/consulta/:id', function (req, res, next) {
    console.log( `SELECT  *FROM clientes where id = ${req.params.id}`);
    db.query(
      `SELECT  *FROM clientes where id = ${req.params.id}`,
    
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

  router.get('/consulta', function (req, res, next) {
    console.log( `SELECT  *FROM clientes where id = ${req.params.id}`);
    db.query(
      `SELECT  *FROM clientes`,
      [],
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

  router.put('/event/:id', function (req, res, next) {
    db.query(
      'UPDATE events SET name=?, description=?, date=? WHERE id=? AND owner=?',
      [req.body.name, req.body.description, new Date(req.body.date), req.params.id, owner],
      (error) => {
        if (error) {
          res.status(500).json({status: error});
        } else {
          res.status(200).json({status: 'ok'});
        }
      }
    );
  });

  router.delete('/event/:id', function (req, res, next) {
    db.query(
      'DELETE FROM events WHERE id=? AND owner=?',
      [req.params.id, owner],
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