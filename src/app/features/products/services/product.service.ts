import { Injectable, WritableSignal, signal } from '@angular/core';
import type { Product } from '../models/product';
import * as mockData from '../../../../../mock-data.json';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private _products: WritableSignal<Product[]> = signal<Product[]>([]);
  readonly products = this._products.asReadonly();

  constructor() {
    this._products.set((mockData as unknown as { products: Product[] }).products ?? []);
  }

  add(product: Omit<Product, 'id'>): Product {
    const nextId = (this._products().reduce((max, p) => Math.max(max, p.id), 0) || 0) + 1;
    const created: Product = { id: nextId, ...product };
    this._products.update((list) => {
      return [...list, created];
    });
    return created;
  }

  update(id: number, changes: Partial<Omit<Product, 'id'>>): Product | null {
    let updated: Product | null = null;
    this._products.update((list) => {
      return list.map((p) => {
        if (p.id === id) {
          updated = { ...p, ...changes };
          return updated!;
        }
        return p;
      });
    });
    return updated;
  }

  remove(id: number): void {
    this._products.update((list) => {
      return list.filter((p) => p.id !== id);
    });
  }
}
