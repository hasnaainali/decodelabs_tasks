
#  DecodeLabs Tasks Repository

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Projects](https://img.shields.io/badge/Projects-3-success)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![Node.js](https://img.shields.io/badge/Node.js-43853D?logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?logo=mongodb&logoColor=white)
![Responsive](https://img.shields.io/badge/Responsive-Yes-brightgreen)

##  Overview

**DecodeLabs Tasks Repository** is a comprehensive collection of **3 professional full-stack projects** developed during the DecodeLabs Virtual Full Stack Developer Internship. This repository showcases modern web development skills including responsive dashboards, task management systems, and full-stack applications with authentication.

###  Repository Statistics

| Metric | Value |
|--------|-------|
| **Total Projects** | 3 |
| **Technologies Used** | 10+ |
| **Lines of Code** | 5000+ |
| **Completion Status** | 100% |

---

##  Repository Structure

```
decodelabs_tasks/
│
├── business-dashboard/              
│   ├── index.html                   
│   ├── style.css                    
│   ├── main.js                      
│   ├── screenshots/                 
│   └── README.md                    
│
├── task-manager-pro/                
│   ├── backend-api/                 
│   ├── frontend/                    
│   ├── screenshots/                 
│   └── README.md                    
│
├── taskflow-dashboard/              
│   ├── config/                      
│   ├── controllers/                 
│   ├── models/                      
│   ├── routes/                      
│   ├── views/                       
│   ├── public/                      
│   ├── screenshots/                 
│   └── README.md                    
│
└── README.md                        
```

---

##  Projects Overview

| # | Project | Tech Stack | Status | Links |
|---|---------|------------|--------|-------|
| 1 | **BizDash - Responsive Dashboard** | HTML5, CSS3, Vanilla JS |  Complete | [View Project](business-dashboard/) |
| 2 | **Task Manager Pro** | React, Node.js, Express, JWT, TailwindCSS |  Complete | [View Project](task-manager/) |
| 3 | **TaskFlow Dashboard** | Node.js, Express, MongoDB, EJS |  Complete | [View Project](taskflow-dashboard/) |

---

##  Project 1: BizDash - Responsive Business Dashboard

![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

###  Overview
A modern, fully responsive business dashboard interface built with **pure HTML5, CSS3, and vanilla JavaScript**. Provides a complete admin panel experience with dynamic content management, analytics visualization, customer tracking, project management, and a contact system.

###  Key Features
- Real-time statistics cards (Revenue, Orders, Users, Conversion Rate)
- Interactive weekly performance chart with bar visualization
- Complete customer directory with profile cards
- Project portfolio with progress bars
- Fully validated contact form
- Toast notifications and modal dialogs
- Modern gradient color scheme (Teal + Navy)

###  Screenshots
| Desktop View | Mobile View | Dashboard |
|--------------|-------------|-----------|
| ![Desktop](business-dashboard/screenshots/desktop-view.png) | ![Mobile](business-dashboard/screenshots/mobile-view.png) | ![Dashboard](business-dashboard/screenshots/dashboard.png) |

###  Quick Start
```bash
cd business-dashboard
open index.html
```

---

##  Project 2: Task Manager Pro

![React](https://img.shields.io/badge/React-18.2.0-blue)
![Node.js](https://img.shields.io/badge/Node.js-43853D?logo=node.js&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-Auth-orange)
![Tailwind](https://img.shields.io/badge/Tailwind-CSS-06B6D4)

###  Overview
A complete full-stack task management application with **JWT authentication**, full CRUD operations, and real-time analytics dashboard. Built with React frontend and Node.js/Express backend.

###  Key Features
- **Authentication System**: JWT-based login/register with bcrypt password encryption
- **Task Management**: Complete CRUD operations with priority levels
- **Dashboard Analytics**: Statistics cards, completion rate, priority charts
- **Responsive Design**: Mobile-first approach with hamburger menu
- **Professional UI**: Toast notifications, modal dialogs, smooth animations

### 📸 Screenshots
| Dashboard | All Tasks | Login |
|-----------|-----------|-------|
| ![Dashboard](task-manager/screenshots/Dashboard.png) | ![Tasks](task-manager/screenshots/All%20Tasks.png) | ![Login](task-manager/screenshots/login.png) |

###  Quick Start
```bash
# Backend
cd task-manager/backend-api
npm install
npm run dev

# Frontend (new terminal)
cd task-manager/frontend
npm install
npm run dev
```

---

##  Project 3: TaskFlow Dashboard

![Node.js](https://img.shields.io/badge/Node.js-43853D?logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?logo=mongodb&logoColor=white)
![EJS](https://img.shields.io/badge/EJS-8E44AD?logo=ejs&logoColor=white)

###  Overview
A full-stack task management web application built with **Node.js**, **Express.js**, **MongoDB**, and **EJS** templating engine. Provides complete CRUD operations with project management capabilities and analytics tracking.

###  Key Features
- **Task CRUD**: Complete task management with priority levels
- **Project Management**: Create and manage multiple projects
- **Analytics Dashboard**: Visual insights and task statistics
- **Search & Filter**: Filter by status and priority
- **Responsive Design**: Works on all screen sizes
- **MongoDB Database**: Persistent data storage

### 📸 Screenshots
| Dashboard | Projects | Analytics |
|-----------|----------|-----------|
| ![Dashboard](taskflow-dashboard/Screenshot/Dashboard.png) | ![Projects](taskflow-dashboard/Screenshot/Projects.png) | ![Analytics](taskflow-dashboard/Screenshot/Analytics.png) |

### 🚀 Quick Start
```bash
cd taskflow-dashboard
npm install
# Create .env file with MONGODB_URI
npm run dev
```

---

##  Technologies Used Across All Projects

| Category | Technologies |
|----------|--------------|
| **Frontend** | HTML5, CSS3, JavaScript (ES6), React 18, TailwindCSS, EJS |
| **Backend** | Node.js, Express.js, JWT, bcryptjs |
| **Database** | MongoDB, Mongoose |
| **Styling** | CSS3, Flexbox, Grid, Gradients, Animations |
| **Tools** | Git, GitHub, Vite, npm, VS Code |

---

##  Responsive Design

All 3 projects are fully responsive with these breakpoints:

| Device | Breakpoint | Features |
|--------|------------|----------|
| **Mobile** | < 768px | Single column, hamburger menu, stacked cards |
| **Tablet** | 768px - 1024px | 2 columns, optimized spacing |
| **Desktop** | > 1024px | Full layout, multi-column grid |

---

##  Installation & Setup

### Prerequisites
```bash
Node.js (v18 or higher)
MongoDB (for Project 3)
npm or yarn
```

### Clone the Repository
```bash
git clone https://github.com/hasnaainali/decodelabs_tasks.git
cd decodelabs_tasks
```

### Individual Project Setup

| Project | Setup Command |
|---------|---------------|
| BizDash | `cd business-dashboard` then open `index.html` |
| Task Manager Pro | `cd task-manager-pro` then follow backend + frontend setup |
| TaskFlow Dashboard | `cd taskflow-dashboard` then `npm install && npm run dev` |

---

##  Color Schemes

### BizDash (Teal/Navy Theme)
| Color | Hex | Usage |
|-------|-----|-------|
| Primary Teal | #4f9da6 | Icons, active states |
| Navy Blue | #1a1f2e | Sidebar, headings |

### Task Manager Pro (Teal/Cyan Theme)
| Color | Hex | Usage |
|-------|-----|-------|
| Primary Teal | #14b8a6 | Buttons, links |
| Dark Teal | #0d9488 | Hover states |

### TaskFlow Dashboard (Blue Theme)
| Color | Hex | Usage |
|-------|-----|-------|
| Primary Blue | #3b82f6 | Buttons, links |
| Success Green | #10b981 | Completed tasks |

---

##  Skills Demonstrated

### Frontend Skills
-  React component architecture
-  State management with Hooks
-  Responsive design with TailwindCSS
-  Vanilla JavaScript DOM manipulation
-  API integration with Axios
-  Modal dialogs and toast notifications

### Backend Skills
-  REST API design and implementation
-  JWT authentication and authorization
-  Password hashing with bcrypt
-  MongoDB database integration
-  Express.js middleware development
-  Input validation with Joi

### Soft Skills
-  Clean code practices
-  Git version control
-  Professional documentation
-  UI/UX considerations
-  Problem-solving and debugging

---

##  Author

**Hasnain Ali**

| Platform | Link |
|----------|------|
| GitHub | [@hasnaainali](https://github.com/hasnaainali/) |
| LinkedIn | [Hasnain Ali](https://www.linkedin.com/in/hasnaainali/) |
| Email | hasnainali5@gmail.com |

**Internship:** DecodeLabs Virtual Full Stack Developer

---

##  License

MIT License - Free for personal and commercial use

---

##  Acknowledgments

- **DecodeLabs** for the internship opportunity
- **MongoDB** for the database
- **Express.js & React** communities
- All open source contributors

---

##  Project Completion Status

| Project | Frontend | Backend | Database | Auth | Responsive |
|---------|----------|---------|----------|------|------------|
| BizDash | ✅ | N/A | N/A | N/A | ✅ |
| Task Manager Pro | ✅ | ✅ | ✅ | ✅ | ✅ |
| TaskFlow Dashboard | ✅ | ✅ | ✅ | N/A | ✅ |

**Overall Completion:**  100% Complete

---

<div align="center">

---

**Made with ❤️ for DecodeLabs Virtual Full Stack Developer Internship**

*A complete collection of professional full-stack projects*

⭐ If you found this repository helpful, please give it a star on GitHub! ⭐


</div>
