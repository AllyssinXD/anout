import ToDoList from "../ToDoList";
import DNDWrapper from "../DNDWrapper";
import React, { createContext, useContext, useEffect, useState } from "react";
import DraggingTodo from "../../../interfaces/DraggingToDoInterface";
import { useAppContext } from "../../../context/AppProvider";
import { useNavigate, useParams } from "react-router";

const DraggingContext = createContext<React.Dispatch<
  React.SetStateAction<DraggingTodo | null>
> | null>(null);
export const useDraggingContext = () => useContext(DraggingContext);

export default function ToDoApp() {
  const [draggingToDo, setDraggingToDo] = useState<DraggingTodo | null>(null);
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
      <DraggingContext.Provider value={setDraggingToDo}>
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
            {appContext.lists.map((list) => {
              return <ToDoList key={list.getId()} list={list} />;
            })}
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
              className={`top-0 right-0 absolute bg-white w-44 min-h-10 mt-2 rounded-md border border-white-500`}
              style={{ top: draggingToDo.getY(), left: draggingToDo.getX() }}
            >
              <div
                className="w-1 h-full absolute top-0 left-0 rounded-md"
                style={{ backgroundColor: draggingToDo.color }}
              ></div>
              <h3 className="p-2 text-sm font-bold flex cursor-pointer">
                {draggingToDo.title}
              </h3>
            </div>
          ) : null}
        </div>
      </DraggingContext.Provider>
    </DNDWrapper>
  );
}
