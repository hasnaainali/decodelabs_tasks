# 🚀 Task Manager Pro

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Node](https://img.shields.io/badge/node-18%2B-green)
![React](https://img.shields.io/badge/react-18.2.0-blue)
![Express](https://img.shields.io/badge/express-4.18.2-green)
![JWT](https://img.shields.io/badge/JWT-Auth-orange)
![Tailwind](https://img.shields.io/badge/Tailwind-CSS-06B6D4)
![License](https://img.shields.io/badge/license-MIT-green)

### **A Professional Full-Stack Task Management Application**

**Backend API** | **React Frontend** | **JWT Authentication** | **Responsive Design**

</div>

---

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Installation Guide](#installation-guide)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Screenshots](#screenshots)
- [What I Built](#what-i-built)
- [Skills Demonstrated](#skills-demonstrated)
- [Developer](#developer)
- [License](#license)

---

## 📖 Project Overview

**Task Manager Pro** is a complete full-stack task management application that helps individuals and teams organize, track, and manage their daily tasks efficiently.

### Problem Statement

Managing multiple tasks across different projects becomes chaotic without proper tools. This application solves that by providing:

- ✅ Centralized task management system
- ✅ Priority-based task organization
- ✅ Real-time progress tracking
- ✅ Visual analytics dashboard
- ✅ Secure authentication system

### Solution

A modern, responsive web application with:

- **Frontend**: React 18 with TailwindCSS for beautiful UI
- **Backend**: Node.js/Express RESTful API
- **Security**: JWT token-based authentication
- **UX**: Smooth animations, toast notifications, and modals

---

## ✨ Features

### 🔐 Authentication System

| Feature | Description | Status |
|---------|-------------|--------|
| User Registration | Create new account with validation | ✅ |
| Secure Login | JWT token-based authentication | ✅ |
| Password Encryption | bcrypt hashing for security | ✅ |
| Persistent Session | Token stored in localStorage | ✅ |
| Protected Routes | Auth required for dashboard | ✅ |

### 📝 Task Management (CRUD)

| Feature | Description | Status |
|---------|-------------|--------|
| Create Task | Add title, description, priority, due date | ✅ |
| Read Tasks | View all tasks with filters | ✅ |
| Update Task | Edit any task details | ✅ |
| Delete Task | Remove with confirmation modal | ✅ |
| Task Status | Pending / In Progress / Completed | ✅ |
| Priority Levels | Low 🟢 / Medium 🟡 / High 🔴 | ✅ |
| Due Dates | Set and track deadlines | ✅ |

### 📊 Dashboard & Analytics

| Feature | Description | Status |
|---------|-------------|--------|
| Statistics Cards | Total, Completed, In Progress tasks | ✅ |
| Completion Rate | Percentage of tasks completed | ✅ |
| Priority Chart | Distribution of High/Medium/Low | ✅ |
| Recent Activities | Latest 3 tasks with details | ✅ |
| Visual Indicators | Color-coded priority badges | ✅ |

### 🎨 User Interface

| Feature | Description | Status |
|---------|-------------|--------|
| Responsive Design | Works on all devices | ✅ |
| Mobile Menu | Hamburger sidebar toggle | ✅ |
| Modal Dialogs | Clean forms for tasks | ✅ |
| Toast Notifications | Real-time feedback | ✅ |
| Professional Theme | BizDash Teal/Cyan scheme | ✅ |
| Smooth Animations | Fade, slide, hover effects | ✅ |

---

## 🛠️ Technology Stack

### Frontend

| Technology | Version |
|------------|---------|
| React | 18.2.0 |
| Vite | 5.0.0 |
| TailwindCSS | Latest |
| Font Awesome | 6 |
| Axios | Latest |
| React Hot Toast | Latest |

### Backend

| Technology | Version |
|------------|---------|
| Node.js | 18+ |
| Express.js | 4.18.2 |
| JWT | Latest |
| bcryptjs | Latest |
| Joi | Latest |
| CORS | Latest |
| dotenv | Latest |

### Database

| Type | Status |
|------|--------|
| In-Memory Storage | Current (Temporary) |
| MongoDB / PostgreSQL | Planned |

---

## 📁 Project Structure
task-manager/
│
├── backend-api/ # BACKEND SERVER
│ ├── controllers/ # Business logic layer
│ │ ├── taskController.js # Task operations
│ │ └── userController.js # Auth operations
│ ├── middleware/ # Custom middleware
│ │ ├── auth.js # JWT verification
│ │ ├── errorHandler.js # Error handling
│ │ └── validation.js # Input validation
│ ├── models/ # Data models
│ │ ├── Task.js # Task schema
│ │ └── User.js # User schema
│ ├── routes/ # API endpoints
│ │ ├── tasks.js # /api/tasks routes
│ │ └── users.js # /api/users routes
│ ├── utils/ # Helper functions
│ ├── .env # Environment variables
│ ├── package.json # Dependencies
│ └── server.js # Entry point
│
├── frontend/ # FRONTEND APP
│ ├── public/
│ │ └── index.html # HTML template
│ ├── src/
│ │ ├── components/ # React components
│ │ │ ├── Dashboard.jsx # Main dashboard
│ │ │ ├── Login.jsx # Login page
│ │ │ ├── Register.jsx # Register page
│ │ │ ├── TaskForm.jsx # Task modal
│ │ │ └── TaskList.jsx # Task listing
│ │ ├── services/
│ │ │ └── api.js # API service layer
│ │ ├── App.jsx # Main component
│ │ ├── App.css # Global styles
│ │ ├── index.css # Tailwind imports
│ │ └── main.jsx # Entry point
│ ├── package.json # Dependencies
│ ├── tailwind.config.js # Tailwind config
│ └── vite.config.js # Vite config
│
├── screenshots/ # APPLICATION SCREENSHOTS
│ ├── login.png # Login page
│ ├── register.png # Register page
│ ├── Dashboard.png # Main dashboard
│ ├── All Tasks.png # All tasks view
│ ├── InProgress.png # In-progress tasks
│ ├── Pending.png # Pending tasks
│ ├── Completed.png # Completed tasks
│ └── Task creation.png # Create task modal
│
├── .gitignore # Git ignore file
└── README.md # Documentation


---

##  Installation Guide

### Prerequisites

```bash
Node.js (v18 or higher)
npm (v9 or higher)
Git (optional)
Step 1: Clone or Download
bash
# Clone the repository
git clone https://github.com/yourusername/task-manager-pro.git
cd task-manager-pro

# OR download and extract the ZIP file
Step 2: Backend Setup
bash
# Navigate to backend folder
cd backend-api

# Install dependencies
npm install

# Create .env file
echo "PORT=5000" > .env
echo "JWT_SECRET=mysecretkey12345" >> .env
echo "JWT_EXPIRE=30d" >> .env

# Start backend server
npm run dev
Expected Output:

text
🚀 Server running on http://localhost:5000
Step 3: Frontend Setup
bash
# Open a new terminal, navigate to frontend folder
cd frontend

# Install dependencies
npm install

# Start frontend server
npm run dev
Expected Output:

text
VITE v5.0.0 ready in 500ms
➜ Local: http://localhost:5173/
Step 4: Access Application
Open your browser and navigate to:

text
http://localhost:5173
 Running the Application
Two Terminals Required:
Terminal	Location	Command	Purpose
Terminal 1	backend-api/	npm run dev	Backend API Server
Terminal 2	frontend/	npm run dev	Frontend Dev Server
Quick Test Commands:
bash
# Test backend health
curl http://localhost:5000/

# Test register endpoint
curl -X POST http://localhost:5000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","password":"123456"}'

# Test login endpoint
curl -X POST http://localhost:5000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"123456"}'
📡 API Documentation
Authentication Endpoints
Register User
http
POST /api/users/register
Parameter	Type	Required	Description
name	string	Yes	User's full name
email	string	Yes	Valid email address
password	string	Yes	Min 6 characters
Response:

json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
Login User
http
POST /api/users/login
Parameter	Type	Required	Description
email	string	Yes	Registered email
password	string	Yes	Account password
Response:

json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
Task Management Endpoints
Note: All task endpoints require Authentication Token in Header

text
Authorization: Bearer <your_jwt_token>
Get All Tasks
http
GET /api/tasks
Response:

json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "id": 1,
      "title": "Complete Project",
      "description": "Finish the backend API",
      "status": "in-progress",
      "priority": "high",
      "dueDate": "2024-12-31",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
Create Task
http
POST /api/tasks
Parameter	Type	Required	Options
title	string	Yes	Any text
description	string	No	Any text
status	string	No	pending / in-progress / completed
priority	string	No	low / medium / high
dueDate	date	No	YYYY-MM-DD
Update Task
http
PUT /api/tasks/:id
Same body parameters as Create Task

Delete Task
http
DELETE /api/tasks/:id
Response: Empty object with success status

📸 Screenshots
🔐 Authentication Pages
Login Page	Register Page
https://screenshots/login.png	https://screenshots/register.png
📊 Dashboard & Analytics
Dashboard View
https://screenshots/Dashboard.png
Real-time statistics, priority distribution chart, and recent tasks

📝 Task Management
All Tasks	In Progress	Pending	Completed
https://screenshots/All%2520Tasks.png	https://screenshots/InProgress.png	https://screenshots/Pending.png	https://screenshots/Completed.png
➕ Create Task Modal
https://screenshots/Task%2520creation.png

Clean modal form with validation

🎯 What I Built
Complete Full-Stack Application Including:
Component	Details	Status
Backend API	RESTful API with 8 endpoints
Authentication	JWT + bcrypt security	
Database Layer	In-memory storage (upgradable)	
Frontend UI	5 React components	
State Management	React Hooks	
Styling	TailwindCSS + Custom	
API Integration	Axios HTTP client	
Error Handling	Professional error boundaries	
Form Validation	Joi + client-side	
Responsive Design	Mobile-first approach	
Pages/Components Created:
Page	Features
Login	Form validation, JWT storage, toast notifications
Register	Name/Email/Password, success redirect
Dashboard	Stats cards, priority chart, recent tasks
All Tasks	Full task listing with edit/delete
Task Modal	Create/Edit form with status & priority
💡 Skills Demonstrated
Backend Skills
 REST API design and implementation

 JWT authentication and authorization

 Password hashing with bcrypt
 Input validation with Joi

 Express.js middleware development

 Error handling and logging

 Environment variables management

Frontend Skills
 React component architecture

 State management with Hooks

 API integration with Axios

 Responsive design with TailwindCSS

 Conditional rendering

 Form handling and validation

 Modal dialogs and toast notifications

Soft Skills
 Problem-solving and debugging

 Clean code practices

 Git version control

 Documentation writing

 UI/UX considerations

 Mobile-first thinking

👨‍💻 Developer
<div align="center">
Hasnain Ali

https://img.shields.io/badge/Email-hasnain278ali%2540gmail.com-blue
https://img.shields.io/badge/GitHub-@hasnainali-black
https://img.shields.io/badge/LinkedIn-Hasnain%2520Ali-blue

</div>
 License
This project is licensed under the MIT License - see the LICENSE file for details.

 Acknowledgments
React Documentation

Express.js Guide

Tailwind CSS

Font Awesome Icons

JWT.io

bcryptjs

📞 Contact & Support
For any queries, issues, or suggestions:

Email: hasnaainali5@gmail.com

GitHub Issues: Create an issue

<div align="center">
⭐ If you found this project helpful, please give it a star on GitHub! ⭐
Built with ❤️ by Hasnain Ali

© 2026 Task Manager Pro | All Rights Reserved

⬆ Back to Top

</div> ```