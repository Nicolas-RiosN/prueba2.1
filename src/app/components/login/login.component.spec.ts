import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoginComponent } from './login.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { DashboardModule } from '../dashboard/dashboard.module';
import { AppModule } from '../../app.module';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { Component, Renderer2 } from '@angular/core';
import { FontSize20Directive } from '../shared/directives/font-size20.directive';

@Component({
  template: `<div appFontSize20></div>`
})

class TestComponent {}

describe('FontSize20Directive', () => {
  let fixture: ComponentFixture<TestComponent>;
  let renderer: Renderer2;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, FontSize20Directive],
      providers: [{ provide: Renderer2, useValue: jasmine.createSpyObj('Renderer2', ['setStyle']) }]
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    renderer = TestBed.inject(Renderer2);
  });

  it('should call setStyle with correct parameters on initialization', () => {
    fixture.detectChanges(); // Esto inicializa la directiva
    expect(renderer.setStyle).toHaveBeenCalledWith(jasmine.any(Element), 'font-size', '20px');
  });
});

class MockAuthService {
  login(usuario: string, password: string) {
    return of(true); // Mock successful login
  }
}

class MockRouter {
  navigate(path: string[]) {}
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent, DashboardComponent],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        BrowserAnimationsModule,
        FormsModule,
        MatToolbarModule,
        DashboardModule,
        AppModule
      ],
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        { provide: Router, useClass: MockRouter },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create form with empty values', () => {
    expect(component.form.value).toEqual({ usuario: '', password: '' });
  });

  it('should not call authService.login if form is invalid', () => {
    spyOn(authService, 'login').and.callThrough();
    component.ingresar();
    expect(authService.login).not.toHaveBeenCalled();
  });

  it('should call authService.login and navigate on successful login', () => {
    spyOn(authService, 'login').and.returnValue(of(true));
    spyOn(router, 'navigate');
    
    component.form.setValue({ usuario: 'test', password: 'password' });
    component.ingresar();
    
    expect(authService.login).toHaveBeenCalledWith('test', 'password');
    expect(router.navigate).toHaveBeenCalledWith(['dashboard']);
  });

  it('should set error message on failed login', () => {
    spyOn(authService, 'login').and.returnValue(of(false));
    
    component.form.setValue({ usuario: 'test', password: 'password' });
    component.ingresar();
    
    expect(component.error).toBe('Credenciales incorrectas');
  });

  it('should set error message on login error', () => {
    spyOn(authService, 'login').and.returnValue(throwError(() => new Error('Error')));
    
    component.form.setValue({ usuario: 'test', password: 'password' });
    component.ingresar();
    
    expect(component.error).toBe('Error al iniciar sesión');
  });

  it('should show spinner when loading', () => {
    component.loading = true;
    fixture.detectChanges();
    
    const spinner = fixture.nativeElement.querySelector('mat-spinner');
    expect(spinner).toBeTruthy();
  });

  it('should hide spinner when not loading', () => {
    component.loading = false;
    fixture.detectChanges();
    
    const spinner = fixture.nativeElement.querySelector('mat-spinner');
    expect(spinner).toBeFalsy();
  });

  it('should disable submit button when form is invalid', () => {
    component.form.setValue({ usuario: '', password: '' });
    fixture.detectChanges();
    
    const button = fixture.nativeElement.querySelector('button');
    expect(button.disabled).toBeTrue();
  });
});
