# ✅ TaskFlow Dashboard | Task Management System

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Node.js](https://img.shields.io/badge/Node.js-43853D?logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?logo=mongodb&logoColor=white)
![EJS](https://img.shields.io/badge/EJS-8E44AD?logo=ejs&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 📌 Overview

**TaskFlow Dashboard** is a full-stack task management web application built with **Node.js**, **Express.js**, **MongoDB**, and **EJS** templating engine. It provides complete CRUD operations for tasks with a clean, responsive dashboard interface.

**Project:** Full Stack Task Management System  


---

## ✨ Features

| Feature | Description |
|---------|-------------|
| ✅ **Create Tasks** | Add new tasks with title, description, priority, due date |
| 📋 **Read Tasks** | View all tasks in a organized dashboard |
| ✏️ **Update Tasks** | Edit task details and status |
| 🗑️ **Delete Tasks** | Remove tasks with confirmation |
| 🎯 **Priority Levels** | Low, Medium, High priority tagging |
| 📊 **Status Tracking** | Pending, In-Progress, Completed |
| 🔍 **Search & Filter** | Filter tasks by status and priority |
| 📱 **Responsive Design** | Works on all screen sizes |
| 💾 **MongoDB Database** | Persistent data storage |

---

## 🛠️ Technology Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | 18.x | JavaScript runtime |
| Express.js | 4.x | Web framework |
| MongoDB | 6.x | Database |
| Mongoose | 7.x | ODM for MongoDB |
| EJS | 3.x | Templating engine |
| Dotenv | 16.x | Environment variables |
| Morgan | 1.x | HTTP logger |

---

## 📂 Project Structure
taskflow-dashboard/
│
├── config/
│ └── database.js # MongoDB connection
│
├── controllers/
│ └── taskController.js 
   └── projectController.js 
│
├── models/
│ └── Task.js
  └── Project.js
│
├── routes/
│ └── dashboard.js 
│ └── projects.js 
│ └── tasks.js 
│
├── views/
│ ├── index.ejs 
│ ├── add-task.ejs 
│ ├── edit-task.ejs 
│ └── partials/
│ ├── header.ejs
│ └── footer.ejs
│
├── public/
│ ├── css/
│ │ └── style.css
│ └── js/
│ └── main.js
│
├── utils/
│ └── seedData.js
│
├── logs/ 
├── .env 
├── .gitignore 
├── package.json 
├── server.js  
└── README.md 

text

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud Atlas)
- npm or yarn

### Step 1: Clone the Repository
```bash
git clone https://github.com/hasnaainali/decodelabs_tasks.git
cd decodelabs_tasks/taskflow-dashboard
Step 2: Install Dependencies
bash
npm install
Step 3: Configure Environment Variables
Create .env file in root directory:

env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/taskflow
NODE_ENV=development
Step 4: Start MongoDB
bash
# Local MongoDB
mongod

# OR using Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest
Step 5: Run the Application
bash
# Development mode
npm run dev

# Production mode
npm start
Step 6: Open in Browser
text
http://localhost:5000
📊 API Endpoints
Method	Endpoint	Description
GET	/	Dashboard - View all tasks
GET	/add-task	Show add task form
POST	/add-task	Create new task
GET	/edit-task/:id	Show edit task form
POST	/edit-task/:id	Update task
GET	/delete-task/:id	Delete task
GET	/task/:id	View single task details
🗄️ Database Schema (Task Model)
javascript
{
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'completed'],
    default: 'pending'
  },
  dueDate: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}
📱 Responsive Design
Device	Breakpoint	Layout
Mobile	< 768px	Stacked cards, hamburger menu
Tablet	768px - 1024px	2 columns grid
Desktop	> 1024px	3-4 columns grid
🎨 Color Palette
Color Name	Hex Code	Usage
Primary Blue	#3b82f6	Buttons, links
Success Green	#10b981	Completed tasks
Warning Yellow	#f59e0b	Pending tasks
Danger Red	#ef4444	Delete buttons
Dark Gray	#1f2937	Text, headers
Light Gray	#f3f4f6	Background
🔧 Available Scripts
bash
# Start development server with nodemon
npm run dev

# Start production server
npm start

# Install dependencies
npm install

# Run tests (if configured)
npm test
📸 Screenshots
Dashboard View
https://screenshots/dashboard.png

Add Task Form
https://screenshots/add-task.png

Edit Task Form
https://screenshots/edit-task.png

Mobile View
https://screenshots/mobile-view.png

👨‍💻 Author
Hasnain Ali

Platform	Link
GitHub	@hasnaainali
LinkedIn	Hasnain Ali
Email	hasnainali5@example.com
Internship: DecodLabs Virtual Full Stack Developer

📄 License
MIT License - Free for personal and commercial use

🙏 Acknowledgments
DecodLabs for the internship opportunity

MongoDB for the database

Express.js community

Open source contributors

⭐ Show Your Support
If you found this project helpful, please give it a ⭐ on GitHub!

📊 Project Status
Feature	Status
Task CRUD Operations	✅ Complete
Database Integration	✅ Complete
Responsive Design	✅ Complete
Search & Filter	✅ Complete
Priority Levels	✅ Complete
Due Date Tracking	✅ Complete
Overall Status: ✅ Production Ready

<div align="center">
Made with ❤️ for DecodLabs Virtual Internship

Full Stack Task Management System

</div> ```