import { Component } from '@angular/core';

/**
 * Component that renders Menu. Shows the navigation bar when clicking on it.
 */

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  menuOpened: boolean = false;

  constructor() { }

  clickEvent(){
    this.menuOpened = !this.menuOpened;       
  }

}
