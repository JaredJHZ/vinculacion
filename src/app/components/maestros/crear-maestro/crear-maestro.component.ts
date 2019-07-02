import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MainserviceService } from 'src/app/mainservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-maestro',
  templateUrl: './crear-maestro.component.html',
  styleUrls: ['./crear-maestro.component.css']
})
export class CrearMaestroComponent implements OnInit {

  maestro: FormGroup;



  constructor(private _mainService: MainserviceService, private router:Router) {

    this.maestro = new FormGroup({
      'nombreCompleto': new FormGroup({
        'nombre':new FormControl('',Validators.required),
        'apellidoPaterno': new FormControl('', Validators.required),
        'apellidoMaterno' : new FormControl('', Validators.required),
        'titulo': new FormControl('',Validators.required)
      })
    })

   }

  ngOnInit() {
  }

  guardar() {
    this._mainService.crearMaestro(this.maestro.value)
        .subscribe(
          (data) => {
              this.router.navigate(['menu-maestros']);
          }
        )
  }

}
