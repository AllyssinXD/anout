import { ToDoEntity } from "../entities/ToDoEntity"
import { ToDoListEntity } from "../entities/ToDoListEntity"

export class TodoService{
    static getTodoById(lists: ToDoListEntity[], id: number): ToDoEntity | undefined{
        for(const list of lists){
          const todo = list.getTodos().find(t => t.getId() == id)
          if(todo){
            return todo
          }
        };
        return
      }
      
      static getListFromTodo(lists: ToDoListEntity[], todo: ToDoEntity) : ToDoListEntity | undefined{
        for(const list of lists){
          const todoInList = list.getTodos().find(t => t.getId() == todo.getId())
          if(todoInList){
            return list
          }
        };
        return
      }
    
      static getListById(lists: ToDoListEntity[], id: number): ToDoListEntity | undefined{
        for(const list of lists){
          if(list.getId() === id){
            return list
          }
        };
        return
      }

      static transferTodo(fromList: ToDoListEntity, toList: ToDoListEntity, todo: ToDoEntity){
        fromList.removeTodo(todo.getId())
        toList.addTodo(todo)
      }
}