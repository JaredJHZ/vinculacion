import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  admin:boolean;

  constructor() { 
    let usuario = localStorage.getItem('user');
    if (usuario === 'admin') {
      this.admin = true;
    } else {
      this.admin = false;
    }
  }

  ngOnInit() {
  }

}
