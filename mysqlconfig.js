var express = require("express");
const events = require('./events');
var sqlite3 = require('sqlite3').verbose();
var md5 = require('md5')
const cors = require('cors');
const bodyParser = require('body-parser');
const DBSOURCE = "db.sqlite"


let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    }else{
        console.log('Connected to the SQLite database.')

        db.run(`CREATE TABLE IF NOT EXISTS  user (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text, 
            email text, 
            password text)`,
        (err) => {
            if (err) {
                // Table already created
            }else{
                
            }
        });  

        db.run(`CREATE TABLE IF NOT EXISTS calibres (
          idcalibre text unique,
          descripcion text, 
          medida text, 
          status text)`,
      (err) => {
          if (err) {
              // Table already created
          }else{
              // Table just created, creating some rows
          
          }
      }); 

        db.run(`CREATE TABLE IF NOT EXISTS clientes 
        (codigo varchar(8) primary key,
        rfa text unique,
        apaterno varchar(30),
        amaterno varchar(30),
        nombre varchar(50),
        direccion text,
        localidad text,
        estado text,
        ciudad text,
        tipo text,
        calibres text,
        ultimacompra date);
        `,
      (err) => {
          if (err) {
              // Table already created
          }else{
              // Table just created, creating some rows
            
          }
      });  

      
      db.run(`CREATE TABLE IF NOT EXISTS ventas 
      (folio INTEGER PRIMARY KEY AUTOINCREMENT,
      prefijo varchar(4),
      status text,
      cliente text,
      fecha timestamp,
      total float);
      `,
    (err) => {
        if (err) {
            // Table already created
        }else{
            // Table just created, creating some rows
          
        }
    });  

    
    db.run(`CREATE TABLE IF NOT EXISTS detalleventa 
    (   transaccion text unique,
        idventa int,
        fecha date,
        cliente text,
        aniomes text,
        cantidad float,
        status text,
        subtotal float,
        total float,
        producto text
      );
    `,
  (err) => {
      if (err) {
          // Table already created
      }else{
          // Table just created, creating some rows
        
      }
  });  

    }
  });



const app = express()
  .use(cors())
  .use(bodyParser.json())
  .use(events(db));
module.exports = db
// Server port
var HTTP_PORT = 8000 
// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});


// Default response for any other request
app.use(function(req, res){
  res.status(404);
});