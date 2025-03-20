import { ProjectContext } from "../store/project-context";
import { useContext } from "react";
import NewProject from "./NewProject";
import NoProjectSelected from "./NoProjectSelected";
import SelectedProject from "./SelectedProject";

export default function Content() {
  const {
    projects,
    selectedProjectId,
    handleDelete,
    handleDeleteTask,
    handleAddProject,
    handleCancel,
    handleStartAddProject,
  } = useContext(ProjectContext);

  const selectedProject = projects
    .find(p => p.id === selectedProjectId);

  let content = (
    <SelectedProject project={selectedProject}
      onDelete={handleDelete}
      onDeleteTask={handleDeleteTask} />
  );
  if (selectedProjectId === null) {
    content = <NewProject onSave={handleAddProject} onCancel={handleCancel} />
  } else if (selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />
  }

  return <>{content}</>
}