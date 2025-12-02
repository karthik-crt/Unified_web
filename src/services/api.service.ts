import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment'
import { map, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url = environment.apiUrl;
  authurl = environment.authUrl;
  constructor(private http: HttpClient, private router: Router) { }
  refreshAccessToken() {
    const body = {
      "refresh": sessionStorage.getItem('refresh')
    }
    return this.http.post<any>(this.authurl + 'token/refresh/', body).pipe(
      tap((response) => {
        sessionStorage.setItem('access', response.access);
        if (response.refresh) {
          sessionStorage.setItem('refresh', response.refresh);
        }
      })
    );
  }

  private getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': 'Bearer ' + sessionStorage.getItem('access'),
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
  }
  login(params: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http
      .post(this.authurl + 'admin/login/', params, { headers })
      .pipe(map(res => res));
  }
  changeAdminPassword(data: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.patch(
      this.url + 'admin/change-password/',
      data,
      { headers }
    );
  }
  adminDashboard(): Observable<any> {
    return this.http.get(this.url + 'admin/dashboard/', { headers: this.getAuthHeaders() });
  }
  getUserList(): Observable<any> {
    return this.http.get(this.url + 'admin/users/?role=customer', { headers: this.getAuthHeaders() });
  }
  getAgentList(): Observable<any> {
    return this.http.get(this.url + 'admin/users/?role=agent', { headers: this.getAuthHeaders() });
  }
  getSingleUser(id: any): Observable<any> {
    return this.http.get(this.url + `admin/users/${id}/`, { headers: this.getAuthHeaders() });
  }
  updateUser(id: any, data: any): Observable<any> {
    return this.http.patch(this.url + `admin/users/${id}/`, data, { headers: this.getAuthHeaders() });
  }
  deleteUser(id: any): Observable<any> {
    return this.http.delete(this.url + `admin/users/${id}/`, { headers: this.getAuthHeaders() });
  }
  getSingleAgent(id: any): Observable<any> {
    return this.http.get(this.url + `admin/agents/${id}/`, { headers: this.getAuthHeaders() });
  }
  updateAgent(id: any, data: any): Observable<any> {
    return this.http.patch(this.url + `admin/agents/${id}/`, data, { headers: this.getAuthHeaders() });
  }
  deleteAgent(id: any): Observable<any> {
    return this.http.delete(this.url + `admin/agents/${id}/`, { headers: this.getAuthHeaders() });
  }
  getUsers(params: any): Observable<any> {
    return this.http.get(this.url + 'admin/users/', { headers: this.getAuthHeaders(), params });
  }
  getPolicies(params: any): Observable<any> {
    return this.http.get(this.url + 'admin/policies/', { headers: this.getAuthHeaders(), params });
  }
  getLoanApplications(params: any): Observable<any> {
    return this.http.get(this.url + 'admin/loan-list/', { headers: this.getAuthHeaders(), params });
  }
  getKYCList(params: any): Observable<any> {
    return this.http.get(this.url + 'admin/customer/kyc-status/', {
      headers: this.getAuthHeaders(),
      params,
    });
  }
  getTransactionHistory(params: any): Observable<any> {
    return this.http.get(this.url + 'admin/transactions/', { headers: this.getAuthHeaders(), params });
  }
  logout() {
    const refresh = sessionStorage.getItem('refresh');

    // No refresh token — just clear session and redirect
    if (!refresh) {
      console.log("!")

      this.clearSession();
      return;
    }

    this.http.post(`${this.authurl}logout/`, { refresh }).subscribe({
      next: () => {
        console.log("next")
        this.clearSession();
      },
      error: () => {
        console.log("error")

        // Even if backend fails, destroy session
        this.clearSession();
      }
    });
  }

  private clearSession() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  getRevenue(params: any): Observable<any> {
    return this.http.get(this.url + 'admin/revenue/', {
      headers: this.getAuthHeaders(),
      params
    });
  }

}
