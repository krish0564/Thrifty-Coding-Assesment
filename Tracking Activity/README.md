# 📊 User Activity Tracker API

A lightweight Node.js + Express + MongoDB backend service that tracks user activity in an application.

## 🚀 Features

- Log user actions (e.g., login, click, upload)
- Store timestamps automatically
- View latest 10 activities per user
- View action summary (count per action type)

---

## 📦 Tech Stack

- Node.js
- Express
- MongoDB (with Mongoose)
- dotenv (for environment config)
- nodemon (for development)

---

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/krish0564/Thrifty-Coding-Assesment
cd activity-tracker
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create `.env` File

Create a `.env` file in the root directory with your MongoDB Atlas URI:

```env
MONGO_URI= mongodb://localhost:27017`
PORT=5000
```

### 4. Start the Server

- For production:

```bash
node server.js
```

- For development with auto-restart:

```bash
npm run dev
```

---

## 📡 API Endpoints

### ✅ 1. POST `/activity`

Log a new user activity.

**Request Body:**

```json
{
  "userId": "user123",
  "action": "login"
}
```

**Example with `curl`:**

```bash
curl -X POST http://localhost:5000/activity \
  -H "Content-Type: application/json" \
  -d '{"userId":"user123", "action":"click"}'
```

---

### ✅ 2. GET `/activity/:userId`

Get the **last 10 activities** for a specific user.

**Example with `curl`:**

```bash
curl http://localhost:5000/activity/user123
```

---

### ✅ 3. GET `/activity/:userId/summary`

Get **summary** of action types for a user.

**Example with `curl`:**

```bash
curl http://localhost:5000/activity/user123/summary
```

---

## 🧪 Testing with Postman

You can test all endpoints using [Postman](https://www.postman.com/):

1. Create a `POST` request to `http://localhost:5000/activity` with a JSON body.
2. Use `GET` requests to fetch activities or summaries.

---

## 📁 Project Structure

```
activity-tracker/
├── models/
│   └── Activity.js
├── routes/
│   └── activityRoutes.js
├── database/
│   └── connectMongoDB.js
├── .env
├── server.js
├── package.json
└── README.md
```

---

## 📜 License

MIT License. Feel free to fork and customize.

---

## 👨‍💻 Author

Created by [Your Name] — Feel free to connect!
