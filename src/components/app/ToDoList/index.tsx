import ToDoCard from "../ToDoCard/index";
import TodoModal from "../ToDoEditModal/index";

import { useState } from "react";

import { useDndMonitor, useDraggable, useDroppable } from "@dnd-kit/core";
import { ToDoEntity } from "../../../entities/ToDoEntity";
import ListEntity from "../../../entities/ListEntity";
import { useAppContext } from "../../../context/AppProvider";
import { useDraggingContext } from "../ToDoApp";

interface Props {
  list: ListEntity;
}

export default function ToDoList({ list }: Props) {
  const draggingContext = useDraggingContext();
  const appContext = useAppContext();

  const [_, setDraggingList] = draggingContext || [];

  const { isOver, setNodeRef } = useDroppable({
    id: "list"+list.getId(),
  });

  const {attributes, listeners, setNodeRef: setNodeRefDraggable} = useDraggable({
    id: "list"+list.getId()
  });

  useDndMonitor({
      onDragStart(e) {
        if(e.active.id.toString().includes("list")) return;
        if (!setDraggingList) return;
        setDraggingList({
          title: list.title,
          getX: () => 0,
          getY: () => 0,
          id: list.id
        });
      },
  
      onDragEnd() {
        if (setDraggingList) setDraggingList(null);
      },
  
      onDragMove(e) {
        if(e.active.id.toString().includes("todo")) return;
        if(e.active.id.toString().replace("list", "") != list.id) return;
        if (!setDraggingList) return;
        if (!e.active.rect.current.translated) return;
        if (!e.active.rect.current.translated.right) return;
        setDraggingList({
          title: list.title,
          getX: () =>
            e.active.rect.current.translated
              ? e.active.rect.current.translated.right -
                e.active.rect.current.translated?.width
              : 0,
          getY: () => e.active.rect.current.translated?.top || 0,
          id: list.getId()
        });
      },
    });

  const [newTitle, setNewTitle] = useState(list.getTitle());
  const [selectedTodo, setSelectedTodo] = useState<ToDoEntity | null>(null);

  return (
    <div
      ref={(e)=>{setNodeRef(e);setNodeRefDraggable(e)}}
      {...attributes}
      {...listeners}
      className={`relative container bg-night p-4 rounded-lg ${
        isOver ? "shadow-xl" : "shadow-md"
      } z-0 mx-5 min-w-64 w-64 h-fit`}
    >
      <div className="flex items-center justify-between">
        <input
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          onBlur={() => {
            const newList = list;
            newList.setTitle(newTitle);
            appContext.editList(list.id, newList);
            console.log("DEU BLUR!!")
          }}
          className="w-full bg-transparent pl-2 py-1 text-silver text-sm font-bold"
        />
        <button
          className="group w-8 h-8  p-2 rounded-md block font-bold hover:bg-crimson"
          onClick={() => {
            //Remove List
            appContext.deleteList(list.id);
            //listService.deleteList(list.getId())
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
          <span className="text-sm text-silver font-normal">Adicionar Cartão</span>
          <img src="/images/icons/add.svg" className="brightness-0 invert h-full"/>
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
