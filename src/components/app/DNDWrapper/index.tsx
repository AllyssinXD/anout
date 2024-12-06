import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { ReactNode } from "react";
import { DNDService } from "../../../services/DNDService";
import { useAppContext } from "../../../context/AppProvider";

export default function DNDWrapper(props: { children: ReactNode }) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 120, // 250ms de espera antes de ativar o arrasto
        tolerance: 5, // Tolerância de 5px antes de cancelar o arrasto
      },
    })
  );

  const appContext = useAppContext();

  //Preciso de uma maneira de acessar listas aqui

  return (
    <DndContext
      onDragEnd={({ active, over }: DragEndEvent) =>
        DNDService.handleDragEnd(
          appContext.lists,
          active,
          over,
          appContext.setLists,
          appContext.editList
        )
      }
      sensors={sensors}
    >
      {props.children}
    </DndContext>
  );
}
