import ProjectEntity from "../entities/ProjectEntity";
import ListService from "../services/ListService";
import ListEntity from "../entities/ListEntity";
import { ReactNode, createContext, useContext, useState } from "react";
import { useParams } from "react-router";
import ProjectService from "../services/ProjectService";
import DraggingList from "../interfaces/DraggingListInterface";
import DraggingTodo from "../interfaces/DraggingToDoInterface";

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
  draggingList: DraggingList | null;
  draggingToDo: DraggingTodo | null;
  setDraggingList: React.Dispatch<React.SetStateAction<DraggingList | null>>;
  setDraggingToDo: React.Dispatch<React.SetStateAction<DraggingTodo | null>>;
  updateProject: (projectId: string, newProject: ProjectEntity) => void;
  updateOrder: (lists: ListEntity[]) => void;
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

  const [draggingList, setDraggingList] = useState<DraggingList | null>(null);
  const [draggingToDo, setDraggingToDo] = useState<DraggingTodo | null>(null);

  const [project, setProject] = useState<ProjectEntity | null>(null);

  const createNewList = () => {
    if (!projectId) {
      throw new Error("projectId is required");
    }

    listService
      .addListToProject(projectId, lists.length)
      .then((newList) => {
        const newLists = [...lists, newList].sort(
          (a, b) => a.position - b.position
        );
        setLists(newLists);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const createToDoInList = (list: ListEntity) => {
    if (!projectId) {
      throw new Error("projectId is required");
    }

    listService
      .addToDoToList(list)
      .then((newTodos) => {
        list.setTodos(newTodos);
        const newLists = lists.map((l) => (l.id === list.id ? list : l));
        setLists(newLists);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadLists = () => {
    if (!projectId) {
      throw new Error("projectId is required");
    }

    listService
      .getListsByProjectId(projectId)
      .then((loadedLists) => {
        loadedLists.sort((a, b) => a.position - b.position);
        setLists(loadedLists);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const editList = (id: string, updatedList: ListEntity) => {
    listService.updateList(id, updatedList).then((updatedList) => {
      const newLists = lists.map((list) =>
        list.id === updatedList.id ? updatedList : list
      );
      setLists(newLists);
    });
  };

  const updateListOrder = (lists: ListEntity[]) => {
    listService.updateListOrder(lists).then((newLists) => {
      setLists(newLists);
    });
  };

  const deleteList = (id: string) => {
    listService
      .deleteList(id)
      .then(() => {
        const newLists = lists.filter((l) => l.id !== id);
        newLists.sort((a, b) => a.position - b.position);
        setLists(newLists);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadProject = async () => {
    if (!projectId) return;
    const p = await projectService.loadProject(projectId);
    setProject({ ...p } as ProjectEntity);
  };

  const updateProject = (projectId: string, newProject: ProjectEntity) => {
    projectService.updateProject(projectId, newProject).then((project) => {
      return project;
    });
  };

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
        updateOrder: updateListOrder,
        draggingList,
        setDraggingList,
        draggingToDo,
        setDraggingToDo,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
