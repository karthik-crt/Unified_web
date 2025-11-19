import { Component } from '@angular/core';
import { CustomerApiService } from '../../../app/customer/customer-services/customer-api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-customer-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './customer-login.component.html',
  styleUrl: './customer-login.component.scss'
})
export class CustomerLoginComponent {

  mobile: string = "";
  otp: string = "";

  otpSent: boolean = false;
  loading: boolean = false;

  constructor(
    private api: CustomerApiService,
    private toaster: ToastrService,
    private router: Router
  ) {

    sessionStorage.clear();

  }

  sendOTP() {
    if (!this.mobile || this.mobile.length !== 10) {
      this.toaster.error("Enter valid 10-digit mobile number");
      return;
    }

    this.loading = true;

    this.api.sendOTP({ mobile: this.mobile }).subscribe({
      next: (res: any) => {
        this.loading = false;

        this.toaster.success(res.message || "OTP sent successfully");
        this.otpSent = true;
      },
      error: err => {
        this.loading = false;
        this.toaster.error(err.error?.error || "OTP sending failed");
      }
    });
  }



  verifyOTP() {
    if (!this.otp || this.otp.length !== 6) {
      this.toaster.error("Enter valid 6-digit OTP");
      return;
    }

    this.loading = true;

    this.api.verifyOTP({ mobile: this.mobile, otp: this.otp }).subscribe({
      next: (res: any) => {
        this.loading = false;
        console.log("verify response =", res);

        // Normalize backend key
        const status = res.statuscode || res.statusCode || res.status;

        if (status == '1') {

          this.toaster.success("Login successful");

          sessionStorage.setItem("access", res.access);
          sessionStorage.setItem("refresh", res.refresh);
          sessionStorage.setItem("customerId", res.user.id);
          sessionStorage.setItem("role", res.user.role)

          this.router.navigate(['/default']);
          window.location.reload()

        } else {
          this.toaster.error(res.error || res.message || "Invalid OTP");
        }
      },
      error: err => {
        this.loading = false;
        this.toaster.error(err.error?.error || "OTP verification failed");
      }
    });
  }


}
