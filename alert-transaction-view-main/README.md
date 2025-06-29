# 🛠️ MERN Auth Project – Finalist Board

This is a full-stack application built with **React** (frontend) and **Node.js + Express + MongoDB** (backend). It supports user **registration**, **login**, and accessing **protected profile data** using **JWT authentication**.

---

## 📁 Folder Structure

```
project-root/
│
├── backend/            # Backend with Node, Express, MongoDB
│   ├── server.js
│   ├── routes/
│   │   └── auth.js
│   ├── .env
│   └── package.json
│
└── frontend/           # Frontend built in React
    ├── src/
    ├── public/
    ├── app.jsx
    └── package.json
```

---

## 🔧 Tech Stack

### 🔹 Backend
- Node.js
- Express.js
- MongoDB (MongoClient)
- JWT (jsonwebtoken)
- bcrypt
- dotenv

### 🔹 Frontend
- React.js
- Axios
- React Router DOM

---

## 🔐 Backend Features

- ✅ User Registration
- ✅ Login with hashed passwords
- ✅ JWT token generation
- ✅ Protected route access using token

---

## ⚙️ How to Run Locally

### 1️⃣ Clone the Repo

```bash
git clone <your_repo_url>
cd project-root
```

---

### 2️⃣ Setup Backend

```bash
cd backend
npm install
```

Create `.env` file in the `backend` folder:

```
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
```

Run backend server:

```bash
node server.js
```

---

### 3️⃣ Setup Frontend

```bash
cd ../frontend
npm install
npm run dev
```

---

## 📫 API Endpoints (Backend)

### ➤ `POST /register`
Registers a new user.  
**Body:**
```json
{
  "username": "yourUsername",
  "password": "yourPassword"
}
```

---

### ➤ `POST /login`
Logs in and returns a JWT token.  
**Body:**
```json
{
  "username": "yourUsername",
  "password": "yourPassword"
}
```
**Response:**
```json
{
  "token": "jwt_token_here"
}
```

---

### ➤ `GET /profile` (Protected)
Returns user profile info if token is valid.  
**Headers:**
```
Authorization: Bearer <your_jwt_token>
```

---

## 🏁 Result

This app is designed to serve as a secure authentication system. You can extend it by adding features like:
- User roles
- Admin dashboard
- Email verification
- Password reset

---

## 🎖️ Finalist Interview Board Version

This version includes frontend and backend integration tailored for an interview platform or board interface with authentication.

---

i have also hosted this 
sir i have solid understanding of mern stack please consider mine for interview 