import { Component, OnInit, ViewChild } from '@angular/core';
import { MainserviceService } from 'src/app/mainservice.service';
import { MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { EditarUsuarioComponent } from '../editar-usuario/editar-usuario.component';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-buscar-usuario',
  templateUrl: './buscar-usuario.component.html',
  styleUrls: ['./buscar-usuario.component.css']
})
export class BuscarUsuarioComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;



  displayedColumns: string[] = ['apellidoPaterno', 'apellidoMaterno', 'nombre', 'editar', 'eliminar'];
  
  usuarios = [];

  dataSource;

  constructor(private _mainService:MainserviceService, public dialog: MatDialog) { 
    this.getUsuarios();
  }

  openDialog(usuario): void {
    const dialogRef = this.dialog.open(EditarUsuarioComponent, {
      width: '250px',
      data: {usuario:usuario}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getUsuarios();
    });
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

  getUsuarios(): void {
    this._mainService.getUsuarios().subscribe(
      (data) => {
        this.usuarios = data;
        this.dataSource = new MatTableDataSource<any>(this.usuarios);
      }
    )
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

        this._mainService.deleteUsuario(id).subscribe(
          (data) => this.getUsuarios()
        )
      }
    })
  }

}
