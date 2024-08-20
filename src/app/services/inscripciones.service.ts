import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { Curso } from '../interfaces/curso';
import { Usuario } from '../interfaces/usuario';
import { Inscripcion } from '../interfaces/inscripcion';
import { response } from 'express';

@Injectable({
  providedIn: 'root'
})
export class InscripcionesService {
  private apiUrlUsuarios = 'http://localhost:3001/usuarios';
  private apiUrlCursos = 'http://localhost:3001/cursos';
  private apiUrlInscripciones = 'http://localhost:3001/inscripciones';
  private apiUrl = 'http://localhost:3001';
  private usuariosUrl = 'http://localhost:3001/usuarios';
  private cursosUrl = 'http://localhost:3001/cursos';

  constructor(private http: HttpClient) {}


  getInscripciones(): Observable<Inscripcion[]> {
    return this.http.get<Inscripcion[]>(`${this.apiUrl}/inscripciones`);
  }
  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.usuariosUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  getCursos(): Observable<Curso[]> {
    return this.http.get<Curso[]>(this.cursosUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';

    if (error.error instanceof ErrorEvent) {
      // Client-side or network error occurred
      errorMessage = `An error occurred: ${error.error.message}`;
    } else {
      // Backend returned an unsuccessful response code
      errorMessage = `Server returned code: ${error.status}, error message is: ${error.message}`;
    }

    console.error(errorMessage);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }


// inscripciones.service.ts
inscribir(usuario: Usuario, curso: Curso): Observable<any> {
  return this.http.post(`${this.apiUrl}/inscripciones`, { usuario, curso });
}

eliminarInscripcion(usuario: Usuario, curso: Curso): Observable<any> {
  return this.http.delete(`${this.apiUrl}/inscripciones`, { 
    body: { usuario, curso } 
  }).pipe(
    catchError(this.handleError)
  );
}
}