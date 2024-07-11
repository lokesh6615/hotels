import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  error: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService
      .login({ email: this.email, password: this.password })
      .subscribe({
        next: (response) => {
          localStorage.setItem('token', response.token);
          // Determine the dashboard route based on the role
          switch (response.role) {
            case 'user':
              this.router.navigate(['/user-dashboard']);
              break;
            case 'owner':
              this.router.navigate(['/owner-dashboard']);
              break;
            case 'waiter':
              this.router.navigate(['/waiter-dashboard']);
              break;
            default:
              // Handle unexpected role here
              break;
          }
        },
        error: (err) => {
          this.error = 'Invalid login credentials';
        },
      });
  }
}
