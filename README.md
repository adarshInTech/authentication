# Authentication System (Full-Stack)

This is a simple authentication system using **Node.js, Express, MongoDB, and JWT** for the backend and **HTML, CSS, JavaScript (Vanilla JS)** for the frontend. It includes **user registration, login, and logout functionality** with JWT authentication.

## Features
- **User Signup** with hashed passwords using `bcrypt`
- **User Login** with JWT token generation
- **Token-based authentication** using `localStorage`
- **Logout functionality**
- **Frontend UI** with dynamic form switching

## Tech Stack
### Backend:
- Node.js
- Express
- MongoDB with Mongoose
- bcrypt (for password hashing)
- JWT (JSON Web Tokens for authentication)
- dotenv (to manage environment variables)

### Frontend:
- HTML
- CSS
- Vanilla JavaScript (fetch API for requests)

## Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/your-repo/auth-system.git
cd auth-system
```

### 2. Install Backend Dependencies
```bash
cd server
npm install
```

### 3. Set Up Environment Variables
Create a `.env` file in the **server** directory and add:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_KEY=your_secret_key
PORT=5000
```

### 4. Run the Backend Server
```bash
npm start
```
The server will start on `http://localhost:5000`.

### 5. Set Up the Frontend
Navigate to the `frontend` folder and open `index.html` in a browser.

## API Endpoints
### **1. Signup**
- **Endpoint:** `POST /signup`
- **Request Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securepassword"
  }
  ```
- **Response:**
  ```json
  { "message": "User created successfully" }
  ```

### **2. Login**
- **Endpoint:** `POST /login`
- **Request Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "securepassword"
  }
  ```
- **Response:**
  ```json
  { "token": "your_jwt_token" }
  ```

### **3. Logout**
- **Handled on frontend** by removing the token from `localStorage`.

## How It Works
1. The user signs up, and their password is **hashed** before being stored in MongoDB.
2. When logging in, the password is **verified** using `bcrypt.compare()`.
3. A **JWT token** is generated and sent to the frontend.
4. The frontend stores the token in **localStorage** to maintain authentication.
5. The UI updates based on authentication state.
6. Logging out removes the token from localStorage.

## Future Enhancements
- Protected Routes
- Profile Page
- Password Reset
- Database Validation & Error Handling

## Author
[Your Name] - Full-Stack Developer

---
**Happy Coding! 🚀**

