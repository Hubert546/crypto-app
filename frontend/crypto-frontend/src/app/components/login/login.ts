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
  isRegisterMode = false;

  constructor(private authService: AuthService, private router: Router) {}

  // Switch between login and register mode
  toggleMode(): void {
    this.isRegisterMode = !this.isRegisterMode;
    this.errorMessage = '';
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
        this.isRegisterMode = false;
        this.errorMessage = '';
        alert('Registration successful! Please log in.');
      },
      error: (err) => {
        this.errorMessage = err.error?.message ?? err.error ?? 'Registration failed';
      }
    });
  }
}