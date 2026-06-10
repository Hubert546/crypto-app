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
  isDark = false;
  messages: any[] = [];
  decryptedTexts: { [key: number]: string } = {};
  errorMessage = '';
  successMessage = '';
  decryptInput = '';
  decryptResult = '';
  decryptErrorMessage = '';
  copyMessage = '';

  constructor(
    private cryptoService: CryptoService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }
    this.loadMessages();
  }

  toggleTheme(): void {
    this.isDark = !this.isDark;
    document.documentElement.setAttribute(
      'data-theme',
      this.isDark ? 'dark' : 'light'
    );
  }

  encrypt(): void {
    if (!this.inputText.trim()) {
      this.errorMessage = 'Please enter a message to encrypt';
      return;
    }
    this.cryptoService.encrypt(this.inputText).subscribe({
      next: () => {
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

  decryptManual(): void {
    if (!this.decryptInput.trim()) {
      this.decryptErrorMessage = 'Please enter encrypted text to decrypt';
      return;
    }
    this.cryptoService.decryptText(this.decryptInput).subscribe({
      next: (response) => {
        this.decryptResult = response;
        this.decryptErrorMessage = '';
      },
      error: () => {
        this.decryptErrorMessage = 'Decryption failed. Invalid encrypted text.';
        this.decryptResult = '';
      }
    });
  }

  copyToClipboard(text: string): void {
    navigator.clipboard.writeText(text).then(() => {
      this.copyMessage = 'Copied to clipboard!';
      setTimeout(() => this.copyMessage = '', 2000);
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