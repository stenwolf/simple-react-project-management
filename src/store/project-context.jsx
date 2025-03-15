import { createContext, useState } from "react";

const defaultState = {
  selectedProjectId: undefined, // undefined means nothing selected
  projects: [],
  tasks: []
};

export const ProjectContext = createContext(defaultState);

export default function ProjectContextProvider({ children }) {
  const [projectsState, setProjectsState] = useState(defaultState)

  const handleStartAddProject = () => {
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: null, // null means adding a new one
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

  return <ProjectContext value={{
    projects: projectsState.projects,
    tasks: projectsState.tasks,
    handleStartAddProject,
    handleSelectProject
  }}>
    {children}
  </ProjectContext>
}