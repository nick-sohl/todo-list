import React from 'react'

import {useEffect, useState} from 'react'

import {BsCheck} from 'react-icons/bs'
import {RiDeleteBin2Line} from 'react-icons/ri'

const App = () => {

  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  // Load tasks from local storage on component mount
  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, [])

  // Update local storage whenever tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks])

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask('');
    }
  }

  const removeTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  }

  const toggleTaskCompletion = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  }

  return (
    <div className="space-y-6 grid w-full justify-center items-center">
    <div className="space-x-4 w-full">
      <input
        type="text"
        placeholder="Add a new task"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        onKeyPress={handleKeyPress}
        className="input input-primary"
      />
      <button onClick={addTask} className="btn btn-primary aspect-1 text-xl">
        +
      </button>
    </div>
    <ul className="space-y-4">
      {tasks.map((task, index) => (
        <li
          key={index}
          className={`flex items-center space-x-4 border-b-[1px] border-base-content pb-4 ${
            task.completed ? 'line-through text-accent' : ''
          }`}
        >
          <span
            onClick={() => toggleTaskCompletion(index)}
            className="cursor-pointer flex-grow"
          >
            {task.text}
          </span>
          {!task.completed && (
            <button
              onClick={() => toggleTaskCompletion(index)}
              className="btn btn-md btn-accent rounded-full aspect-1 text-accent-content"
            >
              <BsCheck />
            </button>
          )}
          <button
            onClick={() => removeTask(index)}
            className="btn btn-md btn-secondary rounded-full aspect-1 text-accent-content"
          >
            <RiDeleteBin2Line />
          </button>
        </li>
      ))}
    </ul>
  </div>
  )
}

export default App