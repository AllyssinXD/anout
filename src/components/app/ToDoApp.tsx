import ToDoList from "./ToDoList";
import DNDWrapper from "./DNDWrapper";
import { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppProvider";
import { useNavigate, useParams } from "react-router";

export default function ToDoApp() {
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
      <div className="flex flex-col w-screen h-screen overflow-y-auto overflow-x-auto bg-dark">
        <div className="fixed flex items-center h-12 w-screen bg-night px-5">
          <a onClick={() => navigate("/")}>
            <h3 className="hover:bg-crimson text-silver text-md hover:cursor-pointer rounded-md font-medium p-2">
              Anout
            </h3>
          </a>
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
            return <ToDoList list={list} key={list.id} />;
          })}
          <button
            className="flex items-center justify-between px-2 mx-5 h-10 min-w-64 border border-crimson bg-transparent rounded-md  block hover:bg-crimson"
            onClick={() => appContext.createNewList("")}
          >
            <label className="text-sm text-emerald">Create another list</label>
            <img
              className="brightness-0 invert h-1/2"
              src="/images/icons/add.svg"
            />
          </button>
        </div>
        {appContext.draggingToDo &&
        appContext.draggingToDo.getX() != 0 &&
        appContext.draggingToDo.getY() != 0 ? (
          <div
            className={`top-0 right-0 absolute bg-night opacity-50 w-44 min-h-10 mt-2 rounded-md rotate-[10deg]`}
            style={{
              top: appContext.draggingToDo.getY(),
              left: appContext.draggingToDo.getX(),
            }}
          >
            <h3 className="p-2 text-sm text-silver font-normal flex cursor-pointer">
              {appContext.draggingToDo.title}
            </h3>
          </div>
        ) : null}
        {appContext.draggingList &&
        appContext.draggingList.getX() != 0 &&
        appContext.draggingList.getY() != 0 ? (
          <div
            className={`absolute top-0 left-0 container bg-night p-4 rounded-lg z-0 mx-5 min-w-64 w-64 h-fit`}
            style={{
              top: appContext.draggingList.getY(),
              left: appContext.draggingList.getX(),
            }}
          >
            <div className="flex items-center justify-between">
              <label className="w-full bg-transparent pl-2 py-1 text-silver text-sm font-bold">
                {appContext.draggingList.title}
              </label>
              <div className="group w-8 h-8  p-2 rounded-md block font-bold hover:bg-crimson"></div>
            </div>
          </div>
        ) : null}
      </div>
    </DNDWrapper>
  );
}
