import { useDraggable, useDroppable } from "@dnd-kit/core";
import { useEffect, useState } from "react";
import { ToDoEntity } from "../entities/ToDoEntity";
import { useAppContext } from "../context/AppProvider";

export default function useToDoCard({
  todo,
  openModal,
}: {
  todo: ToDoEntity;
  openModal: (todo: ToDoEntity) => void;
}) {
  const appContext = useAppContext();

  const { setNodeRef: setNodeRefDroppable } = useDroppable({
    id: "todo" + todo.id,
  });

  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    if (appContext.draggingToDo) {
      //checks if is this todo
      if (appContext.draggingToDo.id.replace("todo", "") == todo.id) {
        setDragging(true);
      } else {
        setDragging(false);
      }
    }
  }, [appContext.draggingToDo]);

  /* Saving this for calculating reference 
    getX: () =>
          e.active.rect.current.translated
            ? e.active.rect.current.translated.right -
              e.active.rect.current.translated?.width
            : 0,
    getY: () => e.active.rect.current.translated?.top || 0,
  */

  const { listeners, attributes, setNodeRef } = useDraggable({
    id: "todo" + todo.id,
  });

  const rgbColor = todo.color.match(/\d+/g);
  const [colorWhite, setColorWhite] = useState(false);

  const [isHovered, setIsHovered] = useState(false);

  function calculateTextColor(rgbColor: RegExpMatchArray | null): boolean {
    //Return true if the color is bright enough to be black text
    if (!rgbColor) {
      return false;
    }

    const [r, g, b] = rgbColor.map(Number);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;

    return brightness > 125 ? false : true;
  }

  const style = {
    ["--color" as any]: todo.color,
  };

  const textStyle = {
    color: isHovered ? (colorWhite ? "#cccdcc" : "#0B0915") : "#cccdcc",
  };

  const handleClick = () => {
    if (!dragging) {
      openModal(todo);
    }
  };

  useEffect(() => {
    setColorWhite(calculateTextColor(rgbColor));
  }, []);

  return {
    listeners,
    attributes,
    setNodeRef,
    style,
    textStyle,
    isHovered,
    setIsHovered,
    handleClick,
    setNodeRefDroppable,
  };
}
