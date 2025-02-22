import ToDoList from "../ToDoList";
import DNDWrapper from "../DNDWrapper";
import React, { createContext, useContext, useEffect, useState } from "react";
import DraggingTodo from "../../../interfaces/DraggingToDoInterface";
import { useAppContext } from "../../../context/AppProvider";
import { useNavigate, useParams } from "react-router";
import DraggingList from "../../../interfaces/DraggingListInterface";

const DraggingContext = createContext<[React.Dispatch<React.SetStateAction<DraggingTodo | null>>, React.Dispatch<React.SetStateAction<DraggingList | null>>] | null>(null);

export const useDraggingContext = () => useContext(DraggingContext);

export default function ToDoApp() {
  const [draggingToDo, setDraggingToDo] = useState<DraggingTodo | null>(null);
  const [draggingList, setDraggingList] = useState<DraggingList | null>(null);
  const [projectTitle, setProjectTitle] = useState("Carregando");

  const projectId = useParams().id;
  const appContext = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!projectId) navigate("/");

    appContext.loadLists();
    appContext.loadProject();
  }, []);

  useEffect(() => {
    setProjectTitle(appContext.project ? appContext.project.name : "");
  }, [appContext.project]);

  return (
    <DNDWrapper>
      <DraggingContext.Provider value={[setDraggingToDo, setDraggingList]}>
        <div className="flex flex-col w-screen h-screen overflow-y-auto overflow-x-auto bg-dark">
          <div className="fixed flex items-center h-12 w-screen bg-night px-5">
            <a onClick={()=>navigate("/")}><h3 className="hover:bg-crimson text-silver text-md hover:cursor-pointer rounded-md font-medium p-2">Anout</h3></a>
            <input
              value={projectTitle}
              onChange={(e) => setProjectTitle(e.target.value)}
              onBlur={() => {
                if (!appContext.project) return;
                const updatedProject = appContext.project;
                updatedProject.name = projectTitle;
                appContext.updateProject(updatedProject.id, updatedProject);
              }}
              className="border border-transparent bg-transparent text-emerald hover:border-crimson ml-5 p-2 rounded-md w-64 text-lg font-medium"
            />
          </div>
          <div className="flex min-w-96 mt-24">
            {
              appContext.lists.map((list,_, lists)=>{
                for(let i = 0; i<lists.length;i++){
                  console.log(list.position + " " + i)
                  if(list.position == i){
                    return <ToDoList list={list} key={i}/>
                  }
                  else if(!list.position){
                    return <ToDoList list={list} key={i}/>
                  }
                }
              })
            }
            <button
              className="flex items-center justify-between px-2 mx-5 h-10 min-w-64 border border-crimson bg-transparent rounded-md  block hover:bg-crimson"
              onClick={() => appContext.createNewList("")}
            >
              <label className="text-sm text-silver">Create another list</label>
              <img className="brightness-0 invert h-1/2" src="/images/icons/add.svg"/>
            </button>
          </div>
          {draggingToDo &&
          draggingToDo.getX() != 0 &&
          draggingToDo.getY() != 0 ? (
            <div
              className={`top-0 right-0 absolute bg-night opacity-50 w-44 min-h-10 mt-2 rounded-md rotate-[10deg]`}
              style={{ top: draggingToDo.getY(), left: draggingToDo.getX() }}
            >
              <h3 className="p-2 text-sm text-silver font-normal flex cursor-pointer">
                {draggingToDo.title}
              </h3>
            </div>
          ) : null}
          {
            draggingList && draggingList.getX() != 0 && draggingList.getY() != 0 ? (
            <div
              className={`absolute top-0 left-0 container bg-night p-4 rounded-lg z-0 mx-5 min-w-64 w-64 h-fit`}
              style={{top: draggingList.getY(), left: draggingList.getX()}}
            >
              <div className="flex items-center justify-between">
                <label
                  className="w-full bg-transparent pl-2 py-1 text-silver text-sm font-bold"
                >
                  {draggingList.title}
                </label>
                <div
                  className="group w-8 h-8  p-2 rounded-md block font-bold hover:bg-crimson"
                >
                </div>
              </div>
            </div>
            ) : null 
          }
        </div>
      </DraggingContext.Provider>
    </DNDWrapper>
  );
}
