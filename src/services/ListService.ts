import axios from "axios";
import ListEntity from "../entities/ListEntity";
import { ToDoEntity } from "../entities/ToDoEntity";

class ListService {
  constructor(private baseUrl: string) {}

  /**
   * Adiciona uma nova lista a um projeto.
   * @param project_id ID do projeto.
   * @param token Token de autenticação.
   * @returns Nova entidade de lista criada.
   */
  async addListToProject(project_id: string): Promise<ListEntity> {
    if (!project_id) {
      throw new Error("Project ID is required.");
    }

    const response = await axios.post(
      `${this.baseUrl}/projects/${project_id}/lists`,
      {}, // Corpo vazio para a requisição POST
      {
        withCredentials: true
      }
    );

    const { list } = response.data;

    return new ListEntity(
      list._id,
      list.title,
      project_id,
      list.createdAt,
      list.updatedAt,
      list.todos
    );
  }

  /**
   * Carrega todas as listas de um projeto pelo ID do projeto.
   * @param project_id ID do projeto.
   * @param token Token de autenticação.
   * @returns Array de entidades de listas.
   */
  async getListsByProjectId(project_id: string): Promise<ListEntity[]> {
    if (!project_id) {
      throw new Error("Project ID is required.");
    }

    const response = await axios.get(`${this.baseUrl}/projects/${project_id}/lists`, {
      withCredentials: true
    });

    const data = response.data.lists as ListResponse[];

    return data.map(
      (list) =>
        new ListEntity(
          list._id,
          list.title,
          list.projectId,
          new Date(list.createdAt),
          new Date(list.updatedAt),
          list.todos
        )
    );
  }

  /**
   * Exclui uma lista pelo ID.
   * @param list_id ID da lista.
   */
  async deleteList(listId: string): Promise<void> {
    if (!listId) {
      throw new Error("List ID is required.");
    }

    try {
      await axios.delete(
        `${this.baseUrl}/projects/lists/${listId}`,
        {
          withCredentials: true
        }
      );
    } catch(err){
      console.error("Failed to update list:", err);
      throw new Error("Failed to update list");
    }
  }

  /**
   * Atualiza uma lista existente.
   * @param listId ID da lista.
   * @param updatedList Instância da lista com os dados atualizados.
   * @returns Entidade da lista atualizada.
   */
  async updateList(listId: string, updatedList: ListEntity): Promise<ListEntity> {
    try {
      const response = await axios.put(
        `${this.baseUrl}/projects/lists/${listId}`,
        {
          title: updatedList.getTitle(),
          todos: updatedList.getTodos().map((todo) => ({
            id: todo.id,
            title: todo.title,
            description: todo.description,
            color: todo.color,
          })),
        }, {
          withCredentials: true
        }
      );

      const updatedData = response.data.update as ListResponse;

      console.log(updatedData)

      // Atualiza os dados locais da lista com os dados retornados pelo backend
      updatedList.setTitle(updatedData.title);
      updatedList.setTodos(
        updatedData.todos.map(
          (todo: ToDoResponse) =>
            new ToDoEntity(
              todo.id,
              todo.title,
              todo.description,
              todo.color
            )
        )
      );
      updatedList.updatedAt = new Date(updatedData.updatedAt);

      return updatedList;
    } catch (error) {
      console.error("Failed to update list:", error);
      throw new Error("Failed to update list");
    }
  }

  async addToDoToList(list: ListEntity): Promise<ToDoEntity[]>{
    const response = await axios.post(
      `${this.baseUrl}/projects/lists/${list.id}/createToDo`,{},{
        withCredentials: true
      }
    );

    return response.data.update.todos;
  }
}

/**
 * Interface que define o formato de uma resposta de lista do backend.
 */
interface ListResponse {
  _id: string;
  title: string;
  projectId: string;
  createdAt: string;
  updatedAt: string;
  todos: [];
}

interface ToDoResponse {
  id: string;
  title: string;
  description: string;
  color: string;
}

export default ListService;