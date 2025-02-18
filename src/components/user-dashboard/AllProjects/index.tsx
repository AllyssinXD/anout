import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import ProjectService from "../../../services/ProjectService";
import ProjectEntity from "../../../entities/ProjectEntity";

export default function AllProjects(){
    const projectService = new ProjectService('http://127.0.0.1:5000/api')

    const [projects, setProjects] = useState<ProjectEntity[]>([]);
    const navigate = useNavigate();


    useEffect(()=>{
            
        projectService.loadProjects().then(projects=>{
            if(projects) setProjects(projects);
        })

    },[])

    return (
    <div className="flex flex-col p-4">

        <h1 className="font-bold text-xl">All projects that you are in</h1>
        <ul className="py-4">

            {projects.map(project=>{return <li><ProjectCard sharedWith={project.members} name={project.name} onClick={()=>navigate("/project/" + project.id)}/></li>})}
            {projects.length == 0 && <p className="text-sm opacity-80">Theres no projects yet.</p>}
    
        </ul>

    </div>
    )
}

function ProjectCard({name, sharedWith, onClick}: {name: string, sharedWith: {user_id: string, role: string}[], onClick: Function}){    
    let shared = ""

    if(sharedWith.length == 1)shared="Somente você."
    else sharedWith.forEach(share=>shared+=share.user_id+",")

    shared = shared.substring(0, shared.length-1) + "."

    return (
        <div 
        onClick={()=>onClick()} 
        className="w-56 h-32 bg-green-100 rounded-md p-4 hover:bg-green-700 hover:text-white cursor-pointer"
        >
            
            <h1 className="font-bold">{name}</h1>
            <p className="text-xs">{shared}</p>

        </div>
    )
}