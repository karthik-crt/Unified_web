import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IconDirective } from '@coreui/icons-angular';

import {
  ButtonDirective,
  CardBodyComponent,
  CardComponent,
  CardGroupComponent,
  ColComponent,
  ContainerComponent,
  FormControlDirective,
  FormDirective,
  InputGroupComponent,
  InputGroupTextDirective,
  RowComponent
} from '@coreui/angular';
import { ApiService } from '../../../../services/api.service';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ContainerComponent,
    RowComponent,
    ColComponent,
    CardGroupComponent,
    CardComponent,
    CardBodyComponent,
    FormDirective,
    InputGroupComponent,
    InputGroupTextDirective,
    IconDirective,
    FormControlDirective,
    ButtonDirective,
  ]
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';

  // Change password variables
  old_password: string = '';
  new_password: string = '';
  confirm_password: string = '';

  showChangePassword: boolean = false; // UI toggle

  constructor(
    private api: ApiService,
    private toaster: ToastrService,
    private router: Router
  ) {
    sessionStorage.clear();
  }

  ngOnInit(): void {
    console.log("LoginComponent initialized ");
  }

  // =====================
  // LOGIN
  // =====================
  login() {
    const params = {
      email: this.email,
      password: this.password
    };

    this.api.login(params).subscribe({
      next: (data) => {
        console.log("data", data);

        if (data.statusCode === "1") {
          sessionStorage.setItem("access", data.access);
          sessionStorage.setItem("refresh", data.refresh);
          sessionStorage.setItem("adminId", data.user.id);
          sessionStorage.setItem("role", data.user.role)

          this.toaster.success("Login successful");

          this.router.navigate(['/dashboard']);
        } else {
          this.toaster.error(data.statusMessage || "Login failed");
        }
      },
      error: () => {
        this.toaster.error("Server error");
      }
    });
  }

  // =====================
  // CHANGE PASSWORD
  // =====================
  changePassword() {
    if (this.new_password !== this.confirm_password) {
      this.toaster.error("Passwords do not match");
      return;
    }

    const body = {
      old_password: this.old_password,
      new_password: this.new_password
    };

    this.api.changeAdminPassword(body).subscribe({
      next: (res: any) => {
        if (res.statusCode === '1') {
          this.toaster.success("Password updated successfully!");

          sessionStorage.clear();   // logout
          this.showChangePassword = false;  // return to login

        } else {
          this.toaster.error(res.statusMessage || 'Failed to change password');
        }
      },
      error: err => {
        if (err.error.errors) {
          const e = err.error.errors;
          if (e.old_password) this.toaster.error(e.old_password[0]);
          if (e.new_password) this.toaster.error(e.new_password[0]);
        } else {
          this.toaster.error("Something went wrong");
        }
      }
    });
  }
}

