import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { CrearUsuarioComponent } from './components/usuarios/crear-usuario/crear-usuario.component';
import { MaterialModule } from '../modulos/material.module';

import {NgxElectronModule} from 'ngx-electron';
import { MenuComponent } from './components/menu/menu.component';
import { BuscarUsuarioComponent } from './components/usuarios/buscar-usuario/buscar-usuario.component';
import { MenuUsuariosComponent } from './components/usuarios/menu-usuarios/menu-usuarios.component';
import { EditarUsuarioComponent } from './components/usuarios/editar-usuario/editar-usuario.component';
import { ToolbarComponent } from './components/mix/toolbar/toolbar.component';
import { MenuMaestrosComponent } from './components/maestros/menu-maestros/menu-maestros.component';
import { CrearMaestroComponent } from './components/maestros/crear-maestro/crear-maestro.component';
import { BuscarMaestrosComponent } from './components/maestros/buscar-maestros/buscar-maestros.component';
import { EditarMaestroComponent } from './components/maestros/editar-maestro/editar-maestro.component';
import { CrearEstudianteComponent } from './components/estudiantes/crear-estudiante/crear-estudiante.component';
import { BuscarEstudianteComponent } from './components/estudiantes/buscar-estudiante/buscar-estudiante.component';
import { EditarEstudianteComponent } from './components/estudiantes/editar-estudiante/editar-estudiante.component';
import { MenuEstudiantesComponent } from './components/estudiantes/menu-estudiantes/menu-estudiantes.component';
import { MenuProyectosComponent } from './components/proyectos/menu-proyectos/menu-proyectos.component';
import { AgregarProyectoComponent } from './components/proyectos/agregar-proyecto/agregar-proyecto.component';
import { MixComponent } from './components/mix/mix.component';
import { BuscadorMaestrosComponent } from './components/mix/buscador-maestros/buscador-maestros.component';
import { AgregarTitulacionComponent } from './components/proyectos/agregar-titulacion/agregar-titulacion.component';
import { TitulacionComponent } from './components/mix/titulacion/titulacion.component';
import { FormatosComponent } from './components/proyectos/formatos/formatos.component';
import { ImprimirComponent } from './components/proyectos/imprimir/imprimir.component';
import { BuscadorEstudiantesComponent } from './components/mix/buscador-estudiantes/buscador-estudiantes.component';
import { SplashComponent } from './components/mix/splash/splash.component';
import { LengthPipe } from './pipes/length.pipe';
import { MatSortModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CrearUsuarioComponent,
    MenuComponent,
    BuscarUsuarioComponent,
    MenuUsuariosComponent,
    EditarUsuarioComponent,
    ToolbarComponent,
    MenuMaestrosComponent,
    CrearMaestroComponent,
    BuscarMaestrosComponent,
    EditarMaestroComponent,
    CrearEstudianteComponent,
    BuscarEstudianteComponent,
    EditarEstudianteComponent,
    MenuEstudiantesComponent,
    MenuProyectosComponent,
    AgregarProyectoComponent,
    MixComponent,
    BuscadorMaestrosComponent,
    AgregarTitulacionComponent,
    TitulacionComponent,
    FormatosComponent,
    ImprimirComponent,
    BuscadorEstudiantesComponent,
    SplashComponent,
    LengthPipe
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    NgxElectronModule,
    MatSortModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [EditarUsuarioComponent, EditarMaestroComponent, EditarEstudianteComponent, BuscadorMaestrosComponent, TitulacionComponent, BuscadorEstudiantesComponent]
})
export class AppModule { }
