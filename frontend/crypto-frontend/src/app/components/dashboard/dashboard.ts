import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CryptoService } from '../../services/crypto';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard implements OnInit {

  inputText = '';
  messages: any[] = [];
  decryptedTexts: { [key: number]: string } = {};
  errorMessage = '';
  successMessage = '';

  constructor(
    private cryptoService: CryptoService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Redirect to login if not logged in
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }
    this.loadMessages();
  }

  encrypt(): void {
    if (!this.inputText.trim()) {
      this.errorMessage = 'Please enter a message to encrypt';
      return;
    }

    this.cryptoService.encrypt(this.inputText).subscribe({
      next: (response) => {
        this.successMessage = 'Message encrypted successfully!';
        this.errorMessage = '';
        this.inputText = '';
        this.loadMessages();
      },
      error: () => {
        this.errorMessage = 'Encryption failed. Please try again.';
      }
    });
  }

  decrypt(id: number): void {
    this.cryptoService.decrypt(id).subscribe({
      next: (response) => {
        this.decryptedTexts[id] = response;
        this.errorMessage = '';
      },
      error: () => {
        this.errorMessage = 'Decryption failed.';
      }
    });
  }

  loadMessages(): void {
    this.cryptoService.getMessages().subscribe({
      next: (messages) => {
        this.messages = messages;
      },
      error: () => {
        this.errorMessage = 'Failed to load messages.';
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}