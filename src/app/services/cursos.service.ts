import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CursosService {
  private apiUrl = 'http://localhost:3001/cursos'; 

  constructor(private http: HttpClient) {}

  getCursos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addCurso(curso: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, curso);
  }

  updateCurso(index: number, curso: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${index}`, curso);
  }

  deleteCurso(index: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${index}`);
  }
}