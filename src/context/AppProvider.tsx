import ProjectEntity from "../entities/ProjectEntity";
import ListService from "../services/ListService";
import ListEntity from "../entities/ListEntity";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useParams } from "react-router";
import ProjectService from "../services/ProjectService";

interface AppContextProps {
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
  const projectService = new ProjectService("http://localhost:5000/api");
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzUwOWExMTA0OGIwMjlmZTdiYjllYjgiLCJpYXQiOjE3MzM0NDE2ODcsImV4cCI6MTczMzUyODA4N30.nFjqH4xw_9QLWA26gldxDeouqjU7PBGmAEfMHMseKxk";

  const [lists, setLists] = useState<ListEntity[]>([]);
  const [project, setProject] = useState<ProjectEntity | null>(null);

  function createNewList() {
    if (!projectId) {
      throw new Error("projectId is required");
    }

    //BACKEND
    listService
      .addListToProject(projectId!, token)
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
    listService
      .addToDoToList(list!, token)
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
      .getListsByProjectId(projectId!, token)
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
      .updateList(id!, updatedList, token)
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
  function deleteList(id: string) {
    //BACK END
    listService
      .deleteList(id, token)
      .then(() => {
        //FRONT END
        const newLists = lists.filter((l) => l.id != id);
        setLists(newLists);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function loadProject() {
    const p = await projectService.loadProject(projectId!, token);
    setProject({ ...p } as ProjectEntity);
  }

  function updateProject(projectId: string, newProject: ProjectEntity) {
    projectService
      .updateProject(projectId, newProject, token)
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
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
