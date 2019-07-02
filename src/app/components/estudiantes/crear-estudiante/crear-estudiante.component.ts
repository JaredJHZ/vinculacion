import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MainserviceService } from 'src/app/mainservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-estudiante',
  templateUrl: './crear-estudiante.component.html',
  styleUrls: ['./crear-estudiante.component.css']
})
export class CrearEstudianteComponent implements OnInit {

  estudiante:FormGroup;

  constructor(private _mainService:MainserviceService, private router:Router) { 

    this.estudiante = new FormGroup({
      'nombreCompleto': new FormGroup({
        'nombre':new FormControl('',Validators.required),
        'apellidoPaterno': new FormControl('', Validators.required),
        'apellidoMaterno' : new FormControl('', Validators.required)
      }),
      'numeroDeControl': new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]),
      'semestre':  new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(2)]),
      'planDeEstudios': new FormControl('', [Validators.required])
    })

  }

  ngOnInit() {
  }

  guardar() {
   this._mainService.crearEstudiante(this.estudiante.value)
      .subscribe(
        (data) => this.router.navigate(['/','menu-estudiantes'])
      )
  }

}
