import { Component, ViewChild } from '@angular/core';
import { Usuario } from '../../../interfaces/usuario';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UsuarioService } from '../../../services/usuario.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { CrearAlumnoComponent } from './crear-alumno/crear-alumno.component';
import { EditarAlumnoComponent } from './editar-alumno/editar-alumno.component';
import { SharedModule } from '../../shared/shared.module';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrl: './alumnos.component.scss'
})
export class AlumnosComponent {
  
  listAlumnos: Usuario[] = [];

    displayedColumns: string[] = ['usuario', 'nombreApellido', 'curso', 'acciones','editar'];
    dataSource!: MatTableDataSource<any>

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    
    constructor(private _alumnoService: UsuarioService, private _snackBar: MatSnackBar, public dialog: MatDialog) {
      this.dataSource = new MatTableDataSource<Usuario>([]);
    }

    ngOnInit(){
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


    ngAfterViewInit() {
      if (this.dataSource) {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    }
      
    eliminarAlumno(index: number) {
      this._alumnoService.eliminarAlumno(index).subscribe(
        () => {
          this.cargarAlumnos();
          this._snackBar.open('El alumno fue eliminado con éxito', '', {
            duration: 1500,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });
        },
        (error) => console.error('Error al eliminar el alumno', error)
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