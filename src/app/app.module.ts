import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './componentes/menu/menu.component';
import { ClientesComponent } from './componentes/clientes/clientes.component';
import { CalibresComponent } from './componentes/calibres/calibres.component';
import { VentasComponent } from './componentes/ventas/ventas.component';
import { NavbarComponent } from './compontente/navbar/navbar.component';
import { RegresarComponent } from './componentes/regresar/regresar.component';
import { HttpClientModule } from '@angular/common/http';
import { ReporteclientesComponent } from './componentes/reporteclientes/reporteclientes.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ClientesComponent,
    CalibresComponent,
    VentasComponent,
    NavbarComponent,
    RegresarComponent,
    ReporteclientesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
