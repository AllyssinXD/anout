import { useState } from 'react';
import { ToDoApp } from './components/ToDoApp';
import UserDashboard from './components/UserDashboard';
import ProjectInterface from './interfaces/ProjectInterface';

function App() {
  const [project, setProject] = useState<ProjectInterface | null>(null)

  return project ? <ToDoApp {...project}/>:<UserDashboard setProject={setProject}/>
}

export default App
