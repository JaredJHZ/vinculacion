import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MainserviceService } from 'src/app/mainservice.service';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {

  usuario:FormGroup;

  id;

  puestos: string [] = ['Maestro','Servicio'];

  constructor(public dialogRef:MatDialogRef<EditarUsuarioComponent>, @Inject(MAT_DIALOG_DATA) public data:any, private _mainService:MainserviceService) {

    
    
    this.usuario = new FormGroup({
      'nombreCompleto': new FormGroup({
        'nombre':new FormControl('',Validators.required),
        'apellidoPaterno': new FormControl('', Validators.required),
        'apellidoMaterno' : new FormControl('', Validators.required)
      }),
      'puesto': new FormControl('', Validators.required)
    })

    let formularioInicial = {
      'nombreCompleto': {
        'nombre':data.usuario.nombre,
        'apellidoPaterno': data.usuario.apellidoPaterno,
        'apellidoMaterno' : data.usuario.apellidoMaterno
      },
      'puesto':data.usuario.puesto
    }
    this.usuario.setValue(formularioInicial);
    
    this.id = data.usuario.id;
   
   }

  

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {

  }

  editar(): void {
    this._mainService.updateService(this.usuario.value,this.id).subscribe(
      (data) => this.dialogRef.close()
    )
  }

}
