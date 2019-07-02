import { Injectable } from '@angular/core';
import {ElectronService} from 'ngx-electron';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainserviceService {

  constructor(private _electronService: ElectronService) {

 
    
   }

   login(usuario, password) {
    return of (
      this._electronService.ipcRenderer.sendSync('login',usuario,password)
    );
  }

   crearUsuario(usuario:any) {
     return of(
       this._electronService.ipcRenderer.sendSync('crear-usuario',usuario)
     );
   }

  

   getUsuarios() {
     return of (
       this._electronService.ipcRenderer.sendSync('get-usuarios')
     );
   }

   updateService(usuario, id) {
     return of (
       this._electronService.ipcRenderer.sendSync('update-usuario', usuario, id)
     );
   }

   deleteUsuario(id) {
     return of (
       this._electronService.ipcRenderer.sendSync('delete-usuario', id)
     )
   }

   crearMaestro(maestro:any ) {
     return of(
      this._electronService.ipcRenderer.sendSync('crear-maestro',maestro)
     );
   }

   getMaestros() {
    return of (
      this._electronService.ipcRenderer.sendSync('get-maestros')
    );
  }

  deleteMaestro(id) {
    return of (
      this._electronService.ipcRenderer.sendSync('delete-maestro', id)
    )
  }

  updateMaestro(maestro, id) {
    return of (
      this._electronService.ipcRenderer.sendSync('update-maestro', maestro, id)
    );
  }

  crearEstudiante(estudiante) {
    return of (
      this._electronService.ipcRenderer.sendSync('crear-estudiante',estudiante)
    );
  }

  getEstudiantes() {
    return of (
      this._electronService.ipcRenderer.sendSync('get-estudiantes')
    );
  }

  updateEstudiante(estudiante, numeroDeControl) {
    return of (
      this._electronService.ipcRenderer.sendSync('update-estudiante', estudiante, numeroDeControl)
    );
  }

  deleteEstudiante(numeroDeControl) {
    return of (
      this._electronService.ipcRenderer.sendSync('delete-estudiante', numeroDeControl)
    );
  }

  getMaestro(id) {
    return of (
      this._electronService.ipcRenderer.sendSync('get-maestro',id)
    );
  }

  getEstudiante(numeroDeControl) {
    return of (
      this._electronService.ipcRenderer.sendSync('get-estudiante',numeroDeControl)
    );
  }

  crearProyecto(proyecto:any) {
    return of(
      this._electronService.ipcRenderer.sendSync('crear-proyecto',proyecto)
    );
  }

  getProyectos() {
    return of (
      this._electronService.ipcRenderer.sendSync('get-tabla-de-proyectos')
    );
  }
  
  updateProyecto(proyecto, id) {
    return of (
      this._electronService.ipcRenderer.sendSync('titulacion-proyectos', proyecto, id)
    );
  }

  getAlumnosYProyectos(id) {
    return of (
      this._electronService.ipcRenderer.sendSync('alumnos-tramite', id)
    );
  }

  anexoUnoUnEstudiante(informacion) {
    return of (
      this._electronService.ipcRenderer.sendSync('anexo-uno-un-estudiante',informacion)
    );
  }

  asesorUnEstudiante(informacion) {
    return of (
      this._electronService.ipcRenderer.sendSync('asesor-un-estudiante',informacion)
    );
  }

  actaCalificacion(informacion) {
    return of (
      this._electronService.ipcRenderer.sendSync('acta-calificacion', informacion)
    );
  }

  actaAsesor(informacion) {
    return of (
      this._electronService.ipcRenderer.sendSync('acta-asesor', informacion)
    );
  }

  anexoB(informacion) {
    return of (
      this._electronService.ipcRenderer.sendSync('anexo-b', informacion)
    );
  }

  revisoresUno(informacion) {
    return of (
      this._electronService.ipcRenderer.sendSync('revisores-uno', informacion)
    );
  }

  proyectoAsignado() {
    return of (
      this._electronService.ipcRenderer.sendSync('cuenta-con-proyecto')
    );
  }

  asignarFormato(numeroDeControl, proyecto, formato) {
    return of (
      this._electronService.ipcRenderer.sendSync('asignar-formato', numeroDeControl, proyecto, formato)
    );
  }

  notificacionRevisoresUno(informacion) {
    return of (
      this._electronService.ipcRenderer.sendSync('notificacion-revisores-uno', informacion)
    );
  }

  anexoTres(informacion) {
    return of (
      this._electronService.ipcRenderer.sendSync('anexo-tres', informacion)
    );
  }

  anexoUnoDosEstudiantes(informacion) {
    return of (
      this._electronService.ipcRenderer.sendSync('anexo-uno-dos-estudiantes', informacion)
    );
  }

  solicitudRevisoresDosEstudiantes(informacion) {
    return of (
      this._electronService.ipcRenderer.sendSync('solicitud-revisores-dos-estudiantes', informacion)
    );
  }

  notificacionAsesorDosEstudiantes(informacion) {
    return of (
      this._electronService.ipcRenderer.sendSync('notificacion-asesor-dos-estudiantes', informacion)
    );
  }

  notificacionRevisoresDosEstudiantes(informacion) {
    return of (
      this._electronService.ipcRenderer.sendSync('notificacion-revisores-dos-estudiantes', informacion)
    );
  }
   
}
