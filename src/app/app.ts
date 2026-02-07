import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './core/auth/services/auth-service';
import { LanguageDirectionService } from './core/services/language-direction.service';
import { ThemeService } from './core/services/theme.service';
import { LanguageToggleComponent } from './shared/components/language-toggle/language-toggle.component';
import { SignOutButtonComponent } from './shared/components/sign-out-button/sign-out-button.component';
import { ThemeToggleComponent } from './shared/components/theme-toggle/theme-toggle.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SignOutButtonComponent, ThemeToggleComponent, LanguageToggleComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('taha-alokla-RMG-task');
  protected readonly authService = inject(AuthService);

  constructor(_languageDirection: LanguageDirectionService, _themeService: ThemeService) { }
}
