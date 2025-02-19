import ToDoCard from "../ToDoCard/index";
import TodoModal from "../ToDoEditModal/index";

import { useState } from "react";

import { useDroppable } from "@dnd-kit/core";
import { ToDoEntity } from "../../../entities/ToDoEntity";
import ListEntity from "../../../entities/ListEntity";
import { useAppContext } from "../../../context/AppProvider";

interface Props {
  list: ListEntity;
}

export default function ToDoList({ list }: Props) {
  const appContext = useAppContext();

  const { isOver, setNodeRef } = useDroppable({
    id: list.getId(),
  });

  const [newTitle, setNewTitle] = useState(list.getTitle());
  const [selectedTodo, setSelectedTodo] = useState<ToDoEntity | null>(null);

  return (
    <div
      ref={setNodeRef}
      className={`relative container bg-night p-4 rounded-lg ${
        isOver ? "shadow-xl" : "shadow-md"
      } z-0 mx-5 min-w-64 w-64 h-fit`}
    >
      <div className="flex items-center justify-between">
        <input
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          onBlur={() => {
            list.setTitle(newTitle);
            appContext.editList(list.id, list);
          }}
          className="w-32 bg-transparent text-silver font-bold"
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
          className="mt-5 w-8 p-2 rounded-md m-auto block font-bold hover:bg-crimson"
          onClick={() => {
            // Add ToDo To List
            appContext.createToDoInList(list);
            //listService.updateList(list.id, list)
          }}
        >
          <img src="/images/icons/add.svg" className="brightness-0 invert"/>
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
