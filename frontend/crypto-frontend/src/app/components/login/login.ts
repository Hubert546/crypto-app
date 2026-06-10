import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {

  username = '';
  password = '';
  errorMessage = '';
  successMessage = '';
  isRegisterMode = false;
  isDark = false;

  constructor(private authService: AuthService, private router: Router) {}

  toggleTheme(): void {
    this.isDark = !this.isDark;
    document.documentElement.setAttribute(
      'data-theme',
      this.isDark ? 'dark' : 'light'
    );
  }

  toggleMode(): void {
    this.isRegisterMode = !this.isRegisterMode;
    this.errorMessage = '';
    this.successMessage = '';
  }

  onSubmit(): void {
    if (this.isRegisterMode) {
      this.register();
    } else {
      this.login();
    }
  }

  private login(): void {
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        this.authService.saveToken(response.token);
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        this.errorMessage = 'Invalid username or password';
      }
    });
  }

  private register(): void {
    this.authService.register(this.username, this.password).subscribe({
      next: () => {
        // Stay in register mode to show success message
        this.errorMessage = '';
        this.successMessage = 'Account created! You can now sign in.';
        this.username = '';
        this.password = '';
      },
      error: (err) => {
        this.errorMessage = typeof err.error === 'string'
          ? err.error
          : 'Registration failed';
      }
    });
  }
}