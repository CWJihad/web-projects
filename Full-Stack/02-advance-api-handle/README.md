# 🛒 Advanced API Handling with React & Express

A beginner-friendly full-stack project demonstrating **production-level API handling patterns** in React — including race condition prevention, loading/error states, and reusable custom hooks.

---

## Overview

This project is a simple **product listing and search app** built with React on the frontend and Express.js on the backend. The goal is to showcase how real-world applications handle API calls — not just the happy path, but also **errors, loading states, and stale responses**.

---

## Features

- 🔍 **Live search** — filter products by name in real time
- ⏳ **Loading state** — shows feedback while data is being fetched
- ❌ **Error handling** — gracefully catches and displays API errors
- 🚫 **Race condition prevention** — cancels outdated requests using `AbortController`
- 🔁 **Reusable custom hook** — `customReactQuery` pattern for clean, reusable data fetching

---

## Tech Stack

| Layer     | Technology            |
|-----------|-----------------------|
| Frontend  | React, Axios          |
| Backend   | Node.js, Express.js   |
| Dev Tools | Vite                  |

---

## Project Structure

```
project-root/
├── client/                  # React frontend
│   └── src/
│       └── App.jsx          # Main component with API logic
│
├── server/                  # Express backend
│   └── index.js             # API routes and server setup
│
└── README.md
```

## Getting Started

```

> ⚠️ Make sure your frontend is configured to proxy API requests to `http://localhost:3000`. In Vite, add this to `vite.config.js`:
>
> ```js
> server: {
>   proxy: {
>     '/api': 'http://localhost:3000'
>   }
> }
> ```

---

## How It Works

### Search Flow

1. User types in the search box
2. React's `useEffect` fires on every `search` state change
3. A GET request is sent to `/api/products?search=<query>`
4. The backend filters and returns matching products
5. UI updates with results, a loading spinner, or an error message

### Request Cancellation Flow

Every time the user types a new character:

1. The **previous request is aborted** via `controller.abort()`
2. A **new `AbortController`** is created for the fresh request
3. Only the **latest response** updates the UI

This prevents a slow old request from overwriting a faster new one — a bug known as a **race condition**.

---

## Key Concepts Explained

### 🔄 AbortController — Preventing Race Conditions

```js
const controller = new AbortController();

const res = await axios.get("/api/products?search=" + search, {
  signal: controller.signal  // attach to the request
});

// Cleanup: cancel the request if the component re-renders or unmounts
return () => { controller.abort(); };
```

> **Why this matters:** Without cancellation, if you type "table" fast, you might get the result for "t" arriving *after* "table" — showing wrong data.

---

### ⚙️ Custom Hook — `customReactQuery`

```js
function customReactQuery(urlPath) {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  // ... fetch logic
  return [data, error, loading];
}

// Usage — clean and reusable
const [products, error, loading] = customReactQuery('/api/products');
```

> This pattern is the foundation of libraries like **React Query** and **SWR**. Building it yourself helps you understand what those tools do under the hood.

---

### 🧠 Conditional Rendering States

```jsx
{loading
  ? <h1>Loading...</h1>
  : error
    ? <h2>Something went wrong!</h2>
    : <h2>Products found: {products.length}</h2>
}
```

Three states are always handled: **loading**, **error**, and **success**.

---

## API Reference

### `GET /api/products`

Returns all products.

**Response:**
```json
[
  { "id": 1, "name": "table wooden", "price": 200, "image": "..." },
  ...
]
```

---

### `GET /api/products?search=<query>`

Returns products whose names include the search query.

**Example:**
```
GET /api/products?search=table
```

**Response:**
```json
[
  { "id": 1, "name": "table wooden", "price": 200, "image": "..." },
  { "id": 2, "name": "table glass",  "price": 250, "image": "..." }
]
```

> 💡 Note: The backend adds a **3-second delay** when no search query is provided — useful for testing loading states.

---

## What You'll Learn

By studying this project, you'll understand:

- ✅ How to fetch data from an API in React using `useEffect`
- ✅ How to manage `loading`, `error`, and `data` states properly
- ✅ What a **race condition** is and how to fix it with `AbortController`
- ✅ How to build a **custom data-fetching hook** from scratch
- ✅ How to build a basic **REST API** with Express.js
- ✅ How to implement **server-side search filtering**

---
