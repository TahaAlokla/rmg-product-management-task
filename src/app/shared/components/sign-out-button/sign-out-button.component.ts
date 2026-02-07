import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../core/auth/services/auth-service';

@Component({
  selector: 'app-sign-out-button',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './sign-out-button.component.html',
  styleUrl: './sign-out-button.component.css',
})
export class SignOutButtonComponent {
  private _auth = inject(AuthService);
  private _router = inject(Router);

  signOut(): void {
    this._auth.logout();
    this._router.navigate(['/sign-in']);
  }
}
