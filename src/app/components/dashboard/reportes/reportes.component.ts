import { Component, OnInit } from '@angular/core';
import { CursosService } from '../../../services/cursos.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.scss'
})
export class ReportesComponent implements OnInit {
  cursos: any[] = [];
  nuevoCurso: any = { nombreCurso: '', cupos: '', fechaTermino: new Date() };
  cursoAEditar: any = null;
  cursoEditado: any = { nombreCurso: '', cupos: '', fechaTermino: new Date() };

  constructor(private cursosService: CursosService) {}

  ngOnInit(): void {
    this.cargarCursos();
  }

  cargarCursos(): void {
    this.cursosService.getCursos().subscribe(data => {
      this.cursos = data;
    });
  }

  agregarCurso(): void {
    if (this.nuevoCurso.nombreCurso.trim() && this.nuevoCurso.cupos && this.nuevoCurso.fechaTermino) {
      this.cursosService.addCurso(this.nuevoCurso).subscribe(() => {
        this.nuevoCurso = { nombreCurso: '', cupos: '', fechaTermino: new Date() };
        this.cargarCursos();
      });
    }
  }

  eliminarCurso(index: number): void {
    this.cursosService.deleteCurso(index).subscribe(() => {
      this.cargarCursos();
    });
  }

  iniciarEdicion(curso: any, index: number): void {
    this.cursoAEditar = { ...curso, index };
    this.cursoEditado = { ...curso };
  }

  actualizarCurso(): void {
    if (this.cursoAEditar && this.cursoEditado.nombreCurso.trim() && this.cursoEditado.cupos && this.cursoEditado.fechaTermino) {
      this.cursosService.updateCurso(this.cursoAEditar.index, this.cursoEditado).subscribe(() => {
        this.cursoAEditar = null;
        this.cursoEditado = { nombreCurso: '', cupos: '', fechaTermino: new Date() };
        this.cargarCursos();
      });
    }
  }
}