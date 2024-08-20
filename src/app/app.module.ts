import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClientModule } from '@angular/common/http';

//Componentes
import { LoginComponent } from './components/login/login.component';
import { SharedModule } from './components/shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { DashboardModule } from './components/dashboard/dashboard.module';
import { AuthService } from './services/auth.service';
import { LoginModule } from './components/login/login.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { inscripcionesReducer } from './state/inscripciones.reducer';
import { DashboardRoutingModule } from './components/dashboard/dashboard-routing.module';
import { metaReducers, reducers } from './reducers';
import { InscripcionesEffects } from './state/inscripciones.effects';


@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    RouterModule,
    MatIconModule,
    DashboardRoutingModule,
    DashboardModule,
    LoginModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([InscripcionesEffects]),
    StoreModule.forRoot({ inscripciones: inscripcionesReducer }),
    StoreModule.forRoot({ inscripciones: inscripcionesReducer }),
    EffectsModule.forRoot([InscripcionesEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25})
  ],
  providers: [
    AuthService
  ],
  bootstrap: [AppComponent],
  exports:[AppComponent]
})
export class AppModule { }
