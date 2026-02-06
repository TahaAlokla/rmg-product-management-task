import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LanguageDirectionService } from './core/services/language-direction.service';
import { LanguageToggleComponent } from './shared/components/language-toggle/language-toggle.component';
import { ThemeToggleComponent } from './shared/components/theme-toggle/theme-toggle.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ThemeToggleComponent, LanguageToggleComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('taha-alokla-RMG-task');

  constructor(_languageDirection: LanguageDirectionService) {}
}
