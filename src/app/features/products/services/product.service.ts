import { Injectable, WritableSignal, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import type { Product } from '../models/product';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/products`;

  private _products: WritableSignal<Product[]> = signal<Product[]>([]);
  readonly products = this._products.asReadonly();

  private _loading = signal<boolean>(false);
  readonly isLoading = this._loading.asReadonly();

  getProducts(): Observable<Product[]> {
    this._loading.set(true);
    return this.http.get<Product[]>(this.apiUrl).pipe(
      delay(1000),
      tap((products) => {
        this._products.set(products);
        this._loading.set(false);
      }),
      catchError((err) => {
        this._loading.set(false);
        return throwError(() => err);
      })
    );
  }

  add(product: Omit<Product, 'id'>): void {
    const nextId = (this._products().reduce((max, p) => Math.max(max, p.id), 0) || 0) + 1;
    const created: Product = { id: nextId, ...product };
    this._products.update((list) => [...list, created]);

    // Future: POST to API
    // this.http.post<Product>(this.apiUrl, product).subscribe(created => {
    //   this._products.update(list => [...list, created]);
    // });
  }

  update(id: number, changes: Partial<Omit<Product, 'id'>>): void {
    this._products.update((list) => {
      return list.map((p) => {
        if (p.id === id) {
          return { ...p, ...changes };
        }
        return p;
      });
    });

    // Future: PUT/PATCH to API
  }

  remove(id: number): void {
    this._products.update((list) => {
      return list.filter((p) => p.id !== id);
    });

    // Future: DELETE from API
  }
}
