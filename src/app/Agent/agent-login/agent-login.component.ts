import { Component } from '@angular/core';
import { AgentApiService } from '../agent-services/agent-api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-agent-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './agent-login.component.html',
  styleUrl: './agent-login.component.scss'
})
export class AgentLoginComponent {

  // Login fields
  loginEmail = "";
  loginPassword = "";

  // Registration fields
  regEmail = "";
  regPassword = "";

  showRegister = false;     
  loading = false;

  constructor(
    private api: AgentApiService,
    private toaster: ToastrService,
    private router: Router
  ) {}

  
  register() {
    if (!this.regEmail || !this.regPassword) {
      this.toaster.error("All fields required");
      return;
    }

    this.loading = true;

    this.api.registerAgent({ email: this.regEmail, password: this.regPassword })
      .subscribe({
        next: (res: any) => {
          this.loading = false;

          this.toaster.success(res.message || "Registered successfully");

          this.showRegister = false;  // switch to login screen
        },
        error: err => {
          this.loading = false;
          this.toaster.error(err.error?.error || "Registration failed");
        }
      });
  }

  
  login() {
    if (!this.loginEmail || !this.loginPassword) {
      this.toaster.error("All fields required");
      return;
    }

    this.loading = true;

    this.api.loginAgent({
      email: this.loginEmail,
      password: this.loginPassword
    }).subscribe({
      next: (res: any) => {
        this.loading = false;
        console.log("data",res)
        this.toaster.success("Login successful");

        sessionStorage.setItem("agent_access", res.access);
        sessionStorage.setItem("agent_refresh", res.refresh);
        sessionStorage.setItem("agentId", res.user.id);

        // this.router.navigate(["/agent-dashboard"]);
      },
      error: err => {
        this.loading = false;
        this.toaster.error(err.error?.error || "Login failed");
      }
    });
  }
}
