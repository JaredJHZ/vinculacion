import { Component, OnInit } from '@angular/core';
import { MainserviceService } from 'src/app/mainservice.service';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { TitulacionComponent } from '../../mix/titulacion/titulacion.component';

@Component({
  selector: 'app-agregar-titulacion',
  templateUrl: './agregar-titulacion.component.html',
  styleUrls: ['./agregar-titulacion.component.css']
})
export class AgregarTitulacionComponent implements OnInit {

  dataSource;

  displayedColumns: string[] = ['nombre','alumno', 'agregar'];

  proyectos = [];


  constructor(private _mainService: MainserviceService, public dialog:MatDialog) {
      this.getProyectos();
   }

  ngOnInit() {
  }

  getProyectos(): void {
    this._mainService.getProyectos()
    .subscribe(
      (data:any[]) => {
        data = data.map((value:any) => {
          if (value.secretario === null) {
            return {
              'id':value.id,
              'nombre': value.nombreDelProyecto,
              'alumno':value.apellidoPaterno +" "+value.apellidoMaterno+" "+value.nombre
            }
          } else {
            return false;
          }

        }).filter(
          (value) => value
        )

        Promise.all(data).then(
          (x) => {
            this.proyectos = x;
            console.log(this.proyectos);
            this.dataSource = new MatTableDataSource<any>(this.proyectos);
          
          }
        )

     

        

        
      }
    )
  }

  applyFilter(palabra: string) {
    this.dataSource.filter = palabra.trim().toLowerCase();
  }

  openDialog(proyecto): void {
    const dialogRef = this.dialog.open(TitulacionComponent, {
      width: '250px',
      data: {proyecto:proyecto}
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

}
