import { ToDoEntity } from "./ToDoEntity";

class ListEntity {
  id: string; // Identificador único da lista
  title: string; // Nome da lista
  projectId: string; // ID do projeto ao qual a lista pertence
  createdAt: Date; // Data de criação
  updatedAt: Date; // Última atualização
  todos: ToDoEntity[]; // Array de To-Dos associados à lista

  constructor(
    id: string,
    name: string,
    projectId: string,
    createdAt: Date,
    updatedAt: Date,
    todos: ToDoEntity[] = []
  ) {
    this.id = id;
    this.title = name;
    this.projectId = projectId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.todos = todos;
  }

  getId(): string{
    return this.id
  }
  
  getTitle(): string{
    return this.title
  }
  
  setTitle(title: string){
    this.title = title
  }
  
  getTodos(): ToDoEntity[]{
    return this.todos
  }

  setTodos(newTodos: ToDoEntity[]){
    this.todos = newTodos
  }
  
  addTodo(todo: ToDoEntity){
    this.todos.push(todo)
  }
  
  removeTodo(id: string){
    this.todos = this.todos.filter((todo) => {
        return todo.getId() !== id
    })
  }
  
  updateTodo(id: string, newTodo: ToDoEntity){
    const newTodos = this.todos.map((todo) => {
        if(todo.getId() === id){
            return newTodo
        }
        return todo
    })
    this.todos = newTodos
  }
  
}

export default ListEntity;
