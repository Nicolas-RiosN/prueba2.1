import { Component, ViewChild } from '@angular/core';
import { Usuario } from '../../../interfaces/usuario';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UsuarioService } from '../../../services/usuario.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { EditarAlumnoComponent } from './editar-alumno/editar-alumno.component';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.scss']
})
export class AlumnosComponent {
  
  listAlumnos: Usuario[] = [];
  displayedColumns: string[] = ['usuario', 'nombreApellido', 'curso', 'acciones', 'editar'];
  dataSource!: MatTableDataSource<Usuario>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(private _alumnoService: UsuarioService, private _snackBar: MatSnackBar, public dialog: MatDialog) {}

  ngOnInit() {
    this.cargarAlumnos();
  }

  cargarAlumnos(): void {
    this._alumnoService.getAlumnos().subscribe(
      (alumnos: Usuario[]) => {
        this.listAlumnos = alumnos;
        this.dataSource = new MatTableDataSource(this.listAlumnos);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error) => {
        console.error('Error al cargar los alumnos', error);
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  eliminarAlumno(index: number) {
    this._alumnoService.eliminarAlumno(index).subscribe(
      () => {
        this.cargarAlumnos(); // Actualizar la lista después de eliminar
        this._snackBar.open('El usuario fue eliminado con éxito', '', {
          duration: 1500,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
      },
      error => {
        console.error('Error al eliminar el alumno', error);
        this._snackBar.open('Error al eliminar el Alumno', '', {
          duration: 1500,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
      }
    );
  }

  editarAlumno(element: Usuario, index: number) {
    const dialogRef = this.dialog.open(EditarAlumnoComponent, {
      width: '80%',
      maxWidth: '600px',
      minWidth: '400px',
      height: 'auto',
      data: { alumno: element, index }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cargarAlumnos(); // Actualizar la lista después de editar
      }
    });
  }
}
