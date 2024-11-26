import { Todo } from "./Todo"
import { TodoList } from "./TodoList"

export class TodoService{
    static getTodoById(lists: TodoList[], id: number): Todo | undefined{
        for(const list of lists){
          const todo = list.getTodos().find(t => t.getId() == id)
          if(todo){
            return todo
          }
        };
        return
      }
      
      static getListFromTodo(lists: TodoList[], todo: Todo) : TodoList | undefined{
        for(const list of lists){
          const todoInList = list.getTodos().find(t => t.getId() == todo.getId())
          if(todoInList){
            return list
          }
        };
        return
      }
    
      static getListById(lists: TodoList[], id: number): TodoList | undefined{
        for(const list of lists){
          if(list.getId() === id){
            return list
          }
        };
        return
      }

      static transferTodo(fromList: TodoList, toList: TodoList, todo: Todo){
        fromList.removeTodo(todo.getId())
        toList.addTodo(todo)
      }
}