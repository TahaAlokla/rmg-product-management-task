import { Routes } from "@angular/router";
import { InvoicesList } from "./pages/invoices-list/invoices-list";

export const INVOICES_ROUTES: Routes = [
 {
  path: '',
  component: InvoicesList,
 },
];