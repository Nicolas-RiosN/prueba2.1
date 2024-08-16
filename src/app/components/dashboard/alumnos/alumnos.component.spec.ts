import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { of, throwError } from 'rxjs';
import { AlumnosComponent } from './alumnos.component';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../interfaces/usuario';
import { EditarAlumnoComponent } from './editar-alumno/editar-alumno.component';

describe('AlumnosComponent', () => {
  let component: AlumnosComponent;
  let fixture: ComponentFixture<AlumnosComponent>;
  let mockAlumnoService: jasmine.SpyObj<UsuarioService>;
  let snackBar: jasmine.SpyObj<MatSnackBar>;
  let dialog: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {
    mockAlumnoService = jasmine.createSpyObj('UsuarioService', ['getAlumnos', 'eliminarAlumno']);
    snackBar = jasmine.createSpyObj('MatSnackBar', ['open']);
    dialog = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      declarations: [ AlumnosComponent ],
      providers: [
        { provide: UsuarioService, useValue: mockAlumnoService },
        { provide: MatSnackBar, useValue: snackBar },
        { provide: MatDialog, useValue: dialog }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlumnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load alumnos on init', () => {
    const mockAlumnos: Usuario[] = [{ usuario: 'user1', nombre: 'John', apellido: 'Doe', curso: 'Math' }];
    mockAlumnoService.getAlumnos.and.returnValue(of(mockAlumnos));

    component.ngOnInit();

    expect(component.listAlumnos).toEqual(mockAlumnos);
    expect(component.dataSource.data).toEqual(mockAlumnos);
  });

  it('should apply filter', () => {
    component.dataSource = new MatTableDataSource([{ usuario: 'user1', nombre: 'John', apellido: 'Doe', curso: 'Math' }]);

    const event = { target: { value: 'john' } } as unknown as Event;
    component.applyFilter(event);

    expect(component.dataSource.filter).toBe('john');
  });

  it('should call eliminarAlumno and show snackbar on success', () => {
    mockAlumnoService.eliminarAlumno.and.returnValue(of(null));
    spyOn(component, 'cargarAlumnos').and.callThrough();

    component.eliminarAlumno(1);

    expect(mockAlumnoService.eliminarAlumno).toHaveBeenCalledWith(1);
    expect(component.cargarAlumnos).toHaveBeenCalled();
    expect(snackBar.open).toHaveBeenCalledWith('El alumno fue eliminado con éxito', '', { duration: 1500, horizontalPosition: 'center', verticalPosition: 'bottom' });
  });

  it('should handle error in eliminarAlumno', () => {
    mockAlumnoService.eliminarAlumno.and.returnValue(throwError('Error'));

    component.eliminarAlumno(1);

    expect(mockAlumnoService.eliminarAlumno).toHaveBeenCalledWith(1);
  });

  it('should call editarAlumno and open dialog', () => {
    const mockAlumno: Usuario = { usuario: 'user1', nombre: 'John', apellido: 'Doe', curso: 'Math' };
    const dialogRef = { afterClosed: () => of(true) };
    dialog.open.and.returnValue(dialogRef as any);

    component.editarAlumno(mockAlumno, 1);

    expect(dialog.open).toHaveBeenCalledWith(EditarAlumnoComponent, {
      width: '80%',
      maxWidth: '600px',
      minWidth: '400px',
      height: 'auto',
      data: { alumno: mockAlumno, index: 1 }
    });
  });
});
