import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  
  datos: any = [{
    imagen: 'https://phoneky.co.uk/thumbs/screensavers/down/abstract/greenfluid_bv5c7t5f.gif',
    menu:'clientes',
    titulo: 'Alta Clientes' ,
    id:"hogar",
    rgb: "#ffffff",
    font: "#000000",

},
{
  imagen: 'https://phoneky.co.uk/thumbs/screensavers/down/abstract/greenfluid_bv5c7t5f.gif',
  menu:'ventas',
  titulo: 'Alta Ventas' ,
  id:"hogar",
  rgb: "#000000",
  font: "#ffffff",

},
{
  imagen: 'https://phoneky.co.uk/thumbs/screensavers/down/abstract/greenfluid_bv5c7t5f.gif',
  menu:'calibres',
  titulo: 'Alta Calibres' ,
  id:"hogar",
  rgb: "#000000",
  font: "#ffffff",

},
{
  imagen: 'https://phoneky.co.uk/thumbs/screensavers/down/abstract/greenfluid_bv5c7t5f.gif',
  menu:'reporte',
  titulo: 'Reporte' ,
  id:"hogar",
  rgb: "#000000",
  font: "#ffffff",

}

  ];

  tiles: any[] = [
    {text: 'One',  id:1, cols: 2, rows: 4, color: 'white'},
    {text: 'Two',  id:2, cols: 2, rows: 4, color: 'lightgreen'},
    {text: 'Three',id:3, cols: 2, rows: 3, color: 'lightpink'},
    {text: 'Four', id:4, cols: 2, rows:4, color: '#ffffff'},
  ];

  router : Router;
  peticion;
  constructor(rout: Router,
              http: HttpClient) { 
              this.peticion = http;    
               this.router = rout;
  }

  ngOnInit() {
  }
  
navegar(ruta: String){
  this.router.navigateByUrl('/'+ruta);
}
}
