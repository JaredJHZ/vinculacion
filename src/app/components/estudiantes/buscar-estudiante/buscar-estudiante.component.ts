import { Component, OnInit, ViewChild } from '@angular/core';
import { MainserviceService } from 'src/app/mainservice.service';
import { MatDialog, MatTableDataSource, MatPaginator } from '@angular/material';
import { EditarEstudianteComponent } from '../editar-estudiante/editar-estudiante.component';


import Swal from 'sweetalert2'
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-buscar-estudiante',
  templateUrl: './buscar-estudiante.component.html',
  styleUrls: ['./buscar-estudiante.component.css']
})
export class BuscarEstudianteComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  displayedColumns: string[] = ['numeroDeControl','apellidoPaterno', 'apellidoMaterno', 'nombre','semestre', 'editar', 'eliminar'];
  
  estudiantes = [];

  dataSource;

  getEstudiantes(): void {
    this._mainService.getEstudiantes().subscribe(
      (data) => {
        this.estudiantes = data;
        this.dataSource = new MatTableDataSource<any>(this.estudiantes);
      }
    )
  }


  constructor(private _mainService:MainserviceService, public dialog:MatDialog) { 
    this.getEstudiantes();
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

  openDialog(estudiante): void {
    const dialogRef = this.dialog.open(EditarEstudianteComponent, {
      width: '250px',
      data: {estudiante:estudiante}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getEstudiantes();
    });
  }

  eliminar(numeroDeControl): void {
    Swal.fire({
      title: 'Esta seguro?',
      text: "No podra revertir esto!!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borralo'
    }).then((result) => {
      if (result.value) {

        this._mainService.deleteEstudiante(numeroDeControl).subscribe(
          (data) => this.getEstudiantes()
        )
      }
    })
  }

}
