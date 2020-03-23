import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  rout: Router;
  http;
  constructor(router: Router,
              http: HttpClient) { 
                this.http = http; 
                this.rout = router;
  }
calibres:any[];
tablecalibres: any[] = new Array;

  ngOnInit() {
    this.http.get(`http://localhost:8080/calibre`)
  .subscribe( (data: any) => {

          this.calibres = data;
          console.log(this.calibres);
          
  });
  }

agregacalibre(calibre:string, sellimit:string, limite:string){
      let temp: any= {
        cal: calibre,
        selli: sellimit,
        limit: limite 
      };

      this.tablecalibres.push(temp);

}

agregarcliente(codigo:string,
                amaterno:string,
                apaterno:string,
                nombre:string,
                direccion:string,
                fecha:Date,
                estado:string,
                ciudad:string,
                tipo:string){
                  
              let dato = `insert into clientes values('${codigo}','${amaterno}','${apaterno}','${nombre}','${direccion}','${fecha}','${estado}','${ciudad}','${tipo}',null,'${JSON.stringify(this.tablecalibres)}')`;

                  this.http.get(`http://localhost:8080/insertcli/${dato}`)
                  .subscribe( (data: any) => {
                
                          this.calibres = data;
                          console.log(data);
                          
                         if(data !== 'error'){
                           alert('CLIENTE AGREGADO CON EXITO');
                         }else{
                           alert('error al momento de guardar');
                         }
                          
                  });

}
 navegar(){

this.rout.navigateByUrl('/menu');
 }
}
