import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { DecimalPipe, JsonPipe, NgFor, NgIf, NgOptimizedImage } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ProductService } from '../../services/product.service';
import type { Product } from '../../models/product';
import { ProductDialog } from '../../components/product-dialog/product-dialog';
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
    this.productService.remove(id);
  }
}
