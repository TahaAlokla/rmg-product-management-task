import { Component, ChangeDetectionStrategy, inject, signal, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { InvoiceFormComponent, InvoiceFormData } from '../../components/invoice-form/invoice-form.component';
import { InvoiceService } from '../../services/invoice.service';
import type { Invoice } from '../../models/invoice';

@Component({
 selector: 'app-edit-invoice',
 imports: [InvoiceFormComponent],
 template: `
    @if (invoice()) {
      <app-invoice-form
        [invoice]="invoice()"
        [invoiceNumber]="invoice()!.id"
        [mode]="'edit'"
        (save)="onSave($event)"
        (cancel)="onCancel()"
      />
    }
  `,
 changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditInvoice implements OnInit {
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

 onSave(formData: InvoiceFormData) {
  const id = this.invoice()?.id;
  if (id) {
   this.invoiceService.updateInvoice(id, formData);
   this.router.navigate(['/invoices']);
  }
 }

 onCancel() {
  this.router.navigate(['/invoices']);
 }
}
