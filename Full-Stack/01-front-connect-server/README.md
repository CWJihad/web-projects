# 🔗 React Frontend & Backend Connection

This project demonstrates how to connect a React frontend application with a backend server and fetch API data to display dynamically in the UI.

During this project, I learned:
- How frontend and backend communicate
- API calling from React
- Handling CORS errors
- Solving CORS using:
  - Backend whitelist configuration
  - Proxy setup

---

# 📚 What I Learned

## ✅ Connecting React with Backend
Learned how to:
- Connect React app with backend server
- Send API requests
- Receive backend data
- Render dynamic data into the UI

---

## ✅ API Calling
Implemented:
- Fetch API / Axios requests
- Async data fetching
- JSON data handling
- Loading backend data into React components

---

## ❌ Problem Faced — CORS Error

While connecting frontend with backend, I faced a common issue:

```txt
CORS Error
```

This happens because browsers block requests from different origins for security reasons.

Example:
- Frontend → `localhost:5173`
- Backend → `localhost:3000`

Since both origins are different, the browser blocks the request.

---

# ✅ Solutions I Learned

## 1️⃣ Backend Whitelist Method

Configured the backend to allow requests from the frontend origin.

Example:

```js
app.use(cors({
  origin: "http://localhost:5173"
}))
```

### Learned:
- What CORS is
- Why browsers block requests
- How to allow trusted frontend origins

---

## 2️⃣ Proxy Method

Used a proxy configuration in React/Vite to avoid CORS during development.

Example:

```js
server: {
  proxy: {
    '/api': 'http://localhost:3000'
  }
}
```

### Learned:
- Proxy setup
- API request forwarding
- Cleaner frontend API calls

---

# 🛠️ Technologies Used

- React.js
- JavaScript
- Node.js
- Express.js
- REST API
- Vite
- CORS Middleware

---

# 🚀 Features

- Fetch backend data
- Display API data in UI
- Handle CORS issues
- Frontend & backend integration

---

# 🎯 Project Goal

The main goal of this project was to understand:
- Real-world frontend/backend communication
- API integration
- Common developer issues like CORS
- Practical debugging techniques

---

# 📌 Key Takeaways

After completing this project, I now understand:
- How React communicates with backend servers
- How APIs work
- How to solve CORS issues professionally
- How proxy systems work in development

---

# ⭐ Final Note

This project is part of my React and backend learning journey.  
It helped me understand one of the most common beginner problems in full-stack development — **CORS** — and how to solve it properly.

🚀