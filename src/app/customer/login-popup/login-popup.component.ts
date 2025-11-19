import { Component, EventEmitter, Output } from '@angular/core';
import { CustomerLoginComponent } from '../customer-login/customer-login.component'; // <-- USE EXISTING LOGIN

@Component({
  selector: 'app-login-popup',
  standalone: true,
  imports: [CustomerLoginComponent],       // <-- IMPORTANT
  templateUrl: './login-popup.component.html',
  styleUrl: './login-popup.component.scss'
})
export class LoginPopupComponent {
  @Output() close = new EventEmitter<void>();

  closePopup() {
    this.close.emit();
  }
}
