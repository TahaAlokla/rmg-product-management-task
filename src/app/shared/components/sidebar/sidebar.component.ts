import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { TranslocoModule } from '@jsverse/transloco';

export interface NavItem {
 label: string;
 icon?: string;
 route?: string;
 children?: NavItem[];
}

@Component({
 selector: 'app-sidebar',
 standalone: true,
 imports: [

  MatListModule,
  MatIconModule,
  MatExpansionModule,
  RouterLink,
  RouterLinkActive,
  TranslocoModule
 ],
 templateUrl: './sidebar.component.html',
 styleUrl: './sidebar.component.css',
 // changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent {
 readonly navItems = input.required<NavItem[]>();
}
