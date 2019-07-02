import { Component, OnInit, ViewChild } from '@angular/core';
import { MainserviceService } from 'src/app/mainservice.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formatos',
  templateUrl: './formatos.component.html',
  styleUrls: ['./formatos.component.css']
})
export class FormatosComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  displayedColumns: string[] = ['id','nombreDeProyecto', 'numeroDeControl', 'nombreAlumnos','tipoDeProyecto','periodo','ir'];
  
  proyectos = [];

  dataSource;

  constructor(private _mainService:MainserviceService, private router:Router) { 
      this.getProyectos();
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

  getProyectos() {
    this._mainService.getProyectos()  
        .subscribe(
          (data:any[]) => {
            console.log(data);
            data.map(
              (value) => {
                let i = this.exists(value.nombreDelProyecto);
                if (i) {
                  this.proyectos[i].alumnos += ' ,' + value.numeroDeControl;
                } else {
                  let proyecto = {
                    'nombreDelProyecto' : value.nombreDelProyecto,
                    'numeroDeControl':value.numeroDeControl,
                    'id':value.id,
                    'nombreAlumnos':value.apellidoPaterno+' '+value.apellidoMaterno+' '+value.nombre,
                    'tipoDeProyecto':value.tipoDeProyecto,
                    'periodo':value.periodo
                  }
                  this.proyectos.push(proyecto);
                }
              }
            )
            
            Promise.all(data).then(() => this.dataSource = new MatTableDataSource<any>(this.proyectos));

          }
        )
  }


  exists(nombreDelProyecto:string):number {
    let i = 0;
    for(let proyecto in this.proyectos) {
      i+=1;
      if (proyecto['nombreDelProyecto'] === nombreDelProyecto) {
        return i;
      }
    }
    return null;
  }

  formats(id) {
    this.router.navigate(['/formato',id]);
  }

}
