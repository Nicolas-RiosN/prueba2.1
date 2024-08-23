import { ActionReducerMap } from '@ngrx/store';
import { InscripcionesState } from './inscripciones.model';
import { inscripcionesReducer } from './inscripciones.reducer';


export interface AppState {
  inscripciones: InscripcionesState;
}

export const reducers: ActionReducerMap<AppState> = {
  inscripciones: inscripcionesReducer,
};
