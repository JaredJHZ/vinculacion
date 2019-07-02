import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainserviceService } from 'src/app/mainservice.service';

import Swal from 'sweetalert2'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario = {
    user:'',
    password:''
  }

  constructor(private router:Router, private _mainService: MainserviceService) { }

  ngOnInit() {
  }

  login(){
    
    this._mainService.login(this.usuario.user, this.usuario.password)
        .subscribe(
          (response) => {
            if (response) {
              if (response === 'admin') {
                localStorage.setItem('user','admin');
              } else {
                localStorage.setItem('user', 'user');
              }
              this.router.navigate(['/menu']);
            } else {
              Swal.fire({
                type: 'error',
                title: 'Error al iniciar sesion',
                text: 'Usuario o contraseña incorrecto'
              })
            }
          }  
        )
    
  }

}
