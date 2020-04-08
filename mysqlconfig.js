/*const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
//const mysql = require('mysql');
const events = require('./events');


 var tablaClientes = "create table IF NOT EXISTS clientes (codigo varchar(8) primary key,amaterno varchar(30),apaterno varchar(30),nombre varchar(50),direccion text,cumpleanios date,estado text,ciudad text,tipo text,calibres text);"

 var sqlite3 = require('sqlite3').verbose();
 var db = new sqlite3.Database(':memory:');
 
 db.serialize(function() {
 
   db.run('CREATE TABLE lorem (info TEXT)');
   var stmt = db.prepare('INSERT INTO lorem VALUES (?)');
 
   for (var i = 0; i < 10; i++) {
     stmt.run('Ipsum ' + i);
   }
 
   stmt.finalize();
 
   db.each('SELECT rowid AS id, info FROM lorem', function(err, row) {
     console.log(row.id + ': ' + row.info);
   });
 });
 
 db.close();
 


/*
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'armeria'
});

//connection.connect();



const port = process.env.PORT || 8080;

const app = express()
  .use(cors())
  .use(bodyParser.json())
  .use(events(connection));

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});
*/

var express = require("express")
//var app = express()
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
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          descripcion unique, 
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
        apaterno varchar(30),
        amaterno varchar(30),
        nombre varchar(50),
        direccion text,
        localidad text,
        estado text,
        ciudad text,
        tipo text,
        calibres text);
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