# 📝 Full-Stack TODO Application

This is a **full-stack TODO application** built using **React (Vite)** for the frontend and **Node.js + Express + MongoDB** for the backend.  
It allows users to **create, view, edit, delete, and toggle todos**. The project follows a clean folder structure and professional Git commit history.

---

## 📌 Features

✔ Create a new TODO  
✔ View all TODOs  
✔ Edit an existing TODO  
✔ Delete a TODO  
✔ Mark TODO as complete/incomplete  
✔ Optimistic UI updates (fast UX)  
✔ RESTful API integration  
✔ Clean feature-based commit history  

---

## 🧠 Tech Stack

| Layer     | Technology              |
|-----------|--------------------------|
| Frontend  | React + Vite             |
| Backend   | Node.js + Express        |
| Database  | MongoDB + Mongoose       |
| API Calls | Fetch API / Axios        |
| Tools     | Git, VS Code, Postman    |

---

## 📂 Project Structure

│── backend/
│── frontend/
│── README.md
│── .gitignore


---

## ⚙ Setup Instructions

### 🛠 Backend Setup (MongoDB Local)

```bash
cd backend
cp .env.example .env
# Inside .env → set local MongoDB URI:
# MONGODB_URI=mongodb://127.0.0.1:27017/todo_db
npm install
npm run dev
