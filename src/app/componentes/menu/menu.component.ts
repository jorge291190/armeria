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

}

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
