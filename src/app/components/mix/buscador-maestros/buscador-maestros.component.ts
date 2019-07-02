import { Component, OnInit, ViewChild } from '@angular/core';
import { MainserviceService } from 'src/app/mainservice.service';
import { MatTableDataSource, MatDialogRef, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-buscador-maestros',
  templateUrl: './buscador-maestros.component.html',
  styleUrls: ['./buscador-maestros.component.css']
})
export class BuscadorMaestrosComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;



  dataSource;

  displayedColumns: string[] = ['id','apellidoPaterno', 'apellidoMaterno', 'nombre'];

  maestros = [];

  constructor(private _mainService:MainserviceService, public dialogRef:MatDialogRef<BuscadorMaestrosComponent>) { 
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

  onNoClick(): void {
    this.dialogRef.close();
  }
  
  applyFilter(nombre: string) {
    this.dataSource.filter = nombre.trim().toLowerCase();
  }
}
