import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import ProjectService from "../../../services/ProjectService";
import ProjectEntity from "../../../entities/ProjectEntity";

export default function AllProjects() {
  const navigate = useNavigate();
  const projectService = new ProjectService("http://127.0.0.1:5000/api");

  const [projects, setProjects] = useState<ProjectEntity[]>([]);

  useEffect(() => {
    projectService
      .loadProjects()
      .then((fetchedProjects: ProjectEntity[]) => {
        setProjects(fetchedProjects);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="flex flex-col p-4">
      <h1 className="font-bold text-xl text-gray-300">All projects that you are in</h1>
      <ul className="py-4">
        {projects.map((project, i) => {
          return (
            <li>
              <ProjectCard
                key={i}
                sharedWith={project.members}
                name={project.name}
                onClick={() => navigate("/project/" + project.id)}
              />
            </li>
          );
        })}
        {projects.length == 0 && (
          <p className="text-sm opacity-80">Theres no projects yet.</p>
        )}
      </ul>
    </div>
  );
}

function ProjectCard({
  name,
  sharedWith,
  onClick,
}: {
  name: string;
  sharedWith: { user_id: string; username: string; role: string }[];
  onClick: Function;
}) {
  let shared = "";

  if (sharedWith.length == 0) shared = "Somente você.";
  else sharedWith.forEach((share) => (shared += share.username + ","));

  shared = shared.substring(0, shared.length - 1) + ".";

  return (
    <div
      onClick={() => onClick()}
      className="w-56 h-32 border border-night text-gray-300 rounded-md p-4 hover:bg-emerald hover:text-white cursor-pointer"
    >
      <h1 className="font-bold">{name}</h1>
      <p className="text-xs">{shared}</p>
    </div>
  );
}
