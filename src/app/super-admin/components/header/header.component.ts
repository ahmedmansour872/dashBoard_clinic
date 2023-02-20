import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  isHover: any;
  name: any;
  email: any;
  constructor() {
    this.isHover = false;
    this.name = localStorage.getItem('name');
    this.email = localStorage.getItem('email');
  }

}
