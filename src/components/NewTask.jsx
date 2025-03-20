import { useState, useContext } from "react";
import { ProjectContext } from "../store/project-context";

export default function NewTask() {
  const {
    handleAddTask
  } = useContext(ProjectContext);

  const [enteredTask, setEnteredTask] = useState('');
  const handleChange = (event) => {
    setEnteredTask(event.target.value);
  }

  const handleClick = () => {
    if (enteredTask.trim() === '') {
      return // dont allow empty task
    }
    setEnteredTask(''); // reset afer adding task
    handleAddTask(enteredTask)
  }

  return (
    <div className="flex items-center gap-4">
      <input className="w-64 px-2 py-1 rounded-sm bg-stone-200"
        type="text"
        onChange={handleChange}
        value={enteredTask} />
      <button className="text-stone-700 hover:text-stone-950"
        onClick={handleClick}>
        Add Task
      </button>
    </div>
  )
}