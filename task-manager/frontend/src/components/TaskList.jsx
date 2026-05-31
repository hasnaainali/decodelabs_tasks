import React from 'react';

const TaskList = ({ tasks, onEdit, onDelete }) => {
    const getStatusIcon = (status) => {
        switch (status) {
            case 'completed': return 'fa-check-circle text-green-500';
            case 'in-progress': return 'fa-spinner fa-pulse text-yellow-500';
            default: return 'fa-clock text-gray-400';
        }
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'high': return 'border-l-4 border-red-500';
            case 'medium': return 'border-l-4 border-yellow-500';
            default: return 'border-l-4 border-green-500';
        }
    };

    if (tasks.length === 0) {
        return (
            <div className="bg-white rounded-xl shadow-md p-12 text-center">
                <i className="fas fa-tasks text-6xl text-gray-300 mb-4"></i>
                <h3 className="text-xl font-semibold text-text-primary mb-2">No tasks yet</h3>
                <p className="text-text-secondary">Create your first task to get started!</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {tasks.map((task) => (
                <div key={task.id} className={`bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all duration-300 ${getPriorityColor(task.priority)}`}>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2 flex-wrap">
                                <i className={`fas ${getStatusIcon(task.status)} text-xl`}></i>
                                <h3 className="text-lg font-semibold text-text-primary">{task.title}</h3>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${task.status === 'completed' ? 'bg-green-100 text-green-700' :
                                        task.status === 'in-progress' ? 'bg-yellow-100 text-yellow-700' :
                                            'bg-gray-100 text-gray-700'
                                    }`}>
                                    {task.status === 'completed' ? '✅ Completed' : task.status === 'in-progress' ? '🔄 In Progress' : '⏳ Pending'}
                                </span>
                            </div>
                            {task.description && <p className="text-text-secondary text-sm mb-2">{task.description}</p>}
                            <div className="flex flex-wrap gap-4 text-xs text-text-secondary">
                                <span><i className="fas fa-flag mr-1"></i> Priority: <span className="font-semibold capitalize">{task.priority}</span></span>
                                {task.dueDate && <span><i className="fas fa-calendar-alt mr-1"></i> Due: {new Date(task.dueDate).toLocaleDateString()}</span>}
                                <span><i className="fas fa-clock mr-1"></i> Created: {new Date(task.createdAt).toLocaleDateString()}</span>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={() => onEdit(task)} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition flex items-center gap-2">
                                <i className="fas fa-edit"></i> <span className="hidden sm:inline">Edit</span>
                            </button>
                            <button onClick={() => onDelete(task.id)} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition flex items-center gap-2">
                                <i className="fas fa-trash-alt"></i> <span className="hidden sm:inline">Delete</span>
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TaskList;