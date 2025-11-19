import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginPopupComponent } from '../../login-popup/login-popup.component'
import { CommonModule } from '@angular/common';
// CoreUI Standalone Components
import {
  ContainerComponent,
  RowComponent,
  ColComponent,
  CardComponent,
  ButtonDirective,
} from '@coreui/angular';

@Component({
  selector: 'app-unified',
  standalone: true,
  templateUrl: './unified.component.html',
  styleUrl: './unified.component.scss',

  // IMPORTANT: Add all CoreUI components you use
  imports: [
    ContainerComponent,
    RowComponent,
    ColComponent,
    CardComponent,
    ButtonDirective,
    LoginPopupComponent,
    CommonModule
  ],
})
export class UnifiedComponent {
  constructor(private router: Router) { }
  showLoginPopup = false;
  loginPage() {
    this.showLoginPopup = true;
  }

  closePopup() {
    this.showLoginPopup = false;
  }
  action(type: string) {
    console.log("/" + type)
    this.router.navigate(['/' + type])

  }
}
