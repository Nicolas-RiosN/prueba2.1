import { createReducer, on } from '@ngrx/store';
import { InscripcionesState } from './inscripciones.model';
import { 
  loadUsuarios, 
  loadUsuariosSuccess, 
  loadUsuariosFailure, 
  loadCursos, 
  loadCursosSuccess, 
  loadCursosFailure, 
  inscribir, 
  inscribirSuccess, 
  inscribirFailure, 
  eliminarInscripcion, 
  eliminarInscripcionSuccess, 
  eliminarInscripcionFailure 
} from './inscripciones.actions';

export const initialState: InscripcionesState = {
  usuarios: [],
  cursos: [],
  loading: false,
  error: null
};

export const inscripcionesReducer = createReducer(
  initialState,
  on(loadUsuarios, state => ({ ...state, loading: true })),
  on(loadUsuariosSuccess, (state, { usuarios }) => ({ ...state, usuarios, loading: false })),
  on(loadUsuariosFailure, (state, { error }) => ({ ...state, error, loading: false })),
  on(loadCursos, state => ({ ...state, loading: true })),
  on(loadCursosSuccess, (state, { cursos }) => ({ ...state, cursos, loading: false })),
  on(loadCursosFailure, (state, { error }) => ({ ...state, error, loading: false })),
  on(inscribir, state => ({ ...state, loading: true })),
  on(inscribirSuccess, (state, { inscripcion }) => ({ ...state, loading: false })),
  on(inscribirFailure, (state, { error }) => ({ ...state, error, loading: false })),
  on(eliminarInscripcion, state => ({ ...state, loading: true })),
  on(eliminarInscripcionSuccess, state => ({ ...state, loading: false })),
  on(eliminarInscripcionFailure, (state, { error }) => ({ ...state, error, loading: false }))
);
