import { createSelector } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { InscripcionesState } from './inscripciones.model';

export const selectInscripcionesState = (state: AppState) => state.inscripciones;

export const selectUsuarios = createSelector(
  selectInscripcionesState,
  (state: InscripcionesState) => state.usuarios
);

export const selectCursos = createSelector(
  selectInscripcionesState,
  (state: InscripcionesState) => state.cursos
);

export const selectLoading = createSelector(
  selectInscripcionesState,
  (state: InscripcionesState) => state.loading
);

export const selectError = createSelector(
  selectInscripcionesState,
  (state: InscripcionesState) => state.error
);
