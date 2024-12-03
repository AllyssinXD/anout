import { useState } from "react";
import ProjectInterface from "../../../interfaces/ProjectInterface";

function Project({name, sharedWith, onClick}: {name: string, sharedWith: {user_id: string, role: string}[], onClick: Function}){
    let shared = ""

    if(!sharedWith)shared="Somente você."
    else sharedWith.forEach(share=>shared+=share.user_id)

    return (
        <div onClick={()=>onClick()} className="w-56 h-32 bg-green-100 rounded-md p-4 hover:bg-green-700 hover:text-white cursor-pointer">
            <h1 className="font-bold">{name}</h1>
            <p className="text-xs">{shared}</p>
        </div>
    )
}

export default function AllProjects({setProject} : {setProject:Function}){
    const [projects, setProjects] = useState<ProjectInterface[]>([]);
    return (
    <div className="flex flex-col p-4">
        <h1 className="font-bold text-xl">All projects that you are in</h1>
        <ul className="py-4">
            {projects.map(project=>{return <li><Project sharedWith={project.sharedWith} name={project.name} onClick={()=>setProject(project)}/></li>})}
            {projects.length == 0 && <p className="text-sm opacity-80">Theres no projects yet.</p>}
        </ul>
    </div>
    )
}