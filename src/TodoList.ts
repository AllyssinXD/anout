import { Todo } from "./Todo"

export class TodoList{
    private id
    private title
    private todos

    constructor(id: number, title: string, todos: Todo[]){
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

    getTodos(): Todo[]{
        return this.todos
    }

    addTodo(todo: Todo){
        this.todos.push(todo)
    }

    removeTodo(id: number){
        this.todos = this.todos.filter((todo) => {
            return todo.getId() !== id
        })
    }

    updateTodo(id: number, newTodo: Todo){
        const newTodos = this.todos.map((todo) => {
            if(todo.getId() === id){
                return newTodo
            }
            return todo
        })
        this.todos = newTodos
    }

}