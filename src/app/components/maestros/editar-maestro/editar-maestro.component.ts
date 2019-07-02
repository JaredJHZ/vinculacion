import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MainserviceService } from 'src/app/mainservice.service';

@Component({
  selector: 'app-editar-maestro',
  templateUrl: './editar-maestro.component.html',
  styleUrls: ['./editar-maestro.component.css']
})
export class EditarMaestroComponent implements OnInit {

  maestro:FormGroup;

  id;

  constructor(public dialogRef:MatDialogRef<EditarMaestroComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private _mainService:MainserviceService) {
    this.maestro = new FormGroup({
      'nombreCompleto': new FormGroup({
        'nombre':new FormControl('',Validators.required),
        'apellidoPaterno': new FormControl('', Validators.required),
        'apellidoMaterno' : new FormControl('', Validators.required)
      })
    })


    let formularioInicial = {
      'nombreCompleto': {
        'nombre':data.maestro.nombre,
        'apellidoPaterno': data.maestro.apellidoPaterno,
        'apellidoMaterno' : data.maestro.apellidoMaterno
      }
    }
    this.maestro.setValue(formularioInicial);
    
    this.id = data.maestro.id;
   
   }



  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {

  }

  editar(): void {
    this._mainService.updateMaestro(this.maestro.value,this.id).subscribe(
      (data) => this.dialogRef.close()
    )
  }


}
