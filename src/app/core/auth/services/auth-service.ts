import { Injectable, signal, WritableSignal } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import * as mockData from '../../../../../mock-data.json';

export interface User {
  id: number;
  username: string;
  email: string;
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser: WritableSignal<User | null> = signal(null);

  constructor() {
    this.tryRestoreSession();
  }

  private tryRestoreSession(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const user = mockData.users.find(u => u.token === token);
      if (user) {
        const { password, ...userWithoutPassword } = user;
        this.currentUser.set(userWithoutPassword);
      }
    }
  }

  login(email: string, password: string): Observable<User> {
    const user = mockData.users.find(u => u.email === email && u.password === password);

    if (user) {
      // Return user without password
      const { password, ...userWithoutPassword } = user;
      return of(userWithoutPassword).pipe(
        delay(500), // Simulate network delay
        tap(u => {
          this.currentUser.set(u);
          localStorage.setItem('token', u.token);
        })
      );
    }

    return throwError(() => new Error('Invalid credentials'));
  }

  logout(): void {
    this.currentUser.set(null);
    localStorage.removeItem('token');
  }

  check(): Observable<boolean> {
    return of(!!this.currentUser());
  }
}
