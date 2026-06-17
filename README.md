# Keeper App

A full-stack Notes Application built using the PERN stack with authentication, Google OAuth login, and user-specific notes.

## Live Demo

Frontend: https://keeper-inky-one.vercel.app

Backend API: https://keeper-zb37.onrender.com

---

## Features

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

## Tech Stack

### Frontend

* React
* React Router DOM
* Axios
* Material UI Icons
* Vite

### Backend

* Node.js
* Express.js
* PostgreSQL
* Passport.js
* Google OAuth 2.0
* Express Session
* bcrypt

### Deployment

* Frontend: Vercel
* Backend: Render
* Database: Railway PostgreSQL

---

## Project Structure

```bash
project-root/
│
├── client/
│   ├── src/component/pages
│   ├── package.json
│
├── server/
│   ├── server.js
│   ├── db.js
│   ├── package.json
│
├── .gitignore
└── README.md
```

---

## Local Installation

### Clone Repository

```bash
git clone https://github.com/M-Aneesh/Keeper.git
cd Keeper
```

### Frontend Setup

```bash
cd client
npm install
npm run dev
```

Runs on:

```bash
http://localhost:5173
```

### Backend Setup

```bash
cd server
npm install
npm start
```

Runs on:

```bash
http://localhost:5000
```

---

## Environment Variables

### Server (.env)

```env
DB_USER=your_db_user
DB_HOST=your_db_host
DB_NAME=your_db_name
DB_PASSWORD=your_db_password
DB_PORT=5432

SESSION_SECRET=your_secret

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

CLIENT_URL=http://localhost:5173
GOOGLE_CALLBACK_URL=http://localhost:5000/auth/google/callback
```

---

## API Routes

### Authentication

| Method | Route        | Description          |
| ------ | ------------ | -------------------- |
| POST   | /register    | Register User        |
| POST   | /login       | Login User           |
| POST   | /logout      | Logout User          |
| GET    | /auth/google | Google Login         |
| GET    | /check-auth  | Check Authentication |

### Notes

| Method | Route      | Description    |
| ------ | ---------- | -------------- |
| GET    | /notes     | Get User Notes |
| POST   | /notes     | Create Note    |
| PUT    | /notes/:id | Edit Note      |
| DELETE | /notes/:id | Delete Note    |

---

## Deployment

Frontend deployed on Vercel

Backend deployed on Render

Database hosted on Railway PostgreSQL

---

## Author

Made by Aneesh M
