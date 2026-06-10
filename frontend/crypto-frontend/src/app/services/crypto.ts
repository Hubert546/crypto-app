import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  private apiUrl = 'http://localhost:8080/api/messages';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
  }

  // Send text to backend for encryption
  encrypt(text: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/encrypt`,
      { text },
      { headers: this.getHeaders() }
    );
  }

  // Decrypt a message by ID
  decrypt(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/decrypt/${id}`,
      { headers: this.getHeaders(), responseType: 'text' }
    );
  }

  // Get all messages for logged-in user
  getMessages(): Observable<any> {
    return this.http.get(this.apiUrl,
      { headers: this.getHeaders() }
    );
  }
}