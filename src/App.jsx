import SideBar from "./components/SideBar";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import { useState } from "react";
import SelectedProject from "./components/SelectedProject";
import { ProjectContext } from "./store/project-context";

function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined, // undefined means nothing selected
    projects: [],
    tasks: []
  });

  const handleStartAddProject = () => {
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: null, // null means adding a new one
      }
    })
  }

  const handleAddTask = (text) => {
    setProjectsState(prevState => {
      const newTask = {
        text,
        projectId: prevState.selectedProjectId,
        id: Math.random()
      }
      return {
        ...prevState,
        tasks: [...prevState.tasks, newTask]
      }
    })
  }

  const handleDeleteTask = (id) => {
    setProjectsState(prevState => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter((t) => t.id !== id)
      }
    })
  }

  const handleAddProject = (projectData) => {
    setProjectsState(prevState => {
      const newProject = {
        ...projectData,
        id: Math.random()
      }
      return {
        ...prevState,
        selectedProjectId: undefined, // exit out of creating new project
        projects: [...prevState.projects, newProject]
      }
    })
  }

  const handleCancel = () => {
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined, // undefined means deselect
      }
    })
  }

  const handleSelectProject = (id) => {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: id,
      }
    })
  }

  const handleDelete = () => {
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: prevState.projects.filter((p) => p.id !== prevState.selectedProjectId)
      }
    })
  }

  const selectedProject = projectsState.projects.find(p => p.id === projectsState.selectedProjectId)
  const selectedTasks = projectsState.tasks.filter(t => t.projectId === projectsState.selectedProjectId)

  let content = (
    <SelectedProject project={selectedProject}
      tasks={selectedTasks}
      onDelete={handleDelete}
      onAddTask={handleAddTask}
      onDeleteTask={handleDeleteTask} />
  );
  if (projectsState.selectedProjectId === null) {
    content = <NewProject onSave={handleAddProject} onCancel={handleCancel} />
  } else if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <SideBar onStartAddProject={handleStartAddProject}
        onSelectProject={handleSelectProject}
        projects={projectsState.projects}
        selectedProjectId={projectsState.selectedProjectId} />
      {content}
    </main>
  );
}

export default App;
