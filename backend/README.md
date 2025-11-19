# TODO App Backend

Simple Express + MongoDB backend for the TODO application.

## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- ES modules

## Setup

1. Install dependencies:

```bash
cd backend
npm install
```

2. Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

Update `MONGO_URI` if needed (local MongoDB or Atlas connection string).

3. Run in development mode:

```bash
npm run dev
```

4. Or run in production mode:

```bash
npm start
```

The API will be available at `http://localhost:4000` by default.

## API Endpoints

- `GET /api/todos` – Get all TODO items
- `POST /api/todos` – Create a new TODO
- `PUT /api/todos/:id` – Update a TODO (title/description)
- `PATCH /api/todos/:id/done` – Toggle done status
- `DELETE /api/todos/:id` – Delete a TODO

## Assumptions & Limitations

- No authentication (single user).
- Basic validation (title is required).
- Error responses are simple JSON messages.
