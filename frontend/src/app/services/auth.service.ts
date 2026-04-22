import { Injectable, signal, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

export interface GoogleUser {
  name: string;
  email: string;
  picture: string;
}

declare const google: any;
const TOKEN_KEY = 'gid_token';

interface JwtPayload {
  name: string;
  email: string;
  picture: string;
  exp: number;
}

function decodeJwtPayload(token: string): JwtPayload {
  const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
  const bytes = Uint8Array.from(atob(base64), c => c.charCodeAt(0));
  return JSON.parse(new TextDecoder().decode(bytes));
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private router = inject(Router);
  private _token = signal<string | null>(localStorage.getItem(TOKEN_KEY));

  user = computed<GoogleUser | null>(() => {
    const token = this._token();
    if (!token) return null;
    try {
      const p = decodeJwtPayload(token);
      return { name: p.name, email: p.email, picture: p.picture };
    } catch {
      return null;
    }
  });

  isLoggedIn = computed(() => {
    const token = this._token();
    if (!token) return false;
    try {
      const p = decodeJwtPayload(token);
      return p.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  });

  getToken(): string | null {
    return this._token();
  }

  initGoogleButton(element: HTMLElement): void {
    google.accounts.id.initialize({
      client_id: environment.googleClientId,
      callback: ({ credential }: { credential: string }) => this.handleCredential(credential)
    });
    google.accounts.id.renderButton(element, { theme: 'outline', size: 'large' });
  }

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    this._token.set(null);
    google.accounts.id.disableAutoSelect();
    this.router.navigate(['/login']);
  }

  private handleCredential(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
    this._token.set(token);
    this.router.navigate(['/']);
  }
}
