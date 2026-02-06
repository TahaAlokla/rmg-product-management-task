import { Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { NgClass } from '@angular/common';
import { AuthService } from '../../../../core/auth/services/auth-service';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    TranslocoModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private _authService = inject(AuthService);
  private _router = inject(Router);
  private _fb = inject(NonNullableFormBuilder);

  loginForm = this._fb.group({
    email: ['test@example.com', [Validators.required, Validators.email]],
    password: ['Password123!', Validators.required],
  });

  errorMessage: string | null = null;
  hidePassword = signal(true);

  togglePasswordVisibility(): void {
    this.hidePassword.update((v) => !v);
  }

  login(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.loginForm.disable();
    this.errorMessage = null;

    const { email, password } = this.loginForm.getRawValue();

    this._authService.login(email, password).subscribe({
      next: () => {
        this._router.navigate(['/']);
      },
      error: (err) => {
        this.loginForm.enable();
        this.errorMessage = err.message || 'Invalid credentials';
      },
    });
  }
}
