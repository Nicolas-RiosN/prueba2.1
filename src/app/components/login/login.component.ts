import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loading = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  ingresar(): void {
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    this.authService.login(this.form.value.usuario, this.form.value.password).subscribe(
      success => {
        if (success) {
          this.router.navigate(['dashboard']);
        } else {
          this.error = 'Credenciales incorrectas';
        }
        this.loading = false;
      },
      () => {
        this.error = 'Error al iniciar sesión';
        this.loading = false;
      }
    );
  }
}