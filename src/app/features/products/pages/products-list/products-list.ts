import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { DecimalPipe, JsonPipe, NgFor, NgIf, NgOptimizedImage } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ProductService } from '../../services/product.service';
import type { Product } from '../../models/product';
import { ProductDialog } from '../../components/product-dialog/product-dialog';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'app-products-list',
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    NgOptimizedImage,
    DecimalPipe,
    TranslocoModule
  ],
  templateUrl: './products-list.html',
  styleUrl: './products-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsList {
  protected readonly productService = inject(ProductService);
  private _dialog = inject(MatDialog);

  openAdd(): void {
    const ref = this._dialog.open(ProductDialog, {
      data: {},
      width: '520px'
    });
    ref.afterClosed().subscribe((value: Omit<Product, 'id'> | undefined) => {
      if (value) {
        this.productService.add(value);
      }
    });
  }

  openEdit(p: Product): void {
    const ref = this._dialog.open(ProductDialog, {
      data: { product: p },
      width: '520px'
    });
    ref.afterClosed().subscribe((value: Omit<Product, 'id'> | undefined) => {
      if (value) {
        this.productService.update(p.id, value);
      }
    });
  }

  deleteProduct(id: number): void {
    const product = this.productService.products().find(p => p.id === id);
    const ref = this._dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'common.dialog.delete_title',
        message: 'common.dialog.delete_message',
        params: { name: product?.name || '' },
        confirmText: 'common.dialog.delete',
        type: 'danger'
      },
      backdropClass: 'backdrop-light'
    });

    ref.afterClosed().subscribe((result) => {
      if (result) {
        this.productService.remove(id);
      }
    });
  }
}
