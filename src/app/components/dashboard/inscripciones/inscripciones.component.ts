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
import { Observable } from 'rxjs';
import { Inscripcion } from '../../../interfaces/inscripcion';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../state/app.state';
import { eliminarInscripcion, inscribir, loadCursos, loadUsuarios } from '../../../state/inscripciones.actions';
import { selectCursos, selectError, selectLoading, selectUsuarios } from '../../../state/inscripciones.selectors';


@Component({
  selector: 'app-inscripciones',
  templateUrl: './inscripciones.component.html',
  styleUrl: './inscripciones.component.scss'
})

export class InscripcionesComponent implements OnInit {
  usuarios$: Observable<Usuario[]>;
  cursos$: Observable<Curso[]>;
  loading$: Observable<boolean>;
  error$: Observable<any>;

  usuarioSeleccionado: Usuario | null = null;
  cursoSeleccionado: Curso | null = null;

  constructor(
    private store: Store<AppState>,
    private inscripcionesService: InscripcionesService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.usuarios$ = this.store.pipe(select(selectUsuarios));
    this.cursos$ = this.store.pipe(select(selectCursos));
    this.loading$ = this.store.pipe(select(selectLoading));
    this.error$ = this.store.pipe(select(selectError));
  }

  ngOnInit(): void {
    this.store.dispatch(loadUsuarios());
    this.store.dispatch(loadCursos());

    this.error$.subscribe(error => {
      if (error) {
        this.snackBar.open(`Error: ${error.message}`, 'Cerrar', {
          duration: 3000
        });
      }
    });

    this.loading$.subscribe(loading => {
      if (!loading) {
        this.snackBar.open('Operación completada', 'Cerrar', {
          duration: 3000
        });
      }
    });
  }

  onUsuarioSeleccionado(usuario: Usuario): void {
    this.usuarioSeleccionado = usuario;
  }

  onCursoSeleccionado(curso: Curso): void {
    this.cursoSeleccionado = curso;
  }

// inscripciones.component.ts
inscribir(): void {
  if (this.usuarioSeleccionado && this.cursoSeleccionado) {
    this.store.dispatch(inscribir({ usuario: this.usuarioSeleccionado, curso: this.cursoSeleccionado }));
  }
}

eliminarInscripcion(): void {
  if (this.usuarioSeleccionado && this.cursoSeleccionado) {
    this.inscripcionesService.eliminarInscripcion(this.usuarioSeleccionado, this.cursoSeleccionado).subscribe(
      response => {
        console.log('Inscripción eliminada con éxito:', response);
        this.snackBar.open('Inscripción eliminada con éxito', 'Cerrar', {
          duration: 3000
        });
      },
      error => {
        console.error('Error al eliminar la inscripción:', error);
        this.snackBar.open(`Error: ${error.message}`, 'Cerrar', {
          duration: 3000
        });
      }
    );
  } else {
    this.snackBar.open('Selecciona un usuario y un curso', 'Cerrar', {
      duration: 3000
    });
  }
}

  openInscripcionesList(): void {
    this.dialog.open(InscripcionesListComponent, {
      width: '600px',
      data: {} // Puedes pasar datos al componente del diálogo si es necesario
    });
  }
}