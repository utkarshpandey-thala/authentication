# Authorization and Authentication with JWT

## Overview
This project demonstrates a secure implementation of **Authorization** and **Authentication** using **JSON Web Tokens (JWT)**. It provides a backend API for user login, registration, and token-based session handling, ensuring secure access to protected resources.

---

## Features

- **User Registration**: Securely create user accounts with encrypted passwords.
- **Login System**: Authenticate users and generate a JWT token upon successful login.
- **Token Verification**: Middleware for verifying JWT tokens to protect API routes.
- **Role-based Access Control**: Allow specific actions based on user roles.
- **Logout Functionality**: Invalidate tokens upon user logout.
- **Error Handling**: Comprehensive error messages for authentication failures.

---

## Technologies Used

- **Backend**: [Node.js](https://nodejs.org/), [Express.js](https://expressjs.com/)
- **Authentication**: [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken), [bcrypt.js](https://www.npmjs.com/package/bcryptjs)
- **Database**: [MongoDB](https://www.mongodb.com/) (or any other database)
- **Environment Management**: [dotenv](https://www.npmjs.com/package/dotenv)

---

## Setup and Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/your-repository-name.git
   ```
2. Navigate to the project directory:
   ```bash
   cd your-repository-name
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up the environment variables:  
   Create a `.env` file in the root directory and define:
   ```plaintext
   PORT=5000
   DATABASE_URL=your_database_url
   JWT_SECRET=your_secret_key
   ```
5. Start the server:
   ```bash
   npm start
   ```

---

## Usage

- **Register a User**: Send a `POST` request to `/api/register` with user details.
- **Login**: Send a `POST` request to `/api/login` with credentials to receive a JWT token.
- **Access Protected Routes**: Include the token in the `Authorization` header as `Bearer <token>` to access secured endpoints.
- **Logout**: Clear the token on the client side or implement token invalidation if required.

---

## Endpoints

| Method | Endpoint         | Description              | Protected |
|--------|------------------|--------------------------|-----------|
| POST   | /api/register    | Register a new user      | No        |
| POST   | /api/login       | Authenticate and get JWT | No        |
| GET    | /api/protected   | Access protected data    | Yes       |




