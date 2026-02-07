import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule, NonNullableFormBuilder, Validators } from '@angular/forms';
import type { Product } from '../../models/product';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { TranslocoModule } from '@jsverse/transloco';

type DialogData = { product?: Product };

@Component({
  selector: 'app-product-dialog',
  imports: [MatDialogModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule ,TranslocoModule],
  templateUrl: './product-dialog.html',
  styleUrl: './product-dialog.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDialog {
  private _fb = inject(NonNullableFormBuilder);
  private _dialogRef = inject<MatDialogRef<ProductDialog, Omit<Product, 'id'>>>(MatDialogRef);
  _data = inject<DialogData>(MAT_DIALOG_DATA);

  form = this._fb.group({
    name: ['', [Validators.required, Validators.maxLength(100)]],
    description: ['', [Validators.required, Validators.maxLength(500)]],
    price: [0, [Validators.required, Validators.min(0)]],
    imageUrl: ['', [Validators.required]],
  });

  constructor() {
    const p = this._data.product;
    if (p) {
      this.form.setValue({
        name: p.name,
        description: p.description,
        price: p.price,
        imageUrl: p.imageUrl
      });
    }
  }

  save(): void {
    if (this.form.invalid) {
      return;
    }
    const value = this.form.getRawValue();
    this._dialogRef.close(value);
  }

  cancel(): void {
    this._dialogRef.close();
  }
}
