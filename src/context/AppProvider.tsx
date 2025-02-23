import ProjectEntity from "../entities/ProjectEntity";
import ListService from "../services/ListService";
import ListEntity from "../entities/ListEntity";
import {
  ReactNode,
  createContext,
  useContext,
  useState,
} from "react";
import { useParams } from "react-router";
import ProjectService from "../services/ProjectService";

export interface AppContextProps {
  loadProject: () => Promise<void>;
  project: ProjectEntity | null;
  lists: ListEntity[];
  setLists: React.Dispatch<React.SetStateAction<ListEntity[]>>;
  loadLists: () => void;
  createNewList: (title: string) => void;
  createToDoInList: (list: ListEntity) => void;
  editList: (id: string, updatedList: ListEntity) => void;
  deleteList: (id: string) => void;
  updateProject: (projectId: string, newProject: ProjectEntity) => void;
  updateOrder : (lists: ListEntity[]) => void;
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

  const listService = new ListService("http://127.0.0.1:5000/api");
  const projectService = new ProjectService("http://127.0.0.1:5000/api");
  
  const [lists, setLists] = useState<ListEntity[]>([]);
  const [project, setProject] = useState<ProjectEntity | null>(null);

  function createNewList() {
    if (!projectId) {
      throw new Error("projectId is required");
    }

    //BACKEND
    listService
      .addListToProject(projectId, lists.length)
      .then((newList) => {
        //FRONT END
        const newLists = [...lists, newList].sort((a,b) => a.position - b.position)
        setLists(newLists)
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
    listService
      .addToDoToList(list!)
      .then((newTodos) => {
        //FRONT END
        list.setTodos(newTodos);
        const newLists = lists.map((l) => (l.id == list.id ? list : l));
        setLists(newLists);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function loadLists() {
    if (!projectId) {
      throw new Error("projectId is required");
    }

    //BACK END
    listService
      .getListsByProjectId(projectId!)
      .then((loadedLists) => {
        loadedLists.sort((a,b) => a.position - b.position)

        //FRONT END
        setLists(loadedLists);
        console.log(lists)
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function editList(id: string, updatedList: ListEntity) {
    listService.updateList(id, updatedList).then(updatedList=>{
      console.log("Foi alterado a lista " + updatedList.title)
      const newLists = lists.map(list=>list.id==updatedList.id?updatedList:list)
      setLists(newLists)
    })
  }

  function updateListOrder(lists: ListEntity[]){
    console.log("Yes")
    listService.updateListOrder(lists).then(newLists=>{
      setLists(newLists)
      console.log(newLists)
    })
  }

  function deleteList(id: string) {
    //BACK END
    listService
      .deleteList(id)
      .then(() => {
        console.log("DELETED!")
        //FRONT END
        const newLists = lists.filter((l) => l.id != id);
        newLists.sort((a,b) => a.position - b.position)
        setLists(newLists);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function loadProject() {
    if (!projectId) return;
    const p = await projectService.loadProject(projectId);
    setProject({ ...p } as ProjectEntity);
  }

  function updateProject(projectId: string, newProject: ProjectEntity) {
    projectService
      .updateProject(projectId, newProject)
      .then((project) => {
        return project;
      });
  }

  return (
    <AppContext.Provider
      value={{
        loadProject,
        project,
        lists,
        setLists,
        createNewList,
        createToDoInList,
        loadLists,
        editList,
        deleteList,
        updateProject,
        updateOrder: updateListOrder
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
