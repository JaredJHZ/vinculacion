import { Component, OnInit, Inject } from '@angular/core';
import { MainserviceService } from 'src/app/mainservice.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ValidarMaestro } from 'src/app/validators/existeElMaestro.validator';
import Swal from 'sweetalert2'
import { BuscadorMaestrosComponent } from '../buscador-maestros/buscador-maestros.component';
@Component({
  selector: 'app-titulacion',
  templateUrl: './titulacion.component.html',
  styleUrls: ['./titulacion.component.css']
})
export class TitulacionComponent implements OnInit {

  informacionDeTitulacion: FormGroup;

  id;

  tipos: string [] = ['INFORME TECNICO DE RESIDENCIA PROFESIONAL','TESIS','EXAMEN GLOBAL POR AREA DE CONOCIMIENTO', 'EXAMEN CENEVAL'];

  constructor(public dialogRef:MatDialogRef<TitulacionComponent>, @Inject(MAT_DIALOG_DATA) public data:any,
   private _mainService:MainserviceService , public dialog:MatDialog) { 
      this.id = data.proyecto.id;
      this.informacionDeTitulacion = new FormGroup({
        'secretario': new FormControl('',Validators.required, ValidarMaestro.createValidator(_mainService)),
        'vocal':new FormControl('',Validators.required, ValidarMaestro.createValidator(_mainService)),
        'vocalSuplente':new FormControl('',Validators.required, ValidarMaestro.createValidator(_mainService)),
        'tipoDeProyecto':new FormControl('', Validators.required)
      })
  }

  ngOnInit() {

  }

  guardar() {
    this._mainService.updateProyecto(this.informacionDeTitulacion.value,this.id)
        .subscribe(
          (data) => this.generarMensajeDeConfirmacion()
        )
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  generarMensajeDeConfirmacion():void {
    Swal.fire({
      type: 'success',
      title: 'Proyecto actualizado',
      text:'Proyecto agregado a titulacion!'
    })
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(BuscadorMaestrosComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }


}
