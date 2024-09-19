import React, { useState, useEffect } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const ItemType = {
  TASK: 'task',
};

const Task = ({ task, columnId, editTask, deleteTask }) => {
  const [{ isDragging }, ref] = useDrag({
    type: ItemType.TASK,
    item: { id: task.id, columnId },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={ref}
      className={`bg-white p-4 rounded-md shadow-lg flex flex-col justify-between mb-2 transition-transform duration-200 ${isDragging ? 'opacity-50' : 'opacity-100'} border border-gray-300`}
    >
      <h3 className="text-lg font-semibold text-gray-800">{task.title}</h3>
      <p className="text-gray-600">{task.description}</p>
      <span className="text-gray-500 text-sm italic">Created on: {task.createdAt}</span>
      <div className="flex justify-between mt-2">
        <button onClick={() => editTask(columnId, task.id)} className="text-blue-600 hover:text-blue-800 transition-colors duration-200 mr-2">
          Edit
        </button>
        <button onClick={() => deleteTask(columnId, task.id)} className="text-red-600 hover:text-red-800 transition-colors duration-200">
          Delete
        </button>
      </div>
    </div>
  );
};

const Column = ({ column, addTask, editTask, deleteTask, moveTask, deleteColumn }) => {
  const [, drop] = useDrop({
    accept: ItemType.TASK,
    drop: (item) => moveTask(item.id, item.columnId, column.id),
  });

  return (
    <div
      ref={drop}
      className="bg-blue-50 p-4 rounded-lg shadow-lg w-full md:w-1/4 transition-transform duration-300 transform hover:scale-105 mb-4 border border-blue-200"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold border-b-2 border-blue-300 pb-2">{column.title}</h2>
        <button
          onClick={() => deleteColumn(column.id)}
          className="text-red-600 hover:text-red-800 transition-colors duration-200"
        >
          Delete Column
        </button>
      </div>
      <button
        onClick={() => addTask(column.id)}
        className="mb-4 bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition-colors duration-200 w-full"
      >
        Add Task
      </button>
      <div className="flex flex-col space-y-2">
        {column.tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            columnId={column.id}
            editTask={editTask}
            deleteTask={deleteTask}
          />
        ))}
      </div>
    </div>
  );
};

const Suggestions = ({ addSuggestedTask }) => {
  const suggestions = [
    { title: 'Call Manager', description: 'Follow up on project status' },
    { title: 'Schedule Meeting', description: 'Plan team sync for next week' },
    { title: 'Prepare Report', description: 'Summarize project progress' },
    { title: 'Review Code', description: 'Check recent pull requests' },
    { title: 'Send Email', description: 'Update team on deadlines' },
    { title: 'Research Topic', description: 'Look into new tools' },
    { title: 'Write Documentation', description: 'Update API docs' },
    { title: 'Create Presentation', description: 'Prepare slides for the meeting' },
    { title: 'Brainstorm Ideas', description: 'Discuss with the team' },
    { title: 'Conduct User Testing', description: 'Gather feedback on new features' },
  ];

  return (
    <div className="flex flex-wrap justify-between mt-4">
      {suggestions.map((task, index) => (
        <button
          key={index}
          onClick={() => addSuggestedTask(task)}
          className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition-colors duration-200 mb-2"
        >
          {task.title}
        </button>
      ))}
    </div>
  );
};

const KanbanBoard = () => {
  const [columns, setColumns] = useState([
    { id: '1', title: 'To Do', tasks: [] },
    { id: '2', title: 'Doing', tasks: [] },
    { id: '3', title: 'Done', tasks: [] },
  ]);

  const [showGreeting, setShowGreeting] = useState(true);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [showColumnForm, setShowColumnForm] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', description: '' });
  const [newColumn, setNewColumn] = useState('');
  const [currentColumnId, setCurrentColumnId] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowGreeting(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const addTask = (columnId) => {
    setShowTaskForm(true);
    setCurrentColumnId(columnId);
  };

  const handleAddTask = () => {
    if (newTask.title && newTask.description) {
      const createdAt = new Date().toLocaleDateString();
      setColumns((prev) =>
        prev.map((column) =>
          column.id === currentColumnId
            ? { ...column, tasks: [...column.tasks, { id: Date.now(), title: newTask.title, description: newTask.description, createdAt }] }
            : column
        )
      );
      setNewTask({ title: '', description: '' });
      setShowTaskForm(false);
    }
  };

  const addColumn = () => {
    setShowColumnForm(true);
  };

  const handleAddColumn = () => {
    if (newColumn) {
      setColumns((prev) => [
        ...prev,
        { id: Date.now().toString(), title: newColumn, tasks: [] },
      ]);
      setNewColumn('');
      setShowColumnForm(false);
    }
  };

  const addSuggestedTask = (task) => {
    const createdAt = new Date().toLocaleDateString();
    setColumns((prev) =>
      prev.map((column) =>
        column.id === '1'
          ? { ...column, tasks: [...column.tasks, { id: Date.now(), ...task, createdAt }] }
          : column
      )
    );
  };

  const deleteTask = (columnId, taskId) => {
    setColumns((prev) =>
      prev.map((column) =>
        column.id === columnId
          ? { ...column, tasks: column.tasks.filter((task) => task.id !== taskId) }
          : column
      )
    );
  };

  const editTask = (columnId, taskId) => {
    const newTitle = prompt('Edit task title:');
    const newDescription = prompt('Edit task description:');
    if (newTitle && newDescription) {
      setColumns((prev) =>
        prev.map((column) =>
          column.id === columnId
            ? {
                ...column,
                tasks: column.tasks.map((task) =>
                  task.id === taskId ? { ...task, title: newTitle, description: newDescription } : task
                ),
              }
            : column
        )
      );
    }
  };

  const deleteColumn = (columnId) => {
    setColumns((prev) => prev.filter((column) => column.id !== columnId));
  };

  const moveTask = (taskId, sourceColumnId, destinationColumnId) => {
    setColumns((prev) => {
      const sourceColumn = prev.find((col) => col.id === sourceColumnId);
      const destinationColumn = prev.find((col) => col.id === destinationColumnId);

      const sourceTasks = sourceColumn.tasks.filter((task) => task.id !== taskId);
      const movedTask = sourceColumn.tasks.find((task) => task.id === taskId);

      return prev.map((column) => {
        if (column.id === sourceColumnId) {
          return { ...column, tasks: sourceTasks };
        }
        if (column.id === destinationColumnId) {
          return { ...column, tasks: [...destinationColumn.tasks, movedTask] };
        }
        return column;
      });
    });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      {showGreeting && (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50 backdrop-blur-md">
          <h1 className="text-3xl font-bold text-center">Welcome to Our Kanban Board!</h1>
        </div>
      )}
      <div className="container mx-auto p-4">
        <div className="flex justify-between mb-4">
          <h1 className="text-3xl font-bold">Kanban Board</h1>
          <button
            onClick={addColumn}
            className="bg-green-600 text-white p-2 rounded-md hover:bg-green-700 transition-colors duration-200"
          >
            Add Column
          </button>
        </div>
        <div className="flex flex-wrap">
          {columns.map((column) => (
            <Column
              key={column.id}
              column={column}
              addTask={addTask}
              editTask={editTask}
              deleteTask={deleteTask}
              moveTask={moveTask}
              deleteColumn={deleteColumn}
            />
          ))}
        </div>
        {showTaskForm && (
          <div className="mt-4">
            <h3 className="text-xl mb-2">Add New Task</h3>
            <input
              type="text"
              placeholder="Task Title"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              className="border rounded-md p-2 mr-2"
            />
            <input
              type="text"
              placeholder="Task Description"
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              className="border rounded-md p-2 mr-2"
            />
            <button
              onClick={handleAddTask}
              className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
            >
              Add Task
            </button>
            <button
              onClick={() => setShowTaskForm(false)}
              className="bg-red-600 text-white p-2 rounded-md hover:bg-red-700 transition-colors duration-200 ml-2"
            >
              Cancel
            </button>
          </div>
        )}
        {showColumnForm && (
          <div className="mt-4">
            <h3 className="text-xl mb-2">Add New Column</h3>
            <input
              type="text"
              placeholder="Column Title"
              value={newColumn}
              onChange={(e) => setNewColumn(e.target.value)}
              className="border rounded-md p-2 mr-2"
            />
            <button
              onClick={handleAddColumn}
              className="bg-green-600 text-white p-2 rounded-md hover:bg-green-700 transition-colors duration-200"
            >
              Add Column
            </button>
            <button
              onClick={() => setShowColumnForm(false)}
              className="bg-red-600 text-white p-2 rounded-md hover:bg-red-700 transition-colors duration-200 ml-2"
            >
              Cancel
            </button>
          </div>
        )}
        <Suggestions addSuggestedTask={addSuggestedTask} />
      </div>
    </DndProvider>
  );
};

export default KanbanBoard;
