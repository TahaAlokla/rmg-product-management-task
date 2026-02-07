import { Injectable, signal, computed } from '@angular/core';
import type { Invoice } from '../models/invoice';
import { MOCK_INVOICES } from '../data/invoice-mock-data';

@Injectable({
 providedIn: 'root'
})
export class InvoiceService {
 // Use signal for reactive state management
 private invoicesSignal = signal<Invoice[]>(MOCK_INVOICES);

 // Public computed signal for read-only access
 invoices = computed(() => this.invoicesSignal());

 /**
  * Get all invoices
  */
 getInvoices(): Invoice[] {
  return this.invoicesSignal();
 }

 /**
  * Get invoice by ID
  */
 getInvoiceById(id: number): Invoice | undefined {
  return this.invoicesSignal().find(inv => inv.id === id);
 }

 /**
  * Add new invoice
  */
 addInvoice(invoice: Omit<Invoice, 'id'>): Invoice {
  const newId = Math.max(...this.invoicesSignal().map(inv => inv.id), 0) + 1;
  const newInvoice: Invoice = {
   ...invoice,
   id: newId
  };

  this.invoicesSignal.update(invoices => [...invoices, newInvoice]);
  return newInvoice;
 }

 /**
  * Update existing invoice
  */
 updateInvoice(id: number, updates: Partial<Invoice>): boolean {
  const index = this.invoicesSignal().findIndex(inv => inv.id === id);
  if (index === -1) {
   return false;
  }

  this.invoicesSignal.update(invoices => {
   const updated = [...invoices];
   updated[index] = { ...updated[index], ...updates };
   return updated;
  });

  return true;
 }

 /**
  * Delete invoice
  */
 deleteInvoice(id: number): boolean {
  const initialLength = this.invoicesSignal().length;
  this.invoicesSignal.update(invoices =>
   invoices.filter(inv => inv.id !== id)
  );
  return this.invoicesSignal().length < initialLength;
 }

 /**
  * Remove invoice (alias for deleteInvoice)
  */
 remove(id: number): boolean {
  return this.deleteInvoice(id);
 }
}
