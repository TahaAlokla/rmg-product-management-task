import { Routes } from '@angular/router';
import { EmptyLayoutPage } from './layouts/empty-layout-page/empty-layout-page';
import { NoAuthGuard } from './core/auth/guards/noAuth.guard';
import { AuthGuard } from './core/auth/guards/auth.guard';
import { D } from '@angular/cdk/keycodes';
import { DashboardLayoutPage } from './layouts/dashboard-layout-page/dashboard-layout-page';

export const routes: Routes = [
 { path: '', pathMatch: 'full', redirectTo: 'dashboard' },

 { path: 'signed-in-redirect', pathMatch: 'full', redirectTo: 'dashboard' },
 {
  path: '',
  canActivate: [NoAuthGuard],
  canActivateChild: [NoAuthGuard],
  component: EmptyLayoutPage,
  children: [
   {
    path: 'sign-in',
    loadChildren: () => import('./features/auth/pages/login/login.routes'),
   },
  ],
 },
 {
  path: '',
  canActivate: [AuthGuard],
  canActivateChild: [AuthGuard],
  component: DashboardLayoutPage,
  children: [
   {
    path: 'dashboard',
    loadChildren: () => import('./features/home/home.routes').then((m) => m.HOME_ROUTES),
   },
  ],
 },
];
