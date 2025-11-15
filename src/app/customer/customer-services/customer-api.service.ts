import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerApiService {
  private url = environment.apiUrl;
  private authurl = environment.authUrl;

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${sessionStorage.getItem('access_token')}`,
      'Content-Type': 'application/json',
    });
  }

  // OTP send does not require auth header
  sendOTP(data: any) {
    return this.http.post(`${this.authurl}send-otp/`, data);
  }

  // OTP verify does not require auth header
  verifyOTP(data: any) {
    return this.http.post(`${this.authurl}verify-otp/`, data);
  }

  // Example of authenticated GET
  getUserProfile() {
    return this.http.get(`${this.url}customer/profile/`, {
      headers: this.getAuthHeaders()
    });
  }
}
