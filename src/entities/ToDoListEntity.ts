import { ToDoEntity } from "./ToDoEntity"

export class ToDoListEntity{
    private id
    private title
    private todos

    constructor(id: number, title: string, todos: ToDoEntity[]){
        this.id = id
        this.title = title
        this.todos = todos
    }

    getId(): number{
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

    addTodo(todo: ToDoEntity){
        this.todos.push(todo)
    }

    removeTodo(id: number){
        this.todos = this.todos.filter((todo) => {
            return todo.getId() !== id
        })
    }

    updateTodo(id: number, newTodo: ToDoEntity){
        const newTodos = this.todos.map((todo) => {
            if(todo.getId() === id){
                return newTodo
            }
            return todo
        })
        this.todos = newTodos
    }

}