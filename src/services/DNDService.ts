import { Active, Over } from "@dnd-kit/core";
import { AppContextProps } from "../context/AppProvider";
import { TodoService } from "./TodoService";

export class DNDService {
    static handleDragStart(appContext: AppContextProps, active: Active) {
        //Check if active has "list" in id
        if(active.id.toString().includes("list")){
            //Active is a list
            const listId = active.id.toString().replace("list", "")
            const list = TodoService.getListById(appContext.lists, listId)
            if(list){
                
                //Start already on right position
                const initialX = active.rect.current.initial?.left || 0;
                const initialY = active.rect.current.initial?.top || 0;
                //Need to debug initial position
                console.log(active.rect.current.initial);

                appContext.setDraggingList({...list, getX: ()=>initialX, getY: ()=>initialY})
            }
        }
        else if (active.id.toString().includes("todo")){
            //Active is a todo
            const todoId = active.id.toString().replace("todo", "")
            const todo = TodoService.getTodoById(appContext.lists, todoId)
            if(todo){
                appContext.setDraggingToDo({...todo, getDescription: ()=>todo.description, getX: ()=>active.rect.current.translated?.left || 0, getY: ()=>active.rect.current.translated?.top || 0})
            }
        }
    }

    static handleDragEnd(appContext: AppContextProps, active: Active, over: Over | null) {
        //Reset dragging states
        appContext.setDraggingList(null)
        appContext.setDraggingToDo(null)
        
        if(!over) {
            return
        }

        const activeId = active.id;
        const overId = over.id;

        if(activeId.toString().includes("list") && overId.toString().includes("list")){
            this.dragListOverList(appContext, activeId.toString(), overId.toString());
        }

        if(activeId.toString().includes("todo") && overId.toString().includes("todo")){
            this.dragToDoOverToDo(appContext, activeId.toString(), overId.toString());
        }

        if(activeId.toString().includes("todo") && overId.toString().includes("list")){
            this.dragToDoOverList(appContext, activeId.toString(), overId.toString());
        }
    }

    static dragListOverList(appContext: AppContextProps, activeId: string, overId: string){
        activeId = activeId.replace("list", "")
        overId = overId.replace("list", "")

        if(activeId == overId) return

        const overList = TodoService.getListById(appContext.lists, overId)
        const activeList = TodoService.getListById(appContext.lists, activeId)

        if(!overList || !activeList) return

        appContext.updateOrder([overList, activeList])
    }
    static dragToDoOverToDo(appContext: AppContextProps, activeId: string, overId: string){
        activeId = activeId.replace("todo", "")
        overId = overId.replace("todo", "")

        if(activeId == overId) return

        const overTodo = TodoService.getTodoById(appContext.lists, overId)
        const activeTodo = TodoService.getTodoById(appContext.lists, activeId)

        if(!overTodo || !activeTodo) return

        const activeList = TodoService.getListFromTodo(appContext.lists, activeTodo)
        const overList = TodoService.getListFromTodo(appContext.lists, overTodo)
        
        if(!activeList || !overList) return
        
        //Verify if both todos are from the same list
        if(activeList.id == overList.id) {
            //Update order in the same list with splice and appContext.editList(listid, updatedList)
            const updatedList = activeList
            const activeIndex = activeList.todos.indexOf(activeTodo)
            const overIndex = activeList.todos.indexOf(overTodo)
            updatedList.todos.splice(activeIndex, 1)
            updatedList.todos.splice(overIndex, 0, activeTodo)
            appContext.editList(activeList.id, updatedList)            
        }
        else if (activeList.id != overList.id) {
            //Update order in different lists, put active above over
            const activeIndex = activeList.todos.indexOf(activeTodo)
            const updatedActiveList = activeList
            updatedActiveList.todos.splice(activeIndex, 1)
            appContext.editList(activeList.id, updatedActiveList)
            
            const overIndex = overList.todos.indexOf(overTodo)
            const updatedOverList = overList
            updatedOverList.todos.splice(overIndex, 0, activeTodo)
            appContext.editList(overList.id, updatedOverList)
        }

    }

    static dragToDoOverList(appContext: AppContextProps, activeId: string, overId: string){
        activeId = activeId.replace("todo", "")
        overId = overId.replace("list", "")

        const activeTodo = TodoService.getTodoById(appContext.lists, activeId)
        const overList = TodoService.getListById(appContext.lists, overId)

        if(!activeTodo || !overList) return

        const activeList = TodoService.getListFromTodo(appContext.lists, activeTodo)
        if(!activeList) return

        const updatedActiveList = activeList
        const activeIndex = activeList.todos.indexOf(activeTodo)

        updatedActiveList.todos.splice(activeIndex, 1)
        appContext.editList(activeList.id, updatedActiveList)

        const updatedOverList = overList
        updatedOverList.todos.push(activeTodo)
        appContext.editList(overList.id, updatedOverList)
    }

    static handleDragMove(appContext: AppContextProps, active: Active) {
        if(active.id.toString().startsWith("list")){
            //Update draggingList position
            const listId = active.id.toString().replace("list", "")
            const list = TodoService.getListById(appContext.lists, listId)
            if(list){
                appContext.setDraggingList({...list, getX: ()=>active.rect.current.translated?.left || 0, getY: ()=>active.rect.current.translated?.top || 0})
            }
        }
        else if(active.id.toString().startsWith("todo")){
            //Update draggingToDo position
            const todoId = active.id.toString().replace("todo", "")
            const todo = TodoService.getTodoById(appContext.lists, todoId)
            if(todo){
                appContext.setDraggingToDo({...todo, getDescription: ()=>todo.description, getX: ()=>active.rect.current.translated?.left || 0, getY: ()=>active.rect.current.translated?.top || 0})
            }
        }
    }
}