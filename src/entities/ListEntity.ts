import { ToDoEntity } from "./ToDoEntity";

class ListEntity {
  id: string; // Identificador único da lista
  title: string; // Nome da lista
  projectId: string; // ID do projeto ao qual a lista pertence
  createdAt: Date; // Data de criação
  updatedAt: Date; // Última atualização
  todos: ToDoEntity[]; // Array de To-Dos associados à lista
  position: number;

  constructor(
    id: string,
    name: string,
    projectId: string,
    createdAt: string,
    updatedAt: string,
    todos: ToDoEntity[] = [],
    position: number
  ) {
    this.id = id;
    this.title = name;
    this.projectId = projectId;
    this.createdAt = new Date(createdAt);
    this.updatedAt = new Date(updatedAt);
    this.todos = todos;
    this.position = position
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
        return todo.id !== id
    })
  }
  
  updateTodo(id: string, newTodo: ToDoEntity){
    const newTodos = this.todos.map((todo) => {
        if(todo.id === id){
          console.log(todo)
            return newTodo
        }
        return todo
    })
    this.todos = newTodos
  }

  getPosition(){
    return this.position
  }

  setPosition(){
    return this.position
  }
  
}

export default ListEntity;
