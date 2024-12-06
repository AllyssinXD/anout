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
        <div className="flex flex-col w-screen h-screen overflow-y-auto overflow-x-auto bg-gray-100">
          <div className="fixed flex items-center h-12 w-screen bg-white px-10">
            <input
              value={projectTitle}
              onChange={(e) => setProjectTitle(e.target.value)}
              onBlur={() => {
                if (!appContext.project) return;
                const updatedProject = appContext.project;
                updatedProject.name = projectTitle;
                appContext.updateProject(updatedProject.id, updatedProject);
              }}
              className="w-64 uppercase text-lg font-bold"
            />
          </div>
          <div className="flex min-w-96 mt-24">
            {appContext.lists.map((list) => {
              return <ToDoList key={list.getId()} list={list} />;
            })}
            <button
              className="mx-10 h-10 min-w-10 border border-white-800 bg-white rounded-md  block font-bold hover:bg-slate-200"
              onClick={() => appContext.createNewList("")}
            >
              <img className="h-full" src="/images/icons/add.svg" />
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
