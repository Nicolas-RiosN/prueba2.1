import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3001/login'; // Cambia esto según tu configuración

  constructor(private http: HttpClient) {}

  login(usuario: string, password: string): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl, { usuario, password });
  }

  isAuthenticated(): boolean {
    // Implementa la lógica para verificar si el usuario está autenticado
    return !!localStorage.getItem('token'); // Ejemplo básico
  }
}