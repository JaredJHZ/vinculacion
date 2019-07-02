import { Component, OnInit, ViewChild } from '@angular/core';
import { MainserviceService } from 'src/app/mainservice.service';
import { MatTableDataSource, MatDialog, MatPaginator } from '@angular/material';

import Swal from 'sweetalert2'
import { EditarMaestroComponent } from '../editar-maestro/editar-maestro.component';

@Component({
  selector: 'app-buscar-maestros',
  templateUrl: './buscar-maestros.component.html',
  styleUrls: ['./buscar-maestros.component.css']
})
export class BuscarMaestrosComponent implements OnInit {

  dataSource;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  displayedColumns: string[] = ['id','apellidoPaterno', 'apellidoMaterno', 'nombre', 'editar', 'eliminar'];

  maestros = [];

  constructor(private _mainService:MainserviceService, public dialog:MatDialog) { 
    this.getMaestros();
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

  getMaestros(): void {
    this._mainService.getMaestros().subscribe(
      (data) => {
        this.maestros = data;
        this.dataSource = new MatTableDataSource<any>(this.maestros);

      }
    )
  }

  openDialog(maestro): void {

    const dialogRef = this.dialog.open(EditarMaestroComponent, {
      width: '250px',
      data: {maestro:maestro}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getMaestros();
    });
  }

  eliminar(id): void {
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

        this._mainService.deleteMaestro(id).subscribe(
          (data) => this.getMaestros()
        )
      }
    })
  }

}
