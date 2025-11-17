import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgentApiService {

  private baseUrl = environment.apiUrl;
  private authUrl = environment.authUrl;

  constructor(private http: HttpClient) { }

  // Common headers
  private jsonHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  // Attach JWT token (for agent logged-in requests)
  private authHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('agent_access')
    });
  }

  // ============================
  //  REGISTER AGENT
  // ============================
  registerAgent(data: any): Observable<any> {
    return this.http.post(
      this.authUrl + 'agent/register/',
      data,
      { headers: this.jsonHeaders }
    );
  }

  loginAgent(data: any): Observable<any> {
    return this.http.post(
      this.authUrl + 'agent/login/',
      data,
      { headers: this.jsonHeaders }
    );
  }
  getCustomer(): Observable<any> {
    return this.http.get(this.baseUrl + 'agent/customers/', { headers: this.authHeaders() });
  }
  getAgentProfile(): Observable<any> {
    return this.http.get(
      this.baseUrl + 'agent/profile/',
      { headers: this.authHeaders() }
    );
  }
  createCustomer(customer: any) {
    return this.http.post<any>(this.baseUrl + 'agent/customers/', customer, { headers: this.authHeaders() });
  }

}
