import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-reportecalibres',
  templateUrl: './reportecalibres.component.html',
  styleUrls: ['./reportecalibres.component.css']
})
export class ReportecalibresComponent implements OnInit {
  tiles: any[] = [
    {id:1,text: 'One', cols: 4, rows: 1, color: 'lightblue'},
    {id:2,text: 'Two', cols: 2, rows: 2, color: 'lightgreen'},
    {id:3,text: 'Three', cols: 2, rows: 1, color: 'lightpink'},
    {id:4,text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
  ];

  arrcalibres = new Array();
  constructor(private http:HttpClient) { }

  ngOnInit() {

    this.http.get('http://localhost:8000/calibres').subscribe(
      (data: any) =>{

        console.log(data);
       data.data.forEach(element => {
//0E006F color azul
//ffffff colro blanco
//000000 color negro 
        const temp = {
            calibre: element.idcalibre,
            color: "#ffffff",
            letra: "#000000"

        }
          this.arrcalibres.push(temp);
        });
        
      }
    );
    
  }

  filtrosActios: any= new Array();
marcarDesmarcar(calibre: string){
const temp = this.arrcalibres.find(buscador => buscador.calibre === calibre);

if(temp.color === "#ffffff"){
  this.arrcalibres.find(buscador => buscador.calibre === calibre).color = "#0E006F";
  this.arrcalibres.find(buscador => buscador.calibre === calibre).letras = "#ffffff";
  this.filtrosActios.push(temp);
  

}else if(temp.color === "#0E006F"){
  this.arrcalibres.find(buscador => buscador.calibre === calibre).color = "#ffffff";
  this.arrcalibres.find(buscador => buscador.calibre === calibre).letras = "#000000";
  const arrtemp = this.filtrosActios.filter(buscador => buscador.calibre !== calibre);
  this.filtrosActios =  arrtemp;
 
  
}
console.log(this.filtrosActios);


}

 
}
