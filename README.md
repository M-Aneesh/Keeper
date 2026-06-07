# Keeper App

A full-stack Notes Application built using the MERN stack with authentication, Google OAuth login, and user-specific notes.

---

# Features

* User Registration & Login
* Google OAuth Authentication
* Session-based Authentication using Passport.js
* Create Notes
* Edit Notes
* Delete Notes
* User-specific Notes Storage
* Protected Routes
* Responsive UI
* REST API Integration

---

# Tech Stack

## Frontend

* React
* React Router DOM
* Axios
* Material UI Icons

## Backend

* Node.js
* Express.js
* PostgreSQL
* Passport.js
* Google OAuth 2.0
* Express Session
* bcrypt

---

# Project Structure

```bash
project-root/
│
├── client/
│   ├── src/component/pages
│   ├── package.json
│
├── server/
│   ├── index.js
│   ├── db.js
│   ├── package.json
│
├── .gitignore
└── README.md
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/M-Aneesh/Keeper.git
```

---

# Frontend Setup

```bash
cd client
npm install
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

# Backend Setup

```bash
cd server
npm install
npm start
```

Backend runs on:

```bash
http://localhost:5000
```

---

# Environment Variables

Create a `.env` file inside the `server` folder.

```env
DB_USER=your_db_user
DB_HOST=localhost
DB_NAME=your_db_name
DB_PASSWORD=your_db_password
DB_PORT=5432

SESSION_SECRET=your_secret

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

---

# Google OAuth Setup

1. Go to Google Cloud Console
2. Create OAuth Credentials
3. Add Authorized JavaScript Origin:

```bash
http://localhost:5173
```

4. Add Redirect URI:

```bash
http://localhost:5000/auth/google/callback
```

---

# API Routes

## Authentication

| Method | Route          | Description          |
| ------ | -------------- | -------------------- |
| POST   | `/register`    | Register User        |
| POST   | `/login`       | Login User           |
| POST   | `/logout`      | Logout User          |
| GET    | `/auth/google` | Google Login         |
| GET    | `/check-auth`  | Check Authentication |

---

## Notes

| Method | Route        | Description    |
| ------ | ------------ | -------------- |
| GET    | `/notes`     | Get User Notes |
| POST   | `/notes`     | Create Note    |
| PUT    | `/notes/:id` | Edit Note      |
| DELETE | `/notes/:id` | Delete Note    |

---

# Author

Made by Aneesh
