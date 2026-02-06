import { inject, Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { TranslocoService } from '@jsverse/transloco';

@Injectable()
export class TranslocoPaginatorIntlService extends MatPaginatorIntl {
 private _transloco = inject(TranslocoService);

 override itemsPerPageLabel = '';
 override nextPageLabel = '';
 override previousPageLabel = '';
 override firstPageLabel = '';
 override lastPageLabel = '';

 constructor() {
  super();
  // Use selectTranslate to wait for translations to be ready and react to changes
  this._transloco.selectTranslate('common.paginator.itemsPerPageLabel').subscribe(v => { this.itemsPerPageLabel = v; this.changes.next(); });
  this._transloco.selectTranslate('common.paginator.nextPageLabel').subscribe(v => { this.nextPageLabel = v; this.changes.next(); });
  this._transloco.selectTranslate('common.paginator.previousPageLabel').subscribe(v => { this.previousPageLabel = v; this.changes.next(); });
  this._transloco.selectTranslate('common.paginator.firstPageLabel').subscribe(v => { this.firstPageLabel = v; this.changes.next(); });
  this._transloco.selectTranslate('common.paginator.lastPageLabel').subscribe(v => { this.lastPageLabel = v; this.changes.next(); });
 }

 override getRangeLabel = (page: number, pageSize: number, length: number): string => {
  if (length === 0 || pageSize === 0) {
   return `0 ${this._transloco.translate('common.paginator.ofLabel')} ${length}`;
  }
  length = Math.max(length, 0);
  const startIndex = page * pageSize;
  const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
  return `${startIndex + 1} – ${endIndex} ${this._transloco.translate('common.paginator.ofLabel')} ${length}`;
 };
}
