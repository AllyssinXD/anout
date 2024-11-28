import { DndContext, DragEndEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { ReactNode } from "react";
import { DNDService } from "../../services/DNDService";
import { ToDoListEntity } from "../../entities/ToDoListEntity";

export function DNDWrapper(props: {children: ReactNode, lists: ToDoListEntity[], setLists: React.Dispatch<React.SetStateAction<ToDoListEntity[]>>}){
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                delay: 120, // 250ms de espera antes de ativar o arrasto
                tolerance: 5, // Tolerância de 5px antes de cancelar o arrasto
            },
        })
    );

    //Preciso de uma maneira de acessar listas aqui

    return <DndContext 
    onDragEnd={({active, over} : DragEndEvent)=>
        DNDService.handleDragEnd(props.lists, active, over, props.setLists)}
     sensors={sensors}>
        {props.children}
    </DndContext>
}