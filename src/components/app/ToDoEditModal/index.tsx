import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { ToDoListEntity } from '../../../entities/ToDoListEntity';
import { ToDoEntity } from '../../../entities/ToDoEntity';

interface TodoModalProps {
  list: ToDoListEntity;
  todo: ToDoEntity;
  updateTodo: (list:ToDoListEntity, id:number, todo: ToDoEntity) => void;
  removeTodo: (list:ToDoListEntity, id:number) => void;
  closeModal: () => void;
}

const TodoModal: React.FC<TodoModalProps> = ({ list, todo, updateTodo, removeTodo, closeModal }) => {
  const [title, setTitle] = useState(todo.getTitle());
  const [description, setDescription] = useState(todo.getDescription());

  useEffect(() => {
    setTitle(todo.getTitle());
    setDescription(todo.getDescription());
  }, [todo]);

  const handleSaveChanges = () => {
    todo.setTitle(title);
    todo.setDescription(description);
    updateTodo(list, todo.getId(), todo);
    closeModal();
  };
  
  const handleDeleteTodo = () => {
    removeTodo(list, todo.getId());
    closeModal();
  };

  return (
    <Modal isOpen={true} onRequestClose={closeModal} contentLabel="Editar To-do">
      <div className='flex flex-col max-w-64 w-full h-full m-auto'>
        <h2 className='font-bold text-center text-2xl mb-4'>Editar To-do</h2>
        <label>Titulo:</label>
        <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Título"
            className='block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
        />
        <label className='mt-10'>Descrição:</label>
        <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Descrição"
            className='block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
        />
        <div className='w-full flex justify-end mt-10'>
        <button className='ml-5 w-100 rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400'
         onClick={handleSaveChanges}>
          Salvar
         </button>
        <button className='ml-5 w-100 rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-400' 
        onClick={handleDeleteTodo}>
          Deletar
        </button>
        <button className='ml-5 w-100 rounded-md bg-gray-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-400' 
        onClick={closeModal}>
          Cancelar
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default TodoModal;