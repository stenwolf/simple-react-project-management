import { useContext } from "react";
import { ProjectContext } from "../store/project-context";
import NewTask from "./NewTask";

export default function Tasks() {
  const {
    tasks,
    selectedProjectId,
    handleDeleteTask,
  } = useContext(ProjectContext);
  const selectedTasks = tasks
    .filter(t => t.projectId === selectedProjectId);
  return (
    <section>
      <h2 className="text-2xl font-bold text-stone-700 mb-4">
        Tasks
      </h2>
      <NewTask />
      {selectedTasks.length === 0
        ? (<p className="text-stone-800 mb-4 my-4">
          This project does not have any task yet.
        </p>)
        : (<ul className="p-4 mt-8 rounded-md bg-stone-100">
          {selectedTasks.map(task => (
            <li key={task.id}
              className="flex justify-between my-4">
              <span>{task.text}</span>
              <button className="text-stone-700 hover:text-red-500"
                onClick={() => handleDeleteTask(task.id)}>
                Clear
              </button>
            </li>))}
        </ul>)}

    </section>
  )
}