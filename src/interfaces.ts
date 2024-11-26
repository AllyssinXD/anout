export interface ListInterface {
    id: number,
    title: string,
    todos: ToDoInterface[]
}

export interface ToDoInterface {
    id: number,
    title: string,
    description: string
    color: string
}