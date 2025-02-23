import { Active, Over } from "@dnd-kit/core";
import { AppContextProps } from "../context/AppProvider";
import { TodoService } from "./TodoService";

export class DNDService {
    static handleDragEnd(appContext: AppContextProps, active: Active, over: Over | null) {
        if(!over) return

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
}