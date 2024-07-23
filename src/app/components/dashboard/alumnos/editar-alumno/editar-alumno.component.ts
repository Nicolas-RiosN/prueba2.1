import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../../../services/usuario.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Usuario } from '../../../../interfaces/usuario';

@Component({
  selector: 'app-editar-alumno',
  templateUrl: './editar-alumno.component.html',
  styleUrl: './editar-alumno.component.scss'
})
export class EditarAlumnoComponent {

  form: FormGroup;
  curso: any[] = ['Matematica', 'Lenguaje', 'Historia', 'Hice lo que pude con el codigo'];

  constructor(
    private fb: FormBuilder,
    private _alumnoService: UsuarioService,
    private _snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<EditarAlumnoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Usuario
  ) {
    this.form = this.fb.group({
      usuario: [data.usuario, Validators.required],
      nombre: [data.nombre, Validators.required],
      apellido: [data.apellido, Validators.required],
      curso: [data.curso, Validators.required],
    });
  }

  guardarCambios() {
    if (this.form.valid) {
      const updatedUsuario: Usuario = {
        usuario: this.data.usuario,  // No se puede cambiar el usuario
        nombre: this.form.get('nombre')?.value,
        apellido: this.form.get('apellido')?.value,
        curso: this.form.get('curso')?.value
      };

      this._alumnoService.editarUsuario(updatedUsuario);
      this.dialogRef.close(updatedUsuario);

      this._snackBar.open('El Alumno fue editado con éxito', '', {
        duration: 1500,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });
    }
  }

  cancelar() {
    this.dialogRef.close(); // Solo cerrar el diálogo sin notificar cambios
  }
}