import { Component, ChangeDetectionStrategy, input, output, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { TranslocoModule } from '@jsverse/transloco';
import type { Invoice, InvoiceStatus, InvoiceItem } from '../../models/invoice';
import { CommonModule } from '@angular/common';

export interface InvoiceFormData {
 billFrom: string;
 billTo: string;
 totalCost: number;
 status: InvoiceStatus;
 orderDate?: Date;
 items?: InvoiceItem[];
}

@Component({
 selector: 'app-invoice-form',
 imports: [
  CommonModule,
  ReactiveFormsModule,
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatFormFieldModule,
  MatSelectModule,
  MatDatepickerModule,
  TranslocoModule
 ],
 providers: [provideNativeDateAdapter()],
 templateUrl: './invoice-form.component.html',
 styleUrl: './invoice-form.component.css',
 changeDetection: ChangeDetectionStrategy.OnPush
})
export class InvoiceFormComponent implements OnInit {
 private fb = inject(FormBuilder);

 // Inputs
 invoice = input<Invoice | null>(null);
 invoiceNumber = input<number>(0);
 mode = input<'add' | 'edit'>('add');

 // Outputs
 save = output<InvoiceFormData>();
 cancel = output<void>();

 invoiceForm!: FormGroup;
 statusOptions: InvoiceStatus[] = ['pending', 'shipped', 'delivered'];

 ngOnInit() {
  this.initForm();

  // If editing, populate form with invoice data
  const existingInvoice = this.invoice();
  if (existingInvoice) {
   this.populateForm(existingInvoice);
  } else {
   // Add one empty item by default for new invoices
   this.addItem();
  }
 }

 initForm() {
  this.invoiceForm = this.fb.group({
   status: ['pending', Validators.required],
   orderDate: [new Date(), Validators.required],
   billFrom: ['', [Validators.required, Validators.minLength(3)]],
   billTo: ['', [Validators.required, Validators.minLength(3)]],
   items: this.fb.array([])
  });

  // Subscribe to item changes to recalculate totals
  this.items.valueChanges.subscribe(() => {
   this.calculateTotals();
  });
 }

 populateForm(invoice: Invoice) {
  this.invoiceForm.patchValue({
   status: invoice.status,
   orderDate: invoice.orderDate || new Date(),
   billFrom: invoice.billFrom,
   billTo: invoice.billTo
  });

  // Clear existing items
  this.items.clear();

  // Add items from invoice or add one default item
  if (invoice.items && invoice.items.length > 0) {
   invoice.items.forEach(item => {
    this.addItem(item);
   });
  } else {
   // Add one item with total cost if no items exist
   this.addItem({
    name: 'Invoice Total',
    unitPrice: invoice.totalCost,
    units: 1,
    totalPrice: invoice.totalCost
   });
  }
 }

 get items(): FormArray {
  return this.invoiceForm.get('items') as FormArray;
 }

 createItemFormGroup(item?: InvoiceItem): FormGroup {
  const group = this.fb.group({
   name: [item?.name || '', Validators.required],
   unitPrice: [item?.unitPrice || 0, [Validators.required, Validators.min(0)]],
   units: [item?.units || 1, [Validators.required, Validators.min(1)]],
   totalPrice: [{ value: item?.totalPrice || 0, disabled: true }]
  });

  // Calculate total price when unit price or units change
  group.get('unitPrice')?.valueChanges.subscribe(() => this.updateItemTotal(group));
  group.get('units')?.valueChanges.subscribe(() => this.updateItemTotal(group));

  return group;
 }

 updateItemTotal(itemGroup: FormGroup) {
  const unitPrice = itemGroup.get('unitPrice')?.value || 0;
  const units = itemGroup.get('units')?.value || 0;
  const total = unitPrice * units;
  itemGroup.get('totalPrice')?.setValue(total, { emitEvent: false });
 }

 addItem(item?: InvoiceItem) {
  this.items.push(this.createItemFormGroup(item));
 }

 removeItem(index: number) {
  if (this.items.length > 1) {
   this.items.removeAt(index);
  }
 }

 calculateTotals() {
  // Totals are calculated in the template
 }

 getSubtotal(): number {
  return this.items.controls.reduce((sum, control) => {
   return sum + (control.get('totalPrice')?.value || 0);
  }, 0);
 }

 getVAT(): number {
  return this.getSubtotal() * 0.0; // 0% VAT for now
 }

 getGrandTotal(): number {
  return this.getSubtotal() + this.getVAT();
 }

 onSubmit() {
  if (this.invoiceForm.valid) {
   const formValue = this.invoiceForm.getRawValue();
   const invoiceData: InvoiceFormData = {
    billFrom: formValue.billFrom,
    billTo: formValue.billTo,
    totalCost: this.getGrandTotal(),
    status: formValue.status,
    orderDate: formValue.orderDate,
    items: formValue.items
   };
   this.save.emit(invoiceData);
  }
 }

 onCancel() {
  this.cancel.emit();
 }
}
