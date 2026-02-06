import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';

import { SidebarComponent, NavItem } from '../../shared/components/sidebar/sidebar.component';
import { LanguageDirectionService } from '../../core/services/language-direction.service';
;

@Component({
  selector: 'app-dashboard-layout-page',
  standalone: true,
  imports: [
    RouterOutlet,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatButtonModule,
    SidebarComponent,
  ],
  templateUrl: './dashboard-layout-page.html',
  styleUrl: './dashboard-layout-page.css',
})
export class DashboardLayoutPage {
  private _languageDirection = inject(LanguageDirectionService);
  readonly dir = this._languageDirection.dir;

  navItems: NavItem[] = [
    { label: 'common.dashboard.title', icon: 'dashboard', route: '/dashboard' },
    { label: 'common.dashboard.products', icon: 'inventory_2', route: '/products' },
    {
      label: 'common.dashboard.invoices', icon: 'receipt_long', route: '/invoices', children: [
        { label: 'common.dashboard.invoices-list', icon: 'list', route: '/invoices' },
        { label: 'common.dashboard.add-invoice', icon: 'add', route: '/invoices/add' },
      ]
    },

  ];
}
