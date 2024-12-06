import ProjectEntity from "../entities/ProjectEntity";
import ListService from "../services/ListService";
import useLoadLists from "../hooks/useLoadLists";
import useLoadProject from "../hooks/useLoadProject";
import ListEntity from "../entities/ListEntity";
import { ReactNode, createContext, useContext, useState } from "react";
import { useParams } from "react-router";

interface AppContextProps {
  project: ProjectEntity | null;
  lists: ListEntity[];
  setLists: React.Dispatch<React.SetStateAction<ListEntity[]>>;
  loadLists: () => void;
  createNewList: (title: string) => void;
  createToDoInList: (list: ListEntity) => void;
  editList: (id: string, updatedList: ListEntity) => void;
}

export const AppContext = createContext<AppContextProps | null>(null);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppProvider");
  }
  return context;
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const { id: projectId } = useParams<{ id: string }>();

  if (!projectId) {
    throw new Error("projectId is required");
  }

  const listService = new ListService("http://localhost:5000/api");

  const project = useLoadProject(projectId); // Hook para carregar o projeto
  const loadedLists = useLoadLists(projectId); // Hook para carregar listas

  const [lists, setLists] = useState<ListEntity[]>(loadedLists);

  function createNewList() {
    if (!projectId) {
      throw new Error("projectId is required");
    }

    //BACKEND
    listService
      .addListToProject(
        projectId!,
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzUwOWExMTA0OGIwMjlmZTdiYjllYjgiLCJpYXQiOjE3MzM0NDE2ODcsImV4cCI6MTczMzUyODA4N30.nFjqH4xw_9QLWA26gldxDeouqjU7PBGmAEfMHMseKxk"
      )
      .then((newList) => {
        //FRONT END
        setLists([...lists, newList]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function createToDoInList(list: ListEntity) {
    if (!projectId) {
      throw new Error("projectId is required");
    }

    //BACKEND
  }

  function loadLists() {
    if (!projectId) {
      throw new Error("projectId is required");
    }

    //BACK END
    listService
      .getListsByProjectId(
        projectId!,
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzUwOWExMTA0OGIwMjlmZTdiYjllYjgiLCJpYXQiOjE3MzM0NDE2ODcsImV4cCI6MTczMzUyODA4N30.nFjqH4xw_9QLWA26gldxDeouqjU7PBGmAEfMHMseKxk"
      )
      .then((lists) => {
        //FRONT END
        setLists(lists);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function editList(id: string, updatedList: ListEntity) {
    if (!projectId) {
      throw new Error("projectId is required");
    }

    //BACK END
    listService
      .updateList(
        id!,
        updatedList,
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzUwOWExMTA0OGIwMjlmZTdiYjllYjgiLCJpYXQiOjE3MzM0NDE2ODcsImV4cCI6MTczMzUyODA4N30.nFjqH4xw_9QLWA26gldxDeouqjU7PBGmAEfMHMseKxk"
      )
      .then((list) => {
        console.log(list);
        //FRONT END
        const newLists = lists.map((l) => (l.id == list.id ? list : l));
        setLists(newLists);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <AppContext.Provider
      value={{
        project,
        lists,
        setLists,
        createNewList,
        createToDoInList,
        loadLists,
        editList,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
