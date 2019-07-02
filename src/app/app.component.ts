import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  loaded:boolean = false;
  title = 'vinculacionisc';

  constructor() {
    setTimeout(() => {
      this.loaded = true;
    }, 1000);
  }
}
