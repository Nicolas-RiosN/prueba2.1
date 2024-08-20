import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Curso } from '../interfaces/curso';
import { Usuario } from '../interfaces/usuario';
import { Inscripcion } from '../interfaces/inscripcion';

@Injectable({
  providedIn: 'root'
})
export class InscripcionesService {
  private apiUrlUsuarios = 'http://localhost:3001/usuarios';
  private apiUrlCursos = 'http://localhost:3001/cursos';
  private apiUrlInscripciones = 'http://localhost:3001/inscripciones';

  constructor(private http: HttpClient) {}

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrlUsuarios);
  }

  getCursos(): Observable<Curso[]> {
    return this.http.get<Curso[]>(this.apiUrlCursos);
  }

  inscribir(usuario: Usuario, curso: Curso): Observable<void> {
    return this.http.post<void>(this.apiUrlInscripciones, { usuario, curso });
  }

  eliminarCurso(usuario: Usuario, curso: Curso): Observable<void> {
    const url = `${this.apiUrlInscripciones}`;
    return this.http.request<void>('DELETE', url, { body: { usuario, curso } });
  }

  getInscripciones(): Observable<Inscripcion[]> {
    return this.http.get<Inscripcion[]>(this.apiUrlInscripciones);
  }
}