import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/usuario';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl = 'http://localhost:3001/alumnos'; 

  constructor(private http: HttpClient) { }

  getAlumnos(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl);
  }

  eliminarAlumno(index: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${index}`);
  }
  
  editarAlumno(index: number, usuario: Usuario): Observable<any> {
    return this.http.put(`${this.apiUrl}/${index}`, usuario);
  }

  agregarUsuario(alumno: Usuario): Observable<any> {
    return this.http.post<any>(this.apiUrl, alumno);
  }
}  