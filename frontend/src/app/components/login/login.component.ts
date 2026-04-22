import { Component, OnInit, ViewChild, ElementRef, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  template: `
    <div class="login-page">
      <div class="login-card">
        <h1>CitiLists</h1>
        <p>Sign in to explore cities around the world</p>
        <div #googleBtn></div>
      </div>
    </div>
  `,
  styles: [`
    .login-page {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
    }
    .login-card {
      background: #fff;
      padding: 2.5rem 3rem;
      border-radius: 8px;
      box-shadow: 0 2px 12px rgba(0,0,0,0.1);
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
    }
    h1 { font-size: 2rem; color: #1a1a2e; }
    p { color: #666; margin-bottom: 0.5rem; }
  `]
})
export class LoginComponent implements OnInit {
  @ViewChild('googleBtn', { static: true }) googleBtn!: ElementRef<HTMLDivElement>;
  private auth = inject(AuthService);

  ngOnInit(): void {
    this.auth.initGoogleButton(this.googleBtn.nativeElement);
  }
}
