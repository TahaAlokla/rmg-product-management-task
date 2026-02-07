import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslocoService } from '@jsverse/transloco';

const RTL_LANGS = new Set(['ar']);
const LOCALE_STORAGE_KEY = 'app.locale';
const AVAILABLE_LANGS = ['en', 'ar'] as const;

@Injectable({ providedIn: 'root' })
export class LanguageDirectionService {
  private _transloco = inject(TranslocoService);
  private _platformId = inject(PLATFORM_ID);

  readonly dir = signal<'ltr' | 'rtl'>('ltr');

  constructor() {
    if (isPlatformBrowser(this._platformId)) {
      const saved = localStorage.getItem(LOCALE_STORAGE_KEY);
      if (saved && AVAILABLE_LANGS.includes(saved as (typeof AVAILABLE_LANGS)[number])) {
        this._transloco.setActiveLang(saved);
      }
      this._updateState(this._transloco.getActiveLang());
      this._transloco.langChanges$.subscribe((lang) => {
        this._updateState(lang);
        localStorage.setItem(LOCALE_STORAGE_KEY, lang);
      });
    }
  }

  private _updateState(lang: string): void {
    const direction = RTL_LANGS.has(lang) ? 'rtl' : 'ltr';
    this.dir.set(direction);
    this._applyDirection(lang, direction);
  }

  private _applyDirection(lang: string, dir: string): void {
    const html = document.documentElement;
    html.setAttribute('lang', lang);
    html.setAttribute('dir', dir);
  }
}
