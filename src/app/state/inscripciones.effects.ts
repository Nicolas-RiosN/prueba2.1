import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { InscripcionesService } from '../services/inscripciones.service';
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
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Inscripcion } from '../interfaces/inscripcion';

@Injectable()
export class InscripcionesEffects {

  loadUsuarios$ = createEffect(() => this.actions$.pipe(
    ofType(loadUsuarios),
    mergeMap(() => this.inscripcionesService.getUsuarios()
      .pipe(
        map(usuarios => loadUsuariosSuccess({ usuarios })),
        catchError(error => of(loadUsuariosFailure({ error })))
      ))
  ));

  loadCursos$ = createEffect(() => this.actions$.pipe(
    ofType(loadCursos),
    mergeMap(() => this.inscripcionesService.getCursos()
      .pipe(
        map(cursos => loadCursosSuccess({ cursos })),
        catchError(error => of(loadCursosFailure({ error })))
      ))
  ));
  
  inscribir$ = createEffect(() =>
    this.actions$.pipe(
      ofType(inscribir),
      switchMap(({ usuario, curso }) =>
        this.inscripcionesService.inscribir(usuario, curso).pipe(
          map(inscripcion => inscribirSuccess({ inscripcion })),
          catchError(error => of(inscribirFailure({ error })))
        )
      )
    )
  );

  eliminarInscripcion$ = createEffect(() =>
    this.actions$.pipe(
      ofType(eliminarInscripcion),
      switchMap(({ usuario, curso }) =>
        this.inscripcionesService.eliminarInscripcion(usuario,curso).pipe(
          map(() => eliminarInscripcionSuccess()),
          catchError(error => of(eliminarInscripcionFailure({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private inscripcionesService: InscripcionesService
  ) {}
}
