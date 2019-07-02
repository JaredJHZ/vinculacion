import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { MainserviceService } from 'src/app/mainservice.service';
import { ValidarMaestro } from 'src/app/validators/existeElMaestro.validator';
import { ValidarAlumno } from 'src/app/validators/existeElAlumno.validators';
import { MatDialog } from '@angular/material';
import { BuscadorMaestrosComponent } from '../../mix/buscador-maestros/buscador-maestros.component';
import { BuscadorEstudiantesComponent } from '../../mix/buscador-estudiantes/buscador-estudiantes.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-agregar-proyecto',
  templateUrl: './agregar-proyecto.component.html',
  styleUrls: ['./agregar-proyecto.component.css']
})
export class AgregarProyectoComponent implements OnInit {

  proyecto:FormGroup;
  asesor:string;
  asesorExterno:string;
  dosAlumnos:boolean;
  empresa:string;
  estudianteUno:string;
  estudianteDos:string;
  alumnosEnProyecto = [];

  constructor(private _mainService:MainserviceService, public dialog:MatDialog, private router:Router) {
    this.proyecto = new FormGroup({
      'nombre': new FormControl('',Validators.required),
      'asesor':new FormControl('', [Validators.required], ValidarMaestro.createValidator(this._mainService)),
      'asesorExterno': new FormControl('',Validators.required),
      'estudianteUno': new FormControl('',Validators.required,[ValidarAlumno.createValidator(_mainService)]),
      'empresa':new FormControl('', Validators.required),
      'periodo': new FormControl('', Validators.required)
    })

    this._mainService.proyectoAsignado()
        .subscribe(
          (data) => {
            this.alumnosEnProyecto = data;

          }
        )
   }
  ngOnInit() {
  }
  getAsesor(event) {
   if(this.proyecto.get("asesor").valid) {
    let id = event.target.value;
    this._mainService.getMaestro(id)
        .subscribe(
          (data) => this.asesor = data.nombre + " " + data.apellidoPaterno + " "+data.apellidoMaterno
        )
   } else {
     this.asesor = null;
   }
  }


   getEstudianteUno(event) {
    if(this.proyecto.get("estudianteUno").valid) {
      let numeroDeControl = event.target.value;
      this._mainService.getEstudiante(numeroDeControl)
          .subscribe(
            (data) => {
              this.estudianteUno = data.nombre + " " + data.apellidoPaterno + " "+data.apellidoMaterno;

            }
          )
     } else {
       this.estudianteUno = null;
     }

     this.verificarAlumnos();
     this.estudianteDos = "Escriba numero de control"
   }

   getEstudianteDos(event) {

    if(this.proyecto.get("estudianteDos").valid) {
      let numeroDeControl = event.target.value;
      this._mainService.getEstudiante(numeroDeControl)
          .subscribe(
            (data) => this.estudianteDos = data.nombre + " " + data.apellidoPaterno + " "+data.apellidoMaterno
          )
     } else {
       this.estudianteDos = null;
     }
   }
   

   changeValue(value) {
    this.dosAlumnos = !value;
    if (this.dosAlumnos) {
      this.proyecto.addControl('estudianteDos', new FormControl('',Validators.required,[ValidarAlumno.createValidator(this._mainService)]))
    } else {
      this.proyecto.removeControl('estudianteDos');
    }
  }

  verificarAlumnos():boolean {

    if(!this.dosAlumnos) {
      for(let estudiante of this.alumnosEnProyecto) {

        if(estudiante.numeroDeControl === Number(this.proyecto.get('estudianteUno').value)) {
          this.proyecto.controls['estudianteUno'].setErrors({'yaExiste': true});
          return false;
        }
      }
      return true;
    } else {
      for(let estudiante of this.alumnosEnProyecto) {

        if(estudiante.numeroDeControl === Number(this.proyecto.get('estudianteUno').value)) {
          this.proyecto.controls['estudianteUno'].setErrors({'yaExiste': true});
          return false;
        } else if (estudiante.numeroDeControl === Number(this.proyecto.get('estudianteUno').value)) {
          this.proyecto.controls['estudianteDos'].setErrors({'yaExiste': true});
          return false;
        }
      }
      return true;
    }
  }
   guardar() {
     console.log(this.proyecto);
      this._mainService.crearProyecto(this.proyecto.value)
      .subscribe(
        (data) => {
          this.router.navigate(['/','menu-proyectos']);
        }
      )
   }

   openDialog(): void {
    const dialogRef = this.dialog.open(BuscadorMaestrosComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  openStudents():void {
    const dialogRef = this.dialog.open(BuscadorEstudiantesComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

}
