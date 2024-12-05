import ProjectEntity from "../entities/ProjectEntity";
import ListService from "../services/ListService";
import useLoadLists from "../hooks/useLoadLists";
import useLoadProject from "../hooks/useLoadProject";
import ListEntity from "../entities/ListEntity";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { useParams } from "react-router";

interface AppContextProps {
  project: ProjectEntity | null;
  lists: ListEntity[];
  setLists: React.Dispatch<React.SetStateAction<ListEntity[]>>;
  createNewList: (title: string) => void;
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

export const AppProvider = ({children} : {children:ReactNode}) => {
  const { id: projectId } = useParams<{ id: string }>();
  
  if (!projectId) {
    throw new Error("projectId is required");
  }

  const listService = new ListService("/");
  const project = useLoadProject(projectId); // Hook para carregar o projeto
  const loadedLists = useLoadLists(projectId); // Hook para carregar listas

  const [lists, setLists] = useState<ListEntity[]>(loadedLists);

  function createNewList(title: string) {
    if (!projectId) {
      throw new Error("projectId is required");
    }

    //FRONT END 
    const newList = new ListEntity(new Date().toString(), title, projectId, new Date(), new Date());
    setLists([...lists, newList]);
  }

  function editList(id: string, updatedList: ListEntity) {
    const newLists = lists.map((list)=>{
      if(id == list.id) return updatedList
      return list
    })
    setLists(newLists);
  }

  return <AppContext.Provider value={{ project, lists, setLists, createNewList, editList }}>{children}</AppContext.Provider>;
};

export default AppProvider;