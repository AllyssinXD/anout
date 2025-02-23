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

    static handleDragMove(appContext: AppContextProps, active: Active) {
        if(active.id.toString().startsWith("list")){
            //Update draggingList position
            const listId = active.id.toString().replace("list", "")
            const list = TodoService.getListById(appContext.lists, listId)
            if(list){
                appContext.setDraggingList({...list, getX: ()=>active.rect.current.translated?.left || 0, getY: ()=>active.rect.current.translated?.top || 0})
            }
        }
    }
}