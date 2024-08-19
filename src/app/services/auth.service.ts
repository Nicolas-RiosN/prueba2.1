import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3001/login';

  constructor(private http: HttpClient, private router: Router) {}

  login(usuario: string, password: string): Observable<boolean> {
    return this.http.post<any>(this.apiUrl, { usuario, password }).pipe(
      map(response => {
        console.log('API Response:', response); 
        if (response && response.token) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('usuario', usuario);
          return true;
        }
        return false;
      }),
      catchError(error => {
        console.error('Login error:', error);
        return throwError(() => new Error('Login failed'));
      })
    );
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  getUsuarioLogueado(): string | null {
    const usuario = localStorage.getItem('usuario');
    return usuario;
  }
  
  getNombreLogueado(): string | null {
    return localStorage.getItem('nombre');
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }
}