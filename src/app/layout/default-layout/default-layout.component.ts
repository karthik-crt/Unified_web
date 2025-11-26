import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NgScrollbar } from 'ngx-scrollbar';

import { IconDirective } from '@coreui/icons-angular';
import {
  ContainerComponent,
  ShadowOnScrollDirective,
  SidebarBrandComponent,
  SidebarComponent,
  SidebarFooterComponent,
  SidebarHeaderComponent,
  SidebarNavComponent,
  SidebarToggleDirective,
  SidebarTogglerDirective
} from '@coreui/angular';

import { DefaultFooterComponent, DefaultHeaderComponent } from './';
import { customerNav, adminNav, agentNav } from './_nav';
import { INavData } from '@coreui/angular'; // ensure interface is imported

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
  imports: [
    SidebarComponent,
    SidebarHeaderComponent,
    SidebarBrandComponent,
    SidebarNavComponent,
    ContainerComponent,
    DefaultFooterComponent,
    DefaultHeaderComponent,
    NgScrollbar,
    RouterOutlet,
    RouterLink,
    ShadowOnScrollDirective
  ]
})
export class DefaultLayoutComponent {

  navItems: INavData[] = [];

  constructor() {
    const role = sessionStorage.getItem('role'); // FIXED

    switch (role) {
      case 'customer':
        this.navItems = customerNav;
        break;
      case 'admin':
        this.navItems = adminNav;
        break;
      case 'agent':
        this.navItems = agentNav;
        break;
      default:
        this.navItems = []; // fallback
    }
  }
}
