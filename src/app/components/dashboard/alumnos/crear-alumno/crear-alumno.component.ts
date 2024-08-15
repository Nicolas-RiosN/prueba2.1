import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../../../services/usuario.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Usuario } from '../../../../interfaces/usuario';

@Component({
  selector: 'app-crear-alumno',
  templateUrl: './crear-alumno.component.html',
  styleUrls: ['./crear-alumno.component.scss']
})
export class CrearAlumnoComponent {

  curso: string[] = ['Matematica', 'Lenguaje', 'Historia', 'Hice lo que pude con el codigo'];
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _alumnoService: UsuarioService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      usuario: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      curso: ['', Validators.required],
    });
  }

  agregarAlumno() {
    if (this.form.valid) {
      const alumno: Usuario = {
        usuario: this.form.value.usuario,
        nombre: this.form.value.nombre,
        apellido: this.form.value.apellido,
        curso: this.form.value.curso
      };

      this._alumnoService.agregarUsuario(alumno).subscribe(
        () => {
          this.router.navigate(['/dashboard/alumno']);
          this._snackBar.open('El Alumno fue agregado con éxito', '', {
            duration: 1500,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });
        },
        error => {
          console.error('Error al agregar el alumno', error);
          this._snackBar.open('Error al agregar el Alumno', '', {
            duration: 1500,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });
        }
      );
    }
  }

  volver() {
    this.router.navigate(['/dashboard/alumno']);
  }
}
