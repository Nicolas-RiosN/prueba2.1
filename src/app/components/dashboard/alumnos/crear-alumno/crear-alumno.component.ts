import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from '../../../../interfaces/usuario';
import { UsuarioService } from '../../../../services/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-crear-alumno',
  templateUrl: './crear-alumno.component.html',
  styleUrl: './crear-alumno.component.scss'
})
export class CrearAlumnoComponent {

  curso: any[] = ['Matematica', ' Lenguaje', 'Historia', 'Hice lo que pude con el codigo']
  form: FormGroup;

  constructor(private fb: FormBuilder, private _alumnoService: UsuarioService, private router: Router, private _snackBar: MatSnackBar, private route: ActivatedRoute){
    this.form = this.fb.group({
      alumno: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      curso: ['', Validators.required],
    })
  }

  agregarAlumno(){
    const alumno: Usuario = {
      usuario: this.form.value.alumno,
      nombre: this.form.value.nombre,
      apellido: this.form.value.apellido,
      curso: this.form.value.curso
    }
    this._alumnoService.agregarUsuario(alumno);
    this.router.navigate(['/dashboard/alumno']);

    this._snackBar.open('El Alumno fue agregado con exito', '',{
      duration: 1500,
      horizontalPosition: 'center',
      verticalPosition:'bottom'
    })
  }

  volver() {
    this.router.navigate(['/dashboard/alumno']);
  }
}
