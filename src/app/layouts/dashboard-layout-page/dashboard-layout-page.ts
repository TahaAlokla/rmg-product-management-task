import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslocoModule } from '@jsverse/transloco';
import { AuthService } from '../../core/auth/services/auth-service';
import { ThemeToggleComponent } from '../../shared/components/theme-toggle/theme-toggle.component';

@Component({
  selector: 'app-dashboard-layout-page',
  standalone: true,
  imports: [
    RouterOutlet,
    MatToolbarModule,
    MatIconModule
    ,
  ],
  templateUrl: './dashboard-layout-page.html',
  styleUrl: './dashboard-layout-page.css',
})
export class DashboardLayoutPage {
}
