import { Component, OnInit } from '@angular/core';
import { MainserviceService } from 'src/app/mainservice.service';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-imprimir',
  templateUrl: './imprimir.component.html',
  styleUrls: ['./imprimir.component.css']
})
export class ImprimirComponent implements OnInit {

  dataSource;

  displayedColumns: string[] = ['numeroDeControl', 'nombre'];

  alumnos:any[] = [];

  proyecto;

  maestros:any[] = [];

  constructor(private _mainService:MainserviceService, private activatedRoute:ActivatedRoute) {
      this.activatedRoute.params.subscribe(
        (params) => {
          let id = params['id'];

          this._mainService.getMaestros()
              .subscribe(
                (data) => {

                  this.maestros = data;

                  this._mainService.getAlumnosYProyectos(id)
                  .subscribe(
                    (proyecto) => {
                      console.log(proyecto);
                      this.proyecto = {
                        'id':id,
                        'nombreDelProyecto':proyecto[0].nombreDelProyecto,
                        'secretario': this.getNombre(proyecto[0].secretario),
                        'asesor':this.getNombre(proyecto[0].asesor),
                        'vocal':this.getNombre(proyecto[0].vocal),
                        'vocalSuplente':this.getNombre(proyecto[0].vocalSuplente),
                        'planDeEstudios':proyecto[0].planDeEstudios,
                        'tipoDeProyecto':proyecto[0].tipoDeProyecto,
                        'asesorExterno':proyecto[0].asesorExterno,
                        'periodoDeResidencias':proyecto[0].periodo,
                        'empresa':proyecto[0].empresa
                      }

                      for (let estudiante of proyecto) {
                        this.alumnos.push({
                          'nombre': estudiante.nombre + ' ' +estudiante.apellidoPaterno + ' ' + estudiante.apellidoMaterno,
                          'numeroDeControl':estudiante.numeroDeControl
                        });
                      }


                      this.dataSource = new MatTableDataSource<any>(this.alumnos);

                      
                      
                    }
                  )


                }
              )


        }
      )
   }

  ngOnInit() {
    
  }

  //METODOS AUXILIARES

  getNombre(id):string {
    for(let maestro of this.maestros) {
      if (maestro.id === id) {
        return maestro.titulo +' '+maestro.nombre + ' ' +maestro.apellidoPaterno +' '+maestro.apellidoMaterno
      }
    }
  }

  generarMensajeDeConfirmacion():void {
    Swal.fire({
      type: 'success',
      title: 'Documento generado',
      text:'Documento generado!'
    })
  }

  // DOCUMENTOS RESIDENCIAS

  actaAsesor() {
    let day = new Date();
    let year = day.getFullYear();
    let fecha = day.getDate() + '/'+(day.getMonth()+1) + '/' +day.getFullYear()

    if(this.alumnos.length < 2) {
      this.asignarActaDeAsesor(this.alumnos[0],fecha,year);
    } else {
      this.asignarActaDeAsesor(this.alumnos[0],fecha,year);
      this.asignarActaDeAsesor(this.alumnos[1],fecha,year);
    }
  }

  actaCalificacion() {
    let day = new Date();
    let year = day.getFullYear();
    let fecha = day.getDate() + '/'+(day.getMonth()+1) + '/' +day.getFullYear()
    if(this.alumnos.length < 2) {
      this.asignarActaDeCalificacion(this.alumnos[0],fecha,year);
    } else {
      this.asignarActaDeCalificacion(this.alumnos[0],fecha,year);
      this.asignarActaDeCalificacion(this.alumnos[1],fecha,year);
    }
  }

  asignarActaDeAsesor(alumno,fecha,year):void {
    this._mainService.actaAsesor({
      'nombreDelProyecto': this.proyecto.nombreDelProyecto,
      'fecha':fecha,
      'asesor': this.proyecto.asesor,
      'asesorExterno': this.proyecto.asesorExterno,
      'periodo':this.proyecto.periodoDeResidencias + ' ' +year,
      'numeroDeControl':alumno.numeroDeControl,
      'nombreDelAlumno': alumno.nombre,
      'empresa': this.proyecto.empresa
    }).subscribe(
      (data) => {
        this.generarMensajeDeConfirmacion();
      }
    )
  }

  asignarActaDeCalificacion(alumno, fecha,year):void {
    this._mainService.actaCalificacion({
      'nombreDelProyecto': this.proyecto.nombreDelProyecto,
      'asesorInterno': this.proyecto.asesor,
      'asesorExterno': this.proyecto.asesorExterno,
      'periodoDeResidencias':this.proyecto.periodoDeResidencias + ' ' +year,
      'numeroDeControl':alumno.numeroDeControl,
      'nombreDelAlumno': alumno.nombre,
      'empresa': this.proyecto.empresa,
      'fecha':fecha
    }).subscribe(
      (data) => {
        console.log(data);
        this.generarMensajeDeConfirmacion()
      }
    )
  }


  //DOCUMENTOS DE TITULACION UN ALUMNO

  anexoB() {
    let day = new Date();
    let year = day.getFullYear();
    let fecha = day.getDate() + '/'+(day.getMonth()+1) + '/' +day.getFullYear()
    if(this.alumnos.length < 2) {
      this.generarAnexoB(this.alumnos[0],fecha);
    } else {
      this.generarAnexoB(this.alumnos[0],fecha);
      this.generarAnexoB(this.alumnos[1],fecha);
    }
  }

  anexoTres() {
    let day = new Date();
    let year = day.getFullYear();
    let fecha = day.getDate() + '/'+(day.getMonth()+1) + '/' +day.getFullYear();
    if(this.alumnos.length < 2) {
      this.generarAnexoTres(this.alumnos[0],fecha);
    } else {
      this.generarAnexoTres(this.alumnos[0],fecha);
      this.generarAnexoTres(this.alumnos[1],fecha);
    }
  }


  generarAnexoTres(alumno,fecha) {
    this._mainService.anexoTres({
      'nombreDelProyecto': this.proyecto.nombreDelProyecto,
      'numeroDeControl':alumno.numeroDeControl,
      'nombreDelAlumno': alumno.nombre,
      'tipoDeProyecto':this.proyecto.tipoDeProyecto,
      'fecha':fecha,
      'planDeEstudios':this.proyecto.planDeEstudios,
      'asesor': this.proyecto.asesor,
      'secretario':this.proyecto.secretario,
      'vocal':this.proyecto.vocal,
      'vocalSuplente':this.proyecto.vocalSuplente
    }).subscribe(
      (data) => {
        this.generarMensajeDeConfirmacion()
      }
    )
  }

  generarAnexoB(alumno,fecha) {
    this._mainService.anexoB({
      'nombreDelProyecto': this.proyecto.nombreDelProyecto,
      'asesor': this.proyecto.asesor,
      'secretario': this.proyecto.secretario,
      'vocal': this.proyecto.vocal,
      'vocalSuplente':this.proyecto.vocalSuplente,
      'numeroDeControl':alumno.numeroDeControl,
      'nombreDelAlumno': alumno.nombre,
      'tipoDeProyecto':this.proyecto.tipoDeProyecto,
      'fecha':fecha
    }).subscribe(
      (data) => {
        this.generarMensajeDeConfirmacion()
      }
    )
  }

  anexoUnoUnEstudiante() {
    if (this.alumnos) {
      this._mainService.anexoUnoUnEstudiante({
        'nombreDelProyecto':this.proyecto.nombreDelProyecto,
        'asesor':this.proyecto.asesor,
        'nombreDelEstudiante':this.alumnos[0].nombre,
        'numeroDeControl':this.alumnos[0].numeroDeControl
      }).subscribe(
        (data) => {
          this.generarMensajeDeConfirmacion()
        }
      )
    }
  }

  revisoresUno() {
    let day = new Date();
    let year = day.getFullYear();
    let fecha = day.getDate() + '/'+(day.getMonth()+1) + '/' +day.getFullYear()
    if(this.alumnos.length < 2) {
      this._mainService.revisoresUno({
        'nombreDelProyecto': this.proyecto.nombreDelProyecto,
        'numeroDeControl':this.alumnos[0].numeroDeControl,
        'nombreDelAlumno': this.alumnos[0].nombre,
        'tipoDeProyecto':this.proyecto.tipoDeProyecto,
        'fecha':fecha,
        'planDeEstudios':this.proyecto.planDeEstudios
      }).subscribe(
        (data) => {
          this.generarMensajeDeConfirmacion()
        }
      )
    }
  }

  notificacionRevisoresUno() {
    let day = new Date();
    let year = day.getFullYear();
    let fecha = day.getDate() + '/'+(day.getMonth()+1) + '/' +day.getFullYear()
    if(this.alumnos.length < 2) {
      this._mainService.notificacionRevisoresUno({
        'nombreDelProyecto': this.proyecto.nombreDelProyecto,
        'numeroDeControl':this.alumnos[0].numeroDeControl,
        'nombreDelAlumno': this.alumnos[0].nombre,
        'tipoDeProyecto':this.proyecto.tipoDeProyecto,
        'fecha':fecha,
        'planDeEstudios':this.proyecto.planDeEstudios,
        'secretario':this.proyecto.secretario,
        'vocal':this.proyecto.vocal,
        'vocalSuplente':this.proyecto.vocalSuplente
      }).subscribe(
        (data) => {
          this.generarMensajeDeConfirmacion()
        }
      )
    }
  }

  asesorUnEstudiante() {
    if(this.alumnos) {
      console.log(this.proyecto);
      this._mainService.asesorUnEstudiante({
        'nombreDelProyecto':this.proyecto.nombreDelProyecto,
        'asesor':this.proyecto.asesor,
        'nombreDelEstudiante':this.alumnos[0].nombre,
        'numeroDeControl':this.alumnos[0].numeroDeControl,
        'planDeEstudios':this.proyecto.planDeEstudios,
        'tipoDeProyecto':this.proyecto.tipoDeProyecto
      }).subscribe(
        (data) => {
          this.generarMensajeDeConfirmacion()
        }
      )
    }
  }

  // DOCUMENTOS DE TITULACION DOS ALUMNO

  anexoUnoDosEstudiantes() {
    let day = new Date();
    let year = day.getFullYear();
    let fecha = day.getDate() + '/'+(day.getMonth()+1) + '/' +day.getFullYear();
    if (this.alumnos) {
      this._mainService.anexoUnoDosEstudiantes({
        'nombreDelProyecto':this.proyecto.nombreDelProyecto,
        'asesor':this.proyecto.asesor,
        'fecha':fecha,
        'nombreDelEstudianteUno':this.alumnos[0].nombre,
        'numeroDeControlUno':this.alumnos[0].numeroDeControl,
        'nombreDelEstudianteDos':this.alumnos[1].nombre,
        'numeroDeControlDos':this.alumnos[1].numeroDeControl
      }).subscribe(
        (data) => {
          this.generarMensajeDeConfirmacion()
        }
      )
    }
  }


  notificacionAsesorDosEstudiantes() {
    let day = new Date();
    let year = day.getFullYear();
    let fecha = day.getDate() + '/'+(day.getMonth()+1) + '/' +day.getFullYear();
    if (this.alumnos) {
      this._mainService.notificacionAsesorDosEstudiantes({
        'nombreDelProyecto':this.proyecto.nombreDelProyecto,
        'asesor':this.proyecto.asesor,
        'fecha':fecha,
        'nombreDelEstudianteUno':this.alumnos[0].nombre,
        'numeroDeControlUno':this.alumnos[0].numeroDeControl,
        'nombreDelEstudianteDos':this.alumnos[1].nombre,
        'numeroDeControlDos':this.alumnos[1].numeroDeControl,
        'planDeEstudios':this.proyecto.planDeEstudios,
        'tipoDeProyecto':this.proyecto.tipoDeProyecto
      }).subscribe(
        (data) => {
          this.generarMensajeDeConfirmacion()
        }
      )
    }
  }


  notificacionRevisoresDosEstudiantes() {
    let day = new Date();
    let year = day.getFullYear();
    let fecha = day.getDate() + '/'+(day.getMonth()+1) + '/' +day.getFullYear();
    if (this.alumnos) {
      this._mainService.notificacionRevisoresDosEstudiantes({
        'nombreDelProyecto':this.proyecto.nombreDelProyecto,
        'asesor':this.proyecto.asesor,
        'fecha':fecha,
        'nombreDelEstudianteUno':this.alumnos[0].nombre,
        'numeroDeControlUno':this.alumnos[0].numeroDeControl,
        'nombreDelEstudianteDos':this.alumnos[1].nombre,
        'numeroDeControlDos':this.alumnos[1].numeroDeControl,
        'planDeEstudios':this.proyecto.planDeEstudios,
        'tipoDeProyecto':this.proyecto.tipoDeProyecto,
        'secretario': this.proyecto.secretario,
        'vocal': this.proyecto.vocal,
        'vocalSuplente':this.proyecto.vocalSuplente
      }).subscribe(
        (data) => {
          this.generarMensajeDeConfirmacion()
        }
      )
    }
  }

  solicitudRevisoresDosEstudiantes() {
    let day = new Date();
    let year = day.getFullYear();
    let fecha = day.getDate() + '/'+(day.getMonth()+1) + '/' +day.getFullYear();
    if (this.alumnos) {
      this._mainService.solicitudRevisoresDosEstudiantes({
        'nombreDelProyecto':this.proyecto.nombreDelProyecto,
        'asesor':this.proyecto.asesor,
        'fecha':fecha,
        'nombreDelEstudianteUno':this.alumnos[0].nombre,
        'numeroDeControlUno':this.alumnos[0].numeroDeControl,
        'nombreDelEstudianteDos':this.alumnos[1].nombre,
        'numeroDeControlDos':this.alumnos[1].numeroDeControl,
        'planDeEstudios':this.proyecto.planDeEstudios,
        'tipoDeProyecto':this.proyecto.tipoDeProyecto
      }).subscribe(
        (data) => {
          this.generarMensajeDeConfirmacion()
        }
      )
    }
  }


}
