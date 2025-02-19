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
      className={"bg-night w-[50rem] h-[90vh] p-5 rounded-md"}
    >
      <div className="size-full">
      <div className="flex flex-col max-w-96 w-full h-full">
        <div>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Título"
            className="block w-full text-lg font-medium bg-transparent rounded-md border-[none] p-2 text-emerald"
          />
        </div>
        <div className="mt-10">
          <label className="block mb-5 text-emerald text-md font-medium">Descrição:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Descrição"
            className="block w-full max-h-64 h-64 p-2 bg-transparent rounded-md border-emerald text-silver focus:outline-crimson focus:bg-dark"
          />
        </div>
        <div className="w-full flex mt-10">
          <button
            className="ml-5 w-[20rem] rounded-md bg-crimson px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-crimson"
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
      </div>
    </Modal>
  );
};

export default TodoModal;
