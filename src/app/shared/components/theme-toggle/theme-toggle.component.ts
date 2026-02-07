import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
 selector: 'app-theme-toggle',
 standalone: true,
 imports: [MatButtonModule, MatIconModule],
 templateUrl: './theme-toggle.component.html',
 styleUrl: './theme-toggle.component.css'
})
export class ThemeToggleComponent {
 themeService = inject(ThemeService);
}
