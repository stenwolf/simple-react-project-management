import { createContext, useReducer } from "react";
const sampleProject = {
  title: 'Sample Project',
  description: 'Just a sample project',
  dueDate: '2025-03-21',
  id: '1'
}
const defaultState = {
  selectedProjectId: undefined, // undefined means nothing selected
  projects: [sampleProject],
  tasks: []
};

export function projectsReducer(state, action) {
  if (action.type === 'START_ADD_PROJECT') {
    return {
      ...state,
      selectedProjectId: null
    }
  }
  if (action.type === 'SELECT_PROJECT') {
    return {
      ...state,
      selectedProjectId: action.payload.id
    }
  }
  if (action.type === 'CANCEL_ADD_PROJECT') {
    return {
      ...state,
      selectedProjectId: undefined
    }
  }
  if (action.type === 'ADD_PROJECT') {
    const newProject = {
      ...action.payload.projectData,
      id: Math.random() // quick and simple for the purpose of this project
    }
    return {
      ...state,
      selectedProjectId: undefined, // exit out of creating new project
      projects: [...state.projects, newProject]
    }
  }
  if (action.type === 'DELETE_PROJECT') {
    return {
      ...state,
      selectedProjectId: undefined,
      projects: state.projects.filter((p) => p.id !== state.selectedProjectId)
    }
  }
  if (action.type === 'ADD_TASK') {
    const newTask = {
      text: action.payload.text,
      projectId: state.selectedProjectId,
      id: Math.random()
    }
    return {
      ...state,
      tasks: [...state.tasks, newTask]
    }
  }
  if (action.type === 'DELETE_TASK') {
    return {
      ...state,
      tasks: state.tasks.filter((t) => t.id !== action.payload.id)
    }
  }
  return state;
}

export const ProjectContext = createContext(defaultState);

export default function ProjectContextProvider({ children }) {
  const [projectState, dispatch] = useReducer(projectsReducer, defaultState);

  const handleStartAddProject = () => {
    dispatch({
      type: 'START_ADD_PROJECT',
    });
  }

  const handleSelectProject = (id) => {
    dispatch({
      type: 'SELECT_PROJECT',
      payload: {
        id
      }
    });
  }

  const handleCancel = () => {
    dispatch({
      type: 'CANCEL_ADD_PROJECT',
    });
  }

  const handleAddProject = (projectData) => {
    dispatch({
      type: 'ADD_PROJECT',
      payload: {
        projectData
      }
    });
  }

  const handleDelete = () => {
    dispatch({
      type: 'DELETE_PROJECT'
    })
  }

  const handleAddTask = (text) => {
    dispatch({
      type: 'ADD_TASK',
      payload: {
        text
      }
    })
  }

  const handleDeleteTask = (id) => {
    dispatch({
      type: 'DELETE_TASK',
      payload: {
        id
      }
    })
  }

  return <ProjectContext value={{
    selectedProjectId: projectState.selectedProjectId,
    projects: projectState.projects,
    tasks: projectState.tasks,
    handleStartAddProject,
    handleAddProject,
    handleSelectProject,
    handleCancel,
    handleDelete,
    handleAddTask,
    handleDeleteTask
  }}>
    {children}
  </ProjectContext>
}