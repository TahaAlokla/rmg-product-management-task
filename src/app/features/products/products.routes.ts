import { Routes } from "@angular/router";

import { ProductsList } from "./pages/products-list/products-list";

export const PRODUCTS_ROUTES: Routes = [
 {
  path: '',
  component: ProductsList,
 },
];