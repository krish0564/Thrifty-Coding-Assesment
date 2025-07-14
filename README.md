# 🚀 Thrifty AI - Coding Assessment

Welcome to the submission for the **Thrifty AI Coding Assessment**. This repository contains completed solutions for the two assigned tasks:

---

## ✅ Task 1: # 💬 Sentiment Chat App

A real-time global chat application with basic sentiment analysis using Socket.IO, Express, MongoDB, and React + Tailwind.

---

## 🚀 Local Development Setup

### 🧰 Prerequisites

- Node.js (v18+ recommended)
- MongoDB running locally (`mongodb://localhost:27017`)
- npm or yarn

---

## 📁 Project Structure

```
Sentiment Chat/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── socket.js
│   └── index.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── ...
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── vite.config.js
```

---

## 🖥️ Backend Setup (Port: `3000`)

1. Go to the backend folder:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the backend server:
   ```bash
   npm run dev
   ```

> Ensure MongoDB is running locally on `mongodb://localhost:27017`.

---

## 💻 Frontend Setup (Port: `5001`)

1. Go to the frontend folder:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the frontend Vite dev server:
   ```bash
   npm run dev
   ```

---

## 🌐 Access the App

Visit:

```
http://localhost:5001
```

---

## ⚙️ Technologies Used

- **Frontend:** React, Tailwind CSS, Vite, Socket.IO Client
- **Backend:** Node.js, Express, MongoDB, Socket.IO Server
- **Real-time:** WebSockets (Socket.IO)
- **Extras:** Sentiment scoring (manual), User session simulation

---

## ✅ Features

- Real-time global messaging
- User join/leave notifications
- Basic sentiment tagging (positive/negative/neutral)
- Typing input with send button + enter support
- Messages sent by you appear on the **right**

---

## 🧪 API Endpoints

- `POST /api/users` → create new user
- `GET /api/users` → get all users
- `POST /api/messages` → save a message
- `PATCH /api/messages/:id` → update sentiment of a message

---

## 📌 Notes

- Frontend proxies API calls to backend via `vite.config.js`.
- Tailwind CSS 4 uses `@tailwindcss/postcss` — make sure it’s installed.

---

## ✅ Task 2: User Activity Tracking API

A backend service to track user actions (like login, click, upload) and generate activity summaries.

### 🔧 Technologies Used

- Node.js
- Express
- MongoDB (with Mongoose)
- dotenv

### 📁 Folder Structure

```
backend/
├── models/
│   └── Activity.js
├── routes/
│   └── activityRoutes.js
├── database/
│   └── connectMongoDB.js
├── server.js
├── .env.example
└── package.json
```

### 🛠 Setup Instructions

```bash
cd backend
npm install
cp .env.example .env
# Update your MongoDB URI in .env
npm run dev
```

### 📡 API Endpoints

#### POST `/activity`

Logs a new user activity.

```json
{
  "userId": "user123",
  "action": "login"
}
```

#### GET `/activity/:userId`

Returns last 10 activities for the user.

#### GET `/activity/:userId/summary`

Returns count of actions:

```json
{
  "click": 5,
  "login": 2,
  "upload": 1
}
```

---

