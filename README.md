# Crypto App

A full-stack web application for encrypting and decrypting messages securely, built with Angular and Spring Boot.

## Tech Stack

**Frontend**
- Angular 19 (TypeScript)
- SCSS with dark/light mode support

**Backend**
- Java 17 + Spring Boot 3.5
- Spring Security + JWT authentication
- AES-256 encryption
- H2 in-memory database
- Spring Data JPA / Hibernate

## Features

- **Authentication & Authorization**: User registration and login with JWT authentication.
- **Cryptography**: Secure AES-256 message encryption and decryption handled on the backend.
- **Access Control**: Users can only view, encrypt, and decrypt their own messages.
- **Security & Protection**:
  - Protection against **SQL Injection** via parameterized queries (Spring Data JPA).
  - Protection against **XSS (Cross-Site Scripting)** utilizing Angular's built-in security contextual escaping.
  - Robust input validation and global error handling on both frontend and backend.
- **Accessibility (A11y)**: Built with semantic HTML and `<label>` elements for all form inputs, ensuring compatibility with screen readers.
- **Responsive Design**: Fully responsive interface for mobile, tablet, and desktop, with Dark / Light mode toggle.

## Project Structure

crypto-app/
├── backend/               # Spring Boot REST API
└── frontend/crypto-frontend/   # Angular application

## Prerequisites

- Java 17+
- Node.js 18+
- npm

## Running the Application

### 1. Start the backend

```bash
cd backend
./mvnw spring-boot:run
```

Backend starts on `http://localhost:8080`

### 2. Start the frontend

```bash
cd frontend/crypto-frontend
npm install
ng serve
```

Frontend starts on `http://localhost:4200`

### 3. Open in browser

Navigate to `http://localhost:4200`

## Test Account

The application uses an H2 in-memory database which resets on every restart.
To test the app, register a new account directly in the UI — registration is open and takes a few seconds.

## API Endpoints

| Method | Endpoint                     | Description                |
|--------|------------------------------|----------------------------|
| POST   | `/api/auth/register`         | Register new user          |
| POST   | `/api/auth/login`            | Login, returns JWT token   |
| POST   | `/api/messages/encrypt`      | Encrypt and save message   |
| POST   | `/api/messages/decrypt-text` | Decrypt any encrypted text |
| GET    | `/api/messages/decrypt/{id}` | Decrypt message by ID      |
| GET    | `/api/messages`              | Get all user messages      |

## Author

Hubert Mikłuszka
