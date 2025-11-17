import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment'
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url = environment.apiUrl;
  authurl = environment.authUrl;
  constructor(private http: HttpClient) { }
  refreshAccessToken() {
    return this.http.post<any>(this.authurl + 'token/refresh/', {
      refresh: sessionStorage.getItem('refresh')
    }).pipe(
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

}
