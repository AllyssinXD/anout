import axios from "axios";
import { ToDoEntity } from "../entities/ToDoEntity";
import ProjectEntity from "../entities/ProjectEntity";
import ListEntity from "../entities/ListEntity";

class ProjectService {
  constructor(private baseUrl: string) {}

  async loadProject(projectId: string): Promise<ProjectEntity> {
    const response = await axios.get(`${this.baseUrl}/projects/${projectId}`, {
        withCredentials: true,
    });

    const project = response.data.project;

    return new ProjectEntity(
      project._id,
      project.name,
      project.description,
      project.ownerId,
      project.createdAt,
      project.updatedAt,
      project.lastAccessed,
      project.members,
      project.isArchived
    );
  }

  // Função para adicionar uma nova lista a um projeto
  async loadProjects(): Promise<ProjectEntity[]> {
    const response = await axios.get(`${this.baseUrl}/projects`, {
        withCredentials: true
    });

    return response.data.projects;
  }

  // Função para excluir uma lista
  async deleteList(list_id: string): Promise<void> {
    if (!list_id) {
      throw new Error("List ID is required.");
    }

    const response = await fetch(`${this.baseUrl}/lists/${list_id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete list.");
    }
  }

  async updateList(listId: string, updatedList: ListEntity): Promise<ListEntity> {
    try {
        const response = await axios.put(
            `${this.baseUrl}/lists/${listId}`, // Endpoint do backend para atualizar a lista
            {
                title: updatedList.getTitle(),
                todos: updatedList.getTodos().map((todo) => ({
                    id: todo.getId(),
                    title: todo.getTitle(),
                    description: todo.getDescription(),
                    color: todo.getColor(),
                })),
            }
        );

        // Atualiza a entidade local com os dados retornados pelo backend, se necessário
        const updatedData = response.data;
        updatedList.setTitle(updatedData.title);
        updatedList.setTodos(
            updatedData.todos.map((todo: ToDoEntity) => 
                new ToDoEntity(todo.getId(), todo.getTitle(), todo.getDescription(), todo.getColor()))
        );

        return updatedList;
    } catch (error) {
        console.error("Failed to update list:", error);
        throw new Error("Failed to update list");
    }
  }

  async updateProject(projectId:string, newProject: ProjectEntity):Promise<ProjectEntity>{
    try {
      await axios.put(
          `${this.baseUrl}/projects/${projectId}`, // Endpoint do backend para atualizar a lista
          {
              name: newProject.name,
              description: newProject.description,
              ownerId: newProject.ownerId,
              members: newProject.members,
              createdAt: newProject.createdAt,
              lastAccessed: newProject.lastAccessed
          },
          {
            withCredentials: true,
          }
      );

      return newProject;
    } catch (error) {
        console.error("Failed to update list:", error);
        throw new Error("Failed to update list");
    }
  }

  placeHolder(): ProjectEntity{
    return new ProjectEntity('0', 'Project', '', '',new Date() ,new Date(), new Date(),[]);
  }
}

export default ProjectService;