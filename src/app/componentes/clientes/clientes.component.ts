import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatTable } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
export interface Tile {
  color: string;
  id: number;
  cols: number;
  rows: number;
  text: string;
}

export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}
@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  rout: Router;
  codigo    : string;
  rfa       :string;
  apaterno  : string;
  amaterno  : string;
  nombre    : string;
  direccion : string;
  estado    : string;
  ciudad    : string;
  localidad : string;
  tipo      : string;
  cal       :string;
  desc      :string;

  tipos:any [] = ['Club','No Club']; 
  @ViewChild(MatTable,null) table: MatTable<any>;
  http;
  calibres:any[] =[];
  tablecalibres: any[] = new Array;
  tiles: Tile[] = [
    {text: 'One',  id:1, cols: 2, rows: 7, color: ''},
    {text: 'Two',  id:2, cols: 1, rows: 7, color: ''},
    {text: 'Three',id:3, cols: 1, rows: 3, color: ''},
    {text: 'Four', id:4, cols: 1, rows: 4, color: '#ffffff'},
  ];
  dataSource: any = new Array; 
  displayedColumns: string[] = ['Calibre','Cantidad','Delete'];
  
  constructor(router: Router,
              http: HttpClient,
              private _snackBar: MatSnackBar,
              public dialog: MatDialog) { 
                this.http = http; 
                this.rout = router;
  }

  ngOnInit() {
    this.http.get(`http://localhost:8000/calibres`)
  .subscribe( (data: any) => {


  Array.from(data.data).forEach(element => {
      this.calibres.push(element);
    });
        console.log(data.data);  
  });
  }

calibre: string;
cantidad  : string;
status: string;

agregacalibre(){
      let temp: any= {
        cal: this.calibres.filter(data => data.idcalibre === this.calibre),
        limit: this.cantidad,
        status: this.status 
      };

      this.dataSource.push(temp);
      console.log(temp);
      
      this.table.renderRows();
      this.calibre= "";
      this.cantidad ="";
      this.status = "";
}

agregarcliente(){
                  
              let dato = `http://localhost:8000/insertcli/${this.codigo}/${this.rfa}/${this.apaterno}/${this.amaterno}/${this.nombre}/${this.direccion}/${this.localidad}/${this.estado}/${this.ciudad}/${this.tipo}/${JSON.stringify(this.dataSource)}`;
                    console.log(dato);
                    
                 this.http.get(dato)
                  .subscribe( (data: any) => {
            
                          console.log(data);
                          
                         if(data.error){
                          this.openSnackBar('Error Codigo de Cliente Duplicado','Error');
                          this.codigo   ="";
                          
                         }else{
                          this.codigo   ="";
                          this.rfa      ="";
                          this.apaterno ="";
                          this.amaterno ="";
                          this.nombre   ="";
                          this.direccion="";
                          this.estado   ="";
                          this.ciudad   ="";
                          this.localidad="";
                          this.tipo     ="";
                          this.cantidad ="";
                          this.openSnackBar('Cliente Agregado Con Exito','OK');
                          this.dataSource = new Array;
                          this.table.renderRows();

                          
                         }
                          
                  });

                  console.log(this.codigo);
                  



}
 navegar(){

this.rout.navigateByUrl('/menu');
}

 eliminar(dato: string){

  let temp:any = this.dataSource.filter(valor => valor.cal !== dato);

  this.dataSource = temp;
}

altaCalibre(cali: string, desc: string){
console.log(`http://localhost:8000/altacalibre/${desc}/${cali}/Activo/${cali}|${desc}`);

  this.http.get(`http://localhost:8000/altacalibre/${desc}/${cali}/Activo/${cali}|${desc}`)
  .subscribe( (data: any) => {
          const cal: any = {
              idcalibre: new String(cali+"|"+desc),
              descripcion: desc,
              medida:      cali,
              status:  "Activo"
          }
         
          if(data.error){

           this.openSnackBar('ERROR AL AGREGAR EL CALIBRE',"ERROR");
          }else{
            this.calibres.push(cal);
            this.openSnackBar('CALIBRE AGREGADO CON EXITO',"OK");
          }

          console.log(this.calibres);
          
  });

}

openSnackBar(message: string, action: string) {
  this._snackBar.open(message, action, {
    duration: 5000,
  });
}

openDialog(): void {
  const dialogRef = this.dialog.open(DialogDataExampleDialog, {
    data: {cal: this.cal, desc: this.desc}
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
      if(result){
        this.altaCalibre(result.calibre,result.descripcion);
      }
   
  });
}


}

@Component({
  selector: 'snack',
  templateUrl: 'snack.html',
})
export class DialogDataExampleDialog {
  constructor(public dialogRef: MatDialogRef<DialogDataExampleDialog>,
              @Inject(MAT_DIALOG_DATA)
              public data: any) {
                
  }
  desc;
  cal;
 
  onNoClick(): void {
    this.dialogRef.close();
  }
}