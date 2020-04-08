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
calibres:any[] =[];
tablecalibres: any[] = new Array;

  ngOnInit() {
    this.http.get(`http://localhost:8000/calibres`)
  .subscribe( (data: any) => {


  Array.from(data.data).forEach(element => {
      this.calibres.push(element);
    });
        console.log(data.data);
          


        
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
                localidad:string,
                estado:string,
                ciudad:string,
                tipo:string){
                  
              let dato = `http://localhost:8000/insertcli/${codigo}/${apaterno}/${amaterno}/${nombre}/${direccion}/${localidad}/${estado}/${ciudad}/${tipo}/${JSON.stringify(this.tablecalibres)}`;
                    console.log(dato);
                    
                  this.http.get(dato)
                  .subscribe( (data: any) => {
            
                          console.log(data);
                          
                         if(data.error){
                          alert('error al momento de guardar');
                          
                         }else{
                          alert('CLIENTE AGREGADO CON EXITO');
                         }
                          
                  });

}
 navegar(){

this.rout.navigateByUrl('/menu');
 }

altaCalibre(desc: string,calibre: string){

  this.http.get(`http://localhost:8000/altacalibre/${desc}/${calibre}/Activo`)
  .subscribe( (data: any) => {
          const cal: any = {
              descripcion: desc,
              medida:  calibre,
              status:  "Activo"
          }
         

          if(data.error){

            alert('error al guardar el registro');
          }else{
            this.calibres.push(cal);
            alert('calibre agregado con exito');
          }

          console.log(this.calibres);
          
  });

}
}
