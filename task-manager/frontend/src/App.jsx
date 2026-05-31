import React, { useState, useEffect } from 'react';

function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [activePage, setActivePage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Form states
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDesc, setTaskDesc] = useState('');
  const [taskStatus, setTaskStatus] = useState('pending');
  const [taskPriority, setTaskPriority] = useState('medium');
  const [taskDueDate, setTaskDueDate] = useState('');

  const API_URL = 'http://localhost:5000/api';

  // BizDash Theme Colors
  const colors = {
    primary: '#4f9da6',
    primaryDark: '#2c6e76',
    primaryLight: '#7fc1c9',
    sidebarBg: '#1a1f2e',
    sidebarBgDark: '#0f121c',
    bodyBg: '#f5f7fa',
    bodyBgDark: '#e9edf2',
    textPrimary: '#1a1f2e',
    textSecondary: '#6c7a8e',
    success: '#2e7d32',
    danger: '#c62828',
    warning: '#f59e0b',
    white: '#ffffff',
  };

  // Close sidebar on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Check saved session
  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    if (token && savedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(savedUser));
      fetchTasks(token);
    }
  }, []);

  // Fetch tasks
  const fetchTasks = async (token) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/tasks`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) {
        setTasks(data.data);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Login handler
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password: loginPassword })
      });
      const data = await response.json();
      if (data.success) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.data));
        setIsAuthenticated(true);
        setUser(data.data);
        await fetchTasks(data.token);
        showToast('Login successful!', 'success');
      } else {
        showToast(data.error, 'error');
      }
    } catch (error) {
      showToast('Login failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Register handler
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: regName, email: regEmail, password: regPassword })
      });
      const data = await response.json();
      if (data.success) {
        showToast('Registration successful! Please login.', 'success');
        setIsLogin(true);
        setRegName('');
        setRegEmail('');
        setRegPassword('');
      } else {
        showToast(data.error, 'error');
      }
    } catch (error) {
      showToast('Registration failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Create task
  const handleCreateTask = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title: taskTitle,
          description: taskDesc,
          status: taskStatus,
          priority: taskPriority,
          dueDate: taskDueDate
        })
      });
      const data = await response.json();
      if (data.success) {
        showToast('Task created!', 'success');
        setShowTaskModal(false);
        resetTaskForm();
        fetchTasks(token);
      }
    } catch (error) {
      showToast('Failed to create task', 'error');
    }
  };

  // Update task
  const handleUpdateTask = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${API_URL}/tasks/${editingTask.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title: taskTitle,
          description: taskDesc,
          status: taskStatus,
          priority: taskPriority,
          dueDate: taskDueDate
        })
      });
      const data = await response.json();
      if (data.success) {
        showToast('Task updated!', 'success');
        setShowTaskModal(false);
        setEditingTask(null);
        resetTaskForm();
        fetchTasks(token);
      }
    } catch (error) {
      showToast('Failed to update task', 'error');
    }
  };

  // Delete task
  const confirmDelete = (task) => {
    setTaskToDelete(task);
    setShowDeleteModal(true);
  };

  const handleDeleteTask = async () => {
    if (!taskToDelete) return;
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${API_URL}/tasks/${taskToDelete.id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) {
        showToast('Task deleted successfully!', 'success');
        fetchTasks(token);
        setShowDeleteModal(false);
        setTaskToDelete(null);
      }
    } catch (error) {
      showToast('Failed to delete task', 'error');
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
    setTasks([]);
    setSidebarOpen(false);
    showToast('Logged out!', 'success');
  };

  // Edit task
  const editTask = (task) => {
    setEditingTask(task);
    setTaskTitle(task.title);
    setTaskDesc(task.description || '');
    setTaskStatus(task.status);
    setTaskPriority(task.priority);
    setTaskDueDate(task.dueDate?.split('T')[0] || '');
    setShowTaskModal(true);
  };

  // Reset task form
  const resetTaskForm = () => {
    setTaskTitle('');
    setTaskDesc('');
    setTaskStatus('pending');
    setTaskPriority('medium');
    setTaskDueDate('');
  };

  // Show toast
  const showToast = (message, type) => {
    const toast = document.createElement('div');
    toast.style.cssText = `
      position: fixed; bottom: 20px; right: 20px; z-index: 1100;
      padding: 12px 24px; border-radius: 8px; color: white;
      font-weight: 500; background: ${type === 'success' ? colors.success : colors.danger};
      animation: slideIn 0.3s ease; box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  };

  // Calculate stats
  const getStats = () => {
    const total = tasks.length;
    const completed = tasks.filter(t => t.status === 'completed').length;
    const inProgress = tasks.filter(t => t.status === 'in-progress').length;
    const pending = tasks.filter(t => t.status === 'pending').length;
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { total, completed, inProgress, pending, completionRate };
  };

  const stats = getStats();
  const priorityDist = {
    high: tasks.filter(t => t.priority === 'high').length,
    medium: tasks.filter(t => t.priority === 'medium').length,
    low: tasks.filter(t => t.priority === 'low').length,
  };

  const getFilteredTasks = () => {
    if (activePage === 'completed') return tasks.filter(t => t.status === 'completed');
    if (activePage === 'pending') return tasks.filter(t => t.status === 'pending');
    if (activePage === 'progress') return tasks.filter(t => t.status === 'in-progress');
    return tasks;
  };

  // Close sidebar function
  const closeSidebar = () => {
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  // Styles
  const styles = {
    container: {
      minHeight: '100vh',
      background: `linear-gradient(135deg, ${colors.bodyBg} 0%, ${colors.bodyBgDark} 100%)`,
      display: 'flex',
      position: 'relative',
    },
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.5)',
      zIndex: 25,
      display: sidebarOpen && window.innerWidth < 768 ? 'block' : 'none',
    },
    sidebar: {
      width: '280px',
      background: `linear-gradient(180deg, ${colors.sidebarBg} 0%, ${colors.sidebarBgDark} 100%)`,
      transition: 'transform 0.3s ease',
      position: 'fixed',
      left: 0,
      top: 0,
      bottom: 0,
      zIndex: 30,
      transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
      overflowY: 'auto',
    },
    mainContent: {
      flex: 1,
      marginLeft: window.innerWidth >= 768 ? '280px' : '0',
      transition: 'margin-left 0.3s ease',
      padding: '20px 16px',
      width: '100%',
    },
    gradientBtn: {
      background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryDark})`,
      color: 'white',
      border: 'none',
      padding: '10px 20px',
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: '600',
      transition: 'transform 0.2s',
    },
    input: {
      width: '100%',
      padding: '10px 12px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      fontSize: '14px',
    },
    menuButton: {
      position: 'fixed',
      top: '15px',
      left: '15px',
      zIndex: 35,
      background: colors.primary,
      color: 'white',
      border: 'none',
      padding: '10px 12px',
      borderRadius: '8px',
      cursor: 'pointer',
      display: window.innerWidth < 768 ? 'block' : 'none',
      boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
    },
  };

  // Add animation keyframes
  const styleSheet = document.createElement("style");
  styleSheet.textContent = `
    @keyframes slideIn {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes modalPop {
      from { opacity: 0; transform: scale(0.95); }
      to { opacity: 1; transform: scale(1); }
    }
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
    }
    button:hover {
      transform: translateY(-2px);
    }
    .task-card {
      animation: fadeIn 0.3s ease;
      transition: all 0.3s;
    }
    .task-card:hover {
      transform: translateX(5px);
      box-shadow: 0 4px 15px rgba(0,0,0,0.1);
    }
    .floating-icon {
      animation: float 3s ease-in-out infinite;
    }
  `;
  document.head.appendChild(styleSheet);

  // Login/Register UI with Teal/Cyan Gradient Background
  if (!isAuthenticated) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
        padding: '20px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background Pattern with White Accents */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, overflow: 'hidden', pointerEvents: 'none' }}>
          {/* Floating circles */}
          <div style={{ position: 'absolute', top: '10%', left: '5%', width: '250px', height: '250px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%', animation: 'float 8s ease-in-out infinite' }}></div>
          <div style={{ position: 'absolute', bottom: '10%', right: '5%', width: '200px', height: '200px', background: 'rgba(255,255,255,0.04)', borderRadius: '50%', animation: 'float 6s ease-in-out infinite reverse' }}></div>
          <div style={{ position: 'absolute', top: '50%', left: '15%', width: '150px', height: '150px', background: 'rgba(255,255,255,0.03)', borderRadius: '50%', animation: 'float 10s ease-in-out infinite' }}></div>
          <div style={{ position: 'absolute', bottom: '30%', right: '20%', width: '120px', height: '120px', background: 'rgba(255,255,255,0.03)', borderRadius: '50%', animation: 'float 7s ease-in-out infinite reverse' }}></div>

          {/* Task Management Graphics with White Color */}
          <div style={{ position: 'absolute', top: '15%', right: '8%', fontSize: '70px', opacity: 0.1, color: 'white' }}>
            <i className="fas fa-tasks floating-icon"></i>
          </div>
          <div style={{ position: 'absolute', bottom: '20%', left: '5%', fontSize: '60px', opacity: 0.08, color: 'white' }}>
            <i className="fas fa-check-circle floating-icon" style={{ animationDelay: '1s' }}></i>
          </div>
          <div style={{ position: 'absolute', top: '60%', right: '12%', fontSize: '50px', opacity: 0.07, color: 'white' }}>
            <i className="fas fa-chart-line floating-icon" style={{ animationDelay: '2s' }}></i>
          </div>
          <div style={{ position: 'absolute', bottom: '40%', left: '15%', fontSize: '45px', opacity: 0.06, color: 'white' }}>
            <i className="fas fa-clipboard-list floating-icon" style={{ animationDelay: '1.5s' }}></i>
          </div>
          <div style={{ position: 'absolute', top: '30%', left: '25%', fontSize: '35px', opacity: 0.05, color: 'white' }}>
            <i className="fas fa-rocket floating-icon" style={{ animationDelay: '0.8s' }}></i>
          </div>

          {/* Small dots pattern */}
          {[...Array(30)].map((_, i) => (
            <div key={i} style={{
              position: 'absolute',
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: '3px',
              height: '3px',
              background: 'rgba(255,255,255,0.3)',
              borderRadius: '50%'
            }}></div>
          ))}
        </div>

        {/* Main Card */}
        <div style={{
          background: colors.white,
          borderRadius: '24px',
          width: '100%',
          maxWidth: '460px',
          overflow: 'hidden',
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.3)',
          position: 'relative',
          zIndex: 10
        }}>
          {/* Header with White */}
          <div style={{
            background: colors.white,
            padding: '35px 25px',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Decorative elements */}
            <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '100px', height: '100px', background: `rgba(79, 157, 166, 0.05)`, borderRadius: '50%' }}></div>
            <div style={{ position: 'absolute', bottom: '-30px', left: '-30px', width: '120px', height: '120px', background: `rgba(79, 157, 166, 0.04)`, borderRadius: '50%' }}></div>

            {/* Animated Logo with Theme Color */}
            <div style={{
              width: '80px',
              height: '80px',
              background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryDark})`,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 15px',
              animation: 'float 3s ease-in-out infinite',
              boxShadow: '0 10px 25px -5px rgba(79, 157, 166, 0.3)'
            }}>
              <i className="fas fa-chart-line" style={{ fontSize: '40px', color: colors.white }}></i>
            </div>
            <h1 style={{ color: colors.textPrimary, fontSize: '28px', margin: 0, letterSpacing: '-0.5px' }}>Task Manager Pro</h1>
            <p style={{ color: colors.textSecondary, marginTop: '8px', fontSize: '14px' }}>Intelligent Task Management</p>

            {/* Feature Tags with Theme Color */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginTop: '20px', flexWrap: 'wrap' }}>
              <span style={{ background: `rgba(79, 157, 166, 0.1)`, padding: '4px 12px', borderRadius: '20px', fontSize: '11px', color: colors.primary }}>
                <i className="fas fa-check-circle" style={{ marginRight: '4px', fontSize: '10px' }}></i> Task Tracking
              </span>
              <span style={{ background: `rgba(79, 157, 166, 0.1)`, padding: '4px 12px', borderRadius: '20px', fontSize: '11px', color: colors.primary }}>
                <i className="fas fa-chart-line" style={{ marginRight: '4px', fontSize: '10px' }}></i> Analytics
              </span>
              <span style={{ background: `rgba(79, 157, 166, 0.1)`, padding: '4px 12px', borderRadius: '20px', fontSize: '11px', color: colors.primary }}>
                <i className="fas fa-shield-alt" style={{ marginRight: '4px', fontSize: '10px' }}></i> Secure
              </span>
            </div>
          </div>

          {/* Tab Buttons */}
          <div style={{ display: 'flex', borderBottom: `1px solid ${colors.bodyBgDark}`, background: colors.white }}>
            <button
              onClick={() => setIsLogin(true)}
              style={{
                flex: 1,
                padding: '16px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '15px',
                color: isLogin ? colors.primary : colors.textSecondary,
                borderBottom: isLogin ? `2px solid ${colors.primary}` : 'none',
                transition: 'all 0.2s'
              }}
            >
              <i className="fas fa-sign-in-alt" style={{ marginRight: '8px' }}></i>Sign In
            </button>
            <button
              onClick={() => setIsLogin(false)}
              style={{
                flex: 1,
                padding: '16px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '15px',
                color: !isLogin ? colors.primary : colors.textSecondary,
                borderBottom: !isLogin ? `2px solid ${colors.primary}` : 'none',
                transition: 'all 0.2s'
              }}
            >
              <i className="fas fa-user-plus" style={{ marginRight: '8px' }}></i>Create Account
            </button>
          </div>

          {/* Login Form */}
          {isLogin ? (
            <form onSubmit={handleLogin} style={{ padding: '32px' }}>
              <div style={{ marginBottom: '22px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', fontSize: '13px', color: colors.textPrimary }}>
                  <i className="fas fa-envelope" style={{ color: colors.primary, marginRight: '6px', fontSize: '12px' }}></i>Email Address
                </label>
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  style={{ ...styles.input, background: colors.bodyBg, borderColor: colors.bodyBgDark }}
                  required
                  placeholder="Enter your email"
                />
              </div>
              <div style={{ marginBottom: '28px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', fontSize: '13px', color: colors.textPrimary }}>
                  <i className="fas fa-lock" style={{ color: colors.primary, marginRight: '6px', fontSize: '12px' }}></i>Password
                </label>
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  style={{ ...styles.input, background: colors.bodyBg, borderColor: colors.bodyBgDark }}
                  required
                  placeholder="Enter your password"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                style={{ ...styles.gradientBtn, width: '100%', padding: '12px', fontSize: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              >
                {loading ? <i className="fas fa-spinner fa-pulse"></i> : <><i className="fas fa-arrow-right-to-bracket"></i> Sign In</>}
              </button>

              {/* Demo credentials hint */}
              <div style={{ marginTop: '20px', padding: '12px', background: `rgba(79, 157, 166, 0.08)`, borderRadius: '8px', border: `1px solid rgba(79, 157, 166, 0.2)` }}>
                <p style={{ fontSize: '11px', color: colors.primaryDark, margin: 0, textAlign: 'center' }}>
                  <i className="fas fa-info-circle"></i> Demo: demo@example.com / 123456
                </p>
              </div>
            </form>
          ) : (
            // Register Form
            <form onSubmit={handleRegister} style={{ padding: '32px' }}>
              <div style={{ marginBottom: '18px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', fontSize: '13px', color: colors.textPrimary }}>
                  <i className="fas fa-user" style={{ color: colors.primary, marginRight: '6px', fontSize: '12px' }}></i>Full Name
                </label>
                <input
                  type="text"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  style={{ ...styles.input, background: colors.bodyBg, borderColor: colors.bodyBgDark }}
                  required
                  placeholder="Enter your full name"
                />
              </div>
              <div style={{ marginBottom: '18px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', fontSize: '13px', color: colors.textPrimary }}>
                  <i className="fas fa-envelope" style={{ color: colors.primary, marginRight: '6px', fontSize: '12px' }}></i>Email Address
                </label>
                <input
                  type="email"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  style={{ ...styles.input, background: colors.bodyBg, borderColor: colors.bodyBgDark }}
                  required
                  placeholder="Enter your email"
                />
              </div>
              <div style={{ marginBottom: '28px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', fontSize: '13px', color: colors.textPrimary }}>
                  <i className="fas fa-lock" style={{ color: colors.primary, marginRight: '6px', fontSize: '12px' }}></i>Password
                </label>
                <input
                  type="password"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  style={{ ...styles.input, background: colors.bodyBg, borderColor: colors.bodyBgDark }}
                  required
                  placeholder="Create a password (min 6 characters)"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                style={{ ...styles.gradientBtn, width: '100%', padding: '12px', fontSize: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              >
                {loading ? <i className="fas fa-spinner fa-pulse"></i> : <><i className="fas fa-user-plus"></i> Create Account</>}
              </button>
            </form>
          )}

          {/* Footer */}
          <div style={{ padding: '16px 32px', textAlign: 'center', borderTop: `1px solid ${colors.bodyBgDark}`, background: colors.white }}>
            <p style={{ fontSize: '11px', color: colors.textSecondary, margin: 0 }}>
              <i className="fas fa-shield-alt" style={{ marginRight: '4px', color: colors.primary }}></i> Secure & Free • Task Manager Pro v1.0
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Main Dashboard (compact version)
  const navItems = [
    { id: 'dashboard', name: 'Dashboard', icon: 'fa-tachometer-alt' },
    { id: 'tasks', name: 'All Tasks', icon: 'fa-tasks' },
    { id: 'progress', name: 'In Progress', icon: 'fa-spinner' },
    { id: 'pending', name: 'Pending', icon: 'fa-clock' },
    { id: 'completed', name: 'Completed', icon: 'fa-check-circle' },
  ];

  return (
    <div style={styles.container}>
      <div style={styles.overlay} onClick={closeSidebar}></div>

      <button onClick={() => setSidebarOpen(true)} style={styles.menuButton}>
        <i className="fas fa-bars"></i>
      </button>

      <div style={styles.sidebar}>
        <div style={{ padding: '24px' }}>
          {window.innerWidth < 768 && (
            <button onClick={closeSidebar} style={{ position: 'absolute', top: '15px', right: '15px', background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', fontSize: '18px', cursor: 'pointer', padding: '8px 12px', borderRadius: '8px' }}>
              <i className="fas fa-times"></i>
            </button>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '30px', marginTop: window.innerWidth < 768 ? '30px' : '0' }}>
            <div style={{ width: '40px', height: '40px', background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryDark})`, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <i className="fas fa-chart-line" style={{ color: 'white', fontSize: '20px' }}></i>
            </div>
            <h1 style={{ color: 'white', fontSize: '18px', margin: 0 }}>Task Manager</h1>
            <span style={{ color: colors.primary, fontSize: '10px', background: 'rgba(79,157,166,0.2)', padding: '2px 6px', borderRadius: '4px' }}>Pro</span>
          </div>

          <nav>
            {navItems.map(item => (
              <button key={item.id} onClick={() => { setActivePage(item.id); closeSidebar(); }} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', background: activePage === item.id ? 'rgba(79,157,166,0.2)' : 'transparent', border: 'none', borderRadius: '8px', color: activePage === item.id ? colors.primary : '#aaa', cursor: 'pointer', marginBottom: '8px', transition: 'all 0.2s' }}>
                <i className={`fas ${item.icon}`} style={{ width: '20px' }}></i>
                <span>{item.name}</span>
                {item.id === 'tasks' && tasks.length > 0 && <span style={{ marginLeft: 'auto', background: 'rgba(79,157,166,0.3)', color: colors.primary, padding: '2px 6px', borderRadius: '10px', fontSize: '11px' }}>{tasks.length}</span>}
                {item.id === 'completed' && <span style={{ marginLeft: 'auto', background: 'rgba(46,125,50,0.2)', color: '#4caf50', padding: '2px 6px', borderRadius: '10px', fontSize: '11px' }}>{stats.completed}</span>}
              </button>
            ))}
          </nav>

          <div style={{ position: 'absolute', bottom: '24px', left: '24px', right: '24px' }}>
            <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '12px', padding: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <i className="fas fa-user-circle" style={{ color: colors.primary, fontSize: '32px' }}></i>
                <div>
                  <p style={{ color: 'white', margin: 0, fontWeight: '500' }}>{user?.name}</p>
                  <p style={{ color: '#aaa', margin: 0, fontSize: '11px', wordBreak: 'break-all' }}>{user?.email}</p>
                </div>
              </div>
              <button onClick={() => { handleLogout(); closeSidebar(); }} style={{ width: '100%', background: 'rgba(198,40,40,0.2)', color: '#ef5350', border: 'none', padding: '10px', borderRadius: '8px', cursor: 'pointer' }}>
                <i className="fas fa-sign-out-alt" style={{ marginRight: '8px' }}></i>Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div style={styles.mainContent}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', flexWrap: 'wrap', gap: '15px', marginTop: window.innerWidth < 768 ? '50px' : '0' }}>
          <div>
            <h1 style={{ fontSize: '24px', margin: 0, color: colors.textPrimary, textTransform: 'capitalize' }}>{activePage}</h1>
            <p style={{ color: colors.textSecondary, marginTop: '5px' }}>Welcome back, {user?.name}!</p>
          </div>
          <button onClick={() => { setEditingTask(null); resetTaskForm(); setShowTaskModal(true); }} style={styles.gradientBtn}>
            <i className="fas fa-plus-circle" style={{ marginRight: '8px' }}></i>New Task
          </button>
        </div>

        {activePage === 'dashboard' && (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '15px', marginBottom: '30px' }}>
              {[
                { title: 'Total Tasks', value: stats.total, icon: 'fa-tasks' },
                { title: 'Completed', value: stats.completed, icon: 'fa-check-circle' },
                { title: 'In Progress', value: stats.inProgress, icon: 'fa-spinner' },
                { title: 'Completion', value: `${stats.completionRate}%`, icon: 'fa-chart-line' },
              ].map((stat, idx) => (
                <div key={idx} style={{ background: colors.white, borderRadius: '12px', padding: '15px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <p style={{ color: colors.textSecondary, fontSize: '12px', marginBottom: '5px' }}>{stat.title}</p>
                      <p style={{ fontSize: '24px', fontWeight: 'bold', margin: 0, color: colors.textPrimary }}>{stat.value}</p>
                    </div>
                    <div style={{ width: '40px', height: '40px', background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryDark})`, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <i className={`fas ${stat.icon}`} style={{ color: colors.white, fontSize: '16px' }}></i>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ background: colors.white, borderRadius: '12px', padding: '20px', marginBottom: '30px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
              <h3 style={{ marginBottom: '20px', fontSize: '16px', color: colors.textPrimary }}><i className="fas fa-chart-pie" style={{ color: colors.primary, marginRight: '8px' }}></i>Priority Distribution</h3>
              {[
                { label: 'High Priority', value: priorityDist.high, color: '#ef4444', icon: 'fa-arrow-up' },
                { label: 'Medium Priority', value: priorityDist.medium, color: '#f59e0b', icon: 'fa-minus' },
                { label: 'Low Priority', value: priorityDist.low, color: '#10b981', icon: 'fa-arrow-down' },
              ].map((p, idx) => (
                <div key={idx} style={{ marginBottom: '15px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', fontSize: '13px' }}>
                    <span><i className={`fas ${p.icon}`} style={{ color: p.color, marginRight: '5px' }}></i>{p.label}</span>
                    <span style={{ fontWeight: 'bold' }}>{p.value}</span>
                  </div>
                  <div style={{ background: '#e5e7eb', borderRadius: '10px', height: '8px', overflow: 'hidden' }}>
                    <div style={{ width: `${tasks.length ? (p.value / tasks.length) * 100 : 0}%`, background: p.color, height: '100%', borderRadius: '10px' }}></div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ background: colors.white, borderRadius: '12px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
              <h3 style={{ marginBottom: '20px', fontSize: '16px', color: colors.textPrimary }}><i className="fas fa-clock" style={{ color: colors.primary, marginRight: '8px' }}></i>Recent Tasks</h3>
              {tasks.slice(0, 3).map(task => (
                <div key={task.id} className="task-card" style={{ borderLeft: `4px solid ${task.priority === 'high' ? '#ef4444' : task.priority === 'medium' ? '#f59e0b' : '#10b981'}`, padding: '12px', marginBottom: '12px', background: colors.bodyBg, borderRadius: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px' }}>
                    <div>
                      <h4 style={{ margin: 0, fontSize: '15px', color: colors.textPrimary }}>{task.title}</h4>
                      {task.description && <p style={{ color: colors.textSecondary, fontSize: '12px', marginTop: '5px' }}>{task.description.substring(0, 60)}</p>}
                      <div style={{ display: 'flex', gap: '12px', marginTop: '6px', fontSize: '10px', color: colors.textSecondary }}>
                        <span><i className="fas fa-flag"></i> {task.priority}</span>
                        {task.dueDate && <span><i className="fas fa-calendar"></i> {new Date(task.dueDate).toLocaleDateString()}</span>}
                      </div>
                    </div>
                    <span style={{ padding: '2px 8px', borderRadius: '20px', fontSize: '10px', background: task.status === 'completed' ? '#d1fae5' : task.status === 'in-progress' ? '#dbeafe' : '#fef3c7', color: task.status === 'completed' ? '#065f46' : task.status === 'in-progress' ? '#1e40af' : '#92400e' }}>
                      {task.status === 'completed' ? 'Done' : task.status === 'in-progress' ? 'Progress' : 'Pending'}
                    </span>
                  </div>
                </div>
              ))}
              {tasks.length === 0 && <p style={{ textAlign: 'center', color: colors.textSecondary, padding: '20px' }}>No tasks yet. Create your first task!</p>}
            </div>
          </>
        )}

        {(activePage === 'tasks' || activePage === 'completed' || activePage === 'pending' || activePage === 'progress') && (
          loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '40px' }}>
              <div className="spinner"></div>
            </div>
          ) : (
            <div>
              {getFilteredTasks().map(task => (
                <div key={task.id} className="task-card" style={{ background: colors.white, borderRadius: '12px', padding: '16px', marginBottom: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', borderLeft: `4px solid ${task.priority === 'high' ? '#ef4444' : task.priority === 'medium' ? '#f59e0b' : '#10b981'}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '6px' }}>
                        <i className={`fas ${task.status === 'completed' ? 'fa-check-circle' : task.status === 'in-progress' ? 'fa-spinner fa-pulse' : 'fa-clock'}`} style={{ color: task.status === 'completed' ? '#10b981' : task.status === 'in-progress' ? '#f59e0b' : '#9ca3af', fontSize: '14px' }}></i>
                        <h3 style={{ margin: 0, fontSize: '16px', color: colors.textPrimary }}>{task.title}</h3>
                        <span style={{ padding: '2px 8px', borderRadius: '20px', fontSize: '10px', background: task.status === 'completed' ? '#d1fae5' : task.status === 'in-progress' ? '#dbeafe' : '#fef3c7', color: task.status === 'completed' ? '#065f46' : task.status === 'in-progress' ? '#1e40af' : '#92400e' }}>
                          {task.status === 'completed' ? 'Completed' : task.status === 'in-progress' ? 'In Progress' : 'Pending'}
                        </span>
                      </div>
                      {task.description && <p style={{ color: colors.textSecondary, fontSize: '13px', marginBottom: '6px' }}>{task.description}</p>}
                      <div style={{ display: 'flex', gap: '12px', fontSize: '11px', color: colors.textSecondary, flexWrap: 'wrap' }}>
                        <span><i className="fas fa-flag"></i> Priority: <strong>{task.priority}</strong></span>
                        {task.dueDate && <span><i className="fas fa-calendar"></i> Due: {new Date(task.dueDate).toLocaleDateString()}</span>}
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button onClick={() => editTask(task)} style={{ background: '#3b82f6', color: 'white', border: 'none', padding: '5px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' }}>
                        <i className="fas fa-edit"></i>
                      </button>
                      <button onClick={() => confirmDelete(task)} style={{ background: '#ef4444', color: 'white', border: 'none', padding: '5px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' }}>
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {getFilteredTasks().length === 0 && (
                <div style={{ background: colors.white, borderRadius: '12px', padding: '40px', textAlign: 'center' }}>
                  <i className="fas fa-tasks" style={{ fontSize: '40px', color: '#d1d5db', marginBottom: '12px' }}></i>
                  <h3 style={{ margin: 0, fontSize: '16px', color: colors.textPrimary }}>No tasks found</h3>
                  <p style={{ color: colors.textSecondary, fontSize: '13px' }}>Create a new task to get started!</p>
                </div>
              )}
            </div>
          )
        )}
      </div>

      {/* Task Modal */}
      {showTaskModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }} onClick={() => setShowTaskModal(false)}>
          <div style={{ background: colors.white, borderRadius: '16px', width: '100%', maxWidth: '500px', maxHeight: '90vh', overflow: 'auto', animation: 'modalPop 0.2s ease' }} onClick={e => e.stopPropagation()}>
            <div style={{ padding: '16px 20px', borderBottom: `1px solid ${colors.bodyBgDark}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ margin: 0, fontSize: '18px', color: colors.textPrimary }}><i className="fas fa-tasks" style={{ color: colors.primary, marginRight: '8px' }}></i>{editingTask ? 'Edit Task' : 'Create New Task'}</h2>
              <button onClick={() => setShowTaskModal(false)} style={{ background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer', color: colors.textSecondary }}><i className="fas fa-times"></i></button>
            </div>
            <form onSubmit={editingTask ? handleUpdateTask : handleCreateTask} style={{ padding: '20px' }}>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500', fontSize: '13px', color: colors.textPrimary }}>Title *</label>
                <input type="text" value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} style={styles.input} required placeholder="Enter task title" />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500', fontSize: '13px', color: colors.textPrimary }}>Description</label>
                <textarea value={taskDesc} onChange={(e) => setTaskDesc(e.target.value)} rows="3" style={styles.input} placeholder="Enter description (optional)"></textarea>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '15px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500', fontSize: '13px', color: colors.textPrimary }}>Status</label>
                  <select value={taskStatus} onChange={(e) => setTaskStatus(e.target.value)} style={styles.input}>
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500', fontSize: '13px', color: colors.textPrimary }}>Priority</label>
                  <select value={taskPriority} onChange={(e) => setTaskPriority(e.target.value)} style={styles.input}>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500', fontSize: '13px', color: colors.textPrimary }}>Due Date</label>
                <input type="date" value={taskDueDate} onChange={(e) => setTaskDueDate(e.target.value)} style={styles.input} />
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button type="submit" style={{ ...styles.gradientBtn, flex: 1, padding: '10px' }}>
                  <i className="fas fa-save" style={{ marginRight: '8px' }}></i>{editingTask ? 'Update' : 'Create'}
                </button>
                <button type="button" onClick={() => setShowTaskModal(false)} style={{ flex: 1, background: '#e5e7eb', border: 'none', borderRadius: '8px', cursor: 'pointer', padding: '10px' }}>
                  <i className="fas fa-times" style={{ marginRight: '8px' }}></i>Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && taskToDelete && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }} onClick={() => setShowDeleteModal(false)}>
          <div style={{ background: colors.white, borderRadius: '16px', width: '100%', maxWidth: '380px', overflow: 'hidden', animation: 'modalPop 0.2s ease' }} onClick={e => e.stopPropagation()}>
            <div style={{ background: '#fef2f2', padding: '20px', textAlign: 'center', borderBottom: '1px solid #fee2e2' }}>
              <div style={{ width: '56px', height: '56px', background: '#fee2e2', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                <i className="fas fa-exclamation-triangle" style={{ fontSize: '28px', color: colors.danger }}></i>
              </div>
              <h3 style={{ margin: 0, fontSize: '18px', color: colors.danger }}>Delete Task?</h3>
              <p style={{ margin: '8px 0 0', fontSize: '13px', color: '#666' }}>This action cannot be undone.</p>
            </div>
            <div style={{ padding: '20px', background: colors.bodyBg, borderBottom: `1px solid ${colors.bodyBgDark}` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: colors.white, borderRadius: '8px', border: `1px solid ${colors.bodyBgDark}` }}>
                <div style={{ width: '36px', height: '36px', background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryDark})`, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <i className="fas fa-tasks" style={{ color: 'white', fontSize: '16px' }}></i>
                </div>
                <div>
                  <p style={{ fontWeight: '600', margin: 0, fontSize: '14px', color: colors.textPrimary }}>{taskToDelete.title}</p>
                  <p style={{ color: colors.textSecondary, fontSize: '11px', margin: '4px 0 0' }}>
                    <i className="fas fa-flag"></i> {taskToDelete.priority} •
                    <i className="fas fa-clock" style={{ marginLeft: '8px' }}></i> {taskToDelete.status}
                  </p>
                </div>
              </div>
            </div>
            <div style={{ padding: '20px', display: 'flex', gap: '12px' }}>
              <button onClick={() => setShowDeleteModal(false)} style={{ flex: 1, background: '#e5e7eb', border: 'none', padding: '10px', borderRadius: '8px', cursor: 'pointer', fontWeight: '500', fontSize: '14px' }}>
                <i className="fas fa-times" style={{ marginRight: '8px' }}></i>Cancel
              </button>
              <button onClick={handleDeleteTask} style={{ flex: 1, background: colors.danger, color: 'white', border: 'none', padding: '10px', borderRadius: '8px', cursor: 'pointer', fontWeight: '500', fontSize: '14px' }}>
                <i className="fas fa-trash-alt" style={{ marginRight: '8px' }}></i>Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .spinner {
          border: 3px solid #f3f3f3;
          border-top: 3px solid ${colors.primary};
          border-radius: 50%;
          width: 40px;
          height: 40px;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default App;