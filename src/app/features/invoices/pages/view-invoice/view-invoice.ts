import { Component, ChangeDetectionStrategy, inject, signal, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslocoModule } from '@jsverse/transloco';
import { InvoiceService } from '../../services/invoice.service';
import type { Invoice } from '../../models/invoice';
import { CommonModule } from '@angular/common';

@Component({
 selector: 'app-view-invoice',
 imports: [CommonModule, MatButtonModule, MatIconModule, TranslocoModule],
 templateUrl: './view-invoice.html',
 styleUrl: './view-invoice.css',
 changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewInvoice implements OnInit {
 private router = inject(Router);
 private route = inject(ActivatedRoute);
 private invoiceService = inject(InvoiceService);

 invoice = signal<Invoice | null>(null);

 ngOnInit() {
  const id = Number(this.route.snapshot.paramMap.get('id'));
  const foundInvoice = this.invoiceService.getInvoiceById(id);

  if (foundInvoice) {
   this.invoice.set(foundInvoice);
  } else {
   // Invoice not found, redirect to list
   this.router.navigate(['/invoices']);
  }
 }

 goBack() {
  this.router.navigate(['/invoices']);
 }

 editInvoice() {
  const id = this.invoice()?.id;
  if (id) {
   this.router.navigate(['/invoices/edit', id]);
  }
 }
}
