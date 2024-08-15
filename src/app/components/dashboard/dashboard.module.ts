import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { InicioComponent } from './inicio/inicio.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AlumnosComponent } from './alumnos/alumnos.component';
import { ReportesComponent } from './reportes/reportes.component';
import { CrearAlumnoComponent } from './alumnos/crear-alumno/crear-alumno.component';
import { EditarAlumnoComponent } from './alumnos/editar-alumno/editar-alumno.component';
import { RouterModule } from '@angular/router';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatDrawer, MatDrawerContainer } from '@angular/material/sidenav';
import { MatNavList } from '@angular/material/list';
import { MatToolbar } from '@angular/material/toolbar';
import { MatOption, MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatCard, MatCardContent } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { MatPaginatorModule } from '@angular/material/paginator';


@NgModule({
  declarations: [
    DashboardComponent,
    InicioComponent,
    AlumnosComponent,
    ReportesComponent,
    CrearAlumnoComponent,
    EditarAlumnoComponent,
    NavbarComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    RouterModule,
    MatIconModule,
    MatIcon,
    MatDrawer,
    MatDrawerContainer,
    MatNavList,
    MatToolbar,
    MatOptionModule,
    MatOption,
    MatSelectModule,
    MatCard,
    MatCardContent,
    FormsModule,
    ReactiveFormsModule,
    MatGridList,
    MatGridTile,
    MatPaginatorModule,
    SharedModule
  ],
  exports: [
    DashboardComponent // Exporta si es necesario
  ]
})
export class DashboardModule { }
