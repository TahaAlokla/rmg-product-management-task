import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { TranslocoModule } from '@jsverse/transloco';

export interface ConfirmDialogData {
 title: string;
 message: string;
 params?: any;
 confirmText?: string;
 cancelText?: string;
 type?: 'danger' | 'warning' | 'primary';
}

@Component({
 selector: 'app-confirm-dialog',
 standalone: true,
 imports: [MatDialogModule, MatButtonModule, TranslocoModule],
 templateUrl: './confirm-dialog.component.html',
 styles: [`
    .dialog-content {
      min-width: 300px;
      background-color: var(--mat-sys-surface) !important;
    }
    .danger-btn {
      background-color: var(--mat-sys-error) !important;
      color: var(--mat-sys-on-error) !important;
    }
  `],
 changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmDialogComponent {
 readonly dialogRef = inject(MatDialogRef<ConfirmDialogComponent>);
 readonly data = inject<ConfirmDialogData>(MAT_DIALOG_DATA);

 get confirmColor(): string {
  return this.data.type === 'danger' ? 'warn' : 'primary';
 }
}
