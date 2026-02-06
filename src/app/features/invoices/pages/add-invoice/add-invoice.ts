import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { Router } from '@angular/router';
import { InvoiceFormComponent, InvoiceFormData } from '../../components/invoice-form/invoice-form.component';
import { InvoiceService } from '../../services/invoice.service';

@Component({
 selector: 'app-add-invoice',
 imports: [InvoiceFormComponent],
 template: `
    <app-invoice-form
      [invoiceNumber]="getNextInvoiceNumber()"
      [mode]="'add'"
      (save)="onSave($event)"
      (cancel)="onCancel()"
    />
  `,
 changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddInvoice {
 private router = inject(Router);
 private invoiceService = inject(InvoiceService);

 getNextInvoiceNumber(): number {
  const invoices = this.invoiceService.getInvoices();
  return invoices.length > 0 ? Math.max(...invoices.map(inv => inv.id)) + 1 : 1;
 }

 onSave(formData: InvoiceFormData) {
  this.invoiceService.addInvoice(formData);
  this.router.navigate(['/invoices']);
 }

 onCancel() {
  this.router.navigate(['/invoices']);
 }
}
