import { Injectable, signal, effect, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private _platformId = inject(PLATFORM_ID);
  isDarkMode = signal<boolean>(true);

  constructor() {
    if (isPlatformBrowser(this._platformId)) {
      const savedTheme = localStorage.getItem('theme');
      let isDark: boolean;
      if (savedTheme) {
        isDark = savedTheme === 'dark';
        this.isDarkMode.set(isDark);
      } else {
        // Default to dark mode on first load
        isDark = true;
        this.isDarkMode.set(isDark);
      }
      const html = document.documentElement;
      html.classList.toggle('dark', isDark);
      html.style.colorScheme = isDark ? 'dark' : 'light';
    }

    effect(() => {
      if (isPlatformBrowser(this._platformId)) {
        const isDark = this.isDarkMode();
        const html = document.documentElement;
        if (isDark) {
          html.classList.add('dark');
          html.style.colorScheme = 'dark';
          localStorage.setItem('theme', 'dark');
        } else {
          html.classList.remove('dark');
          html.style.colorScheme = 'light';
          localStorage.setItem('theme', 'light');
        }
      }
    });
  }

  toggleTheme(): void {
    this.isDarkMode.update((current: boolean) => !current);
  }
}
