import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fabmenu',
  templateUrl: './fabmenu.component.html',
  styleUrls: ['./fabmenu.component.scss'],
})
export class FabmenuComponent implements OnInit {
  public appPages: Array<any>;

  constructor() { }

  ngOnInit() {
      this.appPages = [
        {
          title: 'Timeline',
          url: '/timeline',
          icon: 'home',
          type: 'regular'
        },
        {
          title: 'Gallery',
          url: '/gallery',
          icon: 'home',
          type: 'regular'
        },
        {
          title: 'Profilo',
          url: '/profile',
          icon: 'person',
          type: 'config'
        },
        {
          title: 'Logout',
          url: '/logout',
          icon: 'power',
          type: 'config'
        },
        {
          title: 'Impostazioni notifiche',
          url: '/notificationConfig',
          icon: 'settings',
          type: 'config'
        }
      ];
  }

}
