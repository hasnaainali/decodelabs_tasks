import React, { useState, useEffect } from 'react';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import { taskService, authService } from '../services/api';
import { toast } from 'react-hot-toast';

const Dashboard = ({ user, onLogout }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [stats, setStats] = useState({ total: 0, completed: 0, inProgress: 0, pending: 0, completionRate: 0 });
  const [priorityDist, setPriorityDist] = useState({ high: 0, medium: 0, low: 0 });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState('dashboard');

  useEffect(() => { loadTasks(); }, []);

  const loadTasks = async () => {
    try {
      const response = await taskService.getAllTasks();
      const taskData = response.data.data;
      setTasks(taskData);
      setStats(taskService.getStats(taskData));
      setPriorityDist(taskService.getPriorityDistribution(taskData));
    } catch (error) {
      toast.error('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (taskData) => {
    try {
      const response = await taskService.createTask(taskData);
      setTasks([response.data.data, ...tasks]);
      setShowForm(false);
      toast.success('Task created!');
      loadTasks();
    } catch (error) {
      toast.error('Failed to create task');
    }
  };

  const handleUpdateTask = async (id, taskData) => {
    try {
      const response = await taskService.updateTask(id, taskData);
      setTasks(tasks.map(task => task.id === id ? response.data.data : task));
      setEditingTask(null);
      toast.success('Task updated!');
      loadTasks();
    } catch (error) {
      toast.error('Failed to update task');
    }
  };

  const handleDeleteTask = async (id) => {
    if (window.confirm('Delete this task?')) {
      try {
        await taskService.deleteTask(id);
        setTasks(tasks.filter(task => task.id !== id));
        toast.success('Task deleted!');
        loadTasks();
      } catch (error) {
        toast.error('Failed to delete task');
      }
    }
  };

  const StatCard = ({ title, value, icon }) => (
    <div className="bg-white rounded-xl shadow-md p-6 card-hover">
      <div className="flex justify-between items-start">
        <div><p className="text-text-secondary text-sm font-medium mb-1">{title}</p><p className="text-3xl font-bold text-text-primary">{value}</p></div>
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-primary-dark flex items-center justify-center">
          <i className={`fas ${icon} text-white text-xl`}></i>
        </div>
      </div>
    </div>
  );

  const navItems = [
    { id: 'dashboard', name: 'Dashboard', icon: 'fa-tachometer-alt' },
    { id: 'analytics', name: 'Analytics', icon: 'fa-chart-line' },
    { id: 'tasks', name: 'Tasks', icon: 'fa-tasks' },
    { id: 'completed', name: 'Completed', icon: 'fa-check-circle' },
  ];

  const filteredTasks = () => {
    if (activePage === 'completed') return tasks.filter(t => t.status === 'completed');
    if (activePage === 'tasks') return tasks;
    return tasks;
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-[#f5f7fa] to-[#e9edf2]">
      {/* Sidebar */}
      <aside className={`fixed md:relative z-30 w-72 bg-gradient-to-b from-[#1a1f2e] to-[#0f121c] h-full transition-all duration-300 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-primary-dark flex items-center justify-center">
              <i className="fas fa-chart-line text-white text-xl"></i>
            </div>
            <h1 className="text-white text-xl font-bold">Task Manager</h1>
            <span className="text-primary text-xs">Pro</span>
          </div>

          <nav className="space-y-2">
            {navItems.map(item => (
              <button key={item.id} onClick={() => setActivePage(item.id)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${activePage === item.id ? 'bg-primary/20 text-primary' : 'text-gray-400 hover:bg-white/10 hover:text-white'}`}>
                <i className={`fas ${item.icon} w-5`}></i><span>{item.name}</span>
                {item.id === 'tasks' && tasks.length > 0 && <span className="ml-auto bg-primary/30 text-primary text-xs px-2 py-0.5 rounded-full">{tasks.length}</span>}
                {item.id === 'completed' && tasks.filter(t => t.status === 'completed').length > 0 && <span className="ml-auto bg-green-500/20 text-green-400 text-xs px-2 py-0.5 rounded-full">{tasks.filter(t => t.status === 'completed').length}</span>}
              </button>
            ))}
          </nav>

          <div className="absolute bottom-6 left-6 right-6">
            <div className="bg-white/5 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <i className="fas fa-user-circle text-primary text-3xl"></i>
                <div><p className="text-white text-sm font-medium">{user?.name}</p><p className="text-gray-400 text-xs">{user?.email}</p></div>
              </div>
              <button onClick={onLogout} className="w-full flex items-center justify-center gap-2 bg-red-500/20 text-red-400 py-2 rounded-lg hover:bg-red-500/30 transition">
                <i className="fas fa-sign-out-alt"></i><span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Toggle */}
      <button onClick={() => setSidebarOpen(!sidebarOpen)} className="md:hidden fixed top-4 left-4 z-40 bg-primary text-white p-2 rounded-lg shadow-lg">
        <i className="fas fa-bars"></i>
      </button>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-4 md:p-8">
          <div className="flex justify-between items-center mb-8">
            <div><h1 className="text-2xl md:text-3xl font-bold text-text-primary capitalize">{activePage}</h1><p className="text-text-secondary mt-1">Welcome back, {user?.name}!</p></div>
            <button onClick={() => setShowForm(true)} className="bg-gradient-to-r from-primary to-primary-dark text-white px-5 py-2.5 rounded-lg flex items-center gap-2 hover:shadow-lg transition-all">
              <i className="fas fa-plus-circle"></i><span>New Task</span>
            </button>
          </div>

          {activePage === 'dashboard' && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard title="Total Tasks" value={stats.total} icon="fa-tasks" />
                <StatCard title="Completed" value={stats.completed} icon="fa-check-circle" />
                <StatCard title="In Progress" value={stats.inProgress} icon="fa-spinner" />
                <StatCard title="Completion Rate" value={`${stats.completionRate}%`} icon="fa-chart-line" />
              </div>
              <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                <h3 className="text-lg font-semibold text-text-primary mb-4"><i className="fas fa-chart-pie text-primary mr-2"></i>Priority Distribution</h3>
                <div className="space-y-4">
                  {Object.entries(priorityDist).map(([priority, count]) => (
                    <div key={priority}>
                      <div className="flex justify-between text-sm mb-1">
                        <span><i className={`fas ${priority === 'high' ? 'fa-arrow-up text-red-500' : priority === 'medium' ? 'fa-minus text-yellow-500' : 'fa-arrow-down text-green-500'} mr-1`}></i>{priority.charAt(0).toUpperCase() + priority.slice(1)} Priority</span>
                        <span className="font-semibold">{count}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className={`h-2 rounded-full ${priority === 'high' ? 'bg-red-500' : priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'}`} style={{ width: `${tasks.length ? (count / tasks.length) * 100 : 0}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {activePage === 'analytics' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-semibold text-text-primary mb-4"><i className="fas fa-chart-simple text-primary mr-2"></i>Weekly Activity</h3>
                <div className="space-y-3">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, idx) => {
                    const tasksOnDay = tasks.filter(t => {
                      const taskDate = new Date(t.createdAt);
                      const today = new Date();
                      const dayDiff = Math.floor((today - taskDate) / (1000 * 60 * 60 * 24));
                      return dayDiff === (6 - idx);
                    }).length;
                    const percentage = Math.min((tasksOnDay / Math.max(tasks.length, 1)) * 100, 100);
                    return (<div key={day}><div className="flex justify-between text-sm mb-1"><span>{day}</span><span className="text-primary font-semibold">{tasksOnDay} tasks</span></div><div className="w-full bg-gray-200 rounded-full h-2"><div className="bg-gradient-to-r from-primary to-primary-dark h-2 rounded-full transition-all duration-500" style={{ width: `${percentage}%` }}></div></div></div>);
                  })}
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-semibold text-text-primary mb-4"><i className="fas fa-clock text-primary mr-2"></i>Recent Activity</h3>
                <div className="space-y-3">
                  {tasks.slice(0, 5).map(task => (<div key={task.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"><div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center"><i className="fas fa-check-circle text-primary text-sm"></i></div><div className="flex-1"><p className="text-sm font-medium text-text-primary">{task.title}</p><p className="text-xs text-text-secondary">{new Date(task.createdAt).toLocaleDateString()}</p></div><span className={`px-2 py-1 rounded-full text-xs font-semibold ${task.priority === 'high' ? 'bg-red-100 text-red-700' : task.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>{task.priority}</span></div>))}
                  {tasks.length === 0 && <p className="text-text-secondary text-center py-4">No recent activity</p>}
                </div>
              </div>
            </div>
          )}

          {(activePage === 'tasks' || activePage === 'completed' || activePage === 'dashboard') && (
            loading ? <div className="flex justify-center py-12"><div className="spinner"></div></div> : <TaskList tasks={filteredTasks()} onEdit={setEditingTask} onDelete={handleDeleteTask} />
          )}
        </div>
      </main>

      {showForm && <TaskForm onSubmit={handleCreateTask} onClose={() => setShowForm(false)} />}
      {editingTask && <TaskForm task={editingTask} onSubmit={(data) => handleUpdateTask(editingTask.id, data)} onClose={() => setEditingTask(null)} />}
    </div>
  );
};

export default Dashboard;