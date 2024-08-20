import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InscripcionesService } from '../../../services/inscripciones.service';
import { UsuarioService } from '../../../services/usuario.service';
import { CursosService } from '../../../services/cursos.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Curso } from '../../../interfaces/curso';
import { Usuario } from '../../../interfaces/usuario';
import { InscripcionesListComponent } from './inscripciones-list/inscripciones-list.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-inscripciones',
  templateUrl: './inscripciones.component.html',
  styleUrl: './inscripciones.component.scss'
})

export class InscripcionesComponent implements OnInit {
  usuarios: Usuario[] = [];
  cursos: Curso[] = [];
  usuarioSeleccionado: Usuario | null = null;
  cursoSeleccionado: Curso | null = null;

  constructor(private inscripcionesService: InscripcionesService, private snackBar: MatSnackBar, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.inscripcionesService.getUsuarios().subscribe(
      (data: Usuario[]) => {
        console.log('Usuarios cargados:', data);
        this.usuarios = data;
      },
      (error: HttpErrorResponse) => this.showError('Error al cargar usuarios: ' + error.message)
    );
    this.inscripcionesService.getCursos().subscribe(
      (data: Curso[]) => this.cursos = data,
      (error: HttpErrorResponse) => this.showError('Error al cargar cursos: ' + error.message)
    );
  }
  
  onUsuarioSeleccionado(usuario: Usuario): void {
    this.usuarioSeleccionado = usuario;
  }

  onCursoSeleccionado(curso: Curso): void {
    this.cursoSeleccionado = curso;
  }

  inscribir(): void {
    if (this.usuarioSeleccionado && this.cursoSeleccionado) {
      this.inscripcionesService.inscribir(this.usuarioSeleccionado, this.cursoSeleccionado).subscribe(
        () => this.showSuccess('Inscripción realizada con éxito.'),
        (error: HttpErrorResponse) => this.showError('Error al realizar la inscripción: ' + error.message)
      );
    } else {
      this.showError('Seleccione un usuario y un curso.');
    }
  }

  eliminarCurso(): void {
    if (this.usuarioSeleccionado && this.cursoSeleccionado) {
      this.inscripcionesService.eliminarCurso(this.usuarioSeleccionado, this.cursoSeleccionado).subscribe(
        () => this.showSuccess('Inscripción eliminada con éxito.'),
        (error: HttpErrorResponse) => this.showError('Error al eliminar la inscripción: ' + error.message)
      );
    } else {
      this.showError('Seleccione un usuario y un curso.');
    }
  }
  
  openInscripcionesList(): void {
    this.dialog.open(InscripcionesListComponent, {
      width: '600px',
      data: {}
    });
  }

  private showSuccess(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      panelClass: ['success-snackbar']
    });
  }

  private showError(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      panelClass: ['error-snackbar']
    });
  }
}