import axios from "axios";
import { ToDoEntity } from "../entities/ToDoEntity";
import ProjectEntity from "../entities/ProjectEntity";
import ListEntity from "../entities/ListEntity";

class ProjectService {
  constructor(private baseUrl: string) {}

  // Função para adicionar uma nova lista a um projeto
  async loadProjects(userId: string): Promise<ProjectEntity[]> {
    if (!userId) {
      throw new Error("userId are required.");
    }
    return axios.get(`${this.baseUrl}/projects`, {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json'
        }
    });
  }

  // Função para carregar listas de um projeto
  async getListsByProjectId(project_id: string): Promise<ListEntity[]> {
    if (!project_id) {
      throw new Error("Project ID is required.");
    }

    const response = await fetch(`${this.baseUrl}/projects/${project_id}/lists`);
    if (!response.ok) {
      throw new Error("Failed to fetch lists.");
    }

    const data = await response.json();
    return data.map((list: any) => 
      new ListEntity(list.id, list.name, project_id, new Date(list.createdAt), new Date(list.updatedAt), list.todos || [])
    );
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
}

export default ProjectService;