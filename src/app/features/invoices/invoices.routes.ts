import { Routes } from "@angular/router";
import { InvoicesList } from "./pages/invoices-list/invoices-list";
import { AddInvoice } from "./pages/add-invoice/add-invoice";
import { EditInvoice } from "./pages/edit-invoice/edit-invoice";
import { ViewInvoice } from "./pages/view-invoice/view-invoice";
import { InvoicesPage } from "./pages/invoices-page/invoices-page";

export const INVOICES_ROUTES: Routes = [
 {
  path: '',
  component: InvoicesPage,
  children: [
   {
    path: '',
    component: InvoicesList,
   },
   {
    path: 'add',
    component: AddInvoice,
   },
   {
    path: 'edit/:id',
    component: EditInvoice,
   },
   {
    path: 'view/:id',
    component: ViewInvoice,
   }
  ]
 }
];