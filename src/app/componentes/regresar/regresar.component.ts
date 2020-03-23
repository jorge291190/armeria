import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-regresar',
  templateUrl: './regresar.component.html',
  styleUrls: ['./regresar.component.css']
})
export class RegresarComponent implements OnInit {
router : Router;
  constructor(rout: Router) {
    this.router = rout;
   }

  ngOnInit() {
  }

  regresar(){
    this.router.navigateByUrl('/menu');
  }
}
