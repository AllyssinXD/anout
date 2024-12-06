import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { ToDoEntity } from "../../../entities/ToDoEntity";
import ListEntity from "../../../entities/ListEntity";

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

  useEffect(() => {
    setTitle(todo.title);
    setDescription(todo.description);
  }, [todo]);

  const handleSaveChanges = () => {
    todo.title = title;
    todo.description = description;
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
    >
      <div className="flex flex-col max-w-64 w-full h-full m-auto">
        <h2 className="font-bold text-center text-2xl mb-4">Editar To-do</h2>
        <label>Titulo:</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Título"
          className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
        <label className="mt-10">Descrição:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descrição"
          className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
        <div className="w-full flex justify-end mt-10">
          <button
            className="ml-5 w-100 rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400"
            onClick={handleSaveChanges}
          >
            Salvar
          </button>
          <button
            className="ml-5 w-100 rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-400"
            onClick={handleDeleteTodo}
          >
            Deletar
          </button>
          <button
            className="ml-5 w-100 rounded-md bg-gray-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-400"
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
