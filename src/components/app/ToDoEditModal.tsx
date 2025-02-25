import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { ToDoEntity } from "../../entities/ToDoEntity";
import ListEntity from "../../entities/ListEntity";
import DateSelector from "./DateSelector";

interface TodoModalProps {
  list: ListEntity;
  todo: ToDoEntity;
  updateTodo: (list: ListEntity, id: string, todo: ToDoEntity) => void;
  removeTodo: (list: ListEntity, id: string) => void;
  closeModal: () => void;
}

const TodoModal: React.FC<TodoModalProps> = ({
  list,
  todo,
  updateTodo,
  removeTodo,
  closeModal,
}) => {
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);
  const [dueDate, setDueDate] = useState<Date | null>(todo.dueDate);
  const [showCalendar, setShowCalendar] = useState(false);

  useEffect(() => {
    setTitle(todo.title);
    setDescription(todo.description);
  }, [todo]);

  const handleSaveChanges = () => {
    todo.title = title;
    todo.description = description;
    todo.dueDate = dueDate;
    updateTodo(list, todo.id, todo);
    closeModal();
  };

  const handleDeleteTodo = () => {
    removeTodo(list, todo.id);
    closeModal();
  };

  return (
    <Modal
      isOpen={true}
      onRequestClose={closeModal}
      contentLabel="Editar To-do"
      className={"bg-night w-[50rem] h-[90vh] p-5 rounded-md"}
    >
      <div className="size-full flex flex-col justify-between">
        <div className="flex h-full">
          {/* Main div, with some important info of to-do; Gets majority of modal */}
          <div className="flex flex-col w-3/4">
            <div>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Título"
                className="block w-full text-lg font-medium bg-transparent rounded-md border-[none] p-2 text-emerald"
              />
            </div>
            <div className="mt-10">
              <label className="block mb-5 text-emerald text-md font-medium">
                Descrição:
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Descrição"
                className="block w-full max-h-64 h-64 p-2 bg-transparent rounded-md border-emerald text-silver focus:outline-crimson focus:bg-dark"
              />
            </div>
          </div>
          {/* Side menu div with other proprieties buttons with a border to the right */}
          <div className="flex flex-col w-1/4 border-l border-dark pl-5">
            {/* Due date button that opens a absolute position component of a digital caledar */}
            <button
              className="flex justify-between items-center mt-5 border border-silver rounded-md p-2 hover:bg-dark hover:border-crimson hover:cursor-pointer"
              onClick={() => {
                setShowCalendar(!showCalendar);
              }}
            >
              <img
                src="/images/icons/calendar.svg"
                alt="Calendar"
                className="w-5 h-5 brightness-0 invert"
              />
              <div className="flex flex-col">
                <label className="text-silver text-sm font-medium hover:cursor-pointer">
                  Data de entrega
                </label>
                <label className="text-silver text-xs hover:cursor-pointer">
                  {dueDate ? dueDate.toLocaleDateString() : "Sem data"}
                </label>
              </div>
            </button>
            {showCalendar ? (
              <DateSelector
                selectedDate={dueDate ? dueDate : new Date()}
                onDateChange={(date) => setDueDate(date)}
              />
            ) : null}
          </div>
        </div>
        {/* Button div with a border on top */}
        <div className="border-t border-dark mt-10 pt-5 flex justify-end">
          <button
            className="ml-5 w-[10rem] rounded-md bg-crimson px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-crimson"
            onClick={handleSaveChanges}
          >
            Salvar
          </button>
          <button
            className="ml-5 w-[10rem] rounded-md bg-emerald px-3 py-2 text-sm font-semibold text-dark shadow-sm hover:bg-emerald"
            onClick={handleDeleteTodo}
          >
            Deletar
          </button>
          <button
            className="ml-5 w-100 rounded-md bg-dark px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-night"
            onClick={closeModal}
          >
            Cancelar
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default TodoModal;
