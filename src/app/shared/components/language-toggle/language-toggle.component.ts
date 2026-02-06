import { Component, inject, signal, OnInit, DestroyRef } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { TranslocoService } from '@jsverse/transloco';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-language-toggle',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './language-toggle.component.html',
  styleUrl: './language-toggle.component.css',
})
export class LanguageToggleComponent implements OnInit {
  private _transloco = inject(TranslocoService);
  private _destroyRef = inject(DestroyRef);

  activeLang = signal(this._transloco.getActiveLang());

  ngOnInit(): void {
    this._transloco.langChanges$
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((lang) => this.activeLang.set(lang));
  }

  toggleLanguage(): void {
    const next = this.activeLang() === 'ar' ? 'en' : 'ar';
    this._transloco.setActiveLang(next);
  }
}
