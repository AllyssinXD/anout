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
  async addListToProject(project_id: string, position: number): Promise<ListEntity> {
    if (!project_id) {
      throw new Error("Project ID is required.");
    }

    try{
      const response = await axios.post(
        `${this.baseUrl}/projects/${project_id}/lists`,
        {
          position: position
        }, // Corpo vazio para a requisição POST
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
        list.todos,
        list.position
      );
    } catch(err) {
      console.error("Failed to create list:", err);
      throw new Error("Failed to create list");
    }
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

    try {
      const response = await axios.get(`${this.baseUrl}/projects/${project_id}/lists`, {
        withCredentials: true
      });

      const data = response.data.lists as ListResponse[];

      return data.map(
        (list) =>{
          //Debug due date
          console.log(list.todos);
          // If due date is null, add a placeholder date of 2025-03-25
          const todos = list.todos.map(todo => new ToDoEntity(todo.id, todo.title, todo.description, todo.dueDate ? new Date(todo.dueDate) : null, todo.done, todo.color, undefined, undefined,));
          return new ListEntity(
            list._id,
            list.title,
            list.projectId,
            list.createdAt,
            list.updatedAt,
            todos,
            list.position
          )
        }
      );
    } catch (err) {
      console.error("Failed to load lists:", err);
      throw new Error("Failed to load lists");
    }
  }

  /**
   * Deleta uma lista pelo ID da lista.
   * @param listId ID da lista.
   * @returns void.
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
      console.error("Failed to delete list:", err);
      throw new Error("Failed to delete list");
    }
  }

  /**
   * Atualiza uma lista pelo ID da lista.
   * @param listId ID da lista.
   * @param updatedList Entidade de lista atualizada.
   * @returns Entidade de lista atualizada.
   */
  async updateList(listId: string, updatedList: ListEntity): Promise<ListEntity> {
    try {
      const response = await axios.put(
        `${this.baseUrl}/projects/lists/${listId}`,
        {
          newList : updatedList
        }, {
          withCredentials: true
        }
      );

      const updatedData = response.data.update as ListResponse;

      const updatedDataTodos = updatedData.todos.map(todo => new ToDoEntity(todo.id, todo.title, todo.description, todo.dueDate ? new Date(todo.dueDate) : null, todo.done, todo.color, undefined, undefined));

      return new ListEntity(updatedData._id, updatedData.title, updatedData.projectId, updatedData.createdAt, updatedData.updatedAt, updatedDataTodos, updatedData.position);
    } catch (error) {
      console.error("Failed to update list:", error);
      throw new Error("Failed to update list");
    }
  }

  /**
   * Atualiza a ordem das listas.
   * @param lists Array de entidades de listas.
   * @returns Array de entidades de listas atualizadas.
   */
  async updateListOrder(lists: ListEntity[]) : Promise<ListEntity[]>{
    if(lists.length > 2) {
      throw new Error("Failed to update list order: array of two itens not passed");
    }

    try{
      const res = await axios.put(`${this.baseUrl}/projects/lists/order/update-list-order`, {
        lists
      }, {
        withCredentials: true
      })

      const newReturnedLists = res.data.newLists as ListResponse[];

      const newLists : ListEntity[] = []
      newReturnedLists.forEach(returnedList => {
        const toDos = returnedList.todos.map(todo => new ToDoEntity(todo.id, todo.title, todo.description, todo.dueDate ? new Date(todo.dueDate) : null, todo.done, todo.color, undefined, undefined));
        newLists.push(new ListEntity(returnedList._id, returnedList.title, returnedList.projectId, returnedList.createdAt, returnedList.updatedAt, toDos, returnedList.position))
      });

      return newLists
    } catch(err){
      console.error("Failed to update list order:", err);
      throw new Error("Failed to update list order");
    }
  }

  /**
   * Adiciona um ToDo a uma lista.
   * @param list Entidade de lista.
   * @returns Array de entidades de ToDo.
   */
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

interface ToDoResponse {
  id: string;
  title: string;
  description: string;
  color: string;
  createdAt: string | null;
  updatedAt: string | null;
  dueDate: string | null;
  done: boolean;
}

interface ListResponse {
  _id: string;
  title: string;
  projectId: string;
  createdAt: string;
  updatedAt: string;
  todos: ToDoResponse[];
  position: number;
}

export default ListService;