import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validator, Validators} from '@angular/forms';
import { MainserviceService } from 'src/app/mainservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit {

  usuario: FormGroup;



  puestos: string [] = ['Maestro','Servicio'];

  constructor(private _mainService:MainserviceService, private router:Router) { 

    this.usuario = new FormGroup({
      'nombreCompleto': new FormGroup({
        'nombre':new FormControl('',Validators.required),
        'apellidoPaterno': new FormControl('', Validators.required),
        'apellidoMaterno' : new FormControl('', Validators.required)
      }),
      'password': new FormControl('', Validators.required),
      'puesto': new FormControl('', Validators.required)
    })

  }

  guardar():void {
    this._mainService.crearUsuario(this.usuario.value).subscribe(
      (data) => { 
        this.router.navigate(['/menu-usuarios']);
        
      }
    )
  }

  ngOnInit() {
  }

}
