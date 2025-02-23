import ToDoCard from "./ToDoCard";
import TodoModal from "./ToDoEditModal";

import { useEffect, useState } from "react";

import { useDraggable, useDroppable } from "@dnd-kit/core";
import { ToDoEntity } from "../../entities/ToDoEntity";
import ListEntity from "../../entities/ListEntity";
import { useAppContext } from "../../context/AppProvider";

interface Props {
  list: ListEntity;
}

export default function ToDoList({ list }: Props) {
  const appContext = useAppContext();

  const [beingDragged, setBeingDragged] = useState(false);

  const { isOver, setNodeRef } = useDroppable({
    id: "list" + list.getId(),
  });

  const {
    attributes,
    listeners,
    setNodeRef: setNodeRefDraggable,
  } = useDraggable({
    id: "list" + list.getId(),
  });

  //Effect to verify if this list is being dragged
  useEffect(() => {
    if (appContext.draggingList) {
      if (appContext.draggingList.id.replace("list", "") == list.getId()) {
        setBeingDragged(true);
      }
    } else {
      setBeingDragged(false);
    }
  }, [appContext.draggingList]);

  const [newTitle, setNewTitle] = useState(list.getTitle());
  const [selectedTodo, setSelectedTodo] = useState<ToDoEntity | null>(null);

  return (
    <div
      ref={(e) => {
        setNodeRef(e);
        setNodeRefDraggable(e);
      }}
      {...attributes}
      {...listeners}
      className={`relative container bg-night p-4 rounded-lg ${
        isOver ? "shadow-xl" : "shadow-md"
      } z-0 mx-5 min-w-64 w-64 h-fit ${
        beingDragged ? "border border-emerald" : ""
      }`}
    >
      <div className="flex items-center justify-between">
        <input
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          onBlur={() => {
            const newList = list;
            newList.setTitle(newTitle);
            appContext.editList(list.id, newList);
          }}
          className="w-full bg-transparent pl-2 py-1 text-silver text-sm font-bold"
        />
        <button
          className="group w-8 h-8  p-2 rounded-md block font-bold hover:bg-crimson"
          onClick={() => {
            //Remove List
            appContext.deleteList(list.id);
          }}
        >
          <img
            style={{ transform: "rotate(45deg)" }}
            src="/images/icons/add.svg"
            className="brightness-0 invert h-full"
          />
        </button>
      </div>
      <div className="mt-5 h-5/6 w-full flex flex-col justify-between">
        {list.getTodos().map((todo) => {
          return (
            <ToDoCard
              key={todo.id}
              todo={todo}
              openModal={() => {
                setSelectedTodo(todo);
              }}
            />
          );
        })}

        <button
          className="flex mt-5 w-full transition-all justify-between items-center h-10 p-2 rounded-md m-auto block font-bold hover:bg-crimson"
          onClick={() => {
            // Add ToDo To List
            appContext.createToDoInList(list);
            //listService.updateList(list.id, list)
          }}
        >
          <span className="text-sm text-emerald font-normal">
            Adicionar Cartão
          </span>
          <img
            src="/images/icons/add.svg"
            className="brightness-0 invert h-full"
          />
        </button>
      </div>

      {
        //Open Edit Modal
        selectedTodo !== null && (
          <TodoModal
            list={list}
            todo={selectedTodo}
            updateTodo={() => {
              list.updateTodo(selectedTodo.id, selectedTodo);
              appContext.editList(list.id, list);
              //listService.updateList(list.getId(), list)
            }}
            closeModal={() => {
              setSelectedTodo(null);
            }}
            removeTodo={() => {
              list.removeTodo(selectedTodo.id);
              appContext.editList(list.id, list);
              //listService.updateList(list.getId(), list)
            }}
          />
        )
      }
    </div>
  );
}
