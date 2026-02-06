import { Component, ChangeDetectionStrategy, ViewChild, computed, signal, effect, inject } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { TranslocoModule } from '@jsverse/transloco';
import type { Invoice, InvoiceStatus } from '../../models/invoice';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { Router } from '@angular/router';
import { InvoiceService } from '../../services/invoice.service';

@Component({
  selector: 'app-invoices-list',
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    TranslocoModule
  ],
  templateUrl: './invoices-list.html',
  styleUrl: './invoices-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InvoicesList {
  private _dialog = inject(MatDialog);
  private _router = inject(Router);
  private invoiceService = inject(InvoiceService);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  activeFilter = signal<InvoiceStatus | 'all'>('all');

  dataSource = new MatTableDataSource<Invoice>([]);
  displayedColumns: string[] = ['id', 'billFrom', 'billTo', 'totalCost', 'status', 'actions'];

  // Get invoices from service
  invoices = this.invoiceService.invoices;

  // Statistics computed from service invoices
  totalInvoices = computed(() => this.invoices().length);
  shippedInvoices = computed(() => this.invoices().filter(inv => inv.status === 'shipped').length);
  deliveredInvoices = computed(() => this.invoices().filter(inv => inv.status === 'delivered').length);
  pendingInvoices = computed(() => this.invoices().filter(inv => inv.status === 'pending').length);

  // Filtered invoices based on active filter
  filteredInvoices = computed(() => {
    const filter = this.activeFilter();
    if (filter === 'all') {
      return this.invoices();
    }
    return this.invoices().filter(inv => inv.status === filter);
  });

  constructor() {
    // Update dataSource when filtered invoices change
    effect(() => {
      this.dataSource.data = this.filteredInvoices();
      if (this.paginator) {
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  filterByStatus(status: InvoiceStatus | 'all') {
    this.activeFilter.set(status);
    // Reset text search when changing status filter
    this.dataSource.filter = '';
  }

  isFilterActive(status: InvoiceStatus | 'all'): boolean {
    return this.activeFilter() === status;
  }

  addInvoice(): void {
    this._router.navigate(['/invoices/add']);
  }

  editInvoice(invoice: Invoice): void {
    this._router.navigate(['/invoices/edit', invoice.id]);
  }

  viewInvoice(invoice: Invoice): void {
    this._router.navigate(['/invoices/view', invoice.id]);
  }

  deleteInvoice(invoice: Invoice): void {
    const ref = this._dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'common.dialog.delete_title',
        message: 'common.invoices.delete_message',
        params: { id: invoice.id, billFrom: invoice.billFrom },
        confirmText: 'common.dialog.delete',
        type: 'danger'
      },
      backdropClass: 'backdrop-light'
    });

    ref.afterClosed().subscribe((result: boolean | undefined) => {
      if (result) {
        // Remove invoice using service
        this.invoiceService.remove(invoice.id);
      }
    });
  }
}

