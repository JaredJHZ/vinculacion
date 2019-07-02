import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MainserviceService } from 'src/app/mainservice.service';

@Component({
  selector: 'app-editar-estudiante',
  templateUrl: './editar-estudiante.component.html',
  styleUrls: ['./editar-estudiante.component.css']
})
export class EditarEstudianteComponent implements OnInit {

  estudiante:FormGroup;

  numeroDeControl;

  constructor(public dialogRef:MatDialogRef<EditarEstudianteComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private _mainService:MainserviceService) { 
    this.estudiante = new FormGroup({
      'nombreCompleto': new FormGroup({
        'nombre':new FormControl('',Validators.required),
        'apellidoPaterno': new FormControl('', Validators.required),
        'apellidoMaterno' : new FormControl('', Validators.required)
      }),
      'semestre':  new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(2)]),
      'planDeEstudios': new FormControl('', [Validators.required])
    })

    let formularioInicial = {
      'nombreCompleto': {
        'nombre':data.estudiante.nombre,
        'apellidoPaterno': data.estudiante.apellidoPaterno,
        'apellidoMaterno' : data.estudiante.apellidoMaterno
      },
      "semestre": data.estudiante.semestre,
      "planDeEstudios": data.estudiante.planDeEstudios

    }
    this.estudiante.setValue(formularioInicial);
    
    this.numeroDeControl = data.estudiante.numeroDeControl;
   


  }

  editar(): void {
    this._mainService.updateEstudiante(this.estudiante.value,this.numeroDeControl).subscribe(
      (data) => this.dialogRef.close()
    )
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
