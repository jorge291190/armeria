import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


export interface cals{
  idcalibre:string,
  calibre: string;
  descripcion: string;
  ventapermitida:number;
  ventamesactual:number;
  ventainicial: number;
}

export interface detventas{
  idventa: number,
  fecha: string,
  cliente: string,
  aniomes: string,
  cantidad: number,
  status: string,
  subtotal :number,
  total: number,
  producto: string
  idtrans: string

}

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {

  tiles: any[] = [
    {text: 'One',   id:1 , cols: 1, rows: 4, color: ''},
    {text: 'Two',   id:2 , cols: 1, rows: 4, color: ''},
    {text: 'Three', id:3 , cols: 1, rows: 4, color: ''},
    {text: 'Four',  id:4 , cols: 2, rows: 4, color: ''},
    {text: 'Four',  id:5 , cols: 1, rows: 4, color: ''},
  ];
  date = new FormControl(new Date());
  folio = new FormControl();
  serializedDate = new FormControl((new Date()).toISOString());
  placeautocomplete ="Seleccionar Cliente";
  stateCtrl = new FormControl();
  clientes: any[] = [];
  filteredStates: Observable<any[]>;
  displayedColumns: string[] = ['calibre', 'descripcion', 'venta', 'ventamesactual'];
  clienteseleccionado:any = {};
  prefijo  ="V";
  cantidadVenta: number = 0;
  selectCalibre: string ="";
  actual = 0;
  ventaactual = 0;
  dataSource:any = new Array;
  calibres: any = new Array ;
   mes:number = new Date().getMonth()+1;
   anio:number = new Date().getFullYear();
  aniomes: string = `${this.anio}${this.mes}`;
  detallesventa: detventas[] = new Array();
  selcalibre: string;


  @ViewChild(MatTable,null) table: MatTable<any>;

  
  constructor(
    private http: HttpClient,
    private rout: Router,
    private _snackBar: MatSnackBar,
  ) {

    http.get('http://localhost:8000/selectclientes').subscribe(
      (res:any)=>{

          this.clientes = res.data;
          this.filteredStates = this.stateCtrl.valueChanges
          .pipe(
            startWith(''),
            map(state => state ? this._filterStates(state) : this.clientes.slice()));         
      }
    );
   }
  
  ngOnInit() {
  
    this.date.disable();
    this.folio.disable();
    this.http.get('http://localhost:8000/ultimaventa').subscribe(
      (res:any)=>{

        console.log(res.data[0].ultima);
        if(res.data[0].ultima === null){
         this.actual = 1;
        }
        else{
          this.actual = res.data[0].ultima+1;
        }
      }
    )
  }


  private _filterStates(value: string): any[] {
        const filterValue = this._normalizeValue(value);
        //return this.clientes.filter(cliente => cliente.codigo.toLowerCase().indexOf(filterValue) === 0);
      if(this.clientes.find(cliente => cliente.codigo.toLowerCase() === this.stateCtrl.value)){
            this.cantidadVenta = 0;
            this.selectCalibre  ="";
            const  temp:any = this.clientes.find(cliente => cliente.codigo.toLowerCase() === this.stateCtrl.value)
            console.log("Cliente",temp);
            this.dataSource = new Array<cals>();
            const arrtemp= (JSON.parse(temp.calibres));
            if(temp.tipo === "Club"){
                  this.prefijo = "C";
            }else {
                  this.prefijo = "V"
            }
      
        this.folio.setValue(this.prefijo+"-"+this.actual);
          arrtemp.forEach(element => {
                
                const tr: cals={
                idcalibre: element.cal[0].idcalibre,
                calibre: element.cal[0].medida,
                descripcion: element.cal[0].descripcion,
                ventapermitida:parseInt( element.limit),
                ventamesactual: 0,
                ventainicial:0       
                }
          this.dataSource.push(tr);
        });
      
        this.calibres = this.dataSource;

        this.clienteseleccionado = temp;
        this.detallesventa = new Array();
        this.selcalibre ="";
        this.table.renderRows();
}


this.actualizaVentaActual();
    return this.clientes.filter(cliente => 
      this._normalizeValue(cliente.codigo).includes(filterValue));
  
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

  public cargarCliente(){

    alert(this.stateCtrl.value);
  }

public consultaVentaCalibre(dat: string,des:string) {
  this.selcalibre = dat+"|"+des;



  this.http.get('http://localhost:8000/getventas/'+this.clienteseleccionado.codigo
                                            +"/"+this.aniomes+"/"+dat+"|"+des).subscribe(
                                              (dato: any)=>{

                                                 
                                                  if(dato.data[0].venta){
                                                    this.ventaactual = dato.data[0].venta;
                                                  }else{
                                                    this.ventaactual  = 0 ;
                                                  }
                                               
                                              }
                                              
                                            );                            
}


actualizaVentaActual(){
    //actualiza la tabla de venta para  que muestre las ventas actuales al momento de seleccionar
 this.dataSource.forEach(element => {
  console.log('http://localhost:8000/getventas/'+this.clienteseleccionado.codigo
  +"/"+this.aniomes+"/"+element.idcalibre);    
  this.http.get('http://localhost:8000/getventas/'+this.clienteseleccionado.codigo
  +"/"+this.aniomes+"/"+element.idcalibre).subscribe(
    (dato: any)=>{

      if(dato.data[0].venta){
          element.ventamesactual =  dato.data[0].venta;
          element.ventainicial =  dato.data[0].venta;
      }else{
          element.ventamesactual =  0;
          element.ventainicial   =  0
      }
    }
    
  );
   
  });
  this.calibres = this.dataSource;

  
  
  this.table.renderRows();
}



agregarDetalle(calibre: string){
if(!this.validaCalibreSeleccionado(calibre)){
    if(this.validaVenta(calibre)){
      const d = new Date();
      const id = d.getFullYear().toString()
                +d.getMonth().toString()
                +d.getDay().toString()
                +d.getHours().toString()
                +d.getMinutes().toString()
                +d.getSeconds().toString()
                +d.getMilliseconds().toString();
      const temp:detventas = {
        idventa: this.actual,
        fecha: new Date().toISOString(),
        cliente: this.clienteseleccionado.codigo,
        aniomes: this.aniomes,
        cantidad:this.cantidadVenta,
        status: "activo",
        subtotal: 0,
        total: 0,
        producto:this.selcalibre,
        idtrans: id
      }
      const temporal: number = this.getCalibre(calibre).ventamesactual;
      this.getCalibre(calibre).ventamesactual = temporal +this.cantidadVenta;

      this.detallesventa.push(temp);
      this.cantidadVenta = 0;
      this.openSnackBar("Detalle Agregado Con Exito","Ok");
    }else{

      this.openSnackBar("Error Cantidad de Venta","Error");
      this.cantidadVenta = 0;
    }
  }else{
    this.openSnackBar("Calibre ya Seleccionado","Error");
    this.selcalibre ="";
  }

}

updateDetVenta(dato: string,cant,calibre: string){
  const detalle =  this.detallesventa.find(dat => dat.idtrans === dato);
  detalle.cantidad = cant;
  const  c: number = this.getCalibre(calibre).ventainicial;
  let valida: number= 0 ;
  if(cant){
    valida = parseInt(cant);
  }else{
    valida = 0;
  }
  
  const validador:number =  c + valida; 
 
  if( validador <= this.getCalibre(calibre).ventapermitida ){
 
    this.getCalibre(calibre).ventamesactual = validador;
  }else{

    this.openSnackBar("Error Cantidad Invalida","Error");
  }


}

eliminarDetalle(id:string, idcalibres:string){

   const temp:number = this.detallesventa.find(dat => dat.idtrans === id).cantidad;
    this.getCalibre(idcalibres).ventamesactual = this.getCalibre(idcalibres).ventamesactual-temp;

    this.detallesventa = this.detallesventa.filter(dat => dat.idtrans !== id);

}

navegar(){

  this.rout.navigateByUrl('/menu');
  }
  

public validaVenta (calibre: string): boolean{
      
  const caltemp = this.dataSource.find(data => data.idcalibre ===calibre);
  if(this.cantidadVenta+caltemp.ventamesactual > caltemp.ventapermitida || this.cantidadVenta == 0){
 
      return false;
   
  } else {
    return true;
  }

}
getCalibre(calibre:string): cals{

  return this.dataSource.find(data => data.idcalibre === calibre);

}

openSnackBar(message: string, action: string) {
  this._snackBar.open(message, action, {
    duration: 5000,
  });
}

validaCalibreSeleccionado(idcalibre:string): boolean{

  if(this.detallesventa.find(dato=> dato.producto === idcalibre)){
      return true;

  }else{
      return false;
  }

}

altaVentas(){

  const fecha = new Date();
this.http.get(`http://localhost:8000/altaventa/${this.prefijo}/Activo/${this.clienteseleccionado.codigo}/${fecha.getTime()}`).subscribe(
 (data : any)=>{

  console.log(data);

 }
);

this.detallesventa.forEach(element => {
console.log(element);


  this.http.get(`http://localhost:8000/altadetsventa/${element.idtrans}/${element.idventa}/${element.fecha}/${element.aniomes}/${element.cantidad}/${element.status}/${element.producto}/${element.cliente}`).subscribe(
      (data: any)=>{
          console.log(data);
          
      }
  );
  
});
this.clienteseleccionado = {};
this.prefijo  ="V";
this.cantidadVenta = 0;
this.selectCalibre="";
this.actual = 0;
this.ventaactual = 0;
this.dataSource = new Array;
this.calibres = new Array ;
this.detallesventa = new Array();
this.selcalibre ="";

this.openSnackBar("Vente Agregada Con Exito","Ok");
}

}
