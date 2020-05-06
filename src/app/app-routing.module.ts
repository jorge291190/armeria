import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientesComponent, DialogDataExampleDialog } from './componentes/clientes/clientes.component';
import { MenuComponent } from './componentes/menu/menu.component';
import { CalibresComponent } from './componentes/calibres/calibres.component';
import { VentasComponent } from './componentes/ventas/ventas.component';
import { ReportecalibresComponent } from './componentes/reportecalibres/reportecalibres.component';



const routes: Routes = [

  {path: 'clientes', component: ClientesComponent},
  {path: 'menu', component: MenuComponent},
  {path: 'calibres', component: CalibresComponent},
  {path: 'ventas',component: VentasComponent},
  {path: 'reporte',component: ReportecalibresComponent},
  {path: '**', component: MenuComponent},
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
