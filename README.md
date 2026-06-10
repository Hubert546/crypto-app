# Crypto App

A full-stack web application for encrypting and decrypting messages, built with Angular and Spring Boot.

## Tech Stack

**Frontend**
- Angular 19 (TypeScript)
- SCSS with dark/light mode support

**Backend**
- Java 17 + Spring Boot 3.5
- Spring Security + JWT authentication
- AES-256 encryption
- H2 in-memory database
- Hibernate / JPA

## Features

- User registration and login with JWT authentication
- AES-256 message encryption and decryption
- Encrypted messages saved to database
- Access control — users can only view their own messages
- Input validation and error handling
- Protection against SQL injection (parameterized queries via JPA)
- Dark / light mode toggle
- Responsive design

## Project Structure

crypto-app/
├── backend/          # Spring Boot REST API
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

Register a new account, log in, and start encrypting messages.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login, returns JWT token |
| POST | `/api/messages/encrypt` | Encrypt and save message |
| GET | `/api/messages/decrypt/{id}` | Decrypt message by ID |
| GET | `/api/messages` | Get all user messages |

## Author

Hubert Mikłuszka
