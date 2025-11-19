# TODO App Frontend

React frontend for the TODO application.

## Tech Stack

- React 18
- Vite
- Fetch API

## Getting Started

1. Install dependencies:

```bash
cd frontend
npm install
```

2. Start the development server:

```bash
npm run dev
```

By default Vite runs on `http://localhost:5173` and proxies `/api` calls to `http://localhost:4000` (the backend).

Make sure the backend is running on port `5000` or update the proxy in `vite.config.js`.

## Features

- View all TODOs
- Create TODO with title and optional description
- Edit TODO title and description
- Toggle DONE/UNDONE
- Delete TODO
- Basic form validation
- Optimistic UI updates for create, update, toggle, delete
- Simple responsive layout

## Assumptions & Limitations

- No authentication / multi-user handling.
- Minimal styling using plain CSS.
- Error handling is basic but user-friendly.
