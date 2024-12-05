import { ToDoEntity } from "../entities/ToDoEntity"
import ListEntity  from "../entities/ListEntity"

export class TodoService{
    static getTodoById(lists: ListEntity[], id: string): ToDoEntity | undefined{
        for(const list of lists){
          const todo = list.getTodos().find(t => t.getId() == id)
          if(todo){
            return todo
          }
        };
        return
      }
      
      static getListFromTodo(lists: ListEntity[], todo: ToDoEntity) : ListEntity | undefined{
        for(const list of lists){
          const todoInList = list.getTodos().find(t => t.getId() == todo.getId())
          if(todoInList){
            return list
          }
        };
        return
      }
    
      static getListById(lists: ListEntity[], id: string): ListEntity | undefined{
        for(const list of lists){
          if(list.getId() === id){
            return list
          }
        };
        return
      }

      static transferTodo(fromList: ListEntity, toList: ListEntity, todo: ToDoEntity){
        fromList.removeTodo(todo.getId())
        toList.addTodo(todo)
      }
}