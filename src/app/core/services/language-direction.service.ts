import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslocoService } from '@jsverse/transloco';

const RTL_LANGS = new Set(['ar']);
const LOCALE_STORAGE_KEY = 'app.locale';
const AVAILABLE_LANGS = ['en', 'ar'] as const;

@Injectable({ providedIn: 'root' })
export class LanguageDirectionService {
  private _transloco = inject(TranslocoService);
  private _platformId = inject(PLATFORM_ID);

  constructor() {
    if (isPlatformBrowser(this._platformId)) {
      const saved = localStorage.getItem(LOCALE_STORAGE_KEY);
      if (saved && AVAILABLE_LANGS.includes(saved as (typeof AVAILABLE_LANGS)[number])) {
        this._transloco.setActiveLang(saved);
      }
      this._applyDirection(this._transloco.getActiveLang());
      this._transloco.langChanges$.subscribe((lang) => {
        this._applyDirection(lang);
        localStorage.setItem(LOCALE_STORAGE_KEY, lang);
      });
    }
  }

  private _applyDirection(lang: string): void {
    const html = document.documentElement;
    html.setAttribute('lang', lang);
    html.setAttribute('dir', RTL_LANGS.has(lang) ? 'rtl' : 'ltr');
  }
}
