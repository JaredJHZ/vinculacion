import {NgModule} from '@angular/core';
import { Routes , RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { CrearUsuarioComponent } from './components/usuarios/crear-usuario/crear-usuario.component';
import { MenuComponent } from './components/menu/menu.component';
import { BuscarUsuarioComponent } from './components/usuarios/buscar-usuario/buscar-usuario.component';
import { MenuUsuariosComponent } from './components/usuarios/menu-usuarios/menu-usuarios.component';
import { MenuMaestrosComponent } from './components/maestros/menu-maestros/menu-maestros.component';
import { CrearMaestroComponent } from './components/maestros/crear-maestro/crear-maestro.component';
import { BuscarMaestrosComponent } from './components/maestros/buscar-maestros/buscar-maestros.component';
import { CrearEstudianteComponent } from './components/estudiantes/crear-estudiante/crear-estudiante.component';
import { MenuEstudiantesComponent } from './components/estudiantes/menu-estudiantes/menu-estudiantes.component';
import { BuscarEstudianteComponent } from './components/estudiantes/buscar-estudiante/buscar-estudiante.component';
import { MenuProyectosComponent } from './components/proyectos/menu-proyectos/menu-proyectos.component';
import { AgregarProyectoComponent } from './components/proyectos/agregar-proyecto/agregar-proyecto.component'
import { AgregarTitulacionComponent } from './components/proyectos/agregar-titulacion/agregar-titulacion.component';
import { FormatosComponent } from './components/proyectos/formatos/formatos.component';
import { ImprimirComponent } from './components/proyectos/imprimir/imprimir.component';

const routes: Routes = [
    {
        path:'login',
        component: LoginComponent
    },
    {
        path:'crear-usuario',
        component:CrearUsuarioComponent
    },
    {
        path:'crear-maestro',
        component:CrearMaestroComponent
    },
    {
        path:'crear-estudiante',
        component:CrearEstudianteComponent
    },
    {
        path:'menu',
        component:MenuComponent
    },
    {
        path:'administrar-usuarios',
        component:BuscarUsuarioComponent
    },
    {
        path:'administrar-maestros',
        component:BuscarMaestrosComponent
    },
    {
        path:'administrar-estudiantes',
        component:BuscarEstudianteComponent
    },
    {
        path:'menu-usuarios',
        component:MenuUsuariosComponent
    },
    {
        path:'menu-maestros',
        component:MenuMaestrosComponent
    }
    ,
    {
        path:'menu-estudiantes',
        component:MenuEstudiantesComponent
    },
    {
        path:'menu-proyectos',
        component:MenuProyectosComponent
    },
    {
        path:'crear-proyecto',
        component:AgregarProyectoComponent
    },
    {
        path:'agregar-titulacion',
        component:AgregarTitulacionComponent
    },
    {
        path:'formatos',
        component:FormatosComponent
    },
    {
        path:'formato/:id',
        component:ImprimirComponent
    },
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    }
];

@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]
})
export class AppRoutingModule {}