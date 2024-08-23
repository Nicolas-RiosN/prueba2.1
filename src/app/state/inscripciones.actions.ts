import { createAction, props } from '@ngrx/store';
import { Usuario } from '../interfaces/usuario';
import { Curso } from '../interfaces/curso';
import { Inscripcion } from '../interfaces/inscripcion';

export const loadInscripciones = createAction('[Inscripciones] Load Inscripciones');
export const loadInscripcionesSuccess = createAction(
  '[Inscripciones] Load Inscripciones Success',
  props<{ inscripciones: Inscripcion[], usuarios: Usuario[], cursos: Curso[] }>()
);
export const loadInscripcionesFailure = createAction(
  '[Inscripciones] Load Inscripciones Failure',
  props<{ error: string }>()
);

export const inscribir = createAction(
    '[Inscripciones] Inscribir',
    props<{ usuario: Usuario; curso: Curso }>()
  );
  
export const inscribirSuccess = createAction(
    '[Inscripciones] Inscribir Success',
    props<{ inscripcion: Inscripcion }>()
  );
export const inscribirFailure = createAction(
  '[Inscripciones] Inscribir Failure',
  props<{ error: string }>()
);

export const eliminarInscripcion = createAction(
    '[Inscripciones] Eliminar Inscripcion',
    props<{ usuario: Usuario; curso: Curso }>()
  );
  
  export const eliminarInscripcionSuccess = createAction(
    '[Inscripciones] Eliminar Inscripcion Success'
  );
  
  export const eliminarInscripcionFailure = createAction(
    '[Inscripciones] Eliminar Inscripcion Failure',
    props<{ error: any }>()
  );


export const loadCursosFailure = createAction(
    '[Cursos] Load Cursos Failure',
    props<{ error: string }>()
  );

export const loadCursos = createAction(
    '[Cursos] Load Cursos'
  );
  
  export const loadCursosSuccess = createAction(
    '[Cursos] Load Cursos Success',
    props<{ cursos: Curso[] }>()
  );
  
  

  export const loadUsuarios = createAction(
    '[Usuarios] Load Usuarios'
  );
  
  export const loadUsuariosSuccess = createAction(
    '[Usuarios] Load Usuarios Success',
    props<{ usuarios: Usuario[] }>()
  );
  
  export const loadUsuariosFailure = createAction(
    '[Usuarios] Load Usuarios Failure',
    props<{ error: string }>()
  );
  
  