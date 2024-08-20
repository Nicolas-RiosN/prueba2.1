import { Component, OnInit } from '@angular/core';
import { InscripcionesService } from '../../../../services/inscripciones.service';
import { Inscripcion } from '../../../../interfaces/inscripcion';

@Component({
  selector: 'app-inscripciones-list',
  templateUrl: './inscripciones-list.component.html',
  styleUrl: './inscripciones-list.component.scss'
})
export class InscripcionesListComponent implements OnInit {

  inscripciones: Inscripcion[] = [];

  constructor(private inscripcionesService: InscripcionesService) {}

  ngOnInit(): void {
    this.inscripcionesService.getInscripciones().subscribe(
      (data: Inscripcion[]) => { // Especificamos el tipo Inscripcion[]
        this.inscripciones = data;
      },
      (error: any) => {
        console.error('Error al cargar inscripciones', error);
      }
    );
  }
}