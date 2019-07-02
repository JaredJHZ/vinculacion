import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatDialog, MatTableDataSource, MatDialogRef } from '@angular/material';
import { MainserviceService } from 'src/app/mainservice.service';

@Component({
  selector: 'app-buscador-estudiantes',
  templateUrl: './buscador-estudiantes.component.html',
  styleUrls: ['./buscador-estudiantes.component.css']
})
export class BuscadorEstudiantesComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  dataSource;

  displayedColumns: string[] = ['numeroDeControl','apellidoPaterno', 'apellidoMaterno', 'nombre'];

  estudiantes:any[] = [];

  constructor(private _mainService:MainserviceService,  public dialogRef:MatDialogRef<BuscadorEstudiantesComponent>) { 
    this.getEstudiantes();
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

  getEstudiantes(): void {
    this._mainService.getEstudiantes().subscribe(
      (data) => {
        this.estudiantes = data;
        this.dataSource = new MatTableDataSource<any>(this.estudiantes);

      }
    )
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  
  applyFilter(nombre: string) {
    this.dataSource.filter = nombre.trim().toLowerCase();
  }

}
