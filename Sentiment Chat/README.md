# 💬 Sentiment Chat App

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

## 🆘 Troubleshooting

- Socket not working? Check CORS setup in backend.
- MongoDB not connected? Make sure it’s running on `localhost:27017`.
- Tailwind error? Ensure `@tailwindcss/postcss` is installed and `postcss.config.js` is updated.

---

## 📜 License

MIT
