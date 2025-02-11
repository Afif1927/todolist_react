import "./App.css";
import { useState, useEffect } from "react";

const TodoApp = () => {
  const [tasks, setTasks] = useState(() => {
    return (
      JSON.parse(localStorage.getItem("tasks")) ||
      []
    );
  });

  useEffect(() => {
    localStorage.setItem(
      "tasks",
      JSON.stringify(tasks)
    );
  }, [tasks]);

  const addTask = () => {
    const inputBox =
      document.getElementById("input-box");
    const task = inputBox.value.trim();
    if (!task) {
      alert("Please enter a task");
      return;
    }
    setTasks([
      ...tasks,
      { text: task, completed: false },
    ]);
    inputBox.value = "";
  };

  const toggleTask = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index
        ? { ...task, completed: !task.completed }
        : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter(
      (_, i) => i !== index
    );
    setTasks(updatedTasks);
  };

  return (
    <div className='max-w-md mx-auto mt-10 p-6 bg-gray-800 text-white rounded-lg shadow-lg'>
      <h1 className='text-2xl font-bold mb-4 text-center'>
        Todo List
      </h1>
      <div className='flex gap-2 mb-4'>
        <input
          type='text'
          id='input-box'
          placeholder='Enter a task...'
          className='flex-1 p-2 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none'
        />
        <button
          onClick={addTask}
          className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition'
        >
          Add Task
        </button>
      </div>

      <ul
        id='list-container'
        className='space-y-2'
      >
        {tasks.map((task, index) => (
          <li
            key={index}
            className={`flex justify-between items-center p-2 border rounded ${
              task.completed
                ? "line-through text-gray-400"
                : "text-white"
            } bg-gray-700`}
          >
            <span
              className='flex-1 cursor-pointer'
              onClick={() => toggleTask(index)}
            >
              {task.text}
            </span>
            <span
              onClick={() => deleteTask(index)}
              className='ml-4 text-red-500 cursor-pointer hover:text-red-600'
            >
              ✖
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
