import ProjectContextProvider from "./store/project-context";
import SideBar from "./components/SideBar";
import Content from "./components/Content";



function App() {
  return (
    <ProjectContextProvider>
      <main className="h-screen my-8 flex gap-8">
        <SideBar />
        <Content />
      </main>
    </ProjectContextProvider>
  );
}

export default App;
